
$("#FindFormGridGRN").height('40vh');
$('#FindFormGridGRN .k-grid-content').height('24vh');



//____BU data source
function BUCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': 1,
                    'PreKy': PreKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
function BUName(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUNm,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': 1,
                    'PreKy': PreKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

//____Address data source
function AddressCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressCd,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1,
                    'PreKy': "1"
                },
                dataType: "json",
                cache: false
            }
        }

    });
    return dataSource;
}
function AddressName(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressNm,
                data: {
                    'ObjKy': ObjKy,
                    'PreKy': "1"
                },

                dataType: "json"
            }
        }

    });
    return dataSource;
}


//____Project data source
function ProjectCd(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectCode,
                data: {
                    'ObjKy': ObjKy,
                    TrnTypKy: 1,
                    PreKy: 1

                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
function ProjectNm(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectNm,
                data: {
                    ObjKy: ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

//Details Account code
function DetailAccountCdload(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlDetailAccCode,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1,
                    PreKy: 1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}

function DetailAccountNmload(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropNm,
                data: {
                    ObjKy: ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}

//Location
function LocCd(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetFromLocList,
                  data: {
                      ObjKy: ObjKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
function LocNm(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetFromLocList,
                  data: {
                      ObjKy: ObjKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ItmCd_SelectMob(ObjNm) {
    var b = GetObjKy(ObjNm),
        c = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlComboLoad.ItmCd_SelectMob,
                    data: {
                        ObjKy: b,
                        TrnTypKy: 1,
                        PreKy: 1
                    },
                    dataType: "json"
                }
            }
        });
    return c
}

function ItmNm_SelectMob(ObjNm) {
    var b = GetObjKy(ObjNm),
        c = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlComboLoad.ItmNm_SelectMob,
                    data: {
                        ObjKy: b,
                        TrnTypKy: 1,
                        PreKy: 1
                    },
                    dataType: "json"
                }
            }
        });
    return c
}

function ProjectDataSource() {
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlFindInvoice.GetProjectList,
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function SupDatasource() {
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlFindInvoice.GetSuplist,
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function Code_Selectweb() {
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlFindInvoice.Code_SelectWeb,
                    data: { ConCd: "PreFix" },
                    dataType: "json",

                }
            }
        });
    return dataSource;
}

function LoadInvoiceComboFindForm() {
    $("#HdrSec10_Cmb_FF_TrnNo_Cd")
    .kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: BUCode('HdrSec10_Cmb_FF_TrnNo'),
        change: function (e) {

            var comboboxText = $("#HdrSec10_Cmb_FF_TrnNo_Cd").data("kendoComboBox");
            var cmbValue = comboboxText.value();

            if (isNaN(cmbValue)) {
                alert("'" + cmbValue + "' is not a Valid input");
                comboboxText.value("");
            }


        },
        filter: "contains",
        suggest: true,
        placeholder: "Prefix"
    })


    $("#HdrSec10_Cmb_FF_HdrAdr_Cd")
       .kendoComboBox({
           dataValueField: "AdrKy",
           dataTextField: "AdrCode",
           dataSource: AddressCode('HdrSec10_Cmb_FF_HdrAdr'),
           change: function (e) {

               var comboboxText = $("#HdrSec10_Cmb_FF_HdrAdr_Cd").data("kendoComboBox");
               var cmbValue = comboboxText.value();

               if (isNaN(cmbValue)) {
                   alert("'" + cmbValue + "' is not a Valid input");
                   comboboxText.value("");
                   //$("#HdrSec10_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value("");
               }
               else {
                   //$("#HdrSec10_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value(cmbValue);
               }



           },
           filter: "contains",
           suggest: true,
           placeholder: "Address"
       })
    //$("#HdrSec10_Cmb_FF_HdrAdr_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AdrKy",
    //        dataTextField: "AdrNM",
    //        dataSource: AddressName('HdrSec10_Cmb_FF_HdrAdr'),
    //        change: function (e) {

    //            var comboboxText = $("#HdrSec10_Cmb_FF_HdrAdr_Nm").data("kendoComboBox");
    //            var cmbValue = comboboxText.value();

    //            if (isNaN(cmbValue)) {
    //                alert("'" + cmbValue + "' is not a Valid input");
    //                comboboxText.value("");
    //                $("#HdrSec10_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value("");
    //            }
    //            else
    //                $("#HdrSec10_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value(cmbValue);


    //        },
    //        filter: "contains",
    //        suggest: true,
    //        placeholder: "Address"
    //    })

    $("#HdrSec10_Cmb_FF_Prj_Cd")
     .kendoComboBox({
         dataValueField: "PrjKy",
         dataTextField: "PrjId",
         dataSource: ProjectCd('HdrSec10_Cmb_FF_Prj'),
         change: function (e) {

             var comboboxText = $("#HdrSec10_Cmb_FF_Prj_Cd").data("kendoComboBox");
             var cmbValue = comboboxText.value();

             if (isNaN(cmbValue)) {
                 alert("'" + cmbValue + "' is not a Valid input");
                 comboboxText.value("");
                 //$("#HdrSec10_Cmb_FF_Prj_Nm").data("kendoComboBox").value("");
             }
             else {
                 //$("#HdrSec10_Cmb_FF_Prj_Nm").data("kendoComboBox").value(cmbValue);
             }


         },
         filter: "contains",
         suggest: true,
         placeholder: "Project"
     })

    $("#HdrSec10_Cmb_FF_Prj_Nm")
         .kendoComboBox({
             dataValueField: "PrjKy",
             dataTextField: "PrjNm",
             dataSource: ProjectNm('HdrSec10_Cmb_FF_Prj'),
             change: function (e) {

                 var comboboxText = $("#HdrSec10_Cmb_FF_Prj_Nm").data("kendoComboBox");
                 var cmbValue = comboboxText.value();

                 if (isNaN(cmbValue)) {
                     alert("'" + cmbValue + "' is not a Valid input");
                     comboboxText.value("");
                     $("#HdrSec10_Cmb_FF_Prj_Cd").data("kendoComboBox").value("");
                 }
                 else
                     $("#HdrSec10_Cmb_FF_Prj_Cd").data("kendoComboBox").value(cmbValue);


             },
             filter: "contains",
             suggest: true,
             placeholder: "Project"
         })

    $("#HdrSec10_Cmb_FF_Supl_Cd")
         .kendoComboBox({
             dataValueField: "AccKy",
             dataTextField: "AccCode",
             dataSource: DetailAccountCdload('HdrSec10_Cmb_FF_Supl'),
             change: function (e) {

                 var comboboxText = $("#HdrSec10_Cmb_FF_Supl_Cd").data("kendoComboBox");
                 var cmbValue = comboboxText.value();

                 if (isNaN(cmbValue)) {
                     alert("'" + cmbValue + "' is not a Valid input");
                     comboboxText.value("");
                     //$("#HdrSec10_Cmb_FF_Supl_Nm").data("kendoComboBox").value("");
                 }
                 else {
                     //$("#HdrSec10_Cmb_FF_Supl_Nm").data("kendoComboBox").value(cmbValue);
                 }



             },
             filter: "contains",
             suggest: true,
             placeholder: "Supplier Code"
         })

    $("#HdrSec10_Cmb_FF_Supl_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNM",
            dataSource: DetailAccountNmload('HdrSec10_Cmb_FF_Supl'),
            change: function (e) {

                var comboboxText = $("#HdrSec10_Cmb_FF_Supl_Nm").data("kendoComboBox");
                var cmbValue = comboboxText.value();

                if (isNaN(cmbValue)) {
                    alert("'" + cmbValue + "' is not a Valid input");
                    comboboxText.value("");
                    $("#HdrSec10_Cmb_FF_Supl_Cd").data("kendoComboBox").value("");
                }
                else
                    $("#HdrSec10_Cmb_FF_Supl_Cd").data("kendoComboBox").value(cmbValue);


            },
            filter: "contains",
            suggest: true,
            placeholder: "Supplier Name"
        })

    $("#HdrSec10_Cmb_FF_Loc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: BUCode('HdrSec10_Cmb_FF_Loc'),
        change: function (e) {

            var comboboxText = $("#HdrSec10_Cmb_FF_Loc_Cd").data("kendoComboBox");
            var cmbValue = comboboxText.value();

            if (isNaN(cmbValue)) {
                alert("'" + cmbValue + "' is not a Valid input");
                comboboxText.value("");
                //$("#HdrSec10_Cmb_FF_Loc_Nm").data("kendoComboBox").value("");
            }
            else {
                //$("#HdrSec10_Cmb_FF_Loc_Nm").data("kendoComboBox").value(cmbValue);
            }



        },
        filter: "contains",
        suggest: true,
        placeholder: "Location"
    });
    $("#HdrSec10_Cmb_FF_Loc_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Name",
        dataSource: BUName('HdrSec10_Cmb_FF_Loc'),
        change: function (e) {

            var comboboxText = $("#HdrSec10_Cmb_FF_Loc_Nm").data("kendoComboBox");
            var cmbValue = comboboxText.value();

            if (isNaN(cmbValue)) {
                alert("'" + cmbValue + "' is not a Valid input");
                comboboxText.value("");
                $("#HdrSec10_Cmb_FF_Loc_Cd").data("kendoComboBox").value("");
            }
            else
                $("#HdrSec10_Cmb_FF_Loc_Cd").data("kendoComboBox").value(cmbValue);


        },
        filter: "contains",
        suggest: true,
        placeholder: "Location"
    });
    $("#HdrSec10_Cmb_FF_Item_Cd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItmCd_SelectMob('HdrSec10_Cmb_FF_Item'),
        change: function (e) {

            var comboboxText = $("#HdrSec10_Cmb_FF_Item_Cd").data("kendoComboBox");
            var cmbValue = comboboxText.value();

            if (isNaN(cmbValue)) {
                alert("'" + cmbValue + "' is not a Valid input");
                comboboxText.value("");
                //$("#HdrSec10_Cmb_FF_Item_Nm").data("kendoComboBox").value("");
            }
            else {
                //$("#HdrSec10_Cmb_FF_Item_Nm").data("kendoComboBox").value(cmbValue);
            }


        },


        filter: "contains",
        suggest: true,
        placeholder: "Item Code"
    });
    $("#HdrSec10_Cmb_FF_Item_Nm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItmNm_SelectMob('HdrSec10_Cmb_FF_Item'),
        change: function (e) {

            var comboboxText = $("#HdrSec10_Cmb_FF_Item_Nm").data("kendoComboBox");
            var cmbValue = comboboxText.value();

            if (isNaN(cmbValue)) {
                alert("'" + cmbValue + "' is not a Valid input");
                comboboxText.value("");
                $("#HdrSec10_Cmb_FF_Item_Cd").data("kendoComboBox").value("");
            }
            else
                $("#HdrSec10_Cmb_FF_Item_Cd").data("kendoComboBox").value(cmbValue);

        },
        filter: "contains",
        suggest: true,
        placeholder: "Item Name"
    });


    $("#HdrSec10_Cmb_FF_AprStatesAction_Val")
      .kendoComboBox({
          dataTextField: "Name",
          dataValueField: "CdKy",
          // dataSource: DetailAccountNmload('HdrSec10_Cmb_FF_AprStatesAction'),// need some modifications
          dataSource: BUName('HdrSec10_Cmb_FF_AprStatesAction_Val'),
          change: function (e) {

              var comboboxText = $("#HdrSec10_Cmb_FF_AprStatesAction_Val").data("kendoComboBox");
              var cmbValue = comboboxText.value();

              if (isNaN(cmbValue)) {
                  alert("'" + cmbValue + "' is not a Valid input");
                  comboboxText.value("");
              }

          },
          filter: "contains",
          suggest: true,
          placeholder: "Status"
      })
    //$("#cmbSupGRN").kendoComboBox({
    //    dataValueField: "AccKy",
    //    dataTextField: "AccCd",
    //    dataSource: SupDatasource(),
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a suplier.."
    //});

    //$("#cmbPrjectIdGRN").kendoComboBox({
    //    dataValueField: "PrjKy",
    //    dataTextField: "PrjID",
    //    dataSource: ProjectDataSource(),
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a From suplier.."
    //});

    //$("#Prefix").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "Code",
    //    dataSource: Code_Selectweb(),
    //    change: function (e) {

    //        var cmb = $("#Prefix").data("kendoComboBox");
    //        var val = cmb.value();

    //        if (isNaN(val)) {
    //            alert("'" + val + "' is not a Valid input");
    //            cmb.value("");
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Prefix"
    //});
}

function LoadInvoiceDataPickerFindForm() {
    //$("#FrmDtGRN").width(140).kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //    min: new Date(1990, 2, 31)
    //});
    //$("#FrmDtGRN").closest("span.k-datepicker").width(140);

    //$("#ToDtGRN").width(140).kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //    min: new Date(1900, 2, 31)
    //});
    //$("#ToDtGRN").closest("span.k-datepicker").width(140);

    $("#HdrSec10_Dat_FF_FromDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(1990, 2, 31)
    });
    $("#HdrSec10_Dat_FF_Todt_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(1990, 2, 31)
    });

}


function LoadAfterOneMinuteFindInvoice() {
    var Now = new Date();
    var dd = Now.getDate();
    if (dd == 0) dd = 01;
    var mm = Now.getMonth() + 1;
    var yy = Now.getFullYear();
    $("#HdrSec10_Dat_FF_Todt_Val").val(dd + "/" + mm + "/" + yy);
    //$("#HdrSec10_Dat_FF_FromDate_Val").val(dd + "/" + mm + "/" + yy);
    LoadInvoiceComboFindForm();
    LoadInvoiceDataPickerFindForm();
    //LoadInvoiceGridFindView();
    //SearchGRN();
    $('#HdrSec10_Chkbox_FF_IsRec_Val').prop('checked', false);
}

//function LoadInvoiceGridFindView() {

//    var dataSource = new kendo.data.DataSource({
//        batch: true,
//        pageSize: 10,
//        schema: {
//            model: {
//                id: "ItmKy",
//                fields: //Relavent fields of the grid should be bind with following model items
//                {
//                    Lino: { editable: false, nullable: false, type: "number" },
//                    TrnKy: { editable: false, nullable: false, type: "number" },
//                    Prefix: { editable: false, nullable: false, type: "number" },
//                    TrnNo: { editable: false, nullable: false, type: "number" },
//                    TrnDt: { editable: false, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
//                    DocNo: { editable: false, nullable: false, type: "string" },
//                    YurRef: { editable: false, nullable: false, type: "string" },
//                    DeliNo: { editable: false, nullable: true, type: "string" },
//                    AdrId: { editable: false, nullable: true, type: "string" },
//                    AdrNm: { editable: false, nullable: true, type: "number" },
//                    PrjId: { editable: false, nullable: false, type: "string" },
//                    PrjNm: { editable: false, nullable: false, type: "string" },
//                }
//            }
//        }
//    });

//    $("#FindFormGridGRN").kendoGrid({
//        dataSource: dataSource,
//        autobind: true,
//        navigatable: true,
//        filterable: {
//            mode: "row"
//        },
//        pageable: true,
//        sortable: true,
//        reorderable: true,
//        columnMenu: true,
//        selectable: "row",
//        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
//        columns: [
//            { field: "Lino", title: "LiNo", width: "50px" },
//            { field: "TrnKy", title: "Ref #", width: "100px", hidden: true },
//            { field: "Prefix", title: "Prefix", width: "50px" },
//            { field: "TrnNo", title: "TrnNo", width: "100px" },
//            {
//                field: "TrnDt", title: "TrnDt", width: "100px", type: "date", format: "{0:dd/MM/yyyy}",
//                //template: "#= kendo.toString(kendo.parseDate(TrnDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
//            },
//            { field: "DocNo", title: "DocNo", width: "100px" },
//            { field: "YurRef", title: "YurRef", width: "100px" },
//            { field: "DeliNo", title: "Deli No", width: "100px" },
//            { field: "AdrId", title: "AdrId", width: "100px" },
//            { field: "AdrNm", title: "AdrNm", width: "100px" },
//            { field: "PrjId", title: "PrjId", width: "100px" },
//            { field: "PrjNm", title: "PrjNm", width: "100px" },
//        ],
//        resizable: true,
//        dataBinding: function () {
//            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
//        },
//        editable: true,
//        height: "300px"
//    });
//}

//================================================
function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        sort: ({ dir: "desc", field: "LiNo" }),
        pageSize: 10,
        schema: {
            model: {
                id: "ItmKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    Prefix: { editable: false, nullable: false, type: "string" },
                    TrnNo: { editable: false, nullable: false, type: "number" },
                    TrnDt: { editable: false, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                    DocNo: { editable: false, nullable: false, type: "string" },
                    YurRef: { editable: false, nullable: false, type: "string" },
                    DeliNo: { editable: false, nullable: true, type: "string" },
                    AdrId: { editable: false, nullable: true, type: "string" },
                    AdrNm: { editable: false, nullable: true, type: "string" },
                    PrjId: { editable: false, nullable: false, type: "string" },
                    PrjNm: { editable: false, nullable: false, type: "string" },
                }
            }
        }
    });
    $("#FindFormGridGRN")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            columnMenu: true,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageable: true,
            reorderable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}

function onDataBound(e) {
    try {
        var id = ("#FindFormGridGRN");
        var grid = $(id).data("kendoGrid");
        var dataSource = grid.dataSource.data();
        for (var i = 0; i < dataSource.length; i++) {
            if (dataSource[i].IsAct == 0) {
                grid.tbody.find("tr[data-uid='" + dataSource[i].uid + "']").hide();
            }
        }

    } catch (e) {

    }

}

function FindGridDefaultColumns() {
    var columnsDefine = [
      { field: "Lino", title: "LiNo", width: "50px" },
            {
                field: "TrnKy", title: "Ref #", width: "100px", hidden: true,
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "Prefix", title: "Prefix", width: "50px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "TrnNo", title: "TrnNo", width: "100px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "TrnDt", title: "TrnDt", width: "100px", type: "date", format: "{0:dd/MM/yyyy}",
                //template: "#= kendo.toString(kendo.parseDate(TrnDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "DocNo", title: "DocNo", width: "100px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "YurRef", title: "YurRef", width: "100px",hidden: true,
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "DeliNo", title: "Deli No", width: "100px",hidden: true,
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "AdrId", title: "AdrId", width: "100px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "AdrNm", title: "AdrNm", width: "100px",hidden: true,
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "PrjId", title: "PrjId", width: "100px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "PrjNm", title: "PrjNm", width: "100px",hidden: true,
                editor: function (container, options) {
                    var model = options.model;
                }
            },
    ];

    var gridNo = 2;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FindFormGridGRN', gridNo);
}



$('#FindFormGridGRN').dblclick(function () {
    LoadDailyProgress();
});

function LoadDailyProgress() {

    var grid = $('#FindFormGridGRN').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    FormGlblData.selectedIndex = grid.select().index();
    var DataSource = $('#FindFormGridGRN').data('kendoGrid').dataSource.data();

    if (selectedItem != null) {
        var TrnKy = selectedItem.TrnKy;
        if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
            FormGlblData.ISNeworUpdateTranction = 0;
            GetHdrDetailDailyProgressFind(TrnKy);
            window.parent.$("#FindFormGRN").data("kendoWindow").close();
        }
    } else {
        alert("please Select Any Resources");
    }
}


function SearchGRN() {

    var PrjKy = $("#HdrSec10_Cmb_FF_Prj_Cd").data('kendoComboBox').value();
    if (PrjKy == undefined || PrjKy == "" || PrjKy == null) {
        var PrjKy = 1;
    }

    var SupKy = $("#HdrSec10_Cmb_FF_Supl_Cd").data('kendoComboBox').value();
    if (SupKy == undefined || SupKy == "" || SupKy == null) {
        var SupKy = 1;
    }

    var FrmDt = $("#HdrSec10_Dat_FF_FromDate_Val").val();
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1/1/1900";
    }

    var ToDt = $("#HdrSec10_Dat_FF_Todt_Val").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "1/1/2078";
    }

    var TrnNo = $("#HdrSec10_Cmb_FF_TrnNo_Val").val();
    if (TrnNo == undefined || TrnNo == "" || TrnNo == null) {
        var TrnNo = null;
    }

    var Checkbox = document.getElementById('HdrSec10_Chkbox_FF_IsRec_Val'); //$("#HdrSec10_Chkbox_FF_IsRec_Val").val();
    var Checkbox = ($("#HdrSec10_Chkbox_FF_IsRec_Val").is(':checked')) ? 1 : 0;

    var DocNo = $("#HdrSec10_Inpt_FF_DocNo_Val").val();
    if (DocNo == undefined || DocNo == "" || DocNo == null) {
        var DocNo = '';
    }

    var YurRef = $("#HdrSec10_Inpt_FF_YurRef_Val").val();
    if (YurRef == undefined || YurRef == "" || YurRef == null) {
        var YurRef = '';
    }

    var Prefix = $("#HdrSec10_Cmb_FF_TrnNo_Cd").data('kendoComboBox').value();
    if (Prefix == "" || Prefix == undefined || Prefix == null) Prefix = 1;

    var AprStsKy = $("#HdrSec10_Cmb_FF_AprStatesAction_Val").data('kendoComboBox').value();
    if (AprStsKy == "" || AprStsKy == undefined || AprStsKy == null) AprStsKy = 1;

    var ItmKy = $("#HdrSec10_Cmb_FF_Item_Cd").data('kendoComboBox').value();
    if (ItmKy == "" || ItmKy == undefined || ItmKy == null) ItmKy = 1;

    var AdrKy = $("#HdrSec10_Cmb_FF_HdrAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == "" || AdrKy == undefined || AdrKy == null) AdrKy = 1;

    var LocKy = $("#HdrSec10_Cmb_FF_Loc_Cd").data('kendoComboBox').value();
    if (LocKy == "" || LocKy == undefined || LocKy == null) LocKy = 1;

    var isPrinted = ($("#HdrSec10_Chkbox_FF_IsPrnt_Val").is(':checked')) ? 1 : 0;


    var ConCd = "TrnTyp";
    var OurCd = viewBag.OurCd;
    //This was Added Temprary Have to modifi
    if (OurCd.toLowerCase() == 'resusgbyres') {
        ConCd = "ResUsgRes";
    }
    if (OurCd.toLowerCase() == 'impcost') {
        OurCd = "GRN";
    }
    $.ajax({
        url: urlFindInvoice.GetGRNList,
        data: JSON.stringify({

            PrjKy: PrjKy,
            SupKy: SupKy,
            TrnNo: TrnNo,
            isRecur: Checkbox,
            FrmDt: FrmDt,
            ToDt: ToDt,
            DocNo: DocNo,
            ConCd: ConCd,
            OurCd: OurCd,
            YurRef: YurRef,
            Prefix: Prefix,
            ObjKy: viewBag.ObjKy,
            AprStsKy: AprStsKy,
            ItmKy: ItmKy,
            AdrKy: AdrKy,
            LocKy: LocKy,
            isPrinted: isPrinted
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $('#FindFormGridGRN').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGridGRN").data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {
                $("#FindFormGridGRN").data("kendoGrid").dataSource.add({
                    Lino: data[i].Lino,
                    TrnKy: data[i].TrnKy,
                    Prefix: data[i].Prefix,
                    TrnNo: data[i].TrnNo,
                    TrnDt: data[i].TrnDt,
                    DocNo: data[i].DocNo,
                    YurRef: data[i].YurRef,
                    DeliNo: data[i].DeliNo,
                    AdrId: data[i].AdrId,
                    AdrNm: data[i].AdrNm,
                    PrjId: data[i].PrjId,
                    PrjNm: data[i].PrjNm
                });
            }
        },
        error: function (e) {
            return false;
        }
    });

}

function OkGRN() {

    if (viewBag.OurCd == "ResUagByRes") {
        getResUagByRes();
    } else {
        var setDefault = false;
        ComClearWithOutDefaultSetting(setDefault, "FindInvoice");
    }

}

function OkGRNAfterClear() {

    FormGlblData.isFirstTimeComboChange = 1;
    var grid = $('#FindFormGridGRN').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    if (selectedItem != null) {
        var TrnKy = selectedItem.TrnKy;
        if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
            FormGlblData.ISNeworUpdateTranction = 0;
            SetTrnDate();
            //AddInAccessable();
            SetTrnHdrApr_LatestState(TrnKy, FormGlblData.TrnTypKy, 'TrnHdr');
            Set_Navigation("FindFormGridGRN", TrnKy);
            //alert(Globalvar.CurrentAprStsKy);
            FormGlblData.isFromFind = 1;

        } else {
            alert("please Select Any Trancsaction");
        }
    } else {
        alert("please Select Any Trancsaction");
    }
}

function GetHdrDetailGrnFrmFind(TrnKy) {

    $.ajax({
        url: urlFindInvoice.GetGridInvoiceDetail,
        data: JSON.stringify({

            ordKy: TrnKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length == 0) {
                alert("There is a Problem to getting this Record! \n Please Contact Support.\n Error Code(" + TrnKy + ")");
                //ComClearFunction();
                return
            }
            for (i = 0; i < data.length; i++) {

                var TrnNo = data[0].TrnNo;
                var PrefixTrnNo = data[0].PrefixTrnNo;
                var TrnTypKy = data[0].TrnTypKy;
                FormGlblData.TrnTypKy = TrnTypKy;
                var TrnPreFixKy = data[0].TrnPreFixKy;

                var Prefix = data[0].Prefix;
                if (Prefix == null || Prefix == undefined) $("#OrdNo").val(TrnNo);
                else
                    $("#OrdNo1").val(Prefix + " " + TrnNo);

                var O_OrdNo = data[0].O_OrdNo;
                $("#POrdNo").val(O_OrdNo);

                FormGlblData.AccessLvlKy = data[0].AcsLvlKy;
                FormGlblData.ConfiLvlKy = data[0].ConFinLvlKy;
                FormGlblData.TrnKy = data[0].TrnKy;
                FormGlblData.RecKy = data[0].TrnKy;
                FormGlblData.TmStmp = data[0].TmStmp;

                var RecurDlvNoKy = data[0].RecurDlvNoKy;
                $("#HdrSec1_CmbDeliNo_Cd").data("kendoComboBox").value(RecurDlvNoKy);

                var LocKy = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy);
                // $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy);
                var SlsAccKy = data[0].SlsAccKy;
                $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(SlsAccKy);
                // $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(SlsAccKy);

                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                //$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);

                var Des_Header = data[0].Des;
                var Rem_Header = data[0].Rem;
                $("#HdrSec6_InptDesc_Val").val(Des_Header);
                $("#HdrSec6_InptRemark_Val").val(Rem_Header);


                var OrdAdrKy = data[0].AdrKy;
                LoadAdrComboByAcc(AccKy);
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(OrdAdrKy);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(OrdAdrKy);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(TrnDt);
                FormGlblData.FromFindDate = TrnDt;

                var PmtTrmKy = data[0].PmtTrmKy;
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(PmtTrmKy);
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").trigger("change");

                var TrnCrnKy = data[0].TrnCrnKy;
                $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(TrnCrnKy);


                var ExRate = data[0].TrnExRate;

                $("#HdrSec3_NmricExRate_Val").data("kendoNumericTextBox").value(ExRate);


                var Yurref = data[0].YurRef
                $("#HdrSec1_InptYurRef_Val").val(Yurref);

                var YurRefDate = data[0].YurRefDt;

                $("#HdrSec1_InptYurRef_ValDate").val(YurRefDate);
                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var disamt = data[0].Dsicount;
                $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value(disamt);
                var NBT = data[0].NBT;
                $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value(NBT);
                var Vat = data[0].Vat;
                $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value(Vat);
                var Wht = data[0].Wht;
                $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value(Wht);
                var Svat = data[0].Svat;
                $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value(Svat);
                var Total = data[0].Total;
                $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value(Total);
                var SubTotal = Number(data[0].Total) - Number(data[0].Wht) - Number(data[0].Vat) - Number(data[0].NBT) + Number(data[0].Dsicount);
                $("#HdrSec4_InptSubTotal_Val").data("kendoNumericTextBox").value(SubTotal);
                var SubTotal = Number(data[0].Total) - Number(data[0].Wht) - Number(data[0].Vat) - Number(data[0].NBT) + Number(data[0].Dsicount);
                $("#HdrSec4_InptSubTotal_Val").data("kendoNumericTextBox").value(SubTotal);
                var CrossTotal = Number(data[0].Total) - Number(data[0].Wht) - Number(data[0].Vat) - Number(data[0].NBT);
                $("#HdrSec4_InptCrossTotalAmt_Val").data("kendoNumericTextBox").value((CrossTotal).toFixed(2));

                var RepadrKy = data[0].RepAdrKy;
                $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(RepadrKy);
                //$("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(RepadrKy);

                BackDateFutureDateLock("HdrSec1_DatPicDate_Val");
                GetGridDetailFrmFindGrn(FormGlblData.TrnTypKy, TrnKy);

            }
        },
        error: function (e) {
            return false;
        }
    });

}

function DecideLock() {
    if (FormGlblData.AprStsLock == 0) {
        SetReadOnlyAttr(1);
    }
    else {
        SetReadOnly(0);
    }
}

function GetGridDetailFrmFindGrn(TrnTypKy, TrnKy) {

    $.ajax({
        url: urlFindInvoice.GetInvoiceItemsDetail,
        data: JSON.stringify({
            TrnTypKy: TrnTypKy,
            ordKy: TrnKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length == 0) alert("There is a Problem to getting this Record! \n Please Contact Support.\n Error Code(" + TrnKy + ")");
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                var PrjKy = data[0].PrjKy;
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);


                var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
                //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);

                var netTotal_ = 0;
                if (data[0].NetTotal <= 0)
                    netTotal_ = ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt + data[i].VatAmt + data[i].WHTAmt + data[i].NBTAmt);
                else
                    netTotal_ = data[i].NetTotal;

                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.add({
                    ItmTrnKy: data[i].ItmTrnKy,
                    LiNo: data[i].LiNo,
                    ItmKy: data[i].ItmKy,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    Des: data[i].Des,
                    DisAmt: data[i].DisAmt,
                    DisPer: data[i].DisPer,
                    Rem: data[i].Rem,
                    POQty: data[i].BaseQty,
                    ReMnQty: Number(data[i].BaseQty - data[i].OrdrdQty),
                    TrnQty: data[i].TrnQty,
                    TrnRate: data[i].TrnRate,
                    SubTotal: data[i].TrnRate * data[i].TrnQty,
                    GrossTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt),
                    VatAmt: data[i].VatAmt,
                    WHTAmt: data[i].WHTAmt,
                    NBTAmt: data[i].NBTAmt,
                    SVatAmt: data[i].SVatAmt,
                    VAT: data[i].VAT,
                    //VAT: (data[i].VatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    WHT: (data[i].WHTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NBT: (data[i].NBTAmt / ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt)) * 100,
                    SVAT: (data[i].SVatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NetTotal: netTotal_,
                    Anl3Ky: data[i].Anl3Ky,
                    Anl3Cd: data[i].Anl3Cd,
                    IsAct: data[i].isAct
                });
            }
            Calculatetotal();
            CreateNewGridRow();
            ArrangeLiNo();
            setTimeout(DecideLock(), 2000);
            if (FormGlblData.RecKy > 1) {
                GetImage(FormGlblData.RecKy);
            }
            Clear();

            try {
                $('#FindFormGRN').data('kendoWindow').close();
                if (FormGlblData.AprStsLockMsg != "" && FormGlblData.AprStsLockMsg != null)
                    alert(FormGlblData.AprStsLockMsg);
            } catch (e) { }
        },
        error: function (e) {
            return false;
        }
    });

    if (LoadItemCombo_IsFire)
        LoadItemCombo();
}

function btnCalGRN() {
    $('#FindFormGRN').data('kendoWindow').close();
}

function Clear() {
    //var grid = $("#FindFormGridGRN").data("kendoGrid");
    //grid.dataSource.data([]);
    $("#HdrSec10_Dat_FF_Todt_Val").val(null);
    $("#HdrSec10_Inpt_FF_OrdNo_Val").val(null);
    $("#HdrSec10_Inpt_FF_DocNo_Val").val(null);
    $("#HdrSec10_Inpt_FF_YurRef_Val").val(null);
    $("#HdrSec10_Inpt_FF_YurRef_Val").val(null);
    $("#HdrSec10_Cmb_FF_AprStatesAction_Val").data('kendoComboBox').value(null);
    $("#HdrSec10_Cmb_FF_TrnNo_Cd").data('kendoComboBox').value(null);
    $("#HdrSec10_Cmb_FF_TrnNo_Val").val(null);
    $("#HdrSec10_Cmb_FF_Item_Cd").data('kendoComboBox').value(null);
    // $("#HdrSec10_Cmb_FF_Item_Nm").data('kendoComboBox').value(null);
    $("#HdrSec10_Cmb_FF_HdrAdr_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec10_Cmb_FF_HdrAdr_Nm").data('kendoComboBox').value(null);
    $("#HdrSec10_Cmb_FF_Loc_Cd").data('kendoComboBox').value(null);
    // $("#HdrSec10_Cmb_FF_Loc_Nm").data('kendoComboBox').value(null);
    $("#HdrSec10_Cmb_FF_Prj_Cd").data('kendoComboBox').value(null);
    // $("#HdrSec10_Cmb_FF_Prj_Nm").data('kendoComboBox').value(null);
    $("#HdrSec10_Cmb_FF_Supl_Cd").data('kendoComboBox').value(null);
    // $("#HdrSec10_Cmb_FF_Supl_Nm").data('kendoComboBox').value(null);
    $('#HdrSec10_Chkbox_FF_IsRec_Val').attr('checked', false);
    $('#HdrSec10_Chkbox_FF_IsPrnt_Val').attr('checked', false);
}

//$(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");