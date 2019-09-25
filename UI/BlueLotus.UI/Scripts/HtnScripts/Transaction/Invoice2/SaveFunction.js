
function ComSaveFunction() {

    if (FormGlblData.isAllowSaveByBackDate == 0) {
        alert("Save Disabled Due to Cofiguration!");
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


    if (FormGlblData.isSaveButtonClicked == 1)
        return;
    FormGlblData.isSaveButtonClicked = 1;

    ComSaveFunctionWithPrint(0);
}

function ComSaveFunctionWithPrint(IsWithPrint) {

    var id = ("#" + viewBag.OurCd);
    //var gridData = $(id).data("kendoGrid").dataSource._data;
    //for (var i = 0; i < gridData.length; i++) {
    //    if ((gridData[i].TrnRate == 0.00 || gridData[i].TrnRate == undefined || gridData[i].TrnRate == null) && (gridData[i].IsAct == 1))
    //    {
    //        alert("Rate Can't be 0.00");
    //        return;
    //    }
    //}


    var validationMsg = Save_FinalValidation();
    // Handling Spcl VAT NBT;
    CalVatAmt();

    if (validationMsg.length > 1) {
        alert(validationMsg);
        FormGlblData.isSaveButtonClicked = 0;
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


    var OrdNoWITHPreCd = $("#OrdNo1").val().split(" ");
    var OrdNoVal = OrdNoWITHPreCd[1];

    var dliNo = $("#HdrSec1_CmbDeliNo_Cd").data('kendoComboBox').value();
    if (dliNo == 0 || dliNo == null) {
        var dliNo = 1;
    }

    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null) {
        var PrjKy = 1;
    }

    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }
    var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy == 0 || FrmLocKy == null) {
        var FrmLocKy = 1;
    }

    var BUKY = 1;
    var AccKy = $("#HdrSec2_CmbAcc_Cd").data('kendoComboBox').value();
    if (AccKy == 0 || AccKy == null) {
        var AccKy = 1;
    }

    var SlsACId = $("#HdrSec2_CmbContractAcc_Cd").data('kendoComboBox').value();
    if (SlsACId == 0 || SlsACId == null) {
        var SlsACId = 1;
    }

    var Pmt = $("#HdrSec3_CmbPmtTrms_Cd").data('kendoComboBox').value();
    if (Pmt == 0 || Pmt == null) {
        var Pmt = 1;
    }

    var Currency = $("#HdrSec3_CmbCurrncy_Cd").data('kendoComboBox').value();
    if (Currency == 0 || Currency == null) {
        var Currency = 1;
    }
    var date = $("#HdrSec1_DatPicDate_Val").val();
    var ExRate = $("#HdrSec3_NmricExRate_Val").data('kendoNumericTextBox').value();
    if (ExRate == 0 || ExRate == null) {
        var ExRate = 1;
    }

    var RepAdrKy = $("#HdrSec2_CmbRepAdr_Cd").data('kendoComboBox').value();
    if (RepAdrKy == "" || RepAdrKy == null || RepAdrKy == undefined) RepAdrKy = 1;

    var OrdNoKy = $("#HdrSec1_CmbOrdNo_Cd").data('kendoComboBox').value();
    if (OrdNoKy == "" || OrdNoKy == null || OrdNoKy == undefined) OrdNoKy = 1;

    var Des_Header = $("#HdrSec6_InptDesc_Val").val();
    var Rem_Header = $("#HdrSec6_InptRemark_Val").val();

    var SubTotal = $("#HdrSec4_InptSubTotal_Val").data("kendoNumericTextBox").value();
    var Dsicount = $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value();
    var NBT = $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value();
    var Vat = $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value();
    var Wht = $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value();
    var Svat = $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value();

    var Amt1 = $("#HdrSec9_Amt1_Val").data("kendoNumericTextBox").value();
    var Amt2 = $("#HdrSec9_Amt2_Val").data("kendoNumericTextBox").value();
    var Amt3 = $("#HdrSec9_Amt3_Val").data("kendoNumericTextBox").value();
    var Amt4 = $("#HdrSec9_Amt4_Val").data("kendoNumericTextBox").value();
    var Amt5 = $("#HdrSec9_Amt5_Val").data("kendoNumericTextBox").value();
    var Amt6 = $("#HdrSec9_Amt6_Val").data("kendoNumericTextBox").value();
    var ComisPer = $("#HdrSec9_ComisPer_Val").data("kendoNumericTextBox").value();
    var RepComisPer = $("#HdrSec9_RepComisPer_Val").data("kendoNumericTextBox").value();

    //var DetailAmt1 = $("#HdrSec8_Amt1_Val").data("kendoNumericTextBox").value();
    //var DetailAmt2 = $("#HdrSec8_Amt2_Val").data("kendoNumericTextBox").value();
    //var DetailAmt3 = $("#HdrSec8_Amt3_Val").data("kendoNumericTextBox").value();
    //var DetailAmt4 = $("#HdrSec8_Amt4_Val").data("kendoNumericTextBox").value();
    //var DetailAmt5 = $("#HdrSec8_Amt5_Val").data("kendoNumericTextBox").value();
    //var DetailAmt6 = $("#HdrSec8_Amt6_Val").data("kendoNumericTextBox").value();
    //var TaskQty = $("#HdrSec8_TaskQty_Val").data("kendoNumericTextBox").value();
    //var TaskUnitKy = "";


    var Total = $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value();
    var Yurref = $("#HdrSec1_InptYurRef_Val").val();
    var YurRefDate = $("#HdrSec1_InptYurRef_ValDate").val();
    var DocNo = $("#HdrSec1_InptDocNo_Val").val();
    var OrdKySelect = FormGlblData.TrnKy;
    var OrdTypKySelect = FormGlblData.TrnTypKy;
    var OrdPrefixKySelect = 1;
    var OrdNoSelect = OrdNoVal;
    var AccTrnKy = $("#AccTrnKy").val();
    var OurCd = viewBag.OurCd;//"SALE";
    var ConCd = "TrnTyp";
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew() && currentData[i].ItmKy > 0) {
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
    $.ajax({
        url: urlTransactionValidateTrnDt, //"@Url.Content("~/Transaction/ValidateTrnDt")",
        data: JSON.stringify({
            Date: date,
            OurCd: OurCd,
            ConCd: ConCd,
            PrjKy: PrjKy,
            LocKy: FrmLocKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (dataList) {
            OPENLodingCommon('Saving ... !');
            StartSavingFunction(
                dataList,
                PrjKy,
                AdrKy,
                FrmLocKy,
                BUKY,
                AccKy,
                date,
                OurCd,
                ConCd,
                DocNo,
                Yurref,
                YurRefDate,
                ExRate,
                Currency,
                Pmt,
                SlsACId,
                Dsicount,
                NBT,
                Vat,
                Wht,
                Svat,
                SubTotal,
                Total,
                dliNo,
                OrdKySelect,
                OrdTypKySelect,
                OrdNoSelect,
                OrdPrefixKySelect,
                Des_Header,
                Rem_Header,
                newRecords,
                updatedRecords,
                deletedRecords,
                IsWithPrint,
                RepAdrKy,
                OrdNoKy,
                Amt1,
                Amt2,
                Amt3,
                Amt4,
                Amt5,
                Amt6,
                ComisPer,
                RepComisPer                
            );
        },
        error: function (e) {
            FormGlblData.isSaveButtonClicked = 0;
            return;
        }
    });
}

function StartSavingFunction(
    dataList,
    PrjKy,
    AdrKy,
    FrmLocKy,
    BUKY,
    AccKy,
    date,
    OurCd,
    ConCd,
    DocNo,
    Yurref,
    YurRefDate,
    ExRate,
    Currency,
    Pmt,
    SlsACId,
    Dsicount,
    NBT,
    Vat,
    Wht,
    Svat,
    SubTotal,
    Total,
    dliNo,
    OrdKySelect,
    OrdTypKySelect,
    OrdNoSelect,
    OrdPrefixKySelect,
    Des_Header,
    Rem_Header,
    newRecords,
    updatedRecords,
    deletedRecords,
    IsWithPrint,
    RepAdrKy,
    OrdNoKy,
    Amt1,
    Amt2,
    Amt3,
    Amt4,
    Amt5,
    Amt6,
    ComisPer,
    RepComisPer    
) {

    for (i = 0; i < dataList.length; i++) {

        var validate = dataList[0].IsValidate;
        var message = dataList[0].Message;
        if (validate == 1) {
            if (FormGlblData.TrnKy > 11) {
                if (FormGlblData.isAlwUpdate == 0) { alert("Warning: You Don't Have Permission To Update."); CLOSELoadingCommon(); return; }
                try {
                    $.ajax({
                        url: urlTransactionUpdateDeatilHdrInvoice, //"@Url.Content("~/Transaction/UpdateDeatilHdrInvoice")",
                        data: JSON.stringify({
                            ObjKy: viewBag.ObjKy,
                            AccessLvlKy: FormGlblData.AccessLvlKy,
                            ConfiLvlKy: FormGlblData.ConfiLvlKy,
                            ContraAccObjKy: GetObjKy('HdrSec2_CmbContractAcc'),
                            AccObjKy: GetObjKy('HdrSec2_CmbAcc'),
                            PrjKy: PrjKy,
                            AdrKy: AdrKy,
                            FrmLocKy: FrmLocKy,
                            BUKY: BUKY,
                            AccKy: AccKy,
                            Date: date,
                            OurCd: OurCd,
                            ConCd: ConCd,
                            DocNo: DocNo,
                            Yurref: Yurref,
                            YurRefDate: YurRefDate,
                            ExRate: ExRate,
                            Currency: Currency,
                            Pmt: Pmt,
                            SlsACId: SlsACId,
                            Dsicount: Dsicount,
                            NBT: NBT,
                            Vat: Vat,
                            Wht: Wht,
                            Svat: Svat,
                            SubTotal: SubTotal,
                            Total: Total,
                            DliNo: dliNo,
                            Des: Des_Header,
                            Rem: Rem_Header,

                            OrdKySelect: OrdKySelect,
                            OrdTypKySelect: OrdTypKySelect,
                            OrdPrefixKySelect: OrdPrefixKySelect,
                            OrdNoSelect: OrdNoSelect,
                            TmStmp: FormGlblData.TmStmp,
                            RepAdrKy: RepAdrKy,
                            OrdNoKy: OrdNoKy,
                            Amt1: Amt1,
                            Amt2: Amt2,
                            Amt3: Amt3,
                            Amt4: Amt4,
                            Amt5: Amt5,
                            Amt6: Amt6,
                            ComisPer: ComisPer,
                            RepComisPer: RepComisPer



                        }),
                        contentType: 'application/json; charset=utf-8',
                        dataType: "Json",
                        type: "POST",
                        success: function (data) {
                            if (data.TrnKy > 0) {

                                FormGlblData.AccessLvlKy = data.AcsLvlKy;
                                FormGlblData.ConfiLvlKy = data.ConFinLvlKy;
                                FormGlblData.TrnKy = data.TrnKy;
                                FormGlblData.RecKy = data.TrnKy;
                                if (IsWithPrint != 3) {
                                    UpdateHdrUI(FormGlblData.TrnKy);
                                }
                                InsertGrid(                                    
                                    PrjKy,
                                    AdrKy,
                                    FrmLocKy,
                                    AccKy,
                                    BUKY,
                                    date,
                                    Currency,
                                    Pmt,
                                    OurCd,
                                    ConCd,
                                    newRecords,
                                    updatedRecords,
                                    deletedRecords,
                                    true
                                );
                            }
                            else {
                                alert("Update faild from Hdr.")
                                FormGlblData.isSaveButtonClicked = 0;
                                return;
                            }
                        },
                        error: function (e) {
                            alert("Sorry, We Couldn't Update Please Try Again!");
                            FormGlblData.isSaveButtonClicked = 0;
                            return;
                        }
                    });
                }
                catch (ex) { alert("Error Occured due to " + ex.message); }


            } else {
                if (FormGlblData.isAlwAdd == 0) { alert("Warning: You Don't Have Permission To Insert."); CLOSELoadingCommon(); return; }
                try {
                    $.ajax({
                        url: urlTransactionInsertDeatilHdrInvoice, //"@Url.Content("~/Transaction/InsertDeatilHdrInvoice")",
                        data: JSON.stringify({
                            //, ObjKy, ContraAccObjKy, AccObjKy
                            ObjKy: viewBag.ObjKy,
                            ContraAccObjKy: GetObjKy('HdrSec2_CmbContractAcc'),
                            AccObjKy: GetObjKy('HdrSec2_CmbAcc'),
                            PrjKy: PrjKy,
                            AdrKy: AdrKy,
                            FrmLocKy: FrmLocKy,
                            BUKY: BUKY,
                            AccKy: AccKy,
                            Date: date,
                            OurCd: OurCd,
                            ConCd: ConCd,
                            DocNo: DocNo,
                            Yurref: Yurref,
                            ExRate: ExRate,
                            Currency: Currency,
                            Pmt: Pmt,
                            SlsACId: SlsACId,
                            Dsicount: Dsicount,
                            NBT: NBT,
                            Vat: Vat,
                            Wht: Wht,
                            Svat: Svat,
                            SubTotal: SubTotal,
                            Total: Total,
                            DliNo: dliNo,
                            Des: Des_Header,
                            Rem: Rem_Header,
                            RepAdrKy: RepAdrKy,
                            OrdNoKy: OrdNoKy,
                            Amt1: Amt1,
                            Amt2: Amt2,
                            Amt3: Amt3,
                            Amt4: Amt4,
                            Amt5: Amt5,
                            Amt6: Amt6,
                            ComisPer: ComisPer,
                            RepComisPer: RepComisPer
                        }),
                        contentType: 'application/json; charset=utf-8',
                        dataType: "Json",
                        type: "POST",
                        success: function (data) {
                            if (data.TrnKy > 0) {

                                FormGlblData.AccessLvlKy = data.AcsLvlKy;
                                FormGlblData.ConfiLvlKy = data.ConFinLvlKy;
                                FormGlblData.TrnKy = data.TrnKy;
                                FormGlblData.RecKy = data.TrnKy;

                                if (IsWithPrint != 3) {
                                    UpdateHdrUI(FormGlblData.TrnKy);
                                }
                                InsertGrid(                                    
                                    PrjKy,
                                    AdrKy,
                                    FrmLocKy,
                                    AccKy,
                                    BUKY,
                                    date,
                                    Currency,
                                    Pmt,
                                    OurCd,
                                    ConCd,
                                    newRecords,
                                    updatedRecords,
                                    deletedRecords,
                                    false,
                                    IsWithPrint
                                );
                            }
                            else {
                                alert("Insert faild from Hdr.")
                                FormGlblData.isSaveButtonClicked = 0;
                                return;
                            }
                        },
                        error: function (e) {
                            alert("Sorry, We Couldn't Insert Your Record!\nPlease Try Again!");
                            FormGlblData.isSaveButtonClicked = 0;
                            return;
                        }
                    });
                }
                catch (ex) { alert("Error Occured due to " + ex.message); }

            }
        } else {
            CLOSELoadingCommon();
            alert(message);
            FormGlblData.isSaveButtonClicked = 0;
            return;
        }
    }
}

function InsertGrid(
    PrjKy,
    AdrKy,
    FrmLocKy,
    AccKy,
    BUKY,
    date,
    Currency,
    Pmt,
    OurCd,
    ConCd,
    newRecords,
    updatedRecords,
    deletedRecords,
    isUpdate,
    IsWithPrint
) {

    var ordKydata = FormGlblData.TrnKy;
    try {
        $.ajax({
            url: urlTransactionInsertDetailGridInvoice, //"@Url.Content("~/Transaction/InsertDetailGridInvoice")",
            data: JSON.stringify({
                AccessLvlKy: FormGlblData.AccessLvlKy,
                updatedOrders: kendo.stringify(updatedRecords), deletedOrders: kendo.stringify(deletedRecords), newOrders: kendo.stringify(newRecords),
                ObjKy: viewBag.ObjKy,
                PrjKy: PrjKy,
                AdrKy: AdrKy,
                FrmLocKy: FrmLocKy,
                AccKy: AccKy,
                BUKY: BUKY,
                Date: date,
                OurCd: OurCd,
                ConCd: ConCd,
                ordKydata: ordKydata
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (!data) { alert("Sorry, Record Not Saved! or FIFO Posting Fail.\n Please Try Again."); return; }
                FormGlblData.isFromFind = 1;
                FormGlblData.isFirstTimeComboChange = 0;
                var ordKydata = FormGlblData.TrnKy;

                SaveSerialNumberData(ordKydata);

                if (IsWithPrint != 3) {
                    //UpdateDetUI(FormGlblData.TrnKy);
                    GetInvoiceGridDetail(ordKydata);
                }


                CLOSELoadingCommon();

                if (IsWithPrint == 1 || IsWithPrint == 3) {
                    PrintSource();
                }

                InsertAccounts(
                    isUpdate,
                    date,
                    Currency,
                    Pmt
                );
            },
            error: function (e) {
                alert("Sorry, We Couldn't Save Your Detail Properly!\nPlease Try Again!");
                FormGlblData.isSaveButtonClicked = 0;
                return;
            }
        });
    }
    catch (ex) { alert("Error Occured due to " + ex.message); }
}

function InsertAccounts(
    isUpdate,
    date,
    Currency,
    Pmt
) {

    var ConCd = "TrnTyp";
    var OurCd = viewBag.OurCd;
    var ordKydata = FormGlblData.TrnKy;
    try {
        $.ajax({
            url: urlTransactionInsertAccountsInvoice, //"@Url.Content("~/Transaction/InsertAccountsInvoice")",
            data: JSON.stringify({
                TrnKy: ordKydata,
                ObjKy: viewBag.ObjKy,
                Dt: date,
                ConCd: ConCd,
                OurCd: OurCd,
                Currency: Currency,
                Pmt: Pmt
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                //alert("Account Posting done...!");

                if (isUpdate) {
                    FormGlblData.isSaveButtonClicked = 0;
                    alert(data);
                }
                else {
                    FormGlblData.isSaveButtonClicked = 0;
                    alert(data);
                }

                if (FormGlblData.isSaveandNew == 1)
                    ComClearFunction();

            },
            error: function (e) {
                FormGlblData.isFromFind = 1;
                FormGlblData.isFirstTimeComboChange = 0;
                alert("Account Posting failed...!");
                if (FormGlblData.isSaveandNew == 1)
                    ComClearFunction();
                FormGlblData.isSaveButtonClicked = 0;
                return;
            }
        });
    }
    catch (ex) { alert("Error Occured in Account Posting due to " + ex.message); }

}