
var Editing_LiNo = -1;

function clearDet() {

    $("#EmpNo").data("kendoComboBox").value("");
    $("#EmpNm").data("kendoComboBox").value("");
    var todayDate = new Date();
    $("#FromD").data("kendoDatePicker").value(todayDate);
    $("#ToD").data("kendoDatePicker").value(todayDate);
    $("#LeaveType").data("kendoComboBox").value("");
    $("#EntitlesD").data("kendoNumericTextBox").value("");

    //$('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
    //$('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
    try {
        $('#GridLeaveEntitle').data().kendoGrid.destroy();
        $('#GridLeaveEntitle').empty();

    } catch (e) { }
    //LoadLeaveEntitleGrid(1);
}

function Add() {

    var LiNo = 1;

    var grid = $("#GridLeaveEntitle").data("kendoGrid");

    if (document.getElementById("EmpNo").value != "") {

        if (document.getElementById("FromD").value != "") {
            if (document.getElementById("ToD").value != "") {
                if (document.getElementById("LeaveType").value != "") {

                        var EmpNo = $("#EmpNo").data("kendoComboBox").text();
                        var EmpNm = $("#EmpNm").data("kendoComboBox").text();
                        var LeaveType = $("#LeaveType").data("kendoComboBox").text();
                        var FromD = $('#FromD').val();
                        //FromD = FromD.toString("yyyy/MM/dd");
                        var ToD = $('#ToD').val();
                        var Emp = $("#EmpNm").data("kendoComboBox").value();
                        var CdKy = $('#LeaveType').val();
                        var LevTypKy = $("#LeaveType").data("kendoComboBox").value();
                        

                        var LevDays = $("#EntitlesD").data("kendoNumericTextBox").value();

                        //Get the calculation for number of days  
                        //var frmday = FromD.split("/");
                        //var Today = ToD.split("/");
                        //var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        //var firstDate = new Date(frmday[2], frmday[1], frmday[0]);
                        //var secondDate = new Date(Today[2],Today[1],Today[0]);

                        ////levDay -> number of day (today - From Day)
                        //var LevDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1;
                        ////ToD = ToD.toString("yyyy/MM/dd");

                        //if (new Date(secondDate).getTime() < firstDate.getTime()) {
                        //    alert("The To Date must be Bigger or Equal to From date");
                        //    return false;
                        //}
                        ////Haif day opction 
                        //var Isfirst = $('#HdrSec1_Chkbox_Isfirst_Val').is(':checked');
                        //var IsSecond = $('#HdrSec1_Chkbox_IsSecond_Val').is(':checked');
                        //var is1stHfDy =0;
                        //var is2ndHfDy =0;

                        //if (Isfirst == true && IsSecond == true)
                        //{
                        //    alert("You Can't Select both IsFirst And IsSecond ");
                        //    return;
                        //}
                        
                        //if (Isfirst == true || IsSecond == true) {
                        //    if (LevDays == 1) {
                        //        if (Isfirst == true) {
                        //            is1stHfDy = 1;
                        //        }
                        //        else if (IsSecond == true) {
                        //            is2ndHfDy = 1;
                        //        }
                        //    }
                        //    else {
                        //        alert("You Can't get HalfDay. Set FromDay And ToDay Same");
                        //        $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
                        //        $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
                        //        return;
                        //    }
                        //}

                        //below code use for remove duplicate records

                        //var arrayFromDate = [];
                        //var arrayToDate = [];
                        //var data = $("#GridLeaveEntitle").data("kendoGrid").dataSource._data;
                        //for (i = 0; i < data.length; i++) {
                        //    arrayFromDate.push(data[i].FromD);
                        //    arrayToDate.push(data[i].ToD);
                        //}



                    //65285856+26265
                        //From Date 
                        //var dateObj = arrayFromDate[1];
                        //var month = dateObj.getUTCMonth() + 1; //months from 1-12
                        //var day = dateObj.getUTCDate()+1;
                        //var year = dateObj.getUTCFullYear();

                        //newFromdate = day + "/" + month + "/" + year;
                        
                        //To Date
                        //var TodateObj = arrayToDate[1];
                        //var Tomonth = TodateObj.getUTCMonth() + 1; //months from 1-12
                        //var Today = TodateObj.getUTCDate()+1;
                        //var Toyear = TodateObj.getUTCFullYear();

                        //newTodate = Today + "/" + Tomonth + "/" + Toyear;

                        //if (dateCheck(newFromdate, newTodate, FromD))
                        //    alert("Availed");
                        //else
                        //    alert("Not Availed");

                        //function dateCheck(from, to, check) {

                        //    var fDate, lDate, cDate;
                        //    fDate = Date.parse(from);
                        //    lDate = Date.parse(to);
                        //    cDate = Date.parse(check);

                        //    if ((cDate <= lDate && cDate >= fDate)) {
                        //        return true;
                        //    }
                        //    return false;
                        //}
                        //var currentDate = FromD;

                        //var minDate = newFromdate;
                        //var maxDate = newTodate;
                        ////var currentDate = new Date(FromD);

                        ////var minDate = new Date(newFromdate);
                        ////var maxDate = new Date(newTodate);

                        //if (currentDate == minDate || currentDate == maxDate) {
                        //    alert('Correct Date');
                        //}
                        //else {
                        //    alert('Out Side range !!');
                        //}

                        
                        //checkleave(EmpNo, EmpNm, EmpKy, FromD, LeaveType, ToD, "",LevDays,LevTypKy, CdKy);

                        if (Editing_LiNo > 0) {

                            LiNo = Editing_LiNo;

                            var firstItemData = grid.dataSource.data();
                            var firstItem = firstItemData[LiNo - 1];//[count - LiNoForChange];

                            firstItem.set("LiNo", LiNo);
                            firstItem.set("EmpNo", EmpNo);
                            firstItem.set("EmpNm", EmpNm);
                            firstItem.set("FromD", FromD);
                            firstItem.set("ToD", ToD);
                            firstItem.set("LeaveType", LeaveType);
                            firstItem.set("LevDays", LevDays);
                            firstItem.set("LevTypKy", LevTypKy);
                            //firstItem.set("is1stHfDy", is1stHfDy);
                            //firstItem.set("is2ndHfDy", is2ndHfDy);
                            firstItem.set("isAct", 1);
                            //firstItem.set("EmpKy", Emp);

                            firstItem.Dirty = "Dirty";
                            Editing_LiNo = 0;
                        }
                        else {
                            var dataSource = grid.dataSource;
                            var total = dataSource.data().length;

                            grid.dataSource.insert(
                       LiNo = total + 1,
                       {
                           LiNo: LiNo,
                           EmpNo: EmpNo,
                           EmpNm: EmpNm,
                           FromD: FromD,
                           ToD: ToD,
                           LeaveType: LeaveType,
                           LevDays: LevDays,
                           EmpKy: EmpKy,
                           LevTypKy: LevTypKy,
                           //is1stHfDy: is1stHfDy,
                           //is2ndHfDy: is2ndHfDy,
                           isAct:1,


                       });

                        }


                }

                else {
                    alert("please Enter Leave Type");
                }
            }

            else {
                alert("please Enter To Date");
            }
        }

        else {
            alert("please Enter From Date");
        }



    }

    else {
        alert("please Enter Emp No");
    }


}


function checkleave(EmpNo, EmpNm, EmpKy, FromD, LeaveType, ToD, RequestD, LevDays, LevTypKy, CdKy) {

    $.ajax({

        url: urlEmpMas.checkleave,
        data: JSON.stringify({
            EmpNo: EmpNo,
            EmpKy: EmpKy,
            FromD: FromD,
            LevTypKy: LevTypKy,
            LevDays: LevDays,
            LeaveType: LevTypKy,
            CdKy: CdKy,
            checkleave: kendo.stringify(EmpNo, EmpKy, FromD, LeaveType, LevDays, CdKy)

            //EmpDed:x



        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var grid = $("#GridLeaveEntitle").data("kendoGrid");
            var dataSource = grid.dataSource;
            var total = dataSource.data().length;

            if (data == 0) {

                grid.dataSource.insert(
                     LiNo = total + 1,
                    {
                        LiNo: LiNo,
                        EmpNo: EmpNo,
                        EmpNm: EmpNm,
                        LeaveType: LeaveType,
                        FromD: FromD,
                        ToD: ToD,
                        LevTypKy: LevTypKy,
                        LevTrnKy: 0,
                        LevDays: LevDays,
                        EmpKy: EmpKy,
                        CdKy: CdKy



                    });
            }
            else {
                alert("Sorry! This Details already Exits.")

            }

        },
        error: function (e) {
            return false;
        }

    });
}

//Ctrl + Z key Down Function 
$(document).keydown(function (e) {

    if (e.which === 90 && e.ctrlKey) {
        Add();
    }
});

function SaveUpdate() {


    var GridLeaveEntitle = $("#GridLeaveEntitle").data("kendoGrid");

    var dataSource = GridLeaveEntitle.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var currentData = GridLeaveEntitle.dataSource.data();
    var updatedRecords = [];
    var newRecordsLeaveEntry = [];
    //alert(currentData.length);

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecordsLeaveEntry.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
        //else if (currentData.length == 1) {
        //    newRecordsLeaveEntry = currentData;
        //}
    }
    var tempSAveChech = true;

    if (newRecordsLeaveEntry.length != 0) {

        if (Editing_LiNo == -1) {

            $.ajax({

                url: urlEmpMas.LeaveEntitle,
                data: JSON.stringify({

                    LeaveEnt: kendo.stringify(newRecordsLeaveEntry),
                    OurCd: viewBag.OurCd
                    //EmpDed:x



                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data > 1) {
                        alert("Successfully Saved..!");
                        LoadLeaveEntitleGrid(); // update grid
                        clearDet();
                    } else {
                        alert("Record Not Saved");
                        LoadLeaveEntitleGrid(); // update grid
                        clearDet();
                    }
                },
                error: function (e) {
                    alert("Record Not Saved");
                    LoadLeaveEntitleGrid();
                    clearDet();
                    return false;
                }

            });

        }
        else {
            alert("update the" + Editing_LiNo + "Row ");
        }

    }
    else if (updatedRecords.length != 0) {

        //this For loop update the From Date and toDate 
        //previous devloper Set the default time zone so when your going to update it will reduce date by one day 

        for (var i = 0; i < updatedRecords.length; i++) {
        var fromdate = updatedRecords[i].FromD;
        var datastring = fromdate.getDate();
        fromdate.setDate(datastring + 1);
        updatedRecords[i].FromD = fromdate;
       
        var Todate = updatedRecords[i].ToD;
        var todatestring = Todate.getDate();
        Todate.setDate(todatestring + 1);
        updatedRecords[i].ToD = Todate;
        }
        
        $.ajax({

            url: urlEmpMas.LeaveEntitle,
            data: JSON.stringify({

                LeaveEnt: kendo.stringify(updatedRecords),
                OurCd: viewBag.OurCd
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data > 1) {
                    alert("Successfully Saved..!");
                    LoadLeaveEntitleGrid(); // update grid
                    clearDet();
                } else {
                    alert("Record Not Saved");
                    LoadLeaveEntitleGrid(); // update grid
                    clearDet();
                }
            },
            error: function (e) {
                alert("Record Not Saved");
                LoadLeaveEntitleGrid();
                clearDet();
                return false;
            }

        });
    }

}


//function AfterFindEmp(EmpKy) {
//    //alert(EmpKy);
//    $.ajax({
//        url: urlEmpMas.LevTrn_SelectWeb,
//        //url:GetEmpDetails,
//        data: JSON.stringify({
//            EmpKy: EmpKy,
//        }),
//        contentType: 'application/json; charset=utf-8',
//        dataType: "Json",
//        type: "POST",



//        success: function (data) {


//            $("#GridLeaveEntitle").data("kendoGrid").dataSource.data(data);

//            $("#EmpNo").data("kendoComboBox").value("");
//            $("#EmpNm").data("kendoComboBox").value("");
//            //$("#RequestD").data("kendoDatePicker").value("");
//            $("#FromD").data("kendoDatePicker").value("");
//            $("#ToD").data("kendoDatePicker").value("");
//            $("#LeaveType").data("kendoComboBox").value("");
//            $("#EntitlesD").data("kendoNumericTextBox").value("");
//            $("#GridLeaveEntitle").data('kendoGrid').dataSource.data([]);

//        },
//        error: function (e) {
//            return false;
//        }
//    });
//}



$("#GridLeaveEntitle").bind("dblclick", DblClick);

function DblClick() {
    var id = ("#GridLeaveEntitle");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    var LiNo = selectedItem.LiNo;
    var EmpNo = selectedItem.EmpNo;
    var EmpNm = selectedItem.EmpNm;
    //var RequestD = selectedItem.RequestD;
    var FromD = selectedItem.FromD;
    var ToD = selectedItem.ToD;
    var LeaveType = selectedItem.LevTypKy;
    var LevDays = selectedItem.LevDays;
    //var is1halfDay = selectedItem.is1stHfDy;
    //var is2halfDay = selectedItem.is2ndHfDy;

    console.log(EmpNo)

    //LoadCombo()

    $("#EmpNo").data("kendoComboBox").value(EmpNo);
    $("#EmpNm").data("kendoComboBox").value(EmpNm);
    //$("#RequestD").data("kendoDatePicker").value(RequestD);
    $("#FromD").data("kendoDatePicker").value(FromD);
    $("#ToD").data("kendoDatePicker").value(ToD);
    $("#LeaveType").data("kendoComboBox").value(LeaveType);
    $("#EntitlesD").data("kendoNumericTextBox").value(LevDays);

    //Set the value for 1Half Day 
    //if (is1halfDay == 1)
    //{
    //    $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', true);
    //}
    //else {
    //    $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
    //}
    ////Set the value for 2Half Day 
    //if (is2halfDay == 1) {
    //    $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', true);
    //} else {
    //    $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
    //}
    
    

   Editing_LiNo = LiNo;

}

//upDate Function 
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (Editing_LiNo > -1) {
            var gridlineNo = Editing_LiNo - 1;
            $("#GridLeaveEntitle").bind(this);
            var EmpNo = $("#EmpNo").data("kendoComboBox").text();
            var EmpNm = $("#EmpNm").data("kendoComboBox").text();
            var LeaveType = $("#LeaveType").data("kendoComboBox").text();
            var FromD = $('#FromD').val();
            
            var ToD = $('#ToD').val();
            var LevDays = $("#EntitlesD").data("kendoNumericTextBox").value();
            var frmday = FromD.split("/");
            var Today = ToD.split("/");
            var oneDay = 24 * 60 * 60 * 1000; 
            var firstDate = new Date(frmday[2], frmday[1], frmday[0]);
            var LevTypKy = $("#LeaveType").data("kendoComboBox").value();
            
            var secondDate = new Date(Today[2], Today[1], Today[0]);

            //To Check the From Date Is bigger then To Date
            if (new Date(secondDate).getTime() < firstDate.getTime()) {
                alert("The To Date must be Bigger or Equal to From date");
                return false;
            }
            
            //Get The number Of Leave Date 
            var day = frmday[0];
            var mon = frmday[1];
            var year = frmday[2];
            var NewFromdate = year + "/" + mon + "/" + day;
            var Todays = Today[0];
            var Tomon = Today[1];
            var Toyear = Today[2];
            var NewTodate = Toyear + "/" + Tomon + "/" + Todays;


            ////levDay -> number of day (today - From Day)
            //var LevDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1;

            //var Isfirst = $('#HdrSec1_Chkbox_Isfirst_Val').is(':checked');
            //var IsSecond = $('#HdrSec1_Chkbox_IsSecond_Val').is(':checked');
            //var is1stHfDy = 0;
            //var is2ndHfDy = 0;

            //if (Isfirst == true && IsSecond == true) {
            //    alert("You Can't Select both IsFirst And IsSecond ");
            //    return;
            //}

            //if (Isfirst == true || IsSecond == true) {
            //    if (LevDays == 1) {
            //        if (Isfirst == true) {
            //            is1stHfDy = 1;
            //        }
            //        else if (IsSecond == true) {
            //            is2ndHfDy = 1;
            //        }
            //    }
            //    else {
            //        alert("You Can't get HalfDay. Set FromDay And ToDay Same");
            //        $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
            //        $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
            //        return;
            //    }
            //}
           
            var RowUpdate = $("#GridLeaveEntitle").data().kendoGrid.dataSource.data()[gridlineNo];
                RowUpdate.set("EmpNo",EmpNo);
                RowUpdate.set("EmpNm", EmpNm);
                RowUpdate.set("FromD", NewFromdate);
                RowUpdate.set("ToD", NewTodate);
                RowUpdate.set("LeaveType", LeaveType);
                //Update The Leave Type
                RowUpdate.set("LevTypKy", LevTypKy);
                RowUpdate.set("LevDays", LevDays);
                //RowUpdate.set("is1stHfDy", is1stHfDy);
                //RowUpdate.set("is2ndHfDy", is2ndHfDy);
                Editing_LiNo = -1;
            

        }
        else {
            //Editing_LiNo == -1 Call the Add Function 
            Add();
        }
    }
    
});

//Delete Button Click Function 
function GridDeleteButtonIsClicked(e) {
    e.preventDefault();
    var grid = $("#GridLeaveEntitle").data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
    var answer = confirm("Are you sure you want to delete from the database?");
    dataItem.isAct = 0;
    var DeleteRecords = [];
    DeleteRecords.push(dataItem.toJSON());
    if (answer) {
        $.ajax({

            url: urlEmpMas.LeaveEntitle,
            data: JSON.stringify({

                LeaveEnt: kendo.stringify(DeleteRecords),
                OurCd: viewBag.OurCd
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data > 1) {
                    alert("Successfully Delete..!");
                    LoadLeaveEntitleGrid(); // update grid
                    
                } else {
                    alert("Record Not Delete");
                    LoadLeaveEntitleGrid(); // update grid
                    
                }
            },
            error: function (e) {
                alert("Record Not Delete");
                LoadLeaveEntitleGrid();
                
                return false;
            }

        });
    }
}

