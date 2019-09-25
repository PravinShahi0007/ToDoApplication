var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var todayDate = dd + '/' + mm + '/' + yyyy;

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
    grnTrnTypKy:1,

}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0,    // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    TrnMinDate: "", // Back date Transaction Purpose
    TrnMaxDate: ""  // Future Date Transaction Purpose
}

function GetCdMasBy_CdKy(CdKy) {
    $.ajax({
        url: urlCodes.GetCdMasBy_CdKy,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            CdKy: CdKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (CdMasModelData) {
            CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT = CdMasModelData.isCd27;
            CdMasModel.TrnMinDate = CdMasModelData.TrnMinDate;
            CdMasModel.TrnMaxDate = CdMasModelData.TrnMaxDate;

            GetFormObjData();
            Button_From_Dynamic('ButtonSec1');
            Button_From_Dynamic('ButtonSec2');

        }
    });
}

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
            //FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            //FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            //FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, 'ValidationOrder');
            DocReadyCus();
        }
    });
}

$(document).ready(function () {
    OPENLodingForm();
    // GetUserPermission(); 
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'Other',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
           GetCdMasBy_CdKy(TrnTypKy);
        }
    });
});


function GetGrnTrnTypKy() {
    
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'TrnTyp',
            OurCd: 'GRN'
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {
            FormGlblData.grnTrnTypKy = TrnTypKy;
        }
    });

}


function DocReadyCus() {
    GetGrnTrnTypKy();
    setTimeout(function () {
        CLOSELoadingForm();
        CheckUserPermission();
    }, 4000);
    FindGridDefaultColumns();//find Form
    LoadAfterOneMinuteFindInvoice();
    LoadInitialCombo();
    FindGridDefaultColumns();
    LoadNumericText();
    CallFindInvoive();
    Clear();
}


$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {
        e.preventDefault();
        try {
            $("#HdrGrd").data("kendoGrid").dataSource.data([]);
            $("#DetailGrd").data("kendoGrid").dataSource.data([]);
            Clear();

        } catch (e) {
           

        } 
        CallFindInvoive();
    }
});

function CallFindInvoive() {
    LoadAfterOneMinuteFindInvoice();
    $("#FindFormGRN").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "Find"
    });
    $('#FindFormGRN').data('kendoWindow').center().open();
    $("#OrdNoTo").focus();

}

function getSeclectedTrnKy() {
    
    var grid = $('#FindFormGridGRN').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    if (selectedItem != null) {
        var TrnKy = selectedItem.TrnKy;
        if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
            FormGlblData.TrnKy = TrnKy;
            GridDefaultColumns();
            GetItemListDetail();
            DetailDefaultColumns();
            $('#FindFormGRN').data('kendoWindow').close();
        } else {
            alert("please Select Any Trancsaction");
        }
    } else {
        alert("Please Reload the page");
    }

}

function GetItemListDetail() {
    $.ajax({
        url: urlFindInvoice.GetInvoiceItemsDetail,
        data: JSON.stringify({
            TrnTypKy: FormGlblData.grnTrnTypKy,
            ordKy: FormGlblData.TrnKy,
        }),
        dataType: "json",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == null) {
                alert("No Data Available");
            } else {

                var ItmCdCombo = $('#HdrSec1_CmbItem_Cd').data("kendoComboBox"),
                    dataSource = new kendo.data.DataSource({
                        data: data
                    });
                ItmCdCombo.setDataSource(dataSource);
                $("#HdrSec1_CmbItem_Cd").data("kendoComboBox").dataSource.read();
                $("#HdrSec1_CmbItem_Cd").data("kendoComboBox").refresh();


                var ItmNmCombo = $('#HdrSec1_CmbItem_Nm').data("kendoComboBox"),
                    dataSource = new kendo.data.DataSource({
                        data: data
                    });
                ItmNmCombo.setDataSource(dataSource);
                $("#HdrSec1_CmbItem_Nm").data("kendoComboBox").dataSource.read();
                $("#HdrSec1_CmbItem_Nm").data("kendoComboBox").refresh();

               
            }

        }
    });

}

function LoadInitialCombo() {
    

    $("#HdrSec1_CmbItem_Cd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
      //  dataSource: AccDoropCode("HdrSec1_CmbBank"),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbItem_Cd").data("kendoComboBox");
            var ItmKy = cmb.value();
            var object = this.dataItem(this.select());
            if (ItmKy != "") {
                var validate = ComboValidations("HdrSec1_CmbItem_Cd");
                if (validate) {
                    $("#HdrSec1_CmbItem_Cd").data("kendoComboBox").value(ItmKy);
                    $("#HdrSec1_CmbItem_Nm").data("kendoComboBox").value(ItmKy);
                    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(object.TrnQty);
                    $("#HdrSec1_NmricTrnAmt_Val").data("kendoNumericTextBox").value(object.TrnRate);
                    LoadDetailGrid(object.ItmTrnKy);
                } else {
                    $("#HdrSec1_CmbItem_Cd").data("kendoComboBox").value("");
                    $("#HdrSec1_CmbItem_Nm").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Item Code"
    });

    $("#HdrSec1_CmbItem_Nm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        //  dataSource: AccDoropCode("HdrSec1_CmbBank"),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbItem_Cd").data("kendoComboBox");
            var ItmKy = cmb.value();
            var object = this.dataItem(this.select());
            if (ItmKy != "") {
                var validate = ComboValidations("HdrSec1_CmbItem_Nm");
                if (validate) {
                    $("#HdrSec1_CmbItem_Cd").data("kendoComboBox").value(ItmKy);
                    $("#HdrSec1_CmbItem_Nm").data("kendoComboBox").value(ItmKy);
                    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(object.TrnQty);
                    $("#HdrSec1_NmricTrnAmt_Val").data("kendoNumericTextBox").value(object.TrnRate);
                    LoadDetailGrid(object.ItmTrnKy);

                } else {
                    $("#HdrSec1_CmbItem_Cd").data("kendoComboBox").value("");
                    $("#HdrSec1_CmbItem_Nm").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Item Name"
    });


}

function LoadNumericText() {
    
    $("#HdrSec1_NmricQty_Val")
        .kendoNumericTextBox({
            restrictDecimals: true,
            spinners: false,
            min: 0,
            readonly:true,
            change: function (e) {
            }
        });
    $("#HdrSec1_NmricTrnAmt_Val")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,
            min: 0,
            change: function (e) {
            }
        });

    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").readonly();
    $("#HdrSec1_NmricTrnAmt_Val").data("kendoNumericTextBox").readonly();




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


function LoadDetailGrid(ItmTrnKy) {
    $.ajax({
        url: UrlLoadDetailGrid,
        data: JSON.stringify({
            ItmTrnKy: ItmTrnKy,
            ObjKy: FormGlblData.ObjKy
        }),
        dataType: "json",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == null) {
                alert("No Data Available");
            } else {

                var DetailGrid = $('#DetailGrd').data("kendoGrid"),
                    dataSource = new kendo.data.DataSource({
                        data: data
                    });
                DetailGrid.setDataSource(dataSource);
                $("#DetailGrd").data("kendoGrid").dataSource.read();
                $("#DetailGrd").data("kendoGrid").refresh();

            }

        }
    });

}

function Clear() {
    
    $("#HdrSec1_CmbItem_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbItem_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbItem_Cd").data("kendoComboBox").setDataSource([]);
    $("#HdrSec1_CmbItem_Nm").data("kendoComboBox").setDataSource([]);
    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec1_NmricTrnAmt_Val").data("kendoNumericTextBox").value("");

}

function SaveUpdateAllGrd() {
    

    var DetailGrid = [];
    var HdrDetails = [];
    var Hdrgrid = $("#HdrGrd").data("kendoGrid").dataSource.data();
    for (var i = 0; i < Hdrgrid.length; i++) {
        if (Hdrgrid[i]) {
            HdrDetails.push(Hdrgrid[i].toJSON());
        } 
    }

    var Detgrid = $("#HdrGrd").data("kendoGrid").dataSource.data();
    for (var i = 0; i < Detgrid.length; i++) {
        if (Detgrid[i]) {
            DetailGrid.push(Detgrid[i].toJSON());
        }
    }
    $.ajax({
        url: URLsaveUpdate,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            HdrDetails: JSON.stringify(HdrDetails),
            DetailGrid: JSON.stringify(DetailGrid),
            ObjKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Status) {
            if (Status) {
                alert("Save Succsess");
                Clear();
                $("#HdrGrd").data("kendoGrid").dataSource.data([]);
                $("#DetailGrd").data("kendoGrid").dataSource.data([]);
                CallFindInvoive();

            } else {
                
                alert("Please Try Again");

            }

        },
        error: function (e) {
            alert("Network Relateed issue Please try Again");
            return;
        }

    });

} 