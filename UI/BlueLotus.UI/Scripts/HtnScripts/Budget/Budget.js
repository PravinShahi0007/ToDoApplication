
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
        }
    });
}


$(document).ready(function () {
    OPENLodingForm();
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'AccBgtTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetCdMasBy_CdKy(TrnTypKy);
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
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, 'ValidationOrder');
            DocReadyCus();
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

function DocReadyCus() {

    LoadDatePickers();
    LoadDropDown();
    setTimeout(function () {
        CLOSELoadingForm();
    }, 4000);
    GridDefaultColumns();
    ClearAll();
}

function LoadDatePickers() {
    $("#HdrSec1_DatBdgDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
            change: onChange,
            //  change: onVauDateChange
        });
    $("#HdrSec1_DatBdgDateSumery_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //var todayDate = new Date();
    $("#HdrSec1_DatBdgDate_Val").data("kendoDatePicker").value(firstDay);
    $("#HdrSec1_DatBdgDateSumery_Val").data("kendoDatePicker").value(firstDay);

    $("#HdrSec1_NmricAmt_Val")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,
            min: 0,
            change: function (e) {
                appendValtoGrid();
            }
        });
}


function LoadDropDown() {

    $("#HdrSec1_CmbHdrAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: AccCd_SelectMob_Datasource('HdrSec1_CmbHdrAcc'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbHdrAcc_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbHdrAcc_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbHdrAcc_Cd").data("kendoComboBox").value(AccKy);
                        $("#HdrSec1_CmbHdrAcc_Nm").data("kendoComboBox").value(AccKy);

                    } else {
                        $("#HdrSec1_CmbHdrAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbHdrAcc_Nm").data("kendoComboBox").value(AccKy);

                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Account"
        });

    $("#HdrSec1_CmbHdrAcc_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNm",
            dataSource: AccNm_SelectMob_Datasource('HdrSec1_CmbHdrAcc'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbHdrAcc_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbHdrAcc_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbHdrAcc_Cd").data("kendoComboBox").value(AccKy);
                        $("#HdrSec1_CmbHdrAcc_Nm").data("kendoComboBox").value(AccKy);

                    } else {
                        $("#HdrSec1_CmbHdrAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbHdrAcc_Nm").data("kendoComboBox").value(AccKy);

                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Account"
        });


    $("#HdrSec1_CmbBU_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: Code_SelectMob_Datasource('HdrSec1_CmbBU'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbBU_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbBU_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value(AccKy);
                        $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(AccKy);

                    } else {
                        $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(AccKy);

                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Account"
        });

    $("#HdrSec1_CmbBU_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbBU'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbBU_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbBU_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value(AccKy);
                        $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(AccKy);

                    } else {
                        $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(AccKy);

                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Account"
        });


    $("#HdrSec1_CmbPrj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjId",
            dataSource: PrjId_SelectMob_DataSource('HdrSec1_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbPrj_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(AccKy);
                        $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(AccKy);

                    } else {
                        $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(AccKy);

                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Account"
        });

    $("#HdrSec1_CmbPrj_Nm")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjNm",
            dataSource: PrjNm_SelectMob_DataSource('HdrSec1_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbPrj_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(AccKy);
                        $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(AccKy);

                    } else {
                        $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(AccKy);

                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Account"
        });

}


function GridDefaultColumns() {

    var columnsDefine = [
        {
            field: "AccBgtKy",
            title: "AccBgtKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccBgtTypKy",
            title: "AccBgtTypKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "BgtDt",
            title: "BgtDt",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccKy",
            title: "AccKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "BuKy",
            title: "BuKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "PrjKy",
            title: "PrjKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "DocNo",
            title: "DocNo",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "Amt",
            title: "Amt",
            width: "100px",
            format: "{0:N2}",
            decimals: 3,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="GrdAmt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoNumericTextBox({
                    change: function (e) {
                        setTotaltoHdr();
                    }
                });
            }

        },
        {
            field: "PrntKy",
            title: "PrntKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "Lvl",
            title: "Lvl",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "SO",
            title: "SO",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "isLeaf",
            title: "isLeaf",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "isRoot",
            title: "isRoot",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AcsLvlKy",
            title: "AcsLvlKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "ConFinLvlKy",
            title: "ConFinLvlKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "Sky",
            title: "Sky",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "Maint",
            title: "Maint",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "OrgKy",
            title: "OrgKy",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        }
    ]
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', 1);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        // sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 12,
        schema: {
            model: {
                id: "AccBgtKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    AccBgtKy: { editable: false, nullable: false, type: "number" },
                    AccBgtTypKy: { editable: true, nullable: false, type: "number" },
                    BgtDt: { editable: true, nullable: false, type: "string" },
                    AccKy: { editable: true, nullable: false, type: "string" },
                    BuKy: { editable: true, nullable: false, type: "string" },
                    PrjKy: { editable: true, nullable: true, type: "string" },
                    DocNo: { editable: true, nullable: true, type: "string" },
                    Amt: { editable: true, nullable: false, type: "number" },
                    PrntKy: { editable: true, nullable: false, type: "string" },
                    Lvl: { editable: true, nullable: false, type: "string" },
                    SO: { editable: true, nullable: false, type: "string" },
                    isLeaf: { editable: true, nullable: false, type: "string" },
                    isRoot: { editable: true, nullable: false, type: "boolean" },
                    AcsLvlKy: { editable: true, nullable: false, type: "number" },
                    ConFinLvlKy: { editable: true, nullable: false, type: "number" },
                    Sky: { editable: true, nullable: false, type: "number" },
                    Maint: { editable: false, nullable: false, type: "string" },
                    OrgKy: { editable: false, nullable: false, type: "string" },


                }
            }
        }
    });

    $("#BudGetGrid")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            editable: true,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            //    dataBound: onDataBound,
            //   pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}

function SearchBudget() {
    var accKy = $("#HdrSec1_CmbHdrAcc_Cd").data("kendoComboBox").value();
    if (!accKy) {
        alert("Please Select an Account");
    }

    var buKy = $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value();
    if (!buKy) {
        buKy = 1;
    }
    var prjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    if (!prjKy) {
        prjKy = 1;
    }

    var BdJDate = document.getElementById("HdrSec1_DatBdgDate_Val").value;// $("#HdrSec1_DatBdgDate_Val").data("kendoDatePicker").value();
    var HdrDetail = new Object();
    HdrDetail.BgtDt = BdJDate;
    HdrDetail.AccKy = accKy;
    HdrDetail.BuKy = buKy;
    HdrDetail.PrjKy = prjKy;

    $.ajax({
        url: getBudget,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            JsonString: JSON.stringify(HdrDetail),
            ObjKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (CdMasModelData) {
          //  var dataSource = $('#BudGetGrid').data('kendoGrid').dataSource;

            var grid = $('#BudGetGrid').data("kendoGrid"),
                dataSource = new kendo.data.DataSource({
                    data: CdMasModelData
                });
            grid.setDataSource(dataSource);
            $('#BudGetGrid').data('kendoGrid').dataSource.read();
            $('#BudGetGrid').data('kendoGrid').refresh();
            setTotaltoHdr();
        }
    });

    
}

function setDate(Date) {
    var today = Date;
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today
}


function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
    // $("#HdrSec1_InptDocNo_Val").focus();
}


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
//
function appendValtoGrid() {
    var grid = $("#BudGetGrid").data("kendoGrid");
    var ttlrec = grid.dataSource.total();;
    if (ttlrec <= 0) {
        alert("You sould Load An Account First");
        $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value(0);
        return;
    }


    var amount = $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value();
    var MonthVal = amount / 12;

    

    for (var i = 0; i < ttlrec; i++) {
        var EditingItem = $("#BudGetGrid").data().kendoGrid.dataSource.data()[i];
        EditingItem.set("Amt", MonthVal);
    }
}

function setTotaltoHdr() {
    var grid = $("#BudGetGrid").data("kendoGrid");
    if (grid == undefined)
        return 0;
    var currentData = grid.dataSource.data();
    var newValue = 0;
    for (var i = 0; i < currentData.length; i++) {
        var tempamt = parseFloat(currentData[i].Amt);
            newValue = newValue + tempamt;
        
    }
    $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value(newValue);


}


function SaveAndUpdate() {
    var ttlAmt = $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value();
    if (ttlAmt <= 0) {
        alert("You should add Some Budjet Fugures First");
        Return;
    }
    var updatedRecords = [];
    var newRecords = [];
    var grid = $("#BudGetGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i]) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].AccBgtKy.dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
        
    }
    $.ajax({
        url: saveUpdateBudget,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            InsertedRecord: JSON.stringify(newRecords),
            UpdatedRecord: JSON.stringify(updatedRecords),
            AccBgtTypKy:FormGlblData.TrnTypKy,
            ObjKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Status) {
            if (Status.AccKy > 0) {
                alert("Save Sucessfully");
                clearGri();
                SearchBudget();
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

function ClearAll() {
    clearGri();
    clearHdr();
}

function clearGri() {
    try {
        $("#BudGetGrid").data("kendoGrid").dataSource.data([]);
    } catch (e) {

    }
   
  
}

function clearHdr() {
    $("#HdrSec1_CmbHdrAcc_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbHdrAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value("");
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //var todayDate = new Date();
    $("#HdrSec1_DatBdgDate_Val").data("kendoDatePicker").value(firstDay);
    $("#HdrSec1_DatBdgDateSumery_Val").data("kendoDatePicker").value(firstDay);
    $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value(0);
}

function onChange() {

    var BdJDate = document.getElementById("HdrSec1_DatBdgDate_Val").value;
    var res = BdJDate.split('/');
    if (res[0] != 1) {
        alert("You should Select begining of the month");
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        $("#HdrSec1_DatBdgDate_Val").data("kendoDatePicker").value(firstDay);
        $("#HdrSec1_DatBdgDateSumery_Val").data("kendoDatePicker").value(firstDay);
    }


}