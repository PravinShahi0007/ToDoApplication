$("#HdrSec8_TxtArea_Des_Val").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        var TempAccKy = $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value();
        var TempAdrKy = $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value();
        var TempPmtModKy = $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value();
        if (!TempPmtModKy) {
            TempPmtModKy = '1';
        }
        var TempAmount = $("#HdrSec5_NmricAmt_Val").data("kendoNumericTextBox").value();
        var TempDiscrption = $("#HdrSec8_TxtArea_Des_Val").val();
        var ourcodevalidation = true;
        if (viewBag.OurCd == 'EntExp') {
            ourcodevalidation = false;
        }
        if (!TempAccKy || TempAccKy == 1 || TempAccKy == "") {
            alert("Enter An Account");
            $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").input.focus();
        } else if (!TempAdrKy || TempAdrKy == 1 || TempAdrKy == "") {
            alert("Enter An Address");
            $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").input.focus();
        } else if (ourcodevalidation && FirstinsetDetail.LineNo == '1' && TempPmtModKy == '1') {
            alert("Enter a Payment Method");
            $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").input.focus();
        } else if (!TempAmount && FirstinsetDetail.LineNo >= 2 || TempAmount == 0 && FirstinsetDetail.LineNo >= 2 || TempAmount == "" && FirstinsetDetail.LineNo >= 2) {
            alert("Enter an Amount");
            $("#HdrSec5_NmricAmt_Val").data("kendoNumericTextBox").focus();

        } else if (TempDiscrption.length < 2) {
            alert("Enter a Description");
            document.getElementById["HdrSec8_TxtArea_Des_Val"].value = "";
            $("#HdrSec8_TxtArea_Des_Val").focus();
        } else {
           
            AddRowToGrid();
            ClearDetailLevel();
            //if (FirstinsetDetail.LineNo == '1') {
            //    $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value(1);
            //    $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").readonly(true);
            //}
        }
        event.preventDefault();
    }
});

function AddRowToGrid() {
    var AccountKy = $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value();
    var Acc_Cd = $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").text();
    var Acc_Nm = $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").text();
    var AdressKy = $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value();
    var Adr_Cd = $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").text();
    var Adr_Nm = $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").text();

    var BUKy = $("#HdrSec3_CmbBU_Cd").data("kendoComboBox").value();
    if (!BUKy) {
        BUKy = 1;
    }
    var CmbBU_Cd = $("#HdrSec3_CmbBU_Cd").data("kendoComboBox").text();
    if (!CmbBU_Cd) {
        CmbBU_Cd = "";
    }
    var CmbBU_Nm = $("#HdrSec3_CmbBU_Nm").data("kendoComboBox").text();
    if (!CmbBU_Nm) {
        CmbBU_Nm = "";
    }
    var ProjectKy = $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox").value();
    if (!ProjectKy) {
        ProjectKy = 1;
    }
    var Prj_Cd = $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox").text();
    if (!Prj_Cd) {
        Prj_Cd = "";
    }
    var Prj_Nm = $("#HdrSec3_CmbPrj_Nm").data("kendoComboBox").text();
    if (!Prj_Nm) {
        Prj_Nm = "";
    }
    var TaskKy = $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value();
    if (!TaskKy) {
        TaskKy = 1;
    }
    var Task_Cd = $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").text();
    if (!Task_Cd) {
        Task_Cd = "";
    }
    var Task_Nm = $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").text();
    if (!Task_Nm) {
        Task_Nm = "";
    }
    var PmtModeKey = $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value();
    if (!PmtModeKey) {
        PmtModeKey = 1;
    }
    var PmtMode_Cd = $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").text();
    if (!PmtMode_Cd) {
        PmtMode_Cd = "";
    }
    var ChqNo = $("#HdrSec4_InptChqNO_Val").data("kendoNumericTextBox").value();
    var ChqDate = document.getElementById("HdrSec4_DatChqDate_Val").value;
    var LoanKy = $("#HdrSec4_CmbLoan_Cd").data("kendoComboBox").value();
    if (!LoanKy) {
        LoanKy = 1;
    }
    var Loan_Cd = $("#HdrSec4_CmbLoan_Cd").data("kendoComboBox").text();
    if (!Loan_Cd) {
        Loan_Cd = "";
    }

    var LCKy = $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value();
    if (!LCKy) {
        LCKy = 1;
    }
    var LC_Cd = $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").text();
    if (!LC_Cd) {
        LC_Cd = "";
    }
    var BankKy = $("#HdrSec5_CmbBank_Cd").data("kendoComboBox").value();
    if (!BankKy) {
        BankKy = 1;
    }
    var Bank_Cd = $("#HdrSec5_CmbBank_Cd").data("kendoComboBox").text();
    if (!Bank_Cd) {
        Bank_Cd = "";
    }
    var BrnKy = $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").value();
    if (!BrnKy) {
        BrnKy = 1;
    }
    var Brn_Cd = $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").text();
    if (!Brn_Cd) {
        Brn_Cd = "";
    }

    var OrderKy = $("#HdrSec5_CmbOrder_Cd").data("kendoComboBox").value();
    if (!OrderKy) {
        OrderKy = 1;
    }
    var Order_Cd = $("#HdrSec5_CmbOrder_Cd").data("kendoComboBox").text();
    if (!Order_Cd) {
        Order_Cd = "";
    }

    var ResAdrKy = $("#HdrSec5_CmbResAdr_Cd").data("kendoComboBox").value();
    if (!ResAdrKy) {
        ResAdrKy = 1;
    }
    var ResAdr_Cd = $("#HdrSec5_CmbResAdr_Cd").data("kendoComboBox").text();
    if (!ResAdr_Cd) {
        ResAdr_Cd = "";
    }

    var CurKy = $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").value();
    if (!CurKy) {
        CurKy = 1;
    }
    var Cur_Cd = $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").text();
    if (!Cur_Cd) {
        Cur_Cd = "";
    }
    var CurExRate = document.getElementById("HdrSec6_InptCurExRate_Val").value;
    if (CurExRate == "") {
        CurExRate = '1.00'
    }
    var MADate = document.getElementById("HdrSec6_DatMADate_Val").value;
    var OrderDetKy = $("#HdrSec6_CmbOrderDet_Cd").data("kendoComboBox").value();
    if (!OrderDetKy) {
        OrderDetKy = 1;
    }
    var OrderDet_Cd = $("#HdrSec6_CmbOrderDet_Cd").data("kendoComboBox").text();
    if (!OrderDet_Cd) {
        OrderDet_Cd = "";
    }

    var Anl1Ky = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value();
    if (!Anl1Ky || Anl1Ky == "") {
        Anl1Ky = 1;
    }
    var Anl1_Cd = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").text();
    var Anl1_Nm = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").text();
    var Anl2Ky = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value();
    if (!Anl2Ky || Anl2Ky == "") {
        Anl2Ky = 1;
    }
    var Anl2_Cd = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").text();
    var Anl2_Nm = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").text();
    var Anl3Ky = $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").value();
    if (!Anl3Ky || Anl3Ky == "") {
        Anl3Ky = 1;
    }
    var Anl3_Cd = $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").text();
    var Anl3_Nm = $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").text();
    var Anl4Ky = $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").value();
    if (!Anl4Ky || Anl4Ky == "") {
        Anl4Ky = 1;
    }
    var Anl4_Cd = $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").text();
    var Anl4_Nm = $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").text();
    var Anl5Ky = $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").value();
    if (!Anl5Ky || Anl5Ky == "") {
        Anl5Ky = 1;
    }
    var Anl5_Cd = $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").text();
    var Anl5_Nm = $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").text();
    var Anl6Ky = $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").value();
    if (!Anl6Ky || Anl6Ky == "") {
        Anl6Ky = 1;
    }
    var Anl6_Cd = $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").text();
    var Anl6_Nm = $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").text();
    var Amount = $("#HdrSec5_NmricAmt_Val").data("kendoNumericTextBox").value();
    var Description = $("#HdrSec8_TxtArea_Des_Val").val();
    //
    var IsCash = 0;
    if ($("#HdrSec9_ChkboxisCash_Val").is(":checked")) {
        IsCash = 1;
    }
    var IsAccPayee = 0;
    if ($("#HdrSec9_Chkbox_isAccPaye_Val").is(":checked")) {
        IsAccPayee = 1;
    }

    var IsStamp = 0;
    if ($("#HdrSec9_Chkbox_isStamp").is(":checked")) {
        IsStamp = 1;
    }


    //
    var DtlDocNo = document.getElementById("HdrSec6_InptDtlDocNo_Val").value;
    var IsNonNeg = 0;
    if ($("#HdrSec9_Chkbox_Nagotiable_Val").is(":checked")) {
        IsNonNeg = 1;
    }

    var IsCrossed = 0;
    if ($("#HdrSec9_Chkbox_isCross_Val").is(":checked")) {
        IsCrossed = 1;
    }
    var PayeeNAme = document.getElementById("HdrSec3_InptPayee_Val").value;
    var DetailURef = document.getElementById("HdrSec4_InptDtlUrRef_Val").value;
    var DueDate = document.getElementById("HdrSec5_DatDueDate_Val").value;


    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var PmtdataSource = grid.dataSource;
    var total = PmtdataSource.data().length;
    if (total === 0) {
        LockPayModCom();
        FirstinsetDetail.BUKey = BUKy;
        FirstinsetDetail.PrjKey = ProjectKy;
        FirstinsetDetail.LineNo = 2;
        LoadAccounts();
        BuLOad();

    }
    else if (FirstinsetDetail.LineNo == 1) {
        FirstinsetDetail.BUKey = BUKy;
        FirstinsetDetail.PrjKey = ProjectKy;
        FirstinsetDetail.LineNo = 2;
        LockPayModCom();
        LoadAccounts();
        BuLOad();
        document.getElementById("HdrSec3_CmbAcc_Lbl").innerHTML = "Debit To";
    }
    var MultiCredit = 0;
    if ($("#HdrSec1_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var CrAmt = 0;
    var DrAmt = 0;

    if ((MultiCredit === 0 && total === 0) || (MultiCredit === 1 && total >= 1)) {
        CrAmt = Amount;
    } else if ((MultiCredit === 1 && total === 0) || (MultiCredit === 0 && total >= 1)) {
        DrAmt = Amount;
    }

    var tempLino = document.getElementById("TempLinumbr").value;
    if (tempLino > 0) {
        UpdateSelectedRow(tempLino, AccountKy, Acc_Cd, Acc_Nm, AdressKy, Adr_Cd, Adr_Nm, BUKy, CmbBU_Cd, CmbBU_Nm, ProjectKy, Prj_Cd, Prj_Nm, TaskKy, Task_Cd, Task_Nm, PmtModeKey, PmtMode_Cd, ChqNo, ChqDate, LoanKy, Loan_Cd, LCKy, LC_Cd, IsCash, BankKy, Bank_Cd, BrnKy, Brn_Cd, OrderKy, Order_Cd, ResAdrKy, ResAdr_Cd, IsAccPayee, CurKy, Cur_Cd, CurExRate, MADate, OrderDetKy, OrderDet_Cd, IsStamp, Anl1Ky, Anl1_Cd, Anl1_Nm, Anl2Ky, Anl2_Cd, Anl2_Nm, Anl3Ky, Anl3_Cd, Anl3_Nm, Anl4Ky, Anl4_Cd, Anl4_Nm, Anl5Ky, Anl5_Cd, Anl5_Nm, Anl6Ky, Anl6_Cd, Anl6_Nm, Amount, Description, CrAmt, DrAmt, DtlDocNo, IsNonNeg, IsCrossed, PayeeNAme, DetailURef, DueDate);
    } else {
        InsertToGrid(total + 1, AccountKy, Acc_Cd, Acc_Nm, AdressKy, Adr_Cd, Adr_Nm, BUKy, CmbBU_Cd, CmbBU_Nm, ProjectKy, Prj_Cd, Prj_Nm, TaskKy, Task_Cd, Task_Nm, PmtModeKey, PmtMode_Cd, ChqNo, ChqDate, LoanKy, Loan_Cd, LCKy, LC_Cd, IsCash, BankKy, Bank_Cd, BrnKy, Brn_Cd, OrderKy, Order_Cd, ResAdrKy, ResAdr_Cd, IsAccPayee, CurKy, Cur_Cd, CurExRate, MADate, OrderDetKy, OrderDet_Cd, IsStamp, Anl1Ky, Anl1_Cd, Anl1_Nm, Anl2Ky, Anl2_Cd, Anl2_Nm, Anl3Ky, Anl3_Cd, Anl3_Nm, Anl4Ky, Anl4_Cd, Anl4_Nm, Anl5Ky, Anl5_Cd, Anl5_Nm, Anl6Ky, Anl6_Cd, Anl6_Nm, Amount, Description, CrAmt, DrAmt, DtlDocNo, IsNonNeg, IsCrossed, PayeeNAme, DetailURef, DueDate);
    }

}

function InsertToGrid(Lino, AccountKy, Acc_Cd, Acc_Nm, AdressKy, Adr_Cd, Adr_Nm, BUKy, CmbBU_Cd, CmbBU_Nm, ProjectKy, Prj_Cd, Prj_Nm, TaskKy, Task_Cd, Task_Nm, PmtModeKey, PmtMode_Cd, ChqNo, ChqDate, LoanKy, Loan_Cd, LCKy, LC_Cd, IsCash, BankKy, Bank_Cd, BrnKy, Brn_Cd, OrderKy, Order_Cd, ResAdrKy, ResAdr_Cd, IsAccPayee, CurKy, Cur_Cd, CurExRate, MADate, OrderDetKy, OrderDet_Cd, IsStamp, Anl1Ky, Anl1_Cd, Anl1_Nm, Anl2Ky, Anl2_Cd, Anl2_Nm, Anl3Ky, Anl3_Cd, Anl3_Nm, Anl4Ky, Anl4_Cd, Anl4_Nm, Anl5Ky, Anl5_Cd, Anl5_Nm, Anl6Ky, Anl6_Cd, Anl6_Nm, Amount, Description, CrAmt, DrAmt, DtlDocNo, IsNonNeg, IsCrossed, PayeeNAme, DetailURef, DueDate) {

    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    grid.dataSource.insert(
        total,
        {
            AccTrnKy: 0,
            LiNo: Lino,
            AccKy: AccountKy,
            AccCd: Acc_Cd,
            AccNm: Acc_Nm,
            AdrKy: AdressKy,
            AdrCd: Adr_Cd,
            AdrNm: Adr_Nm,
            PayModeKy: PmtModeKey,
            PayModeCd: PmtMode_Cd,
            ChqNo: ChqNo,
            ChqDate: ChqDate,
            PrjKy: ProjectKy,
            PrjCd: Prj_Cd,
            PrjNm: Prj_Nm,
            BanckKy: BankKy,
            BanckCd: Bank_Cd,
            BranchKy: BrnKy,
            BranchCD: Brn_Cd,
            CurencyKy: CurKy,
            CurencyCd: Cur_Cd,
            ExRate: CurExRate,
            TaskKy: TaskKy,
            TaskId: Task_Cd,
            TaskNm: Task_Nm,
            Analysys1Ky: Anl1Ky,
            Analysys1: Anl1_Cd,
            Analysys1Nm: Anl1_Nm,
            Analysys2Ky: Anl2Ky,
            Analysys2: Anl2_Cd,
            Analysys2Nm: Anl2_Nm,
            Analysys3Ky: Anl3Ky,
            Analysys3: Anl3_Cd,
            Analysys3Nm: Anl3_Nm,
            Analysys4Ky: Anl4Ky,
            Analysys4: Anl4_Cd,
            Analysys4Nm: Anl4_Nm,
            Analysys5Ky: Anl5Ky,
            Analysys5: Anl5_Cd,
            Analysys5Nm: Anl5_Nm,
            Analysys6Ky: Anl6Ky,
            Analysys6: Anl6_Cd,
            Analysys6Nm: Anl6_Nm,
            IsCash: IsCash,
            Amount: Amount,
            CRAMT: CrAmt,
            DRAMT: DrAmt,
            Des: Description,
            IsAccPay: IsAccPayee,
            BuKy: BUKy,
            BuCd: CmbBU_Cd,
            BuNm: CmbBU_Nm,
            Dt2: MADate,
            LCKy: LCKy,
            LCNo: LC_Cd,
            LoanKy: LoanKy,
            LoanNo: Loan_Cd,
            OrderKy: OrderKy,
            OrderNo: Order_Cd,
            OrdrDetKy: OrderDetKy,
            OrdrDetNo: OrderDet_Cd,
            ResAdrKy: ResAdrKy,
            ResAdrCode: ResAdr_Cd,
            DetDocNo: DtlDocNo,
            IsNegotiable: IsNonNeg,
            isCross: IsCrossed,
            PayeeName: PayeeNAme,
            DetYurRef: DetailURef,
            DueDate: DueDate,
            IsAct:'1'
        }
    );
    ChangeSpan();
    if (Lino > 1) {
        SetTotalinFirstRow()
    }

}

function LockPayModCom() {
    $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value(1);
    $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").readonly(true);
}

function SetTotalinFirstRow() {
    var MultiCredit;
    if ($("#HdrSec1_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var Cr = 0;
    var Dr = 0;
    var Total = CalTotal();
    $("#HdrSec2_InptTotAmt_Val").data("kendoNumericTextBox").value(Total);

    if (MultiCredit == 1) {
        Dr = Total;
    } else {
        Cr = Total;
    }
    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
    FirstRow.set("Amount", Total);
    FirstRow.set("CRAMT", Cr);
    FirstRow.set("DRAMT", Dr);
}
function CalTotal() {
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var newValue = 0;
    for (var i = 1; i < currentData.length; i++) {
        var tempamt = parseFloat(currentData[i].Amount);
        newValue = newValue + tempamt;
    }
    return newValue;
}


$("#PmtRcprGrd").on("dblclick", "tr.k-state-selected", function () {
    var id = ("#PmtRcprGrd");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var LiNo = selectedItem.LiNo;
    var AccKy = selectedItem.AccKy;
    var AdrKy = selectedItem.AdrKy;
    var TaskKy = selectedItem.TaskKy;
    var Analysys2Ky = selectedItem.Analysys2Ky;
    var PayModeKy = selectedItem.PayModeKy;
    var ChqNO_Val = selectedItem.ChqNo;
    var ChqDate = selectedItem.ChqDate;
    var Amt_Val = selectedItem.Amount;
    var BanckKy = selectedItem.BanckKy;
    var BranchKy = selectedItem.BranchKy;
    var CurencyKy = selectedItem.CurencyKy;
    var ExRate = selectedItem.ExRate;
    var Analysys1Ky = selectedItem.Analysys1Ky;
    var Analysys3Ky = selectedItem.Analysys3Ky;
    var Analysys4Ky = selectedItem.Analysys4Ky;
    var Analysys5Ky = selectedItem.Analysys5Ky;
    var Analysys6Ky = selectedItem.Analysys6Ky;
    var isCash_Val = selectedItem.IsCash;
    var IsAccPay = selectedItem.IsAccPay;
    var LCKy = selectedItem.LCKy;
    var LoanKy = selectedItem.LoanKy;
    var Order_Cd = selectedItem.OrderKy;
    var OrderDet_Cd = selectedItem.OrdrDetKy;
    var MaDate = selectedItem.Dt2;
    var ResAdrKy = selectedItem.ResAdrKy;
    var DesCri = selectedItem.Des;
    var PrjKy = selectedItem.PrjKy;
    var BuKy = selectedItem.BuKy;
    var DetDocNo = selectedItem.DetDocNo;
    var IsNegotiable = selectedItem.IsNegotiable;
    var isCross = selectedItem.isCross;
    var PayeeName = selectedItem.PayeeName;
    var DetYurRef = selectedItem.DetYurRef;
    var DueDate = selectedItem.DueDate;


    //  if (LiNo != 1) {
    document.getElementById("TempLinumbr").value = LiNo;
    FirstinsetDetail.LineNo = LiNo;
    if (LiNo == 1) {
        document.getElementById("HdrSec3_CmbAcc_Lbl").innerHTML = "Credit From";
    } else {
        document.getElementById("HdrSec3_CmbAcc_Lbl").innerHTML = "Debit To";

    }
    $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").setDataSource(AccountCodeDatasource('HdrSec3_CmbAcc'));
    $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").setDataSource(AccountDatasource('HdrSec3_CmbAcc'));
    $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
    $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
    $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
    $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
    $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
    $("#HdrSec3_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
    $("#HdrSec3_CmbBU_Cd").data("kendoComboBox").value(BuKy);
    $("#HdrSec3_CmbBU_Nm").data("kendoComboBox").value(BuKy);
    $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value(TaskKy);
    $("#HdrSec3_CmbTsk_Nm").data("kendoComboBox").value(TaskKy);
    $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value(PayModeKy);
    $("#HdrSec4_InptChqNO_Val").data("kendoNumericTextBox").value(ChqNO_Val);
    $("#HdrSec4_DatChqDate_Val").data("kendoDatePicker").value(ChqDate);
    $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value(LCKy);
    $("#HdrSec4_CmbLoan_Cd").data("kendoComboBox").value(LoanKy);
    if (isCash_Val == 1 || isCash_Val == true || isCash_Val == "True") {
        $("#HdrSec9_ChkboxisCash_Val").prop("checked", true);
    } else {
        $("#HdrSec9_ChkboxisCash_Val").prop("checked", false);
    }
    $("#HdrSec5_NmricAmt_Val").data("kendoNumericTextBox").value(Amt_Val);
    $("#HdrSec5_CmbBank_Cd").data("kendoComboBox").value(BanckKy);
    $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").value(BranchKy);
    $("#HdrSec5_CmbOrder_Cd").data("kendoComboBox").value(Order_Cd);
    $("#HdrSec5_CmbResAdr_Cd").data("kendoComboBox").value(ResAdrKy);
    //if (IsAccPay == 1 || IsAccPay == true || isCash_Val == "True") {
    if (IsAccPay == 1 || IsAccPay == true || IsAccPay == "True") {
        $("#HdrSec9_Chkbox_isAccPaye_Val").prop("checked", true);
    } else {
        $("#HdrSec9_Chkbox_isAccPaye_Val").prop("checked", false);
    }
    $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").value(CurencyKy);
    document.getElementById("HdrSec6_InptCurExRate_Val").value = ExRate;
    $("#HdrSec6_DatMADate_Val").data("kendoDatePicker").value(MaDate);
    $("#HdrSec6_CmbOrderDet_Cd").data("kendoComboBox").value(OrderDet_Cd);
    $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value(Analysys1Ky);
    $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value(Analysys1Ky);
    $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value(Analysys2Ky);
    $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value(Analysys2Ky);
    $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").value(Analysys3Ky);
    $("#HdrSec7_CmbAnl3_Nm").data("kendoComboBox").value(Analysys3Ky);
    $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").value(Analysys4Ky);
    $("#HdrSec7_CmbAnl4_Nm").data("kendoComboBox").value(Analysys4Ky);
    $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").value(Analysys5Ky);
    $("#HdrSec7_CmbAnl5_Nm").data("kendoComboBox").value(Analysys5Ky);
    $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").value(Analysys6Ky);
    $("#HdrSec7_CmbAnl6_Nm").data("kendoComboBox").value(Analysys6Ky);
    $('#HdrSec8_TxtArea_Des_Val').val(DesCri);
    //if (IsNegotiable == 1 || IsNegotiable == true || isCash_Val == "True") {
    if (IsNegotiable == 1 || IsNegotiable == true || IsNegotiable == "True") {
        $("#HdrSec9_Chkbox_Nagotiable_Val").prop("checked", true);
    } else {
        $("#HdrSec9_Chkbox_Nagotiable_Val").prop("checked", false);
    }
    document.getElementById("HdrSec5_DatDueDate_Val").value = DueDate;
    if (isCross == 1 || isCross == true || isCross == "True") {
        $("#HdrSec9_Chkbox_isCross_Val").prop("checked", true);
    } else {
        $("#HdrSec9_Chkbox_isCross_Val").prop("checked", false);
    }

    document.getElementById("HdrSec3_InptPayee_Val").value = PayeeName;
    document.getElementById("HdrSec4_InptDtlUrRef_Val").value = DetYurRef;
    document.getElementById("HdrSec6_InptDtlDocNo_Val").value = DetDocNo;

    //StampDuty Should be there

    if (LiNo != 1) {
        $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value(1);
        $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").readonly(true);
    } else {
        $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").enable();
    }
    //} else {

    //    alert("You Cannot change the Line Number one");
    //}

});

function UpdateSelectedRow(Lino, AccountKy, Acc_Cd, Acc_Nm, AdressKy, Adr_Cd, Adr_Nm, BUKy, CmbBU_Cd, CmbBU_Nm, ProjectKy, Prj_Cd, Prj_Nm, TaskKy, Task_Cd, Task_Nm, PmtModeKey, PmtMode_Cd, ChqNo, ChqDate, LoanKy, Loan_Cd, LCKy, LC_Cd, IsCash, BankKy, Bank_Cd, BrnKy, Brn_Cd, OrderKy, Order_Cd, ResAdrKy, ResAdr_Cd, IsAccPayee, CurKy, Cur_Cd, CurExRate, MADate, OrderDetKy, OrderDet_Cd, IsStamp, Anl1Ky, Anl1_Cd, Anl1_Nm, Anl2Ky, Anl2_Cd, Anl2_Nm, Anl3Ky, Anl3_Cd, Anl3_Nm, Anl4Ky, Anl4_Cd, Anl4_Nm, Anl5Ky, Anl5_Cd, Anl5_Nm, Anl6Ky, Anl6_Cd, Anl6_Nm, Amount, Description, CrAmt, DrAmt, DtlDocNo, IsNonNeg, IsCrossed, PayeeNAme, DetailURef, DueDate) {
    var RowUpdate = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[Lino - 1];
    RowUpdate.set("LiNo", Lino);
    RowUpdate.set("AccKy", AccountKy);
    RowUpdate.set("AccCd", Acc_Cd);
    RowUpdate.set("AccNm", Acc_Nm);
    RowUpdate.set("AdrKy", AdressKy);
    RowUpdate.set("AdrCd", Adr_Cd);
    RowUpdate.set("AdrNm", Adr_Nm);
    RowUpdate.set("PayModeKy", PmtModeKey);
    RowUpdate.set("PayModeCd", PmtMode_Cd);
    RowUpdate.set("ChqNo", ChqNo);
    RowUpdate.set("ChqDate", ChqDate);
    RowUpdate.set("PrjKy", ProjectKy);
    RowUpdate.set("PrjCd", Prj_Cd);
    RowUpdate.set("PrjNm", Prj_Nm);
    RowUpdate.set("BanckKy", BankKy);
    RowUpdate.set("BanckCd", Bank_Cd);
    RowUpdate.set("BranchKy", BrnKy);
    RowUpdate.set("BranchCD", Brn_Cd);
    RowUpdate.set("CurencyKy", CurKy);
    RowUpdate.set("CurencyCd", Cur_Cd);
    RowUpdate.set("ExRate", CurExRate);
    RowUpdate.set("TaskKy", TaskKy);
    RowUpdate.set("TaskId", Task_Cd);
    RowUpdate.set("TaskNm", Task_Nm);
    RowUpdate.set("Analysys1Ky", Anl1Ky);
    RowUpdate.set("Analysys1", Anl1_Cd);
    RowUpdate.set("Analysys1Nm", Anl1_Nm);
    RowUpdate.set("Analysys2Ky", Anl2Ky);
    RowUpdate.set("Analysys2", Anl2_Cd);
    RowUpdate.set("Analysys2Nm", Anl2_Nm);
    RowUpdate.set("Analysys3Ky", Anl3Ky);
    RowUpdate.set("Analysys3", Anl3_Cd);
    RowUpdate.set("Analysys3Nm", Anl3_Nm);
    RowUpdate.set("Analysys4Ky", Anl4Ky);
    RowUpdate.set("Analysys4", Anl4_Cd);
    RowUpdate.set("Analysys4Nm", Anl4_Nm);
    RowUpdate.set("Analysys5Ky", Anl5Ky);
    RowUpdate.set("Analysys5", Anl5_Cd);
    RowUpdate.set("Analysys5Nm", Anl5_Nm);
    RowUpdate.set("Analysys6Ky", Anl6Ky);
    RowUpdate.set("Analysys6", Anl6_Cd);
    RowUpdate.set("Analysys6Nm", Anl6_Nm);
    RowUpdate.set("IsCash", IsCash);
    RowUpdate.set("Amount", parseFloat(Amount).toFixed(2));
    if (Lino == 1) {
        DrAmt = 0;
        RowUpdate.set("CRAMT", parseFloat(Amount).toFixed(2));
    }
    else {
        RowUpdate.set("CRAMT", parseFloat(CrAmt).toFixed(2));
    }
    
    RowUpdate.set("DRAMT", parseFloat(DrAmt).toFixed(2));
    RowUpdate.set("Des", Description);
    RowUpdate.set("IsAccPay", IsAccPayee);
    RowUpdate.set("BuKy", BUKy);
    RowUpdate.set("BuCd", CmbBU_Cd);
    RowUpdate.set("BuNm", CmbBU_Nm);
    RowUpdate.set("Dt2", MADate);
    RowUpdate.set("LCKy", LCKy);
    RowUpdate.set("LCNo", LC_Cd);
    RowUpdate.set("LoanKy", LoanKy);
    RowUpdate.set("LoanNo", Loan_Cd);
    RowUpdate.set("OrderKy", OrderKy);
    RowUpdate.set("OrderNo", Order_Cd);
    RowUpdate.set("OrdrDetKy", OrderDetKy);
    RowUpdate.set("OrdrDetNo", OrderDet_Cd);
    RowUpdate.set("ResAdrKy", ResAdrKy);
    RowUpdate.set("ResAdrCode", ResAdr_Cd);
    RowUpdate.set("DetDocNo", DtlDocNo);
    RowUpdate.set("IsNegotiable", IsNonNeg);
    RowUpdate.set("isCross", IsCrossed);
    RowUpdate.set("PayeeName", PayeeNAme);
    RowUpdate.set("DetYurRef", DetailURef);
    RowUpdate.set("DueDate", DueDate);
    RowUpdate.set("IsAct", '1');
    if ($("#PmtRcprGrd").data("kendoGrid").dataSource._data.length > 1) {
        SetTotalinFirstRow();
    }
   
    ClearDetailLevel();
}
//