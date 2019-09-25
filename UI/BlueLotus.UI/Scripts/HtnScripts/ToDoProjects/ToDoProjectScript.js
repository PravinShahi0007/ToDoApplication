var FormGlblData = {
    FormObjData: null,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    RecKy: 1,
    PrjHdrAprKy: 1,
    TblNm: 'PrjHdr',
    ImgOurCd:"",
    FrozenColumns: 0,
    Gridcolumns: []
}

$(document).ready(function () {

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'PrjTyp',
            OurCd: URLPrjTyp
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (PrjTypKy) {

            FormGlblData.PrjTypKy = PrjTypKy;
            GetFormObjData();
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
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    setTimeout(setHdrSectionPropFun, 2000);
    HTNPaginationCtrlData.PageSize = 1100;
    $("#PrjDt").kendoDatePicker({ format: "dd MMMM yyyy" });
    var h = 36
    var i = $("#filterCont").height();
    var PaginationControlH = $("#idPager").height() + 37;
    var height = ($(window).height()) - (150 + h + PaginationControlH);
    $("#ProjectGrid").height(height);
    LoadGridViewColumn();
    LoadStatusCombo();
    DatePickerLoad();
}

var CdMas_LookupWebByConCdDataSrc = function (ConCd) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlCodes.CdMas_LookupWebByConCd,
                  data: {
                      ConCd: ConCd
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function GoToHome() {
    window.location = URLGoToHome;
}

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data('kendoComboBox').value("");
    }
}

function GetAllProjectTypes() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLGetAllProjectTypes,
                  data: {

                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LoadCombo() {

    $("#prjTyp").kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetAllProjectTypes(),
        change: function (e) {
            var cmb = $("#prjTyp").data("kendoComboBox");
            var emp = cmb.value();
            ComboValidations("prjTyp");
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project type.."
    });
}

function DistroyGrid() {
    $("#ProjectGrid").kendoGrid({
        dataSource: null
    });
}

function HideColumn(index) {
    var grid = $("#ProjectGrid").data("kendoGrid");
    grid.hideColumn(index);
    $("#cbs" + index + "").attr('checked', false);
}

function ShowColumn(index) {
    var grid = $("#ProjectGrid").data("kendoGrid");
    grid.showColumn(index);
    $("#cbh" + index + "").attr('checked', false);
}

function GridOnDataBinding(arg) {
    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
}

//------------------ Delete Event---------------------------------------------

function deleteme(key) {
    var projKy = key;
    var answer = confirm("Confirm to delete this record");
    if (answer) {
        $.ajax({
            url: URLDeleteProjects,
            dataType: "json",
            type: "POST",
            data: { 'PrjKy': projKy },
            success: function (data) {
                var grid = $("#ProjectGrid").data("kendoGrid");
                grid.dataSource.read();
            },
            error: function (e) {

            }
        });
    }
}

// Ctrl + S to Save
$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        Save();
    }
});

// Esc key to cancel
$(document.body).keydown(function (e) {
    if (e.keyCode == 27) {
        e.preventDefault();
        CancelGridItem();
    }
});

$("#ProjectGrid").on("keydown", function (event) {
    if ((event.keyCode == 46) || (event.which == 46)) {
        var entityGrid = $("#ProjectGrid").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        deleteme(selectedItem.PrjKy);
    }

});

function LoadGridViewColumn() {

    try {
        $('#ProjectGrid').data().kendoGrid.destroy();
        $('#ProjectGrid').empty();
    } catch (e) { }

    var ProjectColumns = [

        { field: "PrjKy", title: "Ref #", width: "100px", locked: true, hidden: true },
            //{ attributes: { style: "text-align:center;" },  field: "PrjPrefixKy", title: "PrjPrefixKy", width: "100px" },


                    { field: "PrjNo", title: "Project No", width: "100px", locked: true },
                    { field: "DocNo", title: "Document No", width: "100px", locked: true },
                    { field: "PrjNm", title: "Project Name", width: "150px", locked: true },
                    { field: "PrntKy", title: "Parent Key", width: "150px" },
                    {
                        field: "PrntCd", title: "Parent Code", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="PrntCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: PrjId_SelectMob_DataSource('PrntCd'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#PrntCd").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("PrntKy", 1);
                                        model.set("PrntCd", "");
                                    } else {
                                        model.set("PrntKy", dataItem.PrjKy);
                                        model.set("PrntCd", dataItem.PrjId);
                                    }
                                },
                                dataValueField: "PrjKy",
                                dataTextField: "PrjId"
                            });
                        }
                    },

        { field: "Alias", title: "Alias", width: "150px" },
        { field: "Status", title: "Status", width: "100px", hidden: true },
                    { field: "NiceClass", title: "NiceClass", width: "100px", hidden: true  },
                    { field: "ItmKy", title: "Item Ky", width: "150px" },
                    {
                        field: "ItmCd", title: "Item Code", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="ItmCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: ItmCd_SelectMob_Datasource('ItmCd'),
                                filter: "startswith",
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#ItmCd").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("ItmKy", 1);
                                        model.set("ItmCd", "");
                                    } else {
                                        model.set("ItmKy", dataItem.ItmKy);
                                        model.set("ItmCd", dataItem.ItmCd);
                                        LoadSerlNo(container, options);
                                    }
                                },
                                dataValueField: "ItmKy",
                                dataTextField: "ItmCd"
                            });
                        }
                    },
                    {
                        field: "LCSerNo", title: "LC SerNo", width: "150px",
                        editor: function (container, options) {

                        }
                    },
                    { field: "SerNoKy", title: "SerlNo Key", width: "150px" },
                    {
                        field: "SerNo", title: "Serial No", width: "150px",
                        editor: function (container, options) {
                            LoadSerlNo(container, options);
                        }
                    },
                    { field: "MeterReading", title: "Meter Reading", width: "150px" },

                    {
                        field: "AccKy", title: "Customer Key", width: "100px", hidden: true,
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="AccKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: AccNmType_SelectMob_Datasource('AccKy'),
                                change: function (e) {
                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#AccKy").data("kendoComboBox");
                                    var val = cmb.value();
                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("AccKy", 1);
                                        model.set("AccNm", "");
                                    } else {
                                        model.set("AccKy", dataItem.AccKy);
                                        model.set("AccNm", dataItem.AccNmTyp);
                                    }
                                },
                                dataValueField: "AccKy",
                                dataTextField: "AccNmTyp"
                            });
                        }
                    },
                    {
                        field: "AccNm", title: "Customer Name", width: "100px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="AccNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: AccNmType_SelectMob_Datasource('AccNm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#AccNm").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("AccKy", 1);
                                        model.set("AccNm", "");
                                    } else {
                                        model.set("AccKy", dataItem.AccKy);
                                        model.set("AccNm", dataItem.AccNmTyp);
                                    }
                                },
                                dataValueField: "AccKy",
                                dataTextField: "AccNmTyp"
                            });
                        }
                    },
                    { field: "BUKy", title: "BUKy", width: "100px", hidden: true },
                    {
                        field: "BUNm", title: "Business Unit", width: "100px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="BUNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('BUNm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#BUNm").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("BUKy", 1);
                                        model.set("BUNm", "");
                                    } else {
                                        model.set("BUKy", dataItem.CdKy);
                                        model.set("BUNm", dataItem.CdNm);
                                    }
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm"
                            });
                        }
                    },
                    { field: "YurRef", title: "Your Reference", width: "100px" },
                    {
                        field: "YurRefDt", title: "Your Reference Date",
                        //editor: function (container, options) {
                        //    var model = options.model;
                        //    $('<input id="YurRefDt" name="' + options.field + '"/>').appendTo(container).kendoDatePicker({
                        //        change: function (e) {
                        //            model.set("YurRefDt", e.sender._oldText);
                        //        },
                        //    });
                        //},
                        //template: "#= kendo.toString(kendo.parseDate(YurRefDt, 'dd-MM-yyyy'), 'dd/MM/yyyy') #"
                        format: "{0:dd/MM/yyyy}", width: "120px"
                    },
                    { field: "PrjDt", title: "Project Date", format: "{0:dd/MM/yyyy}", width: "120px" },
                    {
                        field: "isAct", title: "Is Active", width: "100px",
                        template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isActPinChecked"></input>',
                    },
                    {
                        field: "isApr", title: "Is Approved", width: "100px",
                        template: '<input type="checkbox"  #= isApr? "checked=checked" : "" # class="isAprPinChecked"></input>',
                    },
                    {
                        field: "isPrnt", title: "Is Parant", width: "100px",
                        template: '<input type="checkbox"  #= isPrnt? "checked=checked" : "" # class="isPrntPinChecked"></input>',
                    },
                    {
                        field: "isAlwTrn", title: "isAlwTrn", width: "100px",
                        template: '<input type="checkbox"  #= isAlwTrn? "checked=checked" : "" # class="isAlwTrnPinChecked"></input>',
                    },

                    { field: "AcsLvlKy", title: "accLvlKy", width: "100px" },
                    {
                        field: "accLvlNm", title: "Access Level Name", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="cmbAcsLvlKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('accLvlNm'),
                                change: function (e) {
                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);
                                    model.set("AcsLvlKy", dataItem.CdKy);
                                    model.set("accLvlNm", dataItem.CdNm);
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },
                    {
                        field: "conLvlNm", title: "Confidential Level Name", width: "150px", hidden: true,

                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="cmbConFinLvlKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('conLvlNm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("ConFinLvlKy", dataItem.CdKy);
                                    model.set("conLvlNm", dataItem.CdNm);
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },
                    { field: "PrjStDt", title: "Project Start Date", format: "{0:dd/MM/yyyy}", width: "120px" },
                    { field: "PlnStDt", title: "Plan Start Date", format: "{0:dd/MM/yyyy}", width: "120px" },
                    { field: "PlnFinDt", title: "Plan Finished Date", format: "{0:dd/MM/yyyy}", width: "120px" },
                    { field: "ExpiryDt", title: "Expiry Date", format: "{0:dd/MM/yyyy}", width: "120px" },
                    { field: "DisPer", title: "Discount %", width: "150px", type: Number },
                    { field: "CtrtAmt", title: "CtrtAmt", width: "150px", format: "{0:N2}" },
                    { field: "ContegencyAmt", title: "Contegency Amount", width: "150px", type: Number },
                    { field: "LiqdRate", title: "Liqudation Rate", width: "150px", hidden: true },
                    { field: "Amt1", title: "Amount 1", width: "150px", },
                    { field: "Amt2", title: "Amount 2", width: "150px" },
                    { field: "MarPer", title: "Markup %", width: "150px", hidden: true },
                    { field: "Des", title: "Description", width: "250px" },
                    { field: "Rem", title: "Remarks", width: "250px" },
                    { field: "RetnPer", title: "Retention %", width: "150px" },
                    { field: "MaxRetnPer", title: "Max Retention Period", width: "150px" },
                    { field: "RetnPeriod", title: "Retention Period", width: "150px", hidden: true },
                    { field: "RetnDays", title: "RetnDays", width: "100px", type: Number },
                    { field: "PlnYY", title: "Plan Year", width: "100px", type: Number },
                    { field: "PlnMM", title: "Plan Month", width: "100px", type: Number },
                    { field: "PlnDD", title: "Plan Date", width: "100px" },
                    { field: "PmtLagDay", title: "Payment Lag Day", width: "120px" },
                    { field: "FinancePer", title: "Finance %", width: "150px" },
                    { field: "AdvPer", title: "Advanced %", width: "150px", hidden: true },
                    { field: "AdvDedPer", title: "Advanced Deduction %", width: "150px" },
                    { field: "Guarantee", title: "Guarantee", width: "150px" },
                    { field: "CostAdvBond", title: "CostAdvBond", width: "150px", hidden: true },
                    { field: "CostPerfBond", title: "CostPerfBond", width: "150px", hidden: true },
                    { field: "Tax1", title: "Tax 1", width: "150px" },
                    { field: "Tax2", title: "Tax 2", width: "150px" },
                    { field: "Tax3", title: "Tax 3", width: "150px" },
                    { field: "FinDt", title: "Finished Date", format: "{0:dd/MM/yyyy}", width: "120px" },
                    { field: "SO", title: "SO", width: "100px", hidden: true },
                    { field: "Acres", title: "Acres", width: "150px", hidden: true },
                    { field: "Root", title: "Root", width: "150px" },
                    { field: "Perch", title: "Perch", width: "150px" },
                    { field: "North", title: "North", width: "150px" },
                    { field: "East", title: "East", width: "150px" },
                    { field: "West", title: "West", width: "150px" },
                    { field: "South", title: "South", width: "150px" },
                    { field: "PermitNo", title: "Permit No", width: "150px" },
                    { field: "DeedNo", title: "Deed No", width: "150px" },
                    {
                        field: "PermitDate", title: "Permit Date",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="PermitDate" name="' + options.field + '"/>').appendTo(container).kendoDatePicker({
                                change: function (e) {
                                    model.set("PermitDate", e.sender._oldText);
                                }
                            });
                        },
                        format: "{0:dd/MM/yyyy}",
                        template: "#= kendo.toString(kendo.parseDate(PermitDate), 'dd/MM/yyyy') #",
                        width: "120px"
                    },
                    {
                        field: "DeedDate",
                        title: "Deed Date",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="DeedDate" name="' + options.field + '"/>').appendTo(container).kendoDatePicker({
                                change: function (e) {
                                    model.set("DeedDate", e.sender._oldText);
                                }
                            });
                        },
                        format: "{0:dd/MM/yyyy}",
                        template: "#= kendo.toString(kendo.parseDate(DeedDate), 'dd/MM/yyyy') #",
                        width: "120px"
                    },
                    { field: "Distance", title: "Distance", width: "100px" },
                    { field: "DistanceUnitKy", title: "Distance Unit Key", width: "100px", hidden: true },

                    //// Start PrjCat 1
                    {
                        field: "PrjCat1Nm",
                        title: "Project Category 1",
                        width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="cmbPrjCat1" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('PrjCat1Nm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#cmbPrjCat1").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("PrjCat1Ky", 1);
                                        model.set("PrjCat1Nm", "");
                                    } else {
                                        model.set("PrjCat1Ky", dataItem.CdKy);
                                        model.set("PrjCat1Nm", dataItem.CdNm);
                                    }
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm"
                            });
                        }

                    },
                    { field: "PrjCat1Ky", title: "Project Category 1", width: "150px", hidden: true },

                    //// End PrjCat 1

                    //// Start PrjCat 2
                    {
                        field: "PrjCat2Nm",
                        title: "Project Category 2",
                        width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="cmbPrjCat2" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('PrjCat2Nm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#cmbPrjCat2").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("PrjCat2Ky", 1);
                                        model.set("PrjCat2Nm", "");
                                    } else {
                                        model.set("PrjCat2Ky", dataItem.CdKy);
                                        model.set("PrjCat2Nm", dataItem.CdNm);
                                    }
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm"
                            });
                        }

                    },
                    { field: "PrjCat2Ky", title: "Project Cat 2", width: "150px", hidden: true },

                    //// End PrjCat 2

                    //// Start PrjCat 3
                    {
                        field: "PrjCat3Nm",
                        title: "Project Category 3",
                        width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="cmbPrjCat3" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('PrjCat3Nm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#cmbPrjCat3").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("PrjCat3Ky", 1);
                                        model.set("PrjCat3Nm", "");
                                    } else {
                                        model.set("PrjCat3Ky", dataItem.CdKy);
                                        model.set("PrjCat3Nm", dataItem.CdNm);
                                    }
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm"
                            });
                        }

                    },
                    { field: "PrjCat3Ky", title: "Project Cat 3", width: "150px", hidden: true },

                    //// End PrjCat 3


                    //// Start PrjCat 4
                    {
                        field: "PrjCat4Nm",
                        title: "Project Category 4",
                        width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="cmbPrjCat4" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('PrjCat4Nm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#cmbPrjCat4").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("PrjCat4Ky", 1);
                                        model.set("PrjCat4Nm", "");
                                    } else {
                                        model.set("PrjCat4Ky", dataItem.CdKy);
                                        model.set("PrjCat4Nm", dataItem.CdNm);
                                    }
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm"
                            });
                        }

                    },
                    { field: "PrjCat4Ky", title: "Project Cat 4", width: "150px", hidden: true },

                    //// End PrjCat 4


                    //// Start PrjCat 5
                    {
                        field: "PrjCat5Nm",
                        title: "Project Category 5",
                        width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="cmbPrjCat5" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('PrjCat5Nm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#cmbPrjCat5").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("PrjCat5Ky", 1);
                                        model.set("PrjCat5Nm", "");
                                    } else {
                                        model.set("PrjCat5Ky", dataItem.CdKy);
                                        model.set("PrjCat5Nm", dataItem.CdNm);
                                    }
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm"
                            });
                        }

                    },
                    { field: "PrjCat5Ky", title: "Project Cat 5", width: "150px", hidden: true },

                    //// End PrjCat 5

                    //// Start PrjCat 6
                    {
                        field: "PrjCat6Nm",
                        title: "Project Category 6",
                        width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            $('<input id="cmbPrjCat6" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('PrjCat6Nm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    var cmb = $("#cmbPrjCat6").data("kendoComboBox");
                                    var val = cmb.value();

                                    if (isNaN(val)) {
                                        alert("'" + val + "' is not a Valid input");
                                        cmb.value("");
                                        model.set("PrjCat6Ky", 1);
                                        model.set("PrjCat6Nm", "");
                                    } else {
                                        model.set("PrjCat6Ky", dataItem.CdKy);
                                        model.set("PrjCat6Nm", dataItem.CdNm);
                                    }
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm"
                            });
                        }

                    },
                    { field: "PrjCat6Ky", title: "Project Cat 6", width: "150px", hidden: true },

                    { field: "Adrky", title: "Adrky", width: "150px", hidden: true },
                    {
                        field: "AdrNm", title: "AdrNm", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="AdrNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: AdrNm_SelectMob_DataSource('AdrNm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("AdrKy", dataItem.AdrKy);
                                    model.set("AdrNm", dataItem.AdrNm);
                                },
                                dataValueField: "AdrKy",
                                dataTextField: "AdrNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },


                    { field: "YurRepAdrKy", title: "YurRepAdrKy", width: "150px", hidden: true },
                    {
                        field: "YurRepAdrNm", title: "YurRepAdrNm", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="YurRepAdrNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: AdrNm_SelectMob_DataSource('YurRepAdrNm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("YurRepAdrKy", dataItem.AdrKy);
                                    model.set("YurRepAdrNm", dataItem.AdrNm);
                                },
                                dataValueField: "AdrKy",
                                dataTextField: "AdrNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },

                    { field: "RepAdrKy", title: "RepAdrKy", width: "150px", hidden: true },
                    {
                        field: "RepAdrNm", title: "RepAdrNm", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="RepAdrNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: AdrNm_SelectMob_DataSource('RepAdrNm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("RepAdrKy", dataItem.AdrKy);
                                    model.set("RepAdrNm", dataItem.AdrNm);
                                },
                                dataValueField: "AdrKy",
                                dataTextField: "AdrNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },

                    { field: "WIPLocKy", title: "WIPLocKy", width: "150px", hidden: true },
                    {
                        field: "WIPLocCd", title: "WIPLocCd", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="WIPLocCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('WIPLocCd'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("WIPLocKy", dataItem.CdKy);
                                    model.set("WIPLocCd", dataItem.CdNm);
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },

                    { field: "PriCtrlLocKy", title: "PriceCtrlLocKy", width: "150px", hidden: true },
                    {
                        field: "PriCtrlLocCd", title: "PriCtrlLocCd", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="PriCtrlLocCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('PriCtrlLocCd'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("PriCtrlLocKy", dataItem.CdKy);
                                    model.set("PriCtrlLocCd", dataItem.CdNm);
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },

                    { field: "SiteStrLocKy", title: "SiteStrLocKy", width: "150px", hidden: true },
                    {
                        field: "SiteStrLocCd", title: "SiteStrLocCd", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="SiteStrLocCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('SiteStrLocCd'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("SiteStrLocKy", dataItem.CdKy);
                                    model.set("SiteStrLocCd", dataItem.CdNm);
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },

                    { field: "CalTypKy", title: "CalTypKy", width: "150px", },
                    { field: "ToChainage", title: "ToChainage", width: "150px", },
                    { field: "StChainage", title: "StChainage", width: "150px", },
                    { field: "TimeStamp", title: "Time Stamp", width: "150px", hidden: true },
                    {
                        field: "isSysRec", title: "isSysRec", width: "100px",
                        template: '<input type="checkbox"  #= isSysRec? "checked=checked" : "" # class="isSysRecPinChecked"></input>',
                    },

                    { field: "PrjStsKy", title: "PrjStsKy", width: "150px", hidden: true },
                    {
                        field: "PrjStsNm", title: "PrjStsNm", width: "150px",
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="PrjStsNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('PrjStsNm'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("PrjStsKy", dataItem.CdKy);
                                    model.set("PrjStsNm", dataItem.CdNm);
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },
                    //-------------------------- Approve Status --------------
                    {
            field: "AprSts", title: "Current Status", width: "70px", hidden: true,
                        editor: function (container, options) {

                        }
                    },
        { field: "AprStsKy", title: "AprStsKy", width: "70px", hidden: true, },
                    {
            field: "NxtAprSts", title: "choose Apr Status", width: "70px", hidden: true,
                        editor: function (container, options) {
                            var model = options.model;
                            var cncod = model.ConCd;
                            $('<input id="NxtAprSts" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                                dataSource: CdNm_SelectMob_Datasource('NxtAprSts'),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);

                                    model.set("NxtAprStsKy", dataItem.CdKy);
                                    model.set("NxtAprSts", dataItem.CdNm);
                                },
                                dataValueField: "CdKy",
                                dataTextField: "CdNm",
                                dataBound: function (e) {
                                }
                            });
                        }
                    },
        { field: "NxtAprStsKy", title: "NxtAprStsKy", width: "70px", hidden: true },
        { field: "isAlwUpdate", title: "isAlwUpdate", width: "70px", hidden: true },
                    {
                        field: "Upload", title: "Image Upload", width: "100px",
                        template: kendo.template($("#command-template").html()),
                        editor: function (container, options) {

                        }
                    },
                    //{
                    //    field: "UploadLogo", title: "Image Upload", width: "100px",
                    //    template: kendo.template($("#command-template").html()),
                    //    editor: function (container, options) {

                    //    }
                    //},
                     {
                         field: "Uploadlogo", title: "Logo", width: "100px",
                         template: kendo.template($("#command-template-logo").html()),
                         editor: function (container, options) {

                         }
                     },
                                        //{
                    //    field: "Upload", title: "Upload", width: "150px", 
                    //    template: "<input name='files' id='files' type='file' data-role='upload' data-async=" +"'" + "{'saveUrl':'http://rces-web/rcesonly/oandt/OandtWebService.asmx/UploadFile', 'autoUpload':'true'}'/>",
                    //    //editor: function fileUploadEditor(container, options) {
                    //    //    $('<input type="file" id="Upload" name="Upload" />')
                    //    //    .appendTo(container)
                    //    //    .kendoUpload({
                    //    //        async: {
                    //    //            saveUrl: "http://rces-web/rcesonly/oandt/OandtWebService.asmx/UploadFile",
                    //    //            autoUpload: false
                    //    //        }
                    //    //    });
                    //    //}
                    //},

    ];

    var gridNo = 1;
    var FinalItmMasColumn = setColumnProp(ProjectColumns, viewBag.ObjKy, '', 'FormGrd', gridNo);


}

$("#HdrSec1_InptPrjId_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        LoadGridViewColumn();
    }
});

$("#HdrSec1_InptPrjNm_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        LoadGridViewColumn();
    }

});

$("#ProjectGrid").on("click", ".k-grid-evenselect", function () {
    // ImgOurCd
    FormGlblData.ImgOurCd = "";
    StartUpLoad(this);
});
$("#ProjectGrid").on("click", ".k-grid-Logoselect", function () {
    FormGlblData.ImgOurCd = "Logo";
    StartUpLoad(this);
});




function StartUpLoad(Clicked) {
    var grid = $("#ProjectGrid").data("kendoGrid");
    var selectedItem = grid.dataItem($(Clicked).closest("tr"));
    selectedItem.PrjKy == null || selectedItem.PrjKy == "" || selectedItem.PrjKy == "0" || selectedItem.PrjKy == undefined || selectedItem.PrjKy <= 10 ? alert("Save this Record and Try Again!")
    : $("#PrjHdrAttachImage").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "Upload Your Images for " + selectedItem.PrjNm
    });
    $('#PrjHdrAttachImage').data('kendoWindow').center().open();
    FormGlblData.RecKy = selectedItem.PrjKy;
    GetImage(FormGlblData.RecKy);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {
    var PrjCd = $("#HdrSec1_InptPrjId_Val").val();
    var PrjNm = $("#HdrSec1_InptPrjNm_Val").val();

    FormGlblData.Gridcolumns = columnsFinal;
    if (gridNo == 1) {
        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: URLGetAllProjectsByPrjTyp,
                    dataType: "json"
                },

                destroy: {
                    url: URLDeleteProjects,
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    type: "POST",
                    complete: function (e) {
                        var grid = $("#ProjectGrid").data("kendoGrid");
                        grid.dataSource.read();
                    }
                },

                parameterMap: function (options, operation) {

                    if (operation == "destroy" && options.models) {
                        return JSON.stringify({ 'list': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>emp
                    }
                    if (operation == "read") {
                        var PrjTyp = URLPrjTyp;
                        return ({
                            'PageNo': HTNPaginationCtrlData.PageNo,
                            'PageSize': HTNPaginationCtrlData.PageSize,
                            'PrjTypKy': FormGlblData.PrjTypKy,
                            'ObjKy': viewBag.ObjKy,
                            'PrjCd': PrjCd,
                            'PrjNm': PrjNm
                        });
                    }
                }
            },
            batch: true,
            pageSize: 100,
            schema: {
                model: {
                    id: "PrjKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        PrjKy: { editable: true, nullable: false, validation: { required: true }, type: "number" },
                        PrjPrefixKy: { editable: true, nullable: false, validation: { required: true }, validation: { required: true }, type: "number" },
                        PrjTypKy: { editable: true, nullable: false, type: "number" },
                        PrjTyp: { editable: true, nullable: false },
                        PrjNo: { editable: true, nullable: false, type: "number", validation: { required: true } },
                        DocNo: { editable: true, nullable: false, validation: { required: true } },
                        PrjNm: { editable: true, nullable: false, validation: { required: true } },
                        YurRef: { editable: true, nullable: false },
                        YurRefDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        AccKy: { editable: true, nullable: false, type: "number" },
                        AccNm: { editable: true, nullable: false, },
                        Adrky: { editable: true, nullable: false, type: "number" },
                        AdrNm: { editable: true, nullable: false },
                        PrjDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        PrjStsKy: { editable: true, nullable: false, type: "number" },
                        isAct: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        isApr: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        isPrnt: { editable: true, nullable: false, type: "boolean" },
                        isAlwTrn: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        AcsLvlKy: { editable: true, nullable: false, type: "number" },
                        ConFinLvlKy: { editable: true, nullable: false, type: "number" },
                        Alias: { editable: true, nullable: false },
                        Upload: { editable: false, nullable: false },
                        AprStsKy: { editable: true, nullable: false, type: "number" },
                        AprSts: { editable: true, nullable: false },
                        NxtAprStsKy: { editable: true, nullable: false, type: "number" },
                        NxtAprSts: { editable: true, nullable: false },
                        isAlwUpdate: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        accLvlNm: { editable: true, nullable: false },
                        conLvlNm: { editable: true, nullable: false },
                        YurRepAdrKy: { editable: true, nullable: false, type: "number" },
                        YurRepAdrNm: { editable: true, nullable: false, },
                        WIPLocKy: { editable: true, nullable: false, type: "number" },
                        WIPLocCd: { editable: true, nullable: false, },
                        PriCtrlLocKy: { editable: true, nullable: false, type: "number" },
                        PriCtrlLocCd: { editable: true, nullable: false, },
                        SiteStrLocKy: { editable: true, nullable: false, type: "number" },
                        SiteStrLocCd: { editable: true, nullable: false, },
                        CalTypKy: { editable: true, nullable: false, type: "number" },
                        ToChainage: { editable: true, nullable: false, type: "number" },
                        StChainage: { editable: true, nullable: false, type: "number" },
                        TmStmp: { editable: false, nullable: false },
                        PrjStDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        PlnStDt: { editable: true, nullable: false, validation: { required: true }, type: "date", format: "{0:dd/MM/yyyy}" },
                        PlnFinDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        ExpiryDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        RepAdrKy: { editable: true, nullable: false, validation: { required: true }, type: "number" },
                        RepAdrNm: { editable: true, nullable: false, },
                        BUKy: { editable: true, nullable: false, type: "number" },
                        BUNm: { editable: true, nullable: false, },
                        BUCd: { editable: false, nullable: false, },
                        LocKy: { editable: false, nullable: false, type: "number" },
                        DisPer: { editable: true, nullable: false, type: "number" },
                        CtrtAmt: { editable: true, nullable: false, type: "number" },
                        ContegencyAmt: { editable: true, nullable: false, type: "number" },
                        LiqdRate: { editable: true, nullable: false, type: "number" },
                        Amt1: { editable: true, nullable: false, type: "number", },
                        Amt2: { editable: true, nullable: false, type: "number" },
                        MarPer: { editable: true, nullable: false, type: "number" },
                        Des: { editable: true, nullable: false },
                        Rem: { editable: true, nullable: false },
                        RetnPer: { editable: true, nullable: false, type: "number" },
                        MaxRetnPer: { editable: true, nullable: false, type: "number" },
                        RetnPeriod: { editable: true, nullable: false, type: "number" },
                        RetnDays: { editable: true, nullable: false, type: "number" },
                        PlnYY: { editable: true, nullable: false, type: "number" },
                        PlnMM: { editable: true, nullable: false, type: "number" },
                        PlnDD: { editable: true, nullable: false, type: "number" },
                        PmtLagDay: { editable: true, nullable: false, type: "number" }, //---
                        FinancePer: { editable: true, nullable: false, type: "number" },
                        AdvPer: { editable: true, nullable: false, type: "number" },
                        AdvDedPer: { editable: true, nullable: false, type: "number" },
                        RetnPeriodUnitKy: { editable: true, nullable: false, type: "number" },
                        Guarantee: { editable: true, nullable: false, type: "number" },
                        CostAdvBond: { editable: true, nullable: false, type: "number" },
                        CostPerfBond: { editable: true, nullable: false, type: "number" },
                        Tax1: { editable: true, nullable: false, type: "number" },
                        Tax2: { editable: true, nullable: false, type: "number" },
                        Tax3: { editable: true, nullable: false, type: "number" },
                        FinDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        PrjSTypKy: { editable: true, nullable: false, type: "number" },
                        PrjCat1Ky: { editable: true, nullable: false, type: "number" },
                        PrjCat1Nm: { editable: true, nullable: false },
                        PrjCat2Ky: { editable: true, nullable: false, type: "number" },
                        PrjCat2Nm: { editable: true, nullable: false },
                        PrjCat3Ky: { editable: true, nullable: false, type: "number" },
                        PrjCat3Nm: { editable: true, nullable: false },
                        PrjCat4Ky: { editable: true, nullable: false, type: "number" },
                        PrjCat4Nm: { editable: true, nullable: false },
                        PrjCat5Ky: { editable: true, nullable: false, type: "number" },
                        PrjCat5Nm: { editable: true, nullable: false },
                        PrjCat6Ky: { editable: true, nullable: false, type: "number" },
                        PrjCat6Nm: { editable: true, nullable: false },
                        PrntKy: { editable: true, nullable: false, type: "number" },
                        PrntCd: { editable: true, nullable: false },
                        SO: { editable: true, nullable: false, type: "number" },
                        Acres: { editable: true, nullable: false, type: "number" },
                        Root: { editable: true, nullable: false, type: "number" },
                        Perch: { editable: true, nullable: false, type: "number" },
                        AdrKy2: { editable: true, nullable: false, type: "number" },
                        North: { editable: true, nullable: false },
                        East: { editable: true, nullable: false },
                        West: { editable: true, nullable: false },
                        South: { editable: true, nullable: false },
                        PermitNo: { editable: true, nullable: false, type: "number" },
                        DeedNo: { editable: true, nullable: false, type: "number" },
                        PermitDate: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        DeedDate: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        BnkKy: { editable: true, nullable: false, type: "number" },
                        BrnKy: { editable: true, nullable: false, type: "number" },
                        Distance: { editable: true, nullable: false, type: "number" },
                        DistanceUnitKy: { editable: true, nullable: false, type: "number" },
                        TimeStamp: { editable: false, nullable: false, hidden: true },
                        ItmKy: { editable: true, nullable: false, type: "number", hidden: false },
                        ItmCd: { editable: true, nullable: false },
                        ItmNm: { editable: true, nullable: false },
                        SerNo: { editable: true, nullable: false },
                        Status: { editable: true, nullable: false },
                        NiceClass: { editable: true, nullable: false },
                        SerNoKy: { editable: true, nullable: false, type: "number", defaultValue: 1 },
                        LCSerNo: { editable: true, nullable: false },
                        MeterReading: { editable: true, nullable: false, type: "number" },
                        isSysRec: { editable: true, nullable: false, type: "boolean" },
                    }
                }
            }
        });

        $(function () {
            $('#ProjectGrid').on('click', '.chkbxAct', function () {
                var checked = $(this).is(':checked');
                var grid = $('#ProjectGrid').data().kendoGrid;
                var selectedItem = grid.dataItem(grid.select());
                var PrjKy = selectedItem.PrjKy;
                if (PrjKy != "") {
                    SetIsActAndIsApr(PrjKy, checked, "IsAct");
                } else {
                    $(this).attr("disabled", true);
                }


            })
        })

        $(function () {
            $('#ProjectGrid').on('click', '.chkbxApr', function () {

                var checked = $(this).is(':checked');
                var grid = $('#ProjectGrid').data().kendoGrid;
                var selectedItem = grid.dataItem(grid.select());
                var PrjKy = selectedItem.PrjKy;
                if (PrjKy != "") {
                    SetIsActAndIsApr(PrjKy, checked, "IsApr");
                } else {
                    $(this).attr("disabled", true);
                }
            });
        });

        function SetIsActAndIsApr(PrjKy, checked, Item) {

            var prjky = PrjKy;
            var chkd = checked;
            var val = 0;
            if (chkd) {
                val = 1;
            }
            var itm = Item;
            $.ajax({
                url: URLSetIsActAndIsApr,
                data: {
                    'PrjKy': prjky,
                    'value': val,
                    'item': Item
                },
                dataType: "json",
                type: 'POST',
                success: function (data) {
                    alert("" + data);
                },
                error: function (e) {
                    //  alert("error");
                }
            });
            var grid = $("#ProjectGrid").data("kendoGrid");
            grid.dataSource.read();
        }



        $("#ProjectGrid").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            filterable: {
                mode: "row"
            },
            navigatable: true,
            sortable: {
                mode: "single",
                allowUnsort: true
            },
            editable: true,
            groupable: true,
            height: '600',
            reorderable: true,
            columnMenu: true,
            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            //toolbar: [{ name: "create", text: "Add new record" }, "save", "cancel"],

            columns: columnsFinal,
            resizable: true,
            reorderable: true,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            dataBound: GridOnDataBound,
            edit: function (e) {
                var input = e.container.find("input");
                input.select();
                try {
                    $("[name='PrjNo']", e.container).blur(function () {
                        var id = ("#ProjectGrid");
                        var grid = $(id).data().kendoGrid;
                        var selectedItem = grid.dataItem($(this).closest('tr'));
                        var PrjNo = selectedItem.PrjNo;
                        //CheckProjectCodeExist(PrjNo, e.model);
                    });

                    $("[name='PrjNm']", e.container).blur(function () {
                        var id = ("#ProjectGrid");
                        var grid = $(id).data().kendoGrid;
                        var selectedItem = grid.dataItem($(this).closest('tr'));
                        var PrjNm = selectedItem.PrjNm;
                        //CheckProjectNmExist(PrjNm, e.model);
                    });

                    $("[name='DocNo']", e.container).blur(function () {
                        var id = ("#ProjectGrid");
                        var grid = $(id).data().kendoGrid;
                        var selectedItem = grid.dataItem($(this).closest('tr')); // grid.select()
                        var DocNo = selectedItem.DocNo;
                        CheckProjectIdExist(DocNo, e.model);
                    });
                    //$("[name='Status']", e.container).blur(function () {
                    //    var id = ("#ProjectGrid");
                    //    var grid = $(id).data().kendoGrid;
                    //    var selectedItem = grid.dataItem($(this).closest('tr'));
                    //    var PrjKy = selectedItem.PrjKy;
                    //    var PrjNo = selectedItem.PrjNo;
                    //    var PrjName = selectedItem.PrjNm;
                    //    ProjectStatus(PrjKy, PrjNo, PrjName);

                    //});
                    //$("[name='NiceClass']", e.container).blur(function () {
                    //    var id = ("#ProjectGrid");
                    //    var grid = $(id).data().kendoGrid;
                    //    var selectedItem = grid.dataItem($(this).closest('tr'));
                    //    var PrjKy = selectedItem.PrjKy;
                    //    var PrjNo = selectedItem.PrjNo;
                    //    var PrjName = selectedItem.PrjNm;
                    //    ProjectNiceClass(PrjKy, PrjNo, PrjName);

                    //});
                } catch (e) { }

            }

        });
    }
}

function insertItem() { var grid = $("#ProjectGrid").data("kendoGrid").addRow(); }

function CancelGridItem() { var grid = $("#ProjectGrid").data("kendoGrid").cancelChanges(); }

function GridOnDataBound(arg) {

    var grid = $("#ProjectGrid").data("kendoGrid");
    var Records = grid.dataSource.data(); Records.length > 0 && grid.select("tr:eq(0)");

    $(grid.tbody)
        .on("click",
        "td",
        function (e) {
            // its for grid PopUp Window Purpose
            for (var TotGridColumn = 0; TotGridColumn < FormGlblData.Gridcolumns.length; TotGridColumn++) {
                if (FormGlblData.Gridcolumns[TotGridColumn].locked == true) { FormGlblData.FrozenColumns++ };
            }
            var row = $(this).closest("tr");
            var rowIdx = $("tr", grid.tbody).index(row);
            var colIdx = $("td", row).index(this);
            var FieldName = $("#ProjectGrid").data("kendoGrid").columns[colIdx + FormGlblData.FrozenColumns].field;
            var FieldTitle = $("#ProjectGrid").data("kendoGrid").columns[colIdx + FormGlblData.FrozenColumns].title;

            //var myVar = $("#ProjectGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            //alert(myVar.DocNo)

            if (FieldName == "LCSerNo") {
                var selectedItemForPrj = grid.dataItem(grid.select());
                var ItmKy = selectedItemForPrj.ItmKy;
                var ItmCd = selectedItemForPrj.ItmCd;
                var ItmNm = selectedItemForPrj.ItmNm;
                var PrjKy = selectedItemForPrj.PrjKy;
                GetItmMasSerNoWindow(ItmKy, ItmCd, ItmNm, FieldTitle, FieldName, PrjKy);
            }
            else if (FieldName == "Status") {
                var selectedItemForPrj = grid.dataItem($(this).closest("tr"));
                var PrjKy = selectedItemForPrj.PrjKy;
                var PrjNo = selectedItemForPrj.DocNo;
                var PrjName = selectedItemForPrj.PrjNm;
                if (PrjKy < 10) {
                    alert("Please Save The Project First Then Add the Status")
                    return;
                }
                ProjectStatus(PrjKy, PrjNo, PrjName);
            }
            else if (FieldName == "NiceClass") {
                var selectedItemForPrj = grid.dataItem($(this).closest("tr"));
                var PrjKy = selectedItemForPrj.PrjKy;
                var PrjNo = selectedItemForPrj.DocNo;
                var PrjName = selectedItemForPrj.PrjNm;
                if (PrjKy < 10) {
                    alert("Please Save The Project First Then Add the Status");
                    return;
                }
                ProjectNiceClass(PrjKy, PrjNo, PrjName);
            }
            FormGlblData.FrozenColumns = 0;
        });


}

function Save() {
    var PrjTyp = URLPrjTyp;
    var grid = $("#ProjectGrid").data("kendoGrid");
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
                url: URLInsertANDUpdate,
                data: JSON.stringify({
                    updateAccmacc: kendo.stringify(updatedRecords),
                    newAccmacc: kendo.stringify(newRecords),
                    'PrjTyp': PrjTyp,
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        SaveItmMasSerNo();
                        alert("Successfully Saved..!");
                        $('#ProjectGrid').kendoGrid('destroy').empty();
                        LoadGridViewColumn(); // update grid


                    } else {
                        alert("Record Not Saved");
                        //LoadGridViewColumn(); // update grid
                        $('#ProjectGrid').kendoGrid('destroy').empty();
                        LoadGridViewColumn(); // update grid

                    }
                },
                error: function (e) {
                    return false;
                }
            });
        }
    }
    else {
        if (FormGlblDataForSerNo.SerialNumber_Array != 0) {
            SaveItmMasSerNo();
        }

    }
}

$(document.body).keydown(function (e) {
    if (e.keyCode == 107 || (e.altKey && e.keyCode == 78)) {
        e.preventDefault();
        insertItem();
    }
});

//================ CheckBox Tick Event ===============================

$('#ProjectGrid').on('click', '.isActPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ProjectGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAct', checked);
    }
});
$('#ProjectGrid').on('click', '.isAprPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ProjectGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isApr', checked);
    }
});
$('#ProjectGrid').on('click', '.isPrntPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ProjectGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isPrnt', checked);
    }
});
$('#ProjectGrid').on('click', '.isAlwTrnPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ProjectGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwTrn ', checked);
    }

});

$('#ProjectGrid').on('click', '.isSysRecPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ProjectGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isSysRec', checked);
    }

});

function CheckProjectCodeExist(PrjNo, model) {
    var grid = $("#ProjectGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!PrjNo) {
        PrjNo = currentData[0].PrjNo;
    }
    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].PrjNo == PrjNo) {
            count += 1;
        }
    }

    if (count == 1) {
        return true;
    } else {
        alert("The Project No : \"" + PrjNo + "\" Already Exist! Please Change..");
        model.set("PrjNo", null);
    }
}

function CheckProjectNmExist(PrjNm, model) {
    var grid = $("#ProjectGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!PrjNm) {
        PrjNm = currentData[0].PrjNm;
    }
    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].PrjNm == PrjNm) {
            count += 1;
        }
    }

    if (count == 1) {
        return true;
    } else {
        alert("Warning : The Project Name : \"" + PrjNm + "\" Already Exist!");
        model.set("PrjNm", null);
    }
}

function CheckProjectIdExist(DocNo, model) {
    $.ajax({
        url: UrlCheckDocNo,
        data: JSON.stringify({
            docNo: DocNo
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (Data) {
            if (Data.length <= 1) return;
            else {
                alert("The Doc No : \"" + Data[0].PrjId + "\" Already Exist! Please Change..");
                model.set("DocNo", null);
            }

        },
        error: function (e) {
            alert("Network Related Issue");
            return false;
        }
    });

    //var grid = $("#ProjectGrid").data("kendoGrid");
    //var currentData = grid.dataSource.data();
    //if (!DocNo) {
    //    DocNo = currentData[0].DocNo;
    //}
    //var count = 0;
    //for (var i = 0; i < currentData.length; i++) {
    //    if (currentData[i].DocNo == DocNo) {
    //        count += 1;
    //    }
    //}

    //if (count == 1) {
    //    return true;
    //} else {
    //    alert("The Doc No : \"" + DocNo + "\" Already Exist! Please Change..");
    //    model.set("DocNo", null);
    //}
}

function LoadSerlNo(container, options) {
    var model = options.model;
    $('<input id="SerlNo" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
        dataSource: SerNo_SelectMob_Datasource('SerlNo', model.ItmKy),
        change: function (e) {

            combo = e.sender;
            selectedItm = combo.select();
            dataItem = combo.dataItem(selectedItm);

            //var cmb = $("#SerlNo").data("kendoComboBox");
            var val = dataItem.SerNoKy;

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
                model.set("SerNoKy", 1);
                model.set("SerNo", "");
            } else {
                model.set("SerNoKy", dataItem.SerNoKy);
                model.set("SerNo", dataItem.SerNo);
            }
        },
        dataValueField: "SerNoKy",
        dataTextField: "SerNo"
    });
}


//Status Popup
function ProjectStatus(PrjKy, PrjNo, PrjName) {
    $("#PopUpStatusDetails").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        visible: false,
        title: "Project Status Details",
        actions: [
                "Close"
        ],
        //  close: onClose
    }).data("kendoWindow").center().open();
    document.getElementById("InputStsPrjKy").value = PrjKy;
    document.getElementById("HdrSec2_InptStsPrjNo_Val").value = PrjNo;
    document.getElementById("HdrSec2_InptStsPrjName_Val").value = PrjName;
    $("#HdrSec2_CmbSts_Cd").data("kendoComboBox").value(null);
    $("#HdrSec2_CmbSts_Nm").data("kendoComboBox").value(null);
    GetAllAprStatusDetails(PrjKy);
}
//Status Popup
function ProjectNiceClass(PrjKy, PrjNo, PrjName) {
    $("#PopUpNiceClassDetails").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        visible: false,
        title: "Project Status Details",
        actions: [
                "Close"
        ],
        // close: onClose
    }).data("kendoWindow").center().open();
    document.getElementById("InputNicePrjKy").value = PrjKy;
    document.getElementById("HdrSec2_InptNicePrjNo_Val").value = PrjNo;
    document.getElementById("HdrSec2_InptStsNiceName_Val").value = PrjName;
    LoadadresGrid();
    try {
        $("#PopUpNiceClass").data("kendoGrid").dataSource.data([]);

    } catch (e) {


    }
}


function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    // setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec2");
    // setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec3");

}
function AccNmType_SelectMob_Datasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.AccNmTyp_SelectMob,
                    data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                    dataType: "json"
                }
            }
        });
    return dataSource;
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