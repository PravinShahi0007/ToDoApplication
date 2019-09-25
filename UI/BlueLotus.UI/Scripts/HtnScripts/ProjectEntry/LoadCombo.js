var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    //

};
LoadGloabData();
var prjTaskLocKy;
var prjKy;
function LoadGloabData() {
    GetFormObjData();
    //$.ajax({
    //    url: urlCodes.GetCdKyByConCdAndOurCd,
    //    dataType: "json",
    //    type: "POST",
    //    data: JSON.stringify({
    //        ObjKy: viewBag.ObjKy,
    //        ConCd: "LogTyp",
    //        OurCd: viewBag.OurCd
    //    }),
    //    contentType: "application/json; charset=utf-8",
    //    success: function (TrnTypKy) {
    //        FormGlblData.TrnTypKy = TrnTypKy;
    //        GetFormObjData();
    //    }
    //});
}

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
            setHdrSectionPropFun();
            //FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            //FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            //FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            CusDocRedy();
        }
    });

}

function CusDocRedy() {
    Button_From_Dynamic("ButtonSec1");
    LoadPrjCombo();
    LoadGrid();
    //FirstGridLoadFunction()

}
function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();
}

function FirstGridLoadFunction() {
    $.ajax({
        type: 'POST',
        url: PrjGridLoad.LoadAllPrj,
        dataType: "json",
        data: {
        },
        success: function (data) {
            //alert(JSON.stringify(data));
            LoadPrjGrid(data);
        },
        error: function () {
            alert("Failed! Please try again.");
        }
    });
}


function LoadGrid() {

    $("#HdrSec2_InpColumnGd").kendoGrid({
        columns: [
            {
                title: "project", field: "project",
                width: 150
            },
            {
                title: "Project Location code", field: "Projectcode",
                width: 200
            },
            {
                title: "Project Location Name", field: "projectName",
                width: 250
            },
             //{ title :"Edit", command: "edit",width:50 }
        ],
        dataSource: {
        },
        height: 400,
        scrollable: true
    });
}


function LoadPrjCombo() {
    $("#HdrSec1_ComProPj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource("HdrSec1_ComProPj"),
        change: function (e) {
            var cmb = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            var prjNudropdownlist = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox");
            var PrjKy = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox").value();
            if (PrjKy == "" || PrjKy == 1) {
                $("#HdrSec2_InpColumnGd").data("kendoGrid").dataSource.data([]);
                return;
            }
            LoadDataToGrid(PrjKy);
           
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a the Project"
    });
}


//function LoadPrjLocCd() {
//    $("#HdrSec1_ComProLoc_Cd").kendoComboBox({
//        dataValueField: "PrjKy",
//        dataTextField: "PrjId",
//        dataSource: PrjId_SelectMob_DataSource("HdrSec1_ComProPj"),
//        change: function (e) {
//            var cmb = $("#HdrSec1_ComProLoc_Cd").data("kendoComboBox");
//            var CdKy = cmb.value();
//        },
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select the Project location"
//    });
//}



//$('#HdrSec1_ComProPj_Cd').change(function () {
//    var prjNudropdownlist = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox");
//    var PrjKy = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox").value();
//    if (PrjKy == "" || PrjKy == 1) {
//        $("#HdrSec2_InpColumnGd").data("kendoGrid").dataSource.data([]);
//        return;
//    }
//    LoadDataToGrid(PrjKy);

//    //var prjnm = prjNudropdownlist.value($("#PrjNm").val())
//    //alert("Welcome " + prjnm);

//});

function LoadDataToGrid(PrjKy) {
    $.ajax({
        type: 'POST',
        url: PrjLocUrlSettings.PrjLocUrl,
        dataType: "json",
        data: {
            prjKy: PrjKy//prjNudropdownlist.value($("#PrjNm").val()),
        },
        success: function (data) {
            //alert(JSON.stringify(data));
            LoadPrjGrid(data);
            ClearButtonOnlick();
        },
        error: function () {
            alert("Failed! Please try again.");
        }
    });

}


function Save() {

    var prjNudropdownlist = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox");
    var prjLocCd = $("#HdrSec1_InpProLoc_Cd").val();
    var prjLocNm = $('#HdrSec1_InpProLoc_Nm').val();
    if (prjLocNm.length == 0 && prjLocCd.length == 0 || prjLocNm.length == 0 || prjLocCd.length == 0) {
        alert("Please Enter a Code And Name");
        return;
    }
    var PrjKy = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox").value();

    if (prjTaskLocKy == null && prjKy == null) {
        $.ajax({
            type: 'POST',
            url: PrjUrlSettings.UsefulUrl,
            dataType: "json",

            data: {
                prjnm:PrjKy, //prjNudropdownlist.value($("#PrjNm").val()),
                prjLoCd: prjLocCd,
                prjLoNm: prjLocNm,
                ObjKy: viewBag.ObjKy,
            },
            success: function (data) {
                alert(data);
                //FirstGridLoadFunction();
                ClearButtonOnlick();
                $("#HdrSec1_ComProPj_Cd").data("kendoComboBox").value(PrjKy);
                $("#HdrSec1_ComProPj_Cd").data("kendoComboBox").trigger("change");
               // LoadDataToGrid(PrjKy)
            },
            error: function () {
                alert("Failed! Please try again.");
            }
        });

    }
    else {
        $.ajax({
            type: 'POST',
            url: prjTaskEditUrl.EditUrl,
            dataType: "json",
            data: {
                prjTaskLocky: prjTaskLocKy,
                prjKy: prjKy,
                prjLoCd: prjLocCd,
                prjLoNm: prjLocNm,
                ObjKy: viewBag.ObjKy,
            },
            success: function (data) {
                alert(data);               
                ClearButtonOnlick();
                $("#HdrSec1_ComProPj_Cd").data("kendoComboBox").value(PrjKy);
                $("#HdrSec1_ComProPj_Cd").data("kendoComboBox").trigger("change");
                prjTaskLocKy = null;
                prjKy = null;
            },
            error: function () {
                alert("Failed! Please try again.");
            }
        });
    }



}
function ClearButtonOnlick() {
    $("#HdrSec1_InpProLoc_Cd").val("");
    $('#HdrSec1_InpProLoc_Nm').val("");
}


function LoadPrjGrid(data) {
    $("#HdrSec2_InpColumnGd").kendoGrid({
        columns: [
            { title: "projectTaskLocKy", field: "PrjTaskLocKy", hidden: true },
            {
                title: "project", field: "PrjKy",
                width: 150
            },
            {
                title: "Project Location code", field: "PrjTaskCd",
                width: 200
            },
            {
                title: "Project Location Name", field: "PrjTaskNm",
                width: 250
            },
            {
                width: "60px",
                template: kendo.template($("#command-template").html())
            }
        ],
        dataSource: {
            data: data
        },

        scrollable: true,
        selectable: true
    });
    $("#HdrSec2_InpColumnGd").dblclick(function () {
        var gritrow = $("#HdrSec2_InpColumnGd").data("kendoGrid");
        var selectedItem = gritrow.dataItem(gritrow.select());
        prjTaskLocKy = selectedItem.PrjTaskLocKy;
        prjKy = selectedItem.PrjKy;
        $("#HdrSec1_InpProLoc_Cd").val(selectedItem.PrjTaskCd);
        $("#HdrSec1_InpProLoc_Nm").val(selectedItem.PrjTaskNm);

    });
}

$("#HdrSec2_InpColumnGd").on("click", ".k-grid-evenselect", function () {
    var grid = $("#HdrSec2_InpColumnGd").data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    var prjectKy = selectedItem.PrjKy;
    if (!selectedItem) {
        alert("Please select a grid Row");
        return;
    } 
    var answer = confirm("Are you sure you want to delete from the database?");
    if (answer) {
        $.ajax({
            type: 'POST',
            url: prjTaskDeleteUrl.DeleteUrl,
            dataType: "json",
            data: {
                prjTaskLocky: selectedItem.PrjTaskLocKy,
            },
            success: function (data) {
                alert(data);
                //FirstGridLoadFunction();
                LoadDataToGrid(prjectKy);
                ClearButtonOnlick();
            },
            error: function () {
                alert("Failed! Please try again.");
            }
        });
    }
});



function LoadBankEntry() {

    var columnsDefine = [
            { field: "PrjTaskLocKy", title: "PrjTaskLocKy", width: "50px", hidden: true },
            { field: "PrjKy", title: "PrjKy", width: "100px", hidden: true },
            { field: "PrjTaskLocCd", title: "Loocation Code", width: "100px", hidden: false },
            { field: "PrjTaskLocNm ", title: "Location Name", width: "100px", hidden: false },

            //{

            //    field: "isAct", title: "Is Act",
            //    template: '<input type="checkbox"#= isAct? "checked=checked" : "" # disabled="disabled" ></input>',
            //    width: "40px",

            //},
    ];
    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSourceLoadBankEntry = new kendo.data.DataSource({
        transport: {
            read:
            {
                //data: { BnkCd: BnkCd, BnkNm: BnkNm },
                url: urlBank_BranchEntry.LoadBankEntry,
                dataType: "json",
                data: JSON.stringify({
                    PrjKy: 1,//viewBag.ObjKy,
                }),
            },

            create:
                {

                    url: "",
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    type: "POST",
                    complete: function (e) {
                        alert("Successfully Saved!");

                    }
                },
            parameterMap: function (options, operation) {
                if (operation == "create" && options.models) {
                    return JSON.stringify({ 'list': options.models });
                }

                if (operation == "read") {
                    return ({})

                }

            }

        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "BnkKy",
                fields:
                {
                    PrjTaskLocKy: { editable: false, nullable: false, },
                    PrjKy: { editable: true, nullable: false, },
                    PrjTaskLocCd: { editable: true, nullable: false, },
                    PrjTaskLocNm: { editable: true, nullable: false, type: "boolean", }
                }
            }
        }
    });

    $("#BankGrid").kendoGrid({
        dataSource: dataSourceLoadBankEntry,
        //autobind: true,
        height: 500,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        //toolbar:[{name:"Create", text:"Add new record"},"Save", "Cancel"],
        columnMenu: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: columnsFinal,

        editable: true
    });

}