var FormGlblData = {
    HdrKy: 0,
}

$(document)
    .ready(function () {
        LoadDatePickers();
        loadCombo();
        clearAll();
    });

function LoadDatePickers() {
    $("#Date")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    var todayDate = new Date();
    $("#Date").data("kendoDatePicker").value(todayDate);
    $(".k-datepicker, .k-combobox, .k-numerictextbox, .k-input").css("width", "100%");

    $("#CrAmt").kendoNumericTextBox({
        decimals: 3,
        spinners: false,
        min: 0
    });
    $("#DrAmt").kendoNumericTextBox({
        decimals: 3,
        spinners: false,
        min: 0
    });
    //$("#CrAmt").kendoNumericTextBox({
    //    decimals: 3,
    //    spinners: false,
    //    min: 0
    //});
    $("#Balance")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,

        });
}

function loadCombo() {
    var ObjtKy = ObjKy;
    //cCus Sup Account
    $("#cmbAccCd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: {
                transport: {
                    read: {
                        url: urlAccCd,
                        data: {
                            'ObjKy': ObjtKy,
                        },
                        dataType: "json"
                    }
                }
            },
            change: function (e) {
                var cmb = $("#cmbAccCd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("cmbAccCd");
                    if (validate) {
                        $("#cmbAccCd").data("kendoComboBox").value(AccKy);
                        $("#cmbAccNm").data("kendoComboBox").value(AccKy);
                    } else {
                        $("#cmbAccCd").data("kendoComboBox").value("");
                        $("#cmbAccNm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an account.."
        });
    //combo from ProjectName
    $("#cmbAccNm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNm",
            dataSource: {
                transport: {
                    read: {
                        url: urlAccNm,
                        data: {
                            'ObjKy': ObjtKy,
                        },
                        dataType: "json"
                    }
                }
            },
            change: function (e) {
                var cmb = $("#cmbAccNm").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("cmbAccNm");
                    if (validate) {
                        $("#cmbAccCd").data("kendoComboBox").value(AccKy);
                        $("#cmbAccNm").data("kendoComboBox").value(AccKy);
                    } else {
                        $("#cmbAccCd").data("kendoComboBox").value("");
                        $("#cmbAccNm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Account.."
        });










    //_________________
    //cCus Sup Account
    $("#cmbFindAccCd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: {
                transport: {
                    read: {
                        url: urlAccCd,
                        data: {
                            'ObjKy': ObjtKy,
                        },
                        dataType: "json"
                    }
                }
            },
            change: function (e) {
                var cmb = $("#cmbFindAccCd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("cmbFindAccCd");
                    if (validate) {
                        $("#cmbFindAccCd").data("kendoComboBox").value(AccKy);
                        $("#cmbFindAccNm").data("kendoComboBox").value(AccKy);
                    } else {
                        $("#cmbFindAccCd").data("kendoComboBox").value("");
                        $("#cmbFindAccNm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an account.."
        });
    //combo from ProjectName
    $("#cmbFindAccNm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNm",
            dataSource: {
                transport: {
                    read: {
                        url: urlAccNm,
                        data: {
                            'ObjKy': ObjtKy,
                        },
                        dataType: "json"
                    }
                }
            },
            change: function (e) {
                var cmb = $("#cmbFindAccNm").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("cmbFindAccNm");
                    if (validate) {
                        $("#cmbFindAccCd").data("kendoComboBox").value(AccKy);
                        $("#cmbFindAccNm").data("kendoComboBox").value(AccKy);
                    } else {
                        $("#cmbFindAccCd").data("kendoComboBox").value("");
                        $("#cmbFindAccNm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Account.."
        });


}

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();
    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}

function LoadDrCrGrid() {
    var AccKy = $("#cmbAccCd").data("kendoComboBox").value();
    var ObjtKy = ObjKy;
    if (!AccKy || AccKy == "" || AccKy == 1) {
        alert("Please Select an Account ");
    } else {

        LoadCrGridView(AccKy, ObjtKy, 1);
        LoadDrGridView(AccKy, ObjtKy, 1);
    }
    document.getElementById("CrdDetails").innerHTML = "Credit Details";
    document.getElementById("DbtDetails").innerHTML = "Debit Details";
}

function LoadCrGridView(AccKy, ObjtKy, hdrKy) {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlCrGrid,
                dataType: "json",
                complete: function (data, status) {
                    if (status === "success") {
                        var CrValue = CalSelectedTotal("#CrGrid");
                        var DrValue = 0;
                        try {
                            DrValue = CalSelectedTotal("#DrGrid");

                        } catch (e) {

                        }
                        var Balance = parseFloat(DrValue - CrValue).toFixed(2);
                        $("#CrAmt").data("kendoNumericTextBox").value(parseFloat(CrValue).toFixed(2));
                        $("#DrAmt").data("kendoNumericTextBox").value(parseFloat(DrValue).toFixed(2));
                        $("#Balance").data("kendoNumericTextBox").value(parseFloat(Balance).toFixed(2));
                    }
                }
            },
            parameterMap: function (options, operation) {
                if (operation == "read") {
                    return ({
                        'AccKy': AccKy,
                        'ObjKy': ObjtKy,
                        'hdrsetOffKy': hdrKy
                    });
                }
            }

        },
        batch: true,
        pageSize: 50,
        schema: {
            model: {
                id: "TrnKy",
                fields: {
                    HdrKy: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    TrnNo: { editable: false, nullable: false, type: "number" },
                    AccTrnKy: { editable: false, nullable: true, type: "string" },
                    TrnDt: { editable: false, nullable: false, type: "string" },
                    TrnTyp: { editable: false, nullable: false, type: "string" },
                    DocNo: { editable: false, nullable: false, type: "string" },
                    Des: { editable: false, nullable: true, type: "string" },
                    TrnAmt: { editable: false, nullable: false, type: "number" },
                    SetOffAmt: { editable: false, nullable: true, type: "number" },
                    BalAmt: { editable: false, nullable: false, type: "number" },
                    ThsSetOfAmt: { editable: true, nullable: true, type: "number" },
                    Address: { editable: false, nullable: false, type: "string" },
                    Select: { editable: true, nullable: false, type: "boolean" },
                    Bu: { editable: false, nullable: false, type: "string" },
                    Ord: { editable: false, nullable: false, type: "string" },
                    Prj: { editable: false, nullable: false, type: "string" },
                    YrRef: { editable: false, nullable: false, type: "string" },
                    YrRefDt: { editable: false, nullable: false, type: "string" },
                    AccCd: { editable: false, nullable: false, type: "string" },
                    AccNm: { editable: false, nullable: false, type: "string" },
                    AdrId: { editable: false, nullable: false, type: "string" },
                    AdrNm: { editable: false, nullable: false, type: "string" },
                    IsSetOff: { editable: false, nullable: false, type: "number" }

                }
            }
        }
    });
    $("#CrGrid")
        .kendoGrid({
            dataSource: dataSource,
            autobind: true,
            navigatable: true,
            filterable: {
                mode: "row"
            },
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,
            height: 200,
            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: [
                { field: "HdrKy", title: "HdrKy", width: "100px", hidden: true },
                { field: "TrnKy", title: "TrnKy", width: "100px", hidden: true, },
                { field: "TrnNo", title: "Trn No", width: "80px", },
                { field: "AccTrnKy", title: "AccTrnKy", width: "100px", hidden: true, },
                { field: "TrnDt", title: "Trn Date", width: "100px", },
                { field: "TrnTyp", title: "Trn Type", width: "100px", },
                { field: "DocNo", title: "Doc No", width: "100px", },
                { field: "Des", title: "Des", width: "260px", },
                { field: "TrnAmt", title: "Trn Amt", width: "100px", format: "{0:N2}", attributes: { style: "text-align:right;" } },
                {
                    field: "SetOffAmt", title: "Set Off Amt", width: "100px", format: "{0:N2}", attributes: { style: "text-align:right;" },
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="SetOffAmt" name="' +
                                options.field +
                                '" data-value-field="' +
                                options.field +
                                '" data-bind="value:' +
                                options.field +
                                '" data-format="' +
                                options.format +
                                '"/>')
                            .appendTo(container)
                            .kendoNumericTextBox({
                                change: function (e) {
                                }
                            });
                    }
                },
                { field: "BalAmt", title: "Bal Amt", width: "100px", format: "{0:N2}", attributes: { style: "text-align:right;" }, },
                { field: "ThsSetOfAmt", title: "This Set Of Amt", width: "100px", format: "{0:N2}", attributes: { "class": "crThissetoff", style: "text-align:right;" } },
                { field: "Address", title: "Address", width: "100px" },
                {
                    template: '<input type="checkbox" #= Select ? \'checked="checked"\' : "" # class="Crchkbx" />', title: "Select", width: "70px",
                    attributes: { style: "text-align:Center;" }
                },
                { field: "Bu", title: "BU", width: "100px" },
                { field: "Ord", title: "Ord", width: "100px" },
                { field: "Prj", title: "Prj", width: "100px" },
                { field: "YrRef", title: "Your Ref", width: "100px" },
                { field: "YrRefDt", title: "Your Ref Dt", width: "100px" },
                { field: "AccCd", title: "Acc Code", width: "100px" },
                { field: "AccNm", title: "Acc Name", width: "100px" },
                { field: "AdrId", title: "AdrId", width: "100px" },
                { field: "AdrNm", title: "Address Name", width: "100px" },
                { field: "IsSetOff", title: "IsSetOff", width: "100px" }
            ],
            editable: true
        });
    $("#CrGrid .k-grid-content").on("change", "input.Crchkbx", function (e) {
        var Crgrid = $("#CrGrid").data("kendoGrid");
        dataItem = Crgrid.dataItem($(e.target).closest("tr"));
        dataItem.set("Select", this.checked);
        dataItem.dirty = true;
        $('#CrGrid').data('kendoGrid').refresh();
        CommounCalCulation(dataItem, Crgrid, dataItem.Select);

    });
    $("#CrGrid .k-grid-content").on("change", ".crThissetoff", function (e) {
        var Crgrid = $("#CrGrid").data("kendoGrid");
        dataItem = Crgrid.dataItem($(e.target).closest("tr"));
        var balamt = dataItem.BalAmt//dataItem.BalAmt;
        var ThisrnAmt = dataItem.ThsSetOfAmt;//dataItem.BalAmt;
        if (balamt >= ThisrnAmt) {
            dataItem.set("Select", true);
            dataItem.set("ThsSetOfAmt", this.value);
            alert(dataItem.ThsSetOfAmt);
            dataItem.dirty = true;
            $('#CrGrid').data('kendoGrid').refresh();
            CommounCalCulation(dataItem, Crgrid, dataItem.Select);
        } else {
            alert("This Set Off balance should be equal or less than balance set off amount");
            dataItem.set("ThsSetOfAmt", 0);
            $('#CrGrid').data('kendoGrid').refresh();
            return;
        }



    });

}

function LoadDrGridView(AccKy, ObjtKy, hdrKy) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlDrGrid, //'@Url.Content("~/SetOff/DrGridLoad")',
                dataType: "json",
                complete: function (data, status) {
                    if (status === "success") {
                        var DrValue = CalSelectedTotal("#DrGrid");
                        var CrValue = 0;
                        try {
                            CrValue = CalSelectedTotal("#CrGrid");

                        } catch (e) {

                        }
                        var Balance = parseFloat(DrValue - CrValue).toFixed(2);
                        $("#CrAmt").data("kendoNumericTextBox").value(parseFloat(CrValue).toFixed(2));
                        $("#DrAmt").data("kendoNumericTextBox").value(parseFloat(DrValue).toFixed(2));
                        $("#Balance").data("kendoNumericTextBox").value(parseFloat(Balance).toFixed(2));
                    }
                }
            },
            parameterMap: function (options, operation) {
                if (operation == "read") {
                    return ({
                        'AccKy': AccKy,
                        'ObjKy': ObjtKy,
                        'hdrsetOffKy': hdrKy

                    });
                }
            }
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "TrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    HdrKy: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    TrnNo: { editable: false, nullable: false, type: "number" },
                    AccTrnKy: { editable: false, nullable: true, type: "string" },
                    TrnDt: { editable: false, nullable: false, type: "string" },
                    TrnTyp: { editable: false, nullable: false, type: "string" },
                    DocNo: { editable: false, nullable: false, type: "string" },
                    Des: { editable: false, nullable: true, type: "string" },
                    TrnAmt: { editable: false, nullable: false, type: "number" },
                    SetOffAmt: { editable: false, nullable: true, type: "number" },
                    BalAmt: { editable: false, nullable: false, type: "number" },
                    ThsSetOfAmt: { editable: true, nullable: true, type: "number" },
                    Address: { editable: false, nullable: false, type: "string" },
                    Select: { editable: true, nullable: false, type: "boolean" },
                    Bu: { editable: false, nullable: false, type: "string" },
                    Ord: { editable: false, nullable: false, type: "string" },
                    Prj: { editable: false, nullable: false, type: "string" },
                    YrRef: { editable: false, nullable: false, type: "string" },
                    YrRefDt: { editable: false, nullable: false, type: "string" },
                    AccCd: { editable: false, nullable: false, type: "string" },
                    AccNm: { editable: false, nullable: false, type: "string" },
                    AdrId: { editable: false, nullable: false, type: "string" },
                    AdrNm: { editable: false, nullable: false, type: "string" },
                    IsSetOff: { editable: false, nullable: false, type: "number" }
                }
            }
        }
    });

    $("#DrGrid")
        .kendoGrid({
            dataSource: dataSource,
            autobind: true,
            navigatable: true,
            filterable: {
                mode: "row"
            },
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,
            height: 200,
            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            edit: function (arg) {
                $("[name='ThsSetOfAmt']", arg.container).blur(function () {
                    var id = ("#DrGrid");
                    var grid = $(id).data().kendoGrid;
                    var selectedItem = grid.dataItem(grid.select());
                    selectedItem.Select = true;
                    //  alert(selectedItem)

                });

            },
            columns: [
                { field: "HdrKy", title: "HdrKy", width: "100px", hidden: true },
                { field: "TrnKy", title: "TrnKy", width: "100px", hidden: true, },
                { field: "TrnNo", title: "Trn No", width: "80px", },
                { field: "AccTrnKy", title: "AccTrnKy", width: "100px", hidden: true, },
                { field: "TrnDt", title: "Trn Date", width: "100px", },
                { field: "TrnTyp", title: "Trn Type", width: "100px", },
                { field: "DocNo", title: "Doc No", width: "100px", },
                { field: "Des", title: "Des", width: "260px", },
                { field: "TrnAmt", title: "Trn Amt", width: "100px", format: "{0:N2}", attributes: { style: "text-align:right;" } },
                {
                    field: "SetOffAmt", title: "Set Off Amt", width: "100px", format: "{0:N2}",
                    attributes: { style: "text-align:right;" },
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="SetOffAmt" name="' +
                                options.field +
                                '" data-value-field="' +
                                options.field +
                                '" data-bind="value:' +
                                options.field +
                                '" data-format="' +
                                options.format +
                                '"/>')
                            .appendTo(container)
                            .kendoNumericTextBox({
                                change: function (e) {

                                }
                            });
                    }
                },
                { field: "BalAmt", title: "Bal Amt", width: "100px", format: "{0:N2}", attributes: { style: "text-align:right;" } },
                {
                    field: "ThsSetOfAmt", title: "This Set Of Amt", width: "100px", format: "{0:N2}", attributes: { "class": "drThissetoff", style: "text-align:right;" }, editor: function (container, options) {
                        var model = options.model;
                        $('<input id="ThsSetOfAmt" name="' +
                                options.field +
                                '" data-value-field="' +
                                options.field +
                                '" data-bind="value:' +
                                options.field +
                                '" data-format="' +
                                options.format +
                                '"/>')
                            .appendTo(container)
                            .kendoNumericTextBox({
                                change: function (e) {
                                }
                            });
                    }
                },
                { field: "Address", title: "Address", width: "100px" },
                { template: '<input type="checkbox" #= Select ? \'checked="checked"\' : "" # class="chkbxDr" />', title: "Select", width: "70px" },
                { field: "Bu", title: "BU", width: "100px" },
                { field: "Ord", title: "Ord", width: "100px" },
                { field: "Prj", title: "Prj", width: "100px" },
                { field: "YrRef", title: "Your Ref", width: "100px" },
                { field: "YrRefDt", title: "Your Ref Dt", width: "100px" },
                { field: "AccCd", title: "Acc Code", width: "100px" },
                { field: "AccNm", title: "Acc Name", width: "100px" },
                { field: "AdrId", title: "Adr Id", width: "100px" },
                { field: "AdrNm", title: "Address Name", width: "100px" },
                { field: "IsSetOff", title: "IsSetOff", width: "100px" }
            ],
            resizable: true,
            editable: true,
            edit: function (e) {
            },
        });
    $("#DrGrid .k-grid-content")
        .on("change",
            "input.chkbxDr",
            function (e) {
                var Drgrid = $("#DrGrid").data("kendoGrid");
                dataItem = Drgrid.dataItem($(e.target).closest("tr"));
                dataItem.set("Select", this.checked);
                dataItem.dirty = true;
                $('#DrGrid').data('kendoGrid').refresh();
                CommounCalCulation(dataItem, Drgrid, dataItem.Select);

            });

    $("#DrGrid .k-grid-content").on("change", ".drThissetoff", function (e) {
        var DrGrid = $("#DrGrid").data("kendoGrid");
        dataItem = DrGrid.dataItem($(e.target).closest("tr"));
        var balamt = dataItem.BalAmt//dataItem.BalAmt;
        var ThisrnAmt = dataItem.ThsSetOfAmt;//dataItem.BalAmt;
        if (balamt >= ThisrnAmt) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            $('#DrGrid').data('kendoGrid').refresh();
            CommounCalCulation(dataItem, DrGrid, dataItem.Select);
        } else {
            alert("This Set Off balance should be equal or less than balance set off amount");
            dataItem.set("ThsSetOfAmt", 0);
            $('#DrGrid').data('kendoGrid').refresh();
            return;
        }



    });

}

function CommounCalCulation(dataItem, GridData, IsSelected) {
    var CrSelectedCount = CountSelectedTotal("#CrGrid");
    var DrSelectedCount = CountSelectedTotal("#DrGrid");
    if ((CrSelectedCount == 1 || CrSelectedCount == 0 && DrSelectedCount >= 0) || (DrSelectedCount == 1 || DrSelectedCount == 0 && CrSelectedCount >= 0)) {
        //Unlock Grid And Set SetOffAmount
        SetValue(dataItem, GridData, IsSelected);
        var CrValue = CalSelectedTotal("#CrGrid");
        var DrValue = CalSelectedTotal("#DrGrid");
        var Balance = parseFloat(DrValue - CrValue).toFixed(2);



        //document.getElementById("CrAmt").value = parseFloat(CrValue).toFixed(2); //CrValue;
        //document.getElementById("DrAmt").value = parseFloat(DrValue).toFixed(2); //CrValue;//DrValue;
        //document.getElementById("Balance").value = parseFloat(Balance).toFixed(2); //CrValue;//Balance;

        $("#CrAmt").data("kendoNumericTextBox").value(parseFloat(CrValue).toFixed(2)); //CrValue;
        $("#DrAmt").data("kendoNumericTextBox").value(parseFloat(DrValue).toFixed(2)); //CrValue;//DrValue;
        $("#Balance").data("kendoNumericTextBox").value(parseFloat(Balance).toFixed(2)); //CrValue;//DrValue;

        //document.getElementById("Balance").value = parseFloat(Balance).toFixed(2); //CrValue;//Balance;

    } else {
        alert("You Cannot Have Many to many ");
        dataItem.set("Select", false);

    }
}

function setValuePreSetOff(GridData, dataItem, Balance, SetOffAmt) {
    var data = GridData.dataSource.at(0);
    data.fields["SetOffAmt"].editable = true;
    dataItem.set("SetOffAmt", parseFloat(SetOffAmt).toFixed(2));
    data.fields["SetOffAmt"].editable = false;
    data.fields["BalAmt"].editable = true;
    dataItem.set("BalAmt", parseFloat(Balance).toFixed(2));
    data.fields["BalAmt"].editable = false;
    dataItem.set("ThsSetOfAmt", 0);
    // return;
}

function SetValue(dataItem, GridData, IsSelected) {
    var CrSelectedCount = CountSelectedTotal("#CrGrid");
    var DrSelectedCount = CountSelectedTotal("#DrGrid");
    if (!IsSelected && dataItem.IsSetOff == 1) {
        var thisetOffAmt = parseFloat(dataItem.ThsSetOfAmt);
        var bal = parseFloat(dataItem.BalAmt) + thisetOffAmt;
        var Setoff = parseFloat(dataItem.SetOffAmt) - thisetOffAmt;


        setValuePreSetOff(GridData, dataItem, bal, Setoff);
        // alert();
    }
    if (DrSelectedCount == 0) {
        if (IsSelected) {
            var TepmThisSetOffBal = parseFloat(dataItem.TrnAmt).toFixed(2) - parseFloat(dataItem.SetOffAmt).toFixed(2);

            ///GridData, dataItem, Balance, TepmThisSetOffAmount
            setValuestoGrid(GridData, dataItem, 0, TepmThisSetOffBal);
        } else {
            var TepmAmount = parseFloat(dataItem.TrnAmt).toFixed(2) - parseFloat(dataItem.SetOffAmt).toFixed(2);
            /// GridData, dataItem, Balance, TepmThisSetOffAmount
            setValuestoGrid(GridData, dataItem, TepmAmount, 0);
        }
    } else if (CrSelectedCount == 0) {
        if (IsSelected) {
            var TepmThisSetOffBal = parseFloat(dataItem.TrnAmt).toFixed(2) - parseFloat(dataItem.SetOffAmt).toFixed(2);
            var balanceAmt = parseFloat(dataItem.BalAmt).toFixed(2);
            ///GridData, dataItem, Balance, TepmThisSetOffAmount
            setValuestoGrid(GridData, dataItem, 0, TepmThisSetOffBal);
        } else {
            var TepmAmount = parseFloat(dataItem.TrnAmt).toFixed(2) - parseFloat(dataItem.SetOffAmt).toFixed(2);

            /// GridData, dataItem, Balance, TepmThisSetOffAmount
            setValuestoGrid(GridData, dataItem, TepmAmount, 0);
        }
    } else if (CrSelectedCount == 1 && DrSelectedCount == 1) {
        var tempGetBal = document.getElementById("Balance").value;
        if (tempGetBal < 0) {
            tempGetBal = tempGetBal * (-1);
        }
        if (IsSelected) {
            //Check u Have enough Money to Pay
            if (tempGetBal > 0) {
                var TepmAmount = parseFloat(dataItem.TrnAmt).toFixed(2) - parseFloat(dataItem.SetOffAmt).toFixed(2);
                var SetBalToGrid = tempGetBal - TepmAmount;
                if (SetBalToGrid >= 0) {
                    /// GridData, dataItem, Balance, TepmThisSetOffAmount
                    setValuestoGrid(GridData, dataItem, 0, TepmAmount);
                } else if (SetBalToGrid <= 0) {
                    /// GridData, dataItem, Balance, TepmThisSetOffAmount
                    var TempBalSet = parseFloat(TepmAmount).toFixed(2) - parseFloat(tempGetBal).toFixed(2);
                    setValuestoGrid(GridData, dataItem, TempBalSet, tempGetBal);
                }
            } else {
                alert("The Balance Amount is 0");
                dataItem.set("Select", false);
            }

        } else {
            var TempBalSet = parseFloat(dataItem.TrnAmt).toFixed(2) - parseFloat(dataItem.SetOffAmt).toFixed(2);
            /// GridData, dataItem, Balance, TepmThisSetOffAmount
            setValuestoGrid(GridData, dataItem, TempBalSet, 0);
        }

    } else if (CrSelectedCount > 0 && DrSelectedCount == 1) {
        var tempGetBal = document.getElementById("Balance").value;
        if (tempGetBal < 0) {
            tempGetBal = tempGetBal * (-1);
        }
        if (IsSelected) {
            //Check u Have enough Money to Pay
            if (tempGetBal > 0) {
                var TepmAmount = parseFloat(dataItem.TrnAmt).toFixed(2) - parseFloat(dataItem.SetOffAmt).toFixed(2);
                var SetBalToGrid = tempGetBal - TepmAmount;
                if (SetBalToGrid >= 0) {
                    /// GridData, dataItem, Balance, TepmThisSetOffAmount
                    setValuestoGrid(GridData, dataItem, 0, TepmAmount);
                } else if (SetBalToGrid <= 0) {
                    /// GridData, dataItem, Balance, TepmThisSetOffAmount
                    var TempBalSet = parseFloat(TepmAmount).toFixed(2) - parseFloat(tempGetBal).toFixed(2);
                    setValuestoGrid(GridData, dataItem, TempBalSet, tempGetBal);
                }
            } else {
                alert("The Balance Amount is 0");
                dataItem.set("Select", false);
            }

        } else {
            /// GridData, dataItem, Balance, TepmThisSetOffAmount
            setValuestoGrid(GridData, dataItem, 0, 0);
        }
    } else if (DrSelectedCount > 0 && CrSelectedCount == 1) {
        var tempGetBal = document.getElementById("Balance").value;
        if (tempGetBal < 0) {
            tempGetBal = tempGetBal * (-1);
        }
        if (IsSelected) {
            //Check u Have enough Money to Pay
            if (tempGetBal > 0) {
                var TepmAmount = parseFloat(dataItem.TrnAmt).toFixed(2) - parseFloat(dataItem.SetOffAmt).toFixed(2);
                var SetBalToGrid = tempGetBal - TepmAmount;
                if (SetBalToGrid >= 0) {
                    /// GridData, dataItem, Balance, TepmThisSetOffAmount
                    setValuestoGrid(GridData, dataItem, 0, TepmAmount);
                } else if (SetBalToGrid <= 0) {
                    /// GridData, dataItem, Balance, TepmThisSetOffAmount
                    var TempBalSet = parseFloat(TepmAmount).toFixed(2) - parseFloat(tempGetBal).toFixed(2);
                    setValuestoGrid(GridData, dataItem, TempBalSet, tempGetBal);
                }
            } else {
                alert("The Balance Amount is 0");
                dataItem.set("Select", false);
            }

        } else {
            /// GridData, dataItem, Balance, TepmThisSetOffAmount
            setValuestoGrid(GridData, dataItem, 0, 0);
        }
    }

}

function setValuestoGrid(GridData, dataItem, Balance, ThisSetOffVal) {
    var data = GridData.dataSource.at(0);
    data.fields["BalAmt"].editable = true;
    dataItem.set("BalAmt", parseFloat(Balance).toFixed(2));
    data.fields["BalAmt"].editable = false;
    dataItem.set("ThsSetOfAmt", ThisSetOffVal);
}

function CountSelectedTotal(GridName) {
    var grid = $(GridName).data("kendoGrid");
    var currentData = grid.dataSource.data();
    var newValue = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].Select) {
            newValue = newValue + 1;
        }

    }
    return newValue;
}

function CalSelectedTotal(GridName) {
    var grid = $(GridName).data("kendoGrid");
    var currentData = grid.dataSource.data();
    var newValue = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].Select) {
            var tempamt = currentData[i].ThsSetOfAmt;
            newValue = newValue + tempamt;
        }

    }
    return newValue;
}

function SaveData() {
    var balance = $("#Balance").data("kendoNumericTextBox").value();
    //if (balance != 0) {
    //    alert("Balance should be zero to save");
    //    return;
    //}
    if (FormGlblData.HdrKy > 0) {
        var r = confirm("Do you Want To Update The record");
        if (r == true) {
            UpdateSetOff(FormGlblData.HdrKy);
        }
    }

    var SelectedDate = document.getElementById("Date").value;
    var DocNo = document.getElementById("DocNo").value;
    var ObjtKy = ObjKy;
    var Crgrid = $("#CrGrid").data("kendoGrid");
    var currentCrData = Crgrid.dataSource.data();
    var updatedCrRecords = [];
    for (var i = 0; i < currentCrData.length; i++) {
        if ((currentCrData[i].Select)) {//&& currentCrData[i].Select
            updatedCrRecords.push(currentCrData[i].toJSON());
        }
    }
    var Drgrid = $("#DrGrid").data("kendoGrid");
    var currentDrData = Drgrid.dataSource.data();
    var updatedDrRecords = [];
    for (var i = 0; i < currentDrData.length; i++) {
        if ((currentDrData[i].Select)) {// && currentDrData[i].Select
            updatedDrRecords.push(currentDrData[i].toJSON());
        }
    }

    if (updatedCrRecords.length >= 1 && updatedDrRecords.length >= 1) {
        $.ajax({
            url: urlSave,
            data: JSON.stringify({
                CrGridUpdate: kendo.stringify(updatedCrRecords),
                DrGridUpdate: kendo.stringify(updatedDrRecords),
                SelectedDate: SelectedDate,
                DocNo: DocNo,
                ObjtKy: ObjtKy
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data) {
                    var TrnNo = data;
                    alert("Save Successfully");
                    //$('#TrnNo').val(TrnNo);
                    document.getElementById("TrnNo").value = TrnNo;
                    // document.getElementById('TrnNo').innerHTML = TrnNo;
                    $("#CrAmt").data("kendoNumericTextBox").value("");
                    $("#DrAmt").data("kendoNumericTextBox").value("");
                    $("#Balance").data("kendoNumericTextBox").value("");
                    //document.getElementById('Balance').innerHTML = "";
                    //document.getElementById('CrAmt').innerHTML = "";
                    //document.getElementById('DrAmt').innerHTML = "";
                    LoadDrCrGrid();

                } else {
                    alert("Please Try Again");

                }

            },
            error: function (e) {
                return false;
            }
        });
    } else {
        alert("Please select at least one from credit side and one from debit side");
    }

}

function UpdateSetOff(HdrKy) {

    var SelectedDate = document.getElementById("Date").value;
    var DocNo = document.getElementById("DocNo").value;
    var ObjtKy = ObjKy;
    var Crgrid = $("#CrGrid").data("kendoGrid");
    var currentCrData = Crgrid.dataSource.data();
    var crCount = [];
    for (var i = 0; i < currentCrData.length; i++) {
        if ((currentCrData[i].Select)) {
            crCount.push(currentCrData[i].toJSON());
        }
    }
    var updatedCrRecords = [];
    for (var i = 0; i < currentCrData.length; i++) {
        if ((currentCrData[i].Select) || (currentCrData[i].dirty && !currentCrData[i].Select)) {//&& currentCrData[i].Select
            updatedCrRecords.push(currentCrData[i].toJSON());
        }
    }
    var Drgrid = $("#DrGrid").data("kendoGrid");
    var currentDrData = Drgrid.dataSource.data();
    var updatedDrRecords = [];
    var drCount = [];
    for (var i = 0; i < currentDrData.length; i++) {
        if ((currentDrData[i].Select)) {
            drCount.push(currentDrData[i].toJSON());
        }
    }
    for (var i = 0; i < currentDrData.length; i++) {
        if ((currentDrData[i].Select) || (currentDrData[i].dirty && !currentDrData[i].Select)) {// && currentDrData[i].Select
            updatedDrRecords.push(currentDrData[i].toJSON());
        }
    }
    if ((drCount.length > 1 && crCount.length > 1)) {
        alert("You Cannot Have many to many ");
    }

    if (drCount.length >= 1 && crCount.length >= 1) {
        $.ajax({
            url: urlSave,
            data: JSON.stringify({
                CrGridUpdate: kendo.stringify(updatedCrRecords),
                DrGridUpdate: kendo.stringify(updatedDrRecords),
                SelectedDate: SelectedDate,
                DocNo: DocNo,
                ObjtKy: ObjtKy,
                HdrKy: HdrKy
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data) {
                    var TrnNo = data;
                    alert("Update Successfully");
                    document.getElementById("TrnNo").value = TrnNo;
                    $("#CrAmt").data("kendoNumericTextBox").value("");
                    $("#DrAmt").data("kendoNumericTextBox").value("");
                    $("#Balance").data("kendoNumericTextBox").value("");
                    LoadDrCrGrid();

                } else {
                    alert("Please Try Again");

                }

            },
            error: function (e) {
                alert("Network Related issue Please Try Again");
            }
        });
    } else {
        alert("Please select at least one from credit side and one from debit side");
    }
}

function clearAll() {

    //LoadDatePickers();
    var todayDate = new Date();
    $("#Date").data("kendoDatePicker").value(todayDate);
    //$("#cmbAccCd").parent().css("width", "40%");
    //$("#cmbAccNm").parent().css("width", "50%");
    $("#cmbAccCd").data("kendoComboBox").value("");
    $("#cmbAccNm").data("kendoComboBox").value("");
    document.getElementById("DocNo").value = "";
    document.getElementById("TrnNo").value = "";
    //document.getElementById('Balance').value = "";
    //document.getElementById('CrAmt').value = "";
    //document.getElementById('DrAmt').value = "";
    $("#CrAmt").data("kendoNumericTextBox").value("");
    $("#DrAmt").data("kendoNumericTextBox").value("");
    $("#Balance").data("kendoNumericTextBox").value("");
    if ($("#CrGrid").data("kendoGrid")) {
        $("#CrGrid").data("kendoGrid").dataSource.data([]);
    }
    if ($("#DrGrid").data("kendoGrid")) {
        $("#DrGrid").data("kendoGrid").dataSource.data([]);
    }

}

$(document.body)
    .keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 70) {
            $("#cmbFindAccCd").parent().css("width", "40%");
            $("#cmbFindAccNm").parent().css("width", "50%");

            $("#FindFormSetOff")
                .show()
                .kendoWindow({
                    width: "1000px",
                    height: "600px",
                    modal: true,
                    title: "Find Form"
                });

            $("#FindFormSetOff").data("kendoWindow").center().open();
            e.preventDefault();
        }
    });

