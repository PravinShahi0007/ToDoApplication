

$(document).ready(function () {

    //alert('@ViewBag.ObjKy');
    LoadCombo();
    Loaditems(1)
});


function LoadCombo() {

    $("#cmbItmMasItmTyp").kendoComboBox({
        dataValueField: "ControlConKy",
        dataTextField: "ControlConNm",
        dataSource: CdMasCdTypLookupDatasource(),
        //change: function (e) {
        //    var selDat = this.dataItem(this.select());
        //    LoadCdMas_LookupWebByConCdCombo(selDat.GrpConCd);
        //},
        change: function (e) {
            var cmb = $("#cmbItmMasItmTyp").data("kendoComboBox");
            var ControlConKy = cmb.value();
            if (ControlConKy != "") {
                var validate = ComboValidations("cmbItmMasItmTyp");
                if (validate) {

                    Loaditems(ControlConKy);
                    //$("#cmbItmMasItmTyp").data("kendoComboBox").value(Crnky);
                    ////var Concord = $("#cmbCdMasCdTyp").data("kendoComboBox").text();// $("#cmbCdMasCdTyp").data("kendoComboBox").text;
                    //var object = $("#cmbItmMasItmTyp").data("kendoComboBox").dataItem($("#cmbItmMasItmTyp").data("kendoComboBox").select());

                    //LoadCdMas_LookupWebByConCdCombo(object.GrpConCd)
                } else {

                    //$("#cmbCrnId").data("kendoComboBox").value("");
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a CdMasTyp."
    });

}

function CdMasCdTypLookupDatasource() {

    var dataSource = new kendo.data.DataSource(
	  {
	      transport: {
	          read: {
	              url: urlCodes.CdMasCdTypLookup,
	              dataType: "json",
	              data: {
	                  ObjKy: viewBag.ObjKy,
	                  TblNm: "ItmMasItm"
	              }
	          }
	      }
	  });
    return dataSource;
}

function Loaditems(ControlConKy) {
    $("#cmbItmCd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItemLoadDatasource(ControlConKy),
        change: function (e) {

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select Item"
    });
}

function ItemLoadDatasource(controlConKy) {
    var dataSource = new kendo.data.DataSource(
          {
              transport: {
                  read: {
                      url: urlGrpItmCdByControlConRel_SelectWeb,
                      data:
                          {
                              ControlConKy: controlConKy,
                              ObjKy: viewBag.ObjKy
                          },
                      dataType: "json"
                  }
              }
          });
    return dataSource;
}


//function LoadCdMas_LookupWebByConCdCombo(GrpConCd) {
//    $("#cmbItmCd").kendoComboBox({
//        dataValueField: "CdKy",
//        dataTextField: "Code",
//        dataSource: CdMas_LookupWebByConCdDatasource(GrpConCd),
//        change: function (e) {

//        },
//        filter: "startswith",
//        suggest: true,
//        placeholder: "Select Code"
//    });

//    $("#cmbItmCd").parent().css('width', "250px");
//}
//function CdMas_LookupWebByConCdDatasource(GrpConCd) {

//    var dataSource = new kendo.data.DataSource(
//	  {
//	      transport: {
//	          read: {
//	              url: urlCodes.CdMas_LookupWebByConCd,
//	              data: { ConCd: GrpConCd },
//	              dataType: "json"
//	          }
//	      }
//	  });
//    return dataSource;
//}

function LoadGridView() {

    var controlConKy = $("#cmbItmMasItmTyp").data('kendoComboBox').value();
    var ItmKy = $("#cmbItmCd").data('kendoComboBox').value();
    //var ConCd = $("#cmbItmCd").data('kendoComboBox').text();

    var object = $("#cmbItmMasItmTyp").data("kendoComboBox").dataItem($("#cmbItmMasItmTyp").data("kendoComboBox").select());

    ConCd = object.ConCd;

    var dataSourceLoadGridView = new kendo.data.DataSource({
        transport: {
            read:
			{
			    data: { ControlConKy: controlConKy, GrpItmKy: ItmKy, ObjKy: viewBag.ObjKy },
			    url: urlCodes.LoadGridView,
			    dataType: "json"
			}
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "ItmMasItmKy",
                fields:
				{

				    ItmMasItmKy: { editable: false, nullable: false, type: "number" },
				    ControlConKy: { editable: false, nullable: false, type: "number" },
				    GrpItmKy: { editable: false, nullable: false, type: "number" },
				    LiNo: { editable: false, nullable: false, type: "number" },
				    Val: { editable: true, nullable: false, type: "number" },
				    IsAct: { editable: true, nullable: false, type: "boolean" },
				    isDefault: { editable: true, nullable: false, type: "boolean" },
				    isApr: { editable: true, nullable: false, type: "boolean" },
				    ItmKy: { editable: false, nullable: false, type: "number" },
				    ItmCd: { editable: false, nullable: false, type: "string" },
				    ItmNm: { editable: false, nullable: false, type: "string" },
				    ItmCat4: { editable: false, nullable: false, type: "string" },
				    ItmTyp: { editable: false, nullable: false, type: "string" },

				}
            }
        }
    });


    $("#ItmMasItmGrid").kendoGrid({
        dataSource: dataSourceLoadGridView,
        //autobind: true,
        height: 480,
        navigatable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        resizable: true,          
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
		{ field: "ItmMasItmKy", title: "ItmMasItmKy", width: "100px", hidden: true },
		{ field: "ControlConKy", title: "ControlConKy", width: "100px", hidden: true },
		{ field: "GrpItmKy", title: "GrpItmKy", width: "100px", hidden: true },
		{ field: "LiNo", title: "LiNo", width: "100px", hidden: true },
		{ field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
		{ field: "ItmCd", title: "ItmCd", width: "100px", },
		{ field: "ItmNm", title: "ItmNm", width: "100px", },
		{ field: "ItmCat4", title: "ItmCat4", width: "100px", },
		{ field: "ItmTyp", title: "ItmTyp", width: "100px", },
        { field: "Val", title: "Value", width: "100px", },
		{
		    field: "IsAct", title: "IsAct",
		    template: '<input type="checkbox"  #= IsAct? "checked=checked" : "" # class="IsActPinChecked"></input>',
		    width: "100px",
		},
        {
            field: "isApr", title: "isApr",
            template: '<input type="checkbox"  #= isApr? "checked=checked" : "" # class="isAprPinChecked"></input>',
            width: "100px",
        },
        {
            field: "isDefault", title: "isDefault", 
            template: '<input type="checkbox"  #= isDefault? "checked=checked" : "" # class="isDefaultPinChecked"></input>',
            width: "100px",
        },

        ],

        editable: true
    });
}

// Update Grid
function UpdateDetails() {

    var grid = $("#ItmMasItmGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    if (updatedRecords.length) {

        $.ajax({

            url: UrlInsertUpdateItmMasItm,
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                GridUpdateDetail: kendo.stringify(updatedRecords),
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data) {
                    alert("Update Successfully");
                    //$("#CdMasCdGrid").data("kendoGrid").dataSource.read();
                    $("#ItmMasItmGrid").data('kendoGrid').dataSource.data([]);
                    LoadGridView();
                } else {
                    alert("Please Try Again");
                }
            }
        });
    }
}

function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}

$('#ItmMasItmGrid').on('click', '.IsActPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmMasItmGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('IsAct', checked);
    }
});
$('#ItmMasItmGrid').on('click', '.isDefaultPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmMasItmGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDefault', checked);
    }
});
$('#ItmMasItmGrid').on('click', '.isAprPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmMasItmGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isApr', checked);
    }
});