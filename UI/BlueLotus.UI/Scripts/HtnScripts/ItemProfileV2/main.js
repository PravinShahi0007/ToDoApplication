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


var ItmTypKy = 0;
var ControlConKy = 0; //For ItmMasCd
var ConrlConKy = 0; //for sales price
var ItmEANKy = 0;
var ItmCat7Ky = 0; //grid selected deptky
var ItmCat8Ky = 0; //grid selected catky
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmKy: 1,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    gridIndex: 1,
    FinItmKy: 1,
    TodayDate: todayDate
}

$(document).ready(function () {

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'ItmTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (ItmTypKy) {

            FormGlblData.ItmTypKy = ItmTypKy;          
            GetFormObjData1();
            
        }
    });
   // LoadItemGridView(ItmTypKy)
});



function GetFormObjData1() {

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
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();           

            DocReadyCus1();
        }
    });
}

function DocReadyCus1() {
    setHdrSectionPropFun;
    LoadCombo();
    //GetControlConKy();
    //GetControlCnKy();
    //Button_From_Dynamic("ButtonSec1");
    ItemGridDefaultColumns();

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');  
    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
}

//Combo load
function LoadCombo() {
    $("#HdrSec1_CmbTyp_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbTyp'),        
        filter: "contains",
        suggest: true,
        placeholder: "Select Item Type.."
    });

    $("#HdrSec1_CmbDept_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbDept'),
        change: function (e) {
            GetCat8ByCat7_SelectWeb();          
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Dept.."
    });
    $("#HdrSec1_CmbCat_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbCat'),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Category.."
    });
}

function GetControlConKy() {
    $.ajax({
        url: urlGetControlConKy, 
        data: JSON.stringify({
            TblNm: "ItmMasCd",
            OurCd: "ItmMasCdInvLoc",
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ControlConKy = data;           
        }
    });
}

function GetControlCnKy() {
    $.ajax({
        url: urlGetControlConKyForItmRate,
        data: JSON.stringify({
            TblNm: "ItmRate", OurCd: "ItmRateItmSale"
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ConrlConKy = data;
        },
        error: function (e) {
            return false;
        }
    });
}

$("#Itemgrid").on("dblclick", "tr.k-state-selected", function () {
    var id = ("#Itemgrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var LiNo = selectedItem.LiNo;
    var ItmKy = selectedItem.ItmKy;
    var ItmTypKy = selectedItem.ItmTypKy;
    var ItmTaxKy = selectedItem.ItmTaxKy;
    var ItmCd = selectedItem.ItmCd;
    var ItmNm = selectedItem.ItmNm;
    ItmCat7Ky = selectedItem.ItmCat7Ky;
    $("#HdrSec1_InptItmCd_Val").val(ItmCd);
    $("#HdrSec1_InptItmNm_Val").val(ItmNm);
    $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value(ItmCat7Ky);
    GetCat8ByCat7_SelectWeb();

    var Brand = selectedItem.Brand;
    var Vat = selectedItem.Vat;
    var ItemEAN = selectedItem.EAN;
    ItmCat8Ky = selectedItem.ItmCat8Ky;
    var Cat8Cd = selectedItem.Cat8Cd;
    var Cat7Cd = selectedItem.Cat7Cd;
    var isAlwTrnRateChange = selectedItem.isAlwTrnRateChange;
    var isAgeVarification = selectedItem.isAgeVarification;
    var isAct = selectedItem.isAct;
    var ItmDisplayNm = selectedItem.ItmDisplayNm;
    var GrpInv = selectedItem.GrpInv;
    var ItmTaxCatKy = selectedItem.ItmTaxCatKy;
    var UnitKy = selectedItem.UnitKy;
    var Image = selectedItem.Image;
    var ImageUpload = selectedItem.ImageUpload;
    var FileName = selectedItem.FileName;

    if (LiNo != 1) {
        $("#TempLiNumber").value = LiNo;
        $("#HdrSec1_CmbDept_Nm").val(Cat7Cd);
        $("#HdrSec1_CmbCat_Nm").val(Cat8Cd);
        $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value(ItmTypKy);      
        $("#ItmKy").val(ItmKy);
        $("#ItmTaxKy").val(ItmTaxKy);
        var imgSrc = FileName; //<-- replace with your base64 image
        var $img = $("<img>", {
            "src": "data:image/png;base64," + imgSrc,
            "width": "70px", "height": "90px"
        })        
        $("#imagePreview").empty();
        $("#imagePreview").append($img);

        $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(ItmCat8Ky);

       //======================| kendoWindow |=====================
        $("#window").removeClass("hidden");
        $("#window").kendoWindow({
            width: "75%",
            height:"70%",
            title: "Edit",
            visible: false,
            actions: [
                "Pin",
                "Minimize",
                "Maximize",
                "Close"
            ],          
        }).data("kendoWindow").center().open();

        //======================| /kendoWindow |=====================
        $(".tabstrip").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn"
                }
            }
        });
        $(".tabstrip").data("kendoTabStrip").select(0);

        ItmSettingsTab();       
        LoadItmSettingsGrid();
        LoadPriceGrid();
        LoadItmStockGrid();
        LoadModifierGrid();
       //LoadIngridents();
        $("#HdrSec1_InptItmKy_Val").val(ItmKy);       

    } else {
        alert("You Cannot change the Line Number one");
    }
});

function GetCat8ByCat7_SelectWeb() {
    var Cat7Ky = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(null);
    if (Cat7Ky != 1 && Cat7Ky != "") {
        $.ajax({
            url: urlGetCat8ByCat7_SelectWeb, //'@Url.Content("~/ComboLoad/GetCat8ByCat7_SelectWeb")',
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                Cat7Ky: Cat7Ky,
            }),

            contentType: 'application/json; charset=utf-8',
            success: function (data) {

                $("#HdrSec1_CmbCat_Cd").kendoComboBox({
                    dataValueField: "CdKy",
                    dataTextField: "CdNm",
                    dataSource: data,
                    //change: function (e) { },
                    filter: "contains",
                    suggest: true,
                    placeholder: "Select Category.."

                });

                var Cat8Ky = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
                //if ($("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value() != ItmCat7Ky || $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value() != ItmCat8Ky) {
                //    $("#HdrSec1_InptItmCd_Val").val(null);
                //    $("#HdrSec1_InptItmNm_Val").val(null);
                //}
            }

        });
    }
    else {
        $("#HdrSec1_CmbCat_Cd").kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbCat'),
            change: function (e) { },
            filter: "contains",
            suggest: true,
            placeholder: "Select Category.."

        });
    }
}
function Clear() {
    var ItmCd = $("#HdrSec1_InptItmCd_Val").val(null);
    var ItmNm = $("#HdrSec1_InptItmNm_Val").val(null);
    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value(null);
    var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(null);
    ItmKy = $("#ItmKy").val(1);
    Clear_AllDefalutValue_Obj();
}

//============== Save button click =================
function Save() {
    var tabstrip = $(".tabstrip").kendoTabStrip().data("kendoTabStrip");
    if (tabstrip == undefined) {
        alert('There is no item to save');
        return
    }
    var tabIndx = -1;
    var tab = tabstrip.select();

    tabIndx = tab.index();

    function InsertImgtoServer() {
        if (typeof FormData == "undefined") {
            var data = [];
            var opmlFile = document.getElementById('files').files[0];
            data.push('opmlFile', document.getElementById('HdrSec1_FileImgLoad_Val').files[0]);
        }
        else {
            var data = new FormData();

            var opmlFile = document.getElementById('HdrSec1_FileImgLoad_Val').files[0];
            data.append("opmlFile", document.getElementById('HdrSec1_FileImgLoad_Val').files[0]);

            
            $.ajax({
                type: "POST",
                url: urlInsertFileswithpath,
                data: data,
                dataType: "html",
                contentType: false,
                processData: false,
                enctype: "multipart/form-data",               
            })
        }
    }

    if (tabIndx == -1) {
        var grid = $("#Itemgrid").data("kendoGrid");
        var currentData = grid.dataSource.data();
        var updatedRecords = [];
        var newRecords = [];

        for (var i = 0; i < currentData.length; i++) {
            if (currentData[i].isNew()) {
                newRecords.push(currentData[i].toJSON());              
            }
            else if (currentData[i].dirty) {
                //this is an existing item
                updatedRecords.push(currentData[i].toJSON());              
            }
        }      

        if (newRecords.length != 0 || updatedRecords.length != 0) {

            $.ajax({
                url: urlInsert,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({

                    NewGridDetail: kendo.stringify(newRecords),
                    updateGrid: kendo.stringify(updatedRecords),                  
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    if (data == true) {
                        alert("Saved Successfully");                        
                       // LoadItemGridView(ItmTypKy);
                    } else {
                        alert("Record Not Saved");

                        LoadItemGridView(ItmTypKy); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }
            });


        }
        else {
            $.ajax({
                url: urlUpdate, // '@Url.Content("~/ItmPrfl/Update")',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({

                    NewGridDetail: kendo.stringify(newRecords),
                    updateGrid: kendo.stringify(updatedRecords),                   
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == true) {
                        alert("Saved Successfully");
                    } else {
                        alert("Record Not Updated");
                        LoadItemGridView(ItmTypKy); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }

            });
        }
    }

    //else if (tabIndx == 0) {
    //    ComSaveFunction();
    //}

    else if (tabIndx == 2) {
        SaveMultiUnitDet();
    }

    else if (tabIndx == 0) {

        var grid = $("#ItmSettingsgrid").data("kendoGrid");
        var ItmKy = $("#ItmKy").val();
        var currentData = grid.dataSource.data();
        var updatedRecords = [];
        var newRecords = [];

        for (var i = 0; i < currentData.length; i++) {
            
            if (currentData[i].dirty) {
                newRecords.push(currentData[i].toJSON());
            }
            
        }

        if (newRecords.length != 0) {

            $.ajax({
                url: urlInsertItmSettings, // '@Url.Content("~/ItmMasCd/InsertItmSettings")',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({

                    NewGridDetail: kendo.stringify(newRecords),
                    //updateGrid: kendo.stringify(updatedRecords),
                    ItmKy: ItmKy,
                    ControlConKy: ControlConKy,
                    ObjKy: viewBag.ObjKy,
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    if (data == true) {
                        alert("Successfully Saved");
                        LoadItmSettingsGrid();
                        //LoadItemGridView(ItmTypKy);
                    } else {
                        alert("Record Not Saved");

                        LoadItmSettingsGrid(); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }
            });
        }     
    }

    else if (tabIndx == 1) {

        var ItmKy = $("#ItmKy").val();
        ItmTypKy: $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
        var grid = $("#Pricegrid").data("kendoGrid");

        var currentData = grid.dataSource.data();
        var updatedRecords = [];
        var newRecords = [];

        for (var i = 0; i < currentData.length; i++) {

            if (currentData[i].isNew()) {
                newRecords.push(currentData[i].toJSON());
            } else if (currentData[i].dirty) {
                updatedRecords.push(currentData[i].toJSON());
            }
        }

        var tempSAveChech = true;

        if (newRecords.length != 0 || updatedRecords.length != 0) {

            if (tempSAveChech) {
                //ajax for unsert update and delete
                $.ajax({
                    url: urlUpdatePriceRevision, // '@Url.Content("~/ItmPrfl/UpdatePriceRevision")',
                    data: JSON.stringify({
                        updateGrid: kendo.stringify(updatedRecords),
                        newGrid: kendo.stringify(newRecords),
                        ControlConKy: ConrlConKy,
                        ItmKy: ItmKy,
                        ObjKy: viewBag.ObjKy,
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {

                        if (data == true) {
                            alert("Successfully Saved..!");
                            LoadPriceGrid(); // update grid
                        } else {
                            alert("Record Not Saved");
                            LoadPriceGrid(); // update grid
                        }
                    },
                    error: function (e) {
                        return false;
                    }
                });
            }
        }
    }


}

function Add() {
    tabStrip= -1;

    var grid = $("#Itemgrid").data("kendoGrid")
    if (grid) {
        //ClearGrid();
        grid.addRow();
    }
}

function ImportItem() {
    var ControllerVar = "ItmPrfl";
    var ActionVar = "ItmMasExcelImport";
    var Host = document.location.host;
    var ObjCaptn = viewBag.ObjCaptn;
    var OurCd = viewBag.OurCd;
    var OurCd2 = "";
    var ObjKy = viewBag.ObjKy;
    var url = "http://" + Host + "/" + RootDir + "/" + ControllerVar + "/" + ActionVar + "?ObjCaptn=" + ObjCaptn + "&OurCd=" + OurCd + "&OurCd2=" + OurCd2 + "&ObjKy=" + ObjKy;
    window.open(url, '_blank');
}

function Post() {
    //var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    //var tabIndx = -1;

    $.ajax({
        url: urlUpdatePost, // '@Url.Content("~/ItmPrfl/Update")',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({

        }),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == true) {
                alert("Saved Successfully");

            } else {
                alert("Record Not Updated");

            }
        },
        error: function (e) {
            return false;
        }

    });

}