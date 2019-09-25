var PrntPrcsDetKy = 0;//used to retrive child record





function LoadDlytodogrid(PrjKey, LeadAdrKey, CurAdrKey, PrtyKy, PrcsObjKy, AprStsKy,PrcsDetCat1Ky, LoadDlytodogrid) {

    var DlyTodoColumn = [
         //{
             
         //    width:"30px",
         //    template: '<input type="checkbox" id="Selected" #= Selected ? checked="checked" : "" # />'
         //},
          { field: "IndexOrder", title: "Index", hidden: true,width: "30px" },
          { field: "PrjID", title: " PrjID", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "TaskID", title: "TaskID", hidden: false, width: "80px", editor: function (container, options) { } },
          { field: "LiNo", title: "LiNo", sortable: { initialDirection: "asc" }, width: "30px", hidden: true, editor: function (container, options) { } },
        { field: "TaskNm", title: "Task Name", width: "450px", editor: function (container, options) { } },
        { field: "ObjCaptn ", title: "ObjCaptn ", hidden: true, width: "120px" },
        { field: "code ", title: "Category ", hidden: true, width: "80px" },          
          { field: "Priority", title: " Priority", width: "80px", editor: function (container, options) { } },
          { field: "AprSts", title: " Status", width: "80px", editor: function (container, options) { } },
          { field: "ReqDt", title: " Delivery Date", width: "80px" },         
          { field: "LeadAdrID", title: " Lead", width: "80px", editor: function (container, options) { } },
          { field: "CurAdrID", title: " Current Action", width: "80px", editor: function (container, options) { } },
          { field: "BudjetQty", title: " BudjetQty", width: "80px", editor: function (container, options) { } },
          { field: "Unit", title: " Unit", width: "80px", editor: function (container, options) { } },
          { field: "EntUsr", title:"Enterd By",width: "80px"},
          
          { field: "PrcsDetKy", title: "PrcsDetKy", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsTypKy", title: "PrcsTypKy", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "UnitKy", title: "UnitKy", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsSeq", title: "Sequence", width: "40px", format: "{0:N5}", hidden: true, editor: function (container, options) { } },
          
          { field: "Des", title: "Description", width: "50px", hidden:true, editor: function (container, options) { } },
          { field: "PrcsTypCd", title: "PrcsTypCd", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsTypNm", title: "PrcsTypNm", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsStp", title: " PrcsStp", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsStpKy", title: " PrcsStpKy", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "Code", title: " Code", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrjKy", title: " PrjKy", width: "40px", hidden: true, editor: function (container, options) { } },
          
          { field: "PrjNm", title: " PrjNm", width: "40px", hidden: true, editor: function (container, options) { } },         
          { field: "PrtyKy", title: " PrtyKy", width: "40px", hidden: true, editor: function (container, options) { } },         
          { field: "AprStsKy", title: " Status", width: "40px", hidden: true, editor: function (container, options) { } },            
          { field: "LeadAdrKy", title: " LeadAdrKy", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "LeadAdrNm", title: " LeadAdrNm", width: "40px", hidden: true, editor: function (container, options) { } },         
          { field: "CurAdrKy", title: " CurAdrKy", width: "40px", hidden: true, editor: function (container, options) { } },         
          { field: "CurAdrNm", title: " CurAdrNm", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "isAct ", title: "isAct ", hidden: true, width: "20px", },
          { field: "PrntKy ", title: "PrntKy ", hidden: true, width: "20px", },            
          { field: "PrcsDetCat1Ky ", title: "code ", hidden: true, width: "20px", },
          { field: "PrcsObjKy ", title: "PrcsObjKy ", hidden: true, width: "20px", },
          //{
          //    width: "80px",
          //    template: kendo.template($("#command-template").html())
          //},
          

          
    ];
    var gridNo = 1;
    var FinalObjmasColumn = setColumnProp(DlyTodoColumn, FormGlblData.ObjKy, '', 'Dlytodogrid', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        try {
            $('#Dlytodogrid').data().kendoGrid.destroy();
            $('#Dlytodogrid').empty();
        } catch (e) { }
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlToDoPrcsDet_SelectWeb,
                    dataType: "json"

                },
                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'PrjKy': PrjKy,
                            'LeadAdrKy': LeadAdrKy,
                            'CurAdrKy': CurAdrKy,
                            'ObjKy': FormGlblData.ObjKy,
                            'PrcsStpKy': PrcsStpKy,
                            'PrtyKy': PrtyKy,
                            'PrcsObjKy': PrcsObjKy,
                            'AprStsKy': AprStsKy,
                            'PrcsDetCat1Ky': PrcsDetCat1Ky,
                        });
                    }
                }
            },
            batch: true,
            pageSize: 100,

            schema: {
                model: {
                    id: "PrcsDetKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        IndexOrder: { editable: true, nullable: true, type: "number" },
                        PrcsDetKy: { editable: false, nullable: false, type: "number" },
                        PrcsTypKy: { editable: false, nullable: false, type: "number" },
                        UnitKy: { editable: true, nullable: true, type: "number" },
                        PrjKy: { editable: true, nullable: false, type: "number" },
                        PrcsSeq: { editable: true, nullable: false, type: "number" },
                        LiNo: { editable: true, nullable: false, type: "number" },
                        LeadAdrKy: { editable: true, nullable: false, type: "number" },
                        LeadAdrID: { editable: false, nullable: false, type: "string" },
                        LeadAdrNm: { editable: false, nullable: false, type: "string" },
                        CurAdrKy: { editable: true, nullable: false, type: "number" },
                        CurAdrID: { editable: false, nullable: false, type: "string" },
                        CurAdrNm: { editable: false, nullable: false, type: "string" },
                        TaskID: { editable: false, nullable: false, type: "string" },
                        TaskNm: { editable: true, nullable: false, type: "string" },
                        Des: { editable: true, nullable: false, type: "string" },
                        PrcsTypCd: { editable: true, nullable: true, type: "string" },
                        PrcsTypNm: { editable: true, nullable: true, type: "string" },
                        PrcsStp: { editable: true, nullable: true, type: "string" },
                        PrcsStpKy: { editable: true, nullable: false, type: "number" },
                        PrjID: { editable: false, nullable: false, type: "string" },
                        PrjNm: { editable: false, nullable: false, type: "string" },
                        PrtyKy: { editable: true, nullable: false, type: "number" },
                        Priority: { editable: false, nullable: false, type: "string" },
                        BudjetQty: { editable: true, nullable: true, type: "string" },
                        Unit: { editable: true, nullable: true, type: "string" },
                        isAct: { editable: true, nullable: false, type: "boolean" },
                        ReqDt: { editable: true, nullable: true, type: "string" },
                        AprSts: { editable: true, nullable: false, type: "string" },
                        AprStsKy: { editable: true, nullable: false, type: "number" },
                        PrntKy: { editable: true, nullable: false, type: "number" },
                        PrcsObjKy: { editable: true, nullable: false, type: "number" },
                        PrcsDetCat1Ky: { editable: true, nullable: false, type: "number" },
                        ObjCaptn: { editable: true, nullable: false, type: "string" },
                        code: { editable: true, nullable: false, type: "string" },
                        EntUsr: { editable: false, nullable: false, type: "string" },
                        //Selected: { type: "bool" },

                        
                    }
                }
            }
        });
        var grid = $("#Dlytodogrid").kendoGrid({
            dataSource: dataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            Scrollable: true,
            columns: columnsFinal,
            selectable: "multiple, row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100, 500, 1000] },
            columnMenu: true,
            filterable: { mode: "row" },
            detailTemplate: kendo.template($("#template").html()),
            
            //detailTemplate: kendo.template($("#template").html()),
            detailInit: detailInit,
            //dataBound : onDataBound,
            dataBound: function (e) { //display only child record
                var items = e.sender.items();
                items.each(function () {
                    var row = $(this);
                    var dataItem = e.sender.dataItem(row);
                    if (!dataItem.isPrnt) {
                        row.find(".k-hierarchy-cell").html("");
                    }

                })//09/07/2018

                var grid1 = $("#Dlytodogrid").data("kendoGrid");
                var DisLino = 1;
                var firstItemData = grid1.dataSource.data();
                for (var i = 0; i < firstItemData.length; i++) {
                    //var FirstRow = $("#Dlytodogrid").data().kendoGrid.dataSource.data()[i];
                    //FirstRow.set("LiNo", i);
                    firstItemData[i].set("IndexOrder", DisLino);
                    DisLino++;
                }
            },
            dataBinding: function () { record = (this.dataSource.page() - 1) * this.dataSource.pageSize(); },
            
            editable: false,
        }).data("kendoGrid");

        
        //this function used to show remarks detals when click row on a grid.
        var grid = $("#Dlytodogrid").data("kendoGrid");
        grid.bind("change", grid_change);

        function grid_change(e) {
            var id = ("#Dlytodogrid");
            var grid = $(id).data().kendoGrid;
            var selectedItem = grid.dataItem(grid.select());
            var Des = selectedItem.Des;
            $('#ComntPnl').val(Des);

            var ItmKy = globalVariable.ItmKy;

            if (ItmKy != "" || ItmKy != undefined || ItmKy != null) {

                if (selectedItem.PrcsDetKy >= 11) {

                    globalVariable.PrcsDetKy = selectedItem.PrcsDetKy;
                    LoadPrcsDetCmpnGrid();
                }
            }
           
           
        }

        //sort Grid's dataSource
        //grid.dataSource.sort({ field: "LiNo", dir: "asc" });
        
        grid.dataSource.sort({ field: "IndexOrder", dir: "desc" });
        //===========================
        grid.table.kendoSortable({
            filter: ">tbody >tr",
            hint: function (element) { //customize the hint
                var table = $('<table style="width: 600px;" class="k-grid k-widget"></table>'),
                    hint;

                table.append(element.clone()); //append the dragged element
                table.css("opacity", 0.7);

                return table; //return the hint element
            },
            cursor: "move",
            placeholder: function (element) {
                return $('<tr colspan="4" class="placeholder"></tr>');
            },
            change: function (e) {
                var skip = grid.dataSource.skip(),
                    oldIndex = e.oldIndex + skip,
                    newIndex = e.newIndex + skip,
                    data = grid.dataSource.data(),
                    dataItem = grid.dataSource.getByUid(e.item.data("uid"));
                dataItem.dirty = true;
                grid.dataSource.remove(dataItem);
                grid.dataSource.insert(newIndex, dataItem);
                ReIndexLino();
            }
        });
        //end of kendo sortable
        

    }
}









function ReIndexLino() {
    var grid1 = $("#Dlytodogrid").data("kendoGrid");
    var DisLino = 1;
    var firstItemData = grid1.dataSource.data();
    for (var i = 0; i < firstItemData.length; i++) {
        //var FirstRow = $("#Dlytodogrid").data().kendoGrid.dataSource.data()[i];
        //FirstRow.set("LiNo", i);
        firstItemData[i].set("LiNo", DisLino);
        DisLino++;
    }
}
// end of function LoadGridWithColumnProp(columnsFinal, gridNo)





function onDataBound(e) {
    
    //var grid1 = $(Dlytodogrid).data("kendoGrid");
    //var dataSource = grid1.dataSource.data();
    //for (var i = 0; i < dataSource.length; i++) {
        
    //    if (dataSource[i].isPrnt != true) {          
    //        $("#Dlytodogrid.k-icon.k-i-expand").hide();
    //        grid1.tbody.find(".k-grid .k-hierarchy-cell .k-icon, .k-scheduler-table .k-icon, .k-treeview .k-icon").hide();
    //        $(".k-hierarchy-cell").hide();
    //        $(".k-hierarchy-col").remove();

    //        //child grid
    //        this.expandRow(this.tbody.find("tr.k-master-row .k-icon.k-i-expand").hide());
    //    }

       
    //}
   
}


function detailInit(e) {
    PrntPrcsDetKy = e.data.PrcsDetKy;

    var dataSourceforDrilled = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlPrcsDetPrnt_SelectWeb,
                dataType: "json"

            },
            parameterMap: function (options, operation) {

                if (operation == "read") {
                    return ({
                        'PrjKy': PrjKy,
                        'LeadAdrKy': LeadAdrKy,
                        'CurAdrKy': CurAdrKy,
                        'ObjKy': FormGlblData.ObjKy,
                        'PrcsStpKy': PrcsStpKy,
                        'PrtyKy': PrtyKy,
                        'PrntPrcsDetKy': PrntPrcsDetKy
                    });
                }
            },
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "PrcsDetKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        IndexOrder: { editable: true, nullable: true, type: "number" },
                        PrcsDetKy: { editable: false, nullable: false, type: "number" },
                        PrcsTypKy: { editable: false, nullable: false, type: "number" },
                        UnitKy: { editable: true, nullable: true, type: "number" },
                        PrjKy: { editable: true, nullable: false, type: "number" },
                        PrcsSeq: { editable: true, nullable: false, type: "number" },
                        LiNo: { editable: true, nullable: false, type: "number" },
                        LeadAdrKy: { editable: true, nullable: false, type: "number" },
                        LeadAdrID: { editable: false, nullable: false, type: "string" },
                        LeadAdrNm: { editable: false, nullable: false, type: "string" },
                        CurAdrKy: { editable: true, nullable: false, type: "number" },
                        CurAdrID: { editable: false, nullable: false, type: "string" },
                        CurAdrNm: { editable: false, nullable: false, type: "string" },
                        TaskID: { editable: false, nullable: false, type: "string" },
                        TaskNm: { editable: true, nullable: false, type: "string" },
                        Des: { editable: true, nullable: false, type: "string" },
                        PrcsTypCd: { editable: true, nullable: true, type: "string" },
                        PrcsTypNm: { editable: true, nullable: true, type: "string" },
                        PrcsStp: { editable: true, nullable: true, type: "string" },
                        PrcsStpKy: { editable: true, nullable: false, type: "number" },
                        PrjID: { editable: false, nullable: false, type: "string" },
                        PrjNm: { editable: false, nullable: false, type: "string" },
                        PrtyKy: { editable: true, nullable: false, type: "number" },
                        Priority: { editable: false, nullable: false, type: "string" },
                        BudjetQty: { editable: true, nullable: true, type: "string" },
                        Unit: { editable: true, nullable: true, type: "string" },
                        isAct: { editable: true, nullable: false, type: "boolean" },
                        ReqDt: { editable: true, nullable: true, type: "string" },
                        AprSts: { editable: true, nullable: false, type: "string" },
                        AprStsKy: { editable: true, nullable: false, type: "number" },
                        PrntKy: { editable: true, nullable: false, type: "number" },
                        PrcsObjKy: { editable: true, nullable: false, type: "number" },
                        PrcsDetCat1Ky: { editable: true, nullable: false, type: "number" },
                        ObjCaptn: { editable: true, nullable: false, type: "string" },
                        code: { editable: true, nullable: false, type: "string" },

                    }
                }
            }
        }
    });

    

    $('<div id="ChildGrid"/>').appendTo(e.detailCell).kendoGrid({
        dataSource: dataSourceforDrilled,
        //serverPaging: true,
        //serverSorting: true,
        //serverFiltering: true,
        resizable: true,
        navigatable: true,
        autobind: true,
        //columnMenu: true,
        //sortable: true,
        selectable: "row",
        //filterable: {
        //    mode: "row"
        //},
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100, 500, 1000] },
        
        dataBinding: function () { record = (this.dataSource.page() - 1) * this.dataSource.pageSize(); },
        
        scrollable: false,
        sortable: false,

        columns: [

           
          { field: "TaskID", title: "TaskID", hidden: false, width: "80px", editor: function (container, options) { } },
          { field: "TaskNm", title: "Task Name", width: "450px", editor: function (container, options) { } },
          { field: "ObjCaptn ", title: "ObjCaptn ", hidden: false, width: "120px" },
          { field: "code ", title: "Category ", hidden: false, width: "80px" },
          { field: "Priority", title: " Priority", width: "80px", editor: function (container, options) { } },
          { field: "AprSts", title: " Status", width: "80px", editor: function (container, options) { } },
          { field: "ReqDt", title: " Delivery Date", width: "80px" },
          { field: "LeadAdrID", title: " Lead", width: "80px", editor: function (container, options) { } },
          { field: "CurAdrID", title: " Current Action", width: "80px", editor: function (container, options) { } },
          { field: "BudjetQty", title: " BudjetQty", width: "80px", editor: function (container, options) { } },
          { field: "Unit", title: " Unit", width: "80px", editor: function (container, options) { } },

          { field: "IndexOrder", title: "Index", hidden: true, width: "30px", editor: function (container, options) { } },
          { field: "PrcsDetKy", title: "PrcsDetKy", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsTypKy", title: "PrcsTypKy", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "UnitKy", title: "UnitKy", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsSeq", title: "Sequence", width: "40px", format: "{0:N5}", hidden: true, editor: function (container, options) { } },
          { field: "LiNo", title: "LiNo", sortable: { initialDirection: "asc" }, width: "30px", hidden: true, editor: function (container, options) { } },
          { field: "Des", title: "Description", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsTypCd", title: "PrcsTypCd", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsTypNm", title: "PrcsTypNm", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsStp", title: " PrcsStp", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrcsStpKy", title: " PrcsStpKy", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "Code", title: " Code", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrjKy", title: " PrjKy", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrjID", title: " PrjID", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrjNm", title: " PrjNm", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "PrtyKy", title: " PrtyKy", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "AprStsKy", title: " Status", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "LeadAdrKy", title: " LeadAdrKy", width: "50px", hidden: true, editor: function (container, options) { } },
          { field: "LeadAdrNm", title: " LeadAdrNm", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "CurAdrKy", title: " CurAdrKy", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "CurAdrNm", title: " CurAdrNm", width: "40px", hidden: true, editor: function (container, options) { } },
          { field: "isAct ", title: "isAct ", hidden: true, width: "20px", },
          { field: "PrntKy ", title: "PrntKy ", hidden: true, width: "20px", },
          { field: "PrcsDetCat1Ky ", title: "code ", hidden: true, width: "20px", },
          { field: "PrcsObjKy ", title: "PrcsObjKy ", hidden: true, width: "20px", },
        ]

    });

}





