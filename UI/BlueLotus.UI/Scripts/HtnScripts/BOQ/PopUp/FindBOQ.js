function loadFindBOQDocumentReady() {
    LoadOrderCombo_Form_FinPO();
    LoadGridFindView_Form_FinPO();
    $('#remember').prop('checked', false);

    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#grid").height(height - (35 + h2 + 40));
}

$("#FrmDt").width(140).kendoDatePicker({

    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});
$("#FrmDt").closest("span.k-datepicker").width(140);
$("#ToDt").width(140).kendoDatePicker({

    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});
$("#ToDt").closest("span.k-datepicker").width(140);


function LoadOrderCombo_Form_FinPO() {
    $("#cmbSup").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: {
            transport: {
                read: {
                    url: urlOrderGetSuplistForOrder,
                    dataType: "json"
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a supplier.."
    });

    $("#cmbPrjectId").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: {
            transport: {
                read: {
                    url: urlOrderGetPrjListForOrder,
                data:{
                    ObjKy: 1,
                    TrnTypKy: FormGlblData.OrdTypKy,
                    PreKy: 1
                },
                    dataType: "json"
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a project.."
    });

}

function LoadGridFindView_Form_FinPO() {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "ItmKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    Prefix: { editable: false, nullable: false, type: "number" },
                    TrnNo: { editable: false, nullable: false, type: "number" },
                    TrnDt: { editable: false, nullable: false, type: "string" },
                    DocNo: { editable: false, nullable: false, type: "string" },
                    Des: { editable: false, nullable: true, type: "string" },
                }
            }
        }
    });

    $("#FindFormGridData").kendoGrid({
        dataSource: dataSource,
        autobind: true,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            { field: "Lino", title: "LiNo", width: "50px" },
            { field: "TrnKy", title: "Ref #", width: "100px", hidden: true },
            { field: "Prefix", title: "Prefix", width: "50px" },
            { field: "TrnNo", title: "OrdNo", width: "100px" },
            { field: "TrnDt", title: "TrnDt", width: "100px" },
            { field: "DocNo", title: "DocNo", width: "100px" },
            { field: "Des", title: "Des", width: "100px" }
        ],
        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        editable: true,
        height:'40vh'
    });
}

function SearchFunc() {
    $('#FindFormGridData').data("kendoGrid").dataSource.filter(null);
    var grid = $("#FindFormGridData").data("kendoGrid");
    grid.dataSource.data([]);


    var PrjKy = $("#cmbPrjectId").data('kendoComboBox').value();
    if (PrjKy == undefined || PrjKy == "" || PrjKy == null) {
        var PrjKy = 1;
    }

    var SupKy = $("#cmbSup").data('kendoComboBox').value();
    if (SupKy == undefined || SupKy == "" || SupKy == null) {
        var SupKy = 1;
    }

    var FrmDt = $("#FrmDt").val();
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1/1/1900";
    }

    var ToDt = $("#ToDt").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "1/1/2078";
    }
    var OrdNo = $("#OrdNoFrm").val();
    if (OrdNo == undefined || OrdNo == "" || OrdNo == null) {
        var OrdNo = 0;
    }
    var OrdNoTo = $("#OrdNoTo").val();
    if (OrdNoTo == undefined || OrdNoTo == "" || OrdNoTo == null) {
        var OrdNoTo = 0;
    }

    var Checkbox = document.getElementById('remember'); //$("#remember").val();
    var Checkbox = ($("#remember").is(':checked')) ? 1 : 0;

    var DocNo = $("#docNo").val();
    if (DocNo == undefined || DocNo == "" || DocNo == null) {
        var DocNo = '';
    }
    var ConCd = "OrdTyp";
    var OurCd = viewBag.OurCd;

    var YurRef = '';
    var AprStsKy= 1;
    var Prefix= 1;
    var TrnNo= null;
    var AdrKy= 1;
    var LocKy = 1;
   var isRecur= 0;
   var isPrinted = 0;

    $.ajax({
        url: urlOrderGetOrdFind,
        data: JSON.stringify({
            ordFindDet: JSON.stringify({
                PrjKy: PrjKy,
                SupKy: SupKy,
                OrdNo: OrdNo,
                ToOrdNo: OrdNoTo,
                FrmDt: FrmDt,
                ToDt: ToDt,
                DocNo: DocNo,
                ConCd: ConCd,
                OurCd: OurCd,
                ObjKy: viewBag.ObjKy,
                YurRef: YurRef,
                AprStsKy: AprStsKy,
                Prefix: Prefix,
                TrnNo: TrnNo,
                AdrKy: AdrKy,
                LocKy: LocKy,
                isRecur: isRecur,
                isPrinted: isPrinted    

            })

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            $('#FindFormGridData').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGridData").data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {
                $("#FindFormGridData").data("kendoGrid").dataSource.add({ Lino: data[i].Lino, TrnKy: data[i].OrdKy, Prefix: data[i].Prefix, TrnNo: data[i].OrdNo, TrnDt: data[i].OrdDt, DocNo: data[i].DocNo, AdrId: data[i].Des });
            }

        },
        error: function (e) {
            return false;
        }
    });

}

function CancelFunc() {
    $("#FindFormGridData").data("kendoGrid").dataSource.data([]);
    $("#FrmDt").data("kendoDatePicker").value("");
    $("#ToDt").data("kendoDatePicker").value("");
    $("#cmbSup").data("kendoComboBox").value("");
    $("#cmbPrjectId").data("kendoComboBox").value("");
}

$("#FindFormGridData").on("dblclick", "tr.k-state-selected", function () {

    var grid = $('#FindFormGridData').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    var TrnKy = selectedItem.TrnKy;

    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
        FormGlblData.ISNeworUpdateTranction = 0;
        setDates();        
        GetHdrDetailOrdFrmFind(TrnKy);
        FormGlblData.OrdKy = TrnKy;
    }
    CancelFunc();
});

function GetHdrDetailOrdFrmFind(TrnKy) {
    var ordky2 = TrnKy;
    SetTrnHdrApr_LatestState(TrnKy, FormGlblData.OrdTypKy, 'OrdHdr');
    ClearFunction_FromOrdDetCmpn();

    $.ajax({
        url: urlOrderGetPurchesReqForFind,
        data: JSON.stringify({
            ordKy: TrnKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            //load detail level grid
            LoadGridView1(ordky2);

            for (i = 0; i < data.length; i++) {

                var PrefixTrnNo = data[0].OrdPrefixNo;
                var TrnNo = data[0].OrdNo;
                var PRNo = data[0].PRNo;
                var TrnTypKy = data[0].OrdTypKy;
                var TrnPreFixKy = data[0].OrdPrefixKy;
                var TrnKy = data[0].OrdKy;
                var Des = data[0].Des;
                var Rem = data[0].Rem;

                var RepAdrKy = data[0].RepAdrKy;
                var AdrKy = data[0].AdrKy;
                var PrjKy = data[0].PrjKy;
                FormGlblData.PrjKy = PrjKy;
                var AccKy = data[0].AccKy;
                var LocKy = data[0].LocKy;
                var DlvAdrKy = data[0].DlvAdrKy;
                var CusTimeKy = data[0].CusTimeKy;

                var LocKy2 = data[0].LocKy;
                var TrnDt = new Date(data[0].OrdDt);
                var DlryDt = new Date(data[0].DlryDt);
                var RecurOrdTimeKy = data[0].RecurOrdTimeKy;
                var RecurDlvNoKy = data[0].RecurDlvNoKy;
                var RecurOrdDyKy = data[0].RecurOrdDyKy;
                var POrdNoKy = data[0].PrntKy;

                var PmtTrmKy = data[0].PmtKy;
                var TrnCrnKy = data[0].CurrencyKy;
                var ExRate = data[0].ExtRate;
                var Yurref = data[0].YurRef;
                var DocNo = data[0].DocNo;
                var disamt = data[0].DisAmt;
                var NBT = 0;
                var Vat = 0;
                var Wht = 0;
                var Svat = 0;
                var Total = data[0].Amt;
                var SubTotal = Number(data[0].Total) - Number(0) - Number(data[0].Dsicount);

               // LoadAdrComboByAcc(AccKy);
                

                //var PrjKy = data[0].PrjKy;
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
                //var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy);
                //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy);
                //var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value(AccKy);
                //$("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value(AccKy);
                
                //var AdrKy1 = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                
                //$("#HdrSec3_CmbDeliTo_Nm").data("kendoComboBox").value(DlvAdrKy);
                $("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox").value(DlvAdrKy);
                //$("#HdrSec2_CmbDeliNoTo_Nm").data("kendoComboBox").value(DlvAdrKy);

                //CusTimeKy, ProdtimeKy
                $("#HdrSec3_CmbCustTime_Cd").data('kendoComboBox').value(CusTimeKy);
                $("#HdrSec3_CmbProdTime_Cd").data('kendoComboBox').value(CusTimeKy);

                $("#OrdNo1").val(PrefixTrnNo);  //(TrnNo);
                $("#OrdNo").val(PRNo);
                $("#PrefixOrdNo1").val(PrefixTrnNo);
                $("#OrdTypKy1").val(TrnTypKy);
                $("#OrdPrefixKy1").val(TrnPreFixKy);
                $("#OrdKy1").val(TrnKy);
                $("#HdrSec7_InptDesc_Val").val(Des);
                $("#HdrSec7_InptRemark_Val").val(Rem);

                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
                //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);

                $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(RepAdrKy);
                //$("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(RepAdrKy);

                $("#HdrSec1_CmbPOrdNo_Cd").data("kendoComboBox").value(POrdNoKy);
                $("#HdrSec1_CmbPOrdNo_Cd").data("kendoComboBox").trigger("change");

                $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(TrnDt);
                $('#HdrSec1_DatPicProdDeliveryDate_Val').data("kendoDatePicker").value(DlryDt);
                $("#HdrSec3_CmbProdDisptTime_Cd").data("kendoComboBox").value(RecurOrdTimeKy);

                $("#HdrSec1_CmbDeliNo_Cd").data("kendoComboBox").value(RecurDlvNoKy);
                $("#HdrSec1_CmbDay_Cd").data("kendoComboBox").value(RecurOrdDyKy);
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(PmtTrmKy);
                $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(TrnCrnKy);

                $("#HdrSec3_NmricExRate_Val").val(ExRate);
                $("#HdrSec1_InptYurRef_Val").val(Yurref);
                $("#HdrSec1_InptDocNo_Val").val(DocNo);
                $("#HdrSec4_InptDisAmt_Val").val(disamt);
                $("#HdrSec5_NmricNbtAmt_Val").val(NBT);
                $("#HdrSec5_NmricVatAmt_Val").val(Vat);
                $("#HdrSec5_NmricWhtAmt_Val").val(Wht);
                $("#HdrSec5_NmricSVatAmt_Val").val(Svat);
                $("#HdrSec4_InptSumTotalAmt_Val").val(Total);
                $("#HdrSec4_InptSubTotal_Val").val(SubTotal);

                //GetGridDetailOrdFrmFind(TrnKy);

                
                //Calculatetotal(); moved inside Loadgrid code
            }

            LoadItmCombo();
            //CreateNewGridRow();
            try {
                setTimeout(DecideLock(), 3000);
                $('#FindFormOrder').data('kendoWindow').close();
                
                if (FormGlblData.AprStsLockMsg != "" && FormGlblData.AprStsLockMsg != null)
                    alert(FormGlblData.AprStsLockMsg);
            } catch (EX) {

            }

        },
        error: function (e) {
            return false;
        }
    });
}

function DecideLock()
{
    if (FormGlblData.AprStsLock == 0) {
        SetReadOnlyAttr(1);
        //alert("Locked");
    }
    else {
        SetReadOnlyAttr(0);
        //alert("UnLocked");
    }            
}

//function GetGridDetailOrdFrmFind(TrnKy) {
//    $.ajax({
//        url: urlOrderGetPRDetailForFind,
//        data: JSON.stringify({
//            ordKy: TrnKy,
//        }),
//        contentType: 'application/json; charset=utf-8',
//        dataType: "Json",
//        type: "POST",
//        success: function (data) {

//            var id = ("#" + viewBag.OurCd);
//            $(id).data("kendoGrid").dataSource.filter(null);
//            var grid = $(id).data("kendoGrid");
//            grid.dataSource.data([]);

//            for (i = 0; i < data.length; i++) {
                

//                var VATdivideval = (data[i].TrnRate * data[i].TrnQty) * 100;
//                var WHTdivideval = (data[i].TrnRate * data[i].TrnQty) * 100;
//                var NBTdivideval = (data[i].TrnRate * data[i].TrnQty) * 100;
//                var SVATdivideval = (data[i].TrnRate * data[i].TrnQty) * 100;
//                var id = ("#" + viewBag.OurCd);
//                $(id).data("kendoGrid").dataSource.add({
//                    OrdDetKy: data[i].OrdDetKy,
//                    LiNo: data[i].LiNo,
//                    ItmKy: data[i].ItmKy,
//                    LiNo: data[i].LiNo,
//                    ItmNo: data[i].ItmNo,
//                    ItmCd: data[i].ItmCd,
//                    ItmNm: data[i].ItmNm,
//                    Unit: data[i].Unit,
//                    UnitKy: data[i].UnitKy,
//                    Des: data[i].Des,
//                    DisAmt: data[i].DisAmt,
//                    DisPer: data[i].DisPer,
//                    DOH: data[i].DOH,
//                    GOH: data[i].GOH,
//                    Profit: data[i].Profit,
//                    Rem: data[i].Rem,
//                    POQty: data[i].BaseQty,
//                    ReMnQty: Number(data[i].BaseQty - data[i].OrdrdQty),
//                    TrnQty: data[i].TrnQty,
//                    Rate: data[i].Rate,
//                    TrnRate: data[i].TrnRate,
//                    SubTotal: data[i].Rate * data[i].TrnQty,
//                    VatAmt: data[i].VatAmt,
//                    WHTAmt: data[i].WHTAmt,
//                    NBTAmt: data[i].NBTAmt,
//                    SVatAmt: data[i].SVatAmt,
//                    VAT: data[i].VAT,
//                    WHT: data[i].WHT,
//                    NBT: data[i].NBT,
//                    SVAT: data[i].SVAT,
//                    Anl3Ky: data[i].Anl3Ky,
//                    Anl3Cd: data[i].Anl3Cd,
//                    ReqDt: data[i].ReqDt,
//                    IsAct: data[i].isAct
//                });
//                Calculatetotal();
//                setTimeout(DecideLock(), 3000);                

//            }
//            LoadItmCombo();
//            //CreateNewGridRow();
//            try {
//                $('#FindFormOrder').data('kendoWindow').close();
//                if (FormGlblData.AprStsLockMsg != "" && FormGlblData.AprStsLockMsg != null)
//                    alert(FormGlblData.AprStsLockMsg);
//            } catch (EX) {

//            }

//        },
//        error: function (e) {
//            return false;
//        }
//    });

//}