function TodoGridDefaultColumns() {
    var columnsDefine = [
    {
        field: "LiNo",
        title: "LiNo",
        width: "100px",
       // hidden: "true",
        editor: function (container, options) {
            var model = options.model;
        }

    },
        {
            field: "ItmTrnKy",
            title: "ItmTrnKy",
            width: "100px",
            //hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "PrjKy",
            title: "PrjKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "ResLeadKy",
            title: "LeadAddressKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "ResLeadID",
            title: "Lead Address ID",
            width: "40px",
            hidden: "true",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ResLeadNm",
            title: "Lead Address Name",
            hidden: "true",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },

        {
            field: "SubconAdrKy",
            title: "SubconAdrKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "SubconAccCd",
            title: "SubCon Code",
            width: "100px",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "SubconAccNm",
            title: "SubCon Name",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "TaskKy",
            title: "TaskKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "TaskID",
            title: "Task ID",
            width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "TaskNm",
            title: "Task Nm",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "TaskUnitKy",
            title: "TaskUnit Ky",
            width: "120px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TaskUnit",
            title: "Task Unit",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TskLockKy",
            title: "TskLockKy",
            width: "120px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TskLockCd",
            title: "TskLockCd",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
         {
             field: "TaskQty",
             title: "TaskQty",
             width: "120px",
             editor: function (container, options) {
                 var model = options.model;
             }
         },
        {
            field: "Description",
            title: "Description",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        { command: { text: "View Details", click: showDetails }, title: " ", width: "180px" }
        //{
        //    field: "ResKy",
        //    title: "ResKy",
        //    width: "150px",
        //    hidden: "true",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        //{
        //    field: "ResID",
        //    title: "ResID",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        //{
        //    field: "ResNm",
        //    title: "ResNm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        //{
        //    field: "ResQty",
        //    title: "ResQty",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }

        //},
        //{
        //    field: "ResUnitKy",
        //    title: "ResUnitKy",
        //    width: "100px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        // {
        //     field: "ResUnit",
        //     title: "ResUnit",
        //     width: "100px",
        //     editor: function (container, options) {
        //         var model = options.model;
        //     }
        // },
    ];

    function showDetails(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        PopUpFormGlblData.ItmTrnKy = dataItem.ItmTrnKy;
        PopUpFormGlblData.Taskky = dataItem.TaskKy;
        $('#HdrSec1_ResPopAdr_Cd').val(dataItem.SubconAccCd);
        $('#HdrSec1_ResPopAdr_Nm').val(dataItem.SubconAccNm);
        $('#HdrSec1_TaskPop_Cd').val(dataItem.TaskID);
        $('#HdrSec1_TaskPop_Nm').val(dataItem.TaskNm);
        e.preventDefault();
        AddResources();
    }
    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, 113540, '', 'FormGrd', gridNo);
}


function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,

        pageSize: 10,
        schema: {
            model: {
                id: "ItmTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: true, nullable: false, type: "number" },
                    ItmTrnKy: { editable: true, nullable: false, type: "number" },
                    PrjKy: { editable: false, nullable: false, type: "number" },
                    ResLeadKy: { editable: false, nullable: false, type: "number" },
                    ResLeadID: { editable: true, nullable: false, type: "string" },
                    ResLeadNm: { editable: true, nullable: false, type: "string" },
                    SubconAdrKy: { editable: false, nullable: false, type: "number" },
                    SubconAccCd: { editable: true, nullable: false, type: "string" },
                    SubconAccNm: { editable: true, nullable: false, type: "string" },
                    TaskKy: { editable: true, nullable: false, type: "number" },
                    TaskID: { editable: true, nullable: false, type: "string" },
                    TaskNm: { editable: true, nullable: true, type: "string" },
                    TaskUnitKy: { editable: true, nullable: true, type: "number" },
                    TaskUnit: { editable: true, nullable: false, type: "string" },
                    TaskQty: { editable: true, nullable: false, type: "number" },
                    TskLockKy: { editable: true, nullable: false, type: "number" },
                    TskLockCd: { editable: true, nullable: false, type: "string" },
                    //ResNm: { editable: true, nullable: false, type: "string" },
                    //ResQty: { editable: true, nullable: false, type: "number" },
                    //ResUnitKy: { editable: true, nullable: false, type: "number" },
                    //ResUnit: { editable: true, nullable: false, type: "string" },
                    Description: { editable: true, nullable: false, type: "string" },
                }
            }
        }
    });

    $("#DailyProgress")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            //editable: true,   //commented to fix cell onclick text dissaper issue               
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}


//function addNewRowToGrid() {
//    var PrjKy = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
//    if (!PrjKy || PrjKy == "") {
//        PrjKy = 1;
//    }
//    var HdrLeadAdrKy = $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value();
//    if (!HdrLeadAdrKy || HdrLeadAdrKy == "") {
//        HdrLeadAdrKy = 1;
//    }
//    var HdrLeadId = $("#HdrSec1_Adrky_Cd").data("kendoComboBox").text();
//    var HdrLeadNm = $("#HdrSec1_Adrky_Nm").data("kendoComboBox").text();
//    var SubconAdrKy = $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value();
//    if (!SubconAdrKy || SubconAdrKy == "") {
//        SubconAdrKy = 1;
//    }
//    var SubconAccCd = $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").text();
//    var SubconAccNm = $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox").text();
//    var TaskKy = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value();
//    if (!TaskKy || TaskKy == "") {
//        TaskKy = 1;
//    }
//    var TaskId = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").text();
//    var TaskNm = $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").text();
//    //   var UnitKy = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").text();
//    var Unit = document.getElementById("HdrSec1_CmbUnit_Val").value;
//    var Description = document.getElementById("HdrSec1_InptDesc_Val").value;

//    var Qty = $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value();


//    var grid = $("#DailyProgress").data("kendoGrid");
//    if (grid == undefined)
//        return;
//    var dataSource1 = grid.dataSource;
//    var total = dataSource1.data().length;

//    grid.dataSource.insert(
//        total,
//        {
//            PrjKy: PrjKy,
//            ResLeadKy: HdrLeadAdrKy,
//            ResLeadID: HdrLeadId,
//            ResLeadNm: HdrLeadNm,
//            SubconAdrKy: SubconAdrKy,
//            SubconAccCd: SubconAccCd,
//            SubconAccNm: SubconAccNm,
//            TaskKy: TaskKy,
//            TaskID: TaskId,
//            TaskNm: TaskNm,
//            TaskUnitKy: '1',
//            TaskUnit: Unit,
//            TaskQty: Qty,
//            Description: Description,


//        }
//    );



//}

$("#HdrSec1_NmricQty_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        //  addNewRowToGrid();

        if (FormGlblData.itmTrnKy > 1) {
            updateProject();
        }
        else {
            Save();
        }
        

    }

})

function AddResources() {
    try {
        $("#AddResource").data("kendoGrid").dataSource.filter(null);
        $("#AddResource").data("kendoGrid").dataSource.data([]);
    } catch (e) {

    }
    $("#AddResource")
        .show()
        .kendoWindow({
            width: "80%",
            height: "75%",
            modal: true,
            title: "Add Resource"
        });
    DetaillDefaultColumns();
    $("#AddResource").data("kendoWindow").center().open();

}