var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = "0" + dd;
}
if (mm < 10) {
    mm = "0" + mm;
}
var todayDate = dd + "/" + mm + "/" + yyyy;

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0,
    TimeStamp: "",
    IsRecState: -1,
    TempLiNumber: -1,
    TempBU: -1,
    TempPrj: -1,
    ISNeworUpdateTranction: 1,
    isAllowSaveByBackDate: 1,
    FromFindDate: todayDate,
    FromTrnKy: 1,
    OurCode2: null,
    AprStsLock: null,
    AprStsLockMsg: "",
    isAlwAcs: null,
    isAlwAdd: null,
    isAlwUpdate: null,
    isAlwDel: null,
    isAlwApr: null,
    PrjTypKy: 1,
    selectedIndex: 1,
};

$(document).ready(function () {
    OPENLodingForm();
    GetUserPermission(); // Get UserPermission Properties from DB.
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "TrnTyp",
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function (TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            // GetCdMasBy_CdKy(TrnTypKy);
            GetFormObjData();
            Button_From_Dynamic("ButtonSec1");
            Button_From_Dynamic("ButtonSec2");

        }
    });
});


function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    LoadComboDate();
    LoadDatePicker();
    GridDefaultColumns();
    setHdrSectionPropFun();
    LoadHdrAccount();
    setTimeout(function () {
        CLOSELoadingForm();
    },
        4000);
    FindGridDefaultColumns();
    ClearAll();
}

function LoadComboDate() {

    //Project Code Drop Bottom
    $("#HdrSec2_CmbPrj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjId",
            dataSource: PrjId_SelectMob_DataSource("HdrSec2_CmbPrj"), //ProjectCd('HdrSec2_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec2_CmbPrj_Cd");
                    if (validate) {
                        $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
                    } else {
                        $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Project"
        });
    //Project Name Drop Bottom
    $("#HdrSec2_CmbPrj_Nm")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjNm",
            dataSource: PrjNm_SelectMob_DataSource("HdrSec2_CmbPrj"), // ProjectNm('HdrSec2_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec2_CmbPrj_Nm");
                    if (validate) {
                        $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                    } else {
                        $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Project"
        });


    //Account Dropdown id
    $("#HdrSec2_CmbHdrAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: AccCd_SelectMob_Datasource("HdrSec2_CmbHdrAcc"), //AccountCodeDatasource('HdrSec2_CmbHdrAcc'),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                var validate = ComboValidations("HdrSec2_CmbHdrAcc_Cd");
                if (validate) {
                    $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value(AccKy);
                    GetAccountDetailByAccKy(AccKy);
                } else {
                    $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
                    GetAccountDetailByAccKy("1");
                }


            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Accounts.."
        });
    //Account Dropdown Name
    $("#HdrSec2_CmbHdrAcc_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNm",
            dataSource: AccNm_SelectMob_Datasource("HdrSec2_CmbHdrAcc"),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox");
                var AccKy = cmb.value();
                var validate = ComboValidations("HdrSec2_CmbHdrAcc_Cd");
                if (validate) {
                    $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value(AccKy);
                    GetAccountDetailByAccKy(AccKy);
                } else {
                    $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
                    GetAccountDetailByAccKy("1");
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Accounts.."
        });


    //Address Name Drop Bottom
    $("#HdrSec2_CmbHdrAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrID",
            dataSource: AdrID_SelectMob_DataSource("HdrSec2_CmbHdrAdr"),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec2_CmbHdrAdr_Cd");
                    if (validate) {
                        $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value(AdrKy);
                    } else {
                        $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Address"
        });


    //Address Name Drop Bottom
    $("#HdrSec2_CmbHdrAdr_Nm")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrNm", // AdrID_SelectMob_DataSource(ObjNm)
            dataSource: AdrNm_SelectMob_DataSource("HdrSec2_CmbHdrAdr"),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec2_CmbHdrAdr_Nm");
                    if (validate) {
                        $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value(AdrKy);
                    } else {
                        $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Address"
        });
    //

}

function LoadDatePicker() {
    $("#HdrSec1_DatVouDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
            // change: onVauDateChange
        });
    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
}

//DataSourses______________________________________________________________________________________
//____Project data source
//Updated the combo validation funciton to validate user data by charith
function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItem = cmb.dataItem();
    if (!dataItem) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {

        return true;
    }

}


function ClearAll() {

    document.getElementById("HdrSec1_InptVouNo_Val").value = "";
    document.getElementById("HdrSec1_InptDocNo_Val").value = "";
    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
    FormGlblData.TrnKy = 1;
    try {
        $("#SubConGrid").data("kendoGrid").dataSource.data([]);
        $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").enable(),
            $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").enable(),
            $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").enable(),
            $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").enable(),
            document.getElementById("HdrSec1_InptDocNo_Val").readOnly = false;

    } catch (e) {

    }
}

function ClearAllData() {

    ClearAll();
    try {
        $("#pager").data("kendoPager").dataSource.data([]);
    } catch (e) {

    }

}

function SaveUpdate() {

    //SaveSubCon(string TrnTypKy, string ObjKy,string DataJasonString, string TrnDt, string DocNo)
    var grid = $("#SubConGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var DocNo = document.getElementById("HdrSec1_InptDocNo_Val").value;
    var TrnDate = document.getElementById("HdrSec1_DatVouDate_Val").value;
    //var currentData = $("#SubConGrid").data("kendoGrid").dataSource.data();
    var adrKy = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value();
    var Accky = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value();
    if (!adrKy) {
        adrKy = 1;
    }
    var AllRecord = [];

    for (var i = 0; i < currentData.length; i++) {
        //if (currentData[i].isNew) {
            AllRecord.push(currentData[i].toJSON());
        //}
      
    }

    //    var TempTrnKy = FormGlblData.TrnKy;
    $.ajax({
        url: UrlSaveUpdate,
        data: JSON.stringify({
            TrnTypKy: FormGlblData.TrnTypKy,
            DataJasonString: kendo.stringify(AllRecord), //FormGlblData.TrnKy,
            TrnDt: TrnDate,
            DocNo: DocNo,
            ObjKy: viewBag.ObjKy,
            trnKy: FormGlblData.TrnKy,
            adrKy: adrKy,
            Accky:Accky
        }),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (TrnKy) {
            if (TrnKy > 1) {
                alert("Save Sucessfully");
                //ClearAll();
                FormGlblData.TrnKy = TrnKy;
                var prjky = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
                GetAlldata(TrnKy, Accky, prjky, adrKy, TrnDate);


            } else {
                alert("Please Try Again");

            }


        }
    });

}

function Load() {
    //var TrnKy = FormGlblData.TrnKy;
    //var TrnTypKy = FormGlblData.TrnTypKy;
    var AccKy = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value();
    if (!AccKy) {
        AccKy = 1;
    }
    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    if (!PrjKy) {
        PrjKy = 1;
    }
    var AdrKy = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value();
    if (!AdrKy) {
        AdrKy = 1;
    }
    var Dt = document.getElementById("HdrSec1_DatVouDate_Val").value;

    $.ajax({
        url: UrlLoadGrid,
        data: JSON.stringify({
            TrnTypKy: FormGlblData.TrnTypKy,
            Trnky: FormGlblData.TrnKy,
            AccKy: AccKy,
            PrjKy: PrjKy,
            ObjKy: viewBag.ObjKy,
            adrKy: AdrKy,
            Dt: Dt

        }),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length == 0) {
                alert("No Data To show");
            } else {
                var grid = $("#SubConGrid").data("kendoGrid"),
                    dataSource = new kendo.data.DataSource({
                        data: data
                    });
                grid.setDataSource(dataSource);
                $("#SubConGrid").data("kendoGrid").dataSource.read();
                $("#SubConGrid").data("kendoGrid").dataSource.pageSize(parseInt(10));
                $("#SubConGrid").data("kendoGrid").refresh();
            }


        }
    });

}

//Get Details By sending accountkey
function GetAccountDetailByAccKy(AccKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetAllDetail,
        data: JSON.stringify({
            AccKy: AccKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {

                var AdrKy = data[0].AdrKy;
                var AdrID = data[0].AdrID;
                var AdrNm = data[0].AdrNm;
                var CurncyCd = data[0].CurncyCd;
                var CurncyKy = data[0].CurncyKy;
                var CurncyNm = data[0].CurncyNm;
                var Rate = data[0].Rate;

                $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value(AdrKy);
                $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value(AdrKy);

            }

        },
        error: function (e) {
            return false;
        }
    });

}


function PrintSource() {

    var formOrdKy = FormGlblData.TrnKy;
    var formObjCaption = viewBag.ObjCaptn;
    var formObjKy = viewBag.ObjKy;
    // PrintTelericCommon(formOrdKy, formObjCaption, formObjKy);
    PrintCommon(formOrdKy, formObjCaption, formObjKy);
}