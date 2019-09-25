function Add() {
    if (document.getElementById("HdrSec1_CmbEmpNo_cd").value != "") {
        if (document.getElementById("HdrSec2_DatPicDate_Val").value != "") {
      

            if (document.getElementById("HdrSec3_CmbAddTyp_cd").value == "" && document.getElementById("HdrSec5_CmbDedTyp_cd").value == "") {
                    alert("Please Enter Addition or Deduction Type ");
                }
            else {


                if (document.getElementById("HdrSec3_CmbAddTyp_cd").value != "") {

                    if (document.getElementById("HdrSec4_InptAmt_Val").value != "") {

                        var EmpNo = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").text();
                        var EmpNm = $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").text();




                        var AdditionType = $("#HdrSec3_CmbAddTyp_cd").data("kendoComboBox").text();
                        var EntryMonthAdd = $('#HdrSec2_DatPicDate_Val').val();
                        var EmpKy = $('#HdrSec1_CmbEmpNo_cd').val();
                        var CdKy = $('#HdrSec3_CmbAddTyp_cd').val();

                        var AmountAdd = document.getElementById("HdrSec4_InptAmt_Val").value;


                        var grid = $("#MonthlyAdditionEntry").data("kendoGrid");
                        var dataSource = grid.dataSource;
                        var total = dataSource.data().length;

                        grid.dataSource.insert(
                   total,
                   {
                       LiNo: total + 1,
                       EmpNo: EmpNo,
                       EmpNm: EmpNm,
                       AdditionType: AdditionType,
                       EntryMonthAdd: EntryMonthAdd,
                       EmpKyAdd: EmpKy,
                       CdKyAdd: CdKy,
                       AmountAdd: AmountAdd



                   });
                        
                        $("#HdrSec4_InptAmt_Val").data("kendoNumericTextBox").value("");
                        $("#HdrSec3_CmbAddTyp_cd").data("kendoComboBox").value("");
                    }

                    else {
                        alert("Please Enter Addition Ammount ");
                    }

                }

                if (document.getElementById("HdrSec5_CmbDedTyp_cd").value != "") {


                    
                    if (document.getElementById("HdrSec6_InptAmtDed_Val").value != "") {

                        var EmpNo = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").text();
                        var EmpNm = $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").text();




                        var DeductionType = $("#HdrSec5_CmbDedTyp_cd").data("kendoComboBox").text();
                        var EntryMonthDed = $('#HdrSec2_DatPicDate_Val').val();
                        var EmpKy = $('#HdrSec1_CmbEmpNo_cd').val();
                        var CdKy = $('#HdrSec5_CmbDedTyp_cd').val();

                        var AmountDed = document.getElementById("HdrSec6_InptAmtDed_Val").value;


                        var grid = $("#MonthlyDeductionEntry").data("kendoGrid");
                        var dataSource = grid.dataSource;
                        var total = dataSource.data().length;

                        grid.dataSource.insert(
                   total,
                   {
                       LiNo: total + 1,
                       EmpNo: EmpNo,
                       EmpNm: EmpNm,
                       DeductionType: DeductionType,
                       EntryMonthDed: EntryMonthDed,
                       EmpKyDed: EmpKy,
                       CdKyDed: CdKy,
                       AmountDed: AmountDed



                   });
                       
                        $("#HdrSec6_InptAmtDed_Val").data("kendoNumericTextBox").value("");
                        $("#HdrSec5_CmbDedTyp_cd").data("kendoComboBox").value("");
                    }


                    else {
                        alert("Please Enter Deduction Ammount ");
                    }



                }
                   
                }


            


        }
        else {
            alert("Please Enter Month");
        }
    }



    else {
        alert("Please Enter Emp No");
    }
}
function clearDet() {

    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_DatPicDate_Val").data("kendoDatePicker").value("");
    $("#HdrSec4_InptAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec6_InptAmtDed_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec5_CmbDedTyp_cd").data("kendoComboBox").value("");
    $("#HdrSec3_CmbAddTyp_cd").data("kendoComboBox").value("");
    $("#MonthlyAdditionEntry").data('kendoGrid').dataSource.data([]);
    $("#MonthlyDeductionEntry").data('kendoGrid').dataSource.data([]);
   
}
function SaveUpdate() {


    var GridMonthlyAdditionEntry = $("#MonthlyAdditionEntry").data("kendoGrid");
    var GridMonthlyDeductionEntry = $("#MonthlyDeductionEntry").data("kendoGrid");
    //save grid addition
    var dataSource = GridMonthlyAdditionEntry.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var currentData = GridMonthlyAdditionEntry.dataSource.data();
    var updatedRecords = [];
    var newRecordsGridMonthlyAdd = [];
  

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {          
            newRecordsGridMonthlyAdd.push(currentData[i].toJSON());
        } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }


    //save grid deduction
    var dataSourceded = GridMonthlyDeductionEntry.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSourceded.view().length;
    //total records
    var totalRecords = dataSourceded.total();

    var currentData = GridMonthlyDeductionEntry.dataSource.data();
    var updatedRecords = [];
    var newRecordsGridMonthlyDed = [];
    //alert(currentData.length);

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            //alert(newRecordsGridMonthlyAdditionEntry);
            newRecordsGridMonthlyDed.push(currentData[i].toJSON());
        } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }
   // alert(newRecordsGridMonthlyAdditionEntry);
    $.ajax({

        url: urlEmpMas.SaveAddDed,
        data: JSON.stringify({

            newRecordsGridMonthlyAdditionEntry: kendo.stringify(newRecordsGridMonthlyAdd),
            newRecordsGridMonthlyDeductionEntry: kendo.stringify(newRecordsGridMonthlyDed)

            //EmpDed:x



        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data > 1)
            {
                alert("successfully Saved!");

            }
            //alert(data)
            //var a = data;
            ////  $("#Trnky").value(a);
            //var elem = document.getElementById("Trnky");
            //elem.value = a;
            
            //  alert(a)
            //  GetGridDetail(a);
            //clearDet();
        },
        error: function (e) {
            return false;
        }

    });





}
function AfterFindEmp(EmpKy, EntryDate) {

    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value(EmpKy);
    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(EmpKy);
    $('#HdrSec2_DatPicDate_Val').val(EntryDate);

    MonthlyAdditionEntry(EmpKy, EntryDate);
    MonthlyDeductionEntry(EmpKy, EntryDate);
   
    //$.ajax({
    //    url: urlEmpMas.GetAddDedDetails,
    //    //url:GetEmpDetails,
    //    data: JSON.stringify({
    //        EmpKy: EmpKy,
    //        EntryDate:EntryDate
    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    dataType: "Json",
    //    type: "POST",



    //    success: function (data) {
    //        var Addition = [];
    //        var Diduction = [];
    //        $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value(EmpKy);
    //        $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(EmpKy);
    //        $('#HdrSec2_DatPicDate_Val').val(EntryDate);
    //        if (data.length > 0) {
    //            for (var i = 0; i < data.length; i++) {
    //              //  console.log(data.IsAdtoin);
    //                if (data[i].IsAdtoin == 1) {
    //                    Addition.push(data[i]);
    //                } else {
    //                    Diduction.push(data[i]);
    //                }

    //            }

    //        }           

    //        $("#MonthlyAdditionEntry").data("kendoGrid").dataSource.data(Addition);
    //        $("#MonthlyDeductionEntry").data("kendoGrid").dataSource.data(Diduction);


    //    },
    //    error: function (e) {
    //        return false;
    //    }
    //});
}