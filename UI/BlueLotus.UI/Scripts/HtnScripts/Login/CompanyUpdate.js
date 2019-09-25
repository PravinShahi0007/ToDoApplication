
$(document).ready(function () {
    $("#FYSD").width(200).kendoDatePicker({
        format: "yyyy/MM/dd",
    });
    $("#FYSD").closest("span.k-datepicker").width(200);

    $("#TCD").width(200).kendoDatePicker({
        format: "yyyy/MM/dd",
    });
    $("#TCD").closest("span.k-datepicker").width(200);
    

    $.ajax({
        url: URLGetCompanyDetails,
        //data: JSON.stringify({

        //}),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {

            if (data.length > 0) {

                $("#CCd").val(data[0].CCd);
                $("#CName").val(data[0].CNm);
                $("#Addrs").val(data[0].Address);
                $("#Town").val(data[0].Town);
                $("#City").val(data[0].City);
                $("#Cntry").val(data[0].Country);
                $("#Tel1").val(data[0].TP1);
                $("#Tel2").val(data[0].TP2);
                $("#Tel3").val(data[0].TP3);
                $("#Fax").val(data[0].Fax);
                $("#Email").val(data[0].EMail);
                $("#Web").val(data[0].WebSite);
                $("#taxno").val(data[0].TaxNo);
                $('#FYSD').data("kendoDatePicker").value(data[0].TrnStDt);
                $('#TCD').data("kendoDatePicker").value(data[0].TrnCnfDt);
                $("#Remark").val(data[0].CRem);
                //$("#EPFReg").val(data[0].TP3);

                $('#MultiProject').prop('checked', data[0].isMultPrj);
                $('#Alert').prop('checked', data[0].isAlert);
                $('#MultiBU').prop('checked', data[0].isMultBU);
                $('#MonthlyDepreciation').prop('checked', data[0].isMonthlyDep);
                $('#MultiLocation').prop('checked', data[0].isMultLoc);
                $('#PartNo').prop('checked', data[0].isPartNo);
                $('#MultiCurrency').prop('checked', data[0].isMultCrn);
                $('#isactive').prop('checked', data[0].isAct);



            } else {

            }
        },
        error: function (e) {
            return false;
        }
    });


});


$(document.body).keydown(function (e) {

    if (e.ctrlKey && e.keyCode == 70) {
        ToggleDivs();
        e.preventDefault();

        //$("#UpdateForm").show().kendoWindow({
        //    width: "1000px",
        //    height: "550px",
        //    modal: true,
        //    title: "Find"
        //});
        //$('#UpdateForm').data('kendoWindow').center().open();

    }

});

function UpdateCompany() {
    var code = $("#CCd").val();
    var cname = $("#CName").val();
    var Address = $("#Addrs").val();
    var Town = $("#Town").val();
    var City = $("#City").val();
    var country = $("#Cntry").val();
    var Tel1 = $("#Tel1").val();
    var Tel2 = $("#Tel2").val();
    var Tel3 = $("#Tel3").val();
    var Fax = $("#Fax").val();
    var Email = $("#Email").val();
    var Tax = $("#taxno").val(); 
    var Web = $("#Web").val();
    var moto = $("#Moto").val();
    var FYSD = $("#FYSD").val();
    var TCD = $("#TCD").val();
    var Remark = $("#Remark").val();

    if ($('#MultiProject').is(":checked")) {
        var MultiProject = 1;
    }
    else MultiProject = 0;

    if ($('#Alert').is(":checked")) {
        var Alert = 1;
    }
    else Alert = 0;

    if ($('#MultiBU').is(":checked")) {
        var MultiBU = 1;
    }
    else MultiBU = 0;

    if ($('#MonthlyDepreciation').is(":checked")) {
        var MonthlyDepreciation = 1;
    }
    else MonthlyDepreciation = 0;

    if ($('#MultiLocation').is(":checked")) {
        var MultiLocation = 1;
    }
    else MultiLocation = 0;

    if ($('#PartNo').is(":checked")) {
        var PartNo = 1;
    }
    else PartNo = 0;

    if ($('#MultiCurrency').is(":checked")) {
        var MultiCurrency = 1;
    }
    else MultiCurrency = 0;

    if ($('#isactive').is(":checked")) {
        var isAct = 1;
    }
    else isAct = 0;

    var EPFRegNo = $("#EPFReg").val();



    $.ajax({
        url: URLUpdateCompanyDetails,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({

            ObjKy: viewBag.ObjKy,
            code: code,
            cname: cname,
            Address: Address,
            Town: Town,
            City: City,
            country: country,
            Tel1: Tel1,
            Tel2: Tel2,
            Tel3: Tel3,
            Fax: Fax,
            Email: Email,
            Tax: Tax,
            Web: Web,
            moto: moto,
            FYSD: FYSD,
            TCD: TCD,
            Remark: Remark,
            MultiProject: MultiProject,
            Alert: Alert,
            MultiBU: MultiBU,
            MonthlyDepreciation: MonthlyDepreciation,
            MultiLocation: MultiLocation,
            PartNo: PartNo,
            MultiCurrency: MultiCurrency,
            isAct: isAct,
            EPFRegNo: EPFRegNo

        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            alert("Successfully Updated!");
        }
    });
}

$('#isactive').on('change', function () {
    this.value = this.checked ? 1 : 0;
    // alert(this.value);
}).change();

$('#MultiCurrency').on('change', function () {
    this.value = this.checked ? 1 : 0;
    // alert(this.value);
}).change();

$('#PartNo').on('change', function () {
    this.value = this.checked ? 1 : 0;
    // alert(this.value);
}).change();

$('#MultiLocation').on('change', function () {
    this.value = this.checked ? 1 : 0;
    // alert(this.value);
}).change();

$('#MonthlyDepreciation').on('change', function () {
    this.value = this.checked ? 1 : 0;
    // alert(this.value);
}).change();

$('#MultiBU').on('change', function () {
    this.value = this.checked ? 1 : 0;
    // alert(this.value);
}).change();

$('#Alert').on('change', function () {
    this.value = this.checked ? 1 : 0;
    // alert(this.value);
}).change();

$('#MultiProject').on('change', function () {
    this.value = this.checked ? 1 : 0;
    // alert(this.value);
}).change();


//function ToggleDivs() {


//    $.ajax({
//        url: URLGetCompanyDetails,
//        //data: JSON.stringify({

//        //}),
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        type: "POST",
//        success: function (data) {

//            if (data == true) {

//            } else {

//            }
//        },
//        error: function (e) {
//            return false;
//        }
//    });


//    var width = ($(window).width());
//    var $NewForm = $("#NewForm");
//    $NewForm.animate({
//        left: width
//    });
//    if ($NewForm.position().left > 200)
//    {
//        $("#NewForm").hide();
//        $('#NewForm').css('margin-left', '0px');
//        $('#NewForm').css('margin-top', '0px');
//    }

//    var $UpdateForm = $("#UpdateForm");
//    $UpdateForm.show();
//    $UpdateForm.animate({
//        left: width/5
//    });
//}
//function CancelUpdate()
//{
//    var width = ($(window).width());
//    //$('#NewForm').css('margin-left', '0px');
//    //$('#NewForm').css('margin-top', '0px');

//    //$("#NewForm").style["margin-left"] = "0px";
//    //$("#NewForm").style["margin-top"] = "0px";

//    var $UpdateForm = $("#UpdateForm");
//    $UpdateForm.animate({
//        left: width
//    });
//    if ($UpdateForm.position().left > 200) {
//        $("#UpdateForm").hide();
//        $('#UpdateForm').css('margin-left', '0px');
//        $('#UpdateForm').css('margin-top', '0px');
//    }

//    var $NewForm = $("#NewForm");
//    $NewForm.show();
//    $NewForm.animate({
//        left: width / 5
//    });
//}