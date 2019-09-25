
var ObjTypKy = 0;

var FormGlblData = {
    ObjKy: viewBag.ObjKy,  
    FormObjData: null,   
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    
}

$(document).ready(function () {

    GetFormObjData();

})

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;

            DocReadyCus();
        }
    });
}

function DocReadyCus() {
   
    LoadCombo();       
}

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data('kendoComboBox').value("");
    }
}

//Combo Loading
function LoadCombo() {

    $("#ObjTyp").kendoComboBox({
        dataValueField: "ObjTypKy",
        dataTextField: "ObjTyp",

        dataSource: ObjTyp_SelecttMob_Datasource('ObjTyp'),
        change: function (e) {

            var ObjTypeKy = $("#ObjTyp").val();
            if (ObjTypeKy == "" || ObjTypeKy == null || ObjTypeKy == undefined) ObjTypeKy = 1
                LoadObjgrid(ObjTypeKy);
            
        },

        filter: "contains",
        suggest: true,
        placeholder: "Select a ObjTyp.."
    });
}
 //=======================================

//datasource function
function ObjTyp_SelecttMob_Datasource(ObjNm) {

    var ObjKy = GetObjKy(ObjNm);                                 
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.ObjTyp_SelecttMob,
                  data: { ObjKy: ObjKy},
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

//Grid Loading
function LoadObjgrid(ObjTypeKy)
{
    if (ObjTypeKy > 1)
        ObjTypKy = ObjTypeKy;

    var ObjmasColumn = [
            {
                field: "ObjKy", title: "ObjKy", width: "50px", hidden: false,
            },
            {
                field: "ObjTypKy", title: "ObjTypKy", width: "100px", hidden: true,
            },
            {
                field: "ObjCaptn", title: "ObjCaptn", width: "70px",
            },
            {
                field: "Des", title: "Des", width: "40px",
            },
            {
                field: "Rem", title: "Rem", width: "40px",
            },
            {
                field: "isAct", title: "isAct", width: "45px",
                template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isActPinChecked"></input>',
            },
            {
                field: "isApr", title: "isApr", width: "45px",
                template: '<input type="checkbox"  #= isApr? "checked=checked" : "" # class="isAprPinChecked"></input>',
            },
            {
                field: "MenuPath", title: "MenuPath", width: "100px",
            },           
           {
               field: " ObjKyPath", title: " ObjKyPath", width: "70px",
           },
           
    ];

    var gridNo = 1;
    var FinalObjmasColumn = setColumnProp(ObjmasColumn, FormGlblData.ObjKy, '', 'Objgrid', gridNo);

}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        try {
        
          $('#Objgrid').data().kendoGrid.destroy();
          $('#Objgrid').empty();
        } catch (e) { }
         
        var dataSource = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlObjMasObjTyp_SelectWeb,
                    dataType: "json"
                },

                parameterMap: function (options, operation) {
                    
                    if (operation == "read") {
                        return ({
                            'ObjTypKy': ObjTypKy,
                            
                        });
                    }
                }
            },

            batch: true,
            pageSize: 50,

            schema: {
                model: {
                    id: "ObjTypKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ObjKy: { editable: true, nullable: false, type: "number" },
                        ObjTypKy: { editable: false, nullable: false, type: "number" },
                        ObjCaptn: { editable: true, nullable: false, type: "string" },
                        Des: { editable: true, nullable: false, type: "string" },
                        Rem: { editable: true, nullable: true, type: "string" },
                        MenuPath: { editable: true, nullable: true, type: "string" },
                        ObjKyPath: { editable: true, nullable: true, type: "string" },
                        isAct: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        isApr: { editable: true, nullable: false, type: "boolean", defaultValue: true },

                    }
                }
            }
        })


        $("#Objgrid").kendoGrid({

                toolbar: ["excel"],
                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",                   
                    filterable: true
                },

            dataSource: dataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            Scrollable: true,

            columns: columnsFinal,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },


            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },           

            editable: true,
            height:"500px",
        });
        

    }

}

//Add Row
function insertItem() {
    grid = $("#Objgrid").data("kendoGrid").addRow();
}

//====================

//Grid cancel
function CancelGrid()
{
    $("#Objgrid").data("kendoGrid").cancelChanges();
}


//Save and Update Function
function Save()
{
    var grid = $("#Objgrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    if (updatedRecords.length) {

        $.ajax({

            url: urlObjMasObjTyp_UpdateWeb,
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
                    $("#Objgrid").data('kendoGrid').dataSource.data([]);
                    LoadObjgrid();
                } else {
                    alert("Please Try Again");
                }
            },
            error: function (e) {
                alert("Failed");
                return false;
            }
        });
    }
}

