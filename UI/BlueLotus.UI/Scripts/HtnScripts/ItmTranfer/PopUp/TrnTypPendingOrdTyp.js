

function LoadAfterOneMinuteTrnTypPendingOrdTyp() {

    var Now = new Date();
    var dd = Now.getDate();
    if (dd == 0) dd = 01;
    var mm = Now.getMonth() + 1;
    var yy = Now.getFullYear();
    $('#TrnTypOrd_FrmDateFromPR').val(dd + "/" + mm + "/" + yy);

    LoadComboFind_Form_FindFromPurReq();
    LoadGridFindView_Form_FindFromPurReq();
    var OurForFind = "";


    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#grid").height(height - (35 + h2 + 40));
}

$("#TrnTypOrd_FrmDateFromPR").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 2009)
});
$("#TrnTypOrd_FrmDateFromPR").closest("span.k-datepicker").width(150);
$("#TrnTypOrd_ToDateFromPR").width(150).kendoDatePicker({

    format: "dd/MM/yyyy",
    min: new Date(31, 2, 2009)
});
$("#TrnTypOrd_ToDateFromPR").closest("span.k-datepicker").width(150);

//function ProjectDataSource() {
//    var dataSource = new kendo.data.DataSource(
//    {
//        transport: {
//            read: {
//                 url: urlComboLoad.PrjIdFromTrnTypPendingOrdTyp,// changed by narmada
//                //url: UrlComboLoad.PrjID_SelectMob,
//                dataType: "json"
//            }
//        }
//    });
//    return dataSource;
//}



function SupDatasource() {
    //var dataSource = new kendo.data.DataSource(
    //{
    //    transport: {
    //        read: {
    //            url: '@Url.Content("~/Order/GetSuplistForOrder")',
    //            dataType: "json"
    //        }
    //    }
    //});
    //return dataSource;
}

function LoadComboFind_Form_FindFromPurReq() {
    $("#TrnTypOrd_cmbSupGRN").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: SupDatasource(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a suplier.."
    });

    $("#TrnTypOrd_OrdtypOrdcmbSupGRN").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: SupDatasource(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a suplier.."
    });

    $("#TrnTypOrd_cmbPrjectIdFrmPurReq").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: GetPrjID_SelectMobDataSource(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project.."
    });
}

function GetPrjID_SelectMobDataSource() {
    var ObjKy = 1;
    //alert(ObjKy);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjID_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.TrnTypKy,
                    PreKy: 1
                    
                
                
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}


function LoadGridFindView_Form_FindFromPurReq() {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "ItmKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    OrdKy: { editable: false, nullable: false, type: "number" },
                    Prefix: { editable: false, nullable: false, type: "number" },
                    Supplier: { editable: false, nullable: false, type: "string" },
                    OrdNo: { editable: false, nullable: false, type: "number" },
                    OrdDt: { editable: false, nullable: false, type: "date" },
                    DocNo: { editable: false, nullable: false, type: "string" },

                }
            }
        }
    });

    $("#TrnTypOrd_FindFromPOGrid").kendoGrid({
        dataSource: dataSource,
        autobind: true,
        navigatable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

        columns: [
             { field: "Lino", title: "LiNo", width: "50px" },
             { field: "OrdKy", title: "Ref #", width: "100px", hidden: true },
             { field: "Prefix", title: "Prefix", width: "150px" },
             { field: "Supplier", title: "Supplier", width: "150px" },
             { field: "OrdNo", title: "OrdNo", width: "150px" },
             {
                 field: "OrdDt", title: "OrdDt", width: "100px", format: "{0: MM-dd-yyyy}",
                 template: "#= kendo.toString(kendo.parseDate(OrdDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
             },
             { field: "DocNo", title: "DocNo", width: "150px" },

        ],

        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        editable: true

    });

}

function SearchPurOrd() {
    $('#TrnTypOrd_FindFromPOGrid').data("kendoGrid").dataSource.filter(null);
    var grid = $("#TrnTypOrd_FindFromPOGrid").data("kendoGrid");
    grid.dataSource.data([]);

    var PrjKy = $("#TrnTypOrd_cmbPrjectIdFrmPurReq").data('kendoComboBox').value();
    if (PrjKy == undefined || PrjKy == "" || PrjKy == null) {
        var PrjKy = 1;
    }

    var SupKy = 1;
    var FrmDt = $("#TrnTypOrd_FrmDateFromPR").val();
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1/1/1900";
    }
    var ToDt = $("#TrnTypOrd_ToDateFromPR").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "1/1/2078";
    }

    var OrdNo = document.getElementById("TrnTypOrd_OrdNoFrmPurReq").value;
    if (OrdNo == undefined || OrdNo == "" || OrdNo == null) {
        var OrdNo = 1;
    }

    var ConCd = "OrdTyp";
    var OurCd = OurForFind;

    $.ajax({
        url: URLGetFromPurOrd.LoadFindGrid,
        data: JSON.stringify({
            PrjKy: PrjKy,
            SupKy: SupKy,
            ConCd: ConCd,
            OurCd: OurCd,
            FrmDt: FrmDt,
            ToDt: ToDt,
            ToOrdNo: OrdNo,
            TrnTypKy: FormGlblData.TrnTypKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $("#TrnTypOrd_FindFromPOGrid").data("kendoGrid").dataSource.add({
                    Lino: data[i].Lino,
                    OrdKy: data[i].OrdKy,
                    Prefix: data[i].Prefix,
                    Supplier: data[i].SupAccCd,
                    OrdNo: data[i].OrdNo,
                    OrdDt: new Date(data[i].OrdDt),
                    DocNo: data[i].DocNo
                });
            }
        },
        error: function (e) {
            return false;
        }
    });

}

function CancelPurOrd() {
    $("#TrnTypOrd_FindFromPOGrid").data("kendoGrid").dataSource.data([]);
    $("#TrnTypOrd_ToDateFromPR").data("kendoDatePicker").value("");
    $("#TrnTypOrd_cmbPrjectIdFrmPurReq").data("kendoComboBox").value("");

}

$("#TrnTypOrd_FindFromPOGrid").on("dblclick", "tr.k-state-selected", function () {

    var grid = $('#TrnTypOrd_FindFromPOGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ordKy = selectedItem.OrdKy;
    if (ordKy != "" || ordKy != undefined || ordKy != null) {
        GetDetailsFromPurOrd(ordKy);
    } else {
        alert("please Select Any Trancsaction");
    }

    CancelPurOrd();
});

function GetDetailsFromPurOrd(ordKy) {

    var ConCd = "OrdTyp"
    var OurCd = OurForFind;
    $.ajax({
        url: URLGetFromPurOrd.GettingAllRecords,
        data: JSON.stringify({

            ordKy: ordKy,
            ConCd: ConCd,
            OurCd: OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var OrdDetKy = "";

            if (data.length > 0) {

                var i = 0;

                var OrdKy = data[i].OrdKy;
                $("#OrdKy").val(OrdKy);

                OrdDetKy += data[i].OrdDetKy + " ";

                var OrdNo = data[i].PrefixTrnNo;
                $("#POrdNo").val(OrdNo);

                var YurRef = data[i].YurRef;
                $("#HdrSec1_InptYurRef_Val").val(YurRef);

                var DocNo = data[i].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);
                
                $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(data[i].OrdDt);
                
                var PrjKy = data[i].PrjKy;
                $("#HdrSec2_CmbToPrj_Cd").data("kendoComboBox").value(PrjKy);
                //$("#HdrSec2_CmbToPrj_Nm").data("kendoComboBox").value(PrjKy);
                
                var LocKy2 = data[i].LocKy2;
                $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value(LocKy2);
                //$("#HdrSec2_CmbFrmLoc_Nm").data("kendoComboBox").value(LocKy2);

                var LocKy = data[i].LocKy;
                $("#HdrSec2_CmbToLoc_Cd").data("kendoComboBox").value(LocKy);
               // $("#HdrSec2_CmbToLoc_Nm").data("kendoComboBox").value(LocKy);

                var Des = data[i].Des;
                $("#HdrSec6_InptDesc_Val").val(Des);

                var Rem = data[i].Rem;
                $("#HdrSec6_InptRemark_Val").val(Rem);
                $("#OrdDetKy").val(OrdDetKy);

                //========================================================= Grid Binding
                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.filter(null);
                var grid = $(id).data("kendoGrid");
                grid.dataSource.data([]);

                for (i = 0; i < data.length; i++) {
                    $(id).data("kendoGrid").dataSource.add({
                        OrdNo: data[i].LiNo,
                        OrdDetKy: data[i].OrdDetKy,
                        ItmKy: data[i].ItmKy,
                        LiNo: data[i].LiNo,
                        ItmCd: data[i].ItmCd,
                        ItmNm: data[i].ItmNm,
                        Unit: data[i].Unit,
                        UnitKy: data[i].UnitKy,
                        Des: data[i].DetDes,
                        DisAmt: data[i].TrnDisAmt,
                        DisPer: data[i].DisPer,
                        Rem: data[i].DetRem,
                        POQty: data[i].BaseQty,
                        ReMnQty: data[i].OrdrdQty,
                        TrnQty: data[i].OrdrdQty,
                        TrnRate: data[i].TrnRate,
                        SubTotal: data[i].TrnRate * data[i].TrnQty,
                        GrossTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].TrnDisAmt),
                        NetTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].TrnDisAmt + data[i].VatAmt + data[i].WHTAmt + data[i].NBTAmt + data[i].SVatAmt),
                        VatAmt: data[i].VatAmt,
                        WHTAmt: data[i].WHTAmt,
                        NBTAmt: data[i].NBTAmt,
                        SVatAmt: data[i].SVatAmt,
                        VAT: data[i].VAT,
                        WHT: data[i].WHT,
                        NBT: data[i].NBT,
                        SVAT: data[i].SVAT,
                        ReqDt: data[i].ReqDt,
                        IsAct: data[i].isAct,
                        AvlStk: data[i].AvlStk,
                        IsAlwMinusStk: data[i].IsAlwMinusStk,

                    });

                }
                $('#GetFromPurOrd').data('kendoWindow').close();
                Calculatetotal();
            }
        },
        error: function (e) {
            return false;
        }
    });
}


var TrnTypOrdTypSelect_GetFromPurOrd_IsOpen = true;

function TrnTypOrdTypSelect(ConCd, OurCd) {

    if (TrnTypOrdTypSelect_GetFromPurOrd_IsOpen) {
        LoadAfterOneMinuteTrnTypPendingOrdTyp();
        TrnTypOrdTypSelect_GetFromPurOrd_IsOpen = false;
    }

    var Title = "Get From ".concat(OurCd);
    if (OurCd == "PO" || OurCd == "po") Title = "Get From Purchase Order";
    if (OurCd == "SLSORD" || OurCd == "SlsOrd") Title = "Get From Sales Order";
    $("#GetFromPurOrd").show().kendoWindow({ //----------- Call PO From GRN
        width: "1000px",
        height: "550px",
        modal: true,
        title: Title
    });
    OurForFind = OurCd;
    $('#GetFromPurOrd').data('kendoWindow').center().open();
}
