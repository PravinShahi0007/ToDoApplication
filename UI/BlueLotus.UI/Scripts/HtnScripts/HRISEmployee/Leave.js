
function LoadLeaveGrid(empky)
{
    if (empky > 1) {
        EmpKy = empky
    }

    var columns = [

        {
            field: "LeaveType",
            title: "Leave Type",
            width: "30px",
            //editor: function (container, options) {
            //    var model = options.model;
            //}
        },
         {
             field: "EmpKy", title: "EmpKy", width: "10px", hidden: true
         },
        {
            field: "LevTypKy",
            title: "LeaveType Ky",
            hidden: true,
        },

        {
                field: "Elagible",
                title: "Entitle Days",
                width: "30px",
        },
        {
            field: "LevDays",
            title: "Taken",
            width: "30px",
            //editor: function (container, options) {
            //    var model = options.model;
            //}
        },
        {
                field: "Balance",
                title: "Balance",
                width: "30px",
         },

    ];

    var gridNo = 2;
    var FinalShiftSettingsColumn = setColumnProp(columns, viewBag.ObjKy, '', 'LeaveGrid', gridNo);

}

function LoadGridWithColumnPropTwo(columnsFinal, gridNo)
{
    
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlLeaveBal_SelectWeb,
                    dataType: "json"
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({

                            'EmpKy': EmpKy,
                            'OurCd': viewBag.OurCd,
                        });
                    }
                }
            },

            batch: true,
            pageSize: 8,
            schema: {
                model: {
                    id: "EmpKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        Balance: { editable: false, nullable: false, type: "number" },
                        Elagible: { editable: false, nullable: false, type: "number" },
                        EmpKy: { editable: false, nullable: false, type: "number" },
                        LeaveType: { editable: false, nullable: false, type: "string" },
                        LevTypKy: { editable: false, nullable: false, type: "number" },
                        LevDays: { editable: false, nullable: false, type: "number" },
                    }
                }
            },
        });

        $("#LeaveGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            scrollable: true,
            reorderable: true,
            pageable: true,
            height: 200,
            width:200,
            columns: columnsFinal,
            selectable: "row",
            resizable: true,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columnMenu: true,
            //filterable: {
            //    mode: "row"
            //},
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },


            editable: true

        });
    
}