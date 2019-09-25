
function clearfunction() {

    $('#HdrSec1_CmbEmpNo_Cd').data('kendoComboBox').value(null);
    $('#HdrSec1_CmbEmpNm_Cd').data('kendoComboBox').value(null);
    $('#HdrSec1_CmbOTTyp_Cd').data('kendoComboBox').value(null);
    $('#HdrSec1_DatPicEntMonth_Val').data("kendoDatePicker").value("");
    document.getElementById("HdrSec1_InptOTHrs_Val").value = "";
    $("#GridOTEntry").data('kendoGrid').dataSource.data([]);
    $("#OT").closest(".k-widget").hide();
}


function Add() {

    if (document.getElementById("HdrSec1_CmbEmpNo_Cd").value != "")
    {
        if (document.getElementById("HdrSec1_CmbOTTyp_Cd").value != "")
        {
            if (document.getElementById("HdrSec1_DatPicEntMonth_Val").value != "")
            {
                if (document.getElementById("HdrSec1_InptOTHrs_Val").value != "")
                {

                    
                    var EmpNo = $("#HdrSec1_CmbEmpNo_Cd").data('kendoComboBox').text();
                    var EmpNm = $("#HdrSec1_CmbEmpNm_Cd").data('kendoComboBox').text();


                    var OTTyp = $("#HdrSec1_CmbOTTyp_Cd").data('kendoComboBox').text();

                    var OTRate = $("#OT").data('kendoComboBox').text();

                    var EntryMonth = $('#HdrSec1_DatPicEntMonth_Val').val();
                    var EmpKy = $('#HdrSec1_CmbEmpNo_Cd').val();
                    var CdKy = $('#HdrSec1_CmbOTTyp_Cd').val();

                    var OTHOr = document.getElementById("HdrSec1_InptOTHrs_Val").value;

                    var grid = $("#GridOTEntry").data("kendoGrid");
                    var dataSource = grid.dataSource;
                    var total = dataSource.data().length;

                    grid.dataSource.insert(
                        total,
                        {
                            LiNo: total + 1,
                            EmpNo: EmpNo,
                            EmpNm: EmpNm,
                            OTTyp: OTTyp,
                            EntryMonth: EntryMonth,
                            OTRate:OTRate,
                            OTHOr: OTHOr,
                            EmpKy: EmpKy,
                            CdKy: CdKy



                        });
                }

                else {
                    alert("please Enter OT Hours");
                }
            }

            else {
                alert("please Enter Entry Month");
            }
        }

        else {
            alert("please Enter OT Rate");
        }
    }

    else {
        alert("please Enter Emp No");
    }
}
function SaveUpdate() {

    var ky = $('#HdrSec1_CmbEmpNo_Cd').data('kendoComboBox').value();

    var GridOTEntry = $("#GridOTEntry").data("kendoGrid");

    var dataSource = GridOTEntry.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var currentData = GridOTEntry.dataSource.data();
    var updatedRecords = [];
    var newRecordsOTEntry = [];
    //alert(currentData.length);

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecordsOTEntry.push(currentData[i].toJSON());
        } else if (currentData[i].Dirty ) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    $.ajax({

        url: urlEmpMas.OTEntry,
        data: JSON.stringify({

            OTEntry: kendo.stringify(newRecordsOTEntry)

            //EmpDed:x



        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data > 1) {

                alert("successfully Saved!");
                LoadOTGrid(ky);

            }

            //alert(data)
            //var a = data;
            ////  $("#Trnky").value(a);
            //var elem = document.getElementById("Trnky");
            //elem.value = a;
            
            //  alert(a)
            //  GetGridDetail(a);
            //clearfunction();
            
        },
        error: function (e) {
            return false;
            LoadOTGrid(ky);
        }

    });





}
function AfterFindEmp(EmpKy) {

    var EMPKY = EmpKy;
    LoadOTGrid(EMPKY);
    $('#HdrSec1_CmbEmpNo_Cd').data('kendoComboBox').value(EmpKy);
    $('#HdrSec1_CmbEmpNm_Cd').data('kendoComboBox').value(EmpKy);

    //$.ajax({
    //    url: urlEmpMas.GetOTDetails,
    //    //url:GetEmpDetails,
    //    data: JSON.stringify({
    //        EmpKy: EmpKy,
    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    dataType: "Json",
    //    type: "POST",



    //    success: function (data) {


    //        $("#GridOTEntry").data("kendoGrid").dataSource.data(data);

    //    },
    //    error: function (e) {
    //        return false;
    //    }
    //});
}