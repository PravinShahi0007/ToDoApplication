function DocReadyCus() {
    //setHdrSectionPropFun();
    LoadDropDown();
    Tooltip();
    SelectText();
    LoadDatePicker();
    LoadSalaryDetailsGrid();
    var todayDate = new Date();
    $("#HdrSec1_DatPicAssetFromDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatPicPhoneFromDate_Val").data("kendoDatePicker").value(todayDate);

    $("#IsActive").change(function () {
        if ($('#IsActive').is(":checked")) {
            $("#resign").hide();
        } else {
            $("#resign").show();
        }
    });
    $(document).keydown(function (e) {
        if (e.which === 32 && e.ctrlKey) {
            InsertToGrid();
        }
        else if (e.which === 90 && e.ctrlKey) {
            InsertToGrid();
        }
    });
    LoadAssetDetailGrid();
    LoadPhoneInternetDetailGrid();

    $("#tabstrip").data("kendoTabStrip").select(0);
}
function InsertToEarningGrid() {
    var grid = $("#SalaryDetailsGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var AllowenceType = $("#cmbAllowenceType").data("kendoComboBox").text();
    var AllowenceTypeKy = (!$("#cmbAllowenceType").data("kendoComboBox").value()) ? 1 : $("#cmbAllowenceType").data("kendoComboBox").value();
    var Allowance = $('#amount').val();
    var FromDate = $('#fromDate').val();
    var HiddenBasicAmount = $('#HiddenBasicSalary').val();
    var Remark = $('#Remark').val();

    grid.dataSource.insert(
        total,
        {
            SalAllowenceType: AllowenceType,
            SalAllowenceTypeKy: AllowenceTypeKy,
            SalAllowance: Allowance,
            SalFromDate: FromDate,
            HiddenBasicAmount: HiddenBasicAmount,
            SalRemark: Remark
        });
    clearfields();
}
function clearfields(){
    $('#amount').val('');
    $('#fromDate').val('');
    $('#Remark').val('')
    //$("#cmbAllowenceType").data("kendoComboBox").value(1);
    $("#cmbAllowenceType").data("kendoComboBox").text('');
    $("#cmbAllowenceType").data("kendoComboBox").text('');
}
function InsertToAssetGrid() {
    var grid = $("#AssetGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var AssetFromDate = $('#HdrSec1_DatPicAssetFromDate_Val').val();
    var AssetToDate = $('#HdrSec1_DatPicAssetToDate_Val').val();
    //var AssetType = $('#AssetTypeText').val();
    var AssetType = 'type';//$("#cmbType").data("kendoComboBox").text();
    var AssetTypeKy = 1;// (!$("#cmbType").data("kendoComboBox").value()) ? 1 : $("#cmbType").data("kendoComboBox").value();
    var AssetModel = $('#HdrSec2_InptAssetModel_Val').val();
    var AssetInventoryNo = $('#HdrSec2_InptAssetInventoryNo_Val').val();
    var AssetSerialNo = $('#HdrSec2_InptAssetSerialNo_Val').val();


    grid.dataSource.insert(
        total,
        {
            AssetFromDate: AssetFromDate,
            AssetToDate: AssetToDate,
            //AssetType : AssetType,
            AssetType: AssetType,
            AssetTypeKy: AssetTypeKy,
            AssetModel: AssetModel,
            AssetInventoryNo: AssetInventoryNo,
            AssetSerialNo: AssetSerialNo
        });
    clearAssetFields();
}
function clearAssetFields() {
    $('#HdrSec1_DatPicAssetFromDate_Val').val('');
    $('#HdrSec1_DatPicAssetToDate_Val').val('');
    $('#HdrSec2_InptAssetModel_Val').val('');
    $('#HdrSec2_InptAssetInventoryNo_Val').val('');
    $('#HdrSec2_InptAssetSerialNo_Val').val('');
}

function InsertToPhoneInternetGrid() {
    var grid = $("#PhoneInternetGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var PhoneFromDate = $('#HdrSec1_DatPicPhoneFromDate_Val').val();
    var PhoneToDate = $('#HdrSec1_DatPicPhoneToDate_Val').val();
    var PhoneModelNo = $('#HdrSec2_InptPhoneModelNo_Val').val();
    var PhoneSimNo = $('#HdrSec2_InptPhoneSIMNo_Val').val();
    var PhoneMobileAllowance = $('#HdrSec2_InptPhoneMobileAlw_Val').val();


    grid.dataSource.insert(
        total,
        {
            PhoneFromDate: PhoneFromDate,
            PhoneToDate: PhoneToDate,
            PhoneModelNo: PhoneModelNo,
            PhoneSimNo: PhoneSimNo,
            PhoneMobileAllowance: PhoneMobileAllowance
        });
    clearphonefields();
}
function clearphonefields() {
    $('#HdrSec1_DatPicPhoneFromDate_Val').val('');
    $('#HdrSec1_DatPicPhoneToDate_Val').val('');
    $('#HdrSec2_InptPhoneModelNo_Val').val('');
    $('#HdrSec2_InptPhoneSIMNo_Val').val('');
    $('#HdrSec2_InptPhoneMobileAlw_Val').val('');
}

function InsertToGrid() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    var tabId = '';
    var tab = tabstrip.select();
    tabIndx = tab.index();
    tabId = tab.attr("id");

    if (tabIndx == -1) {
        Alert("Something Wrong");
    }
    else if (tabId == 'HdrSec_TabEarningDet') {
        InsertToEarningGrid();
    }
    else if (tabId == 'HdrSec_TabAssetDet') {
        InsertToAssetGrid();
    }
    else if (tabId == 'HdrSec_TabPhoneInternetDet') {
        InsertToPhoneInternetGrid();
    }
    
}

function DeleteFunction() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    var tabId = '';
    var tab = tabstrip.select();
    tabIndx = tab.index();
    tabId = tab.attr("id");

    if (tabIndx == -1) {
        //Alert("Not Saved");
    }
    else if (tabId == 'HdrSec_TabEarningDet') {
        var grid = $("#SalaryDetailsGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());

        if (selectedItem == null) {
            alert('Please Select Something');
        } else {
            var EmpCdDtKy = selectedItem.EmpCdDtKy;
            if (confirm("Do you want to Delete " + "it" + "?") == true) {
                DeleteEarningDet(EmpCdDtKy);
            }
        }
    }
    else if (tabId == 'HdrSec_TabAssetDet') {
        var grid = $("#AssetGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());

        if (selectedItem == null) {
            alert('Please Select Something');
        } else {
            var EmpCdDtKy = selectedItem.EmpCdDtKy;
            if (confirm("Do you want to Delete " + "it" + "?") == true) {
                DeleteEarningDet(EmpCdDtKy);
            }
        }
    }
    else if (tabId == 'HdrSec_TabPhoneInternetDet') {
        var grid = $("#PhoneInternetGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());

        if (selectedItem == null) {
            alert('Please Select Something');
        } else {
            var EmpCdDtKy = selectedItem.EmpCdDtKy;
            if (confirm("Do you want to Delete " + "it" + "?") == true) {
                DeleteEarningDet(EmpCdDtKy);
            }
        }
    }
}

function SaveUpdate() {
    var EmpKy = $('#EmpKy').val();
    if (EmpKy > 10) {
        OPENLodingCommon('Saving...');
        var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        var tabIndx = -1;
        var tabId = '';
        var tab = tabstrip.select();
        tabIndx = tab.index();
        tabId = tab.attr("id");

        if (tabIndx == -1) {
            Alert("Not Saved");
        }
        else if (tabId == 'HdrSec_TabEarningDet') {
            SaveEarningDet();
        }
        else if (tabId == 'HdrSec_TabAssetDet') {
            SaveAssetDet();
        }
        else if (tabId == 'HdrSec_TabPhoneInternetDet') {
            SavePhoneInternetDet();
        }
    }
    else {
        alert("Please Select An Employee!")
    }
}
function GetBnkMas_LookupWeb(brn) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlHRISGetBnkMas_LookupWeb,
                  data: { BnkKy: brn },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
function LoadDropDown() {
    $("#cmbAllowenceType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Alw'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbAllowenceType");
        },
        suggest: true,
        placeholder: "Select a Allowence Type"
    });
    $("#cmbBankName").kendoComboBox({
        dataValueField: "BnkKy",
        dataTextField: "BnkNm",
        dataSource: GetBnkMas_LookupWeb(1),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbBankName");
            if (validation) {
                var BnkKy = $("#cmbBankName").data("kendoComboBox").value();
                BrnSelect(BnkKy);
            }
        },
        suggest: true,
        placeholder: "Select Bank"
    });
    $("#cmbBrnName").kendoComboBox({
        dataValueField: "BrnKy",
        dataTextField: "BrnNm",
        dataSource: GetBnkMas_LookupWeb(1),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbBrnName");
        },
        suggest: true,
        placeholder: "Select Bank Branch"
    });
}

function BrnSelect(BnkKy) {
    $("#cmbBrnName").kendoComboBox({
        dataValueField: "BrnKy",
        dataTextField: "BrnNm",
        dataSource: GetBnkMas_LookupWeb(BnkKy),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbBrnName");
        },
        suggest: true,
        placeholder: "Select Bank Branch"
    });
}

//function ComboValidations(cmbNm) {

//    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
//    var val = cmb.value();

//    if (isNaN(val)) {
//        alert("'" + val + "' is not a Valid input");
//        $("#" + cmbNm + "").data('kendoComboBox').value("");
//        return false;
//    } else {
//        return true;
//    }
//}


function LoadDatePicker() {

    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#BasicfromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#HdrSec1_DatPicAssetFromDate_Val").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#HdrSec1_DatPicAssetToDate_Val").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#HdrSec1_DatPicPhoneFromDate_Val").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#HdrSec1_DatPicPhoneToDate_Val").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function AfterFindEmp(EmpKy) {
    clearfields();
    clearAssetFields();
    clearphonefields();
    $.ajax({
        url: UrlGet.GetSalaryDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data[0] != undefined) {
                // heder
                //$('#HdrSec1_InptEmpNm_Val').val(data[0].EmpNm);
                $('#HdrSec1_InptEmpNm_Val').val(data[0].NameInInitial);
                $('#HdrSec1_InptEmpNo_Val').val(data[0].EmpNo);
                $('#HdrSec2_InptEpfNo_Val').val(data[0].EpfNo);

                //$("#HdrSec2_CmbDept_Nm").data("kendoComboBox").value(data[0].DepartmentKy);
                //$("#HdrSec2_CmbDept_Nm").data("kendoComboBox").text(data[0].Department);

                //$("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").value(data[0].LocationKy);
                //$("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").text(data[0].Location);

                //$("#HdrSec3_CmbCom_Nm").data("kendoComboBox").value(data[0].CompanyKy);
                //$("#HdrSec3_CmbCom_Nm").data("kendoComboBox").text(data[0].Company);

                //$("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").value(data[0].DesignationKy);
                //$("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").text(data[0].Designation);

                //$("#HdrSec4_CmbNature_Nm").data("kendoComboBox").value(data[0].NatureOfEmploymentKy);
                //$("#HdrSec4_CmbNature_Nm").data("kendoComboBox").text(data[0].NatureOfEmployment);

                if (data[0].DepartmentKy > 10) {
                    $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").value(data[0].DepartmentKy);
                    $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").text(data[0].Department);
                }
                else {
                    $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").text('');
                }

                if (data[0].LocationKy > 10) {
                    $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").value(data[0].LocationKy);
                    $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").text(data[0].Location);
                }
                else {
                    $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").text('');
                }

                if (data[0].CompanyKy > 10) {
                    $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").value(data[0].CompanyKy);
                    $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").text(data[0].Company);
                }
                else {
                    $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").text('');
                }

                if (data[0].DesignationKy > 10) {
                    $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").value(data[0].DesignationKy);
                    $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").text(data[0].Designation);
                }
                else {
                    $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").text('');
                }

                if (data[0].NatureOfEmploymentKy > 10) {
                    $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").value(data[0].NatureOfEmploymentKy);
                    $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").text(data[0].NatureOfEmployment);
                }
                else {
                    $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").text('');
                }
                $('#joinDate_Hdr').val(data[0].JoinDate);


                //salary
                //alert(data[0].SalBasicAmount)
                var Val = 0;
                if (data[0].SalBasicAmount != null) {
                    Val = parseFloat(data[0].SalBasicAmount);
                }
                //alert(Val);
                Number.prototype.format = function (n, x) {
                    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
                    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
                };
                //alert(Val.format(2));

                $('#basicSalary').val(Val.format(2));//data[0].SalBasicAmount);
                $('#BasicfromDate').val(data[0].SalBasicfromDate);
                $('#HiddenBasicSalary').val(data[0].SalBasicAmount);
                $('#Reimbursements').val(data[0].SalReimbursements);
                $('#accountCode').val(data[0].SalAccountCode);

                
                if (data[0].SalBankNameKy > 1) {
                    $("#cmbBankName").data("kendoComboBox").value(data[0].SalBankNameKy);
                    $("#cmbBankName").data("kendoComboBox").text(data[0].SalBankName);
                }
                else {
                    $("#cmbBankName").data("kendoComboBox").text('');
                }

                $("#cmbBankName").data("kendoComboBox").trigger("change");
                BrnSelect(data[0].SalBankNameKy);

                if (data[0].SalBrnNameKy > 1) {
                    $("#cmbBrnName").data("kendoComboBox").value(data[0].SalBrnNameKy);
                    $("#cmbBrnName").data("kendoComboBox").text(data[0].SalBrnName);
                }
                else {
                    $("#cmbBrnName").data("kendoComboBox").text('');
                }

                if (data[0].SalIsOTBata == 1) {
                    $('#IsOTBata').attr('checked', true);
                }
                else {
                    $('#IsOTBata').attr('checked', false);
                }
                if (data[0].SalIsBonus == 1) {
                    $('#IsBonus').attr('checked', true);
                }
                else {
                    $('#IsBonus').attr('checked', false);
                }

                ClearGriddetails("SalaryDetailsGrid");
                ClearGriddetails("AssetGrid");
                ClearGriddetails("PhoneInternetGrid");
                
                if (data[0].SalaryAllowanceDet != null) {
                    $("#SalaryDetailsGrid").data("kendoGrid").dataSource.data(data[0].SalaryAllowanceDet);
                }
                if (data[0].AssetDet != null) {
                    $("#AssetGrid").data("kendoGrid").dataSource.data(data[0].AssetDet);
                }
                if (data[0].PhoneDet != null) {
                    $("#PhoneInternetGrid").data("kendoGrid").dataSource.data(data[0].PhoneDet);
                }
            }
        },
        error: function (e) {
            return false;
        }
    });
}


function ClearGriddetails(GridId) {
    var grid = $("#"+GridId+"").data("kendoGrid");
    grid.dataSource.data([]);
}
