
var ControlConKy = 1;
var EmpKy = 1;
var EmpCdDtKy = 1;
var Editing_LiNo = 0;

var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {
    //$(document).ready(function () {

    //    $.ajax({
    //        url: urlCodes.GetCdKyByConCdAndOurCd,
    //        dataType: "json",
    //        type: "POST",
    //        data: JSON.stringify({
    //            ObjKy: viewBag.ObjKy,
    //            ConCd: 'TrnTyp',
    //            OurCd: viewBag.OurCd
    //        }),
    //        contentType: 'application/json; charset=utf-8',
    //        success: function (TrnTypKy) {

    //            FormGlblData.TrnTypKy = TrnTypKy;

    //        }
    //    });
    //});

    GetFormObjData();
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
    //setTimeout(setHdrSectionPropFun, 2000);
    LoadDatePicker();
    LoadCombo();
    LoadGrid();
    LoadCode();

    //$('#HdrSec1_ChkboxApplyAll_Val').attr('checked', false);

    //$("#GridWin").show();
    //LoadGridView();

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);

}

function LoadDatePicker() {

    $("#HdrSec1_DatPicFrmDt_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    $("#HdrSec1_DatPicToDt_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    var todayDate = new Date();
    $("#HdrSec1_DatPicFrmDt_Val").data("kendoDatePicker").value(todayDate);


}

function LoadCode() {
    $("#HdrSec1_CmbCode_Nm").kendoComboBox({


        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetTypP(ControlConKy),

        filter: "contains",
        suggest: true,
        placeholder: "Select a Code"
    })
}


function LoadCombo() {

    $("#HdrSec1_CmbEmpNo_cd").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNo",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox");
            EmpKy = cmb.value();


            if (EmpKy != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpNo_cd");

                if (validate) {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(EmpKy);
                    LoadGrid(EmpKy);

                } else {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee EmpNo"
    })

    $("#HdrSec1_CmbEmpNm_Nm").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox");
            EmpKy = cmb.value();


            if (EmpKy != "") {

                var validate = ComboValidations("HdrSec1_CmbEmpNm_Nm");

                if (validate) {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value(EmpKy);
                    LoadGrid(EmpKy);


                } else {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee Name"
    })


    $("#HdrSec1_CmbType_Nm").kendoComboBox({

        dataValueField: "ControlConKy",
        dataTextField: "ConNm",

        dataSource: {
            type: "POST",
            transport: {
                read: urlEmpMas.GetTypeOth
            }
        },

        change: function (e) {
            ControlConKy = document.getElementById("HdrSec1_CmbType_Nm").value;

            LoadCode();

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Type"
    })

    function ComboValidations(cmbNm) {

        var cmb = $("#" + cmbNm + "").data("kendoComboBox");
        var val = cmb.value();

        if (isNaN(val)) {
            alert("'" + val + "' is not a Valid input");
            $("#" + cmbNm + "").data('kendoComboBox').value("");
            return false;
        } else {
            return true;
        }
    }
}



function GetTypP(Temp) {
    var dataSource = new kendo.data.DataSource(
{
    transport: {
        read: {
            url: urlEmpMas.GetCodeOth,
            data: {
                ControlConKy: Temp
            },
            dataType: "json"
        }
    }
});
    return dataSource;
}


function AfterFindEmp(empKy) {
    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value(empKy);
    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(empKy);
    EmpKy = empKy;
}


function EmpDetailClear() {
    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbType_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbCode_Nm").data("kendoComboBox").value("");

    var todayDate = new Date();
    $("#HdrSec1_DatPicFrmDt_Val").data("kendoDatePicker").value(todayDate);

    $("#GridEmpOthr").data('kendoGrid').dataSource.data([]);
}

function EmpHdrClear() {

    $("#HdrSec1_CmbType_Nm").data("kendoComboBox").value("");

    $("#HdrSec1_DatPicToDt_Val").data("kendoDatePicker").value("");

    var todayDate = new Date();
    $("#HdrSec1_DatPicFrmDt_Val").data("kendoDatePicker").value(todayDate);

    $("#HdrSec1_CmbCode_Nm").data("kendoComboBox").value("");


}


function LoadGrid(EmpKy) {

    EmpKy = EmpKy;
    var AttColumn = [
        {
            field: "LiNo", title: "LiNo", width: "10px", hidden: true,
        },
           {
               field: "EmpCdDtKy", title: "EmpCdDtKy", width: "10px", hidden: true,
           },

             {
                 field: "EmpKy", title: "EmpKy", width: "10px", hidden: true,
             },
             {
                 field: "ControlConKy", title: "ControlConKy", width: "10px", hidden: true,
                 editor: function (container, options) {
                     var model = options.model;
                 }
             },
                        {
                            field: "CdKy", title: "CdKy", width: "10px", hidden: true,
                            editor: function (container, options) {
                                var model = options.model;
                            }
                        },

        {
            field: "ConNm", title: "Type", width: "100px", attributes: { style: "text-align:center;" },
            editor: function (container, options) {
                var model = options.model;
            }

        },

            {
                field: "CdNm", title: "Name", width: "100px", attributes: { style: "text-align:center;" },
                editor: function (container, options) {
                    var model = options.model;
                }

            },
             {
                 field: "EftDt", title: " Effective Date", width: "100px", attributes: { style: "text-align:center;" },
                 format: "{0: dd/MM/yyyy}",
                 editor: function (container, options) {
                     var model = options.model;
                 }
             },
             {
                 field: "ToDt", title: "ToDt", width: "100px", attributes: { style: "text-align:center;" },
                 format: "{0: dd/MM/yyyy}",
                 editor: function (container, options) {
                     var model = options.model;
                 }
             },


    ];

    var gridNo = 1;
    var FinalItmSettingsColumn = setColumnProp(AttColumn, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        try {
            $('#GridEmpOthr').data().kendoGrid.destroy();
            $('#GridEmpOthr').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlEmpMas.GetOtherDetails, // '@Url.Action("Attendance_SearchSelectweb", "EmpMas")',

                    dataType: "json",
                    type: "POST",
                    //complete: function (data) { },
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'EmpKy': EmpKy,
                            'GrpConCd': 'EmpTrn',

                        })
                    }
                }

            },
            batch: true,
            pageSize: 10,

            schema: {
                model: {
                    id: "EmpCdDtKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        LiNo: { editable: false, nullable: false, type: "number" },
                        EmpKy: { editable: false, nullable: false, type: "number" },
                        EmpCdDtKy: { editable: false, nullable: false, type: "number" },
                        EmpNo: { editable: false, nullable: false, type: "string" },
                        EmpNm: { editable: false, nullable: false, type: "string" },
                        CdKy: { editable: true, nullable: false, type: "number" },
                        ControlConKy: { editable: true, nullable: false, type: "number" },
                        ToDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        EftDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        CdNm: { editable: true, nullable: false, type: "string" },
                        ConNm: { editable: true, nullable: false, type: "string" },

                    }
                }
            }
        });


        $("#GridEmpOthr").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },
            columns: columnsFinal,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            edit: function (e) {

            },

            editable: true,
        });

    }
}

function Add() {

    var grid = $("#GridEmpOthr").data("kendoGrid");
    var LiNo = 1;

    var EmpKy = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value();
    var ControlConKy = $("#HdrSec1_CmbType_Nm").data("kendoComboBox").value();
    var CdKy = $("#HdrSec1_CmbCode_Nm").data("kendoComboBox").value();

    var ConNm = $("#HdrSec1_CmbType_Nm").data("kendoComboBox").text();
    var CdNm = $("#HdrSec1_CmbCode_Nm").data("kendoComboBox").text();

    var EftDt = $("#HdrSec1_DatPicFrmDt_Val").val();
    var ToDt = $("#HdrSec1_DatPicToDt_Val").val();

    if (Editing_LiNo > 0) {

        LiNo = Editing_LiNo;
        var firstItemData = grid.dataSource.data();
        var firstItem = firstItemData[LiNo - 1];//[count - LiNoForChange];

        firstItem.set("LiNo", LiNo);
        firstItem.set("ControlConKy", ControlConKy);
        firstItem.set("EmpCdDtKy", EmpCdDtKy);
        firstItem.set("CdNm", CdNm);
        firstItem.set("ConNm", ConNm);
        firstItem.set("EmpKy", EmpKy);
        firstItem.set("CdKy", CdKy);
        firstItem.set("ToDt", ToDt);
        firstItem.set("EftDt", EftDt);

        firstItem.Dirty = "Dirty";

    }
    else {

        if (document.getElementById("HdrSec1_CmbType_Nm").value != "") {
            if (document.getElementById("HdrSec1_CmbCode_Nm").value != "") {


                if (document.getElementById("HdrSec1_CmbEmpNo_cd").value == "") {
                    alert("Please select an Employee");
                }
                else {

                    var dataSource = grid.dataSource;
                    var total = dataSource.data().length;

                    grid.dataSource.insert(
               LiNo = total + 1,
               {
                   LiNo: LiNo,
                   ControlConKy: ControlConKy,
                   EmpCdDtKy: EmpCdDtKy,
                   CdNm: CdNm,
                   ConNm: ConNm,
                   EmpKy: EmpKy,
                   CdKy: CdKy,
                   ToDt: ToDt,
                   EftDt: EftDt,


               });


                }

            }
            else {
                alert("Please Select Code");
            }
        }

        else {
            alert("Please Select Type");
        }
    }

    Editing_LiNo = 0;
    EmpHdrClear();
}

$(document).keydown(function (e) {

    if (e.which === 90 && e.ctrlKey) {
        Add();
    }
});

function Save() {

    var GridEmpOthr = $("#GridEmpOthr").data("kendoGrid");

    //save grid addition
    var dataSource = GridEmpOthr.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var currentData = GridEmpOthr.dataSource.data();
    var updatedRecords = [];
    var newRecordsGridEmpOthr = [];


    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew() || currentData[i].EmpCdDtKy == 1 || currentData[i].Dirty == "Dirty") {
            newRecordsGridEmpOthr.push(currentData[i].toJSON());
        } else if (currentData[i].Dirty == "Dirty" && currentData[i].EmpCdDtKy > 1) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }


    ////save grid deduction
    //var dataSourceded = GridMonthlyDeductionEntry.dataSource;

    ////records on current view / page   
    //var recordsOnCurrentView = dataSourceded.view().length;
    ////total records
    //var totalRecords = dataSourceded.total();

    //var currentData = GridMonthlyDeductionEntry.dataSource.data();
    //var updatedRecords = [];
    //var newRecordsGridMonthlyDed = [];
    //alert(currentData.length);

    //for (var i = 0; i < currentData.length; i++) {
    //    if (currentData[i].isNew()) {
    //        //alert(newRecordsGridMonthlyAdditionEntry);
    //        newRecordsGridMonthlyDed.push(currentData[i].toJSON());
    //    } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
    //        updatedRecords.push(currentData[i].toJSON());
    //    }
    //}
    // alert(newRecordsGridMonthlyAdditionEntry);

    $.ajax({

        url: urlEmpMas.InsertOtherDetails, //EmpMas/InsertOtherDetails
        data: JSON.stringify({

            newRecords: kendo.stringify(newRecordsGridEmpOthr),
            UpdtRecords: kendo.stringify(updatedRecords),

            //EmpDed:x



        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data > 1) {

                LoadGrid(EmpKy);

                alert("successfully Saved!");

            }
            else {

                alert("Failed");
            }
            //alert(data)
            //var a = data;
            ////  $("#Trnky").value(a);
            //var elem = document.getElementById("Trnky");
            //elem.value = a;

            //  alert(a)
            //  GetGridDetail(a);
            //clearDet();
        },
        error: function (e) {
            alert("Failed");
            return false;
        }

    });

}


$("#GridEmpOthr").on("dblclick", "tr.k-state-selected", function () {

    var id = ("#GridEmpOthr");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    ControlConKy = selectedItem.ControlConKy;
    LoadCode();

    var CdKy = selectedItem.CdKy;
    EmpCdDtKy = selectedItem.EmpCdDtKy;
    EmpKy = selectedItem.EmpKy;
    var EftDt = selectedItem.EftDt;

    var ToDt = selectedItem.ToDt;
    Editing_LiNo = selectedItem.LiNo;

    $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value(EmpKy);
    $("#HdrSec1_CmbEmpNm_Nm").data('kendoComboBox').value(EmpKy);
    $("#HdrSec1_CmbType_Nm").data('kendoComboBox').value(ControlConKy);
    $("#HdrSec1_CmbCode_Nm").data('kendoComboBox').value(CdKy);

    $("#HdrSec1_DatPicFrmDt_Val").data("kendoDatePicker").value(EftDt);
    $("#HdrSec1_DatPicToDt_Val").data("kendoDatePicker").value(ToDt);

});



