
var ConCd = '';

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

//Combo Load
function  LoadCombo()
{
    $("#CdmasColCaption").kendoComboBox({
        dataSource: {
            type: "POST",
            transport: {
                read:
                    {
                        url: URLGetAllConCodesCmb,
                        data: { ObjKy: viewBag.ObjKy }
                    }
            }
        },
        change: function (e) {
          
            var ConCds = $("#CdmasColCaption").val();
            if (ConCds == "" || ConCds == null || ConCds == undefined) ConCds = ''
            LoadColcaptiongrid(ConCds);

        },

        filter: "contains",
        suggest: true,
        placeholder: "Select a ConCd.."
    });

}
//============================

function LoadColcaptiongrid(ConCds)
{
    if (ConCds > '')
        ConCd = ConCds;

    var ConCdsColumn = [
           {
               field: "ObjKy", title: "ObjKy", width: "60px", hidden: false,
           },
           {
               field: "ToolTip", title: "ToolTip", width: "60px", hidden: false,
           },
           {
               field: "ObjCaptn", title: "ObjCaptn", width: "80px",
           },
           {
               field: "SecHed", title: "SecHed", width: "40px",
           },
           {
               field: "ObjNm", title: "ObjNm", width: "40px",
           },
           {
               field: "Des", title: "Des", width: "45px",
               
           },
           {
               field: "PrntKy", title: "PrntKy", width: "50px",
               
           },
           {
               field: "OurCd", title: "OurCd", width: "40px",
           },
          {
              field: " OurCd2", title: " OurCd2", width: "40px",
          },

    ];

    var gridNo = 1;
    var FinalConCdsColumn = setColumnProp(ConCdsColumn, FormGlblData.ObjKy, '', 'Colcaptiongrid', gridNo);

}


function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        try {

            $('#Colcaptiongrid').data().kendoGrid.destroy();
            $('#Colcaptiongrid').empty();
        } catch (e) { }

        var dataSource = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlCdMasColCaption_SelectWeb,
                    dataType: "json"
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'ConCd': ConCd,
                            'ObjKy': viewBag.ObjKy,

                        });
                    }
                }
            },

            batch: true,
            pageSize: 50,

            schema: {
                model: {
                    id: "ConCd",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ObjKy: { editable: true, nullable: false, type: "number" },
                        ToolTip: { editable: false, nullable: false, type: "string" },
                        ObjCaptn: { editable: true, nullable: false, type: "string" },
                        SecHed: { editable: true, nullable: false, type: "string" },
                        ObjNm: { editable: true, nullable: true, type: "string" },
                        PrntKy: { editable: true, nullable: true, type: "number" },
                        OurCd: { editable: true, nullable: true, type: "string" },
                        Des: { editable: true, nullable: false, type: "string", },
                        OurCd2: { editable: true, nullable: false, type: "string", },

                    }
                }
            }
        })


        $("#Colcaptiongrid").kendoGrid({

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
            height: "500px",
        });


    }

}

function CancelGrid() {
    $("#Colcaptiongrid").data("kendoGrid").cancelChanges();
}

function Save()
{

}