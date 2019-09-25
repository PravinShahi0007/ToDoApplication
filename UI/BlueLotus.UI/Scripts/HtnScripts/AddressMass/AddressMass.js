var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    ItmAdrKy: 1,
    ImgOurCd: "",
    AdrKy: 1,
    TblNm:"AdrMas"
};
$(document)
    .ready(function () {
        GetFormObjData();
        //$.ajax({
        //    url: urlCodes.GetCdKyByConCdAndOurCd,
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

        //    }
        //});

        //La
    });

function GetFormObjData() {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (HdrSectionFromDb) {
            FormGlblData.FormObjData = HdrSectionFromDb;
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    //AdrMassColumn();
    // LoadGridData();
    //   gridOnDataBound();
    var h = $("#option").height();
    var i = $("#ButtonSet").height();
    var height = ($(window).height()) - (80 + h + i + 68);
    $("#AdrGrid").height(height);
    PageSize = Math.round((height - 70) / 30);
    HTNPaginationCtrlLoadWithDataGrid();


};

function HTNPaginationCtrlLoadWithDataGrid() {
    try {
        $("#AdrGrid").data("kendoGrid").destroy();
        $("#AdrGrid").empty();
    } catch (e) {

    }
    AdrMassColumn();

}

function addAdrTypes(AdrKy) {
    $("#AdrTypEntryForm")
        .show()
        .kendoWindow({
            width: "800px",
            height: "550px",
            modal: true,
            title: "Address Type Entry" //"Contact Details"
        });

    $("#AdrTypEntryForm").data("kendoWindow").center().open();
    $("#AdrTypEntryForm").parent().find(".k-window-action").css("visibility", "hidden");
    LoadAdrTypGrid(AdrKy);
}

function ContactDetailsPop(AdrKy) {
    $("#AdrContactInsert")
        .show()
        .kendoWindow({
            width: "800px",
            height: "550px",
            modal: true,
            title: "Contact Details" // "Address Type Entry"
        });

    $("#AdrContactInsert").data("kendoWindow").center().open();
    $("#AdrContactInsert").parent().find(".k-window-action").css("visibility", "hidden");
    LoadContactDetailGrid(AdrKy);
}

function gridOnDataBound() {
    var grid = $("#AdrGrid").data("kendoGrid");
    var AdrTypArry = [];
    $(grid.tbody)
        .on("click",
            "td",
            function (e) {
                var row = $(this).closest("tr");
                var rowIdx = $("tr", grid.tbody).index(row);
                var ColForword =1;
                var colIdx = ColForword + $("td", row).index(this);

                var colIdxNew = ColForword + $("td", row).index(this);   // Add By Lelimo please check this
                var FieldNameNew = $("#AdrGrid").data("kendoGrid").columns[colIdxNew].field;  // Add By Lelimo please check this
               // alert(colIdxNew + FieldNameNew)
                //  alert(FieldNameNew)
                //var row = $(this).closest("tr");
                //var rowIdx = $("tr", grid.tbody).index(row);
                //var colIdx = 1 + $("td", row).index(this);
                var FieldName = $("#AdrGrid").data("kendoGrid").columns[colIdx].field;
                var FieldName2 = $("#AdrGrid").data("kendoGrid").columns[colIdx - 2].field;

                var item = grid.dataItem(row);
                var selectedItem = grid.dataItem(grid.select());;

                var AdrKy = selectedItem.AddressKey;

                var adrKyTmp = item.AddressKey
                //alert(FieldNameNew)
                if (FieldNameNew == "TaxNo3") { //|| colIdx == 8 optional adr typ column
                    addAdrTypes(AdrKy);
                }
                if (FieldName == "ContactDetails" || FieldName2 == "ContactDetails") { //|| colIdx == 8 optional adr typ column
                    ContactDetailsPop(AdrKy);

                }
                if (FieldName == "Items") { //|| colIdx == 8 optional adr typ column
                    ItemDetailsPop(adrKyTmp);
                    var AdrId = item.AddressId;
                    var AdrName = item.AddressName;
                    //console.log(AdrId);
                    //console.log(AdrName);
                    $('#HdrSec1_InptAdrsCd_Val').val(AdrId);
                    $('#HdrSec1_InptAdrsNm_Val').val(AdrName);

                }
                if (FieldName == "UploadImage") {
                    StartUpLoad(this);
                }
            });
}

function ItemDetailsPop(AdrKy) {
    $("#AdrEntryPopup")
        .show()
        .kendoWindow({
            width: "800px",
            height: "550px",
            modal: true,
            title: "Item & Address"
        });

    $("#AdrEntryPopup").data("kendoWindow").center().open();
    FormGlblData.ItmAdrKy = 1;
    LoadPopupCombo();
    $("#HdrSec1_InptAdrKy_Val").val(AdrKy);
    selectItm(AdrKy);
}


function loadAddress() {
    var grid = $("#AdrGrid").data("kendoGrid");
    grid.dataSource.read();

}

function addAddress() {
    var grid = $("#AdrGrid").data("kendoGrid");
    var FirstRow = $("#AdrGrid").data().kendoGrid.dataSource.data()[0];

    if (FirstRow.AddressId) {
        if (FirstRow.AddressName) {
            if (CheckAccNameExist() && CheckAccountExist()) {
                var grid = $("#AdrGrid").data("kendoGrid");
                grid.addRow();
                isnewRec();
            }
        } else {
            alert("Please insert An Address Name");
        }
    } else {
        alert("Please insert An Address Id");
    }



}

function isnewRec() {
    var FirstRow = $("#AdrGrid").data().kendoGrid.dataSource.data()[0];
    //FirstRow.set("isprnt", true);
    FirstRow.set("isAct", true);
    FirstRow.set("isAlwTrn", true);
    FirstRow.set("IsApr", true);

    $('#AdrGrid').data('kendoGrid').refresh();
    var grid = $("#AdrGrid").data("kendoGrid");
    var cell = $('#AdrGrid').find('tbody tr:eq(0) td:eq(2)');
    grid.editCell(cell);

}

$("#HdrSec1_InptAdrCd_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        HTNPaginationCtrlLoadWithDataGrid();
    }
});

$("#HdrSec1_InptAdrNm_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        HTNPaginationCtrlLoadWithDataGrid();
    }

});

function Cancel() {
    $("#AdrGrid").data("kendoGrid").cancelChanges();
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {
    var ObjKy = viewBag.ObjKy;
    var AdrId = $("#HdrSec1_InptAdrCd_Val").val();
    var AdrNm = $("#HdrSec1_InptAdrNm_Val").val();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlAdrMassLoadGrid, //'@Url.Content("~/AddressEntry/GetAddressEntry")',
                data: {
                    'ObjKy': ObjKy, //'92670',
                    'PageNo': HTNPaginationCtrlData.PageNo,
                    'PageSize': HTNPaginationCtrlData.PageSize,
                    'AdrId': AdrId,
                    'AdrNm': AdrNm,
                },
                dataType: "json",
                cache: false
            },

        },

        batch: true,
        pageSize: PageSize,
        schema: {
            model: {
                id: "AddressKey",
                fields: {
                    AddressKey: { editable: false, nullable: false, type: "number" },
                    AddressId: { editable: true, nullable: true, type: "string" },
                    AddressName: { editable: true, nullable: true, type: "string" },
                    isprnt: { editable: true, nullable: false, type: "boolean" },
                    isAct: { editable: true, nullable: false, type: "boolean" },
                    isAlwTrn: { editable: true, nullable: false, type: "boolean" },
                    IsApr: { editable: true, nullable: false, type: "boolean" },
                    TaxNo: { editable: true, nullable: false, type: "string" },
                    isCompany: { editable: true, nullable: false, type: "boolean" },
                    Items: { editable: true, nullable: false, type: "string" },
                    Des: { editable: true, nullable: false, type: "string" },
                    PrntKy: { editable: true, nullable: false, type: "number" },
                    ParentAddress: { editable: true, nullable: false, type: "string" },
                    AccNo: { editable: true, nullable: false, type: "string" },
                    AdrCat1ky: { editable: true, nullable: false, type: "string" },
                    AdrCat1Name: { editable: true, nullable: false, type: "string" },
                    AdrCat2Ky: { editable: true, nullable: false, type: "string" },
                    AdrCat2Name: { editable: true, nullable: false, type: "string" },
                    AdrCat3Ky: { editable: true, nullable: false, type: "string" },
                    AdrCat3Name: { editable: true, nullable: false, type: "string" },
                    AdrCat4Ky: { editable: true, nullable: false, type: "string" },
                    AdrCat4Name: { editable: true, nullable: false, type: "string" },
                    AdrCat5Ky: { editable: true, nullable: false, type: "string" },
                    AdrCat5Name: { editable: true, nullable: false, type: "string" },
                    AdrCat6Ky: { editable: true, nullable: false, type: "string" },
                    AdrCat6Name: { editable: true, nullable: false, type: "string" },
                    Fname: { editable: true, nullable: false, type: "string" },
                    MidNm: { editable: true, nullable: false, type: "string" },
                    LName: { editable: true, nullable: false, type: "string" },
                    Initial: { editable: true, nullable: false, type: "string" },
                    street: { editable: true, nullable: false, type: "string" },
                    City: { editable: true, nullable: false, type: "string" },
                    //  State: { editable: true, nullable: false, type: "string" },
                    TaxNo2: { editable: true, nullable: false, type: "string" },
                    TaxNo3: { editable: true, nullable: false, type: "string" },
                    OptAdrTypKys: { editable: true, nullable: false, type: "string" },
                    OptAdrTyps: { editable: true, nullable: false, type: "string" },
                    NIC: { editable: true, nullable: false, type: "string" },
                    //MobileBusiness: { editable: true, nullable: false, type: "string" },
                    //MobilePersonal: { editable: true, nullable: false, type: "string" },
                    //TelePhone: { editable: true, nullable: false, type: "string" },
                    //EmailBusiness: { editable: true, nullable: false, type: "string" },
                    EmailPersonal: { editable: true, nullable: false, type: "string" },
                    AdrPrfxKy: { editable: true, nullable: false, type: "number" },
                    DefAdrTypKy: { editable: true, nullable: false, type: "number" },
                    DefAdrTypCode: { editable: true, nullable: false, type: "string" },
                    BankKy: { editable: true, nullable: false, type: "number" },
                    BankCode: { editable: true, nullable: true, type: "string" },
                    BankName: { editable: true, nullable: true, type: "string" },
                    BrachKy: { editable: true, nullable: false, type: "number" },
                    BrachCode: { editable: true, nullable: true, type: "string" },
                    BrachName: { editable: true, nullable: true, type: "string" },
                    AccNumber: { editable: true, nullable: true, type: "string" },
                    AdrPriCatKy: { editable: true, nullable: false, type: "number" },
                    NickNm: { editable: true, nullable: true, type: "string" },
                    AdrDesgKy: { editable: true, nullable: false, type: "number" },
                    AdrTitleKy: { editable: true, nullable: false, type: "number" },
                    OurCoordinatorKy: { editable: true, nullable: false, type: "number" },
                    AdrPriCatCode: { editable: true, nullable: true, type: "string" },
                    AdrDesgCode: { editable: true, nullable: true, type: "string" },
                    AdrTitle: { editable: true, nullable: true, type: "string" },
                    YourCoordinator: { editable: true, nullable: true, type: "string" },
                    OurCoordinator: { editable: true, nullable: true, type: "string" },
                    ContactDetails: { editable: true, nullable: false, type: "string" },
                    AccessLvlKy: { editable: true, nullable: false, type: "number" },
                    AccessLvlCode: { editable: true, nullable: true, type: "string" },
                    LockKy: { editable: true, nullable: false, type: "number" },
                    LockCd: { editable: true, nullable: true, type: "string" },
                    UploadImage: { editable: true, nullable: true, type: "string" },
                }
            }
        }
    });
    $("#AdrGrid")
        .kendoGrid(
            {
                dataSource: dataSource,
                navigatable: true,
                autobind: true,
                sortable: true,
                reorderable: true,
                filterable: {
                    mode: "row"
                },
                selectable: "row",
                columnMenu: true,
                resizable: true,
                pageable: true,
                columns: columnsFinal,
                editable: true //,
                //databound: gridOnDataBound,

            });
    $("#AdrGrid .k-grid-content")
        .on("change",
            "input.isprnt",
            function (arg) {
                var Maingrid = $("#AdrGrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isprnt", this.checked);

                if (dataItem.isprnt) {
                    dataItem.set("isprnt", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isprnt", false);
                    dataItem.dirty = true;
                }
            });
    $("#AdrGrid .k-grid-content")
        .on("change",
            "input.isAct",
            function (arg) {
                var Maingrid = $("#AdrGrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isAct", this.checked);

                if (dataItem.isAct) {
                    dataItem.set("isAct", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isAct", false);
                    dataItem.dirty = true;
                }
            });
    $("#AdrGrid .k-grid-content")
        .on("change",
            "input.IsApr",
            function (arg) {
                var Maingrid = $("#AdrGrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("IsApr", this.checked);

                if (dataItem.IsApr) {
                    dataItem.set("IsApr", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("IsApr", false);
                    dataItem.dirty = true;
                }
            });
    $("#AdrGrid .k-grid-content")
        .on("change",
            "input.isAlwTrn",
            function (arg) {
                var Maingrid = $("#AdrGrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isAlwTrn", this.checked);

                if (dataItem.isAlwTrn) {
                    dataItem.set("isAlwTrn", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isAlwTrn", false);
                    dataItem.dirty = true;
                }
            });
    $("#AdrGrid .k-grid-content")
        .on("change",
            "input.isCompany",
            function (arg) {
                var Maingrid = $("#AdrGrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isCompany", this.checked);

                if (dataItem.isCompany) {
                    dataItem.set("isCompany", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isCompany", false);
                    dataItem.dirty = true;
                }
            });
    gridOnDataBound();
}

function saveAddress() {

    var grid = $("#AdrGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            if (currentData[i].DefAdrTypKy == 0 || currentData[i].DefAdrTypKy == 1) {
                alert("Please Select an Default Address Type for : " + currentData[i].AddressId)
                return;
            };
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    // return;
    var deletedRecords = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    }
    if (newRecords.length > 0) {
        $.ajax({
            url: urlAccMAssSaveNewRecords, //"@Url.Content("~/AddressEntry/InsertAddressGrid")",
            data: JSON.stringify({
                //updatedAdr: kendo.stringify(updatedRecords),
                deletedAdr: kendo.stringify(deletedRecords),
                newAdr: kendo.stringify(newRecords),
            }),

            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data) {
                    alert("Successfully Saved..!");
                    loadAddress();
                } else {
                    alert("Please Try Again");
                }
            },
            error: function (e) {

                alert("Please Try Again");
                return false;
            }
        });
    }
    if (updatedRecords.length > 0) {
        $.ajax({
            url: urlAccMAssUpdatecords, // "@Url.Content("~/AddressEntry/UpdateAddressGrid")",
            data: JSON.stringify({
                updatedAdr: kendo.stringify(updatedRecords),
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data) {
                    alert(" Update Successfully..!");
                    loadAddress();
                } else {
                    alert("Please Try Again");
                }
            },
            error: function (e) {
                return false;
            }
        });
    }
    //loadAddress();
}

function Delete() {
    var entityGrid = $("#AdrGrid").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());
    var key = selectedItem.AddressKey;
    var answer = confirm("Confirm to delete this record");
    if (answer) {
        $.ajax({
            url: urlAccMAssDeleteRecords, // '@Url.Content("~/AddressEntry/DeleteAddress")',
            dataType: "json",
            type: "POST",
            data: {
                key: key
            },
            success: function (data) {
                var grid = $("#AdrGrid").data("kendoGrid");
                grid.dataSource.read();
            },
            error: function (e) {

            }
        });
    }
    loadAddress();
}

$("#AdrGrid")
    .on("keydown",
        function (event) {
            if ((event.keyCode == 46) || (event.which == 46)) {
                Delete();
            }

        });

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();
    if (isNaN(val)) {
        if ((cmbNm == "cmbItmCd") || (cmbNm == "cmbItmNm")) {
            OpenItemFindForm(cmb.text());
        } else {
            alert("'" + val + "' is not a Valid input");

            $("#" + cmbNm + "").data("kendoComboBox").value("");
            $("#" + cmbNm + "").data("kendoComboBox").input.focus();
            return false;
        }
    } else {
        return true;
    }
}

//____Bank Code 
function BanckCodeMob(ObjNm) {
    //var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetBankCode,
                    data: {
                        'ObjKy': "1"
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}

//____branch code 
function BranchCodeMob(ObjNm) {
    var grid = $("#AdrGrid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    var BankKy = selectedItem.BankKy;

    // var ObjKy = GetObjKy(ObjNm);
    // var BankKy = ObjNm;//document.getElementById("HdrSec6_CmbBank_Cd").value;
    if (!BankKy || BankKy == null) {
        BankKy = 1;
    }
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetBranchode,
                    data: {
                        'ObjKy': "1",
                        'BankKy': BankKy
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}

function AdrMassColumn() {
    var columnsDefine = [
        { field: "AddressKey", title: "Address Key", locked: true, hidden: true }, //k
        { field: "AddressId", title: "Address Id", width: 150, locked: true }, //k
        { field: "AddressName", title: "Address Name", width: 300, locked: true },
        {
            field: "isprnt",
            template: '<input type="checkbox" #= isprnt ? "checked=checked" : "" # class="isprnt" ></input>',
            title: "Is Parent",
            width: 100,
            attributes: { style: "text-align:Center;" }
        },
        {
            field: "isAct",
            template: '<input type="checkbox" #= isAct? "checked=checked" : "" # class="isAct" ></input>',
            title: "Is Act",
            width: 100,
            attributes: { style: "text-align:Center;" }

        },
        {
            field: "IsApr",
            template: '<input type="checkbox" #= IsApr? "checked=checked" : "" # class="IsApr"  ></input>',
            title: "Is Aprove",
            width: 100,
            attributes: { style: "text-align:Center;" }

        },
        {
            field: "isAlwTrn",
            template: '<input type="checkbox" #= isAlwTrn? "checked=checked" : "" # class="isAlwTrn" ></input>',
            title: "Is AlwTrn",
            width: 100,
            attributes: { style: "text-align:Center;" }

        },
        { field: "TaxNo", title: "Tax No", width: 150 },
        {
            field: "isCompany",
            template: '<input type="checkbox" #= isCompany? "checked=checked" : "" # class="isCompany" ></input>',
            title: "is Company",
            width: 100,
            attributes: { style: "text-align:Center;" }

        },
        { field: "Items", title: "Items", width: 150 },
        { field: "Des", title: "Descripton", width: 150 },
        { field: "PrntKy", title: "PrntKy", width: 150, hidden: true },
        {
            field: "ParentAddress",
            title: "Parent Address",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="ParentAddress" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: AddressCode("ParentAddress"),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("ParentAddress");

                            if (validate) {
                                model.set("PrntKy", dataItem.AdrKy);
                                model.set("ParentAddress", dataItem.AdrCode);
                            } else {
                                model.set("PrntKy", 1);
                                model.set("ParentAddress", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "AdrKy",
                        dataTextField: "AdrCode"
                    });
            }
        },
        { field: "LockKy", title: "LockKy", width: 150, hidden: true },
        {
            field: "LockCd",
            title: "Location",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="LockCd" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: CdMasCode("LockCd"),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("LockCd");

                            if (validate) {
                                model.set("LockKy", dataItem.CdKy);
                                model.set("LockCd", dataItem.Code);
                            } else {
                                model.set("LockKy", 1);
                                model.set("LockCd", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "AdrPriCatKy", title: "AdrPriCatKy", width: 150, hidden: true },
        {
            field: "AdrPriCatCode",
            title: "AdrPriCat Code",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrPriCatCode" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: CdMasCode("AdrPriCatCode"),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrPriCatCode");

                            if (validate) {
                                model.set("AdrPriCatKy", dataItem.CdKy);
                                model.set("AdrPriCatCode", dataItem.Code);
                            } else {
                                model.set("AdrPriCatKy", 1);
                                model.set("AdrPriCatCode", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "AdrCat1Ky", title: "AdrCat1Ky", width: 150, hidden: true },
        {
            field: "AdrCat1Name",
            title: "AdrCat1 Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrCat1Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: AdrCatName("AdrCat1Name"),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrCat1Name");

                            if (validate) {
                                model.set("AdrCat1Ky", dataItem.CdKy);
                                model.set("AdrCat1Name", dataItem.Code);
                            } else {
                                model.set("AdrCat1Ky", 1);
                                model.set("AdrCat1Name", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "AdrCat2Ky", title: "AdrCat2Ky", width: 150, hidden: true },
        {
            field: "AdrCat2Name",
            title: "AdrCat2 Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrCat2Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: AdrCatName("AdrCat2Name"),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrCat2Name");

                            if (validate) {
                                model.set("AdrCat2Ky", dataItem.CdKy);
                                model.set("AdrCat2Name", dataItem.Code);
                            } else {
                                model.set("AdrCat2Ky", 1);
                                model.set("AdrCat2Name", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "AdrCat3Ky", title: "AdrCat3Ky", width: 150, hidden: true },
        {
            field: "AdrCat3Name",
            title: "AdrCat3 Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrCat3Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: AdrCatName("AdrCat3Name"),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrCat3Name");

                            if (validate) {
                                model.set("AdrCat3Ky", dataItem.CdKy);
                                model.set("AdrCat3Name", dataItem.Code);
                            } else {
                                model.set("AdrCat3Ky", 1);
                                model.set("AdrCat3Name", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "AdrCat4Ky", title: "AdrCat4Ky", width: 150, hidden: true },
        {
            field: "AdrCat4Name",
            title: "AdrCat4 Name",
            width: 150,

            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrCat4Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: AdrCatName("AdrCat4Name"),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrCat4Name");

                            if (validate) {
                                model.set("AdrCat4Ky", dataItem.CdKy);
                                model.set("AdrCat4Name", dataItem.Code);
                            } else {
                                model.set("AdrCat4Ky", 1);
                                model.set("AdrCat4Name", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "AdrCat5Ky", title: "AdrCat5Ky", width: 150, hidden: true },
        {
            field: "AdrCat5Name",
            title: "AdrCat5 Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrCat5Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: AdrCatName("AdrCat5Name"),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrCat5Name");

                            if (validate) {
                                model.set("AdrCat5Ky", dataItem.CdKy);
                                model.set("AdrCat5Name", dataItem.Code);
                            } else {
                                model.set("AdrCat5Ky", 1);
                                model.set("AdrCat5Name", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "AdrCat6Ky", title: "AdrCat6Ky", width: 150, hidden: true },
        {
            field: "AdrCat6Name",
            title: "AdrCat6 Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrCat6Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: AdrCatName("AdrCat6Name"),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrCat6Name");

                            if (validate) {
                                model.set("AdrCat6Ky", dataItem.CdKy);
                                model.set("AdrCat6Name", dataItem.Code);
                            } else {
                                model.set("AdrCat6Ky", 1);
                                model.set("AdrCat6Name", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "Fname", title: "First Name", width: 150 },
        { field: "MidNm", title: "Middle Name", width: 150 },
        { field: "LName", title: "Last Name", width: 150 },
        { field: "Initial", title: "Initials", width: 150 },
        { field: "street", title: "street", width: 150 },
        { field: "City", title: "City", width: 150 },
        //{ field: "State", title: "State", width: 150 },
        { field: "TaxNo2", title: "TaxNo2", width: 150 },
        { field: "TaxNo3", title: "TaxNo3", width: 150 },
        { field: "OptAdrTyps", title: "Optional Address Type", width: 150 },
        { field: "DefAdrTypKy", title: "Default Type Ky", width: 100, hidden: true },
        {
            field: "DefAdrTypCode",
            title: "Default Type",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="DefAdrTyp" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: AddressDefCode("DefAdrTypCode"),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("DefAdrTyp");

                            if (validate) {
                                model.set("DefAdrTypKy", dataItem.AdrTypKy);
                                model.set("DefAdrTypCode", dataItem.AddressType);
                            } else {
                                model.set("DefAdrTypKy", 1);
                                model.set("DefAdrTypCode", "");
                            }

                        },
                        filter: "startswith",
                        //ataValueField: "AdrKy",
                        //dataTextField: "AdrCode"
                        dataValueField: "AdrTypKy",
                        dataTextField: "AddressType",
                    });
            }
        },
        { field: "NIC", title: "NIC", width: 150 },
        //{ field: "MobileBusiness", title: "Mobile Business", width: 150 },
        //{ field: "MobilePersonal", title: "Mobile Personal", width: 150 },
        //{ field: "TelePhone", title: "Telephone", width: 150 },
        //{ field: "EmailBusiness", title: "EMail Business", width: 150 },
        //{ field: "EmailPersonal", title: "Email Personal", width: 150 },
        { field: "AdrPrfxKy", title: "AdrPrfxKy", width: 100, locked: true, hidden: true },
        { field: "BankKy", title: "Bank Key", width: 150, hidden: true },
        //{
        //    field: "BankCode",
        //    title: "Bank Name",
        //    width: 150,
        //    editor: function(container, options) {
        //        var model = options.model;
        //        $('<input id="cmbBankCode" name="' + options.field + '"/>')
        //            .appendTo(container)
        //            .kendoComboBox({
        //                dataSource: BanckCodeMob("Test"),
        //                change: function(e) {
        //                    combo = e.sender;
        //                    selectedItm = combo.select();
        //                    dataItem = combo.dataItem(selectedItm);
        //                    var validate = ComboValidations("cmbBankCode");

        //                    if (validate) {
        //                        model.set("BankKy", dataItem.BankKy);
        //                        model.set("BankCode", dataItem.BankCode);
        //                        //BranchCodeMob(dataItem.BankKy);
        //                    } else {
        //                        model.set("BankKy", 1);
        //                        model.set("BankCode", "");
        //                    }

        //                },
        //                filter: "startswith",
        //                dataValueField: "BankKy",
        //                dataTextField: "BankCode",
        //            });
        //    }

        //},
        {
            field: "BankName",
            title: "Bank Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbBankCode" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: BanckCodeMob("Test"),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("cmbBankCode");

                            if (validate) {
                                model.set("BankKy", dataItem.BankKy);
                                model.set("BankName", dataItem.BankCode);
                                //BranchCodeMob(dataItem.BankKy);
                            } else {
                                model.set("BankKy", 1);
                                model.set("BankName", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "BankKy",
                        dataTextField: "BankCode",
                    });
            }
        },
        { field: "BrachKy", title: "Brach Key", width: 150, hidden: true },
        //{
        //    field: "BrachCode",
        //    title: "Brach Name",
        //    width: 150,
        //    editor: function(container, options) {
        //        var model = options.model;
        //        $('<input id="cmbBrnchCode" name="' + options.field + '"/>')
        //            .appendTo(container)
        //            .kendoComboBox({
        //                dataSource: BranchCodeMob(),
        //                //@*dataSource: {
        //                //    type: "POST",
        //                //    transport: {
        //                //        read: '@Url.Content("~/AddressEntry/GetIsCompanyList")',
        //                //    }
        //                //},*@
        //                change: function(e) {

        //                    combo = e.sender;
        //                    selectedItm = combo.select();
        //                    dataItem = combo.dataItem(selectedItm);
        //                    var validate = ComboValidations("cmbBrnchCode");

        //                    if (validate) {
        //                        model.set("BrachKy", dataItem.BrachKy);
        //                        model.set("BrachCode", dataItem.BrachCode);
        //                    } else {
        //                        model.set("BrachKy", 1);
        //                        model.set("BrachCode", "");
        //                    }

        //                },
        //                filter: "startswith",
        //                dataValueField: "BrachKy",
        //                dataTextField: "BrachCode",
        //            });
        //    }
        //},
        {
            field: "BrachName",
            title: "Brach Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbBrnchCode" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: BranchCodeMob(),
                        //@*dataSource: {
                        //    type: "POST",
                        //    transport: {
                        //        read: '@Url.Content("~/AddressEntry/GetIsCompanyList")',
                        //    }
                        //},*@
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("cmbBrnchCode");

                            if (validate) {
                                model.set("BrachKy", dataItem.BrachKy);
                                model.set("BrachName", dataItem.BrachCode);
                            } else {
                                model.set("BrachKy", 1);
                                model.set("BrachName", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "BrachKy",
                        dataTextField: "BrachCode",
                    });
            }
        },
        { field: "AccNo", title: "Account Number", width: 150 },
        { field: "NickNm", title: "Nick Name", width: 150 },
        { field: "AdrDesgKy", title: "AdrDesgKy", width: 150, hidden: true },
        {
            field: "AdrDesgCode",
            title: "Adr Desg Code",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrDesgCode" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: CdMasCode("AdrDesgCode"),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrDesgCode");

                            if (validate) {
                                model.set("AdrDesgKy", dataItem.CdKy);
                                model.set("AdrDesgCode", dataItem.Code);
                            } else {
                                model.set("AdrDesgKy", 1);
                                model.set("AdrDesgCode", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "AdrTitleKy", title: "AdrTitleKy", width: 150, hidden: true },
        {
            field: "AdrTitle",
            title: "Address Title",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AdrTitle" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: CdMasCode("AdrTitle"),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AdrTitle");

                            if (validate) {
                                model.set("AdrTitleKy", dataItem.CdKy);
                                model.set("AdrTitle", dataItem.Code);
                            } else {
                                model.set("AdrTitleKy", 1);
                                model.set("AdrTitle", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "OurCoordinatorKy", title: "OurCoordinatorKy", width: 150, hidden: true },
        {
            field: "OurCoordinator",
            title: "Our Coordinator Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="OurCoordinator" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: CdMasCode("AdrTitle"),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("OurCoordinator");
                            if (validate) {
                                model.set("OurCoordinatorKy", dataItem.CdKy);
                                model.set("OurCoordinator", dataItem.Code);
                            } else {
                                model.set("OurCoordinatorKy", 1);
                                model.set("OurCoordinator", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "YourCoordinatorKy", title: "YourCoordinatorKy", width: 150, hidden: true },
        {
            field: "YourCoordinator",
            title: "Your Coordinator Name",
            width: 150,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="YourCoordinator" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: CdMasCode("YourCoordinator"),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("YourCoordinator");
                            if (validate) {
                                model.set("YourCoordinatorKy", dataItem.CdKy);
                                model.set("YourCoordinator", dataItem.Code);
                            } else {
                                model.set("YourCoordinatorKy", 1);
                                model.set("YourCoordinator", "");
                            }

                        },
                        filter: "startswith",
                        dataValueField: "CdKy",
                        dataTextField: "Code"
                    });
            }
        },
        { field: "ContactDetails", title: "ContactDetails", width: 150 },
        {
            field: "AccessLvlKy", title: "AccessLvlKy", width: "70px", width: "70px"
        },// hidden: "true",
        {
            field: "AccessLvlCode", title: "AccessLvlCode", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccessLvlCode" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('AccessLvlCode'),//CdMasCode("AdrDesgCode"),/
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccessLvlCode");
                            if (validate) {
                                model.set("AccessLvlKy", dataItem.CdKy);
                                model.set("AccessLvlCode", dataItem.Code);

                            } else {
                                model.set("AccessLvlKy", 1);
                                model.set("AccessLvlCode", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccessLvl Code"
                    });
            }
        },
        //{
        //    field: "UploadImage", title: "Image", width: "100px",
        //    template: kendo.template($("#command-template-Image").html()),
        //    editor: function (container, options) {

        //    }
        //}

    ];

    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, "", "FormGrd", gridNo);

}


function AdrCatName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetBUCode,
                    data: {
                        'ObjKy': ObjKy
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;

}

function AddressDefCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetDefAdres,
                    //data: {
                    //    ObjKy: ObjKy,

                    //},
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}

//____Address data source
function AddressCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetAddressCd,
                    data: {
                        ObjKy: ObjKy,
                        'PreKy': "1"
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}

//From Payment
//____BU data source
function CdMasCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetCdCode,
                    data: {
                        'ObjKy': ObjKy,
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}

//____BU data source
function CdMasCd(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: CdMasCodeGet,
                    data: {
                        'ObjKy': ObjKy,
                        'PreKy': PreKy,
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}

function CdMasName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: CdMasNm,
                    data: {
                        'ObjKy': ObjKy,
                        'PreKy': PreKy,
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}
$(document.body).keydown(function (e) {
    if (e.keyCode == 107 || (e.altKey && e.keyCode == 78)) {
        e.preventDefault();
        addAddress()
    }
});
function CheckAccNameExist(AdrNm) {
    var grid = $("#AdrGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!AdrNm) {
        AdrNm = currentData[0].AddressName;
    }
    // var FirstLine = currentData[0].AdrNm;

    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].AddressName == AdrNm) {
            count += 1;
        }
    }


    if (count == 1) {
        return true;
    } else {
        alert("Existing Address Name Please Change the Address Name :- " + AdrNm);
    }
}


function CheckAccountExist(AdrId) {
    var grid = $("#AdrGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!AdrId) {
        AdrId = currentData[0].AddressId;
    }
    //var FirstLine = currentData[0].AdrId;
    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].AddressId == AdrId) {
            count += 1;
        }
    }

    if (count == 1) {
        return true;
    } else {
        alert("Existing Address ID Please Change the Address Id :- " + AdrId);


    }
}

$("#AdrGrid").on("click", ".k-grid-Logoselect", function () {
    FormGlblData.ImgOurCd = "";
    StartUpLoad(this);
});


function StartUpLoad(Clicked) {
    var grid = $("#AdrGrid").data("kendoGrid");
    var selectedItem = grid.dataItem($(Clicked).closest("tr"));
    selectedItem.AddressKey == null || selectedItem.AddressKey == "" || selectedItem.AddressKey == "0" || selectedItem.AddressKey == undefined || selectedItem.AddressKey <= 10 ? alert("Save this Record and Try Again!")
        : $("#AdrMasAttachImage").show().kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            title: "Upload Your Images for " + selectedItem.AddressName
        });
    $('#AdrMasAttachImage').data('kendoWindow').center().open();
    FormGlblData.AdrKy = selectedItem.AddressKey;
    GetImage(FormGlblData.AdrKy);
}