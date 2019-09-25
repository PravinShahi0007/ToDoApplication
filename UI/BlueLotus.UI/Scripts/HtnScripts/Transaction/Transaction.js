var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1;

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
    RecKy:1, //Used for image key
    ImagePath: '',
    ImageNm: '',
    TblNm:'TrnHdr',
    TodayDate: todayDate,
    TmStmp: 1,
    IsDetailRelatedHdrSectionChanged: false,
    AllDefalutValueObj: null,
    GotItemRate: 0,
    ISNeworUpdateTranction: 1,
    isSaveandNew: 0,
    isItmCdFrmCmb: 0,
    itmCdFrm: '',
    ItmCdWhenDblClick: '',
    Detail_Editing_LiNo: -1,
    CurrentAprStsKy:1,
    SerialNumber_Array: [],
    AprStsLock: null,
    AprStsLockMsg: "",
    DblClickedUID: null,
    isAlwAcs: null,
    isAlwAdd: null,
    isAlwUpdate: null,
    isAlwDel: null,
    isAlwApr: null,
    GridEditableRecordCount: 0,
    selectedIndex: 0,
    FormTyp: "TrnTyp",
    FormGridArray: [],
    FindFormGridArray: []
}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0,
    TrnMinDate: "",
    TrnMaxDate: ""
}


$(document).ready(function () {

    OPENLodingForm();
    GetUserPermission(); // Get UserPermission Properties from DB.

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'TrnTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {

            FormGlblData.TrnTypKy = TrnTypKy;
            GetCdMasBy_CdKy(TrnTypKy);
        }
    });
});

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
            //Button_From_Dynamic('ButtonSec1');
            //Button_From_Dynamic('ButtonSec2');
            //Button_From_Dynamic('ButtonSec3');
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

            HideTheProperty(FormGlblData.FormObjData);
            //old ObjMas
            //FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();            
            //FormGlblData.AllValidationObj = Get_All_Validation_Obj();

            //FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, 'ValidationOrder');

            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    if (FormGlblData.isAlwAcs == 0) {
        alert("You Don't Have Access Permission. We Are Redirecting To Home...");
        var url = "http://" + document.location.host + "/BL10-PNS/" + "Home" + "/" + "Home";
        window.location.href = url;
        return;
    }
    var PrjKy = 1
    //setHdrSectionPropFun();
    LoadCombo();
    //LoadNextStateDropDown();
    LoadAccMasComboLoad(1);

    //Added by Charith Because I dont have a business Idea of this Cause Saving not posble if you didnt create adress combo
    LoadAdrComboByAcc(1);
    LoadGridView1(PrjKy);
    Initialize_Pager("TrnKy");
    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    SetTrnDate();

    $("#OrdKy").hide();
    $("#OrdTypKy").hide();
    $("#OrdPrefixKy").hide();
    $("#POrdKy").hide();
    $("#POrdTypKy").hide();
    $("#POrdPrefixKy").hide();
    $("#Podiv").hide();
    $("#AccTrnKy").hide();

    $("#HdrSec3_NmricExRate_Val").data('kendoNumericTextBox').value(1);
    $("#HdrPOQty").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({ min: 0, spinners: false, decimals: 3, format: "n3", }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricDisPer_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricDisAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricVatPer_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricVatAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricSVatPer_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricSVatAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricNbtPer_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricNbtAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricWhtPer_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricWhtAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricSubTotal_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricCrossTotal_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec5_NmricNetTotal_Val").kendoNumericTextBox({ min: 0, spinners: false });

    $("#HdrSec4_InptSubTotal_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_InptNbtAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_InptDisAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_InptSVatAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_InptVatAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_InptSumTotalAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_InptCrossTotalAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_InptWhtAmt_Val").kendoNumericTextBox({ min: 0, spinners: false });

    LoadUnitCombo(1);
    LoadTaskCombo(1);
    getDefault();
    setDefault();
    DisableFeature();

    //New ObjMas Function For EnterEvent And Set DefaultValue 
    NextEnterKyEvent(FormGlblData.FormObjData);
    FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
    Set_AllDefalutValue_Obj();
    FormGlblData.AllValidationObj = Get_All_Validation_Obj();

    //setTimeout(setHdrSectionPropFun, 2000);
    setTimeout(function () {
        CLOSELoadingForm();
        SetFirstFocusObj();
        CheckUserPermission();
        //setTimeout(moreOptionControll, 30000);
    }, 2000);
    $('#idMainDivDetailInvoice').css('display', 'block');
    FindGridDefaultColumns();//find Form
}

function moreOptionControll() { //hide more option button when there's no options
    if (!$('#ButtonSec3').children().length > 0) {
        $('#ButtonSec1_More').hide();
    }
}

function SetTrnDate() {
    if (FormGlblData.ISNeworUpdateTranction == 1) {

        $('#HdrSec1_DatPicDate_Val').kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["dd/MM/yyyy"],
            min: new Date(CdMasModel.TrnMinDate),
            max: new Date(CdMasModel.TrnMaxDate),
            change: onDateChange
        });

    }
    else {
        $('#HdrSec1_DatPicDate_Val').kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["dd/MM/yyyy"],
        });

    }
}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec3');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec4');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec6');
    setHdrSectionProp('ChildHdrpart', viewBag.ObjKy, '', 'HdrSec7');
    setHdrSectionProp('ChildHdrpart', viewBag.ObjKy, '', 'HdrSec5');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    // ------------

    HideSectnFrmtGrp();
}

function setHeight() {
    var height = $(window).height();
    var hButtonSet = $("#ButtonSet").height();
    var hHdrPart = $("#HdrPart").height();
    var hChildHdrpart = $("#ChildHdrpart").height();
    var id = ("#" + viewBag.OurCd);
    var gridElement = $(id);
    var dataArea = gridElement.find(".k-grid-content");
    dataArea.height(height - (330 + hButtonSet + hHdrPart + hChildHdrpart));
}

function DisableFeature() {
    var cmbPmt = $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox");
    var HdrSec3_CmbCurrncy_Cd = $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox");
    var ourcd = viewBag.OurCd;
    if (ourcd == "GRN") {
        $("#Podiv").show();
    } else {
        $("#HdrPo").hide();
        $("#HdrPoQtyTxt").hide();
    }

}

function isNumberOnlyTextField(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function setLocation() {
    $.ajax({
        url: urlTransactionGetFromLocList,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            TrnTyp: "ItmTrn"
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {
            if (list.isDefault == 1) {
                for (i = 0; i < list.length; i++) {
                    var CdKy = list[0].CdKy;
                    var CdNm = list[0].CdNm;
                    var Code = list[0].Code;
                    //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(CdKy);
                    //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").text(CdNm);
                    $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(CdKy);
                    $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").text(Code);
                }
            }
        },
        error: function (e) { }
    });
}

function setdefaultfeature(ourcd) {
    var ConCd = "TrnTyp"
    $.ajax({
        url: urlTransactionGetPurAcList,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ConCd: ConCd,
            OurCd: ourcd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {
            if (list.isDefault == 1) {
                for (i = 0; i < list.length; i++) {
                    var AccKy = list[0].AccKy;
                    var AccNm = list[0].AccNm;

                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(AccKy);
                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").text(AccNm);
                    //$("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(AccKy);
                    //$("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").text(AccNm);
                }
            }
        },
        error: function (e) { }
    });
}

function CreateNewGridRow() { }

$("#HdrSec1_DatPicDate_Val").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 2009),
    change: function () {
        FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    }
});
$("#HdrSec1_DatPicDate_Val").closest("span.k-datepicker").width('100%');

$("#HdrSec1_InptYurRef_ValDate").width(150).kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(2009, 2, 31)
});
$("#HdrSec1_InptYurRef_ValDate").closest("span.k-datepicker").width(150);

function LoadTaskCombo(PrjKy) {

    $("#HdrSec5_CmbTask_Cd").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskId",
        dataSource: TaskDatasource(PrjKy),
        change: function (e) {
            var validate = ComboValidations("HdrSec5_CmbTask_Cd");
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmCd.."
    });

    $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").input.keypress(function (e) {

        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            var LiNo = FormGlblData.Detail_Editing_LiNo;
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

}


function LoadUnitCombo(ItmKy) {

    $("#HdrSec5_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitDatasource(ItmKy),
        change: function (e) {
            var validate = ComboValidations("HdrSec5_CmbUnit_Cd");
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Unit"
    });

    $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").input.keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            var LiNo = FormGlblData.Detail_Editing_LiNo;
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });
}

function Anly3Datasource() {
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlTransactionGetAnlTyp,
                    data: {
                        ConCd: "AnlTyp3"
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function GetAdrKyByAccKy(AccKy) {
    $.ajax({
        url: urlTransactionGetAdrKy,
        data: JSON.stringify({
            AccKy: AccKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var AdrKy = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
               // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
            }
        },
        error: function (e) {
            return false;
        }
    });

}
function GetAccKyByAdrKy(AdrKy) {
    $.ajax({
        url: urlTransactionGetAccKy,
        data: JSON.stringify({
            AdrKy: AdrKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var AccKy = data[0].AccKy;
              //  $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
            }
        },
        error: function (e) {
            return false;
        }
    });

}


function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        var dataSource = new kendo.data.DataSource({

            batch: true,
            sort: ({ field: "DisplayLiNo", dir: "desc" }),
            pageSize: 100,
            schema: {
                model: {
                    id: "ItmTrnKy",
                    fields:
                    {
                        ItmTrnKy: { editable: true, nullable: false, type: "number" },
                        LiNo: { editable: false, nullable: false, type: "number" },
                        DisplayLiNo: { editable: true, nullable: false, type: "number" }, 
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        OrdDetKy: { editable: false, nullable: false, type: "number" },

                        ItmCd: { editable: false, nullable: false, type: "string" },
                        ItmNm: { editable: false, nullable: false, type: "string" },
                        Unit: { editable: true, nullable: false },
                        UnitKy: { editable: true, nullable: false },
                        Des: { editable: true, nullable: false, type: "string" },
                        POQty: { editable: true, nullable: false, type: "number" },
                        ReMnQty: { editable: true, nullable: false, type: "number" },
                        TrnQty: { editable: true, nullable: false },
                        TrnRate: { editable: true, nullable: false, type: "number" },
                        SubTotal: { editable: true, nullable: false, type: "number" },
                        DisAmt: { editable: true, nullable: false, type: "number" },
                        DisPer: { editable: true, nullable: false, type: "number" },
                        GrossTotal: { editable: true, nullable: false, type: "number" },
                        VatAmt: { editable: true, nullable: false, type: "number" },
                        VAT: { editable: true, nullable: false, type: "number" },
                        WHT: { editable: true, nullable: false, type: "number" },
                        WHTAmt: { editable: true, nullable: false, type: "number" },
                        NBTAmt: { editable: true, nullable: false, type: "number" },
                        NBT: { editable: true, nullable: false, type: "number" },
                        SVatAmt: { editable: true, nullable: false, type: "number" },
                        SVAT: { editable: true, nullable: false, type: "number" },
                        NetTotal: { editable: true, nullable: false, type: "number" },
                        Rem: { editable: true, nullable: false, type: "string" },
                        Anl3Ky: { editable: true, nullable: false, type: "number" },
                        Anl3Cd: { editable: true, nullable: false, type: "string" },
                        IsAct: { editable: true, nullable: false, type: "number" }
                    }
                }
            }
        });

        var id = ("#" + viewBag.OurCd);

        $(id).kendoGrid({
            dataSource: dataSource,
            autobind: true,
            height: "300px",
            navigatable: true,
            filterable: {
                mode: "row"
            },
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,
            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,
            resizable: true,
            dataBound: onDataBound,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
           // editable: true,
        });
    }
}


function LoadGridView1(PrjKy) {

    var columnsDefine = [
        { field: "ItmTrnKy", title: "ItmTrnKy", width: "100px", hidden: true },
        { field: "LiNo", title: "Li No", width: "100px", hidden: true }, 
        {
            field: "DisplayLiNo", title: "Display LiNo", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        }, 
        { field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
        { field: "OrdDetKy", title: "OrdDetKy", width: "100px", hidden: true },
        { field: "ItmCd", title: "Item code", width: "150px" },
        { field: "ItmNm", title: "Item Name", width: "350px" },
        {
            field: "Unit", title: "Unit", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "UnitKy", title: "Unit", width: "100px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "POQty", title: "POQty", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ReMnQty", title: "ReMnQty", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnQty", title: "Qty", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnRate", title: "Trn Rate", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "SubTotal", title: "SubTotal", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "DisPer", title: "Discount %", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "DisAmt", title: "Discount", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "GrossTotal", title: "GrossTotal", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "VAT", title: "VAT %", width: "150px", hidden: false, format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "VatAmt", title: "VAT Amount", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "WHT", title: "WHT %", width: "150px", hidden: false, format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "WHTAmt", title: "WHT Amount", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "NBT", title: "NBT %", width: "150px", hidden: false, format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "NBTAmt", title: "NBT Amount", width: "150px", hidden: false, format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "SVAT", title: "SVAT %", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "SVatAmt", title: "SVAT Amount", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "NetTotal", title: "NetTotal", width: "150px", format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        { field: "Des", title: "Description", width: "350px" },
        { field: "Rem", title: "Remarks", width: "250px" },
        {
            field: "Anl3Ky", title: "IssuTo", width: "150px", hidden: true,
            editor: function (container, options) {
            }
        },
        {
            field: "Anl3Cd", title: "Analysis3", width: "150px",
            editor: function (container, options) {
            }
        },
        {
            field: "IsAct", title: "IsAct", width: "20px", hidden: true,
            editor: function (container, options) {
            }
        },
        {
            width: "60px",
            template: kendo.template($("#command-template").html())
        }
    ];

    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);

}

function sendPrjKy() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: urlTransactionsendPrjKy,
        data: {
            strPrjKy: $("#cmbFmPrjId").val(),
        },
        success: function (data) { }
    })
}

$("#HdrSec3_NmricExRate_Val").kendoNumericTextBox({
    min: 0.0000,
    decimals: 4,
    format: "n4",
    spinners: false
}).focus(function () {
    var input = $(this);
    setTimeout(function () {
        input.select();
    });
});

function SaveNewFunction() {
    FormGlblData.isSaveandNew = 1;
    ComSaveFunction();
}

function Remember() {
    var grid = $("#grid").data("kendoGrid");
    dataView = grid.dataSource.view();
    var rowObjs = grid.tbody[0].rows;
    var today = new Date();
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();

    for (var i = 0; i < dataView.length; i++) {
        var row = rowObjs[i];
        if (dataView[i].NxtActDt === dt) {
        }
    }
}

function GridOnDataBinding(arg) {
    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
}

function ComClearWithOutDefaultSetting(setDefault, whereFrom) {

    FormGlblData.ISNeworUpdateTranction = 1;
    SetTrnDate();
    document.getElementById('mdul_Lbl_ObjCptn').innerHTML = "( Open )"; 
    document.getElementById('mdul_Lbl_ObjCptnMobile').innerHTML = "( Open )";
    $("#btnNxtStatesAction").hide();
    $("#cmbNxtStatesActions").data('kendoDropDownList').value(null);

    FormGlblData.Detail_Editing_LiNo = 0;
    try {
        $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value(null);
       // $("#HdrSec2_CmbAdr_Nm").data('kendoComboBox').value(null);
    } catch (e) { }

    try {
        $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
        $("#HdrSec2_CmbAcc_Cd").data('kendoComboBox').value(null);
    } catch (e) { }

   // $("#HdrSec2_CmbAcc_Nm").data('kendoComboBox').value(null);
    try {
        $("#HdrSec2_CmbContractAcc_Cd").data('kendoComboBox').value(null);
       // $("#HdrSec2_CmbContractAcc_Nm").data('kendoComboBox').value(null);
    } catch (e) { }


    $("#HdrSec1_InptYurRef_Val").val(null);
    $("#HdrSec1_InptDocNo_Val").val(null);

    FormGlblData.TrnKy = 1;
    FormGlblData.RecKy = 1;
    $("#OrdNo1").val(null);

    $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value(null);
  //  $("#HdrSec2_CmbLoc_Nm").data('kendoComboBox').value(null);
    $("#HdrSec2_CmbPrj_Cd").data('kendoComboBox').value(null);
  //  $("#HdrSec2_CmbPrj_Nm").data('kendoComboBox').value(null);

    $('#HdrSec6_InptDesc_Val').val("");
    $('#HdrSec6_InptRemark_Val').val("");
    $('#HdrSec7_InptDesc_Val').val("");
    $('#HdrSec7_InptRemark_Val').val("");

    $("#HdrSec4_InptSubTotal_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_InptCrossTotalAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec3_NmricExRate_Val").data("kendoNumericTextBox").value(1);

    $("#HdrSec3_NmricExRate_Val").data("kendoNumericTextBox").value(1);
    try {
        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);
      //  $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
    } catch (e) { }

    $("#HdrSec5_CmbItm_Val").val("");
    document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';
    FormGlblData.Detail_Editing_LiNo = 0;

    $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value(null);
    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(null);
    $("#HdrPOQty").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricCrossTotal_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricNetTotal_Val").data("kendoNumericTextBox").value(null);

    $("#POrdNo").val(null);
    $("#POrdKy").val(null);

    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').val(todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear());
    $("#HdrSec1_DatPicDate_Val").data("kendoDatePicker").trigger("change");
    var id = ("#" + viewBag.OurCd);
    $(id).data("kendoGrid").dataSource.filter(null);
    var grid = $(id).data("kendoGrid");
    grid.dataSource.data([]);

    if (setDefault) {
        Clear_AllDefalutValue_Obj();
        FormGlblData.isSaveandNew = 0;
    } else if (whereFrom == "FindInvoice") {
        OkGRNAfterClear();
    }

    try {
        $("#ButtonSec1_AttachImage").removeClass("control-button attachments");
        $("#ButtonSec1_AttachImage").addClass("control-button attach");
    }
    catch (e) { }
}

function ComClearFunction() {   
    $("#pager").hide();
    var setDefault = true;
    ComClearWithOutDefaultSetting(setDefault, "whereFrom");
}

function CallItmNmWindow() {
    $("#ResourceAnalysisWinForChild").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "Find"
    });
    $('#ResourceAnalysisWinForChild').data('kendoWindow').center().open();
}

function GetInvoiceAccountsDetail(ordKy) {
    $.ajax({
        url: urlTransactionGetInvoiceAccountsDetail,
        data: JSON.stringify({
            ordKy: ordKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
               // $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);

                var PrjKy = data[0].PrjKy;
                $("#cmbFmPrjId").data("kendoComboBox").value(PrjKy);
                $("#cmbFmPrjNm").data("kendoComboBox").value(PrjKy);

                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                //$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);

                var BuKy = data[0].BuKy;
                $("#cmbBUId").data("kendoComboBox").value(BuKy);
                $("#cmbBUCd").data("kendoComboBox").value(BuKy);

                var AdrKy1 = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy1);
               // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy1);

                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.add({
                    ItmTrnKy: data[i].ItmTrnKy,
                    ItmKy: data[i].ItmKy,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    Des: data[i].Des,
                    DisAmt: data[i].DisAmt,
                    DisPer: data[i].DisPer,
                    Rem: data[i].Rem,
                    TrnQty: data[i].Qty,
                    TrnRate: data[i].Rate,
                    SubTotal: data[i].Rate * data[i].Qty,
                    GrossTotal: (data[i].Rate * data[i].Qty) - data[i].DisAmt,
                    ReqDt: data[i].ReqDt
                });
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function GetGrnItemsDetail(ordKy) {
    $.ajax({
        url: urlTransactionGetGRNItemsDetail,
        data: JSON.stringify({
            ordKy: ordKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
               // $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);

                var PrjKy = data[0].PrjKy;
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
              //  $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);

                var AdrKy1 = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy1);
               // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy1);

                var T_Vat = (data[i].Vat / (data[i].Rate * data[i].Qty)) * 100;
                var T_Wht = (data[i].Wht / (data[i].Rate * data[i].Qty)) * 100;
                var T_Nbt = (data[i].NBT / (data[i].Rate * data[i].Qty)) * 100;
                var T_SVat = (data[i].Svat / (data[i].Rate * data[i].Qty)) * 100;

                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.add({
                    ItmTrnKy: data[i].ItmTrnKy,
                    LiNo: data[i].LiNo,
                    ItmKy: data[i].ItmKy,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    PrcsId: data[i].PrcsID,
                    PrcsDetKy: data[i].PrcsDetKy,
                    Des: data[i].Des,
                    DisAmt: data[i].Dsicount,
                    DisPer: data[i].DisPer,
                    Rem: data[i].Rem,
                    TrnQty: data[i].Qty,
                    TrnRate: data[i].Rate,
                    SubTotal: data[i].Rate * data[i].Qty,
                    GrossTotal: (data[i].Rate * data[i].Qty) - data[i].Dsicount,
                    VatAmt: data[i].Vat,
                    WHTAmt: data[i].Wht,
                    NBTAmt: data[i].NBT,
                    SVatAmt: data[i].Svat,
                    VAT: T_Vat,
                    WHT: T_Wht,
                    NBT: T_Nbt,
                    SVAT: T_SVat,
                    NetTotal: (data[i].Rate * data[i].Qty) - data[i].Dsicount + T_Vat + T_Wht + T_Nbt + T_SVat
                });
            }
            CreateNewGridRow();
        },
        error: function (e) {
            return false;
        }
    });
}

var id = ("#" + viewBag.OurCd);
$(id).on("click", ".k-grid-evenselect", function () {
    RemoveFromGrid(this);
});

function seTtem(ourcd) {
    var ConCd = "TrnTyp";
    $.ajax({
        url: urlTransactionGetPurAcList,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ConCd: ConCd,
            OurCd: ourcd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {
            if (list.isDefault == 1) {
                for (i = 0; i < list.length; i++) {
                    var AccKy = list[0].AccKy;
                    var AccNm = list[0].AccNm;

                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(AccKy);
                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").text(AccNm);
                    //$("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(AccKy);
                    //$("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").text(AccNm);
                }
            }
        },
        error: function (e) { }
    });
}

$("#" + viewBag.OurCd).on("keydown", function (event) {
    if ((event.keyCode == 46) || (event.which == 46)) {
        RemoveFromGridByDelKey();
    }

});

function onDateChange(e) {
    var val = $('#HdrSec1_DatPicDate_Val').val();
    var dt = e.sender;
    var value = CheckDateforAutoMonthYear(val);
    var val1 = value.split("/");
    var val2 = val1[1] + "/" + val1[0] + "/" + val1[2];

    var ActualDate = new Date(val2);
    var minVal = new Date(dt.min());
    var maxVal = new Date(dt.max());

    if (value === null) {
        value = kendo.parseDate(dt.element.val(), dt.options.parseFormats);
    }

    if (ActualDate < minVal) {
        dt.value(dt.min());
    } else if (ActualDate > maxVal) {
        dt.value(dt.max());
    }
    else {
        dt.value(value);
    }
}

function onDataBound(e) {
    var id = ("#" + viewBag.OurCd);
    var grid1 = $(id).data("kendoGrid");
    var dataSource = grid1.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].IsAct == 0) {
            grid1.tbody.find("[data-uid='" + dataSource[i].uid + "']").hide();
        }
    }
    ArrangeLiNo();
}

function RemoveFromGrid(clickId) {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var selectedItem = grid.dataItem($(clickId).closest("tr"));
    selectedItem.set("IsAct", 0);
    var answer = grid.tbody.find($(clickId).closest("tr")).hide();
    grid.refresh();
    ArrangeLiNo();


    Calculatetotal();
    CaluculateSubTotal();
    CaluculateDisAmt();
    CaluculateVatAmt();
    CaluculateWHTAmt();
    CaluculateNBTAmt();
    CaluculateSVATAmt();
    CaluculateTotal();
}
function RemoveFromGridByDelKey() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    selectedItem.set("IsAct", 0);
    var answer = grid.tbody.find(grid.select()).hide();
    grid.refresh();
    ArrangeLiNo();

    Calculatetotal();
    CaluculateSubTotal();
    CaluculateDisAmt();
    CaluculateVatAmt();
    CaluculateWHTAmt();
    CaluculateNBTAmt();
    CaluculateSVATAmt();
    CaluculateTotal();
}
function AddInAccessable() {
    var height = $("#filterCont").height();
    alert(height);
    var element = document.createElement("div");
    element.style.cssText = 'position:absolute;top:0px;left:0px;width:99%;height:' + height + 'px;-moz-border-radius:100px;border:1px  solid #ddd;-moz-box-shadow: 0px 0px 8px  #fff;';

    document.body.appendChild(element);
}

function BackDateFutureDateLock(DateVal) {
    var dt = ("#" + DateVal);
    var TrnDateToUpdate = FormGlblData.FromFindDate
    var TrnDateTemp = TrnDateToUpdate.match(/\d+/g),
        TrnDday = TrnDateTemp[0].substring(),
        TrnDmonth = TrnDateTemp[1],
        TrnDyear = TrnDateTemp[2];

    var MindatePart = CdMasModel.TrnMinDate.match(/\d+/g),
        Minyear = MindatePart[0].substring(),
        Minmonth = MindatePart[1],
        Minday = MindatePart[2];

    var MaxdatePart = CdMasModel.TrnMaxDate.match(/\d+/g),
        Maxyear = MaxdatePart[0].substring(),
        Maxmonth = MaxdatePart[1],
        Maxday = MaxdatePart[2];

    var TrnDateToUpdate = new Date(TrnDyear, TrnDmonth - 1, TrnDday, 0, 00, 00);
    var MinDt = new Date(Minyear, Minmonth - 1, Minday, 0, 00, 00);
    var MaxDt = new Date(Maxyear, Maxmonth - 1, Maxday, 0, 00, 00);

    if (TrnDateToUpdate < MinDt || TrnDateToUpdate > MaxDt) {
        FormGlblData.isAllowSaveByBackDate = 0;
    }

}