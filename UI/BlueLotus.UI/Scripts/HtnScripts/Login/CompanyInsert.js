
    $(document).ready(function () {

        $("#CCd").focus();
        LoadCombo();
        //var $UpdateForm = $("#UpdateForm");
        //$UpdateForm.position().left = 0;        

        //  LoadGrid();
    });

$("#CCd").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#CNm").focus();
    }
});

$("#CNm").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#Addrs").focus();
    }
});
$("#Addrs").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#Town").focus();
    }
});
$("#Town").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#City").focus();
    }
});
$("#City").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#Cntry").focus();
    }
});
$("#Cntry").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#TP1").focus();
    }
});

$("#TP1").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#TP2").focus();
    }
});
$("#TP2").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#Email").focus();
    }
});


function LoadCombo() {
    
    $("#cmbCompany").kendoComboBox({
        dataValueField: "CKy",
        dataTextField: "CNm",
        dataSource: {
            type: "POST",
            transport: {
                read: urlLogin.URLCompanyLoad,
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Company"
    });

    $("#cmbParentCompany").kendoComboBox({
        dataValueField: "CKy",
        dataTextField: "CNm",
        dataSource: {
            type: "POST",
            transport: {
                read: urlLogin.URLCompanyLoad,
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Company"
    });
  
}

function GetCompany_LookUpWebs() {
    //alert(1);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlLogin.GetCompany_LookUpWeb,
                  dataType: "json"
              }
          }
      });
   // alert(2);
    return dataSource;
}

function Insert() {
   
    var CCd = $("#CCd").val();
    var CNm = $("#CName").val();
    var Address = $("#Addrs").val();
    var Town= $("#Town").val();
    var City = $("#City").val();
    var Country = $("#Cntry").val();
    var TP1 = $("#Tel1").val();
    var TP2 = $("#Tel2").val();
    var Email = $("#Email").val();
    var SelectCompany = ($("#cmbCompany").data("kendoComboBox").value()) ? $("#cmbCompany").data("kendoComboBox").value() : 1;
    var parentCompany = ($("#cmbParentCompany").data("kendoComboBox").value()) ? $("#cmbParentCompany").data("kendoComboBox").value() : 1;

    var isBnkBrch;
    if ($('#Is Bank Branch').is(":checked")) {
        isBnkBrch = 1;
    } else {
        isBnkBrch = 0;
    }
    //alert(SelectCompany);
    $.ajax({
        url: urlLogin.Login, 
        data: JSON.stringify({

            CCd: CCd,
            CNM: CNm,
            Address: Address,
            Town: Town,
            City: City,
            Country: Country,
            TP1: TP1,
            TP2: TP2,
            Email: Email,
            FrmCKy: SelectCompany,
            PrntCKy:parentCompany,
            isBnkBrch: isBnkBrch

        }),
    contentType: 'application/json; charset=utf-8',
    dataType: "Json",
    type: "POST",
    success: function (data) {
        alert("successfully Saved!");

        $("#CCd").val(null);
        $("#CName").val(null);
        $("#Addrs").val(null);
        $("#Town").val(null);
        $("#City").val(null);
        $("#Cntry").val(null);
        $("#Tel1").val(null);
        $("#Tel2").val(null);
        $("#Email").val(null);
        $("#cmbCompany").data("kendoComboBox").value("");
        $("#cmbParentCompany").data("kendoComboBox").value("");

        if (isBnkBrch == 1)
        {
            $("#Is Bank Branch").prop("checked", true);
        } else {
            $("#Is Bank Branch").prop("checked", false);
        }
    },
    error: function (e) {
        return false;
    }
});
 

}

function Cancel() {


    $("#CCd").val(null);
    $("#CName").val(null);
    $("#Addrs").val(null);
    $("#Town").val(null);
    $("#City").val(null);
    $("#Cntry").val(null);
    $("#Tel1").val(null);
    $("#Tel2").val(null);
    $("#Email").val(null);
    $("#Is Bank Branch").prop("checked", false);
}
