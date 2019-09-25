
var ExistRecords = [];

var FormGlblData = {
    ObjKy: viewBag.ObjKy,
    SelectedConCd: '',
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    isParentChange:0
}

$(document).ready(function () {
    //var PrjKy = 1

    //$.ajax({
    //    url: GetCdKyByConCdAndOurCd,
    //    dataType: "json",
    //    type: "POST",
    //    data: JSON.stringify({
    //        ObjKy: viewBag.ObjKy,
    //        ConCd: 'TrnTyp',
    //        OurCd: viewBag.OurCd
    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    success: function (TrnTypKy) {
    //        FormGlblData.TrnTypKy = TrnTypKy;
    //        GetFormObjData();
    //    }
    //});

    //GetFormObjData();
    DocReadyCus();

});

function GetFormObjData(ObjKy) {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {
            FormGlblData.FormObjData = HdrSectionFromDb;
            //DocReadyCus();
        }
    });
}

function DocReadyCus() {
    //setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
    var h = $("#option").height();
    var height = ($(window).height()) - (100 + h);
    $("#grid").height(height);

};

$("#loadGrid").click(function () {
    try {
        $("#grid").kendoGrid({
            dataSource: []
        });
    } catch (e) { }
    LoadGridViewColumn();

});

function CreateNewGridRow() {
    var grid = $("#grid").data("kendoGrid");
    if (grid) {
        grid.addRow();
    }
}


function ItemCmpSave() {


    var grid = $("#grid").data("kendoGrid");
    var currentData = grid.dataSource.data();

    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew() && currentData[i].ItmKy > 0) {
            //this record is new
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].ItmKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }



}

function GoToHome() {
    window.location = URLGoToHome;
}

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItem = cmb.dataItem();
    if (!dataItem) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value(1);
        $("#" + cmbNm + "").data("kendoComboBox").text("");
        return false;
    } else {
        return true;
    }
}

function LoadCombo() {
    $("#ConCds").kendoComboBox({
        dataSource: {
            type: "POST",
            transport: {
                read:
                    {
                        url: URLGetAllConCodesCmb,
                        data: { ObjKy: viewBag.ObjKy }
                    }
            }
        },
        change: function (e) {
            var cmb = $("#ConCds").data("kendoComboBox");
            var emp = cmb.value();
            var source = this.dataSource._data;
            var valid = false;
            for (var i = 0; i < source.length; i++) {
                if (source[i] == emp) {
                    valid = true;
                    break;
                }
            }
            if (valid == false) {
                alert("Invalid ConCd! Please select a ConCd..");
                $("#ConCds").data('kendoComboBox').value("");
            } else {
                //$("#loadGrid").disabled = 'disabled';
                $("#loadGrid").attr("disabled", true);
                FormGlblData.SelectedConCd = $("#ConCds").data("kendoComboBox").value();
                ConCdChangeCall(FormGlblData.SelectedConCd);
                if (FormGlblData.SelectedConCd != "") {
                    try {
                        $("#grid").kendoGrid({
                            dataSource: []
                        });
                    } catch (e) { }
                    LoadGridViewColumn();
                }





            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ConCd.."
    });
}

function ConCdChangeCall(SelectedConCd) {

    $.ajax({
        url: urlUsrObjPrp_SelectWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy,
            ObjTyp: '',
            ObjNm: SelectedConCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (ObjData) {
            if (ObjData.length > 0) {
                GetFormObjData(ObjData[0].ObjKy);
            }
            $("#loadGrid").removeAttr("disabled");
        }
    });
}


function DistroyGrid() {
    $("#grid").kendoGrid({
        dataSource: null
    });
}


function HideColumn(index) {
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(index);
    $("#cbs" + index + "").attr('checked', false);
}

function ShowColumn(index) {
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn(index);
    $("#cbh" + index + "").attr('checked', false);
}

function SetIsActAndIsApr(PrjKy, checked, Item) {
    var prjky = PrjKy;
    var chkd = checked;
    var val = 0;
    if (chkd) {
        val = 1;
    }
    var itm = Item;
    $.ajax({
        url: URLSetIsActIsApr,
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
        }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.dataSource.read();
}

//function SetParent(key) {
//    var Key = key;
//    var name = "";
//    $.ajax({
//        url: URLGetCodeByCdKy,
//        dataType: "json",
//        type: "POST",
//        data: { 'CdKy': Key },
//        success: function (data) {
//            name = data.CdNm;
//            //        var grid = $("#grid").data("kendoGrid");
//            //        grid.dataSource.read();
//        },
//        error: function (e) {

//        }
//    });
//    return name;
//}

function GridOnDataBinding(arg) {
    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
}


function GridOnDataBound(arg) {
    $('#grid').data().kendoGrid.bind('dataBound', function (e) {
        this.element.find('tbody tr:first').addClass('k-state-selected')
    })

    dataView = this.dataSource.view();
    var grid = $("#grid").data("kendoGrid");

    var rowObjs = grid.tbody[0].rows;

    for (var i = 0; i < dataView.length; i++) {
        var row = rowObjs[i];

        if (dataView[i].ConCd == dataView[i].Code) {//low
            row.className = "gridAquaRow";
        }
    }

    $(".k-header").kendoTooltip({
        content: "title"
    });
}

function GridOnChange(arg) {

    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    if (selectedItem.Code == selectedItem.ConCd) {
        alert("You can't change this record!");
        grid.dataSource.read();
        return;
    }
}
//function ParentName() {
//    var dataSource = new kendo.data.DataSource(
//      {
//          transport: {
//              read: {
//                  url: URLGetParantName,
//                  data: {
//                      'ConCd': FormGlblData.SelectedConCd,
//                      'ObjKy': viewBag.ObjKy
//                  },
//                  dataType: "json"
//              }
//          }

//      });
//    return dataSource;
//}

function LoadGridViewColumn() {
    OPENLodingCommon('Loading Please Wait...');
    var CdMasColumn = [
                { field: "CdKy", title: "Ref #", hidden: true, width: "100px" },
                {
                    field: "Code", title: "Code", width: "250px",
                    locked: true,
                    attributes: { style: "text-align:center;" },
                    cell: {
                        showOperators: false
                    },

                },
                { field: "CdNm", title: "Code Name", width: "350px", locked: true, attributes: { style: "text-align:center;" } },
                {
                    field: "isAct", title: "isAct", width: "200px", attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isActPinChecked"></input>',
                    //template: kendo.template($("#Switch").html())
                },
                {
                    field: "isApr", title: "isApr", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isApr? "checked=checked" : "" # class="isAprPinChecked"></input>',
                },
                { field: "CKy", title: "CKy", hidden: true, width: "100px" },
                { field: "OurCd", title: "OurCd", width: "250px", attributes: { style: "text-align:center;" } },
                {
                    field: "isAlwAcs", title: "isAlwAcs", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isAlwAcs? "checked=checked" : "" # class="isAlwAcsPinChecked"></input>',
                },
                {
                    field: "isAlwAdd", title: "isAlwAdd", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isAlwAdd? "checked=checked" : "" # class="isAlwAddPinChecked"></input>',
                },
                {
                    field: "isAlwUpdate", title: "isAlwUpdate", width: "100px", hidden: true,attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isAlwUpdate? "checked=checked" : "" # class="isAlwUpdatePinChecked"></input>',
                },
                {
                    field: "isAlwDel", title: "isAlwDel", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isAlwDel? "checked=checked" : "" # class="isAlwDelPinChecked"></input>',
                },
                {
                    field: "prntNm", title: "prntNm", width: "150px", hidden: true, attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        var model = options.model;
                        var cncod = model.ConCd;
                        $('<input id="cmbprntky" name="' + options.field + '"/>').appendTo(container).kendoComboBox({

                            dataSource: CdNm_SelectMob_Datasource('PrntKy'),
                            //dataSource: ParentName() ,
                            change: function (e) {
                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);
                                var validate = ComboValidations('cmbprntky');
                                if (validate) {
                                    model.set("PrntKy", dataItem.CdKy);
                                    model.set("prntNm", dataItem.CdNm);
                                    FormGlblData.isParentChange = 1;
                                }
                                else {
                                    model.set("PrntKy", 1);
                                    model.set("prntNm", "");
                                }
                            },
                            dataValueField: "CdKy",
                            dataTextField: "CdNm",
                            dataBound: function (e) {

                            }
                        });
                    }
                },

                {
                    field: "prnt2Nm", title: "prnt2Nm", width: "150px", hidden: true, attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        var model = options.model;
                        var cncod = model.ConCd;
                        $('<input id="cmbprnt2ky" name="' + options.field + '"/>').appendTo(container).kendoComboBox({

                            dataSource: CdNm_SelectMob_Datasource('Prnt2Ky'),
                            //dataSource: ParentName() ,
                            change: function (e) {
                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);
                                var validate = ComboValidations('cmbprnt2ky');
                                if (validate) {
                                    model.set("Prnt2Ky", dataItem.CdKy);
                                    model.set("prnt2Nm", dataItem.CdNm);
                                }
                                else
                                {
                                    model.set("Prnt2Ky", 1);
                                    model.set("prnt2Nm", "");
                                }
                            },
                            dataValueField: "CdKy",
                            dataTextField: "CdNm",
                            dataBound: function (e) {

                            }
                        });
                    }
                },

        { field: "Lvl", title: "Lvl", width: "100px", hidden: true, attributes: { style: "text-align:center;" } },
                { field: "SO", title: "SO", width: "200px", attributes: { style: "text-align:center;" } },
                {
                    field: "isPrnt", title: "is Parant", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isPrnt? "checked=checked" : "" # class="isPrntPinChecked"></input>',
                },
                {
                    field: "isRoot", title: "is Root", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isRoot? "checked=checked" : "" # class="isRootPinChecked"></input>',
                },
                {
                    field: "isDefault", title: "isDefault", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isDefault? "checked=checked" : "" # class="isDefaultPinChecked"></input>',
                },
        { field: "Maint", title: "Maint", width: "100px", hidden: true, attributes: { style: "text-align:center;" } },
        { field: "OrgKy", title: "OrgKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" } },
        { field: "AcsLvlKy", title: "AcsLvlKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" } },
                {
                    field: "accLvlNm", title: "accLvlNm", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        var model = options.model;
                        var cncod = model.ConCd;
                        $('<input id="cmbAcsLvlKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: CdNm_SelectMob_Datasource('AcsLvlKy'),
                            //dataSource: ParentName(),
                            change: function (e) {
                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);
                                var validate = ComboValidations('cmbAcsLvlKy');
                                if (validate) {
                                    model.set("AcsLvlKy", dataItem.CdKy);
                                    model.set("accLvlNm", dataItem.CdNm);
                                }
                                else
                                {
                                    model.set("AcsLvlKy", 1);
                                    model.set("accLvlNm", "");
                                }
                            },
                            dataValueField: "CdKy",
                            dataTextField: "CdNm",
                            dataBound: function (e) {
                            }
                        });
                    }
                },
        { field: "ConFinLvlKy", title: "ConFinLvlKy", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                {
                    field: "conLvlNm", title: "conLvlNm", hidden: true, width: "100px", attributes: { style: "text-align:center;" },

                    editor: function (container, options) {
                        var model = options.model;
                        var cncod = model.ConCd;
                        $('<input id="cmbConFinLvlKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: CdNm_SelectMob_Datasource('ConFinLvlKy'),
                            change: function (e) {

                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);
                                var validate = ComboValidations('cmbConFinLvlKy');
                                if (validate) {
                                    model.set("ConFinLvlKy", dataItem.CdKy);
                                    model.set("conLvlNm", dataItem.CdNm);
                                }
                                else {
                                    model.set("ConFinLvlKy", 1);
                                    model.set("conLvlNm", "");
                                }
                            },
                            dataValueField: "CdKy",
                            dataTextField: "CdNm",
                            dataBound: function (e) {
                            }
                        });
                    }
                },
                {
                    field: "isAlwTrn", title: "isAlwTrn", hidden: true, width: "100px", attributes: { style: "text-align:center;" },
                    template: '<input type="checkbox"  #= isAlwTrn? "checked=checked" : "" # class="isAlwTrnPinChecked"></input>',
                },
                { field: "CdInt1", title: "CdInt1", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdInt2", title: "CdInt2", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdInt3", title: "CdInt3", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdNo1", title: "CdNo1", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdNo2", title: "CdNo2", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdNo3", title: "CdNo3", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdNo4", title: "CdNo4", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdNo5", title: "CdNo5", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdNo6", title: "CdNo6", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdRelCdKy", title: "CdRelCdKy", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdRelConCd", title: "CdRelConCd", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdDt1", title: "CdDt1", hidden: true, width: "120px", attributes: { style: "text-align:center;" } },
                { field: "CdDt2", title: "CdDt2", hidden: true, width: "120px", attributes: { style: "text-align:center;" } },
                { field: "CdDt3", title: "CdDt3", hidden: true, width: "120px", attributes: { style: "text-align:center;" } },
                { field: "CdDt4", title: "CdDt4", hidden: true, width: "120px", attributes: { style: "text-align:center;" } },
                { field: "CdExtChr1", title: "CdExtChr1", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "CdExtChr2", title: "CdExtChr2", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "ConCd1", title: "ConCd1", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "ConCd2", title: "ConCd2", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "AccKy1", title: "AccKy1", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
                { field: "AccKy2", title: "AccKy2", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
        { field: "MaintExt", title: "MaintExt", hidden: true, width: "100px", attributes: { style: "text-align:center;" } },
        { field: "isSysRec", title: "isSysRec", hidden: true, width: "100px", attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isSysRec? "checked=checked" : "" # class="isSysRecPinChecked"></input>', },
                { field: 'isCd01', title: 'isCd01', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd01? "checked=checked" : "" # class="isCd01PinChecked"></input>', },
                { field: 'isCd02', title: 'isCd02', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd02? "checked=checked" : "" # class="isCd02PinChecked"></input>', },
                { field: 'isCd03', title: 'isCd03', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd03? "checked=checked" : "" # class="isCd03PinChecked"></input>', },
                { field: 'isCd04', title: 'isCd04', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd04? "checked=checked" : "" # class="isCd04PinChecked"></input>', },
                { field: 'isCd05', title: 'isCd05', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd05? "checked=checked" : "" # class="isCd05PinChecked"></input>', },
                { field: 'isCd06', title: 'isCd06', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd06? "checked=checked" : "" # class="isCd06PinChecked"></input>', },
                { field: 'isCd07', title: 'isCd07', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd07? "checked=checked" : "" # class="isCd07PinChecked"></input>', },
                { field: 'isCd08', title: 'isCd08', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd08? "checked=checked" : "" # class="isCd08PinChecked"></input>', },
                { field: 'isCd09', title: 'isCd09', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd09? "checked=checked" : "" # class="isCd09PinChecked"></input>', },
                { field: 'isCd10', title: 'isCd10', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd10? "checked=checked" : "" # class="isCd10PinChecked"></input>', },
                { field: 'isCd11', title: 'isCd11', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd11? "checked=checked" : "" # class="isCd11PinChecked"></input>', },
                { field: 'isCd12', title: 'isCd12', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd12? "checked=checked" : "" # class="isCd12PinChecked"></input>', },
                { field: 'isCd13', title: 'isCd13', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd13? "checked=checked" : "" # class="isCd13PinChecked"></input>', },
                { field: 'isCd14', title: 'isCd14', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd14? "checked=checked" : "" # class="isCd14PinChecked"></input>', },
                { field: 'isCd15', title: 'isCd15', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd15? "checked=checked" : "" # class="isCd15PinChecked"></input>', },
                { field: 'isCd16', title: 'isCd16', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd16? "checked=checked" : "" # class="isCd16PinChecked"></input>', },
                { field: 'isCd17', title: 'isCd17', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd17? "checked=checked" : "" # class="isCd17PinChecked"></input>', },
                { field: 'isCd18', title: 'isCd18', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd18? "checked=checked" : "" # class="isCd18PinChecked"></input>', },
                { field: 'isCd19', title: 'isCd19', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd19? "checked=checked" : "" # class="isCd19PinChecked"></input>', },
                { field: 'isCd20', title: 'isCd20', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd20? "checked=checked" : "" # class="isCd20PinChecked"></input>', },
                { field: 'isCd21', title: 'isCd21', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd21? "checked=checked" : "" # class="isCd21PinChecked"></input>', },
                { field: 'isCd22', title: 'isCd22', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd22? "checked=checked" : "" # class="isCd22PinChecked"></input>', },
                { field: 'isCd23', title: 'isCd23', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd23? "checked=checked" : "" # class="isCd23PinChecked"></input>', },
                { field: 'isCd24', title: 'isCd24', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd24? "checked=checked" : "" # class="isCd24PinChecked"></input>', },
                { field: 'isCd25', title: 'isCd25', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd25? "checked=checked" : "" # class="isCd25PinChecked"></input>', },
                { field: 'isCd26', title: 'isCd26', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd26? "checked=checked" : "" # class="isCd26PinChecked"></input>', },
                { field: 'isCd27', title: 'isCd27', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd27? "checked=checked" : "" # class="isCd27PinChecked"></input>', },
                { field: 'isCd28', title: 'isCd28', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd28? "checked=checked" : "" # class="isCd28PinChecked"></input>', },
                { field: 'isCd29', title: 'isCd29', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd29? "checked=checked" : "" # class="isCd29PinChecked"></input>', },
                { field: 'isCd30', title: 'isCd30', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd30? "checked=checked" : "" # class="isCd30PinChecked"></input>', },
                { field: 'isCd31', title: 'isCd31', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd31? "checked=checked" : "" # class="isCd31PinChecked"></input>', },
                { field: 'isCd32', title: 'isCd32', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd32? "checked=checked" : "" # class="isCd32PinChecked"></input>', },
                { field: 'isCd33', title: 'isCd33', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd33? "checked=checked" : "" # class="isCd33PinChecked"></input>', },
                { field: 'isCd34', title: 'isCd34', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd34? "checked=checked" : "" # class="isCd34PinChecked"></input>', },
                { field: 'isCd35', title: 'isCd35', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd35? "checked=checked" : "" # class="isCd35PinChecked"></input>', },
                { field: 'isCd36', title: 'isCd36', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd36? "checked=checked" : "" # class="isCd36PinChecked"></input>', },
                { field: 'isCd37', title: 'isCd37', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd37? "checked=checked" : "" # class="isCd37PinChecked"></input>', },
                { field: 'isCd38', title: 'isCd38', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd38? "checked=checked" : "" # class="isCd38PinChecked"></input>', },
                { field: 'isCd39', title: 'isCd39', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd39? "checked=checked" : "" # class="isCd39PinChecked"></input>', },
                { field: 'isCd40', title: 'isCd40', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd40? "checked=checked" : "" # class="isCd40PinChecked"></input>', },
                { field: 'isCd41', title: 'isCd41', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd41? "checked=checked" : "" # class="isCd41PinChecked"></input>', },
                { field: 'isCd42', title: 'isCd42', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd42? "checked=checked" : "" # class="isCd42PinChecked"></input>', },
                { field: 'isCd43', title: 'isCd43', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd43? "checked=checked" : "" # class="isCd43PinChecked"></input>', },
                { field: 'isCd44', title: 'isCd44', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd44? "checked=checked" : "" # class="isCd44PinChecked"></input>', },
                { field: 'isCd45', title: 'isCd45', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd45? "checked=checked" : "" # class="isCd45PinChecked"></input>', },
                { field: 'isCd46', title: 'isCd46', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd46? "checked=checked" : "" # class="isCd46PinChecked"></input>', },
                { field: 'isCd47', title: 'isCd47', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd47? "checked=checked" : "" # class="isCd47PinChecked"></input>', },
                { field: 'isCd48', title: 'isCd48', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd48? "checked=checked" : "" # class="isCd48PinChecked"></input>', },
                { field: 'isCd49', title: 'isCd49', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd49? "checked=checked" : "" # class="isCd49PinChecked"></input>', },
                { field: 'isCd50', title: 'isCd50', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd50? "checked=checked" : "" # class="isCd50PinChecked"></input>', },
                { field: 'isCd51', title: 'isCd51', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd51? "checked=checked" : "" # class="isCd51PinChecked"></input>', },
                { field: 'isCd52', title: 'isCd52', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd52? "checked=checked" : "" # class="isCd52PinChecked"></input>', },
                { field: 'isCd53', title: 'isCd53', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd53? "checked=checked" : "" # class="isCd53PinChecked"></input>', },
                { field: 'isCd54', title: 'isCd54', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd54? "checked=checked" : "" # class="isCd54PinChecked"></input>', },
                { field: 'isCd55', title: 'isCd55', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd55? "checked=checked" : "" # class="isCd55PinChecked"></input>', },
                { field: 'isCd56', title: 'isCd56', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd56? "checked=checked" : "" # class="isCd56PinChecked"></input>', },
                { field: 'isCd57', title: 'isCd57', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd57? "checked=checked" : "" # class="isCd57PinChecked"></input>', },
                { field: 'isCd58', title: 'isCd58', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd58? "checked=checked" : "" # class="isCd58PinChecked"></input>', },
                { field: 'isCd59', title: 'isCd59', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd59? "checked=checked" : "" # class="isCd59PinChecked"></input>', },
                { field: 'isCd60', title: 'isCd60', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd60? "checked=checked" : "" # class="isCd60PinChecked"></input>', },
                { field: 'isCd61', title: 'isCd61', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd61? "checked=checked" : "" # class="isCd61PinChecked"></input>', },
                { field: 'isCd62', title: 'isCd62', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd62? "checked=checked" : "" # class="isCd62PinChecked"></input>', },
                { field: 'isCd63', title: 'isCd63', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd63? "checked=checked" : "" # class="isCd63PinChecked"></input>', },
                { field: 'isCd64', title: 'isCd64', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd64? "checked=checked" : "" # class="isCd64PinChecked"></input>', },
                { field: 'isCd66', title: 'isCd66', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd66? "checked=checked" : "" # class="isCd66PinChecked"></input>', },
                { field: 'isCd67', title: 'isCd67', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd67? "checked=checked" : "" # class="isCd67PinChecked"></input>', },
                { field: 'isCd68', title: 'isCd68', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd68? "checked=checked" : "" # class="isCd68PinChecked"></input>', },
                { field: 'isCd69', title: 'isCd69', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd69? "checked=checked" : "" # class="isCd69PinChecked"></input>', },
                { field: 'isCd70', title: 'isCd70', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd70? "checked=checked" : "" # class="isCd70PinChecked"></input>', },
                { field: 'isCd71', title: 'isCd71', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd71? "checked=checked" : "" # class="isCd71PinChecked"></input>', },
                { field: 'isCd72', title: 'isCd72', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd72? "checked=checked" : "" # class="isCd72PinChecked"></input>', },
                { field: 'isCd73', title: 'isCd73', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd73? "checked=checked" : "" # class="isCd73PinChecked"></input>', },
                { field: 'isCd74', title: 'isCd74', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd74? "checked=checked" : "" # class="isCd74PinChecked"></input>', },
                { field: 'isCd75', title: 'isCd75', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd75? "checked=checked" : "" # class="isCd75PinChecked"></input>', },
                { field: 'isCd76', title: 'isCd76', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd76? "checked=checked" : "" # class="isCd76PinChecked"></input>', },
                { field: 'isCd77', title: 'isCd77', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd77? "checked=checked" : "" # class="isCd77PinChecked"></input>', },
                { field: 'isCd78', title: 'isCd78', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd78? "checked=checked" : "" # class="isCd78PinChecked"></input>', },
                { field: 'isCd79', title: 'isCd79', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd79? "checked=checked" : "" # class="isCd79PinChecked"></input>', },
                { field: 'isCd80', title: 'isCd80', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd80? "checked=checked" : "" # class="isCd80PinChecked"></input>', },
                { field: 'isCd81', title: 'isCd81', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd81? "checked=checked" : "" # class="isCd81PinChecked"></input>', },
                { field: 'isCd82', title: 'isCd82', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd82? "checked=checked" : "" # class="isCd82PinChecked"></input>', },
                { field: 'isCd83', title: 'isCd83', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd83? "checked=checked" : "" # class="isCd83PinChecked"></input>', },
                { field: 'isCd84', title: 'isCd84', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd84? "checked=checked" : "" # class="isCd84PinChecked"></input>', },
                { field: 'isCd85', title: 'isCd85', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd85? "checked=checked" : "" # class="isCd85PinChecked"></input>', },

                { field: 'isCd86', title: 'isCd86', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd86? "checked=checked" : "" # class="isCd86PinChecked"></input>', },
                { field: 'isCd87', title: 'isCd87', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd87? "checked=checked" : "" # class="isCd87PinChecked"></input>', },
                { field: 'isCd88', title: 'isCd88', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd88? "checked=checked" : "" # class="isCd88PinChecked"></input>', },
                { field: 'isCd89', title: 'isCd89', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd89? "checked=checked" : "" # class="isCd89PinChecked"></input>', },
                { field: 'isCd90', title: 'isCd90', hidden: true, width: '70px', attributes: { style: "text-align:center;" }, template: '<input type="checkbox"  #= isCd90? "checked=checked" : "" # class="isCd90PinChecked"></input>', },

    ];
    var gridNo = 1;
    var FinalCdMasColumn = setColumnProp(CdMasColumn, FormGlblData.ObjKy, '', FormGlblData.SelectedConCd, gridNo)
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {
    if (gridNo == 1) {
        $("#grid").kendoGrid({
            dataSource: []
        });

        $('#grid').data().kendoGrid.destroy();
        $('#grid').empty();

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: URLSelectCdMas,
                    dataType: "json"
                },
                create: {
                    url: URLCreateCdMas,
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    type: "POST",
                    complete: function (e) {
                        var grid = $("#grid").data("kendoGrid");
                        grid.dataSource.read();
                    }
                },
                destroy: {
                    //url: URLDeleteCdMas,
                    //contentType: 'application/json; charset=utf-8',
                    //dataType: "json",
                    //type: "POST",
                    //complete: function (e) {
                    //    var grid = $("#grid").data("kendoGrid");
                    //    grid.dataSource.read();
                    //}
                },
                update: {
                    url: URLUpdateCdMas,
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    type: "POST",
                    complete: function (e) {
                        var grid = $("#grid").data("kendoGrid");
                        grid.dataSource.read();
                    }
                },
                parameterMap: function (options, operation) {
                    if (operation == "create" && options.models) {
                        return JSON.stringify({ 'list': options.models, ConCd: FormGlblData.SelectedConCd }); // Parrameter name of the Controller Action method==> List<ToDoModel>emp
                    }
                    if (operation == "update" && options.models) {
                        return JSON.stringify({ 'list': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>emp
                    }
                    if (operation == "destroy" && options.models) {
                        return JSON.stringify({ 'list': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>emp
                    }
                    if (operation == "read") {
                        var ConCd = $("#ConCds").val();
                        return ({
                            'ConCd': ConCd,
                            'ObjKy': viewBag.ObjKy
                        });
                    }
                }
            },
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "CdKy",
                    fields:
                    {
                        CdKy: { editable: false, nullable: false, type: "number" },
                        CdNm: { editable: true, nullable: false, validation: { required: true } },
                        CKy: { editable: true, nullable: false, type: "number", validation: { required: true } },
                        ConCd: { editable: true, nullable: true, validation: { required: true }, defaultValue: '123' },
                        Code: { editable: true, nullable: true, validation: { required: true } },
                        isAct: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        isApr: { editable: true, nullable: false, type: "boolean", defaultValue: true ,hidden: true },
                        OurCd: { editable: true, nullable: true },
                        isAlwAcs: { editable: true, nullable: false, type: "boolean", hidden: true }, ////////
                        isAlwAdd: { editable: true, nullable: false, type: "boolean",hidden: true, },
                        isAlwUpdate: { editable: true, nullable: false, type: "boolean", hidden: true},
                        isAlwDel: { editable: true, nullable: false, type: "boolean", hidden: true },
                        PrntKy: { editable: true, nullable: false, type: "number" },
                        Prnt2Ky: { editable: true, nullable: false, type: "number" },
                        Lvl: { editable: true, nullable: false, type: "number",hidden: true, },
                        SO: { editable: true, nullable: false, type: "number" },
                        //isLeaf: { editable: true, nullable: true, type: "boolean" },
                        isPrnt: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isRoot: { editable: true, nullable: false, type: "boolean", hidden: true, },
                        isDefault: { editable: true, nullable: false, type: "boolean", hidden: true, },
                        Maint: { editable: true, nullable: true, type: "number", hidden: true, },
                        OrgKy: { editable: true, nullable: false, type: "number", hidden: true, },
                        UsrKy: { editable: true, nullable: false, type: "number", hidden: true,},
                        AcsLvlKy: { editable: true, nullable: false, type: "number", hidden: true, },
                        ConFinLvlKy: { editable: true, nullable: true, type: "number", hidden: true,},
                        prntNm: { editable: true, nullable: true, hidden: true, },
                        prnt2Nm: { editable: true, nullable: true, hidden: true, },
                        accLvlNm: { editable: true, nullable: true, hidden: true, },
                        conLvlNm: { editable: true, nullable: true, hidden: true,},
                        isAlwTrn: { editable: true, nullable: false, type: "boolean", defaultValue: true, hidden: true, },
                        CdInt1: { editable: true, nullable: false, type: "number", hidden: true, },
                        CdInt2: { editable: true, nullable: false, type: "number", hidden: true, },
                        CdInt3: { editable: true, nullable: false, type: "number", hidden: true },
                        CdNo1: { editable: true, nullable: false, type: "number", hidden: true },
                        CdNo2: { editable: true, nullable: false, type: "number", hidden: true, },
                        CdNo3: { editable: true, nullable: false, type: "number", hidden: true, },
                        CdNo4: { editable: true, nullable: false, type: "number", hidden: true, },
                        CdNo5: { editable: true, nullable: false, type: "number", hidden: true, },
                        CdNo6: { editable: true, nullable: false, type: "number", hidden: true, },
                        CdRelCdKy: { editable: true, nullable: false, type: "number", hidden: true,},
                        CdRelConCd: { editable: true, nullable: true, hidden: true,},
                        CdDt1: { editable: true, nullable: true, type: "date", hidden: true,},
                        CdDt2: { editable: true, nullable: true, type: "date", hidden: true,},
                        CdDt3: { editable: true, nullable: true, type: "date", hidden: true, },
                        CdDt4: { editable: true, nullable: true, type: "date", hidden: true,},
                        CdExtChr1: { editable: true, nullable: true, hidden: true,},
                        CdExtChr2: { editable: true, nullable: true, hidden: true,},
                        ConCd1: { editable: true, nullable: true, hidden: true,},
                        ConCd2: { editable: true, nullable: true, hidden: true,},
                        AccKy1: { editable: true, nullable: false, type: "number", hidden: true, },
                        AccKy2: { editable: true, nullable: false, type: "number", hidden: true, }, //--------<<<<<<<<<<<<< UPDATE METHOD DOESN'T FIRE, EEROR CAUSE ( Capital K  and Simple k of the model)
                        MaintExt: { editable: true, nullable: false, type: "number", hidden: true, },
                        isSysRec: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd01: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd02: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd03: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd04: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd05: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd06: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd07: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd08: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd09: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd10: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd11: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd12: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd13: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd14: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd15: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd16: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd17: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd18: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd19: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd20: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd21: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd22: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd23: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd24: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd25: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd26: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd27: { editable: true, nullable: false, type: "boolean", hidden: true, },
                        isCd28: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd29: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd30: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd31: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd32: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd33: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd34: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd35: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd36: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd37: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd38: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd39: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd40: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd41: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd42: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd43: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd44: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd45: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd46: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd47: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd48: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd49: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd50: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd51: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd52: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd53: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd54: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd55: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd56: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd57: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd58: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd59: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd60: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd61: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd62: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd63: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd64: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd65: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd66: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd67: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd68: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd69: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd70: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd71: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd72: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd72: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd73: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd74: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd75: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd76: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd77: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd78: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd79: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd80: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd81: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd82: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd83: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd84: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd85: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd86: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd87: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd88: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd89: { editable: true, nullable: false, type: "boolean", hidden: true,},
                        isCd90: { editable: true, nullable: false, type: "boolean", hidden: true,},
                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            sortable: {
                mode: "single",
                allowUnsort: true
            },
            autobind: true,
            filterable: {
                mode: "row"
            },
            navigatable: true,
            groupable: true,
            reorderable: true,
            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            //toolbar: [{ name: "create", text: "Add new record" }, "save", "cancel"],
            columns: columnsFinal,
            columnMenu: true,
            resizable: true,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            dataBound: GridOnDataBound,
            //change: GridOnChange,
            editable: true,
            edit: function (e) {
                $("[name='Code']", e.container).blur(function () {
                    var id = ("#grid");
                    var grid = $(id).data().kendoGrid;
                    var selectedItem = grid.dataItem(grid.select());
                    var Code = selectedItem.Code;
                    CheckCdMasCodeExist(Code, e.model);
                });

                $("[name='CdNm']", e.container).blur(function () {
                    var id = ("#grid");
                    var grid = $(id).data().kendoGrid;
                    var selectedItem = grid.dataItem(grid.select());
                    var CdNm = selectedItem.CdNm;
                    CheckCdMasCdNmExist(CdNm, e.model);
                });
                var input = e.container.find("input");
                input.select();
            }
        });
        CLOSELoadingCommon();

    }
}

function CancelGridItem() { $("#grid").data("kendoGrid").cancelChanges(); }
function insertItem() { grid = $("#grid").data("kendoGrid").addRow(); }

function Save() {
    OPENLodingCommon('Please Wait While We are Saving...');

    var grid = $("#grid").data("kendoGrid");
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
                url: URLInsertUpdate,
                data: JSON.stringify({
                    updateAccmacc: kendo.stringify(updatedRecords),
                    newAccmacc: kendo.stringify(newRecords),
                    ConCd: FormGlblData.SelectedConCd,
                    IsPrntChng: FormGlblData.isParentChange,
                    objKy:viewBag.ObjKy
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        CLOSELoadingCommon();
                        alert("Successfully Saved..!");
                        LoadGridViewColumn(); // update grid
                    } else {
                        CLOSELoadingCommon();
                        alert("Record Not Saved");
                        LoadGridViewColumn(); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }
            });
        }
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



$(document.body).keydown(function (e) {
    if (e.keyCode == 107 || (e.altKey && e.keyCode == 78)) {
        e.preventDefault();
        insertItem();
    }
});

$('#grid').on('click', '.isActPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAct', checked);
    }
});

$('#grid').on('click', '.isAprPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isApr', checked);
    }
});

$('#grid').on('click', '.isAlwAcsPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwAcs', checked);
    }
});

$('#grid').on('click', '.isAlwAddPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwAdd', checked);
    }
});

$('#grid').on('click', '.isAlwUpdatePinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwUpdate', checked);
    }
});

$('#grid').on('click', '.isAlwDelPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwDel', checked);
    }
});

$('#grid').on('click', '.isPrntPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isPrnt', checked);
    }
});

$('#grid').on('click', '.isRootPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isRoot', checked);
    }
});

$('#grid').on('click', '.isDefaultPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDefault', checked);
    }
});

$('#grid').on('click', '.isAlwTrnPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwTrn', checked);
    }
});

$('#grid').on('click', '.isCd01PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd01', checked);
    }
});

$('#grid').on('click', '.isCd02PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd02', checked);
    }
});

$('#grid').on('click', '.isCd03PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd03', checked);
    }
});

$('#grid').on('click', '.isCd04PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd04', checked);
    }
});

$('#grid').on('click', '.isCd05PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd05', checked);
    }
});

$('#grid').on('click', '.isCd06PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd06', checked);
    }
});

$('#grid').on('click', '.isCd07PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd07', checked);
    }
});

$('#grid').on('click', '.isCd08PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd08', checked);
    }
});

$('#grid').on('click', '.isCd09PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd09', checked);
    }
});

$('#grid').on('click', '.isCd10PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd10', checked);
    }
});

$('#grid').on('click', '.isCd11PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd11', checked);
    }
});

$('#grid').on('click', '.isCd12PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd12', checked);
    }
});

$('#grid').on('click', '.isCd13PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd13', checked);
    }
});

$('#grid').on('click', '.isCd14PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd14', checked);
    }
});

$('#grid').on('click', '.isCd15PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd15', checked);
    }
});

$('#grid').on('click', '.isCd16PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd16', checked);
    }
});

$('#grid').on('click', '.isCd17PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd17', checked);
    }
});

$('#grid').on('click', '.isCd18PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd18', checked);
    }
});

$('#grid').on('click', '.isCd19PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd19', checked);
    }
});

$('#grid').on('click', '.isCd20PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd20', checked);
    }
});

$('#grid').on('click', '.isCd21PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd21', checked);
    }
});

$('#grid').on('click', '.isCd22PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd22', checked);
    }
});

$('#grid').on('click', '.isCd23PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd23', checked);
    }
});

$('#grid').on('click', '.isCd24PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd24', checked);
    }
});

$('#grid').on('click', '.isCd25PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd25', checked);
    }
});

$('#grid').on('click', '.isCd26PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd26', checked);
    }
});

$('#grid').on('click', '.isCd27PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd27', checked);
    }
});

$('#grid').on('click', '.isCd28PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd28', checked);
    }
});

$('#grid').on('click', '.isCd29PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd29', checked);
    }
});

$('#grid').on('click', '.isCd30PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd30', checked);
    }
});

$('#grid').on('click', '.isCd31PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd31', checked);
    }
});

$('#grid').on('click', '.isCd32PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd32', checked);
    }
});

$('#grid').on('click', '.isCd33PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd33', checked);
    }
});

$('#grid').on('click', '.isCd34PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd34', checked);
    }
});

$('#grid').on('click', '.isCd35PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd35', checked);
    }
});

$('#grid').on('click', '.isCd36PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd36', checked);
    }
});

$('#grid').on('click', '.isCd37PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd37', checked);
    }
});

$('#grid').on('click', '.isCd38PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd38', checked);
    }
});

$('#grid').on('click', '.isCd39PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd39', checked);
    }
});

$('#grid').on('click', '.isCd40PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd40', checked);
    }
});

$('#grid').on('click', '.isCd41PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd41', checked);
    }
});

$('#grid').on('click', '.isCd42PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd42', checked);
    }
});

$('#grid').on('click', '.isCd43PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd43', checked);
    }
});

$('#grid').on('click', '.isCd44PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd44', checked);
    }
});

$('#grid').on('click', '.isCd45PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd45', checked);
    }
});

$('#grid').on('click', '.isCd46PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd46', checked);
    }
});

$('#grid').on('click', '.isCd47PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd47', checked);
    }
});

$('#grid').on('click', '.isCd48PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd48', checked);
    }
});

$('#grid').on('click', '.isCd49PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd49', checked);
    }
});

$('#grid').on('click', '.isCd50PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd50', checked);
    }
});

$('#grid').on('click', '.isCd51PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd51', checked);
    }
});

$('#grid').on('click', '.isCd52PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd52', checked);
    }
});

$('#grid').on('click', '.isCd53PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd53', checked);
    }
});

$('#grid').on('click', '.isCd54PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd54', checked);
    }
});

$('#grid').on('click', '.isCd55PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd55', checked);
    }
});

$('#grid').on('click', '.isCd56PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd56', checked);
    }
});

$('#grid').on('click', '.isCd57PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd57', checked);
    }
});

$('#grid').on('click', '.isCd58PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd58', checked);
    }
});

$('#grid').on('click', '.isCd59PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd59', checked);
    }
});

$('#grid').on('click', '.isCd60PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd60', checked);
    }
});

$('#grid').on('click', '.isCd61PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd61', checked);
    }
});

$('#grid').on('click', '.isCd62PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd62', checked);
    }
});

$('#grid').on('click', '.isCd63PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd63', checked);
    }
});

$('#grid').on('click', '.isCd64PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd64', checked);
    }
});

$('#grid').on('click', '.isCd66PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd66', checked);
    }
});

$('#grid').on('click', '.isCd67PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd67', checked);
    }
});

$('#grid').on('click', '.isCd68PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd68', checked);
    }
});

$('#grid').on('click', '.isCd69PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd69', checked);
    }
});

$('#grid').on('click', '.isCd70PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd70', checked);
    }
});

$('#grid').on('click', '.isCd71PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd71', checked);
    }
});

$('#grid').on('click', '.isCd72PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd72', checked);
    }
});

$('#grid').on('click', '.isCd73PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd73', checked);
    }
});

$('#grid').on('click', '.isCd74PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd74', checked);
    }
});

$('#grid').on('click', '.isCd75PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd75', checked);
    }
});

$('#grid').on('click', '.isCd76PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd76', checked);
    }
});

$('#grid').on('click', '.isCd77PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd77', checked);
    }
});

$('#grid').on('click', '.isCd78PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd78', checked);
    }
});

$('#grid').on('click', '.isCd79PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd79', checked);
    }
});

$('#grid').on('click', '.isCd80PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd80', checked);
    }
});

$('#grid').on('click', '.isCd81PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd81', checked);
    }
});
$('#grid').on('click', '.isCd82PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd82', checked);
    }
});
$('#grid').on('click', '.isCd83PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd83', checked);
    }
});
$('#grid').on('click', '.isCd84PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd84', checked);
    }
});
$('#grid').on('click', '.isCd85PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd85', checked);
    }
});

$('#grid').on('click', '.isCd86PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd86', checked);
    }
});

$('#grid').on('click', '.isCd87PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd87', checked);
    }
});

$('#grid').on('click', '.isCd88PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd88', checked);
    }
});
$('#grid').on('click', '.isCd89PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd89', checked);
    }
});
$('#grid').on('click', '.isCd90PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCd90', checked);
    }
});

$('#grid').on('click', '.isSysRecPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isSysRec', checked);
    }
});


function CheckCdMasCodeExist(Code, model) {
    var grid = $("#grid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!Code) {
        Code = currentData[0].Code;
    }
    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].Code == Code) {
            count += 1;
        }
    }

    if (count == 1) {
        return true;
    } else {
        alert("The Code \"" + Code + "\" Already Exist! Please Change..");
        model.set("Code", null);
    }
}

function CheckCdMasCdNmExist(CdNm, model) {
    var grid = $("#grid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!CdNm) {
        CdNm = currentData[0].CdNm;
    }
    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].CdNm == CdNm) {
            count += 1;
        }
    }

    if (count == 1) {
        return true;
    } else {
        alert("The Code Name \"" + CdNm + "\" Already Exist! Please Change..");
        model.set("CdNm", null);
    }
}


