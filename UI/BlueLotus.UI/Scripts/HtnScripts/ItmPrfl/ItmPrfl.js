var ItmTypKy =0;
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
    gridIndex:1,
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
    setTimeout(setHdrSectionPropFun, 2000);
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabstrip.select(0);

    LoadCombo();
    GetControlConKy();
    GetControlCnKy();
    //$("#HdrSec1_InptItmNm_Val").prop("disabled", true);
    //GetItmTypKy();
    //var h = $("#option").height();
    //var height = ($(window).height()) - (50 + h);
    //$("#Itemgrid").height = "40px";
    //LoadDate();
    //New();
    ItmSettingsTab();
    //$("#HdrSec1_InptItmCd_Val").focus();
    //Keydown();
    //Disable();
    //LoadItemGridView(ItmTypKy);
    //LoadItmSettingsGrid();
    HTNPaginationCtrlLoadWithDataGrid();

    //LoadPriceGrid();
    var someDate = new Date();
    someDate.setDate(someDate.getDate() + 30); //number  of days to add, e.x. 15 days
    var dateFormated = someDate.toISOString().substr(0, 10);
    //$('#RevsnDt').data("kendoDatePicker").value(dateFormated);
    //var itemgrid = $("#Itemgrid").data("kendoGrid");
    //$("#tabstrip").kendoTabStrip({
    //    itemgrid: focus(),
    // });
}


function GetItmTypKy() {

    $.ajax({
        url: urlGetItmTypKy, //'@Url.Action("GetItmTypKy", "ItmPrfl")',
        data: { ConCd: "ItmTyp", OurCd: '@(ViewBag.ItmTyp)', ObjKy: '@(ViewBag.ObjKy)', },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                ItmTypKy = data[0].CdKy;


            }
        }
    });
}

function LoadIngridents() {
    //$("#Itemgrid").dblclick(function () {
    var grid = $("#Itemgrid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ItmKy = $("#ItmKy").val();
    var ItmNm = $("#HdrSec1_InptItmNm_Val").val();
    if (ItmKy != "" || ItmKy != undefined || ItmKy != null) {
        //SetSelectedItemToItemCombo(ItmKy, ItmNm);
    } else {
        alert("Please Select Item");
    }
    // })
}


function GetControlConKy() {
    $.ajax({
        url: urlGetControlConKy, //'@Url.Content("~/ControlCon/GetControlConKy")',
        data: JSON.stringify({
            TblNm: "ItmMasCd",
            OurCd: "ItmMasCdInvLoc",
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ControlConKy = data;
            //alert(ControlConKy);
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

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab3');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab4');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab5');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
    //$("#HdrSec1_InptItmCd_Val").focus();
}


$(function () {
    $("#HdrSec1_FileImgLoad_Val").on("change", function () {
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        if (/^image/.test(files[0].type)) { // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file


            reader.onloadend = function () { // set image data as background of div
                $("#imagePreview").empty();
                $("#imagePreview").css("background-image", "url(" + this.result + ")");


                //if (typeof FormData == "undefined") {
                //    var data = [];
                //    var opmlFile = document.getElementById('files').files[0];
                //    data.push('opmlFile', document.getElementById('HdrSec1_FileImgLoad_Val').files[0]);
                //}
                //else {
                //    var data = new FormData();

                //    var opmlFile = document.getElementById('HdrSec1_FileImgLoad_Val').files[0];
                //    data.append("opmlFile", document.getElementById('HdrSec1_FileImgLoad_Val').files[0]);

                //    //var GridData = $("#Itemgrid").data("kendoGrid");

                //    // if (GridData.VersionNo != VersionNo && GridData.InsrtDt != InsrtDt) {


                //    $.ajax({
                //        type: "POST",
                //        url:urlInsertFileswithpath, //'@Url.Content("~/ItmPrfl/InsertFileswithpath")',
                //        data: data,
                //        dataType: "html",
                //        contentType: false,
                //        processData: false,
                //        enctype: "multipart/form-data",
                //        success: function (result) {

                //            if (result != "false") {
                //                alert("Success");
                //            }
                //            else {
                //                alert("Already Exist");
                //            }
                //        }
                //    })
                //}
            }
        }
    });
});

//function Disable() {
//    $("#HdrSec1_InptItmNm_Val").prop("disabled", true);
//    $("#HdrSec1_InptItmDisplayNm_Val").prop("disabled", true);
//    //var ItmTyp = $("#HdrSec1_CmbTyp_Cd").data("kendoComboBox");
//    //ItmTyp.enable(false);
//    //var Cat = $("#HdrSec1_CmbCat_Cd").data("kendoComboBox");
//    //Cat.enable(false);
//    var Brand = $("#HdrSec1_CmbBrand_Cd").data("kendoComboBox");
//    Brand.enable(false);
//    var Vat = $("#HdrSec1_CmbVat_Cd").data("kendoComboBox");
//    Vat.enable(false);
//    var GrpInv = $("#HdrSec1_CmbGrpInv_Cd").data("kendoComboBox");
//    GrpInv.enable(false);
//    var UnitKy = $("#HdrSec1_CmbBaseUnit_Cd").data('kendoComboBox');
//    UnitKy.enable(false);
//    $("#HdrSec1_ChkboxAct_Val").prop("disabled", true);
//    $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("disabled", true);
//    $("#HdrSec1_ChkboxAgeVarification_Val").prop("disabled", true);
//}

function Edit() {
    $("#HdrSec1_InptItmNm_Val").prop("disabled", false);
    $("#HdrSec1_InptItmDisplayNm_Val").prop("disabled", false);
    //var ItmTyp = $("#HdrSec1_CmbTyp_Cd").data("kendoComboBox");
    //ItmTyp.enable();
    //var Cat = $("#HdrSec1_CmbCat_Cd").data("kendoComboBox");
    //Cat.enable();
    var Brand = $("#HdrSec1_CmbBrand_Cd").data("kendoComboBox");
    Brand.enable();
    var Vat = $("#HdrSec1_CmbVat_Cd").data("kendoComboBox");
    Vat.enable();
    var GrpInv = $("#HdrSec1_CmbGrpInv_Cd").data("kendoComboBox");
    GrpInv.enable();
    var UnitKy = $("#HdrSec1_CmbBaseUnit_Cd").data('kendoComboBox');
    UnitKy.enable();

    $("#HdrSec1_ChkboxAct_Val").prop("disabled", false);
    $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("disabled", false);
    $("#HdrSec1_ChkboxAgeVarification_Val").prop("disabled", false);
}

function Find() {
    $filter = new Array();
    $x = $("#HdrSec1_InptItmCd_Val").val();
    $y = $("#HdrSec1_InptItmEAN_Val").val();
    if ($y != null || $x != null) {
        $filter.push({ field: "EAN", operator: "contains", value: $y });
        $filter.push({ field: "ItmCd", operator: "contains", value: $x });
    }

    $("#Itemgrid").data("kendoGrid").dataSource.filter($filter);
}

function InsertGrid() {

    var ItmKy = $("#ItmKy").val();
    var ItmTaxKy = $("#ItmTaxKy").val();
    var ItmCd = $("#HdrSec1_InptItmCd_Val").val();
    var ItmNm = $("#HdrSec1_InptItmNm_Val").val();
    var ItmEAN = $("#HdrSec1_InptItmEAN_Val").val();
    var ItmDisplayNm = $("#HdrSec1_InptItmDisplayNm_Val").val();
    var ItmTypKy = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
    var GrpInv = $("#HdrSec1_CmbGrpInv_Cd").data('kendoComboBox').value();
    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
    var Cat7Ky = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    var Cat8Ky = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
    var Brand = $("#HdrSec1_CmbBrand_Cd").data('kendoComboBox').value();
    var Vat = $("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value();
    var UnitKy = $("#HdrSec1_CmbBaseUnit_Cd").data('kendoComboBox').value();
    var isAlwTrnRateChange;
    if ($("#HdrSec1_ChkboxAlwTrnRateChange_Val").is(":checked")) {
        isAlwTrnRateChange = 1;
    } else {
        isAlwTrnRateChange = 0;
    }
    var isAgeVarification;
    if ($("#HdrSec1_ChkboxAgeVarification_Val").is(":checked")) {
        isAgeVarification = 1;
    } else {
        isAgeVarification = 0;
    }
    var isAct;
    if ($("#HdrSec1_ChkboxAct_Val").is(":checked")) {
        isAct = 1;
    } else {
        isAct = 0;
    }

    var grid = $("#Itemgrid").data("kendoGrid");
    var sel = grid.select();
    var sel_idx = sel.index();
    // Get the item
    var item = grid.dataItem(sel);
    // Get the index in the DataSource (not in current page of the grid)
    var idx = grid.dataSource.indexOf(item);

    //var datasource1 = grid.dataSource;
    //var total = datasource1.data().length;
    //for (var i = 0; i < data.length; i++) {

    grid.dataSource.insert(
        idx + 1, {

            ItmCd: ItmCd,
            ItmNm: ItmNm,
            ItmDisplayNm: ItmDisplayNm,
            EAN: ItmEAN,
            Cat8Cd: Dept,
            Cat7Cd: Cat,
            ItmCat7Ky: Cat7Ky,
            ItmCat8Ky: Cat8Ky,
            Brand: Brand,
            Vat: Vat,
            isAlwTrnRateChange: isAlwTrnRateChange,
            isAgeVarification: isAgeVarification,
            isAct: isAct,
            ItmKy: ItmKy,
            ItmTaxKy: ItmTaxKy,
            ItmTypKy: ItmTypKy,
            UnitKy: UnitKy,
        }
        );

    //var Insertgrid = grid.dataSource.add();

    //Insertgrid.set("LiNo", 1);
    //Insertgrid.set("ItmCd", ItmCd);
    //Insertgrid.set("ItmNm", ItmNm);
    //Insertgrid.set("PartNo", ItmEAN);
    //Insertgrid.set("OrdUnt", OrdUnt);
    //Insertgrid.set("SelUnt", SelUnt);
    //Insertgrid.set("BuyRat", BuyRat);
    //Insertgrid.set("TrnRat", TrnRat);
    //Insertgrid.set("ReOrdLvl", ReOrdQty);
    //Insertgrid.set("ReOrdQty", ReOrdQty);
    //Insertgrid.set("ItmCat8", Dept);
    //Insertgrid.set("ItmCat7", Cat);
    //Insertgrid.set("Brand", Brand);
    //Insertgrid.set("Vat", Vat);
    //alert(ItmNm);
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

        //$("#HdrSec1_InptItmEAN_Val").val(ItemEAN);
        $("#HdrSec1_CmbDept_Nm").val(Cat7Cd);
        $("#HdrSec1_CmbCat_Nm").val(Cat8Cd);
        $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value(ItmTypKy);
        //$("#HdrSec1_CmbBrand_Cd").data('kendoComboBox').value(Brand);
        //$("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value(ItmTaxCatKy);
        //$("#HdrSec1_InptItmDisplayNm_Val").val(ItmDisplayNm);
        //$("#HdrSec1_CmbGrpInv_Cd").data('kendoComboBox').value(GrpInv);
        $("#ItmKy").val(ItmKy);
        $("#ItmTaxKy").val(ItmTaxKy);
        //$("#HdrSec1_InptItmCd_Val1").val(ItmCd);
        //$("#HdrSec1_InptItmNm_Val1").val(ItmNm);
        //$("#HdrSec1_InptItmEAN_Val1").val(ItemEAN);
        //jQuery$("#HdrSec1_FileImgLoad_Val").attr('src', 'Image');
        //$("#HdrSec1_FileImgLoad_Val").val(Image);

        var imgSrc = FileName; //<-- replace with your base64 image
        var $img = $("<img>", {
            "src": "data:image/png;base64," + imgSrc,
            // added `width` , `height` properties to `img` attributes
            "width": "120px", "height": "90px"
        })
        //var $img = $("<img/>");
        //$img.attr("src", "data:image/png;base64," + imgSrc + "width: 120px", "height: 90px" );
        $("#imagePreview").empty();
        $("#imagePreview").append($img);

        //$("#imagePreview").val(Image);
        //$('input[type=file]').val(Image);
        //if (isAgeVarification == 1) {
        //    $("#HdrSec1_ChkboxAgeVarification_Val").prop("checked", true);
        //} else {
        //    $("#HdrSec1_ChkboxAgeVarification_Val").prop("checked", false);
        //}
        //if (isAlwTrnRateChange == 1) {
        //    $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("checked", true);
        //} else {
        //    $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("checked", false);
        //}
        //if (isAct == 1) {
        //    $("#HdrSec1_ChkboxAct_Val").prop("checked", true);
        //} else {
        //    $("#HdrSec1_ChkboxAct_Val").prop("checked", false);
        //}

        $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(ItmCat8Ky);

        ItmSettingsTab();
        //LoadMultiUnitGrid();
        LoadIngridents();
        LoadItmSettingsGrid();
        LoadPriceGrid();
        LoadItmStockGrid();
        //GetItemUnitMasDet(ItmKy);
        $("#HdrSec1_InptItmKy_Val").val(ItmKy);

    } else {

        alert("You Cannot change the Line Number one");
    }
});

function Cancel() {
    var grid = $("#Itemgrid").data("kendoGrid");
    grid.cancelChanges();
}

function LoadItem() {
    alert("LoadItem");
    var ItmCd = $("#HdrSec1_InptItmCd_Val").val();
    $.ajax({
        url: urlCheckItmCd, //'@Url.Content("~/ItmPrfl/CheckItmCd")',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ItmCd: ItmCd,
        }),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            //if (data == null)
            //{
            //    $("#ItmKy").val(1);
            //    $("#HdrSec1_InptItmNm_Val").val("");
            //    LoadItmSettingsGrid();
            //    alert("Invalid Item Code");
            //}

            if (data != null) {
                var ItmCd = data[0].ItmCd;
                var EAN = data[0].EAN;
                var ItmNm = data[0].ItmNm;
                var ItmCat7Ky = data[0].ItmCat7Ky;
                $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value(ItmCat7Ky);
               
                GetCat8ByCat7_SelectWeb();

                var ItmCat8Ky = data[0].ItmCat8Ky;
                var ItmTaxCatKy = data[0].ItmTaxCatKy;
                var ItmDisplayNm = data[0].ItmDisplayNm;
                var isAlwTrnRateChange = data[0].isAlwTrnRateChange;
                var isAgeVarification = data[0].isAgeVarification;
                var isAct = data[0].isAct;
                var ItmKy = data[0].ItmKy;
               
                var ItmTypKy = data[0].ItmTypKy;
                alert(ItmTypKy);
                var ItmTyp = data[0].ItmTyp;
                var Image = data[0].Image;
                var UnitKy = data[0].UnitKy;
                var Vat = data[0].Vat;
                var ItmTaxKy = data[0].ItmTaxKy;
                var UnitKy = data[0].UnitKy;
                var Cat7Cd = data[0].Cat7Cd;
                var Cat8Cd = data[0].Cat8Cd;

                $("#ItmKy").val(ItmKy);
                $("#HdrSec1_InptItmNm_Val").val(ItmNm);
                //$("#HdrSec1_InptItmEAN_Val").val(EAN);
                $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value(ItmTypKy);
                //$("#HdrSec1_CmbBrand_Cd").data('kendoComboBox').value(Brand);
                //$("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value(ItmTaxCatKy);
                //$("#HdrSec1_InptItmDisplayNm_Val").val(ItmDisplayNm);
                //$("#HdrSec1_CmbBaseUnit_Cd").data('kendoComboBox').value(UnitKy);
                $("#HdrSec1_InptItmCd_Val1").val(ItmCd);
                $("#HdrSec1_InptItmNm_Val1").val(ItmNm);
                //$("#HdrSec1_InptItmEAN_Val1").val(EAN);
                $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(ItmCat8Ky);

                var imgSrc = Image; //<-- replace with your base64 image
                var $img = $("<img>", {
                    "src": "data:image/png;base64," + imgSrc,
                    // added `width` , `height` properties to `img` attributes
                    "width": "120px", "height": "90px"
                })
                $("#imagePreview").empty();
                $("#imagePreview").append($img);

                //if (isAgeVarification == 1) {
                //    $("#HdrSec1_ChkboxAgeVarification_Val").prop("checked", true);
                //} else {
                //    $("#HdrSec1_ChkboxAgeVarification_Val").prop("checked", false);
                //}
                //if (isAlwTrnRateChange == 1) {
                //    $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("checked", true);
                //} else {
                //    $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("checked", false);
                //}
                //if (isAct == 1) {
                //    $("#HdrSec1_ChkboxAct_Val").prop("checked", true);
                //} else {
                //    $("#HdrSec1_ChkboxAct_Val").prop("checked", false);
                //}

                //$('#Itemgrid').data().kendoGrid.destroy();
                //$('#Itemgrid').empty();

                var grid = $("#Itemgrid").data("kendoGrid");
                grid.dataSource.data([]);

                var grid = $("#Itemgrid").data("kendoGrid");
                var sel = grid.select();
                var sel_idx = sel.index();
                // Get the item
                var item = grid.dataItem(sel);
                // Get the index in the DataSource (not in current page of the grid)
                var idx = grid.dataSource.indexOf(item);

                //var datasource1 = grid.dataSource;
                //var total = datasource1.data().length;
                //for (var i = 0; i < data.length; i++) {

                grid.dataSource.insert(
                    idx + 1, {

                        ItmCd: ItmCd,
                        ItmNm: ItmNm,
                        ItmDisplayNm: ItmDisplayNm,
                        EAN: EAN,
                        ItmTaxCatKy: ItmTaxCatKy,
                        ItmCat7Ky: ItmCat7Ky,
                        ItmCat8Ky: ItmCat8Ky,
                        Cat7Cd: Cat7Cd,
                        Cat8Cd: Cat8Cd,
                        Vat: Vat,
                        isAlwTrnRateChange: isAlwTrnRateChange,
                        isAgeVarification: isAgeVarification,
                        isAct: isAct,
                        ItmKy: ItmKy,
                        ItmTaxKy: ItmTaxKy,
                        ItmTypKy: ItmTypKy,
                        ItmTyp: ItmTyp,
                        Unit: UnitKy,
                        UnitKy: UnitKy,
                    }
                    );

                //var Insertgrid = grid.dataSource.add();

                //Insertgrid.set("ItmCd", ItmCd);
                //Insertgrid.set("ItmNm", ItmNm);
                //Insertgrid.set("EAN", EAN);
                //Insertgrid.set("ItmTyp", ItmTypKy);
                //Insertgrid.set("ItmKy", ItmKy);
                //Insertgrid.set("isAct", isAct);
                //Insertgrid.set("isAgeVarification", isAgeVarification);
                //Insertgrid.set("Vat", ItmTaxCatKy);
                //Insertgrid.set("Unit", UnitKy);
                //Insertgrid.set("Cat7Cd", ItmCat7Ky);
                //Insertgrid.set("Cat8Cd", ItmCat8Ky);
                //Insertgrid.set("ItmDisplayNm", ItmDisplayNm);
                //Insertgrid.set("Vat", Vat);


                //LoadItemGridView(ItmTypKy);
                ItmSettingsTab();
                //LoadMultiUnitGrid();
                LoadIngridents();
                LoadItmSettingsGrid();
                LoadPriceGrid();
                LoadItmStockGrid();
                //GetItemUnitMasDet(ItmKy);
            }
            else {
                $("#ItmKy").val(1);
                ItmSettingsTab();
                $("#HdrSec1_InptItmNm_Val").val("");
                alert("Invalid Item Code");
            }
        },
        error: function (e) {

            $("#ItmKy").val(1);
            ItmSettingsTab();

            $("#HdrSec1_InptItmNm_Val").val("");
            var grid = $("#Itemgrid").data("kendoGrid");
            grid.dataSource.data([]);
            $("#imagePreview").css('background-image', 'none');
            $("#imagePreview").empty();

        }

    });
}

$("#HdrSec1_InptItmCd_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        LoadItem();
        //$("#HdrSec1_InptItmNm_Val").focus();
    }
});

$("#HdrSec1_InptItmNm_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {

        var ItmNm = $("#HdrSec1_InptItmNm_Val").val();

        if (ItmNm != null && ItmNm != '') {
            $.ajax({
                url: urlCheckItmNm, //'@Url.Content("~/ItmPrfl/CheckItmNm")',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    ItmNm: ItmNm,
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    if (data != null) {

                        var grid = $("#Itemgrid").data("kendoGrid");
                        grid.dataSource.data([]);

                        for (var i = 0; i < data.length; i++) {

                            var ItmCd = data[i].ItmCd;
                            var EAN = data[i].EAN;
                            var ItmNm = data[i].ItmNm;
                            var ItmCat7Ky = data[i].ItmCat7Ky;
                            //$("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value(ItmCat7Ky);

                            //GetCat8ByCat7_SelectWeb();

                            var ItmCat8Ky = data[i].ItmCat8Ky;
                            var ItmTaxCatKy = data[i].ItmTaxCatKy;
                            var ItmDisplayNm = data[i].ItmDisplayNm;
                            var isAlwTrnRateChange = data[i].isAlwTrnRateChange;
                            var isAgeVarification = data[i].isAgeVarification;
                            var isAct = data[i].isAct;
                            var ItmKy = data[i].ItmKy;
                            var ItmTypKy = data[i].ItmTypKy;
                            var ItmTyp = data[i].ItmTyp;
                            var FileName = data[i].Image;
                            var UnitKy = data[i].UnitKy;
                            var Vat = data[i].Vat;
                            var ItmTaxKy = data[i].ItmTaxKy;
                            var UnitKy = data[i].UnitKy;
                            var Cat7Cd = data[i].Cat7Cd;
                            var Cat8Cd = data[i].Cat8Cd;

                            $("#ItmKy").val(1);
                            //$("#HdrSec1_InptItmNm_Val").val(ItmNm);
                            //$("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value(ItmTypKy);

                            //$("#HdrSec1_InptItmCd_Val1").val(ItmCd);
                            //$("#HdrSec1_InptItmNm_Val1").val(ItmNm);
                            //$("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(ItmCat8Ky);

                            //var imgSrc = Image; //<-- replace with your base64 image
                            //var $img = $("<img>", {
                            //    "src": "data:image/png;base64," + imgSrc,
                            //    // added `width` , `height` properties to `img` attributes
                            //    "width": "120px", "height": "90px"
                            //})
                            //$("#imagePreview").empty();
                            //$("#imagePreview").append($img);

                            
                            var grid = $("#Itemgrid").data("kendoGrid");
                            var sel = grid.select();
                            var sel_idx = sel.index();
                            // Get the item
                            var item = grid.dataItem(sel);
                            // Get the index in the DataSource (not in current page of the grid)
                            var idx = grid.dataSource.indexOf(item);


                            grid.dataSource.insert(
                                idx + 1, {

                                    ItmCd: ItmCd,
                                    ItmNm: ItmNm,
                                    ItmDisplayNm: ItmDisplayNm,
                                    EAN: EAN,
                                    ItmTaxCatKy: ItmTaxCatKy,
                                    ItmCat7Ky: ItmCat7Ky,
                                    ItmCat8Ky: ItmCat8Ky,
                                    Cat7Cd: Cat7Cd,
                                    Cat8Cd: Cat8Cd,
                                    Vat: Vat,
                                    isAlwTrnRateChange: isAlwTrnRateChange,
                                    isAgeVarification: isAgeVarification,
                                    isAct: isAct,
                                    ItmKy: ItmKy,
                                    ItmTaxKy: ItmTaxKy,
                                    ItmTypKy: ItmTypKy,
                                    ItmTyp: ItmTyp,
                                    Unit: UnitKy,
                                    UnitKy: UnitKy,
                                    FileName: FileName,
                                }
                                );


                            ItmSettingsTab();
                            //LoadMultiUnitGrid();
                            //LoadIngridents();
                            //LoadItmSettingsGrid();
                            //LoadPriceGrid();
                            //LoadItmStockGrid();
                            //GetItemUnitMasDet(ItmKy);
                        }
                    }
                    else {

                    }
                },
                error: function (e) {

                    $("#ItmKy").val(1);
                    ItmSettingsTab();
                    var grid = $("#Itemgrid").data("kendoGrid");
                    grid.dataSource.data([]);
                    $("#imagePreview").css('background-image', 'none');
                    $("#imagePreview").empty();

                }

            });
        }
        else {
            alert("Please enter item name");
        }
    }
});

function Keydown() {
    $("#HdrSec1_InptItmNm_Val").keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#HdrSec1_InptItmEAN_Val").focus();
        }
    });
    $("#HdrSec1_InptItmEAN_Val").keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#HdrSec1_CmbTyp_Cd").data("kendoComboBox").input.focus();
        }
    });

    $("#HdrSec1_CmbTyp_Cd").data("kendoComboBox").input.keydown(function (e) {
        var TempPrjCd = $("#HdrSec1_CmbTyp_Cd").data("kendoComboBox").value();
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == "13") {
            if (TempPrjCd != "" || TempPrjCd == 1) {
                $("#HdrSec1_CmbDept_Cd").data("kendoComboBox").input.focus();

            }
        }
    });
    $("#HdrSec1_CmbDept_Cd").data("kendoComboBox").input.keydown(function (e) {
        var TempPrjCd = $("#HdrSec1_CmbDept_Cd").data("kendoComboBox").value();
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == "13") {
            if (TempPrjCd != "" || TempPrjCd == 1) {
                $("#HdrSec1_CmbCat_Cd").data("kendoComboBox").input.focus();

            }
        }
    });
    $("#HdrSec1_CmbCat_Cd").data("kendoComboBox").input.keydown(function (e) {
        var TempPrjCd = $("#HdrSec1_CmbCat_Cd").data("kendoComboBox").value();
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == "13") {
            if (TempPrjCd != "" || TempPrjCd == 1) {
                $("#HdrSec1_CmbGrpInv_Cd").data("kendoComboBox").input.focus();

            }
        }
    });
    $("#HdrSec1_CmbGrpInv_Cd").data("kendoComboBox").input.keydown(function (e) {
        var TempPrjCd = $("#HdrSec1_CmbGrpInv_Cd").data("kendoComboBox").value();
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == "13") {
            if (TempPrjCd != "" || TempPrjCd == 1) {
                $("#HdrSec1_CmbBrand_Cd").data("kendoComboBox").input.focus();

            }
        }
    });
    $("#HdrSec1_CmbBrand_Cd").data("kendoComboBox").input.keydown(function (e) {
        var TempPrjCd = $("#HdrSec1_CmbBrand_Cd").data("kendoComboBox").value();
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == "13") {
            if (TempPrjCd == "" || TempPrjCd == 1) {
                $("#HdrSec1_CmbVat_Cd").data("kendoComboBox").input.focus();

            }
        }
    });
    $("#HdrSec1_CmbVat_Cd").data("kendoComboBox").input.keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == "13") {
            $("#Imgload").focus();
            return false;
        }
    });

}

//function editAll() {
//    var theGrid = $("#Itemgrid").data("kendoGrid");
//    $("#Itemgrid tbody").find('tr').each(function () {
//        var model = theGrid.dataItem(this);
//        kendo.bind(this, model);
//    });
//    $("#Itemgrid").focus();
//}

function Clear() {
    //var grid = $("#Itemgrid").data("kendoGrid");
    //editAll();
    var ItmCd = $("#HdrSec1_InptItmCd_Val").val(null);
    var ItmNm = $("#HdrSec1_InptItmNm_Val").val(null);
    //var ItmEAN = $("#HdrSec1_InptItmEAN_Val").val(null);
    //var ItmDisplayNm = $("#HdrSec1_InptItmDisplayNm_Val").val(null);
    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value(null);
    var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(null);
    //var Brand = $("#HdrSec1_CmbBrand_Cd").data('kendoComboBox').value(null);
    //var Vat = $("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value(null);
    //var GrpInv = $("#HdrSec1_CmbGrpInv_Cd").data('kendoComboBox').value(null);
    //var ItmDisplayNm = $("#HdrSec1_InptItmDisplayNm_Val").val(null);
    //$("#HdrSec1_CmbBaseUnit_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec1_ChkboxAgeVarification_Val").prop("checked", false);
    //$("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("checked", false);
    //$("#HdrSec1_ChkboxAct_Val").prop("checked", false);
    $("#imagePreview").css('background-image', 'none');
    //$("#HdrSec1_FileImgLoad_Val").val(null);
    ItmKy = $("#ItmKy").val(1);
    Clear_AllDefalutValue_Obj();
    $("#imagePreview").empty();
    ItmSettingsTab();
    //Disable();
}

function EnableTab() {
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

    //tabstrip.select(0);
    ItmKy = $("#ItmKy").val();

    var ind1 = 1;
    var ind2 = 2;
    var ind3 = 3;
    var ind4 = 4;
    var ind5 = 5;

    tabStrip.enable(tabStrip.tabGroup.children().eq(ind1));
    tabStrip.enable(tabStrip.tabGroup.children().eq(ind2));
    tabStrip.enable(tabStrip.tabGroup.children().eq(ind3));
    tabStrip.enable(tabStrip.tabGroup.children().eq(ind4));
    tabStrip.enable(tabStrip.tabGroup.children().eq(ind5));

    if (ItmKy <= 1) {

        tabStrip.enable(tabStrip.tabGroup.children().eq(ind1));
        tabStrip.enable(tabStrip.tabGroup.children().eq(ind2));
        tabStrip.enable(tabStrip.tabGroup.children().eq(ind3));
        tabStrip.enable(tabStrip.tabGroup.children().eq(ind4));
        tabStrip.enable(tabStrip.tabGroup.children().eq(ind5));

    }
}


function New() {
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    EnableTab();

    var tabIndx = -1;
    var tab = tabStrip.select();
    //tabStrip.select(0);
    tabIndx = tab.index();

    if (tabIndx == 0) {
        //ItmSettingsTab();
        ItmKy = $("#ItmKy").val(1);
        var ItmCd = $("#HdrSec1_InptItmCd_Val").val(null);
        var ItmNm = $("#HdrSec1_InptItmNm_Val").val(null);
        var ItmEAN = $("#HdrSec1_InptItmEAN_Val").val(null);
        var ItmDisplayNm = $("#HdrSec1_InptItmDisplayNm_Val").val(null);
        var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value(null);
        var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(null);
        var Brand = $("#HdrSec1_CmbBrand_Cd").data('kendoComboBox').value(null);
        var Vat = $("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value(null);
        var GrpInv = $("#HdrSec1_CmbGrpInv_Cd").data('kendoComboBox').value(null);
        var ItmDisplayNm = $("#HdrSec1_InptItmDisplayNm_Val").val(null);
        $("#HdrSec1_CmbBaseUnit_Cd").data('kendoComboBox').value(null);
        $("#HdrSec1_ChkboxAgeVarification_Val").prop("checked", false);
        $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("checked", false);
        $("#HdrSec1_ChkboxAct_Val").prop("checked", true);
        $("#imagePreview").css('background-image', 'none');
        $("#HdrSec1_FileImgLoad_Val").val(null);
        Clear_AllDefalutValue_Obj();
        $("#imagePreview").empty();

        Edit();

        //LoadMultiUnitGrid();
        LoadIngridents();
        LoadItmSettingsGrid();
        LoadPriceGrid();
        LoadItmStockGrid();
        //GetItemUnitMasDet(ItmKy);

    }
    else if (tabIndx == 2) {
        //Disable();
        var grid = $("#ItmSettingsgrid").data("kendoGrid")
        if (grid) {
            grid.addRow();
        }
    }
    //else if (tabIndx == 3) {
    //    Disable();
    //    var grid = $("#Pricegrid").data("kendoGrid")
    //    if (grid) {
    //        grid.addRow();
    //    }
    //}

    //else if (tabIndx == 5) {
    //    AddNewRow();
    //}
}

function Add() {
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabStrip.select(0);

    var grid = $("#Itemgrid").data("kendoGrid")
    if (grid) {
        //ClearGrid();
        grid.addRow();
    }
}

function ClearGrid() {

    var grid = $("#Itemgrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function LoadCombo() {

    $("#HdrSec1_CmbBrand_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbBrand'),
        change: function (e) { },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Brand.."
    });

    $("#HdrSec1_CmbVat_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbVat'),
        change: function (e) { },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Vat%.."
    });

    $("#HdrSec1_CmbDept_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbDept'),
        change: function (e) {

            GetCat8ByCat7_SelectWeb();
            //$("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(1);
            //$("#HdrSec1_CmbCat_Cd").data('kendoComboBox').text("");

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

            //if ($("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value() != ItmCat7Ky || $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value() != ItmCat8Ky) {
            //    $("#HdrSec1_InptItmCd_Val").val(null);
            //    $("#HdrSec1_InptItmNm_Val").val(null);
            //}
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Category.."

    });

    $("#HdrSec1_CmbTyp_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbTyp'),
        //change: function (e) { },
        filter: "contains",
        suggest: true,       
        placeholder: "Select Item Type.."
    });

    $("#HdrSec1_CmbGrpInv_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbGrpInv'),
        //change: function (e) { },
        filter: "contains",
        suggest: true,
        placeholder: "Select Group.."
    });

    //$("#HdrSec1_CmbBaseUnit_Cd").kendoComboBox({
    //    dataValueField: "UnitKy",
    //    dataTextField: "Unit",
    //    dataSource: UnitMas_SelectMob_Datasource('HdrSec1_CmbBaseUnit'),
    //    //change: function (e) { },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select Unit.."
    //});
}


//$("#HdrSec1_CmbDept_Cd").change(function () {
//    GetCat8ByCat7_SelectWeb();
//})

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

$(".btn-minimize").click(function () {
    if ($(this).html() == "-") {
        $(this).html("+");
        $("#toggle").show();
    }
    else {
        $(this).html("-");
        $("#toggle").hide();
    }
    $("#HdrPart").slideToggle();
});


//ItmMasExcelImport

function ImportItem() {

    //$("#excelImport").click(function () {
    //openMSExcelImportWindow();

    //});

        //$('#currentTab').val(ActionVar);
        var ControllerVar = "ItmPrfl";
        var ActionVar = "ItmMasExcelImport";
        var Host = document.location.host;
        var ObjCaptn = viewBag.ObjCaptn;
        var OurCd = viewBag.OurCd;
        var OurCd2 = "";
        //var OurCd2 = viewBag.OurCd2;
        var ObjKy = viewBag.ObjKy;
        //var EmpKy = $('#EmpKy').val();
        var url = "http://" + Host + "/"+RootDir+"/" + ControllerVar + "/" + ActionVar + "?ObjCaptn=" + ObjCaptn + "&OurCd=" + OurCd + "&OurCd2=" + OurCd2 + "&ObjKy=" + ObjKy;
        window.open(url, '_blank');

        //viewBag.OurCd2 = ActionVar;

        //if (currentTab != "EmployeeJobIndex") {
        //    disableEmpJobDet();
        //}

        //if (currentTab != "EmployeeIndex") {
        //    disableEmpBasicDet();
        //}

    


}
