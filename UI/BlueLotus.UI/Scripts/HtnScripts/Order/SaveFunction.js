function ComSaveFunction() {

    if (FormGlblData.isAllowSaveByBackDate == 0) {
        alert("Save Disabled Due to Back Dated Cofiguration!");
        return;
    }

    var TrnDateToUpdate = $("#HdrSec1_DatPicDate_Val").val();
    var TrnDateTemp = TrnDateToUpdate.match(/\d+/g),
         TrnDday = TrnDateTemp[0].substring(), // get only two digits
        TrnDmonth = TrnDateTemp[1],
        TrnDyear = TrnDateTemp[2];

    var MindatePart = CdMasModel.TrnMinDate.match(/\d+/g),
        Minyear = MindatePart[0].substring(), // get only two digits
        Minmonth = MindatePart[1],
        Minday = MindatePart[2];
    //  var MinDt = Minday + '/' + Minmonth + '/' + Minyear;

    var MaxdatePart = CdMasModel.TrnMaxDate.match(/\d+/g),
        Maxyear = MaxdatePart[0].substring(), // get only two digits
        Maxmonth = MaxdatePart[1],
        Maxday = MaxdatePart[2];
    //   var MaxDt = Maxday + '/' + Maxmonth + '/' + Maxyear;

    var TrnDateToUpdate = new Date(TrnDyear, TrnDmonth - 1, TrnDday, 0, 00, 00);
    var MinDt = new Date(Minyear, Minmonth - 1, Minday, 0, 00, 00);
    var MaxDt = new Date(Maxyear, Maxmonth - 1, Maxday, 0, 00, 00);

    if (TrnDateToUpdate < MinDt) {
        alert("Back Dated Transaction not Allowed!");
        return;
    }
    else if (TrnDateToUpdate > MaxDt) {
        alert("Transaction for future Date not Allowed!");
        return;
    }

    //if (FormGlblData.isSaveButtonClicked == 1) return;
    FormGlblData.isSaveButtonClicked = 1;

    var validationMsg = Save_FinalValidation();

    if (validationMsg.length > 1) {
        alert(validationMsg);
        return;
    }

    var TrnDateToUpdate = $("#HdrSec1_DatPicDate_Val").val();


    var TrnDateTemp = TrnDateToUpdate.match(/\d+/g),
         TrnDday = TrnDateTemp[0].substring(), // get only two digits
        TrnDmonth = TrnDateTemp[1],
        TrnDyear = TrnDateTemp[2];

    var MindatePart = CdMasModel.TrnMinDate.match(/\d+/g),
        Minyear = MindatePart[0].substring(), // get only two digits
        Minmonth = MindatePart[1],
        Minday = MindatePart[2];
    //  var MinDt = Minday + '/' + Minmonth + '/' + Minyear;

    var MaxdatePart = CdMasModel.TrnMaxDate.match(/\d+/g),
        Maxyear = MaxdatePart[0].substring(), // get only two digits
        Maxmonth = MaxdatePart[1],
        Maxday = MaxdatePart[2];
    //   var MaxDt = Maxday + '/' + Maxmonth + '/' + Maxyear;

    var TrnDateToUpdate = new Date(TrnDyear, TrnDmonth - 1, TrnDday, 0, 00, 00);
    var MinDt = new Date(Minyear, Minmonth - 1, Minday, 0, 00, 00);
    var MaxDt = new Date(Maxyear, Maxmonth - 1, Maxday, 0, 00, 00);

    if (TrnDateToUpdate < MinDt) {
        alert("Back Dated Transaction not Allowed!");
        return;
    }
    else if (TrnDateToUpdate > MaxDt) {
        alert("Transaction for future Date not Allowed!");
        return;
    }

    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == null || PrjKy == 0 || PrjKy == undefined) {
        var PrjKy = 1;
    }

    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }

    var DlyAdrKy = $("#HdrSec2_CmbDeliNoTo_Cd").data('kendoComboBox').value();
    if (DlyAdrKy == null || DlyAdrKy == 0 || DlyAdrKy == undefined) {
        var DlyAdrKy = 1;
    }

    var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy == 0 || FrmLocKy == null) {
        var FrmLocKy = 1;
    }

    var BUKY = 1;
    var AccKy = $("#HdrSec2_CmbSupAcc_Cd").data('kendoComboBox').value();
    if (AccKy == 0 || AccKy == null) {
        var AccKy = 1;
    }

    var RecDayKy = $("#HdrSec1_CmbDay_Cd").data('kendoComboBox').value();
    if (RecDayKy == 0 || RecDayKy == null) {
        var RecDayKy = 1;
    }

    var DlvNoKy = $("#HdrSec1_CmbDeliNo_Cd").data('kendoComboBox').value();
    if (DlvNoKy == 0 || DlvNoKy == null) {
        var DlvNoKy = 1;
    }

    var Pmt = $("#HdrSec3_CmbPmtTrms_Cd").data('kendoComboBox').value();
    if (Pmt == 0 || Pmt == null) {
        var Pmt = 1;
    }

    var Currency = $("#HdrSec3_CmbCurrncy_Cd").data('kendoComboBox').value();
    if (Currency == 0 || Currency == null) {
        var Currency = 178;
    }
    var date = $("#HdrSec1_DatPicDate_Val").val();
    var ExRate = $("#HdrSec3_NmricExRate_Val").data('kendoNumericTextBox').value();
    if (ExRate == 0 || ExRate == null) {
        var ExRate = 1;
    }
    var FrmOrdDetKys = $("#OrdDetKy").val();
    if (FrmOrdDetKys == 0 || FrmOrdDetKys == null) {
        var FrmOrdDetKys = "";
    }

    // Spcl Ord Section
    var delyDate = $("#HdrSec1_DatPicProdDeliveryDate_Val").val();

    var custTime = $("#HdrSec3_CmbCustTime_Cd").data('kendoComboBox').value();
    if (custTime == 0 || custTime == null) {
        var custTime = 1;
    }
    var prodDisptTime = $("#HdrSec3_CmbProdDisptTime_Cd").data('kendoComboBox').value();
    if (prodDisptTime == 0 || prodDisptTime == null) {
        var prodDisptTime = 1;
    }
    var prodTime = $("#HdrSec3_CmbProdTime_Cd").data('kendoComboBox').value();
    if (prodTime == 0 || prodTime == null) {
        var prodTime = 1;
    }
    //------------Spcl Order

    var ReqDt = $("#HdrSec5_DatPicReqDt_Val").val();
    var SubTotal = $("#HdrSec4_NmricSubTotal_Val").data("kendoNumericTextBox").value();
    var Discount = $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value();
    var NBT = $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value();
    var Vat = $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value();
    var Wht = $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value();
    var Svat = $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value();
    var Total = $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value();
    var Yurref = $("#HdrSec1_InptYurRef_Val").val();

    var DocNo = $("#HdrSec1_InptDocNo_Val").val();
    var OrdKySelect = $("#OrdKy1").val();
    var OrdTypKySelect = $("#OrdTypKy1").val();
    var OrdPrefixKySelect = $("#OrdPrefixKy1").val();
    var OrdNoSelect = $("#OrdNo1").val();
    var AccTrnKy = $("#AccTrnKy").val();

    var Description = $("#HdrSec7_InptDesc_Val").val();
    var Remark = $("#HdrSec7_InptRemark_Val").val();

    var PrntOrdNo = $("#HdrSec1_CmbPOrdNo_Cd").val();
    if (PrntOrdNo == "" || PrntOrdNo == null || PrntOrdNo == undefined) PrntOrdNo = 1;

    var RepAdrKy = $("#HdrSec2_CmbRepAdr_Cd").data('kendoComboBox').value();
    if (RepAdrKy == "" || RepAdrKy == null || RepAdrKy == undefined) RepAdrKy = 1;

    if (viewBag.OurCd == "SlsOrd") {
        var validationData = {
            ObjKy: viewBag.ObjKy,
            CurVal: Total,
            EftvDt: date,
            LocKy: FrmLocKy,
            TrnTypKy: FormGlblData.OrdTypKy,
            BUKy: BUKY,
            PrjKy: PrjKy,
            AdrKy: AdrKy,
            AccKy: AccKy
        }
        var isApr = AccCrLimit_Validate(validationData);
    } else {
        ComSaveFunction_AfterAprValidation(1);
    }
}


function ComSaveFunction_AfterAprValidation(isApr) {

    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == null || PrjKy == 0 || PrjKy == undefined) {
        var PrjKy = 1;
    }

    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }

    var DlyAdrKy = $("#HdrSec2_CmbDeliNoTo_Cd").data('kendoComboBox').value();
    if (DlyAdrKy == null || DlyAdrKy == 0 || DlyAdrKy == undefined) {
        var DlyAdrKy = 1;
    }

    var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy == 0 || FrmLocKy == null) {
        var FrmLocKy = 1;
    }

    var FrmLocKy2 = $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy2 == 0 || FrmLocKy2 == null) {
        var FrmLocKy2 = 1;
    }

    var BUKY = $("#HdrSec2_CmbBU_Cd").data('kendoComboBox').value();
    if (BUKY == 0 || BUKY == null) {
        var BUKY = 1;
    }

    var AccKy = $("#HdrSec2_CmbSupAcc_Cd").data('kendoComboBox').value();
    if (AccKy == 0 || AccKy == null) {
        var AccKy = 1;
    }

    var RecDayKy = $("#HdrSec1_CmbDay_Cd").data('kendoComboBox').value();
    if (RecDayKy == 0 || RecDayKy == null) {
        var RecDayKy = 1;
    }

    var DlvNoKy = $("#HdrSec1_CmbDeliNo_Cd").data('kendoComboBox').value();
    if (DlvNoKy == 0 || DlvNoKy == null) {
        var DlvNoKy = 1;
    }

    var Pmt = $("#HdrSec3_CmbPmtTrms_Cd").data('kendoComboBox').value();
    if (Pmt == 0 || Pmt == null) {
        var Pmt = 1;
    }

    var Currency = $("#HdrSec3_CmbCurrncy_Cd").data('kendoComboBox').value();
    if (Currency == 0 || Currency == null) {
        var Currency = 178;
    }
    var date = $("#HdrSec1_DatPicDate_Val").val();
    var ExRate = $("#HdrSec3_NmricExRate_Val").data('kendoNumericTextBox').value();
    if (ExRate == 0 || ExRate == null) {
        var ExRate = 1;
    }
    var FrmOrdDetKys = $("#OrdDetKy").val();
    if (FrmOrdDetKys == 0 || FrmOrdDetKys == null) {
        var FrmOrdDetKys = "";
    }

    // Spcl Ord Section
    var delyDate = $("#HdrSec1_DatPicProdDeliveryDate_Val").val();

    var custTime = $("#HdrSec3_CmbCustTime_Cd").data('kendoComboBox').value();
    if (custTime == 0 || custTime == null) {
        var custTime = 1;
    }
    var prodDisptTime = $("#HdrSec3_CmbProdDisptTime_Cd").data('kendoComboBox').value();
    if (prodDisptTime == 0 || prodDisptTime == null) {
        var prodDisptTime = 1;
    }
    var prodTime = $("#HdrSec3_CmbProdTime_Cd").data('kendoComboBox').value();
    if (prodTime == 0 || prodTime == null) {
        var prodTime = 1;
    }

    var OderModeKy = $("#HdrSec2_CmbOrdMode_Cd").data('kendoComboBox').value();
    if (OderModeKy == null || OderModeKy == 0 || OderModeKy == undefined) {
        var OderModeKy = 1;
    }

    var DlvryModeKy = $("#HdrSec2_CmbDlvryMode_Cd").data('kendoComboBox').value();
    if (DlvryModeKy == null || DlvryModeKy == 0 || DlvryModeKy == undefined) {
        var DlvryModeKy = 1;
    }


    //------------Spcl Order

    var ReqDt = $("#HdrSec5_DatPicReqDt_Val").val();
    var SubTotal = $("#HdrSec4_NmricSubTotal_Val").data("kendoNumericTextBox").value();
    var Discount = $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value();
    var NBT = $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value();
    var Vat = $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value();
    var Wht = $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value();
    var Svat = $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value();
    var Total = $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value();
    var Yurref = $("#HdrSec1_InptYurRef_Val").val();

    var DocNo = $("#HdrSec1_InptDocNo_Val").val();
    var OrdKySelect = $("#OrdKy1").val();
    var OrdTypKySelect = $("#OrdTypKy1").val();
    var OrdPrefixKySelect = $("#OrdPrefixKy1").val();
    var OrdNoSelect = $("#OrdNo1").val();
    var AccTrnKy = $("#AccTrnKy").val();

    var Description = $("#HdrSec7_InptDesc_Val").val();
    var Remark = $("#HdrSec7_InptRemark_Val").val();

    var PrntOrdNo = $("#HdrSec1_CmbPOrdNo_Cd").val();
    if (PrntOrdNo == "" || PrntOrdNo == null || PrntOrdNo == undefined) PrntOrdNo = 1;

    var RepAdrKy = $("#HdrSec2_CmbRepAdr_Cd").data('kendoComboBox').value();
    if (RepAdrKy == "" || RepAdrKy == null || RepAdrKy == undefined) RepAdrKy = 1;

    var DistAdrKy = $("#HdrSec2_CmbDistAdr_Cd").data('kendoComboBox').value();
    if (DistAdrKy == "" || DistAdrKy == null || DistAdrKy == undefined) DistAdrKy = 1;

    var OurCd = viewBag.OurCd;//"SALE";
    var ConCd = "OrdTyp";

    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");


    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew() && currentData[i].ItmKy > 0) {
            //alert(currentData[i].qty);
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].ItmKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
        else if (FormGlblData.IsDetailRelatedHdrSectionChanged && currentData[i].ItmKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }


    var deletedRecords = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    }




    if (OrdKySelect == null || OrdKySelect == undefined || OrdKySelect == "" && OrdTypKySelect == null || OrdTypKySelect == undefined || OrdTypKySelect == "" && OrdNoSelect == null || OrdNoSelect == undefined || OrdNoSelect == "" || OrdKySelect == "" && OrdTypKySelect == "") {
        if (FormGlblData.isAlwAdd == 0) { alert("Warning: You Don't Have Permission To Insert."); CLOSELoadingCommon(); return; }
        try{
            $.ajax({
                url: urlInsertHdrPurchaseReq,
                data: JSON.stringify({
                    purReqHdr: JSON.stringify({

                        PrjKy: PrjKy,
                        AdrKy: AdrKy,
                        FrmLocKy: FrmLocKy,
                        LocKy2: FrmLocKy2,
                        BUKY: BUKY,
                        AccKy: AccKy,
                        Date: date,
                        OurCd: OurCd,
                        ConCd: ConCd,
                        DocNo: DocNo,
                        Des: Description,
                        Rem: Remark,
                        Yurref: Yurref,
                        ExRate: ExRate,
                        Currency: Currency,
                        Pmt: Pmt,
                        Discount: Discount,
                        NBT: NBT,
                        Vat: Vat,
                        Wht: Wht,
                        Svat: Svat,
                        SubTotal: SubTotal,
                        Total: Total,
                        RecDayKy: RecDayKy,
                        DlvNoKy: DlvNoKy,
                        DlyDate: delyDate,
                        DispachedTime: prodDisptTime,
                        POrdNoKy: PrntOrdNo,
                        RepAdrKy: RepAdrKy,
                        DistAdrKy: DistAdrKy,
                        IsApr: isApr,
                        DlvryModeKy: DlvryModeKy,
                        OderModeKy: OderModeKy
                    }),
                    ObjKy: viewBag.ObjKy

                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {
                    if (data.OrdKy > 10) {
                        var ordNo = data.OrdNo;
                        $("#OrdNo1").val(ordNo);
                        $("#OrdKy1").val(data.OrdKy);
                        var ordKynew = data.OrdKy;
                        InsertGrid(ordKynew, false);
                    }
                    else alert("Sorry, We Couldn't Save Your Records.\n Please Try Again!");
                
                },
                error: function (e) {
                    alert("Sorry, We Couldn't Save Your Records.\n Please Try Again!");
                    return false;
                }
            });
        }
        catch (ex) { alert("Error Occured due to " + ex.message()); }

    } else {
        if (FormGlblData.isAlwUpdate == 0) { alert("Warning: You Don't Have Permission To Update."); CLOSELoadingCommon(); return; }
        $.ajax({
            url: urlUpdateHdrPurchaseReq,
            data: JSON.stringify({
                purReqUpdtHdr: JSON.stringify({

                    PrjKy: PrjKy,
                    AdrKy: AdrKy,
                    FrmLocKy: FrmLocKy,
                    LocKy2: FrmLocKy2,
                    BUKY: BUKY,
                    AccKy: AccKy,
                    Date: date,
                    OurCd: OurCd,
                    ConCd: ConCd,
                    DocNo: DocNo,
                    Des: Description,
                    Rem: Remark,
                    Yurref: Yurref,
                    YurRefDate: date,
                    ExRate: ExRate,
                    Currency: Currency,
                    Pmt: Pmt,
                    Discount: Discount,
                    NBT: NBT,
                    Vat: Vat,
                    Wht: Wht,
                    Svat: Svat,
                    SubTotal: SubTotal,
                    Total: Total,

                    RecDayKy: RecDayKy,
                    DlvNoKy: DlvNoKy,
                    DlyDate: delyDate,
                    DispachedTime: prodDisptTime,

                    OrdKySelect: OrdKySelect,
                    OrdTypKySelect: OrdTypKySelect,
                    OrdPrefixKySelect: OrdPrefixKySelect,
                    OrdNoSelect: OrdNoSelect,
                    POrdNoKy: PrntOrdNo,
                    RepAdrKy: RepAdrKy,
                    DistAdrKy: DistAdrKy,
                    IsApr: isApr,
                    DlvryModeKy: DlvryModeKy,
                    OderModeKy: OderModeKy

                }),
                ObjKy: viewBag.ObjKy

            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (!data) { alert("Sorry, We Couldn't Update Your Record!\nPlease Try Again"); return;}
                InsertGrid(OrdKySelect, true);
            },
            error: function (e) {
                alert("Sorry, We Couldn't Update Your Records.\n Please Try Again!");
                return false;
            }
        });

    }


    function InsertGrid(ordKydata,
        isUpdate) {
        try{
            $.ajax({
                url: urlInsertPurchesReqDetail,
                data: JSON.stringify({
                    updatedOrders: kendo.stringify(updatedRecords),
                    deletedOrders: kendo.stringify(deletedRecords),
                    newOrders: kendo.stringify(newRecords),
                    purReqDetail: JSON.stringify({
                        PrjKy: PrjKy,
                        AdrKy: AdrKy,
                        FrmLocKy: FrmLocKy,
                        AccKy: AccKy,
                        BUKY: BUKY,
                        Date: date,
                        OurCd: OurCd,
                        ConCd: ConCd,
                        DlyAdrKy: DlyAdrKy,
                        ordKydata: ordKydata,
                        FrmOrdDetKys: FrmOrdDetKys,
                        DlyTimeKy: custTime,
                        ProductionTime: prodTime,
                        ObjKy: viewBag.ObjKy
                    })

                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {
                    if (data) {

                        if (isUpdate) {
                            alert("Successfully Updated...!");
                            FormGlblData.isSaveButtonClicked = 0;
                        }
                        else {
                            alert("Successfully Saved...!");
                            FormGlblData.isSaveButtonClicked = 0;
                            readOnly();
                        }

                        var ordKydata = $("#OrdKy1").val();
                        //ComClearFunction();
                        GetHdrDetailOrdFrmFind(ordKydata);
                    }
                    else {
                        alert("Sorry, We Couldn't Save Your Detail Records Properly!\nPlease Try Again!");
                    }
                },
                error: function (e) {
                    alert("Sorry, We Couldn't Save Your Detail Records Properly!\nPlease Try Again!");
                    return false;
                }
            });
        }
        catch (ex) { alert("Error Occured due to " + ex.message); }
        $("#OrdDetKy").val(null);
    }
}

function SaveNewFunction() {
    ComSaveFunction();
    //ComClearFunction();
}

function ComClearFunction() {
    $("#pager").hide();
    FormGlblData.ISNeworUpdateTranction = 1;
    FormGlblData.isAllowSaveByBackDate = 1;
    FormGlblData.DblClickedIndex = null;
    setDates();
    var id = ("#" + viewBag.OurCd);
    $(id).data("kendoGrid").dataSource.filter(null);
    var grid = $(id).data("kendoGrid");
    grid.dataSource.data([]);

    // -- Clear and Set Default Again --
    Clear_AllDefalutValue_Obj();
    comClearWithOutGrid();
    setDates();
    AllowEditing();
    RefreshPageUrl();
}

function comClearWithOutGrid() {    
    $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value(null);
    //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value(null);

    $("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox").value(null);
    //$("#HdrSec2_CmbDeliNoTo_Nm").data("kendoComboBox").value(null);
    $("#HdrSec3_CmbProdTime_Cd").data("kendoComboBox").value(null);
    $("#HdrSec3_CmbProdDisptTime_Cd").data("kendoComboBox").value(null);
    $("#HdrSec3_CmbCustTime_Cd").data("kendoComboBox").value(null);

    $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec2_CmbAdr_Nm").data('kendoComboBox').value(null);
    $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
    $("#HdrSec2_CmbSupAcc_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec2_CmbSupAcc_Nm").data('kendoComboBox').value(null);
    $("#HdrSec5_TxtDes_Val").val(null);
    $("#HdrSec5_TxtRem_Val").val(null);
    $("#HdrSec1_InptYurRef_Val").val(null);
    $("#HdrSec1_InptDocNo_Val").val(null);
    $("#HdrSec7_InptDesc_Val").val(null);
    $("#HdrSec7_InptRemark_Val").val(null);

    $("#PrefixOrdNo1").val(null);
    $("#OrdKy1").val(null);
    $("#OrdTypKy1").val(null);
    $("#OrdPrefixKy1").val(null);
    $("#OrdNo1").val(null);
    $("#OrdNo").val(null);
    //OrdNo

    $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec2_CmbLoc_Nm").data('kendoComboBox').value(null);
    $("#HdrSec2_CmbPrj_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec2_CmbPrj_Nm").data('kendoComboBox').value(null);
    $("#HdrSec1_CmbDay_Cd").data('kendoComboBox').value(null);
    $("#HdrSec1_CmbDeliNo_Cd").data('kendoComboBox').value(null);
    $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value(null);


    $("#HdrSec4_NmricSubTotal_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec3_NmricExRate_Val").data("kendoNumericTextBox").value(1);


    

    $("#HdrSec3_NmricExRate_Val").kendoNumericTextBox({
        min: 1,

    });
    try {
        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);
        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
    } catch (e) { }
    
    $("#HdrSec5_CmbItm_Val").val("");
    document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';

    $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value(null);
    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricPRQty_Val").data("kendoNumericTextBox").value(null);
    $('#HdrSec5_DatPicReqDt_Val').data("kendoDatePicker").value(todayDate);
    

    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    $('#HdrSec1_DatPicProdDeliveryDate_Val').data("kendoDatePicker").value(todayDate);
    try {
        $("#HdrSec2_CmbOrdMode_Cd").data("kendoComboBox").value(null);
        //$("#HdrSec2_CmbOrdMode_Nm").data("kendoComboBox").value(null);
        $("#HdrSec2_CmbDlvryMode_Cd").data("kendoComboBox").value(null);
        //$("#HdrSec2_CmbDlvryMode_Nm").data("kendoComboBox").value(null);
    } catch (e) {

    }

}

function RefreshPageUrl() {
    var url = window.location.href;
    var slice = url.split('IniTrnKy=');
    if (slice[1] > 10) {
        LoadPoForm();
        return;
    }
   
}
function LoadPoForm() {
    var ObjNm = 'Purchase Order';
    $.ajax({
        url: urlAutoCompleteGoToMenu,
        data: JSON.stringify({
            SearchQuery: $("#AutoCompleteGoToMenu").val(),
            ColNm: "ObjNm"

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ObjCaptn == ObjNm) { //'Set-offs'
                    OpenMenuByItem(data[i], 1, 0);
                }
            }

        },
        error: function (e) {
            return false;
        }
    });

}
