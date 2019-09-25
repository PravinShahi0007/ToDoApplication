function GetFormObjData() {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (fomObjdata) {
            FormGlblData.FormObjData = fomObjdata,
                DocReadyCus();
        }
    });
}

function DocReadyCus() {
    loadReportCombo(),
        loadCombo(),
        LoadTaskCombo(1),
        hideAllCombo();
}

function loadReportCombo() {
    $("#cmbRptNm").kendoComboBox({
        dataValueField: "ObjKy",
        dataTextField: "ObjCaptn",
        dataSource: ReportDataSource(viewBag.ObjKy),
        change: function (a) {
            var cmb = $("#cmbRptNm").data("kendoComboBox"),
                value = cmb.value();
            value > 1 && (loadSelectedReport(value), globlObjKy = value);
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Report"
    }),
    $("#cmbRptNm").parent().css("width", "100%");

    if (viewBag.ChildKy != 1 || viewBag.ChildKy != undefined || viewBag.ChildKy != "") {
        $("#cmbRptNm").data("kendoComboBox").value(viewBag.ChildKy);
    }
}

function ReportDataSource(prntKey) {
    //var ObjVisible = GetObjVisible(ObjNm);
    //if (ObjVisible == 0) {
    //    return [];
    //}
    var data = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlReport.UsrObjPrp_SelectWeb,
                data: {
                    PrntKy: prntKey,
                    ObjTyp: "",
                    ObjNm: ""
                },
                dataType: "json"
            }
        }
    });
    return data;
}

function loadSelectedReport(objTyp) {
    $.ajax({
        url: urlReport.UsrObjChild_SelectByPrntandSubObjTypWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: objTyp,
            ObjTyp: "ReportParameter",
            ObjNm: ""
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            FormGlblData.FormObjData = data, $("#ButtonSec1").empty(), Button_From_Dynamic_ForReport(objTyp, "ButtonSec1"), createDynamicElement(data), SetHandlingEnterKeyEvent("", objTyp)
        },
        error: function (objTyp) { }
    })
}
// I dindt unminify this code because this is a pure js code to implemet DOM elements textbox
function createTextBox(textBoxDetails) {
    var getId = document.getElementById("divTextBox"),
        c = document.createElement("div");
    c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-2 col-sm-2";
    var e = document.createElement("label");
    e.className = "lbl", e.innerHTML = textBoxDetails.ObjCaptn, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-4 col-sm-4";
    var g = document.createElement("input");
    g.className = "k-input", g.type = "text", g.id = textBoxDetails.ObjNm, f.appendChild(g), getId.appendChild(c), c.appendChild(d), c.appendChild(f);
    new Date
}
// I dindt unminify this code because this is a pure js code to implemet DOM elements numericText Box
function createNumericBox(numericData) {
    var b = document.getElementById("divNumericBox"),
        c = document.createElement("div");
    c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-2 col-sm-2";
    var e = document.createElement("label");
    e.className = "lbl", e.innerHTML = numericData.ObjCaptn, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-2 col-sm-2";
    var g = document.createElement("input");
    g.className = "k-input", g.onkeypress = isNumberOnlyTextField, g.type = "text", g.id = numericData.ObjNm, f.appendChild(g), b.appendChild(c), c.appendChild(d), c.appendChild(f);
    new Date
}
// I dindt unminify this code because this is a pure js code to implemet DOM elements CdMasCombo
function createCdMasLookUpCombo(cdmasComboDetail) {
    var b = document.getElementById("divForCdMasLookUpCombo"),
        c = document.createElement("div");
    c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-2 col-sm-2";
    var e = document.createElement("label");
    e.className = "lbl", e.innerHTML = cdmasComboDetail.ObjCaptn, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-4 col-sm-4";
    var g = document.createElement("div");
    g.className = "cmb", g.id = cdmasComboDetail.ObjNm, f.appendChild(g);
    var h = document.createElement("div");
    h.className = "col-md-6 col-sm-6";
    var i = document.createElement("div");
    i.className = "cmb", i.id =
        cdmasComboDetail.ObjNm + "CdNm", h.appendChild(i), b.appendChild(c), c.appendChild(d), c.appendChild(f), c
        .appendChild(h), $("#" + cdmasComboDetail.ObjNm).kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: dataSrcCreateCodeCdMasLookUp(cdmasComboDetail.ObjNm),
            change: function (b) {
                var cmb = $("#" + cdmasComboDetail.ObjNm).data("kendoComboBox"),
                    value = cmb.value();
                if ("" != value) {
                    var e = ComboValidations(cdmasComboDetail.ObjNm);
                    e
                        ? ($("#" + cdmasComboDetail.ObjNm).data("kendoComboBox").value(value),
                            $("#" + cdmasComboDetail.ObjNm + "CdNm").data("kendoComboBox").value(value))
                        : ($("#" + cdmasComboDetail.ObjNm).data("kendoComboBox").value(""), $("#" +
                            cdmasComboDetail.ObjNm +
                            "CdNm").data("kendoComboBox").value(""));
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select cdmasComboDetail code ..."
        }), $("#" + cdmasComboDetail.ObjNm + "CdNm").kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: dataSrcCreateCdNmCdMasLookUp(cdmasComboDetail.ObjNm),
            change: function (b) {
                var cmb = $("#" + cdmasComboDetail.ObjNm + "CdNm").data("kendoComboBox"),
                    value = cmb.value();
                if ("" != value) {
                    var e = ComboValidations(cdmasComboDetail.ObjNm + "CdNm");
                    e
                        ? ($("#" + cdmasComboDetail.ObjNm).data("kendoComboBox").value(value),
                            $("#" + cdmasComboDetail.ObjNm + "CdNm").data("kendoComboBox").value(value))
                        : ($("#" + cdmasComboDetail.ObjNm).data("kendoComboBox").value(""), $("#" +
                            cdmasComboDetail.ObjNm +
                            "CdNm").data("kendoComboBox").value(""))
                }
            },
            filter: "startswith",
            suggest: !0,
            placeholder: "Select cdmasComboDetail Name ..."
        });
}
// I dindt fully unminify this code because this is a pure js code to implemet DOM elements Date Picker
function createDatePicker(datePickerDetail) {
    var b = document.getElementById("divDatePicker"),
        c = document.createElement("div");
    c.className = "row";
    var d = document.createElement("div");
    d.className = "col-md-2 col-sm-2";
    var e = document.createElement("label");
    e.className = "lbl", e.innerHTML = datePickerDetail.ObjCaptn, d.appendChild(e);
    var f = document.createElement("div");
    f.className = "col-md-4 col-sm-4";
    var g = document.createElement("input");
    g.className = "cmb", g.id = datePickerDetail.ObjNm, f.appendChild(g), b.appendChild(c), c.appendChild(d), c.appendChild(f);
    var h = new Date;
    $("#" + datePickerDetail.ObjNm).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2e3)
    }), $("#" + datePickerDetail.ObjNm).data("kendoDatePicker").value(h)
}
// I dindt fully unminify this code because this is a pure js code to implemet DOM elements Chekbox
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
//Show all combo
function createComboBox(comDetail) {
    comDetail.ObjNm.startsWith("cmbPrj") && $("#cmbPrj").show(), comDetail.ObjNm.startsWith("cmbEmp") && $("#cmbEmp").show(),
        comDetail.ObjNm.startsWith("cmbTask") && $("#cmbTask").show(), comDetail.ObjNm.startsWith("cmbPrcsDet") && $("#cmbTask").show(),
        comDetail.ObjNm.startsWith("cmbPrcsSch") && $("#cmbPrcsSch").show(),
        comDetail.ObjNm.startsWith("cmbItm") && $("#cmbItm").show(), comDetail.ObjNm.startsWith("cmbAcc") && $("#cmbAcc").show(), comDetail
            .ObjNm.startsWith("cmbAdr") &&
            $("#cmbAdr").show();
}
//Hide all combo
function hideAllCombo() {
    $("#cmbItm").hide(), $("#cmbEmp").hide(), $("#cmbTask").hide(), $("#cmbPrcsSch").hide(), $("#cmbPrj").hide(), $(
        "#cmbAcc").hide(), $("#cmbAdr").hide();
}
//Create All Elements
function createDynamicElement(elementData) {
    selectedReportParamList = elementData;
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
    for (o.id = "divForCdMasLookUpCombo", n.appendChild(o), hideAllCombo(), j = 0; j < elementData.length; j++) {
        var p = elementData[j].ObjNm;
        elementData[j].ObjTyp;
        p.startsWith("datPic") ? createDatePicker(elementData[j]) : p.startsWith("cmFrmCdMas_") && p.toLowerCase().endsWith("ky") ? createCdMasLookUpCombo(elementData[j]) : p.startsWith("numricBox") ? createNumericBox(elementData[j]) : p.startsWith("textBox") ? createTextBox(elementData[j]) : p.startsWith("cmb") ? createComboBox(elementData[j]) : p.startsWith("chckBox") && createCheckBox(elementData[j])
    }
}

function LoadTaskCombo(prntKy) {
    function GetTaskDataSource(prntKy) {
        var b = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlReport.GetTaskList,
                    data: {
                        PrjKy: prntKy
                    },
                    dataType: "json"
                }
            }
        });
        return b
    }

    function PrcsSchNoDataSource(prntKy) {
        var b = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlComboLoad.PrcsSchNo_SelectMob,
                    data: {
                        PrjKy: prntKy
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
        dataSource: GetTaskDataSource(prntKy),
        change: function (e) {
            var cmb = $("#cmbTaskId").data("kendoComboBox"),
                value = cmb.value();
            if ("" != value) {
                var isValidate = ComboValidations("cmbTaskId");
                isValidate
                    ? ($("#cmbTaskNm").data("kendoComboBox").value(value), $("#cmbTaskId").data("kendoComboBox")
                        .value(value))
                    : ($("#cmbTaskNm").data("kendoComboBox").value(""), $("#cmbTaskId").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select prntKy Task Id ..."
    }), $("#cmbTaskNm").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskNm",
        dataSource: GetTaskDataSource(prntKy),
        change: function (e) {
            var cmb = $("#cmbTaskNm").data("kendoComboBox"),
                value = cmb.value();
            if ("" != value) {
                var isValdate = ComboValidations("cmbTaskId");
                isValdate
                    ? ($("#cmbTaskNm").data("kendoComboBox").value(value), $("#cmbTaskId").data("kendoComboBox")
                        .value(value))
                    : ($("#cmbTaskNm").data("kendoComboBox").value(""), $("#cmbTaskId").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select prntKy Task Nm ..."
    }), $("#cmbPrcsSchNo").kendoComboBox({
        dataValueField: "PrcsSchKy",
        dataTextField: "SchNo",
        dataSource: PrcsSchNoDataSource(prntKy),
        change: function (e) {
            var cmb = $("#cmbPrcsSchNo").data("kendoComboBox"),
                value = cmb.value();
            if ("" != value) {
                var isValidate = ComboValidations("cmbPrcsSchNo");
                isValidate
                    ? $("#cmbPrcsSchNo").data("kendoComboBox").value(value)
                    : $("#cmbPrcsSchNo").data("kendoComboBox").value("")
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select prntKy Prcs Sch No ..."
    });
}

function loadCombo() {
    //Previously this funtion doesnot had a funtion call a it take the form global key to load i cannot understand why it is 
    //Passing global objky for this emplyoee only data source only even UT doesnt know so i keep t as it is 
    //Charith
    function EmpCdDataSource(a) {
        
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0) {
            return [];
        }
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

    function EmpNmDataSource(a) {
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0) {
            return [];
        }
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

    function ItemCddataSource(a) {
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
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

    function ItemNmdataSource(a) {
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
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

    function PrjIddataSource(a) {
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
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

    function PrjNmdataSource(a) {
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
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

    function AccCdDataSource(a) {
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
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

    function AccNmDataSource(a) {
        var b = GetObjKy(a)
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }

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

    function AdrIdDataSource(a) {
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
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
        return c;
    }

    function AdrNmDataSource(a) {
        var b = GetObjKy(a);
        var ObjVisible = GetObjVisible(a);
        if (ObjVisible == 0 || !ObjVisible) {
            return [];
        }
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
                d ? ($("#cmbEmpNm").data("kendoComboBox").value(c), $("#cmbEmpCd").data("kendoComboBox").value(c)) : ($("#cmbEmpNm").data("kendoComboBox").value(""), $("#cmbEmpCd").data("kendoComboBox").value(""))
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
                d ? ($("#cmbEmpNm").data("kendoComboBox").value(c), $("#cmbEmpCd").data("kendoComboBox").value(c)) : ($("#cmbEmpNm").data("kendoComboBox").value(""), $("#cmbEmpCd").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Emp Nm.."
    }), $("#cmbItmCd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItemCddataSource("cmbItmKy"),
        change: function (a) {
            var b = $("#cmbItmCd").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbItmCd");
                d ? ($("#cmbItmNm").data("kendoComboBox").value(c), $("#cmbItmCd").data("kendoComboBox").value(c)) : ($("#cmbItmNm").data("kendoComboBox").value(""), $("#cmbItmCd").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Item Cd.."
    }), $("#cmbItmNm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItemNmdataSource("cmbItmKy"),
        change: function (a) {
            var b = $("#cmbItmNm").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbItmNm");
                d ? ($("#cmbItmNm").data("kendoComboBox").value(c), $("#cmbItmCd").data("kendoComboBox").value(c)) : ($("#cmbItmNm").data("kendoComboBox").value(""), $("#cmbItmCd").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Item Cd.."
    }), $("#cmbPrjCd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "DocNo",
        dataSource: PrjIddataSource("cmbPrjKy"),
        change: function (a) {
            var b = $("#cmbPrjCd").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbPrjCd");
                d ? ($("#cmbPrjNm").data("kendoComboBox").value(c), $("#cmbPrjCd").data("kendoComboBox").value(c), LoadTaskCombo(c)) : ($("#cmbPrjNm").data("kendoComboBox").value(""), $("#cmbPrjCd").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Project Id.."
    }), $("#cmbPrjNm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNmdataSource("cmbPrjKy"),
        change: function (a) {
            var b = $("#cmbPrjNm").data("kendoComboBox"),
                c = b.value();
            if ("" != c) {
                var d = ComboValidations("cmbPrjNm");
                d ? ($("#cmbPrjCd").data("kendoComboBox").value(c), $("#cmbPrjNm").data("kendoComboBox").value(c), LoadTaskCombo(c)) : ($("#cmbPrjCd").data("kendoComboBox").value(""), $("#cmbPrjNm").data("kendoComboBox").value(""))
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
                d ? ($("#cmbAccNm").data("kendoComboBox").value(c), $("#cmbAccCd").data("kendoComboBox").value(c)) : ($("#cmbAccNm").data("kendoComboBox").value(""), $("#cmbAccCd").data("kendoComboBox").value(""))
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
                d ? ($("#cmbAccNm").data("kendoComboBox").value(c), $("#cmbAccCd").data("kendoComboBox").value(c)) : ($("#cmbAccNm").data("kendoComboBox").value(""), $("#cmbAccCd").data("kendoComboBox").value(""))
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
                d ? ($("#cmbAdrCd").data("kendoComboBox").value(c), $("#cmbAdrNm").data("kendoComboBox").value(c)) : ($("#cmbAdrCd").data("kendoComboBox").value(""), $("#cmbAdrNm").data("kendoComboBox").value(""))
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
                d ? ($("#cmbAdrCd").data("kendoComboBox").value(c), $("#cmbAdrNm").data("kendoComboBox").value(c)) : ($("#cmbAdrCd").data("kendoComboBox").value(""), $("#cmbAdrNm").data("kendoComboBox").value(""))
            }
        },
        filter: "startswith",
        suggest: !0,
        placeholder: "Select Address Name.."
    })
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
    PostingClickFunction("NO_SP");
}

function PostingClickFunction(spName) {
    var cmbValue = {
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
        cmbValArray = {};
    for (j = 0; j < selectedReportParamList.length; j++) {
        var objNm = selectedReportParamList[j].ObjNm;
        if (objNm.startsWith("datPic") || objNm.startsWith("textBox") || objNm.startsWith("numricBox")) cmbValArray[objNm] = $("#" + objNm).val();
        else if (objNm.startsWith("cmFrmCdMas_") && objNm.toLowerCase().endsWith("ky")) {
            var cmb = $("#" + objNm).data("kendoComboBox");
            cmbValArray[objNm] = cmb.value()
        } else
            objNm.startsWith("chckBox")
                ? cmbValArray[objNm] = document.getElementById(objNm).checked
                : objNm.startsWith("cmb") &&
                (objNm.startsWith("cmbPrjKy") && (cmbValArray[objNm] = cmbValue.cmbPrjKy),
                    objNm.startsWith("cmbItmKy") && (cmbValArray[objNm] = cmbValue.cmbItmKy),
                    objNm.startsWith("cmbEmpKy") && (cmbValArray[objNm] = cmbValue.cmbEmpKy),
                    objNm.startsWith("cmbTaskKy") && (cmbValArray[objNm] = cmbValue.cmbTaskKy),
                    objNm.startsWith("cmbPrcsDetKy") && (cmbValArray[objNm] = cmbValue.cmbPrcsDetKy),
                    objNm.startsWith("cmbPrcsSchKy") && (cmbValArray[objNm] = cmbValue.cmbPrcsSchKy),
                    objNm.startsWith("cmbAccKy") && (cmbValArray[objNm] = cmbValue.cmbAccKy),
                    objNm.startsWith("cmbAdrKy") && (cmbValArray[objNm] = cmbValue.cmbAdrKy),
                    objNm.startsWith("cmbPrjCd") && (cmbValArray[objNm] = cmbText.cmbPrjCd),
                    objNm.startsWith("cmbPrjID") && (cmbValArray[objNm] = cmbText.cmbPrjCd),
                    objNm.startsWith("cmbItmCd") && (cmbValArray[objNm] = cmbText.cmbItmCd),
                    objNm.startsWith("cmbItmID") && (cmbValArray[objNm] = cmbText.cmbItmCd),
                    objNm.startsWith("cmbEmpCd") && (cmbValArray[objNm] = cmbText.cmbEmpCd),
                    objNm.startsWith("cmbEmpID") && (cmbValArray[objNm] = cmbText.cmbEmpCd),
                    objNm.startsWith("cmbTaskCd") && (cmbValArray[objNm] = cmbText.cmbTaskCd),
                    objNm.startsWith("cmbTaskID") && (cmbValArray[objNm] = cmbText.cmbTaskCd),
                    objNm.startsWith("cmbPrcsSchNo") && (cmbValArray[objNm] = cmbText.cmbPrcsSchNo),
                    objNm.startsWith("cmbPrcsSchNo") && (cmbValArray[objNm] = cmbText.cmbPrcsSchNo),
                    objNm.startsWith("cmbAccCd") && (cmbValArray[objNm] = cmbText.cmbAccCd),
                    objNm.startsWith("cmbAdrCd") && (cmbValArray[objNm] = cmbText.cmbAdrCd),
                    objNm.startsWith("cmbPrjNm") && (cmbValArray[objNm] = cmbText.cmbPrjNm), objNm.startsWith("cmbItmNm") &&
                        (cmbValArray[objNm] = cmbText.cmbItmNm), objNm.startsWith("cmbTaskNm") && (cmbValArray[objNm] = cmbText.cmbTaskNm),
                    objNm.startsWith("cmbAccNm") && (cmbValArray[objNm] = cmbText.cmbAccNm), objNm.startsWith("cmbAdrNm") &&
                        (cmbValArray[objNm] = cmbText.cmbAdrNm));
    }
    $.ajax({
        url: urlReport.SetIntegrityChecksToSession,
        data: JSON.stringify({
            SPName: spName,
            SelectedIntegrityChecksObjKy: cmbValue.cmbRptKy,
            NeededIntegrityChecksParams: JSON.stringify(cmbValArray),
            NeededIntegrityChecksParamsFromObjMas: JSON.stringify("")
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (spName) {
            var cmbValue = "http://" + document.location.host + "/DevBL10/Report/IntegrityChecksGrid";
            window.open(cmbValue, "_blank");
        },
        error: function (spName) {
            return !1
        }
    });
}

function isNumberOnlyTextField(keyPress) {
    var keyCode = keyPress.which ? keyPress.which : keyPress.keyCode;
    return !(46 != keyCode && keyCode > 31 && (keyCode < 48 || keyCode > 57));
}
var selectedReportParamList = {},
    globlObjKy = 1,
    FormGlblData = {
        FormObjData: null,
        TrnTypKy: 1
    };
$(document).ready(function () {
    GetFormObjData();
});