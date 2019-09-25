function HideTheProperty(sectiondata) {
    for (var i = 0; i < sectiondata.length; i++) {

        if (sectiondata[i].isVisible == 1) {
            if (sectiondata[i].isMust == 1) {
                sectiondata[i].ObjCaptn = sectiondata[i].ObjCaptn + '*'.fontcolor("red");
            }
            if (sectiondata[i].ObjTyp == "TextBox" || sectiondata[i].ObjTyp == "NumericBox" || sectiondata[i].ObjTyp == "DatePicker" || sectiondata[i].ObjTyp == "Cmb" || sectiondata[i].ObjTyp == "CheckBox") {
                SetDefaultLablesObjCaptn(sectiondata[i]);
                setDefaultObjKy(sectiondata[i]);

            }
            if (sectiondata[i].ObjTyp == "Cmb") {
            }
            if (sectiondata[i].ObjTyp == "Button") {

                Create_Button_From_Dynamic(sectiondata[i]);
            }
            
            if (sectiondata[i].Lvl1ObjNm != null) {
                var Grid = sectiondata[i].Lvl1ObjNm.startsWith("FormGrd");
                var FindGrid = sectiondata[i].Lvl1ObjNm.startsWith("FindForm");

                if (Grid == true) {
                    FormGlblData.FormGridArray.push(sectiondata[i]);
                }
                else if (FindGrid == true) {
                    FormGlblData.FindFormGridArray.push(sectiondata[i]);
                }
            }
        }
        else {
            $("#" + sectiondata[i].ObjNm).hide();
            if (sectiondata[i].Lvl1ObjNm != null) {
                var FormGrid = sectiondata[i].Lvl1ObjNm.startsWith("FormGrd");
                var FindFormGrid = sectiondata[i].Lvl1ObjNm.startsWith("FindForm");
                if (FormGrid == true) {
                    FormGlblData.FormGridArray.push(sectiondata[i]);
                }
                else if (FindFormGrid == true) {
                    FormGlblData.FindFormGridArray.push(sectiondata[i]);
                }
            }
            
        }
    }
}


function Create_Button_From_Dynamic(sectiondataChild) {
    var d = document.createElement("BUTTON");
    if (sectiondataChild.ObjCaptn.length > 0) {
        var e = document.createTextNode(sectiondataChild.ObjCaptn);
        d.appendChild(e)
    }
    d.id = sectiondataChild.ObjNm;
    d.className = sectiondataChild.CSSClass;
    d.setAttribute("onclick", sectiondataChild.OnClickAction);
    d.setAttribute("data-tooltip", sectiondataChild.ToolTip);
    d.setAttribute("data-obj-objky", sectiondataChild.ObjKy);
    //var buttonDivId = sectiondataChild.ObjNm;
    //var ButId = buttonDivId.split("_");
    //var ButIdArray;
    var ButId = sectiondataChild.Lvl1ObjNm;
    //void 0 != ButId && (ButIdArray = buttonDivId.split("_")) && (ButId =ButIdArray[0])

    document.getElementById(ButId).appendChild(d);
}

function SetDefaultLablesObjCaptn(sectiondataChild) {
    var HtmlLable = document.getElementById(sectiondataChild.ObjNm + "_Lbl")
    if (document.getElementById(sectiondataChild.ObjNm + "_Lbl") != sectiondataChild.ObjCaptn) {
        void 0 != HtmlLable && (HtmlLable.innerHTML = sectiondataChild.ObjCaptn);
    }
}

function setDefaultObjKy(sectiondataChild) {
    if (sectiondataChild.ObjTyp == "TextBox" || sectiondataChild.ObjTyp == "NumericBox" || sectiondataChild.ObjTyp == "DatePicker") {
        void 0 != document.getElementById(sectiondataChild.ObjNm + "_Val") &&
        document.getElementById(sectiondataChild.ObjNm + "_Val").setAttribute("data-obj-objky", sectiondataChild.ObjKy);
    }
    else if (sectiondataChild.ObjTyp == "Cmb") {
        void 0 != document.getElementById(sectiondataChild.ObjNm + "_Cd") &&
        document.getElementById(sectiondataChild.ObjNm + "_Cd").setAttribute("data-obj-objky", sectiondataChild.ObjKy);
    }

}

function NextEnterKyEvent(sectiondataChild) {

    for (var i = 0; i < sectiondataChild.length; i++) {
        if (sectiondataChild[i].NxtEntObjNm != null || sectiondataChild[i].NxtEntObjNm != "null") {
            SetTheEvents(sectiondataChild[i]);
        }

    }
}
function SetTheEvents(sectiondataChild) {

    if (sectiondataChild.ObjTyp == "Cmb" && sectiondataChild.NxtObjTyp == "Cmb") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var NxtEntObj;
        void 0 != document.getElementById(sectiondataChild.NxtEntObjNm + "_Cd") && (NxtEntObj = document.getElementById(sectiondataChild.NxtEntObjNm + "_Cd"));
        var f = sectiondataChild.NxtEntObjNm;
        var nextenter = "#" + sectiondataChild.NxtEntObjNm + "_Cd";
        var l = $("#" + dataArrayNm + "_Cd").data("kendoComboBox"),
               j = $("#" + f + "_Cd").data("kendoComboBox");
        void 0 != l && void 0 != j && ($("#" + dataArrayNm + "_Cd").data("kendoComboBox").input.keydown(function (dataArrayNm) {
            if (dataArrayNm.which == '13') {
                void 0 != $(nextenter).data("kendoComboBox").input.focus(), dataArrayNm.preventDefault()
                // alert('ENTER WAS PRESSED');
            }
        }))
    }
    else if (sectiondataChild.ObjTyp == "Cmb" && sectiondataChild.NxtObjTyp == "TextBox") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var l = $("#" + dataArrayNm + "_Cd").data("kendoComboBox"),
              i = $("#" + f + "_Val");
        void 0 != l && void 0 != i && ($("#" + dataArrayNm + "_Cd").data("kendoComboBox").input.keydown(function (dataArrayNm) {
            if (dataArrayNm.which == '13') {
                $("#" + f + "_Val").focus(), dataArrayNm.preventDefault();
            }
        }))
    }
    else if (sectiondataChild.ObjTyp == "Cmb" && sectiondataChild.NxtObjTyp == "NumericBox") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var l = $("#" + dataArrayNm + "_Cd").data("kendoComboBox"),
              i = $("#" + f + "_Val");
        void 0 != l && void 0 != i && ($("#" + dataArrayNm + "_Cd").data("kendoComboBox").input.keydown(function (dataArrayNm) {
            if (dataArrayNm.which == '13') {
                $("#" + f + "_Val").data("kendoNumericTextBox").focus(), dataArrayNm.preventDefault();
            }
        }))

    }
    else if (sectiondataChild.ObjTyp == "Cmb" && sectiondataChild.NxtObjTyp == "DatePicker") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var l = $("#" + dataArrayNm + "_Cd").data("kendoComboBox"),
              i = $("#" + f + "_Val");
        void 0 != l && void 0 != i && ($("#" + dataArrayNm + "_Cd").data("kendoComboBox").input.keydown(function (dataArrayNm) {
            if (dataArrayNm.which == '13') {
                $("#" + f + "_Val").data("kendoDatePicker").element.focus(), dataArrayNm.preventDefault();
            }
        }))
    }
    else if (sectiondataChild.ObjTyp == "TextBox" && sectiondataChild.NxtObjTyp == "TextBox") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "TextBox" && sectiondataChild.NxtObjTyp == "Cmb") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Cd").data("kendoComboBox");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Cd").data("kendoComboBox").input.focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "TextBox" && sectiondataChild.NxtObjTyp == "NumericBox") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoNumericTextBox").focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "TextBox" && sectiondataChild.NxtObjTyp == "DatePicker") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoDatePicker");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoDatePicker").element.focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "NumericBox" && sectiondataChild.NxtObjTyp == "NumericBox") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoNumericTextBox");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoNumericTextBox").focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "NumericBox" && sectiondataChild.NxtObjTyp == "Cmb") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoComboBox");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Cd").data("kendoComboBox").input.focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "NumericBox" && sectiondataChild.NxtObjTyp == "TextBox") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoComboBox");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "NumericBox" && sectiondataChild.NxtObjTyp == "DatePicker") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoDatePicker");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoDatePicker").element.focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "DatePicker" && sectiondataChild.NxtObjTyp == "DatePicker") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoDatePicker");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoDatePicker").element.focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "DatePicker" && sectiondataChild.NxtObjTyp == "TextBox") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoNumericTextBox");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "DatePicker" && sectiondataChild.NxtObjTyp == "NumericBox") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoNumericTextBox");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoNumericTextBox").focus(), dataArrayNm.preventDefault())
        })
    }
    else if (sectiondataChild.ObjTyp == "DatePicker" && sectiondataChild.NxtObjTyp == "Cmb") {
        var dataArrayNm = sectiondataChild.ObjNm;
        var f = sectiondataChild.NxtEntObjNm;
        var h = $("#" + dataArrayNm + "_Val"),
            i = $("#" + f + "_Val").data("kendoComboBox");
        void 0 != h && void 0 != i && $("#" + dataArrayNm + "_Val").keypress(function (dataArrayNm) {
            "13" == (dataArrayNm.keyCode ? dataArrayNm.keyCode : dataArrayNm.which) && ($("#" + f + "_Val").data("kendoComboBox").input.focus(), dataArrayNm.preventDefault())
        })
    }


}
function setGridColumnProp(columnsDefine, GridNm, gridNo) {
    if (GridNm == 'FormGrd') {
         overwriteColumnProp(columnsDefine, FormGlblData.FormGridArray, gridNo, null);
    }
    else if (GridNm == 'FindFormGridPayment') {
        overwriteColumnProp(columnsDefine, FormGlblData.FindFormGridArray, gridNo, null);
    }
    }
   

function OverideFilter() {


}

function GetFilterOpction(ObjNm) {
    var FilterOpction = "contains";
    for (var objData = FormGlblData.FormObjData, c = 0; c < objData.length; c++)
        if (objData[c].ObjNm == ObjNm) {
            void 0 != objData[c].filterCriteria && (FilterOpction = objData[c].filterCriteria);
        }
    return FilterOpction;
}

