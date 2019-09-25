//Code Was Unminified as UTs Request 20170727
function Button_From_Dynamic(buttnSec) {
    $.ajax({
        url: urlObjMas.UsrObjSec_SelectWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy,
            ObjTyp: "Button",
            ObjNm: buttnSec
        }),
        contentType: "application/json; charset=utf-8",
        success: function (buttonSetData) {
            Create_ButtonSecNm_From_Dynamic(buttnSec, buttonSetData);
        }
    });
}

function Button_From_Dynamic_ForReport(PrntKy, ObjNm) {
    $.ajax({
        url: urlObjMas.UsrObjSec_SelectWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: PrntKy,
            ObjTyp: "Button",
            ObjNm: ObjNm
        }),
        contentType: "application/json; charset=utf-8",
        success: function (PrntKy) {
            Create_ButtonSecNm_From_Dynamic(ObjNm, PrntKy);
        }
    })
}

function Create_ButtonSecNm_From_Dynamic(buttnSec, buttonSetData) {
    for (var c = 0; c < buttonSetData.length; c++) {
        var d = document.createElement("BUTTON");
        if (buttonSetData[c].ObjCaptn.length > 0) {
            var e = document.createTextNode(buttonSetData[c].ObjCaptn);
            d.appendChild(e)
        }
        d.id = buttonSetData[c].ObjNm,
            d.className = buttonSetData[c].CSSClass,
            d.setAttribute("onclick", buttonSetData[c].OnClickAction),
            d.setAttribute("data-tooltip", buttonSetData[c].ToolTip),
            document.getElementById(buttnSec).appendChild(d);
    }
}

function GetObjKy(ObjNm) {
    for (var objData = FormGlblData.FormObjData, c = 0; c < objData.length; c++)
        if (objData[c].ObjNm == ObjNm) return objData[c].ObjKy;
    return 1;
}

function GetObjVisible(ObjNm) {
    for (var ObjData = FormGlblData.FormObjData, c = 0; c < ObjData.length; c++)
        if (ObjData[c].ObjNm == ObjNm) return ObjData[c].isVisible;
}

function HideSectnFrmtGrp() {
    $.ajax({
        url: urlObjMas.UsrObjPrp_SelectWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy,
            ObjTyp: "SectnFrmtGrp",
            ObjNm: ""
        }),
        contentType: "application/json; charset=utf-8",
        success: function (a) {
            for (var b = 0; b < a.length; b++) 0 == a[b].isVisible && $("#" + a[b].ObjNm).hide()
        }
    });
}

function SetFirstFocusObj() {
    for (var ObjData = FormGlblData.FormObjData, b = 0; b < ObjData.length; b++)
        if (1 == ObjData[b].isFirstFocusObj)
            return void ("TextBox" == ObjData[b].ObjTyp
                ? $("#" + ObjData[b].ObjNm + "_Val").focus()
                : "DatePicker" == ObjData[b].ObjTyp && $("#" + ObjData[b].ObjNm + "_Val").focus());
}

function setColumnProp(columnsDefine, objKy, objTyp, objNm, gridNo) {
    setColumnPropWithOrWithOutGridData(columnsDefine, objKy, objTyp, objNm, gridNo, null)
}

function setColumnPropWithGridData(columnsDefine, objKy, objTyp, objNm, gridNo, f) {
    setColumnPropWithOrWithOutGridData(columnsDefine, objKy, objTyp, objNm, gridNo, f)
}

function setColumnPropWithOrWithOutGridData(columnsDefine, objKy, objTyp, objNm, gridNo, f) {
    $.ajax({
        url: urlUsrObjPrp_SelectDeepSearchWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: objKy,
            ObjTyp: objTyp,
            ObjNm: objNm
        }),
        contentType: "application/json; charset=utf-8",
        success: function (objMasData) {
            overwriteColumnProp(columnsDefine, objMasData, gridNo, f);
        }
    });
}

function overwriteColumnProp(columnsDefine, objMasData, gridNo, d) {
    for (i = 0; i < columnsDefine.length; i++)
        for (j = 0; j < objMasData.length; j++) columnsDefine[i].field == objMasData[j].ObjNm && (columnsDefine[i].title = objMasData[j].ObjCaptn, columnsDefine[i].width = objMasData[j].Width, columnsDefine[i].locked = objMasData[j].isFreeze, columnsDefine[i].lockable = !0, 0 == objMasData[j].isVisible ? columnsDefine[i].hidden = !0 : columnsDefine[i].hidden = !1);
    "ItmCmpnGrid" == gridNo
        ? LoadGridWithColumnPropItmCmpnGrid(columnsDefine, gridNo)
        : 2 == gridNo
        ? LoadGridWithColumnPropTwo(columnsDefine, gridNo)
        : 3 == gridNo
        ? LoadGridWithColumnPropThree(columnsDefine, gridNo)
        : 4 == gridNo
        ? LoadGridWithColumnPropFour(columnsDefine, gridNo)
        : 5 == gridNo
        ? LoadGridWithColumnPropFive(columnsDefine, gridNo)
        : null != d
        ? LoadGridWithColumnPropWithGridData(columnsDefine, gridNo, d)
        : LoadGridWithColumnProp(columnsDefine, gridNo);
}

function setHdrSectionProp(a, prntKy, objTyp, objNm) {
    $.ajax({
        url: urlUsrObjPrp_SelectDeepSearchWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: prntKy,
            ObjTyp: objTyp,
            ObjNm: objNm
        }),
        contentType: "application/json; charset=utf-8",
        //
        success: function (sectiondata) {
            overwriteHdrSectionProp(a, sectiondata);
        }
    });
}

function overwriteHdrSectionProp(a, sectiondata) {
    HideHdrSectionProp(a, sectiondata);
    SetDefaultLable(a, sectiondata);
}

function HideHdrSectionProp(a, sectiondata) {
    for (j = 0; j < sectiondata.length; j++) 0 == sectiondata[j].isVisible && $("#" + sectiondata[j].ObjNm).hide();
}

function SetDefaultLable(a, sectiondata) {
    for (j = 0; j < sectiondata.length; j++) {
        var c = document.getElementById(sectiondata[j].ObjNm + "_Lbl");
        if (sectiondata[j].isMust == 1) {
            sectiondata[j].ObjCaptn = sectiondata[j].ObjCaptn + '*'.fontcolor("red");
        }
        void 0 != c && (c.innerHTML = sectiondata[j].ObjCaptn);
    }
}

function SetHandlingEnterKeyEvent(a, prntKy) {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,//urlUsrObjPrp_SelectAllLastChildWeb
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: prntKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            HandlingEnterKeyEvent(a, data);
        }
    })
}

function HandlingEnterKeyEvent(a, enterKeyData) {
    for (j = 0; j < enterKeyData.length; j++)
        null != enterKeyData[j].ObjNm &&
                enterKeyData[j].ObjNm.length > 5 &&
                "null" != enterKeyData[j].ObjNm &&
                null != enterKeyData[j].ObjTyp &&
                enterKeyData[j].ObjTyp.length > 1 &&
                "null" != enterKeyData[j].ObjTyp &&
                void 0 != document.getElementById(enterKeyData[j].ObjNm) &&
                Set_Data_Obj_ObjKy(enterKeyData[j].ObjKy, enterKeyData[j].ObjNm, enterKeyData[j].ObjTyp),
            null != enterKeyData[j].NxtEntObjNm &&
                enterKeyData[j].NxtEntObjNm.length > 5 &&
                "null" != enterKeyData[j].NxtEntObjNm &&
                SetEnterKeyEventNext(enterKeyData[j].ObjNm,
                    enterKeyData[j].ObjTyp,
                    enterKeyData[j].NxtEntObjNm,
                    enterKeyData);
}

function Get_AllDefalutValue_Obj() {
    var objDefaultValue = [];
    for (objDefaultValue, frmGlblData = FormGlblData.FormObjData, c = 0; c < frmGlblData.length; c++)
        if (frmGlblData[c].DefaultValue.length > 0) {
            var objDefaultData = [];
            objDefaultData = {
                ObjNm: frmGlblData[c].ObjNm,
                DefaultText: frmGlblData[c].DefaultValue,
                DefaultValue: 1,
                isCdDefaultSet: !1,
                isNmDefaultSet: !1,
            }, objDefaultValue.push(objDefaultData);
        }
    return objDefaultValue;
}


function Set_AllDefalutValue_Obj() {
    if (AllDefalutValueObj = FormGlblData.AllDefalutValueObj, null != AllDefalutValueObj)
        for (var a = 0; a < AllDefalutValueObj.length; a++) {
            if (!AllDefalutValueObj[a].isCdDefaultSet) {
                var b = $("#" + AllDefalutValueObj[a].ObjNm + "_Cd").data("kendoComboBox");
                null != b && b.dataSource.data().length > 0 && (b.text(AllDefalutValueObj[a].DefaultText), AllDefalutValueObj[a].DefaultValue = b.value(), AllDefalutValueObj[a].isCdDefaultSet = !0, b.value(AllDefalutValueObj[a].DefaultValue), $("#" + AllDefalutValueObj[a].ObjNm + "_Cd").data("kendoComboBox").trigger("change"))
            }
            if (AllDefalutValueObj[a].isCdDefaultSet && !AllDefalutValueObj[a].isNmDefaultSet) {
                var c = $("#" + AllDefalutValueObj[a].ObjNm + "_Nm").data("kendoComboBox");
                null != c && c.dataSource.data().length > 0 && (c.value(AllDefalutValueObj[a].DefaultValue), AllDefalutValueObj[a].isNmDefaultSet = !0)
            }
        }
}

function sortByKey(validOdrAray, sortType) {
    return validOdrAray.sort(function (validOdrAray, c) {
        var sortOdr = validOdrAray[sortType],
            e = c[sortType];
        return sortOdr < e ? -1 : sortOdr > e ? 1 : 0;
    });
}

function Set_Data_Obj_ObjKy(ojbKy, ojbNm, ojbTyp) {
    "TextBox" == ojbTyp
        ? ojbNm += "_Val"
        : "Cmb" == ojbTyp
        ? ojbNm += "_Cd"
        : "NumericBox" == ojbTyp
        ? ojbNm += "_Val"
        : "DatePicker" == ojbTyp && (ojbNm += "_Val"), void 0 != document.getElementById(ojbNm) &&
        document.getElementById(ojbNm).setAttribute("data-obj-objky", ojbKy);
}
function SetEnterKeyEventNext(dataArrayNm, objType, nxtEntObj, dataArray) {
    for (k = 0; k < dataArray.length; k++) {
        if (dataArray[k].ObjNm == nxtEntObj) {
            var f = nxtEntObj,
                g = dataArray[k].ObjTyp;
            if (console.log(objType + " , " + dataArrayNm + " , " + g + " , " + f), "TextBox" == objType && "TextBox" == g) {
                var h = $("#" + dataArrayNm + "_Val"),
                    i = $("#" + f + "_Val");
                void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").focus(), dataArrayNm.preventDefault())
                })
            } else if ("TextBox" == objType && "Cmb" == g) {
                var h = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Cd").data("kendoComboBox");
                void 0 != h && void 0 != j && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ("HdrSec5_CmbItm" == f ? $("#" + f + "_Val").focus() : $("#" + f + "_Cd").data("kendoComboBox").input.focus(), dataArrayNm.preventDefault())
                })
            } else if ("TextBox" == objType && "NumericBox" == g) {
                var h = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Val").data("kendoNumericTextBox");
                void 0 != h && void 0 != j && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoNumericTextBox").focus(), dataArrayNm.preventDefault())
                })
            } else if ("TextBox" == objType && "DatePicker" == g) {
                var h = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Val").data("kendoDatePicker");
                void 0 != h && void 0 != j && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoDatePicker").element.focus(), dataArrayNm.preventDefault())
                })
            } else if ("NumericBox" == objType && "NumericBox" == g) {
                var l = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Val").data("kendoNumericTextBox");
                void 0 != l && void 0 != j && $("#" + dataArrayNm + "_Val").keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoNumericTextBox").focus(), dataArrayNm.preventDefault())
                })
            } else if ("NumericBox" == objType && "Cmb" == g) {
                var l = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Cd").data("kendoComboBox");
                void 0 != l && void 0 != j && $("#" + dataArrayNm + "_Val").keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ("HdrSec5_CmbItm" == f ? $("#" + f + "_Val").focus() : $("#" + f + "_Cd").data("kendoComboBox").input.focus(), dataArrayNm.preventDefault())
                })
            } else if ("NumericBox" == objType && "TextBox" == g) {
                var l = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Val");
                void 0 != l && void 0 != j && $("#" + dataArrayNm + "_Val").keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && (setTimeout(function () {
                        $("#" + f + "_Val").focus()
                    }, 10), dataArrayNm.preventDefault())
                })
            } else if ("NumericBox" == objType && "DatePicker" == g) {
                var l = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Val").data("kendoDatePicker");
                void 0 != l && void 0 != j && $("#" + dataArrayNm + "_Val").keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoDatePicker").element.focus(), dataArrayNm.preventDefault())
                })
            } else if ("Cmb" == objType && "Cmb" == g) {
                var l = $("#" + dataArrayNm + "_Cd").data("kendoComboBox"),
                    j = $("#" + f + "_Cd").data("kendoComboBox");
                void 0 != l && void 0 != j && ($("#" + dataArrayNm + "_Cd").data("kendoComboBox").input.keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && (setTimeout(function () {
                        "HdrSec5_CmbItm" == f ? $("#" + f + "_Val").focus() : $("#" + f + "_Cd").data("kendoComboBox").input.focus()
                    }, 10), dataArrayNm.preventDefault())
                }), $("#" + dataArrayNm + "_Cd").keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && dataArrayNm.preventDefault()
                }))
            } else if ("Cmb" == objType && "TextBox" == g) {
                var l = $("#" + dataArrayNm + "_Cd").data("kendoComboBox"),
                    i = $("#" + f + "_Val");
                void 0 != l && void 0 != i && ($("#" + dataArrayNm + "_Cd").data("kendoComboBox").input.keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && (setTimeout(function () {
                        $("#" + f + "_Val").focus()
                    }, 10), dataArrayNm.preventDefault())
                }), $("#" + dataArrayNm + "_Cd").keydown(function (dataArrayNm) {
                    dataArrayNm.preventDefault()
                }))
            } else if ("Cmb" == objType && "NumericBox" == g) {
                var l = $("#" + dataArrayNm + "_Cd").data("kendoComboBox"),
                    j = $("#" + f + "_Val").data("kendoNumericTextBox");
                void 0 != l && void 0 != j && ($("#" + dataArrayNm + "_Cd").data("kendoComboBox").input.keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoNumericTextBox").focus(), dataArrayNm.preventDefault())
                }), $("#" + dataArrayNm + "_Cd").keydown(function (dataArrayNm) {
                    dataArrayNm.preventDefault()
                }))
            } else if ("Cmb" == objType && "DatePicker" == g) {
                var l = $("#" + dataArrayNm + "_Cd").data("kendoComboBox"),
                    j = $("#" + f + "_Val").data("kendoDatePicker");
                void 0 != l && void 0 != j && ($("#" + dataArrayNm + "_Cd").data("kendoComboBox").input.keydown(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoDatePicker").element.focus(), dataArrayNm.preventDefault())
                }), $("#" + dataArrayNm + "_Cd").keydown(function (dataArrayNm) {
                    dataArrayNm.preventDefault()
                }))
            } else if ("DatePicker" == objType && "DatePicker" == g) {
                var h = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Val").data("kendoDatePicker");
                void 0 != h && void 0 != j && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoDatePicker").element.focus(), dataArrayNm.preventDefault())
                })
            } else if ("DatePicker" == objType && "TextBox" == g) {
                var h = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Val");
                void 0 != h && void 0 != j && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").focus(), dataArrayNm.preventDefault())
                })
            } else if ("DatePicker" == objType && "NumericBox" == g) {
                var h = $("#" + dataArrayNm + "_Val");
                j = $("#" + f + "_Val").data("kendoNumericTextBox"), void 0 != h && void 0 != j && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoNumericTextBox").focus(), dataArrayNm.preventDefault())
                })
            } else if ("DatePicker" == objType && "Cmb" == g) {
                var h = $("#" + dataArrayNm + "_Val"),
                    j = $("#" + f + "_Cd").data("kendoComboBox");
                void 0 != h && void 0 != j && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
                    "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ("HdrSec5_CmbItm" == f ? $("#" + f + "_Val").focus() : $("#" + f + "_Cd").data("kendoComboBox").input.focus(), dataArrayNm.preventDefault())
                })
            }
        }
    }
}
window.setInterval(function () {
    Set_AllDefalutValue_Obj()
}, 500);
var commongridkyvalidation = {
    grid: {
        val: 5000
    },
    combo: {
        val: 5000
    }
};
$(function () {
    var istrue = !0;
    $.ajax({
        url: urlAdminGetKy,
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        async: !1,
        success: function (data) {
            (commongridkyvalidation.combo.val+20 <= data) && istrue && (void 0 != FormGlblData) && null != FormGlblData && (istrue = !1, FormGlblData = null)
        },
        error: function () {
            return !1
        }
    })
});

function Clear_AllDefalutValue_Obj() {
    AllDefalutValueObj = FormGlblData.AllDefalutValueObj;
    for (var a = 0; a < AllDefalutValueObj.length; a++) AllDefalutValueObj[a].isCdDefaultSet = !1, AllDefalutValueObj[a].isNmDefaultSet = !1
}
