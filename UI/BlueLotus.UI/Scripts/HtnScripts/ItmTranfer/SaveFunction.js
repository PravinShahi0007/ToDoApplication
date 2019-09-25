
var urlsendDataSaveChangesHdr = urlTransaction.InsertHdr;
var urlsendDataSaveChangesDetail = urlTransaction.InsertDetail;
var today = new Date();
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

    var MaxdatePart = CdMasModel.TrnMaxDate.match(/\d+/g),
        Maxyear = MaxdatePart[0].substring(), // get only two digits
        Maxmonth = MaxdatePart[1],
        Maxday = MaxdatePart[2];

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

    var ObjKy = viewBag.ObjKy;
    var validationMsg = Save_FinalValidation();

    if (validationMsg.length > 1) {
        alert(validationMsg);
        return;
    }

    var FrmPrjKy = $("#HdrSec2_CmbFrmPrj_Cd").data('kendoComboBox').value();
    if (FrmPrjKy == 0 || FrmPrjKy == null) {
        var FrmPrjKy = 1;
    }
    var ToPrjKy = $("#HdrSec2_CmbToPrj_Cd").data('kendoComboBox').value();
    if (ToPrjKy == 0 || ToPrjKy == null) {
        var ToPrjKy = 1;
    }

    var FrmLocKy = $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy == 0 || FrmLocKy == null) {
        var FrmLocKy = 1;
    }
    FormGlblData.FrmLocKy = FrmLocKy;
    var ToLocKy = $("#HdrSec2_CmbToLoc_Cd").data('kendoComboBox').value();
    if (ToLocKy == 0 || ToLocKy == null) {
        var ToLocKy = 1;
    }

    var FrmAdrKy = $("#HdrSec2_CmbFrmAdr_Cd").data('kendoComboBox').value();
    if (FrmAdrKy == 0 || FrmAdrKy == null) {
        var FrmAdrKy = 1;
    }
    var ToAdrKy = $("#HdrSec2_CmbToAdr_Cd").data('kendoComboBox').value();
    if (ToAdrKy == 0 || ToAdrKy == null) {
        var ToAdrKy = 1;
    }

    var PmtKy = $("#HdrSec3_CmbPmtTerm_Cd").data('kendoComboBox').value();
    if (PmtKy == 0 || PmtKy == null) {
        var PmtKy = 1;
    }

    var CrnKy = $("#HdrSec3_CmbCurrency_Cd").data('kendoComboBox').value();
    if (CrnKy == 0 || CrnKy == null) {
        var CrnKy = 1;
    }
    var date = $("#HdrSec1_DatPicDate_Val").val();
    var Des = $("#HdrSec5_InptDesc_Val").val();
    var Rem = $("#HdrSec5_InptRemark_Val").val();
    var DocNo = $("#HdrSec1_InptDocNo_Val").val();
    var ExRate = $("#HdrSec3_InptExRate_Val").val();
    var Yurref = $("#HdrSec1_InptYurRef_Val").val();
    var OurCdFrm = viewBag.OurCd;   //"TRFOUT";
    var OurCdTo = viewBag.OurCd2;   //"TRFIN";
    var ConCd = "TrnTyp";
    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value();
    if (AdrKy == null || AdrKy == 0 || AdrKy == "" || AdrKy == undefined) AdrKy = 1;
    var Amt = $("#HdrSec4_InptTotal_Val").data("kendoNumericTextBox").value();
    if (Amt == "")
        Amt = 0;

    var DisAmt = $("#HdrSec4_InptDisc_Val").data("kendoNumericTextBox").value();

    var FrmTrnKy = FormGlblData.FrmTrnKy;
    var ToTrnKy = FormGlblData.ToTrnKy;;
    var ToTrnNo = $("#HdrSec1_InptTrnNo_ToTrnNo_Val").val();
    var FrmTrnNo = $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val();
    var SiteReqNo = "";
    var FrmTrnPrefixKy = $("#HdrSec1_InptTrnNo_FrmTrnPrefixKy_Val").val();
    var ToTrnPrefixKy = $("#HdrSec1_InptTrnNo_ToTrnPrefixKy_Val").val();
    var FrmTrnTypKy = $("#HdrSec1_InptTrnNo_FrmTrnTypKy_Val").val();
    var ToTrnTypKy = $("#HdrSec1_InptTrnNo_ToTrnTypKy_Val").val();
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");

    var chkval = document.getElementById('HdrSec1_IsRecorrence_Val');
    var IsRecurrence = chkval.checked;
    var IsRecurrenceFromFind = FormGlblData.IsRecurrenceFromFind;
    if (IsRecurrenceFromFind == 0 && IsRecurrence == true) {
        FormGlblData.IsApr = 2;
    }
    var isApr = FormGlblData.IsApr;

    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    if (IsRecurrence == false && IsRecurrenceFromFind == 1) {
        for (var i = 0; i < currentData.length; i++) {
            newRecords.push(currentData[i].toJSON());
        }
    } else {
        for (var i = 0; i < currentData.length; i++) {
            if (currentData[i].isNew() && currentData[i].ItmKy > 0) {
                //this record is new
                newRecords.push(currentData[i].toJSON());
            } else if (currentData[i].dirty && currentData[i].ItmKy > 0) {
                updatedRecords.push(currentData[i].toJSON());
            }
            else if (FormGlblData.IsDetailRelatedHdrSectionChanged && currentData[i].ItmKy > 0) {
                updatedRecords.push(currentData[i].toJSON());
            }
        }
    }

    //this records are deleted
    var deletedRecords = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    }

    function Insert() {
        if (FormGlblData.isAlwAdd == 0) { alert("Warning: You Don't Have Permission To Insert."); CLOSELoadingCommon(); return; }
        try {
            $.ajax({
                url: urlTransaction.InsertItmTransferOutHdr,
                data: JSON.stringify({

                    ObjKy: ObjKy,
                    FrmPrjKy: FrmPrjKy,
                    ToPrjKy: ToPrjKy,
                    FrmLocKy: FrmLocKy,
                    ToLocKy: ToLocKy,
                    FrmAdrKy: FrmAdrKy,
                    ToAdrKy: ToAdrKy,
                    Date: date,
                    DocNo: DocNo,
                    Des: Des,
                    Rem: Rem,
                    SiteReqNo: SiteReqNo,
                    AdrKy: AdrKy,
                    OurCdFrm: OurCdFrm,
                    OurCdTo: OurCdTo,
                    ConCd: ConCd,
                    Amt: Amt,
                    PmtKy: PmtKy,
                    CrnKy: CrnKy,
                    DisAmt: DisAmt,
                    ExRate: ExRate,
                    Yurref: Yurref,
                    IsRecurrence: IsRecurrence,
                    isApr: isApr

                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {
                    if (data.length >= 1) {

                        FormGlblData.AccessLvlKy = data[0].AcsLvlKy;
                        FormGlblData.ConfiLvlKy = data[0].ConFinLvlKy;
                        var FrmTrnKy = data[0].FromTrnKy;
                        var ToTrnKy = data[0].ToTrnKy;
                        //var TrnNo = data[0].TrnNo;
                        //var Totrnno = data[0].ToTrnNo;
                        var FromTrnNo = data[0].FrmTrnNo;
                        var FrmTmStmp = data[0].StringFrmTmStmp;
                        var ToTmStmp = data[0].StringToTmStmp;
                        //alert(FrmTrnKy);
                        $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").val(FrmTrnKy);
                        $("#HdrSec1_InptTrnNo_ToTrnKy_Val").val(ToTrnKy);
                        $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val(FromTrnNo);
                        //$("#HdrSec1_InptTrnNo_ToTrnNo_Val").val(Totrnno);
                        $("#HdrSec1_InptTrnNo_FrmTmStmp_Val").val(FrmTmStmp);
                        $("#HdrSec1_InptTrnNo_ToTmStmp_Val").val(ToTmStmp);
                        try {
                            $.ajax({
                                url: urlTransaction.InsertTrnOutDetail,
                                data: JSON.stringify({
                                    updatedOrders: kendo.stringify(updatedRecords), deletedOrders: kendo.stringify(deletedRecords), newOrders: kendo.stringify(newRecords),
                                    FrmPrjKy: FrmPrjKy,
                                    ToPrjKy: ToPrjKy,
                                    Date: date,
                                    FrmLocKy: FrmLocKy,
                                    ToLocKy: ToLocKy,
                                    FrmTrnKy: FrmTrnKy,
                                    ToTrnKy: ToTrnKy,
                                    OurCdFrm: OurCdFrm,
                                    OurCdTo: OurCdTo,
                                    FrmAdrKy: FrmAdrKy,
                                    ToAdrKy: ToAdrKy,
                                    ConCd: ConCd,
                                    SiteReqNo: SiteReqNo,
                                    FromTrnNo: FromTrnNo,
                                    ToTrnNo: 0,
                                    isApr: isApr,
                                    ObjKy: viewBag.ObjKy

                                }),
                                contentType: 'application/json; charset=utf-8',
                                dataType: "Json",
                                type: "POST",
                                success: function (data) {
                                    if (!data) { alert("Sorry, We Couldn't Save your Detail Records Properly!\nPlease Try Again!"); return; }
                                    //alert("Successfully Saved..!");
                                    FormGlblData.IsRecurrenceFromFind = 0;
                                    FormGlblData.IsRecurrenceGetfromFind = 0;
                                    FormGlblData.IsApr = 1;
                                    FormGlblData.isSaveButtonClicked = 0;
                                    //alert(FrmTrnKy);
                                    LoadInsertedHdr(FrmTrnKy);
                                    LoadInsrtedHdrAfterAccPosting(FrmTrnKy);
                                },
                                error: function (e) {
                                    alert("Sorry, We Couldn't Save your Detail Records Properly!\nPlease Try Again!");
                                    return false;
                                }
                            });
                        }
                        catch (ex) { alert("Error Occour Due to " + ex.message); }
                    }
                },
                error: function (e) {
                    alert("Sorry, We Couldn't Save your Records Properly!\nPlease Try Again!");
                    return false;
                }
            });
        }
        catch (ex) { alert("Error Occured due to " + ex.message); }
    }

    if (Number(FormGlblData.FrmTrnKy) <= 10) {
        Insert();
    }
    else if (Number(FormGlblData.FrmTrnKy) > 10) {
        if (Number(IsRecurrenceFromFind) == 1 && IsRecurrence == false) {

            alert("This From Recurrence Transaction.");
            Insert();
        } else {
            if (FormGlblData.isAlwUpdate == 0) { alert("Warning: You Don't Have Permission To Update."); CLOSELoadingCommon(); return; }
            var FrmTmStmp = FormGlblData.FrmTmStmp;
            var ToTmStmp = FormGlblData.ToTmStamp;
            //var frmtrnky = $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").val();
            //alert(frmtrnky);

            var totrnky = $("#HdrSec1_InptTrnNo_ToTrnKy_Val").val();
            var FromTrnNo = $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val();
            var ToTrnno = $("#HdrSec1_InptTrnNo_ToTrnNo_Val").val();
            var frmtrnprefixky = $("#HdrSec1_InptTrnNo_FrmTrnPrefixKy_Val").val();
            var totrnprefixky = $("#HdrSec1_InptTrnNo_ToTrnPrefixKy_Val").val();
            var frmtrntypky = $("#HdrSec1_InptTrnNo_FrmTrnTypKy_Val").val();
            var totrntypky = $("#HdrSec1_InptTrnNo_ToTrnTypKy_Val").val();
            var FrmTmStmp = $("#HdrSec1_InptTrnNo_FrmTmStmp_Val").val();
            var ToTmStmp = FormGlblData.ToTmStamp; //$("#HdrSec1_InptTrnNo_ToTmStmp_Val").val();


            var Amt = $("#HdrSec4_InptTotal_Val").data("kendoNumericTextBox").value();
            if (Amt == "")
                Amt = 0;

            //alert(Amt);
            try {
                $.ajax({
                    url: urlTransaction.UpdateItmTransferOutHdr,
                    data: JSON.stringify({

                        FrmTrnKy: FrmTrnKy,
                        ToTrnKy: ToTrnKy,
                        FrmTrnNo: FrmTrnNo,
                        ToTrnNo: ToTrnno,
                        FrmTrnPrefixKy: frmtrnprefixky,
                        ToTrnPrefixKy: totrnprefixky,
                        FrmTrntypKy: frmtrntypky,
                        ToTrntypKy: totrntypky,
                        FrmPrjKy: FrmPrjKy,
                        ToPrjKy: ToPrjKy,
                        FrmLocKy: FrmLocKy,
                        ToLocKy: ToLocKy,
                        FrmAdrKy: FrmAdrKy,
                        ToAdrKy: ToAdrKy,
                        Date: date,
                        DocNo: DocNo,
                        Des: Des,
                        SiteReqNo: SiteReqNo,
                        AdrKy: AdrKy,
                        OurCdFrm: OurCdFrm,
                        OurCdTo: OurCdTo,
                        ConCd: ConCd,
                        Amt: Amt,
                        FrmTmStmp: FormGlblData.TmStamp,
                        ToTmStmp: ToTmStmp,
                        Rem: Rem,
                        PmtKy: PmtKy,
                        CrnKy: CrnKy,
                        DisAmt: DisAmt,
                        ExRate: ExRate,
                        Yurref: Yurref,
                        AcsLvlKy: FormGlblData.AccessLvlKy,
                        ConFinLvlKy: FormGlblData.ConFinLvlKy,
                        ObjKy: ObjKy,
                        IsRecurrence: IsRecurrence,
                        isApr: isApr
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {
                        if (data.length >= 1) {
                            var FrmTrnKy = data[0].FromTrnKy;
                            var ToTrnKy = data[0].ToTrnKy;
                            var TrnNo = data[0].TrnNo;
                            var Totrnno = data[0].ToTrnNo;
                            var FromTrnNo = data[0].FrmTrnNo;
                            var FrmTmStmp = data[0].StringFrmTmStmp;
                            var ToTmStmp = data[0].StringToTmStmp;

                            //alert(FrmTrnKy);

                            FormGlblData.FrmTrnKy = FrmTrnKy;
                            FormGlblData.ToTrnKy = ToTrnKy;
                            $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val(FromTrnNo);
                            $("#HdrSec1_InptTrnNo_ToTrnNo_Val").val(Totrnno);
                            FormGlblData.FrmTmStmp = FrmTmStmp;
                            FormGlblData.ToTmStmp = ToTmStmp;

                            $.ajax({
                                url: urlTransaction.InsertTrnOutDetail,
                                data: JSON.stringify({
                                    updatedOrders: kendo.stringify(updatedRecords), deletedOrders: kendo.stringify(deletedRecords), newOrders: kendo.stringify(newRecords),
                                    FrmPrjKy: FrmPrjKy,
                                    ToPrjKy: ToPrjKy,
                                    Date: date,
                                    FrmLocKy: FrmLocKy,
                                    ToLocKy: ToLocKy,
                                    FrmTrnKy: FrmTrnKy,
                                    ToTrnKy: ToTrnKy,
                                    OurCdFrm: OurCdFrm,
                                    OurCdTo: OurCdTo,
                                    FrmAdrKy: FrmAdrKy,
                                    ToAdrKy: ToAdrKy,
                                    ConCd: ConCd,
                                    SiteReqNo: SiteReqNo,
                                    FromTrnNo: FromTrnNo,
                                    ToTrnNo: Totrnno,
                                    isApr: isApr,
                                    ObjKy: viewBag.ObjKy
                                }),
                                contentType: 'application/json; charset=utf-8',
                                dataType: "Json",
                                type: "POST",
                                success: function (data) {
                                    if (!data) { alert("Sorry, We Couldn't Update your Detail Records Properly!\nPlease Try Again!"); return; }
                                    //alert("Successfully Updated..!");
                                    FormGlblData.IsRecurrenceFromFind = 0;
                                    FormGlblData.IsRecurrenceGetfromFind = 0;
                                    FormGlblData.IsApr = 1;
                                    FormGlblData.isSaveButtonClicked = 0;
                                    LoadInsertedHdr(FrmTrnKy);
                                    LoadInsrtedHdrAfterAccPosting(FrmTrnKy);
                                },
                                error: function (e) {
                                    alert("Sorry, We Couldn't Update your Detail Records Properly!\nPlease Try Again!");
                                    return false;
                                }
                            });
                        }
                        else { alert("Sorry, We Couldn't Update Your Record!"); return false; }
                    },
                    error: function (e) {
                        alert("Sorry, We Couldn't Update your Records Properly!\n Please Try Again!");
                        return false;
                    }
                });
            }
            catch (ex) { alert("Error Occured due to " + ex.message); }

        }
    }

}

function LoadInsertedHdr(FrmTrnKyData) {
    $.ajax({
        url: urlTransaction.GetTrnOutNo,
        data: JSON.stringify({
            FrmTrnKy: FrmTrnKyData
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length == 0) {
                alert("There is a Problem to getting this Record! \n Please Contact Support.\n Error Code(" + FrmTrnKyData + ")");
                //ComClearFunction();
                return;
            }

            for (i = 0; i < data.length; i++) {

                var FrmTrnNo = data[0].FromTrnNo;
                var ToTrnNo = data[0].ToTrnNo;
                var Prefix = data[0].Prefix;

                var FrmTrnKy = data[0].FromTrnKy;
                var ToTrnKy = data[0].ToTrnKy;
                FormGlblData.TmStamp = data[0].TmStamp;
                FormGlblData.ToTmStamp = data[0].ToTmStamp;

                FormGlblData.AccessLvlKy = data[0].AcsLvlKy;
                FormGlblData.ConfiLvlKy = data[0].ConFinLvlKy;

                FormGlblData.IsRecurrenceFromFind = data[0].isRecur;
                FormGlblData.IsApr = data[0].isApr

                if (FormGlblData.IsRecurrenceFromFind == 1) document.getElementById("HdrSec1_IsRecorrence_Val").checked = true;
                else document.getElementById("HdrSec1_IsRecorrence_Val").checked = false;

                //alert("fff" + FrmTrnKy + "" + ToTrnKy);

                FormGlblData.FrmTrnKy = FrmTrnKy;
                FormGlblData.ToTrnKy = ToTrnKy;
                $("#HdrSec1_InptTrnNo_TrnOutNo_Val").val(Prefix + FrmTrnNo);
                if (Prefix == null || Prefix == undefined) {
                    $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val(FrmTrnNo);
                }
                else {
                    $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val(Prefix + " " + FrmTrnNo);
                }

                $("#HdrSec1_InptTrnNo_ToTrnNo_Val").val(ToTrnNo);
                var FrmTrnPrefixKy = data[0].FromTrnPrefixKy;
                $("#HdrSec1_InptTrnNo_FrmTrnPrefixKy_Val").val(FrmTrnPrefixKy);
                var ToTrnPrefixKy = data[0].ToTrnPrefixKy;
                $("#HdrSec1_InptTrnNo_ToTrnPrefixKy_Val").val(ToTrnPrefixKy);

                var FrmTrnTypKy = data[0].FromTrnTypKy;
                $("#HdrSec1_InptTrnNo_FrmTrnTypKy_Val").val(FrmTrnTypKy);
                var ToTrnTypKy = data[0].ToTrnTypKy;
                $("#HdrSec1_InptTrnNo_ToTrnTypKy_Val").val(ToTrnTypKy);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').val(TrnDt);
                FormGlblData.FromFindDate = TrnDt;

                var Total = data[0].Amt;
                $("#Amt").val(Total);

                var FrmLocKy = data[0].FromLocKy;
                $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value(FrmLocKy);
               // $("#HdrSec2_CmbFrmLoc_Nm").data('kendoComboBox').value(FrmLocKy);

                var ToLocKy = data[0].ToLocKy;
                $("#HdrSec2_CmbToLoc_Cd").data('kendoComboBox').value(ToLocKy);
               // $("#HdrSec2_CmbToLoc_Nm").data('kendoComboBox').value(ToLocKy);

                var ToPrjKy = data[0].ToPrjKy;
                $("#HdrSec2_CmbToPrj_Cd").data('kendoComboBox').value(ToPrjKy);
                //$("#HdrSec2_CmbToPrj_Nm").data('kendoComboBox').value(ToPrjKy);

                var FrmPrjKy = data[0].FrmPrjKy;
                $("#HdrSec2_CmbFrmPrj_Cd").data('kendoComboBox').value(FrmPrjKy);
               // $("#HdrSec2_CmbFrmPrj_Nm").data('kendoComboBox').value(FrmPrjKy);

                $("#HdrSec2_CmbFrmAdr_Cd").data('kendoComboBox').value(data[0].FrmAdrKy);
              //  $("#HdrSec2_CmbFrmAdr_Nm").data('kendoComboBox').value(data[0].FrmAdrKy);

                $("#HdrSec2_CmbToAdr_Cd").data('kendoComboBox').value(data[0].ToAdrKy);
              //  $("#HdrSec2_CmbToAdr_Nm").data('kendoComboBox').value(data[0].ToAdrKy);

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);
                var YurRef = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val(YurRef);

                var Des = data[0].Des;
                $("#HdrSec5_InptDesc_Val").val(Des);
                var Rem = data[0].Rem;
                $("#HdrSec5_InptRemark_Val").val(Rem);

                BackDateFutureDateLock("HdrSec1_DatPicDate_Val");
                GetTrnDetail(FrmTrnKyData);


            }

        },
        error: function (e) {
            return false;
        }
    });
}

function LoadInsrtedHdrAfterAccPosting(FrmTrnKyData) {

    // In Here Calling FIFO and AccTrn Posting.
    $.ajax({
        url: urlTransaction.ItmTrnOut_FIFO_PTrnKyItmTrnToAccTrn,
        data: JSON.stringify({
            FrmTrnKy: FrmTrnKyData,
            ObjKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert(data);
            IsIsCd87(FrmTrnKyData);
            //if (!data) { alert("Posting Fail!\nPlease Contact Support!");}
            //LoadInsrtedHdrAfterAccPosting(FrmTrnKyData);
        },
        error: function (e) {
            alert("Posting Fail!\nPlease Contact Support!");
            return false;
        }
    });
}
function IsIsCd87(FromTrnKy) {
    $.ajax({
        url: UrlIsCd87,
        data: JSON.stringify({
            //  FrmTrnKy: FrmTrnKyData,
            ObjKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                AutoPostingToPR(FromTrnKy)
            }

        },
        error: function (e) {
            alert("PR Auto Posting Fail!\nPlease Contact Support!");
            return false;
        }
    });


}


function AutoPostingToPR(FromTrnKy) {
    $.ajax({
        url: UrlAutoPostingToPR,
        data: JSON.stringify({
            FrmTrnKy: FromTrnKy,
            ObjKy: viewBag.ObjKy,
            FrmLocKy: FormGlblData.FrmLocKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                alert("PR Auto Posting Done");
            } else {
                alert("PR Auto Posting Failed Please Try Again");

            }

        },
        error: function (e) {
            alert("Posting Fail!\nPlease Contact Support!");
            return false;
        }
    });


}
function GetTrnDetail(FrmTrnKyData) {

    $.ajax({
        url: urlTransaction.GetDetailByFromTrnKy,
        data: JSON.stringify({
            FrmTrnKy: FrmTrnKyData
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length == 0) alert("There is a Problem to getting this Record! \n Please Contact Support.\n Error Code(" + FrmTrnKyData + ")");
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {


                $(id).data("kendoGrid").dataSource.add({
                    ItmTrnKy: data[i].ItmTrnKy,
                    FrmItmTrnKy: data[i].FrmItmTrnKy,
                    ToItmTrnKy: data[i].ToItmTrnKy,
                    LiNo: data[i].LiNo,
                    ItmKy: data[i].ItmKy,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    TrnQty: data[i].Qty,
                    TrnRate: data[i].Rate,
                    DisAmt: data[i].DisAmt,
                    DisPer: data[i].DisPer,
                    SubTotal: data[i].Rate * data[i].Qty,
                    Des: data[i].Des,
                    Rem: data[i].Rem,
                    PrcsDetKy: data[i].PrcsDetKy,
                    VatAmt: data[i].VatAmt,
                    WHTAmt: data[i].WHTAmt,
                    NBTAmt: data[i].NBTAmt,
                    SVatAmt: data[i].SVatAmt,
                    VAT: (data[i].VatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    WHT: (data[i].WHTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NBT: (data[i].NBTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    SVAT: (data[i].SVatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    Anl3Ky: data[i].Anl3Ky,
                    Anl3Cd: data[i].Anl3Cd,
                    isApr: data[i].isApr,
                    isAct: data[i].isAct



                });


            }
            Calculatetotal();

        },
        error: function (e) {
            return false;
        }
    });
}

function SaveNewFunctionforItmTransfer() {
    ComSaveFunction();
    ComClearFunction();
}

function ComClearFunction() {
    $("#pager").hide();
    FormGlblData.ISNeworUpdateTranction = 1;
    FormGlblData.IsRecurrenceFromFind = 0;
    FormGlblData.IsRecurrenceGetfromFind = 0;
    FormGlblData.FrmTrnKy = 1;
    FormGlblData.ToTrnKy = 1;
    FormGlblData.FrmTmStmp = '';
    FormGlblData.isAllowSaveByBackDate = 1

    SetTrnDate();
    $("#HdrSec1_InptTrnNo_TrnOutNo_Val").val(null);
    $("#HdrSec5_InptDesc_Val").val(null);
    $("#HdrSec5_InptRemark_Val").val(null);
    $("#HdrSec1_InptYurRef_Val").val(null);
    $("#HdrSec1_InptDocNo_Val").val(null);
    $("#PrefixOrdNo1").val(null);

    document.getElementById("HdrSec1_IsRecorrence_Val").checked = false;

    $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val(null);
    $("#HdrSec1_InptTrnNo_ToTrnNo_Val").val(null);
    $("#HdrSec1_InptTrnNo_FrmTrnPrefixKy_Val").val(null);
    $("#HdrSec1_InptTrnNo_ToTrnPrefixKy_Val").val(null);
    $("#HdrSec1_InptTrnNo_FrmTrnTypKy_Val").val(null);
    $("#HdrSec1_InptTrnNo_ToTrnTypKy_Val").val(null);


    $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value(null);
   // $("#HdrSec2_CmbFrmLoc_Nm").data('kendoComboBox').value(null);

    //HdrSec2_CmbToLoc_Cd
    $("#HdrSec2_CmbToLoc_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec2_CmbToLoc_Nm").data('kendoComboBox').value(null);

    $("#HdrSec2_CmbFrmAdr_Cd").data('kendoComboBox').value(null);
   // $("#HdrSec2_CmbFrmAdr_Nm").data('kendoComboBox').value(null);

    $("#HdrSec2_CmbToAdr_Cd").data('kendoComboBox').value(null);
   // $("#HdrSec2_CmbToAdr_Nm").data('kendoComboBox').value(null);

    $("#HdrSec2_CmbFrmPrj_Cd").data('kendoComboBox').value(null);
   // $("#HdrSec2_CmbFrmPrj_Nm").data('kendoComboBox').value(null);
    $("#HdrSec2_CmbToPrj_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec2_CmbToPrj_Nm").data('kendoComboBox').value(null);
    $("#HdrSec10_CmbTskId_Cd").data('kendoComboBox').value(null);
    $("#HdrSec6_CmbAnal_Cd").data('kendoComboBox').value(null);

    $("#HdrSec4_InptSubTot_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptDisc_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptNBT_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptVat_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptWHT_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptSVAT_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptTotal_Val").data("kendoNumericTextBox").value(null);


    $("#HdrSec3_InptExRate_Val").kendoNumericTextBox({
        spinners: false,
        min: 1
    });
    //$("#HdrSec6_InptDesc_Val").kendoNumericTextBox({
    //    spinners: false,
    //});
    $("#HdrSec10_InptSubTot_Val").kendoNumericTextBox({
        spinners: false,
    });
    //$("#HdrSec10_InptRem_Val").kendoNumericTextBox({
    //    spinners: false,
    //});

    $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value('');
    //$("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value('');
    $("#HdrSec6_CmbUnit_Cd").data("kendoComboBox").value('');
    $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec7_InptRate_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec7_InptDis_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec7_InptDisAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec8_InptVat_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec9_InptSVAT_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec9_InptSVATAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec8_InptNBT_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec8_InptNBTAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec9_InptWHT_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec9_InptWHTAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec6_InptDesc_Val").val(null);
    $("#HdrSec10_InptSubTot_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec10_InptRem_Val").val(null);

    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').val(todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear());
    $("#HdrSec1_DatPicDate_Val").data("kendoDatePicker").trigger("change");
    var id = ("#" + viewBag.OurCd);
    $(id).data("kendoGrid").dataSource.filter(null);
    var grid = $(id).data("kendoGrid");
    grid.dataSource.data([]);
    //CreateNewGridRow();
    //setDefault();
}

function BackDateFutureDateLock(DateVal) {
    var dt = ("#" + DateVal);
    var TrnDateToUpdate = FormGlblData.FromFindDate
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

    if (TrnDateToUpdate < MinDt || TrnDateToUpdate > MaxDt) {
        FormGlblData.isAllowSaveByBackDate = 0;
    }
    //else if (TrnDateToUpdate > MaxDt) {
    //    alert("Transaction for future Date not Allowed!");
    //}
}

function LoadFromIssueHdr(FrmTrnKyData) {
    $.ajax({
        url: urlTransaction.GetTrnOutNo,
        data: JSON.stringify({
            FrmTrnKy: FrmTrnKyData
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length == 0) {
                alert("There is a Problem to getting this Record! \n Please Contact Support.\n Error Code(" + FrmTrnKyData + ")");
                //ComClearFunction();
                return;
            }

            for (i = 0; i < data.length; i++) {

                //// var FrmTrnNo = data[0].FromTrnNo;
                //// var ToTrnNo = data[0].ToTrnNo;
                //// var Prefix = data[0].Prefix;

                //var FrmTrnKy = data[0].FromTrnKy;
                //var ToTrnKy = data[0].ToTrnKy;
                //FormGlblData.TmStamp = data[0].TmStamp;
                //FormGlblData.ToTmStamp = data[0].ToTmStamp;

                //FormGlblData.AccessLvlKy = data[0].AcsLvlKy;
                //FormGlblData.ConfiLvlKy = data[0].ConFinLvlKy;

                //FormGlblData.IsRecurrenceFromFind = data[0].isRecur;
                //FormGlblData.IsApr = data[0].isApr

                //if (FormGlblData.IsRecurrenceFromFind == 1) document.getElementById("HdrSec1_IsRecorrence_Val").checked = true;
                //else document.getElementById("HdrSec1_IsRecorrence_Val").checked = false;

                ////alert("fff" + FrmTrnKy + "" + ToTrnKy);

                //FormGlblData.FrmTrnKy = FrmTrnKy;
                //FormGlblData.ToTrnKy = ToTrnKy;
                //$("#HdrSec1_InptTrnNo_TrnOutNo_Val").val(Prefix + FrmTrnNo);
                //if (Prefix == null || Prefix == undefined) {
                //    $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val(FrmTrnNo);
                //}
                //else {
                //    $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").val(Prefix + " " + FrmTrnNo);
                //}

                //$("#HdrSec1_InptTrnNo_ToTrnNo_Val").val(ToTrnNo);
                //var FrmTrnPrefixKy = data[0].FromTrnPrefixKy;
                //$("#HdrSec1_InptTrnNo_FrmTrnPrefixKy_Val").val(FrmTrnPrefixKy);
                //var ToTrnPrefixKy = data[0].ToTrnPrefixKy;
                //$("#HdrSec1_InptTrnNo_ToTrnPrefixKy_Val").val(ToTrnPrefixKy);

                //var FrmTrnTypKy = data[0].FromTrnTypKy;
                //$("#HdrSec1_InptTrnNo_FrmTrnTypKy_Val").val(FrmTrnTypKy);
                //var ToTrnTypKy = data[0].ToTrnTypKy;
                //$("#HdrSec1_InptTrnNo_ToTrnTypKy_Val").val(ToTrnTypKy);
                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').val(TrnDt);
                FormGlblData.FromFindDate = TrnDt;

                var Total = data[0].Amt;
                $("#Amt").val(Total);
                //Change in to to from 
                var FrmLocKy = data[0].ToLocKy;
                $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value(FrmLocKy);
               // $("#HdrSec2_CmbFrmLoc_Nm").data('kendoComboBox').value(FrmLocKy);

                var ToLocKy = data[0].FromLocKy;
                $("#HdrSec2_CmbToLoc_Cd").data('kendoComboBox').value(ToLocKy);
                //$("#HdrSec2_CmbToLoc_Nm").data('kendoComboBox').value(ToLocKy);

                var ToPrjKy = data[0].FrmPrjKy;
                $("#HdrSec2_CmbToPrj_Cd").data('kendoComboBox').value(ToPrjKy);
                //$("#HdrSec2_CmbToPrj_Nm").data('kendoComboBox').value(ToPrjKy);

                var FrmPrjKy = data[0].ToPrjKy;

                $("#HdrSec2_CmbFrmPrj_Cd").data('kendoComboBox').value(FrmPrjKy);
                //$("#HdrSec2_CmbFrmPrj_Nm").data('kendoComboBox').value(FrmPrjKy);

                $("#HdrSec2_CmbFrmAdr_Cd").data('kendoComboBox').value(data[0].FrmAdrKy);
               // $("#HdrSec2_CmbFrmAdr_Nm").data('kendoComboBox').value(data[0].FrmAdrKy);

                $("#HdrSec2_CmbToAdr_Cd").data('kendoComboBox').value(data[0].ToAdrKy);
               // $("#HdrSec2_CmbToAdr_Nm").data('kendoComboBox').value(data[0].ToAdrKy);

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);
                var YurRef = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val(YurRef);

                var Des = data[0].Des;
                $("#HdrSec5_InptDesc_Val").val(Des);
                var Rem = data[0].Rem;
                $("#HdrSec5_InptRemark_Val").val(Rem);

                BackDateFutureDateLock("HdrSec1_DatPicDate_Val");


            }
            LoadFromIssueDetail(FrmTrnKyData);

        },
        error: function (e) {
            return false;
        }
    });
}


function LoadFromIssueDetail(FrmTrnKyData) {

    $.ajax({
        url: urlTransaction.GetDetailByFromTrnKy,
        data: JSON.stringify({
            FrmTrnKy: FrmTrnKyData
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length == 0) alert("There is a Problem to getting this Record! \n Please Contact Support.\n Error Code(" + FrmTrnKyData + ")");
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            //Added Temprary
            var AlwMinQty = 0;
            if (viewBag.OurCd =='RMRTNI') {
                AlwMinQty = 1;
            }
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {


                $(id).data("kendoGrid").dataSource.add({
                    //  ItmTrnKy: data[i].ItmTrnKy,
                    // FrmItmTrnKy: data[i].FrmItmTrnKy,
                    // ToItmTrnKy: data[i].ToItmTrnKy,
                    LiNo: data[i].LiNo,
                    ItmKy: data[i].ItmKy,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    TrnQty: data[i].Qty,
                    TrnRate: data[i].Rate,
                    DisAmt: data[i].DisAmt,
                    DisPer: data[i].DisPer,
                    SubTotal: data[i].Rate * data[i].Qty,
                    Des: data[i].Des,
                    Rem: data[i].Rem,
                    VatAmt: data[i].VatAmt,
                    WHTAmt: data[i].WHTAmt,
                    NBTAmt: data[i].NBTAmt,
                    SVatAmt: data[i].SVatAmt,
                    VAT: (data[i].VatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    WHT: (data[i].WHTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NBT: (data[i].NBTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    SVAT: (data[i].SVatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    Anl3Ky: data[i].Anl3Ky,
                    Anl3Cd: data[i].Anl3Cd,
                    isApr: data[i].isApr,
                    isAct: data[i].isAct,
                    PreItmTrnKy: data[i].PreItmTrnKy,
                    IsAlwMinusStk: AlwMinQty

                });


            }
            Calculatetotal();
            try {
                $('#GetFromPurOrd').data('kendoWindow').close();
            } catch (e) {

                $('#GetFromGRN').data('kendoWindow').close();

            }


        },
        error: function (e) {
            return false;
        }
    });
}