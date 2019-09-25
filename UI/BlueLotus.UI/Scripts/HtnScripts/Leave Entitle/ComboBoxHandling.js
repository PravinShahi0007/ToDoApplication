
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    LiNo:1
}
$(document).ready(function () {

    GetFormObjData();

})

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;

            DocReadyCus();
        }
    });
}
function DocReadyCus() {
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
    clearDet();
    SetDatepicker();
    LoadLeaveEntitleGrid(1);
    // LoadGrid(1);
    // LoadTimePickers();
    //  LoadTaskCombo();
    //Button_From_Dynamic('ButtonSec1');
    function setHdrSectionPropFun() {

        // ---------- Set ObjProperties
        setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

        SetHandlingEnterKeyEvent('', viewBag.ObjKy);

    }
}

function SetDatepicker() {
    var todayDate = kendo.toString(kendo.parseDate(new Date()), 'dd/MM/yyyy');
    $("#FromD").data("kendoDatePicker").value(todayDate);
    $("#ToD").data("kendoDatePicker").value(todayDate);

}

function LoadCombo() {

    //$(":file").change(function () {
    //    if (this.files && this.files[0]) {
    //        var reader = new FileReader();
    //        reader.onload = imageIsLoaded;
    //        reader.readAsDataURL(this.files[0]);
    //    }
    //});
    //function imageIsLoaded(e) {
    //    $('#myImg').attr('src', e.target.result);

    //};

    //$("#RequestD").width(200).kendoDatePicker({

    //    format: "dd/MM/yyyy",
    //    min: new Date(31, 2, 2009)
    //});

    $("#FromD").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009)
    });

    $("#ToD").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009)
    });

    $("#EmpNo").kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNo",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

                }
            },
            change: function (e) {
                var cmb = $("#EmpNo").data("kendoComboBox");
                var EmpNo = cmb.value();

                if (EmpNo != "") {
                    var validate = ComboValidations("EmpNo");

                    if (validate) {
                        $("#EmpNm").data("kendoComboBox").value(EmpNo);
                        LoadLeaveEntitleGrid(EmpNo);
                    } else {
                        $("#EmpNm").data("kendoComboBox").value("");

                    }
                }
               
            
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a EmpNo"
        
        })



    $("#EmpNm").kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#EmpNm").data("kendoComboBox");
            var EmpNm = cmb.value();

            if (EmpNm != "") {
                var validate = ComboValidations("EmpNm");

                if (validate) {
                    $("#EmpNo").data("kendoComboBox").value(EmpNm);
                    LoadLeaveEntitleGrid(EmpNm);

                } else {
                    $("#EmpNo").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Emp Name"
    })

    $("#LeaveType").kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('LevTyp'),

        change: function (e) {
            var type = $("#LeaveType").data("kendoComboBox").text();
             //var EmpNo = cmb.value();

           // if (type == "Half Day") {
            //    $('#Firsthalf').attr('disabled', false);
              //  $('#Secondhalf').attr('disabled', false);


            //} else {

              //  $('#Firsthalf').attr('disabled', true);
               // $('#Secondhalf').attr('disabled', true);
            //}



        },

        filter: "contains",
        suggest: true,
        placeholder: "Select Leave Type"
    });
    $("#EntitlesD").kendoNumericTextBox({

        format: "#",
        decimals: 0,
        spinners : false
    }).value = 0;

}
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