//Donot remove the Ammount Column We develop First with Amount Column And the the Calculation done 
//by a funtion Then After Interfacce Modified and asked to add Credit and debit Column to interface
//Credit and debit balance is calculated based on Amount Columns so donot delete it
//2016.07.06
function AddFistRowHdr() {

    //var TempDiscrption = $("#HdrSec14_TxtArea_Des_Val").val();

    var ProjectKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    if (!ProjectKy) {
        ProjectKy = 1;
    }
    var HdrSec2_CmbPrj_Cd = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").text();
    if (!HdrSec2_CmbPrj_Cd) {
        HdrSec2_CmbPrj_Cd = "";
    }
    //var HdrSec2_CmbPrj_Nm = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").text();
    //if (!HdrSec2_CmbPrj_Nm) {
    //    HdrSec2_CmbPrj_Nm = "";
    //}
    var BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (!BUKy) {
        BUKy = 1;
    }
    var HdrSec2_CmbBU_Cd = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").text();
    if (!HdrSec2_CmbBU_Cd) {
        HdrSec2_CmbBU_Cd = "";
    }
    //var HdrSec2_CmbBU_Nm = $("#HdrSec2_CmbBU_Nm").data("kendoComboBox").text();
    //if (!HdrSec2_CmbBU_Nm) {
    //    HdrSec2_CmbBU_Nm = "";
    //}
    var AccountKy = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value();
    if (AccountKy <= 1 || !AccountKy) {
        alert("Please select an Hedder level Account");
        return;
    }
    var AddressKy = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value();
    if (AddressKy <= 1 || !AddressKy) {
        alert("Please select an Hedder level Account");
        return;
    }
    var HdrSec2_CmbHdrAcc_Cd = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbHdrAcc_Nm = $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").text();
   // var AddressKy = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value();
    var HdrSec2_CmbHdrAdr_Cd = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbHdrAdr_Nm = $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").text();
    var AccCurencyKy = $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").value();
    var HdrSec3_CmbAccCurrncy_Cd = $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").text();
    var HdrSec3_InptAccExRate_Val = document.getElementById("HdrSec3_InptAccExRate_Val").value;
    var HdrSec6_NmricAmt_Val = $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value();

    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;

    } else {
        MultiCredit = 0;

    }
    var tempCR = 0;
    var TempDr = 0;
    if (MultiCredit == 1) {
        TempDr = HdrSec6_NmricAmt_Val;
    } else {
        tempCR = HdrSec6_NmricAmt_Val;
    }
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    if (grid == undefined)
        return;
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    if (total == 0) {
        grid.dataSource.insert(
            0,
            {
                LiNo: 1,
                AccKy: AccountKy,
                AccCd: HdrSec2_CmbHdrAcc_Cd,
                //AccNm: HdrSec2_CmbHdrAcc_Nm,
                AdrKy: AddressKy,
                AdrCd: HdrSec2_CmbHdrAdr_Cd,
                //AdrNm: HdrSec2_CmbHdrAdr_Nm,
                PayModeKy: 1,
                Amount: HdrSec6_NmricAmt_Val,
                CRAMT: tempCR,
                DRAMT: TempDr,
                CurencyKy: AccCurencyKy,
                CurencyCd: HdrSec3_CmbAccCurrncy_Cd,
                ExRate: HdrSec3_InptAccExRate_Val,
                PrjKy: ProjectKy,
                PrjCd: HdrSec2_CmbPrj_Cd,
                //PrjNm: HdrSec2_CmbPrj_Nm,
                BuKy: BUKy,
                BuCd: HdrSec2_CmbBU_Cd,
                //BuNm: HdrSec2_CmbBU_Nm,
                TaskKy: 1,
                Analysys1Ky: 1,
                Analysys2Ky: 1,
                Analysys3Ky: 1,
                Analysys4Ky: 1,
                Analysys5Ky: 1,
                Analysys6Ky: 1,
                BanckKy: 1,
                BranchKy: 1,
                LCKy: 1,
                LoanKy: 1,
                OrderKy: 1,
                OrdrDetKy: 1,
                ResAdrKy: 1,
                IsAct: 1
            }
        );
        DetailLvlInsertGrd();
    } else {
        UpdateFirstRow();
        //After SecondRow Inser Details TO grid;
        DetailLvlInsertGrd();
        SetTotalinFirstRow();
    }

}

function UpdateFirstRow() {

    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];

    if (FirstRow == undefined)
        return;

    //var TempDiscrption = $("#HdrSec14_TxtArea_Des_Val").val();
    var ProjectKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    if (!ProjectKy || ProjectKy == "") {
        ProjectKy = 1;
    }
    var HdrSec2_CmbPrj_Cd = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbPrj_Nm = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").text();
    var BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (!BUKy || BUKy == "") {
        BUKy = 1;
    }
    var HdrSec2_CmbBU_Cd = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbBU_Nm = $("#HdrSec2_CmbBU_Nm").data("kendoComboBox").text();
    var AccountKy = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value();
    var HdrSec2_CmbHdrAcc_Cd = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbHdrAcc_Nm = $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").text();
    var AddressKy = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value();
    var HdrSec2_CmbHdrAdr_Cd = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbHdrAdr_Nm = $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").text();
    var AccCurencyKy = $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").value();
    if (!AccCurencyKy || AccCurencyKy == "") {
        AccCurencyKy = 1;
    }
    var HdrSec3_CmbAccCurrncy_Cd = $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").text();
    var HdrSec3_InptAccExRate_Val = document.getElementById("HdrSec3_InptAccExRate_Val").value;
    var HdrSec6_NmricAmt_Val = $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value();
    var HdrSec7_DatMADate_Val = $("#HdrSec7_DatMADate_Val").val(); //document.getElementById("HdrSec7_DatMADate_Val").value;



    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];

    FirstRow.set("LiNo", 1);
    FirstRow.set("AccKy", AccountKy);
    FirstRow.set("AccCd", HdrSec2_CmbHdrAcc_Cd);
    //FirstRow.set("AccNm", HdrSec2_CmbHdrAcc_Nm);
    FirstRow.set("AdrKy", AddressKy);
    FirstRow.set("AdrCd", HdrSec2_CmbHdrAdr_Cd);
    //FirstRow.set("AdrNm", HdrSec2_CmbHdrAdr_Nm);
    FirstRow.set("PayModeKy", 1);
    FirstRow.set("CurencyKy", AccCurencyKy);
    FirstRow.set("CurencyCd", HdrSec3_CmbAccCurrncy_Cd);
    FirstRow.set("ExRate", HdrSec3_InptAccExRate_Val);
    FirstRow.set("PrjKy", ProjectKy);
    FirstRow.set("PrjCd", HdrSec2_CmbPrj_Cd);
    //FirstRow.set("PrjNm", HdrSec2_CmbPrj_Nm);
    FirstRow.set("BuKy", BUKy);
    FirstRow.set("BuCd", HdrSec2_CmbBU_Cd);
    //FirstRow.set("BuNm", HdrSec2_CmbBU_Nm);
    FirstRow.set("TaskKy", 1);
    FirstRow.set("Analysys1Ky", 1);
    FirstRow.set("Analysys2Ky", 1);
    FirstRow.set("Analysys3Ky", 1);
    FirstRow.set("Analysys4Ky", 1);
    FirstRow.set("Analysys5Ky", 1);
    FirstRow.set("Analysys6Ky", 1);
    FirstRow.set("BanckKy", 1);
    FirstRow.set("BranchKy", 1);
    FirstRow.set("LCKy", 1);
    FirstRow.set("LoanKy", 1);
    FirstRow.set("OrderKy", 1);
    FirstRow.set("OrdrDetKy", 1); 
    FirstRow.set("ResAdrKy", 1);
    FirstRow.set("Dt2", HdrSec7_DatMADate_Val);
    //FirstRow.set("Des", TempDiscrption);

}

function SetTotalinFirstRow() {
    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var Cr = 0;
    var Dr = 0;
    var Total = CalTotal();
    if (MultiCredit == 1) {
        Dr = Total;
    } else {
        Cr = Total;
    }


    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
    FirstRow.set("Amount", Total);
    FirstRow.set("CRAMT", Cr);
    FirstRow.set("DRAMT", Dr);
    $("#HdrSec3_InptTotAmt_Val").val(Total);
    HideIsActAllRec();
}


function DetailLvlInsertGrd() {
    var Lino = FormGlblData.TempLiNumber;
    if (Lino < 0) {
        addNewRowToGrid();
        //ClearDetail();
        ClearDetailWithOutPrjBU();
        $("#HdrSec4_CmbDtlAcc_Cd ").data("kendoComboBox").input.focus();
    } else {
        UpdateSelectedRow(Lino);
        GetSetTotalinFirstRow(Lino);
        //ClearDetail();
        ClearDetailWithOutPrjBU();
        $("#HdrSec4_CmbDtlAcc_Cd ").data("kendoComboBox").input.focus();
    }

}

function GetSetTotalinFirstRow(Lino) {
    var grid = $("#PmtRcprGrd").data("kendoGrid");

    if (grid == undefined)
        return;

    var CurrehntdataSource = grid.dataSource.data();
    var newValue = 0;

    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
    FirstRow.set("Amount", newValue);

}

function addNewRowToGrid() {
    var DetailAccKy = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value();
    var HdrSec4_CmbDtlAcc_Cd = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").text();
    //var HdrSec4_CmbDtlAcc_Nm = $("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").text();
    var DetailAdrKy = $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value();
    var HdrSec4_CmbDtlAdr_Cd = $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").text();
    //var HdrSec4_CmbDtlAdr_Nm = $("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").text();
    var PayModeKy = $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value();
    if (!PayModeKy || PayModeKy == "") {
        PayModeKy = 1;
    }
    var HdrSec5_CmbPayMode_Cd = $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").text();
    var HdrSec5_InptChqNO_Val = document.getElementById("HdrSec5_InptChqNO_Val").value;
    var HdrSec6_NmricAmt_Val = $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value();
    var ProjectKy = $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value();
    if (!ProjectKy || ProjectKy == "") {
        ProjectKy = 1;
    }
    var HdrSec2_CmbPrj_Cd = $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbPrj_Nm = $("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").text();
    var BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (!BUKy || BUKy == "") {
        BUKy = 1;
    }
    var BankKy = $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").value();
    if (!BankKy || BankKy == "") {
        BankKy = 1;
    }
    var BankCode = $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").text();

    var BranchKy = $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value();
    if (!BranchKy || BranchKy == "") {
        BranchKy = 1;
    }
    var BrnchCode = $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").text();
    var CurCodeKy = $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").value();
    var HdrSec7_CmbCurCode_Val = $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").text();
    var HdrSec7_InptCurExRate_Cd = document.getElementById("HdrSec7_InptCurExRate_Cd").value;
    var HdrSec7_DatMADate_Val = $("#HdrSec7_DatMADate_Val").val(); //document.getElementById("HdrSec7_DatMADate_Val").value;
    var HdrSec5_DatChqDate_Val = document.getElementById("HdrSec5_DatChqDate_Val").value;
    if (HdrSec5_InptChqNO_Val.length > 1 && HdrSec5_DatChqDate_Val.length == 0) {
        HdrSec5_DatChqDate_Val= document.getElementById("HdrSec1_DatVouDate_Val").value;
    }
   
    var PrcDetKy = $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value();
    if (!PrcDetKy || PrcDetKy == "") {
        PrcDetKy = 1;
    }
    var HdrSec4_CmbTsk_Cd = $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").text();
    //var HdrSec4_CmbTsk_Nm = $("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").text();
    var Anl2Ky = $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value();
    if (!Anl2Ky || Anl2Ky == "") {
        Anl2Ky = 1;
    }
    var HdrSec8_CmbAnl2_Cd = $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").text();
    //var HdrSec8_CmbAnl2_Nm = $("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").text();
    var TempDiscrption = $("#HdrSec14_TxtArea_Des_Val").val();
    var BUKy = $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value();
    var HdrSec2_CmbBU_Cd = "";
    var HdrSec2_CmbBU_Nm = "";
    if (!BUKy || BUKy == "") {
        //BUKy = 1;
        //This was added to U.T s requrement if the User didnt selct a detail level BU Automaticly the heder level bu should go to SP
        BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
        HdrSec2_CmbBU_Cd = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").text();
       // HdrSec2_CmbBU_Nm = $("#HdrSec2_CmbBU_Nm").data("kendoComboBox").text();
    } else {
        HdrSec2_CmbBU_Cd = $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").text();
        //HdrSec2_CmbBU_Nm = $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").text();
    }

    var HdrSec12_Chkbox_isCash_Val;
    if ($("#HdrSec12_Chkbox_isCash_Val").is(":checked")) {
        HdrSec12_Chkbox_isCash_Val = 1;

    } else {
        HdrSec12_Chkbox_isCash_Val = 0;

    }
    var HdrSec11_Chkbox_isAccPaye_Val;
    if ($("#HdrSec11_Chkbox_isAccPaye_Val").is(":checked")) {
        HdrSec11_Chkbox_isAccPaye_Val = 1;

    } else {
        HdrSec11_Chkbox_isAccPaye_Val = 0;

    }

    var Anl1Ky = $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value();
    if (!Anl1Ky || Anl1Ky == "") {
        Anl1Ky = 1;
    }
    var HdrSec8_CmbAnl1_Cd = $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").text();
    //var HdrSec8_CmbAnl1_Nm = $("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").text();

    var Anl3Ky = $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value();
    if (!Anl3Ky || Anl3Ky == "") {
        Anl3Ky = 1;
    }
    var HdrSec9_CmbAnl3_Cd = $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").text();
    //var HdrSec9_CmbAnl3_Nm = $("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").text();

    var Anl4Ky = $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value();
    if (!Anl4Ky || Anl4Ky == "") {
        Anl4Ky = 1;
    }
    var HdrSec9_CmbAnl4_Cd = $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").text();
    //var HdrSec9_CmbAnl4_Nm = $("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").text();

    var Anl5Ky = $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value();
    if (!Anl5Ky || Anl5Ky == "") {
        Anl5Ky = 1;
    }
    var HdrSec10_CmbAnl5_Cd = $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").text();
    //var HdrSec10_CmbAnl5_Nm = $("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").text();

    var Anl6Ky = $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value();
    if (!Anl6Ky || Anl6Ky == "") {
        Anl6Ky = 1;
    }
    var HdrSec10_CmbAnl6_Cd = $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").text();
    //var HdrSec10_CmbAnl6_Nm = $("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").text();

    //This is added As Ut mention to add it 2016/06/16

    var LCKy = $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value();
    if (!LCKy || LCKy == "") {
        LCKy = 1;
    }
    var LCCd = $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").text();

    var LoanKy = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value();
    if (!LoanKy || LoanKy == "") {
        LoanKy = 1;
    }
    var LoanCd = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").text();

    var HdrSec6_CmbOrder_Cd = $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").value();
    if (!HdrSec6_CmbOrder_Cd || HdrSec6_CmbOrder_Cd == "") {
        HdrSec6_CmbOrder_Cd = 1;
    }
    var OrderCd = $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").text();

    var HdrSec7_CmbOrderDet_Cd = $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox").value();
    if (!HdrSec7_CmbOrderDet_Cd || HdrSec7_CmbOrderDet_Cd == "") {
        HdrSec7_CmbOrderDet_Cd = 1;
    }
    var OrdrDetCd = $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox").text();


    var CmbResAdr_Cd = $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox").text();
    var CmbResAdr_Ky = $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox").value();
    if (!CmbResAdr_Ky) {
        CmbResAdr_Ky = 1;
    }

    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var tempCR = 0;
    var TempDr = 0;

    if (MultiCredit === 1) {
        tempCR = HdrSec6_NmricAmt_Val;
    } else {
        TempDr = HdrSec6_NmricAmt_Val;
    }
    var HdrSec11_ChkboxNagotiable_Val;
    if ($("#HdrSec11_ChkboxNagotiable_Val").is(":checked")) {
        HdrSec11_ChkboxNagotiable_Val = 1;
    } else {
        HdrSec11_ChkboxNagotiable_Val = 0;
    }
    var HdrSec15_DatDueDate_Val = document.getElementById("HdrSec15_DatDueDate_Val").value;
    var HdrSec15_InpPayee_Val = document.getElementById("HdrSec15_InpPayee_Val").value;

    var HdrSec15_Chkbox_isCross_Val;
    if ($("#HdrSec15_Chkbox_isCross_Val").is(":checked")) {
        HdrSec15_Chkbox_isCross_Val = 1;
    } else {
        HdrSec15_Chkbox_isCross_Val = 0;
    }
    var HdrSec15_InptDetDocNo_Val = document.getElementById("HdrSec15_InptDetDocNo_Val").value;
    var HdrSec13_InptDetYurRefr_Val = document.getElementById("HdrSec13_InptDetYurRefr_Val").value;

    var grid = $("#PmtRcprGrd").data("kendoGrid");
    if (grid == undefined)
        return;
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
  
    grid.dataSource.insert(
        total,
        {
            AccTrnKy: 0,
            LiNo: total + 1,
            AccKy: DetailAccKy,
            AccCd: HdrSec4_CmbDtlAcc_Cd,
            //AccNm: HdrSec4_CmbDtlAcc_Nm,
            AdrKy: DetailAdrKy,
            AdrCd: HdrSec4_CmbDtlAdr_Cd,
            //AdrNm: HdrSec4_CmbDtlAdr_Nm,
            PayModeKy: PayModeKy,
            PayModeCd: HdrSec5_CmbPayMode_Cd,
            ChqNo: HdrSec5_InptChqNO_Val,
            ChqDate: HdrSec5_DatChqDate_Val,
            PrjKy: ProjectKy,
            PrjCd: HdrSec2_CmbPrj_Cd,
            //PrjNm: HdrSec2_CmbPrj_Nm,
            BanckKy: BankKy,
            BanckCd: BankCode,
            BranchKy: BranchKy,
            BranchCD: BrnchCode,
            CurencyKy: CurCodeKy,
            CurencyCd: HdrSec7_CmbCurCode_Val,
            ExRate: HdrSec7_InptCurExRate_Cd,
            TaskKy: PrcDetKy,
            TaskId: HdrSec4_CmbTsk_Cd,
            //TaskNm: HdrSec4_CmbTsk_Nm,
            Analysys2Ky: Anl2Ky,
            Analysys2: HdrSec8_CmbAnl2_Cd,
            //Analysys2Nm: HdrSec8_CmbAnl2_Nm,
            Analysys1Ky: Anl1Ky,
            Analysys1: HdrSec8_CmbAnl1_Cd,
            //Analysys1Nm: HdrSec8_CmbAnl1_Nm,
            Analysys3Ky: Anl3Ky,
            Analysys3: HdrSec9_CmbAnl3_Cd,
            //Analysys3Nm: HdrSec9_CmbAnl3_Nm,
            Analysys4Ky: Anl4Ky,
            Analysys4: HdrSec9_CmbAnl4_Cd,
            //Analysys4Nm: HdrSec9_CmbAnl4_Nm,
            Analysys5Ky: Anl5Ky,
            Analysys5: HdrSec10_CmbAnl5_Cd,
            //Analysys5Nm: HdrSec10_CmbAnl5_Nm,
            Analysys6Ky: Anl6Ky,
            Analysys6: HdrSec10_CmbAnl6_Cd,
           // Analysys6Nm: HdrSec10_CmbAnl6_Nm,
            IsCash: HdrSec12_Chkbox_isCash_Val,
            Amount: HdrSec6_NmricAmt_Val,
            CRAMT: tempCR,
            DRAMT: TempDr,
            Des: TempDiscrption,
            IsAccPay: HdrSec11_Chkbox_isAccPaye_Val,
            BuKy: BUKy,
            BuCd: HdrSec2_CmbBU_Cd,
           //BuNm: HdrSec2_CmbBU_Nm,
            Dt2: HdrSec7_DatMADate_Val,
            LCKy: LCKy,
            LCNo: LCCd,
            LoanKy: LoanKy,
            LoanNo: LoanCd,
            OrderKy: HdrSec6_CmbOrder_Cd,
            OrderNo: OrderCd,
            OrdrDetKy: HdrSec7_CmbOrderDet_Cd,
            OrdrDetNo: OrdrDetCd,
            ResAdrKy: CmbResAdr_Ky,
            ResAdrCode: CmbResAdr_Cd,
            DueDate: HdrSec15_DatDueDate_Val,
            IsNegotiable: HdrSec11_ChkboxNagotiable_Val,
            PayeeName: HdrSec15_InpPayee_Val,
            DetDocNo: HdrSec15_InptDetDocNo_Val,
            isCross: HdrSec15_Chkbox_isCross_Val,
            DetYurRef: HdrSec13_InptDetYurRefr_Val,
            IsAct: 1
        }
    );

    SetTotalAmount();
    HideIsActAllRec();
}

function UpdateSelectedRow(Lino) {
    var DetailAccKy = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value();
    var HdrSec4_CmbDtlAcc_Cd = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").text();
    //var HdrSec4_CmbDtlAcc_Nm = $("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").text();
    var DetailAdrKy = $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value();
    var HdrSec4_CmbDtlAdr_Cd = $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").text();
    //var HdrSec4_CmbDtlAdr_Nm = $("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").text();

    var PayModeKy = $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value();
    var HdrSec5_CmbPayMode_Cd = $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").text();
    var HdrSec5_InptChqNO_Val = document.getElementById("HdrSec5_InptChqNO_Val").value;
    var HdrSec6_NmricAmt_Val = $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value();
    var HdrSec5_InptChqNO_Val = document.getElementById("HdrSec5_InptChqNO_Val").value;
    var HdrSec5_InptChqNO_Val = document.getElementById("HdrSec5_InptChqNO_Val").value;
    var ProjectKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    var HdrSec2_CmbPrj_Cd = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbPrj_Nm = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").text();
    var BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    var BankKy = $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").value();
    if (!BankKy || BankKy == "") {
        BankKy = 1;
    }
    var BankCode = $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").text();

    var BranchKy = $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value();
    if (!BranchKy || BranchKy == "") {
        BranchKy = 1;
    }
    var BrnchCode = $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").text();

    //var BrnchCode = $("#BrnchCode").data("kendoComboBox").text();
    var CurCodeKy = $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").value();
    var HdrSec7_CmbCurCode_Val = $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").text();
    var HdrSec7_InptCurExRate_Cd = document.getElementById("HdrSec7_InptCurExRate_Cd").value;
    var HdrSec7_DatMADate_Val = $("#HdrSec7_DatMADate_Val").val(); //document.getElementById("HdrSec7_DatMADate_Val").value;

    var PrcDetKy = $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value();
    var HdrSec4_CmbTsk_Cd = $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").text();
    //var HdrSec4_CmbTsk_Nm = $("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").text();
    //2
    var Anl2Ky = $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value();
    if (!Anl2Ky || Anl2Ky == "") {
        Anl2Ky = 1;
    }
    var HdrSec8_CmbAnl2_Cd = $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").text();
    //var HdrSec8_CmbAnl2_Nm = $("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").text();
    //1
    var Anl1Ky = $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value();
    if (!Anl1Ky || Anl1Ky == "") {
        Anl1Ky = 1;
    }
    var HdrSec8_CmbAnl1_Cd = $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").text();
    //var HdrSec8_CmbAnl1_Nm = $("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").text();
    //
    var Anl3Ky = $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value();
    if (!Anl3Ky || Anl3Ky == "") {
        Anl3Ky = 1;
    }
    var HdrSec9_CmbAnl3_Cd = $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").text();
    //var HdrSec9_CmbAnl3_Nm = $("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").text();

    var Anl4Ky = $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value();
    if (!Anl4Ky || Anl4Ky == "") {
        Anl4Ky = 1;
    }
    var HdrSec9_CmbAnl4_Cd = $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").text();
    //var HdrSec9_CmbAnl4_Nm = $("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").text();

    var Anl5Ky = $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value();
    if (!Anl5Ky || Anl5Ky == "") {
        Anl5Ky = 1;
    }
    var HdrSec10_CmbAnl5_Cd = $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").text();
    //var HdrSec10_CmbAnl5_Nm = $("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").text();

    var Anl6Ky = $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value();
    if (!Anl6Ky || Anl6Ky == "") {
        Anl6Ky = 1;
    }
    var HdrSec10_CmbAnl6_Cd = $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").text();
    //var HdrSec10_CmbAnl6_Nm = $("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").text();
    var TempDiscrption = $("#HdrSec14_TxtArea_Des_Val").val();

    var HdrSec12_Chkbox_isCash_Val;
    if ($("#HdrSec12_Chkbox_isCash_Val").is(":checked")) {
        HdrSec12_Chkbox_isCash_Val = 1;

    } else {
        HdrSec12_Chkbox_isCash_Val = 0;

    }
    var HdrSec11_Chkbox_isAccPaye_Val;
    if ($("#HdrSec11_Chkbox_isAccPaye_Val").is(":checked")) {
        HdrSec11_Chkbox_isAccPaye_Val = 1;

    } else {
        HdrSec11_Chkbox_isAccPaye_Val = 0;

    }

    //var ProjectKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    //if (!ProjectKy || ProjectKy == "") {
    //    ProjectKy = 1;
    //}
    //var HdrSec2_CmbPrj_Cd = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbPrj_Nm = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").text();


    //var BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    //if (!BUKy || BUKy == "") {
    //    BUKy = 1;
    //}
    //var HdrSec2_CmbBU_Cd = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbBU_Nm = $("#HdrSec2_CmbBU_Nm").data("kendoComboBox").text();
    var ProjectKy = $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value();
    if (!ProjectKy || ProjectKy == "") {
        ProjectKy = 1;
    }
    var HdrSec2_CmbPrj_Cd = $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbPrj_Nm = $("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").text();

    var BUKy = $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value();
    if (!BUKy || BUKy == "") {
        BUKy = 1;
    }
    var HdrSec2_CmbBU_Cd = $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").text();
    //var HdrSec2_CmbBU_Nm = $("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").text();
    var HdrSec5_DatChqDate_Val = document.getElementById("HdrSec5_DatChqDate_Val").value;
    if (HdrSec5_InptChqNO_Val.length > 1 && HdrSec5_DatChqDate_Val.length == 0) {
        HdrSec5_DatChqDate_Val = document.getElementById("HdrSec1_DatVouDate_Val").value;
    }
    //This is added As Ut mention to add it 2016/06/16

    var LCKy = $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value();
    if (!LCKy || LCKy == "") {
        LCKy = 1;
    }
    var LCCd = $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").text();

    var LoanKy = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value();
    if (!LoanKy || LoanKy == "") {
        LoanKy = 1;
    }
    var LoanCd = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").text();

    var HdrSec6_CmbOrder_Cd = $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").value();
    if (!HdrSec6_CmbOrder_Cd || HdrSec6_CmbOrder_Cd == "") {
        HdrSec6_CmbOrder_Cd = 1;
    }
    var OrderCd = $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").text();

    var HdrSec7_CmbOrderDet_Cd = $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox").value();
    if (!HdrSec7_CmbOrderDet_Cd || HdrSec7_CmbOrderDet_Cd == "") {
        HdrSec7_CmbOrderDet_Cd = 1;
    }
    var OrdrDetCd = $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox").text();

    var CmbResAdr_Cd = $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox").text();
    var CmbResAdr_Ky = $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox").value();
    if (!CmbResAdr_Ky) {
        CmbResAdr_Ky = 1;
    }
    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var tempCR = 0;
    var TempDr = 0;
    if (MultiCredit === 1) {
        tempCR = HdrSec6_NmricAmt_Val;
    } else {
        TempDr = HdrSec6_NmricAmt_Val;
    }
    var HdrSec11_ChkboxNagotiable_Val;
    if ($("#HdrSec11_ChkboxNagotiable_Val").is(":checked")) {
        HdrSec11_ChkboxNagotiable_Val = 1;
    } else {
        HdrSec11_ChkboxNagotiable_Val = 0;
    }
    var HdrSec15_DatDueDate_Val = document.getElementById("HdrSec15_DatDueDate_Val").value;
    var HdrSec15_InpPayee_Val = document.getElementById("HdrSec15_InpPayee_Val").value;

    var HdrSec15_Chkbox_isCross_Val;
    if ($("#HdrSec15_Chkbox_isCross_Val").is(":checked")) {
        HdrSec15_Chkbox_isCross_Val = 1;
    } else {
        HdrSec15_Chkbox_isCross_Val = 0;
    }
    var HdrSec15_InptDetDocNo_Val = document.getElementById("HdrSec15_InptDetDocNo_Val").value;
    var HdrSec13_InptDetYurRefr_Val = document.getElementById("HdrSec13_InptDetYurRefr_Val").value;
    var GridData = $("#PmtRcprGrd").data().kendoGrid.dataSource.data();
    var index = 0;
    for (var i = 0; i < GridData.length; i++) {
        if (GridData[i].LiNo == Lino) {
            index = i;
        }

    }
    var RowUpdate = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[index];
    RowUpdate.set("LiNo", Lino);
    RowUpdate.set("AccKy", DetailAccKy);
    RowUpdate.set("AccCd", HdrSec4_CmbDtlAcc_Cd);
    //RowUpdate.set("AccNm", HdrSec4_CmbDtlAcc_Nm);
    RowUpdate.set("AdrKy", DetailAdrKy);
    RowUpdate.set("AdrCd", HdrSec4_CmbDtlAdr_Cd);
    //RowUpdate.set("AdrNm", HdrSec4_CmbDtlAdr_Nm);
    RowUpdate.set("PayModeKy", PayModeKy);
    RowUpdate.set("PayModeCd", HdrSec5_CmbPayMode_Cd);
    RowUpdate.set("ChqNo", HdrSec5_InptChqNO_Val);
    RowUpdate.set("ChqDate", HdrSec5_DatChqDate_Val);
    RowUpdate.set("PrjKy", ProjectKy);
    RowUpdate.set("PrjCd", HdrSec2_CmbPrj_Cd);
    //RowUpdate.set("PrjNm", HdrSec2_CmbPrj_Nm);
    RowUpdate.set("BanckKy", BankKy);
    RowUpdate.set("BanckCd", BankCode);
    RowUpdate.set("BranchKy", BranchKy);
    RowUpdate.set("BranchCD", BrnchCode);
    RowUpdate.set("CurencyKy", CurCodeKy);
    RowUpdate.set("CurencyCd", HdrSec7_CmbCurCode_Val);
    RowUpdate.set("ExRate", HdrSec7_InptCurExRate_Cd);
    RowUpdate.set("TaskKy", PrcDetKy);
    RowUpdate.set("TaskId", HdrSec4_CmbTsk_Cd);
    //RowUpdate.set("TaskNm", HdrSec4_CmbTsk_Nm);
    RowUpdate.set("Analysys1Ky", Anl1Ky);
    RowUpdate.set("Analysys1", HdrSec8_CmbAnl1_Cd);
    //RowUpdate.set("Analysys1Nm", HdrSec8_CmbAnl1_Nm);
    RowUpdate.set("Analysys2Ky", Anl2Ky);
    RowUpdate.set("Analysys2", HdrSec8_CmbAnl2_Cd);
    //RowUpdate.set("Analysys2Nm", HdrSec8_CmbAnl2_Nm);
    RowUpdate.set("Analysys3Ky", Anl3Ky);
    RowUpdate.set("Analysys3", HdrSec9_CmbAnl3_Cd);
    //RowUpdate.set("Analysys3Nm", HdrSec9_CmbAnl3_Nm);
    RowUpdate.set("Analysys4Ky", Anl4Ky);
    RowUpdate.set("Analysys4", HdrSec9_CmbAnl4_Cd);
    //RowUpdate.set("Analysys4Nm", HdrSec9_CmbAnl4_Nm);
    RowUpdate.set("Analysys5Ky", Anl5Ky);
    RowUpdate.set("Analysys5", HdrSec10_CmbAnl5_Cd);
    //RowUpdate.set("Analysys5Nm", HdrSec10_CmbAnl5_Nm);
    RowUpdate.set("Analysys6Ky", Anl6Ky);
    RowUpdate.set("Analysys6", HdrSec10_CmbAnl6_Cd);
    //RowUpdate.set("Analysys6Nm", HdrSec10_CmbAnl6_Nm);
    RowUpdate.set("IsCash", HdrSec12_Chkbox_isCash_Val);
    RowUpdate.set("Amount", parseFloat(HdrSec6_NmricAmt_Val).toFixed(2));
    RowUpdate.set("CRAMT", parseFloat(tempCR).toFixed(2));
    RowUpdate.set("DRAMT", parseFloat(TempDr).toFixed(2));
    RowUpdate.set("Des", TempDiscrption);
    RowUpdate.set("IsAccPay", HdrSec11_Chkbox_isAccPaye_Val);
    RowUpdate.set("BuKy", BUKy);
    RowUpdate.set("BuCd", HdrSec2_CmbBU_Cd);
    //RowUpdate.set("BuNm", HdrSec2_CmbBU_Nm);
    RowUpdate.set("Dt2", HdrSec7_DatMADate_Val);
    RowUpdate.set("LCKy", LCKy);
    RowUpdate.set("LCNo", LCCd);
    RowUpdate.set("LoanKy", LoanKy);
    RowUpdate.set("LoanNo", LoanCd);
    RowUpdate.set("OrderKy", HdrSec6_CmbOrder_Cd);
    RowUpdate.set("OrderNo", OrderCd);
    RowUpdate.set("OrdrDetKy", HdrSec7_CmbOrderDet_Cd);
    RowUpdate.set("OrdrDetNo", OrdrDetCd);
    RowUpdate.set("ResAdrKy", CmbResAdr_Ky);
    RowUpdate.set("ResAdrCode", CmbResAdr_Cd);
    RowUpdate.set("DueDate", HdrSec15_DatDueDate_Val);
    RowUpdate.set("IsNegotiable", HdrSec11_ChkboxNagotiable_Val);
    RowUpdate.set("PayeeName", HdrSec15_InpPayee_Val);
    RowUpdate.set("isCross", HdrSec15_Chkbox_isCross_Val);
    RowUpdate.set("DetDocNo", HdrSec15_InptDetDocNo_Val);
    RowUpdate.set("DetYurRef", HdrSec13_InptDetYurRefr_Val);
    SetTotalAmount();
    HideIsActAllRec();
}

$("#PmtRcprGrd")
    .on("dblclick",
        "tr.k-state-selected",
        function () {
            var id = ("#PmtRcprGrd");
            var grid = $(id).data().kendoGrid;
            var selectedItem = grid.dataItem(grid.select());
            //var grid = ("#JournalGrid").data().kendoGrid();
            //var selectedItem = grid.dataItem(grid.select());
            var LiNo = selectedItem.LiNo;
            var AccKy = selectedItem.AccKy;
            var AdrKy = selectedItem.AdrKy;
            var TaskKy = selectedItem.TaskKy;
            var Analysys2Ky = selectedItem.Analysys2Ky;
            var PayModeKy = selectedItem.PayModeKy;
            var HdrSec5_InptChqNO_Val = selectedItem.ChqNo;
            var ChqDate = selectedItem.ChqDate;
            var HdrSec6_NmricAmt_Val = selectedItem.Amount;
            var BanckKy = selectedItem.BanckKy;
            var BranchKy = selectedItem.BranchKy;
            var CurencyKy = selectedItem.CurencyKy;
            var ExRate = selectedItem.ExRate;
            var Analysys1Ky = selectedItem.Analysys1Ky;
            var Analysys3Ky = selectedItem.Analysys3Ky;
            var Analysys4Ky = selectedItem.Analysys4Ky;
            var Analysys5Ky = selectedItem.Analysys5Ky;
            var Analysys6Ky = selectedItem.Analysys6Ky;
            var HdrSec12_Chkbox_isCash_Val = selectedItem.IsCash;
            var IsAccPay = selectedItem.IsAccPay;
            var LCKy = selectedItem.LCKy;
            var LoanKy = selectedItem.LoanKy;
            var HdrSec6_CmbOrder_Cd = selectedItem.OrderKy;
            var HdrSec7_CmbOrderDet_Cd = selectedItem.OrdrDetKy;
            var MaDate = selectedItem.Dt2;
            var ResAdrKy = selectedItem.ResAdrKy;
            var DesCri = selectedItem.Des;
            var DtlPrjKy = selectedItem.PrjKy;
            var DtlBuKy = selectedItem.BuKy;
            var DueDate = selectedItem.DueDate;
            var IsNegotiable = selectedItem.IsNegotiable;
            var PayeeName = selectedItem.PayeeName;
            var isCross = selectedItem.isCross;
            var DetDocNo = selectedItem.DetDocNo;
            var DetYurRef = selectedItem.DetYurRef;
            if (LiNo != 1) {
                FormGlblData.TempLiNumber = LiNo;

                $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value(AccKy);
                $("#HdrSec13_InptDetYurRefr_Val").val(DetYurRef);
                //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value(AccKy);
                $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value(AdrKy);
                //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value(AdrKy);
                $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value(Analysys1Ky);
                //$("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").value(Analysys1Ky);
                $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value(Analysys2Ky);
                //$("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").value(Analysys2Ky);
                $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value(Analysys3Ky);
                //$("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").value(Analysys3Ky);
                $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value(Analysys4Ky);
                //$("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").value(Analysys4Ky);
                $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value(Analysys5Ky);
                //$("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").value(Analysys5Ky);
                $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value(Analysys6Ky);
                //$("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").value(Analysys6Ky);
                $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").value(BanckKy);
                if (BanckKy > 1) {
                    $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").trigger("change");
                }
                $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value(BranchKy);
                $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value(PayModeKy);
                $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value(LCKy);
                $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value(LoanKy);
                $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").value(HdrSec6_CmbOrder_Cd);
                $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox").value(HdrSec7_CmbOrderDet_Cd);
                $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value(HdrSec6_NmricAmt_Val);
                $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").value(CurencyKy);
                document.getElementById("HdrSec5_InptChqNO_Val").value = HdrSec5_InptChqNO_Val;
                //document.getElementById("chqDt").value = HdrSec5_InptChqNO_Val;
                //document.getElementById("BankCode").value = BankCode;
                //document.getElementById("BrnchCode").value = BrnchCode;
                document.getElementById("HdrSec7_InptCurExRate_Cd").value = ExRate;
                $("#HdrSec5_DatChqDate_Val").data("kendoDatePicker").value(ChqDate);

                $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox").value(ResAdrKy);

                if (HdrSec12_Chkbox_isCash_Val == 1 || HdrSec12_Chkbox_isCash_Val == 'True') {
                    $("#HdrSec12_Chkbox_isCash_Val").prop("checked", true);
                } else {
                    $("#HdrSec12_Chkbox_isCash_Val").prop("checked", false);
                }

                if (IsAccPay == 1 || IsAccPay == 'True') {
                    $("#HdrSec11_Chkbox_isAccPaye_Val").prop("checked", true);
                } else {
                    $("#HdrSec11_Chkbox_isAccPaye_Val").prop("checked", false);
                }
                $("#HdrSec7_DatMADate_Val").data("kendoDatePicker").value(MaDate);

                $('#HdrSec14_TxtArea_Des_Val').val(DesCri);
                $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value(DtlPrjKy);
                //$("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value(DtlPrjKy);
                $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").trigger("change");
                //$("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").trigger("change");
                $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value(TaskKy);
                //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value(TaskKy);
                $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value(DtlBuKy);
                //$("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value(DtlBuKy);
                $("#HdrSec15_DatDueDate_Val").data("kendoDatePicker").value(DueDate);
                document.getElementById("HdrSec15_InpPayee_Val").value = PayeeName;
                if (IsNegotiable == 1 || IsNegotiable == 'True') {
                    $("#HdrSec11_ChkboxNagotiable_Val").prop("checked", true);
                } else {
                    $("#HdrSec11_ChkboxNagotiable_Val").prop("checked", false);
                }
                if (isCross == 1 || isCross == 'True') {
                    $("#HdrSec15_Chkbox_isCross_Val").prop("checked", true);
                } else {
                    $("#HdrSec15_Chkbox_isCross_Val").prop("checked", false);
                }
                try {
                    $("#HdrSec15_InptDetDocNo_Val").val(DetDocNo);

                } catch (e) {

                } 
            } else {

                alert("You Cannot change the Line Number one");
            }

        });

function ChangeProject(prjKy) {
    if (!prjKy) {
        prjKy=1
    }
    var Prj_Cd = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").text();
    //var Prj_Nm = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").text();
    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
    FirstRow.set("PrjKy", prjKy);
    FirstRow.set("PrjCd", Prj_Cd);
    FirstRow.set("PrjNm", Prj_Nm);
}

function ChangeBU(BUKy) {
    if (!BUKy) {
        BUKy = 1
    }
    var BU_Cd = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").text();
    //var BU_Nm = $("#HdrSec2_CmbBU_Nm").data("kendoComboBox").text();
    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
    FirstRow.set("BuKy", BUKy);
    FirstRow.set("BuCd", BU_Cd);
    //FirstRow.set("BuNm", BU_Nm);
}