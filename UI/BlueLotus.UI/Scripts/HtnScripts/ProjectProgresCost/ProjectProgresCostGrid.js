function GridDefaultColumns() {
    var columnsDefine = [
    {
        field: "LiNo",
        title: "LiNo",
        width: "100px",
        hidden: "true",
        editor: function (container, options) {
            var model = options.model;
        }

    },
        {
            field: "ItmTrnKy",
            title: "ItmTrnKy",
            width: "100px",
            hidden: "true",
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
            width: "110px",
            //hidden: "true",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
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
            field: "CumCost",
            title: "Cumulative Cost",
            width:"120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },

        {
            field: "CumPct",
            title: "Cumulative Persentage",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "CostAmt",
            title:"Cost Amount",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "StatusKy",
            title: "Status",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
          {
              field: "ReasonKy",
              title: "Reason",
              width: "100px",
              hidden: "true",
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
        //{ command: { text: "View Details", click: showDetails }, title: " ", width: "180px" }
        
    ];

    //function showDetails(e) {
    //    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    //    PopUpFormGlblData.ItmTrnKy = dataItem.ItmTrnKy;
    //    PopUpFormGlblData.Taskky = dataItem.TaskKy;
    //    $('#HdrSec1_ResPopAdr_Cd').val(dataItem.SubconAccCd);
    //    $('#HdrSec1_ResPopAdr_Nm').val(dataItem.SubconAccNm);
    //    $('#HdrSec1_TaskPop_Cd').val(dataItem.TaskID);
    //    $('#HdrSec1_TaskPop_Nm').val(dataItem.TaskNm);
    //    e.preventDefault();
    //    AddResources();
    //}
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
                    
                    SubconAdrKy: { editable: false, nullable: false, type: "number" },
                    SubconAccCd: { editable: true, nullable: false, type: "string" },
                    
                    TaskKy: { editable: true, nullable: false, type: "number" },
                    TaskID: { editable: true, nullable: false, type: "string" },
                    
                    TaskUnitKy: { editable: true, nullable: true, type: "number" },
                    TaskUnit: { editable: true, nullable: false, type: "string" },

                    TaskQty: { editable: true, nullable: false, type: "number" },

                    TskLockKy: { editable: true, nullable: false, type: "number" },
                    TskLockCd: { editable: true, nullable: false, type: "string" },

                    CumCost: { editable: true, nullable: false, type: "number" },
                    CumPct: { editable: true, nullable: false, type: "number" },
                    CostAmt: { editable: true, nullable: false, type: "number" },
                    StatusKy: { editable: true, nullable: false, type: "number" },
                    ReasonKy: { editable: true, nullable: false, type: "number" },
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

function Save() {
    if (ValidateEntry()) {
        var Date = $("#HdrSec1_DatPicDate_Val").val();
        var LeadAdrKy = $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value();
        if (LeadAdrKy == undefined || LeadAdrKy == null || LeadAdrKy == '') {
            LeadAdrKy = 1;
        }
        var PrjKy = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
        if (PrjKy == undefined || PrjKy == null || PrjKy == '') {
            PrjKy = 1;
        }
        var Tsk = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value();
        if (Tsk == undefined || Tsk == null || Tsk == '') {
            Tsk = 1;
        }

        var strKy = $("#HdrSec1_CmbStatus_Cd").data("kendoComboBox").value();
        if (strKy == undefined || strKy == null || strKy == '') {
            strKy = 1;
        }

        var Resky = $("#HdrSec1_CmbReason_Cd").data("kendoComboBox").value();
        if (Resky == undefined || Resky == null || Resky == '') {
            Resky = 1;
        }
      

        try {
            var AccKy = $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value();
            if (AccKy == undefined || AccKy == null || AccKy == '') {
                AccKy = 1;
            }
        } catch (e) {
            AccKy = 1;

        }

        var Des = $("#HdrSec1_InptDesc_Val").val();

        var Qty = $("#HdrSec1_NmricQty_Val").val();
        var CumCost = $("#HdrSec1_InpCumCost_Val").val();
        var CumPur = $("#HdrSec1_InpCumPct_Val").val();
        var CostAm = $("#HdrSec1_InpCostAm_Val").val();


        var OrdKySelect = FormGlblData.TrnKy;
        var OrdTypKySelect = FormGlblData.TrnTypKy;
        var OrdNoSelect = FormGlblData.TrnNo;
        var UniKy = selectedTrnUnitKy;

        var OurCd = viewBag.OurCd;
        var ConCd = "TrnTyp";
        var DocNo = $("#HdrSec1_InpDocNo_Val").val();
        StartSavingFunction(Date,
            LeadAdrKy,
            PrjKy,
            Tsk,
            AccKy,
            Des,
            UniKy,
            Qty,
            OrdKySelect,
            OrdTypKySelect,
            OrdNoSelect,
            strKy,
            Resky,
            CumCost,
            CumPur,
            CostAm,
            DocNo);
    }
}