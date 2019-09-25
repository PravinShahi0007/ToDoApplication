
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



    $("#HdrSec1_CmbEmpNo_Cd").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNo",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNo_Cd").data('kendoComboBox');
            var EmpNo = cmb.value();
            LoadOTGrid(EmpNo);

            if (EmpNo != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpNo_Cd");

                if (validate) {
                    $("#HdrSec1_CmbEmpNm_Cd").data('kendoComboBox').value(EmpNo);
                   

                } else {
                    $("#HdrSec1_CmbEmpNm_Cd").data('kendoComboBox').value("");
                   
                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee No"
    })
    $("#HdrSec1_CmbEmpNm_Cd").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNm_Cd").data('kendoComboBox');
            var EmpNm = cmb.value();
            LoadOTGrid(EmpNm);

            if (EmpNm != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpNm_Cd");

                if (validate) {
                    $("#HdrSec1_CmbEmpNo_Cd").data('kendoComboBox').value(EmpNm);


                } else {
                    $("#HdrSec1_CmbEmpNo_Cd").data('kendoComboBox').value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee Name"
    })


    $("#HdrSec1_CmbOTTyp_Cd").width(200).kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('OTRate'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbOTTyp_Cd").data('kendoComboBox');
            var OTRate = cmb.value();

            if (OTRate != "") {
                var validate = ComboValidations("HdrSec1_CmbOTTyp_Cd");

                if (validate) {
                    $("#OT").data('kendoComboBox').value(OTRate);


                } else {
                    $("#OT").data('kendoComboBox').value("");

                }
            }
        },


        filter: "contains",
        suggest: true,
        placeholder: "Select OT Type"
    });

    $("#OT").width(200).kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "CdNo1",
        dataSource: GetCdMas_LookupWeb('OTRate'),

       

        filter: "contains",
        suggest: true,
        placeholder: "Select OT Rate"
    });

      

}


function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data('kendoComboBox');
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


//﻿
//function LoadCombo() {

//    $(":file").change(function () {
//        if (this.files && this.files[0]) {
//            var reader = new FileReader();
//            reader.onload = imageIsLoaded;
//            reader.readAsDataURL(this.files[0]);
//        }
//    });
//    function imageIsLoaded(e) {
//        $('#myImg').attr('src', e.target.result);

//    };



//    $("#HdrSec1_CmbEmpNo_Cd").width(200).kendoComboBox({

//        dataValueField: "EmpKy",
//        dataTextField: "EmpNo",

//        dataSource: {
//            type: "POST",
//            transport: {

//                read: urlEmpMas.Employee_LookUp_Web

//            }
//        },
//        change: function (e) {
//            var cmb = $("#HdrSec1_CmbEmpNo_Cd").data('kendoComboBox');
//            var EmpNo = cmb.value();

//            if (EmpNo != "") {
//                var validate = ComboValidations("EmpNo");

//                if (validate) {
//                    $("#HdrSec1_CmbEmpNm_Cd").data('kendoComboBox').value(EmpNo);
                   

//                } else {
//                    $("#HdrSec1_CmbEmpNm_Cd").data('kendoComboBox').value("");
                   
//                }
//            }

//        },
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select a EmpNo"
//    })
//    $("#HdrSec1_CmbEmpNm_Cd").width(200).kendoComboBox({

//        dataValueField: "EmpKy",
//        dataTextField: "EmpNm",

//        dataSource: {
//            type: "POST",
//            transport: {

//                read: urlEmpMas.Employee_LookUp_Web

//            }
//        },
//        change: function (e) {
//            var cmb = $("#HdrSec1_CmbEmpNm_Cd").data('kendoComboBox');
//            var EmpNm = cmb.value();

//            if (EmpNm != "") {
//                var validate = ComboValidations("EmpNm");

//                if (validate) {
//                    $("#HdrSec1_CmbEmpNo_Cd").data('kendoComboBox').value(EmpNm);


//                } else {
//                    $("#HdrSec1_CmbEmpNo_Cd").data('kendoComboBox').value("");

//                }
//            }

//        },
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select a Emp Name"
//    })


//    $("#HdrSec1_CmbOTTyp_Cd").width(200).kendoComboBox({

//        dataValueField: "CdKy",
//        dataTextField: "CdNm",
//        dataSource: GetCdMas_LookupWeb('OTRate'),
//        change: function (e) {

//            var cmb = $("#HdrSec1_CmbOTTyp_Cd").data('kendoComboBox');
//            var OTRate = cmb.value();

//            if (OTRate != "") {
//                var validate = ComboValidations("OTRate");

//                if (validate) {
//                    $("#OT").data('kendoComboBox').value(OTRate);


//                } else {
//                    $("#OT").data('kendoComboBox').value("");

//                }
//            }
//        },


//        filter: "contains",
//        suggest: true,
//        placeholder: "Select OT Rate"
//    });
//    $("#OT").width(200).kendoComboBox({

//        dataValueField: "CdKy",
//        dataTextField: "CdNo1",
//        dataSource: GetCdMas_LookupWeb('OTRate'),

       

//        filter: "contains",
//        suggest: true,
//        placeholder: "Select OT Rate"
//    });

    

//    $("#EntryMonth").kendoDatePicker({

//        format: "dd/MM/yyyy",
//        min: new Date(31, 2, 2009)
//    });
//}
//function ComboValidations(cmbNm) {

//    var cmb = $("#" + cmbNm + "").data('kendoComboBox');
//    var val = cmb.value();

//    if (isNaN(val)) {
//        alert("'" + val + "' is not a Valid input");
//        $("#" + cmbNm + "").data('kendoComboBox').value("");
//        return false;
//    } else {
//        return true;
//    }
//}
//function GetCdMas_LookupWeb(ConCd) {
//    var dataSource = new kendo.data.DataSource(
//      {
//          transport: {
//              read: {
//                  url: urlHRISEmployeeGetCdMas_LookupWeb,
//                  data: { ConCd: ConCd },
//                  dataType: "json"
//              }
//          }
//      });
//    return dataSource;
//}
