
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    DevicePortNo:'',
    DeviceIP: '',
    DeviceID: '',
    Model: '',
}

$(document).ready(function () {
    GetFormObjData();

});


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

    LoadCombo();
    //LoadDatePickers();

    //var delay_millis = 3000;

    ////will alert once, at least half a second after the call to setTimeout
    //var onceHandle = window.setTimeout(function () {
    //    alert("Time has passed!");
    //}, delay_millis);

    //will alert again and again
    //var repeatHandle = window.setInterval(function () {
    //    alert("Am I annoying you yet?");
    //}, delay_millis);

}

function LoadCombo() {

    $("#HdrSec1_CmbDevID_Cd").kendoComboBox({
        dataValueField: "DeviceKy",
        dataTextField: "DeviceID",
        dataSource: Device_SelectWeb_Datasource(),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbDevID_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (val != "") {
                var validate = ComboValidations("HdrSec1_CmbDevID_Cd");
                if (validate) {
                    $("#HdrSec1_CmbDevID_Nm").data("kendoComboBox").value(val);

                    var selectedObject = $("#HdrSec1_CmbDevID_Cd").data("kendoComboBox").dataItem($("#HdrSec1_CmbDevID_Cd").data("kendoComboBox").select());
                    
                    FormGlblData.DevicePortNo = selectedObject.DevicePortNo;
                    FormGlblData.DeviceID = selectedObject.DeviceID;
                    FormGlblData.DeviceIP = selectedObject.DeviceIP;
                    FormGlblData.Model = selectedObject.Model;
                        

                } else {
                    $("#HdrSec1_CmbDevID_Nm").data("kendoComboBox").value(null);
                    $("#HdrSec1_CmbDevID_Cd").data("kendoComboBox").value(null);
                    FormGlblData.DevicePortNo = "";
                    FormGlblData.DeviceIP = "";
                    FormGlblData.DeviceID = "";
                    FormGlblData.Model = "";
                }
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select ..."
    });


    $("#HdrSec1_CmbDevID_Nm").width(200).kendoComboBox({
        dataValueField: "DeviceKy",
        dataTextField: "DeviceNm",
        dataSource: Device_SelectWeb_Datasource(),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbDevID_Nm").data("kendoComboBox");
            var val = cmb.value();

            if (val != "") {
                var validate = ComboValidations("HdrSec1_CmbDevID_Nm");
                if (validate) {
                    $("#HdrSec1_CmbDevID_Cd").data("kendoComboBox").value(val);

                    var selectedObject = $("#HdrSec1_CmbDevID_Nm").data("kendoComboBox").dataItem($("#HdrSec1_CmbDevID_Nm").data("kendoComboBox").select());

                    FormGlblData.DevicePortNo = selectedObject.DevicePortNo;
                    FormGlblData.DeviceID = selectedObject.DeviceID;
                    FormGlblData.DeviceIP = selectedObject.DeviceIP;
                    FormGlblData.Model = selectedObject.Model;

                } else {
                    $("#HdrSec1_CmbDevID_Nm").data("kendoComboBox").value(null);
                    $("#HdrSec1_CmbDevID_Cd").data("kendoComboBox").value(null);
                    FormGlblData.DevicePortNo = "";
                    FormGlblData.DeviceIP = "";
                    FormGlblData.Model = "";
                    FormGlblData.DeviceID = "";
                }
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select ..."
    });

}

function Device_SelectWeb_Datasource() {

   
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlDevice_SelectWeb,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}


function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();
    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").input.focus();
        return false;
    } else {
        return true;
    }
}

function LoadDatePickers() {
    $("#HdrPart_FrmDate")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    $("#HdrPart_ToDate")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

   
    var FrmDt = new Date(new Date().setDate(new Date().getDate() - 31));
    var ToDt = new Date();
    $("#HdrPart_FrmDate").data("kendoDatePicker").value(FrmDt);
    $("#HdrPart_ToDate").data("kendoDatePicker").value(ToDt);
}


//function ConnectAttn()
//{
//    //OPENLodingCommon('Downloading...');

//    var DN = 1;
//    var Model = "ZDC2911";
//    var ConnectionModel = 5;
//    var IpAddress = "192.168.8.199";
//    var IpPort = 5500;
    

//    $.ajax({
//        url: urlConnecttoDevice,
//        data: {
//            DN: DN,
//            Model: Model,
//            ConnectionModel: ConnectionModel,
//            IpAddress: IpAddress,
//            IpPort: IpPort,

//        },
//        contentType: 'application/json; charset=utf-8',
//        dataType: "Json",
//        success: function (data) {
//            if (data >0) {
//                //CLOSELoadingCommon();
//                alert('Connection Succesfull..');
//                $('#DownloadAttendence').prop('disabled', false);
//            }
//            else {
//                //CLOSELoadingCommon();
//                alert('Connection Failed..');
//            }

//        },
//        error: function (e) {
//            //CLOSELoadingCommon();
//            return false;
//            alert('Connection Failed..'); 
//        }
//    });
//}


function DownloadAttendence() {
    OPENLodingCommon('Downloading...');

    //var DN = 1;
    var DN = FormGlblData.DeviceID;
    //var Model = "ZDC2911";
    var Model = FormGlblData.Model;
    var ConnectionModel = 5;
    //var IpAddress = "192.168.8.198";
    var IpAddress = FormGlblData.DeviceIP;
    //var IpPort = 5500; 
    var IpPort = FormGlblData.DevicePortNo;

    var FrmDt = "1";
    var ToDt = "1";

    if (Model == "iFace303")
    {
        $.ajax({
            url: urlDownloadFaceAttendence,
            data: {
                
                IpAddress: IpAddress,
                IpPort: IpPort
                
            },
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            success: function (data) {
                if (data > 0) {
                    CLOSELoadingCommon();
                    alert('Download Succesfull..');
                }
                else {
                    CLOSELoadingCommon();
                    alert('Download Failed..');
                }

            },
            error: function (e) {
                CLOSELoadingCommon();
                return false;
                alert('Download Failed..');
            }
        });
    }
    else {

        $.ajax({
            url: urlDownloadAttendence,
            data: {
                DN: DN,
                Model: Model,
                ConnectionModel: ConnectionModel,
                IpAddress: IpAddress,
                IpPort: IpPort,
                FrmDt: FrmDt,
                ToDt: ToDt,
            },
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            success: function (data) {
                if (data > 0) {
                    CLOSELoadingCommon();
                    alert('Download Succesfull..');
                }
                else {
                    CLOSELoadingCommon();
                    alert('Download Failed..');
                }

            },
            error: function (e) {
                CLOSELoadingCommon();
                return false;
                alert('Download Failed..');
            }
        });
    }
}