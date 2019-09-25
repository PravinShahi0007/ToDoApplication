var $editPopup = null,
$gantt_container = null,
actview = null,
$nameText = null,
$Progress = null,
$Predecessor = null,
$startDate = null, $EndDate = null, allFields = null, $resource;
var dblClickEventHandler = function (event) {
    var $targetElement = $(event.target);
    var $tr = $targetElement.closest("tr");
    if ($tr.length != 0) {
        $editPopup.dialog("open");
    }
    actview = $tr[0]["data-grid-item"];       
    if (actview != null) {
        var activity = actview.Activity_M();
        $nameText.val(activity.ActivityName_M());
        $startDate.datepicker("setDate", activity.StartTime_M());
        $EndDate.datepicker("setDate", activity.EndTime_M());
        $Progress.spinner().val(activity.ProgressPercent_M());
        $Predecessor.val(activity.PredecessorIndexString_M())
        var resourceData = $resource.data("ResourceBinder");
        var selectedResources = [];
        for (var i = 0; i < activity.Assignments_M().length; i++) {
            var assignments = activity.Assignments_M()[i];
            selectedResources.push(new Resources(assignments._resource, assignments._allocUnits));
        }
        resourceData.SetSelectedResource(selectedResources);
        var source = [];
        for (var i = 0; i < activity.Model.GanttResources_M().length; i++) {
            var assignments = activity.Model.GanttResources_M()[i];
            source.push(new Resources(assignments, 100));
        }
        resourceData.SetSource(source);

        if (actview.IsParent_M())
        {
            $startDate.datepicker("option", "disabled", true);
            $EndDate.datepicker("option", "disabled", true);
            $Progress.spinner("option", "disabled", true);
            $Predecessor.attr("disabled", "disabled");
        }
        else
        {
            $startDate.datepicker("option", "disabled", false);
            $EndDate.datepicker("option", "disabled", false);
            $Progress.spinner("option", "disabled", false);
            $Predecessor.removeAttr("disabled");
        }
    }
}
function CreateTaskEditingDiaglog(ganttContainer) {
    $gantt_container = ganttContainer ? ganttContainer : $("#gantt_container");
    $ganttTable = $gantt_container.GanttControl("option", "GanttTable");
    var $ganttTableWidget = $ganttTable.data("GanttTable");
    $ganttTable.bind("dblclick", function (event) {
        dblClickEventHandler(event);
    });
    $ganttTable.longPress(ganttTable, dblClickEventHandler);
}

$(document).ready(function () {
    $editPopup = $("#dialog-form").dialog({
        autoOpen: false,
        height: 350,
        width: 485,
        resizable: false,
        modal: true,
        buttons: {
            "Update Task": function () {
                var $this = $(this);
                if (actview != null) {
                    var activity = actview.Activity_M();
                    activity.ActivityName_M($nameText.val());
                    var startDate = $startDate.datepicker("getDate");
                    var endDate = $EndDate.datepicker("getDate");

                    if (startDate.isLessThan(endDate) || (startDate.equals(endDate))) {
                        allFields.removeClass("ui-state-error");
                        $this.find("#info").hide();
                        $(this).dialog("close");

                        if (startDate.equals(activity.StartTime_M().Date()) == false) {
                            activity.StartTime_M(startDate);
                        }

                        if (endDate.equals(activity.EndTime_M().Date()) == false) {
                            activity.EndTime_M(endDate);
                        }
                        var selectedItems = $resource.data("ResourceBinder").selectedItems;
                        activity.Assignments_M().clear();
                        for (var i = 0; i < selectedItems.length; i++) {
                            var selResource = selectedItems[i];
                            actview.Activity_M().Assignments_M().add(new RadiantQ.Gantt.Model.ResourceAssignment(selResource.resourceObject, selResource.AllocationUnits));
                        }
                        activity.ProgressPercent_M($Progress.spinner().val());
                        activity.PredecessorIndexString_M($Predecessor.val());
                    }
                    else
                    {
                        allFields.addClass("ui-state-error");
                        $this.find("#info").show()
                    }
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $nameText = $editPopup.find("#name");
    $startDate = $("#StartTime").datepicker();
    $EndDate = $("#EndDate").datepicker();
    $Progress = $("#Progress").spinner({
        max: 100,
        min: 0
    });
    $Predecessor = $editPopup.find("#Predecessor")
    allFields = $([]).add($startDate).add($EndDate);

    $.fn.ResourceSelector = function ()
    {
        var $this = $(this);
        this.$addButton = null;
        this.$removeButton = null;
        this.$outPanel = null;
        this.$select = null;
        this.selectedItems = [];
        this.create = function () {

            var $firstContainer = $("<div style='width: 50%; float: left;'></div>");
            $this.data("ResourceBinder", this);
            var resLabel = $("<label style='margin-top:5px;'>Resource Name :</label>");
            this.$select = $('<select style="margin-top:5px;"></select>');
            var resAssignLabel = $("<label style='margin-top:5px;'>Resource Assignment :</label>");
            this.$input = $("<input id='allocation' value='100' style='width:30px; margin-top:5px; margin-left:5px;'></input>");
            this.$addButton = $("<button class='button' style='margin-top:5px;' >Add Resource</button>");

            $firstContainer.append(resLabel).append(this.$select).append($("</br>"));
            $firstContainer.append(resAssignLabel).append(this.$input).append("<span style='margin-top:5px;'>%</span>").append($("</br>"));
            $firstContainer.append(this.$addButton);
            $this.append($firstContainer);

            var $secondContainer = $("<div style='width: 50%; float: left;'></div>");
            this.$outPanel = $("<select style='width: 100%;' multiple='multiple'></select>");
            $secondContainer.append($("<div class='resourcePanel' ></div>").append(this.$outPanel));
            this.$removeButton = $("<button style='width: 100%;'>Remove Selected Resource</button>");
            $secondContainer.append(this.$removeButton);
            $this.append($secondContainer);
            this.events();
        }

        this.events = function ()
        {
            this.$addButton.click($.proxy(function (event) {
                event.preventDefault();
                var selectedOption = this.$select.find(":selected");
                var resource = selectedOption.data("resource");
                resource.AllocationUnits = this.$input.val();
                this.$outPanel.append(this.createOption(resource,true));
                this.selectedItems.push(resource);
                this.updateState();
                this.updateRemoveButtonState();
            }, this));


            this.$removeButton.click($.proxy(function (event) {
                event.preventDefault();
                var selectedOption = this.$outPanel.find(":selected");

                if (selectedOption.length != 0) {
                    var resource = selectedOption.data("resource");
                    var index = this.selectedItems.indexOf(resource);
                    if (index != -1) {
                        selectedOption.remove();
                        this.selectedItems.splice(index, 1);
                        this.updateState();
                        this.updateRemoveButtonState();
                    }
                }
            }, this));


            this.$outPanel.change($.proxy(function (sender) {
                var $target = this.$outPanel.find(":selected");
                selectedItem = $target.data("resource");               
                this.updateRemoveButtonState();
            }, this));

            this.$select.change($.proxy(function () {
                this.updateState();
                this.updateRemoveButtonState();
            }, this));
        }
        this.updateState = function ()
        {
            var val = this.$select.val();
            var $elem = this.$outPanel.find("option[value=" + val + "]");
            if ($elem.length == 0) {
                //if(this.selectedItems.length == 0) //remove this if to support multiple resoures
                    this.$addButton.removeAttr("disabled", "disabled");
                //else
                    //this.$addButton.attr("disabled", "disabled");
            }
            else {
                this.$addButton.attr("disabled", "disabled");                
            }
            this.$removeButton.attr("disabled", "disabled");
        }

        this.updateRemoveButtonState = function ()
        {
            var $target = this.$outPanel.find(":selected");
            var val = $target.val();

            if ($target.length == 0) {
                this.$removeButton.attr("disabled", "disabled");
            }
            else {
                this.$removeButton.removeAttr("disabled", "disabled");
            }
        }
        this.create();
        this.source = null;
        this.SetSource = function(src)
        {
            this.$select.empty();
            this.source = src;
            for (var i = 0; i < this.source.length; i++) {
                var resource = this.source[i];
                var $option = $(this.createOption(resource)).data("resource", resource);
                this.$select.append($option)
            }
            this.updateState();
        }

        this.createOption=function(resource, addAllocation)
        {
            var resourceTxt = resource.GetResourceName();
            if (addAllocation == true)
                resourceTxt += " [" + resource.AllocationUnits + "%]";

            return $("<option value=" + resource.GetId() + " >" + resourceTxt + "</option>").data("resource", resource);
        }
        
        this.SetSelectedResource= function(selectedItem)
        {
            this.$input.val("100");
            this.$outPanel.empty();
            this.selectedItems = selectedItem;
            for (var i = 0; i < this.selectedItems.length; i++) {
                var resource = this.selectedItems[i];               
                this.$outPanel.append(this.createOption(resource,true));
            }
            this.updateState();
          
        }
    }

    $resource = $("#Resource")
    $resource.ResourceSelector();
});

function Resources(resourceObject,unit)
{
    this.resourceObject = resourceObject;
    this.AllocationUnits = unit;
    this.GetId = function ()
    {
        return this.resourceObject._boundObj.ResourceID;
    }
    this.GetResourceName = function () {
        return this.resourceObject._boundObj.ResourceName;
    }
}