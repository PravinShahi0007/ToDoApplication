function GetFormObjData() {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (objMasData) {
            FormGlblData.FormObjData = objMasData,
                DocReadyCus();
        }
    });
}

function GetSelectedReportObjData(prntKy) {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: prntKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            FormGlblData.FormObjData = data,
            loadSelectedReport(prntKy)
        }
    })
}

function DocReadyCus() {
    loadReportCombo();
    loadCombo();
    LoadTaskCombo(1);
    hideAllCombo();
    TrigerChange();
}

function TrigerChange() {
    // alert(viewBag.ChildKy);
    if (viewBag.ChildKy != 1 || viewBag.ChildKy != undefined || viewBag.ChildKy != "") {
        var cmbVal = $("#cmbRptNm").data("kendoComboBox").value();
        console.log("PrntKy! " + cmbVal);
        if (cmbVal !== "") {
            GetSelectedReportObjData(cmbVal), globlObjKy = cmbVal;
        }
        
        //$("#cmbRptNm").data("kendoComboBox").value(viewBag.ChildKy);
        //   $("#cmbRptNm").data("kendoDropDownList").trigger("change");
    }

}

function loadReportCombo() {
    $("#cmbRptNm").kendoComboBox({
        dataValueField: "ObjKy",
        dataTextField: "ObjCaptn",
        dataSource: ReportDataSource(viewBag.ObjKy),
        change: function (e) {
            ClearCombo();
            var cmb = $("#cmbRptNm").data("kendoComboBox"),
                value = cmb.value();
            if (value === "") {
                return;
            }
            try {
                var DataDetails = this.dataItem(this.select());
                if (value > 1) {
                    if (DataDetails.IsTelerikRpt == 2) {
                        $("#Preview").attr("onclick", "TelPreview()");
                    } else {
                        $("#Preview").attr("onclick", "Preview()");
                    }
                    GetSelectedReportObjData(value), globlObjKy = value;
                }
            } catch (e) {

            }

            //value > 1 && (GetSelectedReportObjData(value), globlObjKy = value);

        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Report"
    }),
        $("#cmbRptNm").parent().css("width", "100%");

    if (viewBag.ChildKy != 1 || viewBag.ChildKy != undefined || viewBag.ChildKy != "") {
        $("#cmbRptNm").data("kendoComboBox").value(viewBag.ChildKy);
        // $("#cmbRptNm").data("kendoDropDownList").trigger("change");
    }
}

function ReportDataSource(prntKy) {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlReport.ReportComboLoad,
                data: {
                    PrntKy: prntKy,
                    ObjTyp: "",
                    ObjNm: ""
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function loadSelectedReport(prntKy) {
    $.ajax({
        url: urlReport.UsrObjChild_SelectByPrntandSubObjTypWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: prntKy,
            ObjTyp: "ReportParameter",
            ObjNm: ""
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            FormGlblData.FormObjData = data,
                createDynamicElement(data),
                SetHandlingEnterKeyEvent("", prntKy);
        },
        error: function (prntKy) { }
    })
}
//Create dynamic Textbox 
function createTextBox(TextBoxDetail) {
    var b = document.getElementById("divTextBox"),
        c = document.createElement("div");
    c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-2 col-sm-2";
    var e = document.createElement("label");
    e.className = "lbl", e.innerHTML = TextBoxDetail.ObjCaptn, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-4 col-sm-4";
    var g = document.createElement("input");
    g.className = "k-input", g.type = "text", g.id = TextBoxDetail.ObjNm, f.appendChild(g), b.appendChild(c), c.appendChild(d), c.appendChild(f);
    new Date;
}
//Create dynamic NumericTextBox
function createNumericBox(NumericDetail) {
    var b = document.getElementById("divNumericBox"),
        c = document.createElement("div");
    c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-2 col-sm-2";
    var e = document.createElement("label");
    e.className = "lbl", e.innerHTML = NumericDetail.ObjCaptn, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-2 col-sm-2";
    var g = document.createElement("input");
    g.className = "k-input", g.onkeypress = isNumberOnlyTextField, g.type = "text", g.id = NumericDetail.ObjNm, f.appendChild(g), b.appendChild(c), c.appendChild(d), c.appendChild(f);
    new Date;
}
//Create dynamic CdMas COmbo
function createCdMasLookUpCombo(cmdDetail) {
    var b = document.getElementById("divForCdMasLookUpCombo"),
        c = document.createElement("div");
    c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-2 col-sm-2";
    var e = document.createElement("label");
    e.className = "lbl", e.innerHTML = cmdDetail.ObjCaptn, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-4 col-sm-4";
    var g = document.createElement("div");
    g.className = "cmb", g.id = cmdDetail.ObjNm, f.appendChild(g);
    var h = document.createElement("div");
    h.className = "col-md-6 col-sm-6";
    var i = document.createElement("div");
    i.className = "cmb", i.id = cmdDetail.ObjNm + "CdNm", h.appendChild(i), b.appendChild(c), c.appendChild(d), c.appendChild(f), c.appendChild(h), $("#" + cmdDetail.ObjNm).kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp(cmdDetail.ObjNm),
        change: function (b) {
            var cmb = $("#" + cmdDetail.ObjNm).data("kendoComboBox"),
                value = cmb.value();
            if ("" != value) {
                var isValidata = ComboValidations(cmdDetail.ObjNm);
                isValidata ? ($("#" + cmdDetail.ObjNm).data("kendoComboBox").value(value), $("#" + cmdDetail.ObjNm + "CdNm").data("kendoComboBox").value(value)) : ($("#" + cmdDetail.ObjNm).data("kendoComboBox").value(""), $("#" + cmdDetail.ObjNm + "CdNm").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select cmdDetail code ..."
    }), $("#" + cmdDetail.ObjNm + "CdNm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: dataSrcCreateCdNmCdMasLookUp(cmdDetail.ObjNm),
        change: function (b) {
            var cmb = $("#" + cmdDetail.ObjNm + "CdNm").data("kendoComboBox"),
                value = cmb.value();
            if ("" != value) {
                var isValidata = ComboValidations(cmdDetail.ObjNm + "CdNm");
                isValidata ? ($("#" + cmdDetail.ObjNm).data("kendoComboBox").value(value), $("#" + cmdDetail.ObjNm + "CdNm").data("kendoComboBox").value(value)) : ($("#" + cmdDetail.ObjNm).data("kendoComboBox").value(""), $("#" + cmdDetail.ObjNm + "CdNm").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select cmdDetail Name ..."
    })
}
//Create Date Picker
function createDatePicker(DatPickerDetail) {
    var b = document.getElementById("divDatePicker"),
        c = document.createElement("div");
    c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-2 col-sm-2";
    var e = document.createElement("label");
    e.className = "lbl", e.innerHTML = DatPickerDetail.ObjCaptn, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-4 col-sm-4";
    var g = document.createElement("input");
    g.className = "cmb", g.id = DatPickerDetail.ObjNm, f.appendChild(g), b.appendChild(c), c.appendChild(d), c.appendChild(f);
    var today = new Date;
    $("#" + DatPickerDetail.ObjNm).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2e3)
    }), $("#" + DatPickerDetail.ObjNm).data("kendoDatePicker").value(today);
}
//Create dynamic ChkBox
function createCheckBox(chkBox) {
    var b = document.getElementById("divForCheckBox"),
        c = document.createElement("div");
    c.className = "checkbox", c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-4 col-sm-4";
    var e = document.createElement("input");
    e.type = "checkbox", e.name = chkBox.ObjNm, e.value = !1, e.id = chkBox.ObjNm, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-2 col-sm-2";
    var g = document.createElement("label");
    g.htmlFor = "lbl" + chkBox.ObjNm, g.className = "lbl", g.appendChild(document.createTextNode(chkBox.ObjCaptn)), f.appendChild(g), b.appendChild(c), c.appendChild(f), c.appendChild(d), document.getElementById(chkBox.ObjNm).style.marginTop = "15px"
}
//Create Dynamic Combo
function createComboBox(cmb) {
    cmb.ObjNm.startsWith("cmbPrj") && $("#cmbPrj").show(), cmb.ObjNm.startsWith("cmbEmp") && $("#cmbEmp").show(),
        cmb.ObjNm.startsWith("cmbTask") && $("#cmbTask").show(), cmb.ObjNm.startsWith("cmbPrcsDet") && $("#cmbTask").show(),
        cmb.ObjNm.startsWith("cmbPrcsSch") && $("#cmbPrcsSch").show(),
        cmb.ObjNm.startsWith("cmbItm") && $("#cmbItm").show(), cmb.ObjNm.startsWith("cmbAcc") && $("#cmbAcc").show(), cmb
            .ObjNm.startsWith("cmbAdr") &&
            $("#cmbAdr").show();
}
//Hide All Combo
function hideAllCombo() {
    $("#cmbItm").hide(), $("#cmbEmp").hide(), $("#cmbTask").hide(), $("#cmbPrcsSch").hide(), $("#cmbPrj").hide(), $("#cmbAcc").hide(), $("#cmbAdr").hide()
}
//Create Dynamic Elements
function createDynamicElement(a) {
    selectedReportParamList = a;
    var b = document.getElementById("ParameterSection"),
        c = document.getElementById("divDatePicker");
    null != c && c.remove();
    var d = document.createElement("div");
    d.id = "divDatePicker", b.appendChild(d);
    var e = document.getElementById("ParameterSectionForTextBox"),
        f = document.getElementById("divTextBox");
    null != f && f.remove();
    var g = document.createElement("div");
    g.id = "divTextBox", e.appendChild(g);
    var h = document.getElementById("ParameterSectionForNumericBox"),
        i = document.getElementById("divNumericBox");
    null != i && i.remove();
    var k = document.createElement("div");
    k.id = "divNumericBox", h.appendChild(k);
    var l = document.getElementById("ParameterSectionForCheckBox"),
        m = document.getElementById("divForCheckBox");
    null != m && m.remove();
    var m = document.createElement("div");
    m.id = "divForCheckBox", l.appendChild(m);
    var n = document.getElementById("ParameterSectionForCdMasLookUpCombo"),
        o = document.getElementById("divForCdMasLookUpCombo");
    null != o && o.remove();
    var o = document.createElement("div");
    for (o.id = "divForCdMasLookUpCombo", n.appendChild(o), hideAllCombo(), j = 0; j < a.length; j++) {
        var p = a[j].ObjNm;
        a[j].ObjTyp;
        p.startsWith("datPic") ? createDatePicker(a[j]) : p.startsWith("cmFrmCdMas_") && p.toLowerCase().endsWith("ky") ? createCdMasLookUpCombo(a[j]) : p.startsWith("numricBox") ? createNumericBox(a[j]) : p.startsWith("textBox") ? createTextBox(a[j]) : p.startsWith("cmb") ? createComboBox(a[j]) : p.startsWith("chckBox") && createCheckBox(a[j])
    }
}

function LoadTaskCombo(a) {
    function b(a) {
        var b = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlReport.GetTaskList,
                    data: {
                        PrjKy: a
                    },
                    dataType: "json"
                }
            }
        });
        return b
    }

    function c(a) {
        var b = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlComboLoad.PrcsSchNo_SelectMob,
                    data: {
                        PrjKy: a
                    },
                    dataType: "json"
                }
            }
        });
        return b
    }
    $("#cmbTaskId").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskId",
        dataSource: b(a),
        change: function (a) {
            var b = $("#cmbTaskId").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbTaskId");
                d
                    ? ($("#cmbTaskNm").data("kendoComboBox").value(c), $("#cmbTaskId").data("kendoComboBox").value(c))
                    : ($("#cmbTaskNm").data("kendoComboBox").value(""), $("#cmbTaskId").data("kendoComboBox")
                        .value(""));
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select a Task Id ..."
    }), $("#cmbTaskNm").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskNm",
        dataSource: b(a),
        change: function (a) {
            var b = $("#cmbTaskNm").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbTaskId");
                d
                    ? ($("#cmbTaskNm").data("kendoComboBox").value(c), $("#cmbTaskId").data("kendoComboBox").value(c))
                    : ($("#cmbTaskNm").data("kendoComboBox").value(""), $("#cmbTaskId").data("kendoComboBox")
                        .value(""));
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select a Task Nm ..."
    }), $("#cmbPrcsSchNo").kendoComboBox({
        dataValueField: "PrcsSchKy",
        dataTextField: "SchNo",
        dataSource: c(a),
        change: function (a) {
            var b = $("#cmbPrcsSchNo").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbPrcsSchNo");
                d
                    ? $("#cmbPrcsSchNo").data("kendoComboBox").value(c)
                    : $("#cmbPrcsSchNo").data("kendoComboBox").value("");
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select a Prcs Sch No ..."
    })
}
//Clear All Combo
function ClearCombo() {
    $("#cmbEmpCd").data("kendoComboBox").value(null), $("#cmbEmpNm").data("kendoComboBox").value(null),
    $("#cmbItmCd").data("kendoComboBox").value(null), $("#cmbItmNm").data("kendoComboBox").value(null),
    $("#cmbPrjCd").data("kendoComboBox").value(null), $("#cmbPrjNm").data("kendoComboBox").value(null),
    $("#cmbAccCd").data("kendoComboBox").value(null), $("#cmbAccNm").data("kendoComboBox").value(null),
    $("#cmbAdrCd").data("kendoComboBox").value(null), $("#cmbAdrNm").data("kendoComboBox").value(null);
}
//Cpmbo Data Source
function loadCombo() {
    function EmpCdDataSource() {
        var a = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlReport.EmpNo_SelectWeb,
                    data: {
                        ObjKy: globlObjKy
                    },
                    dataType: "json"
                }
            }
        });
        return a
    }

    function EmpNmDataSource() {
        var a = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlReport.EmpNm_SelectWeb,
                    data: {
                        ObjKy: globlObjKy
                    },
                    dataType: "json"
                }
            }
        });
        return a
    }

    function ItmCdDataSource(ObjNm) {
        var ObjVisible = GetObjVisible(ObjNm);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
        var b = GetObjKy(ObjNm),
            c = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlComboLoad.ItmCd_SelectMob,
                        data: {
                            ObjKy: b,
                            TrnTypKy: 1,
                            PreKy: 1
                        },
                        dataType: "json"
                    }
                }
            });
        return c
    }

    function ItmNmDataSource(ObjNm) {
        var ObjVisible = GetObjVisible(ObjNm);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
        var b = GetObjKy(ObjNm),
            c = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlComboLoad.ItmNm_SelectMob,
                        data: {
                            ObjKy: b,
                            TrnTypKy: 1,
                            PreKy: 1
                        },
                        dataType: "json"
                    }
                }
            });
        return c
    }

    function PrjCdDataSource(ObjNm) {
        var ObjVisible = GetObjVisible(ObjNm);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
        var b = GetObjKy(ObjNm),
            c = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlGetPrjID_SelectMob,
                        data: {
                            ObjKy: b,
                            TrnTypKy: 1,
                            PreKy: 1
                        },
                        dataType: "json"
                    }
                }
            });
        return c
    }

    function PrjNmDataSource(ObjNm) {
        var ObjVisible = GetObjVisible(ObjNm);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
        var b = GetObjKy(ObjNm),
            c = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlGetPrjNm_SelectMob,
                        data: {
                            ObjKy: b,
                            TrnTypKy: 1,
                            PreKy: 1
                        },
                        dataType: "json"
                    }
                }
            });
        return c
    }

    function AccCdDataSource(ObjNm) {
        var ObjVisible = GetObjVisible(ObjNm);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
        var b = GetObjKy(ObjNm),
            c = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlComboLoad.AccCd_SelectMob,
                        data: {
                            ObjKy: b,
                            TrnTypKy: 1,
                            PreKy: 1
                        },
                        dataType: "json"
                    }
                }
            });
        return c
    }

    function AccNmDataSource(ObjNm) {
        var ObjVisible = GetObjVisible(ObjNm);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
        var b = GetObjKy(ObjNm),
            c = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlComboLoad.AccNm_SelectMob,
                        data: {
                            ObjKy: b,
                            TrnTypKy: 1,
                            PreKy: 1
                        },
                        dataType: "json"
                    }
                }
            });
        return c
    }

    function AdrIdDataSource(ObjNm) {
        var ObjVisible = GetObjVisible(ObjNm);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
        var b = GetObjKy(ObjNm),
            c = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlComboLoad.AdrID_SelectMob,
                        data: {
                            ObjKy: b,
                            TrnTypKy: 1,
                            PreKy: 1
                        },
                        dataType: "json"
                    }
                }
            });
        return c
    }

    function AdrNmDataSource(ObjNm) {
        var ObjVisible = GetObjVisible(ObjNm);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
        var b = GetObjKy(ObjNm),
            c = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlComboLoad.AdrNm_SelectMob,
                        data: {
                            ObjKy: b,
                            TrnTypKy: 1,
                            PreKy: 1
                        },
                        dataType: "json"
                    }
                }
            });
        return c
    }

    $("#cmbEmpCd").kendoComboBox({
        dataValueField: "EmpKy",
        dataTextField: "EmpNo",
        dataSource: EmpCdDataSource(),
        change: function (a) {
            var b = $("#cmbEmpCd").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbEmpCd");
                d
                    ? ($("#cmbEmpNm").data("kendoComboBox").value(c), $("#cmbEmpCd").data("kendoComboBox").value(c))
                    : ($("#cmbEmpNm").data("kendoComboBox").value(""), $("#cmbEmpCd").data("kendoComboBox")
                        .value(""));
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Emp No.."
    }), $("#cmbEmpNm").kendoComboBox({
        dataValueField: "EmpKy",
        dataTextField: "EmpNm",
        dataSource: EmpNmDataSource(),
        change: function (a) {
            var b = $("#cmbEmpNm").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbEmpNm");
                d
                    ? ($("#cmbEmpNm").data("kendoComboBox").value(c), $("#cmbEmpCd").data("kendoComboBox").value(c))
                    : ($("#cmbEmpNm").data("kendoComboBox").value(""), $("#cmbEmpCd").data("kendoComboBox")
                        .value(""));
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Emp Nm.."
    }),
        $("#cmbItmCd").kendoComboBox({
            dataValueField: "ItmKy",
            dataTextField: "ItmCd",
            dataSource: ItmCdDataSource("cmbItmKy"),
            change: function (a) {
                var b = $("#cmbItmCd").data("kendoComboBox"),
                    c = b.value();
                if ("" != c) {
                    var d = ComboValidations("cmbItmCd");
                    d
                        ? ($("#cmbItmNm").data("kendoComboBox").value(c), $("#cmbItmCd").data("kendoComboBox").value(c))
                        : ($("#cmbItmNm").data("kendoComboBox").value(""), $("#cmbItmCd").data("kendoComboBox")
                            .value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select Item Cd.."
        }), $("#cmbItmNm").kendoComboBox({
            dataValueField: "ItmKy",
            dataTextField: "ItmNm",
            dataSource: ItmNmDataSource("cmbItmKy"),
            change: function (a) {
                var b = $("#cmbItmNm").data("kendoComboBox"),
                    c = b.value();
                if ("" != c) {
                    var d = ComboValidations("cmbItmNm");
                    d
                        ? ($("#cmbItmNm").data("kendoComboBox").value(c), $("#cmbItmCd").data("kendoComboBox").value(c))
                        : ($("#cmbItmNm").data("kendoComboBox").value(""), $("#cmbItmCd").data("kendoComboBox")
                            .value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select Item Name.."
        }), $("#cmbPrjCd").kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "DocNo",
            dataSource: PrjCdDataSource("cmbPrjKy"),
            change: function (a) {
                var b = $("#cmbPrjCd").data("kendoComboBox"),
                    c = b.value();
                if ("" != c) {
                    var d = ComboValidations("cmbPrjCd");
                    d
                        ? ($("#cmbPrjNm").data("kendoComboBox").value(c), $("#cmbPrjCd").data("kendoComboBox").value(c),
                            LoadTaskCombo(c))
                        : ($("#cmbPrjNm").data("kendoComboBox").value(""), $("#cmbPrjCd").data("kendoComboBox")
                            .value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select Project Id.."
        }), $("#cmbPrjNm").kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjNm",
            dataSource: PrjNmDataSource("cmbPrjKy"),
            change: function (a) {
                var b = $("#cmbPrjNm").data("kendoComboBox"),
                    c = b.value();
                if ("" != c) {
                    var d = ComboValidations("cmbPrjNm");
                    d
                        ? ($("#cmbPrjCd").data("kendoComboBox").value(c), $("#cmbPrjNm").data("kendoComboBox").value(c),
                            LoadTaskCombo(c))
                        : ($("#cmbPrjCd").data("kendoComboBox").value(""), $("#cmbPrjNm").data("kendoComboBox")
                            .value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select Project.."
        }), $("#cmbAccCd").kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: AccCdDataSource("cmbAccKy"),
            change: function (a) {
                var b = $("#cmbAccCd").data("kendoComboBox"),
                    c = b.value();
                if ("" != c) {
                    var d = ComboValidations("cmbAccCd");
                    d
                        ? ($("#cmbAccNm").data("kendoComboBox").value(c), $("#cmbAccCd").data("kendoComboBox").value(c))
                        : ($("#cmbAccNm").data("kendoComboBox").value(""), $("#cmbAccCd").data("kendoComboBox")
                            .value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select Account Id.."
        }), $("#cmbAccNm").kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNm",
            dataSource: AccNmDataSource("cmbAccKy"),
            change: function (a) {
                var b = $("#cmbAccNm").data("kendoComboBox"),
                    c = b.value();
                if ("" != c) {
                    var d = ComboValidations("cmbAccNm");
                    d
                        ? ($("#cmbAccNm").data("kendoComboBox").value(c), $("#cmbAccCd").data("kendoComboBox").value(c))
                        : ($("#cmbAccNm").data("kendoComboBox").value(""), $("#cmbAccCd").data("kendoComboBox")
                            .value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select a Accounts.."
        }), $("#cmbAdrCd").kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrID",
            dataSource: AdrIdDataSource("cmbAdrKy"),
            change: function (a) {
                var b = $("#cmbAdrCd").data("kendoComboBox"),
                    c = b.value();
                if ("" != c) {
                    var d = ComboValidations("cmbAdrCd");
                    d
                        ? ($("#cmbAdrCd").data("kendoComboBox").value(c), $("#cmbAdrNm").data("kendoComboBox").value(c))
                        : ($("#cmbAdrCd").data("kendoComboBox").value(""), $("#cmbAdrNm").data("kendoComboBox")
                            .value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select Address Id.."
        }), $("#cmbAdrNm").kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrNm",
            dataSource: AdrNmDataSource("cmbAdrKy"),
            change: function (a) {
                var b = $("#cmbAdrNm").data("kendoComboBox"),
                    c = b.value();
                if ("" != c) {
                    var d = ComboValidations("cmbAdrNm");
                    d
                        ? ($("#cmbAdrCd").data("kendoComboBox").value(c), $("#cmbAdrNm").data("kendoComboBox").value(c))
                        : ($("#cmbAdrCd").data("kendoComboBox").value(""), $("#cmbAdrNm").data("kendoComboBox")
                            .value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select Address Name.."
        });
    $("#cmbRptNm").data("kendoComboBox").trigger("change");
}

function dataSrcCreateCodeCdMasLookUp(objNm) {
    var objKy = GetObjKy(objNm),
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlComboLoad.Code_SelectMob,
                    data: {
                        ObjKy: objKy,
                        TrnTypKy: 1,
                        PreKy: 1
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function dataSrcCreateCdNmCdMasLookUp(objNm) {
    var objKy = GetObjKy(objNm),
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlComboLoad.CdNm_SelectMob,
                    data: {
                        ObjKy: objKy,
                        TrnTypKy: 1,
                        PreKy: 1
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource
}

function ComboValidations(cmbId) {
    var cmb = $("#" + cmbId).data("kendoComboBox"),
        value = cmb.value();
    return !isNaN(value) || (alert("'" + value + "' is not cmbId Valid input"), $("#" + cmbId).data("kendoComboBox").value(""), !1)
}

function Preview() {
    var cmbVal = {
        cmbRptKy: $("#cmbRptNm").data("kendoComboBox").value(),
        cmbPrjKy: $("#cmbPrjCd").data("kendoComboBox").value(),
        cmbEmpKy: $("#cmbEmpCd").data("kendoComboBox").value(),
        cmbItmKy: $("#cmbItmCd").data("kendoComboBox").value(),
        cmbTaskKy: $("#cmbTaskId").data("kendoComboBox").value(),
        cmbPrcsDetKy: $("#cmbTaskId").data("kendoComboBox").value(),
        cmbPrcsSchKy: $("#cmbPrcsSchNo").data("kendoComboBox").value(),
        cmbAccKy: $("#cmbAccCd").data("kendoComboBox").value(),
        cmbAdrKy: $("#cmbAdrCd").data("kendoComboBox").value()
    },
        cmbText = {
            cmbRptNm: $("#cmbRptNm").data("kendoComboBox").text(),
            cmbPrjCd: $("#cmbPrjCd").data("kendoComboBox").text(),
            cmbPrjNm: $("#cmbPrjNm").data("kendoComboBox").text(),
            cmbTaskId: $("#cmbTaskId").data("kendoComboBox").text(),
            cmbTaskNm: $("#cmbTaskNm").data("kendoComboBox").text(),
            cmbPrcsDetId: $("#cmbTaskId").data("kendoComboBox").text(),
            cmbPrcsDetNm: $("#cmbTaskNm").data("kendoComboBox").text(),
            cmbPrcsSchNo: $("#cmbPrcsSchNo").data("kendoComboBox").text(),
            cmbEmpCd: $("#cmbEmpCd").data("kendoComboBox").text(),
            cmbEmpNm: $("#cmbEmpNm").data("kendoComboBox").text(),
            cmbItmCd: $("#cmbItmCd").data("kendoComboBox").text(),
            cmbItmNm: $("#cmbItmNm").data("kendoComboBox").text(),
            cmbAccCd: $("#cmbAccCd").data("kendoComboBox").text(),
            cmbAccNm: $("#cmbAccNm").data("kendoComboBox").text(),
            cmbAdrCd: $("#cmbAdrCd").data("kendoComboBox").text(),
            cmbAdrNm: $("#cmbAdrNm").data("kendoComboBox").text()
        },
        valAray = {};
    for (j = 0; j < selectedReportParamList.length; j++) {
        var objNm = selectedReportParamList[j].ObjNm;
        if (objNm.startsWith("datPic") || objNm.startsWith("textBox") || objNm.startsWith("numricBox")) valAray[objNm] = $("#" + objNm).val();
        else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("ky")) {
            var cmb = $("#" + objNm).data("kendoComboBox");
            valAray[objNm] = cmb.value()
        } else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("cd")) {
            var cmbNm = objNm.substring(0, objNm.length - 2);
            cmbNm += "Ky";
            var cmb = $("#" + cmbNm).data("kendoComboBox");
            valAray[objNm] = cmb.text()
        } else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("id")) {
            var cmbNm = objNm.substring(0, objNm.length - 2);
            cmbNm += "Ky";
            var cmb = $("#" + cmbNm).data("kendoComboBox");
            valAray[objNm] = cmb.text()
        } else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("nm")) {
            var cmbNm = objNm.substring(0, objNm.length - 2);
            cmbNm += "KyCdNm";
            var cmb = $("#" + cmbNm).data("kendoComboBox");
            valAray[objNm] = cmb.text()
        } else
            objNm.startsWith("chckBox")
                ? valAray[objNm] = document.getElementById(objNm).checked
                : objNm.startsWith("cmb") &&
                (objNm.startsWith("cmbPrjKy") && (valAray[objNm] = cmbVal.cmbPrjKy),
                    objNm.startsWith("cmbItmKy") && (valAray[objNm] = cmbVal.cmbItmKy),
                    objNm.startsWith("cmbEmpKy") && (valAray[objNm] = cmbVal.cmbEmpKy),
                    objNm.startsWith("cmbTaskKy") && (valAray[objNm] = cmbVal.cmbTaskKy),
                    objNm.startsWith("cmbPrcsDetKy") && (valAray[objNm] = cmbVal.cmbPrcsDetKy),
                    objNm.startsWith("cmbPrcsSchKy") && (valAray[objNm] = cmbVal.cmbPrcsSchKy),
                    objNm.startsWith("cmbAccKy") && (valAray[objNm] = cmbVal.cmbAccKy),
                    objNm.startsWith("cmbAdrKy") && (valAray[objNm] = cmbVal.cmbAdrKy),
                    objNm.startsWith("cmbPrjCd") && (valAray[objNm] = cmbText.cmbPrjCd),
                    objNm.startsWith("cmbPrjID") && (valAray[objNm] = cmbText.cmbPrjCd),
                    objNm.startsWith("cmbItmCd") && (valAray[objNm] = cmbText.cmbItmCd),
                    objNm.startsWith("cmbItmID") && (valAray[objNm] = cmbText.cmbItmCd),
                    objNm.startsWith("cmbEmpCd") && (valAray[objNm] = cmbText.cmbEmpCd),
                    objNm.startsWith("cmbEmpID") && (valAray[objNm] = cmbText.cmbEmpCd),
                    objNm.startsWith("cmbTaskCd") && (valAray[objNm] = cmbText.cmbTaskCd),
                    objNm.startsWith("cmbTaskID") && (valAray[objNm] = cmbText.cmbTaskCd),
                    objNm.startsWith("cmbPrcsSchNo") && (valAray[objNm] = cmbText.cmbPrcsSchNo),
                    objNm.startsWith("cmbPrcsSchNo") && (valAray[objNm] = cmbText.cmbPrcsSchNo),
                    objNm.startsWith("cmbAccCd") && (valAray[objNm] = cmbText.cmbAccCd),
                    objNm.startsWith("cmbAdrCd") && (valAray[objNm] = cmbText.cmbAdrCd), objNm.startsWith("cmbPrjNm") &&
                        (valAray[objNm] = cmbText.cmbPrjNm), objNm.startsWith("cmbItmNm") &&
                        (valAray[objNm] = cmbText.cmbItmNm), objNm.startsWith("cmbTaskNm") &&
                        (valAray[objNm] = cmbText.cmbTaskNm), objNm.startsWith("cmbAccNm") &&
                        (valAray[objNm] = cmbText.cmbAccNm), objNm.startsWith("cmbAdrNm") &&
                        (valAray[objNm] = cmbText.cmbAdrNm));
    }
    $.ajax({
        url: urlReport.SetParamsToSession,
        data: JSON.stringify({
            NeededReportParamsFromObjMas: JSON.stringify(selectedReportParamList),
            NeededReportParams: JSON.stringify(valAray),
            SelectedReportObjKy: cmbVal.cmbRptKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (cmbVal) {
            var cmbText = "http://" + document.location.host + "/DevBL10/Reports/Shared_Report/ReportForm.aspx";
            window.open(cmbText, "_blank")
        },
        error: function (cmbVal) {
            return !1
        }
    })
}

function isNumberOnlyTextField(keyDown) {
    var keyCode = keyDown.which ? keyDown.which : keyDown.keyCode;
    return !(46 != keyCode && keyCode > 31 && (keyCode < 48 || keyCode > 57))
}
var selectedReportParamList = {},
    globlObjKy = 1,
    FormGlblData = {
        FormObjData: null,
        TrnTypKy: 1
    };
$(document).ready(function () {
    GetFormObjData();
}), String.prototype.startsWith || (String.prototype.startsWith = function (a, b) {
    return b = b || 0, this.substr(b, a.length) === a
}), Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}, NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var a = this.length - 1; a >= 0; a--) this[a] && this[a].parentElement && this[a].parentElement.removeChild(this[a])
}, String.prototype.startsWith || (String.prototype.startsWith = function (a, b) {
    return b = b || 0, this.substr(b, a.length) === a
}), String.prototype.endsWith || (String.prototype.endsWith = function (a, b) {
    var c = this.toString();
    ("number" != typeof b || !isFinite(b) || Math.floor(b) !== b || b > c.length) && (b = c.length), b -= a.length;
    var d = c.lastIndexOf(a, b);
    return d !== -1 && d === b
}), String.prototype.includes || (String.prototype.includes = function (a, b) {
    "use strict";
    return "number" != typeof b && (b = 0), !(b + a.length > this.length) && this.indexOf(a, b) !== -1
});

function TelPreview() {
    var cmbVal = {
        cmbRptKy: $("#cmbRptNm").data("kendoComboBox").value(),
        cmbPrjKy: $("#cmbPrjCd").data("kendoComboBox").value(),
        cmbEmpKy: $("#cmbEmpCd").data("kendoComboBox").value(),
        cmbItmKy: $("#cmbItmCd").data("kendoComboBox").value(),
        cmbTaskKy: $("#cmbTaskId").data("kendoComboBox").value(),
        cmbPrcsDetKy: $("#cmbTaskId").data("kendoComboBox").value(),
        cmbPrcsSchKy: $("#cmbPrcsSchNo").data("kendoComboBox").value(),
        cmbAccKy: $("#cmbAccCd").data("kendoComboBox").value(),
        cmbAdrKy: $("#cmbAdrCd").data("kendoComboBox").value()
    },
        cmbText = {
            cmbRptNm: $("#cmbRptNm").data("kendoComboBox").text(),
            cmbPrjCd: $("#cmbPrjCd").data("kendoComboBox").text(),
            cmbPrjNm: $("#cmbPrjNm").data("kendoComboBox").text(),
            cmbTaskId: $("#cmbTaskId").data("kendoComboBox").text(),
            cmbTaskNm: $("#cmbTaskNm").data("kendoComboBox").text(),
            cmbPrcsDetId: $("#cmbTaskId").data("kendoComboBox").text(),
            cmbPrcsDetNm: $("#cmbTaskNm").data("kendoComboBox").text(),
            cmbPrcsSchNo: $("#cmbPrcsSchNo").data("kendoComboBox").text(),
            cmbEmpCd: $("#cmbEmpCd").data("kendoComboBox").text(),
            cmbEmpNm: $("#cmbEmpNm").data("kendoComboBox").text(),
            cmbItmCd: $("#cmbItmCd").data("kendoComboBox").text(),
            cmbItmNm: $("#cmbItmNm").data("kendoComboBox").text(),
            cmbAccCd: $("#cmbAccCd").data("kendoComboBox").text(),
            cmbAccNm: $("#cmbAccNm").data("kendoComboBox").text(),
            cmbAdrCd: $("#cmbAdrCd").data("kendoComboBox").text(),
            cmbAdrNm: $("#cmbAdrNm").data("kendoComboBox").text()
        },
        valAray = {};
    for (j = 0; j < selectedReportParamList.length; j++) {
        var objNm = selectedReportParamList[j].ObjNm;
        if (objNm.startsWith("datPic") || objNm.startsWith("textBox") || objNm.startsWith("numricBox")) valAray[objNm] = $("#" + objNm).val();
        else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("ky")) {
            var cmb = $("#" + objNm).data("kendoComboBox");
            valAray[objNm] = cmb.value()
        } else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("cd")) {
            var cmbNm = objNm.substring(0, objNm.length - 2);
            cmbNm += "Ky";
            var cmb = $("#" + cmbNm).data("kendoComboBox");
            valAray[objNm] = cmb.text()
        } else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("id")) {
            var cmbNm = objNm.substring(0, objNm.length - 2);
            cmbNm += "Ky";
            var cmb = $("#" + cmbNm).data("kendoComboBox");
            valAray[objNm] = cmb.text()
        } else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("nm")) {
            var cmbNm = objNm.substring(0, objNm.length - 2);
            cmbNm += "KyCdNm";
            var cmb = $("#" + cmbNm).data("kendoComboBox");
            valAray[objNm] = cmb.text()
        } else
            objNm.startsWith("chckBox")
                ? valAray[objNm] = document.getElementById(objNm).checked
                : objNm.startsWith("cmb") &&
                (objNm.startsWith("cmbPrjKy") && (valAray[objNm] = cmbVal.cmbPrjKy),
                    objNm.startsWith("cmbItmKy") && (valAray[objNm] = cmbVal.cmbItmKy),
                    objNm.startsWith("cmbEmpKy") && (valAray[objNm] = cmbVal.cmbEmpKy),
                    objNm.startsWith("cmbTaskKy") && (valAray[objNm] = cmbVal.cmbTaskKy),
                    objNm.startsWith("cmbPrcsDetKy") && (valAray[objNm] = cmbVal.cmbPrcsDetKy),
                    objNm.startsWith("cmbPrcsSchKy") && (valAray[objNm] = cmbVal.cmbPrcsSchKy),
                    objNm.startsWith("cmbAccKy") && (valAray[objNm] = cmbVal.cmbAccKy),
                    objNm.startsWith("cmbAdrKy") && (valAray[objNm] = cmbVal.cmbAdrKy),
                    objNm.startsWith("cmbPrjCd") && (valAray[objNm] = cmbText.cmbPrjCd),
                    objNm.startsWith("cmbPrjID") && (valAray[objNm] = cmbText.cmbPrjCd),
                    objNm.startsWith("cmbItmCd") && (valAray[objNm] = cmbText.cmbItmCd),
                    objNm.startsWith("cmbItmID") && (valAray[objNm] = cmbText.cmbItmCd),
                    objNm.startsWith("cmbEmpCd") && (valAray[objNm] = cmbText.cmbEmpCd),
                    objNm.startsWith("cmbEmpID") && (valAray[objNm] = cmbText.cmbEmpCd),
                    objNm.startsWith("cmbTaskCd") && (valAray[objNm] = cmbText.cmbTaskCd),
                    objNm.startsWith("cmbTaskID") && (valAray[objNm] = cmbText.cmbTaskCd),
                    objNm.startsWith("cmbPrcsSchNo") && (valAray[objNm] = cmbText.cmbPrcsSchNo),
                    objNm.startsWith("cmbPrcsSchNo") && (valAray[objNm] = cmbText.cmbPrcsSchNo),
                    objNm.startsWith("cmbAccCd") && (valAray[objNm] = cmbText.cmbAccCd),
                    objNm.startsWith("cmbAdrCd") && (valAray[objNm] = cmbText.cmbAdrCd), objNm.startsWith("cmbPrjNm") &&
                        (valAray[objNm] = cmbText.cmbPrjNm), objNm.startsWith("cmbItmNm") &&
                        (valAray[objNm] = cmbText.cmbItmNm), objNm.startsWith("cmbTaskNm") &&
                        (valAray[objNm] = cmbText.cmbTaskNm), objNm.startsWith("cmbAccNm") &&
                        (valAray[objNm] = cmbText.cmbAccNm), objNm.startsWith("cmbAdrNm") &&
                        (valAray[objNm] = cmbText.cmbAdrNm));
    }
    $.ajax({
        url: urlReport.SetParamsToSession,
        data: JSON.stringify({
            NeededReportParamsFromObjMas: JSON.stringify(selectedReportParamList),
            NeededReportParams: JSON.stringify(valAray),
            SelectedReportObjKy: cmbVal.cmbRptKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (cmbVal) {
            var cmbText = "http://" + document.location.host + "/DevBL10/Reports/TelericReport/TelericReport.aspx";
            window.open(cmbText, "_blank")
        },
        error: function (cmbVal) {
            return !1
        }
    })
}