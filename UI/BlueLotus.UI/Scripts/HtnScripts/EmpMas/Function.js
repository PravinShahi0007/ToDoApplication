
function Add() {
    var visiblePaneId = $('div.tab-pane.active').attr('id')
    if (visiblePaneId == 'EmpOtherDetails') {
        InsertToGridEmpOthe();
    }
    else if (visiblePaneId == 'EmpAddtion') {
        InsertToGridEmpAdd();
    }
    else if (visiblePaneId == 'EmpDeduction') {
        InsertToGridEmpDed();
    }
}
function InsertToGridEmpDed() {
    var grid = $("#GridEmpDed").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var TypeD = $("#TypeD").data("kendoComboBox").text();
    var codeD = $("#codeD").data("kendoComboBox").text();
    var TypeDKy = $('#TypeD').val();
    var codeDKy = $('#codeD').val();
    var AmtDed = $('#AmtDed').val();
    var DateFD = $('#DateFD').val();
    var DateTD = $('#DateTD').val();

    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            TypeD: TypeD,
            codeD: codeD,
            TypeDKy: TypeDKy,
            codeDKy: codeDKy,
            DateFD: DateFD,
            DateTD: DateTD,
            AmtDed: AmtDed

        });
}
function InsertToGridEmpAdd() {
    var grid = $("#GridEmpAdd").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var TypeA = $("#TypeA").data("kendoComboBox").text();
    var codeA = $("#codeA").data("kendoComboBox").text();
    var TypeAKy = $('#TypeA').val();
    var codeAKy = $('#codeA').val();
    var AmtAdd = $('#AmtAdd').val();
    var DateFA = $('#DateFA').val();
    var DateTA = $('#DateTA').val();

    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            TypeA: TypeA,
            codeA: codeA,
            DateFA: DateFA,
            DateTA: DateTA,
            AmtAdd: AmtAdd,
            TypeAKy: TypeAKy,
            codeAKy: codeAKy

        });
}
function InsertToGridEmpOthe() {
    var grid1 = $("#GridEmpOthe").data("kendoGrid");
    var dataSource1 = grid1.dataSource;

    var total = dataSource1.data().length;

    var Type = $("#Type").data("kendoComboBox").text();
    var code = $("#code").data("kendoComboBox").text();
    var TypeKy = $('#Type').val();
    var codeKy = $('#code').val();
    var EDate = $('#EDate').val();
    var ToDate = $('#ToDate').val();

    grid1.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            Type: Type,
            code: code,
            TypeKy: TypeKy,
            codeKy: codeKy,
            EDate: EDate,
            ToDate: ToDate

        });
}



function EmpDetailClear() {

    document.getElementById("Street").value = "";
    document.getElementById("City").value = "";
    document.getElementById("State").value = "";
    document.getElementById("ZipCode").value = "";
    document.getElementById("Mobile").value = "";
    $("#Country").data("kendoComboBox").value("");
    document.getElementById("Tel-Gen1").value = "";
    document.getElementById("Tel-Gen2").value = "";
    document.getElementById("Fax").value = "";
    document.getElementById("Email").value = "";

    document.getElementById("EmployeeNm").value = "";
    document.getElementById("NIC").value = "";
    document.getElementById("EPFNO").value = "";
    $("#GenderFM").data("kendoComboBox").value("");
    $("#Ethnic").data("kendoComboBox").value("");
    $("#Religion").data("kendoComboBox").value("");
    var todayDate = new Date();
    $("#Date").data("kendoDatePicker").value(todayDate);
    document.getElementById("IsActive1").checked = false;
    document.getElementById("EmpNo").value = "";

    $("#EDate").data("kendoDatePicker").value("");
    document.getElementById("checkbox1").checked = false;
    $("#ToDate").data("kendoDatePicker").value("");
    $('#ToDate').data('kendoDatePicker').enable(false);
   
   
    $("#GridEmpOthe").data('kendoGrid').dataSource.data([]);

    $("#DateFA").data("kendoDatePicker").value("");
    document.getElementById("checkbox2").checked = false;
    $("#DateTA").data("kendoDatePicker").value("");
    $('#DateTA').data('kendoDatePicker').enable(false);
   
    $
    $("#AmtAdd").data("kendoNumericTextBox").value(0);
    $("#GridEmpAdd").data('kendoGrid').dataSource.data([]);

    $("#DateFD").data("kendoDatePicker").value("");
    document.getElementById("checkbox3").checked = false;
    $("#DateTD").data("kendoDatePicker").value("");
    $('#DateTD').data('kendoDatePicker').enable(false);
   
    $("#AmtDed").data("kendoNumericTextBox").value(0);
    $("#GridEmpDed").data('kendoGrid').dataSource.data([]);


    $("#Type").data("kendoComboBox").value("");
    $("#TypeA").data("kendoComboBox").value("");
    $("#TypeD").data("kendoComboBox").value("");
    $("#code").data("kendoComboBox").value("");
    ("#codeA").data("kendoComboBox").value("");

    $("#codeD").data("kendoComboBox").value("");
}

function AfterFindEmp(EmpKy) {
 

    LoadEmpDetails(EmpKy);
    LoadAddrsDetails(EmpKy);
    LoadEmpOtherDetails(EmpKy);
   LoadEmpAddtion(EmpKy);
    //LoadEmpDeduction(EmpKy);
    //$.ajax({
    //    url: UrlGetEmpFamilyDet,
    //    data: {
    //        EmpKy: EmpKy
    //    },
    //    dataType: "Json",
    //    type: "POST",
    //    success: function (data) {
    //        $("#familyDetailGrid").data("kendoGrid").dataSource.data(data);
    //    },
    //    error: function (e) {
    //        return false;
    //    }
    //});
}

function LoadEmpDetails(EmpKy1) {
    var EmpKy = EmpKy1;
    //alert(EmpKy);
    $.ajax({
        url: urlEmpMas.GetEmpDetails,
        //url:GetEmpDetails,
        data: JSON.stringify({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            EmpKy: EmpKy,
            }),
    contentType: 'application/json; charset=utf-8',
    dataType: "Json",
    type: "POST",
    success: function (data) {
        // $("#familyDetailGrid").data("kendoGrid").dataSource.data(data);
        for (i = 0; i < data.length; i++) {
            var EmpNm1 = data[0].EmpNm;
            document.getElementById("EmployeeNm").value = EmpNm1;
            document.getElementById("NIC").value = data[0].NIC;
            document.getElementById("EPFNO").value = data[0].EPFNo;
            $("#GenderFM").data("kendoComboBox").value(data[0].Sex);
            $("#Ethnic").data("kendoComboBox").value(data[0].EthGrpKy);
            $("#Religion").data("kendoComboBox").value(data[0].ReligionKy);
            $("#Date").data("kendoDatePicker").value(data[0].DtBirth);
            if (data[0].isAct == 1) {
                document.getElementById("IsActive1").checked = true;
            }
            else {
                document.getElementById("IsActive1").checked = false;
            }
                  
                    document.getElementById("EmpNo").value = data[0].EmpNo;

                }

               
            },
            error: function (e) {
                return false;
            }
        });
}
function LoadAddrsDetails(EmpKy) {
   
    //alert(EmpKy);
    $.ajax({
        url: urlEmpMas.GetAddrsDetails,
        //url:GetEmpDetails,
        data: JSON.stringify({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            EmpKy: EmpKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            // $("#familyDetailGrid").data("kendoGrid").dataSource.data(data);
            for (i = 0; i < data.length; i++) {

                document.getElementById("Street").value = data[0].Street;
                document.getElementById("City").value = data[0].City;
                document.getElementById("State").value = data[0].State;
                document.getElementById("ZipCode").value = data[0].ZipCd;
                document.getElementById("Mobile").value = data[0].TelGen1;
                $("#Country").data("kendoComboBox").value(data[0].Country);
                document.getElementById("Tel-Gen1").value = data[0].TelGen2;
                document.getElementById("Tel-Gen2").value = data[0].TelGen2;
                document.getElementById("Fax").value = data[0].Fax;
                document.getElementById("Email").value = data[0].Email;


            }

               
        },
        error: function (e) {
            return false;
        }
    });
}
function LoadEmpOtherDetails(EmpKy) {
    var GrpConCd = 'EmpTrn'
    $.ajax({
        url: urlEmpMas.GetOtherDetails,
        //url:GetEmpDetails,
        data: JSON.stringify({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            EmpKy: EmpKy,
            GrpConCd: GrpConCd,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            $("#GridEmpOthe").data("kendoGrid").dataSource.data(data);


        },
        error: function (e) {
            return false;
        }
    });
}
function LoadEmpAddtion(EmpKy) {
    var GrpConCd = 'EmpADWOLon'
    $.ajax({
        url: urlEmpMas.GetOtherDetails,
        //url:GetEmpDetails,
        data: JSON.stringify({
            EmpKy: EmpKy,
            GrpConCd: GrpConCd,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            $("#GridEmpAdd").data("kendoGrid").dataSource.data(data);


        },
        error: function (e) {
            return false;
        }
    });
}