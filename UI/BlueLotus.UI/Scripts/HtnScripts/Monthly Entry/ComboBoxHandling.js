
var Entdate = ""; 
alert(Entdate);
function LoadCombo() {

    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
    function imageIsLoaded(e) {
        $('#myImg').attr('src', e.target.result);

    };

    $("#HdrSec1_CmbEmpNo_cd").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNo",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox");
            var EmpNo = cmb.value();

            Entdate = $('#HdrSec2_DatPicDate_Val').val();

            MonthlyAdditionEntry(EmpNo, Entdate);
            MonthlyDeductionEntry(EmpNo, Entdate);

            if (EmpNo != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpNo_cd");

                if (validate) {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(EmpNo);


                } else {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee EmpNo"
    })
    $("#HdrSec1_CmbEmpNm_Nm").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox");
            var EmpNm = cmb.value();

            Entdate = $('#HdrSec2_DatPicDate_Val').val();

            MonthlyAdditionEntry(EmpNm, Entdate);
            MonthlyDeductionEntry(EmpNm, Entdate);

            if (EmpNm != "") {
                
                var validate = ComboValidations("HdrSec1_CmbEmpNm_Nm");
               
                if (validate) {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value(EmpNm);


                } else {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee Name"
    })

    $("#HdrSec2_DatPicDate_Val").width(200).kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009),
        placeholder: "Enter Month"
    });

    $("#HdrSec3_CmbAddTyp_cd").width(200).kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Alw'),
        filter: "contains",
        suggest: true,
        placeholder: "Select Addition Type"
    });
  
    $("#HdrSec4_InptAmt_Val").width(200).kendoNumericTextBox({
        placeholder: "Enter Ammount"
    });
    $("#HdrSec5_CmbDedTyp_cd").width(200).kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Deduct'),
        filter: "contains",
        suggest: true,
        placeholder: "Select Deduction Type"
    });

    $("#HdrSec6_InptAmtDed_Val").width(200).kendoNumericTextBox({
        placeholder: "Enter Ammount"
    });

    function ComboValidations(cmbNm) {

        var cmb = $("#" + cmbNm + "").data("kendoComboBox");
        var val = cmb.value();

        if (isNaN(val)) {
            alert("'" + val + "' is not a Valid input");
            $("#" + cmbNm + "").data('kendoComboBox').value("");
            return false;
        } else {
            return true;
        }
    }
}

function GetCdMas_LookupWeb(ConCd) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlHRISEmployeeGetCdMas_LookupWeb,
                  data: { ConCd: ConCd },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
