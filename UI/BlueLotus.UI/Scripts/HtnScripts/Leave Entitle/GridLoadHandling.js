var EmpKy = 1;

function AfterFindEmp(empKy) {
    $("#EmpNo").data("kendoComboBox").value(empKy);
    $("#EmpNm").data("kendoComboBox").value(empKy);
    EmpKy = empKy;
    LoadLeaveEntitleGrid(empKy);
}

function LoadLeaveEntitleGrid(empKy) {
    if (empKy > 1)
        EmpKy = empKy;
    var Column = [

        {
            field: "LiNo", title: "LiNo", width: "10px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },

                {
                    field: "EmpKy", title: "EmpKy", width: "10px", hidden: true,
                    editor: function (container, options) {
                        var model = options.model;
                    }
                },

                          {
                              field: "EmpNo", title: "EmpNo", width: "10px", hidden: true,
                              editor: function (container, options) {
                                  var model = options.model;
                              }
                          },
            {
                field: "EmpNm", title: "Employee Name", width: "10px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "LeaveType", title: "LeaveType", width: "10px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "LevTypKy", title: "LevTypKy", width: "10px", hidden: true
            },
             {
                 field: "LevTrnKy", title: "LevTrnKy", width: "10px", hidden: true
             },
            //{
            //    field: "RequestD", title: "Request Date", width: "10px",
            //},
            //hidden: true,
        {
            field: " FromD", title: " FromDt", width: "80px", format: "{0:dd/MM/yyyy}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
             {
                 field: "ToD", title: "ToDt", width: "10px", format: "{0:dd/MM/yyyy}",
                 editor: function (container, options) {
                     
                     var model = options.model;
                 }
             },
            {
                field: "LevDays", title: "EntitlesDays", width: "10px",
                aggregates: ["sum"], footerTemplate: "Total: #=sum# ",
                //editor: function (container, options) {
                //    var model = options.model;
                //}
            },
            {
                field: "is1stHfDy ", title: "IsFirst HalfDay", width: "90px", hidden: true
            },
             {
                 field: " is2ndHfDy", title: "IsSecond HalfDay", width: "90px", hidden: true
             },
             {
                 field: " isAct", title: "isAct", width: "90px", hidden: true
             },
             { command: { text: "X", click: GridDeleteButtonIsClicked }, title: " ", width: "60px" },
             //
    ];
    //aggregate: [
    //   { field: "LevDays", aggregate: "sum" },
       
    //]

    var gridNo = 1;
    var FinalShiftSettingsColumn = setColumnProp(Column, viewBag.ObjKy, '', 'GridLeaveEntitle', gridNo);
}

    function LoadGridWithColumnProp(columnsFinal, gridNo) {
        if (gridNo == 1) {
            try {
                $('#GridLeaveEntitle').data().kendoGrid.destroy();
                $('#GridLeaveEntitle').empty();
            } catch (e) { }

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: urlEmpMas.LevTrn_SelectWeb,
                        dataType: "json"
                    },
                    //update: {
                    //    contentType: 'application/json; charset=utf-8',
                    //    dataType: "json",
                    //    type: "POST",
                    //    complete: function (e) {

                    //        var grid = $("#gridAdd").data("kendoGrid");
                    //        grid.dataSource.read();
                    //    }
                    //},
                    //destroy: {

                    //    contentType: 'application/json; charset=utf-8',
                    //    dataType: "json",
                    //    type: "POST",
                    //    data: { isAct: 0 },
                    //    complete: function (e) {
                    //        var grid = $("#gridAdd").data("kendoGrid");
                    //        grid.dataSource.read();
                    //    }
                    //},
                    //create: {

                    //    contentType: 'application/json; charset=utf-8',
                    //    dataType: "json",
                    //    type: "POST",
                    //    complete: function (e) {
                    //        alert("Saved successfully..!");
                    //        var grid = $("#gridAdd").data("kendoGrid");
                    //        grid.dataSource.read();
                    //    }
                    //},
                    parameterMap: function (options, operation) {
                        //if (operation == "create" && options.models) {
                        //    return JSON.stringify({ 'todos': options.models });
                        //}
                        //if (operation == "update" && options.models) {
                        //    return JSON.stringify({ 'todos': options.models });

                        //}
                        //if (operation == "destroy" && options.models) {
                        //    return JSON.stringify({ 'todos': options.models });

                        //}
                        if (operation == "read") {
                            return ({

                                'EmpKy': EmpKy,
                                'OurCd': viewBag.OurCd,
                            });
                        }
                    }
                },
                batch: true,
                pageSize: 20,

                schema: {
                    model: {
                        id: "LevTrnKy",
                        fields: //Relavent fields of the grid should be bind with following model items
                        {
                            EmpKy: { editable: true, nullable: false, type: "number" },
                            //CdKy: { editable: true, nullable: false, type: "number" },
                            EmpNo: { editable: true, nullable: false, type: "number" },
                            EmpNm: { editable: true, nullable: false, type: "string" },
                            LeaveType: { editable: true, nullable: false, type: "string" },
                            LevTypKy: { editable: true, nullable: false, type: "number" },
                            LevTrnKy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                            FromD: { editable: true, nullable: false, type: "date" },
                            ToD: { editable: true, nullable: false, type: "date" },
                            EftDtm: { editable: true, nullable: false, type: "date" },
                            //CdNm: { editable: true, nullable: false, type: "string" },
                            //Amt: { editable: true, nullable: false, type: "number" },
                            LiNo: { editable: true, nullable: false, type: "number" },
                            is1stHfDy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                            is2ndHfDy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                            isAct: { editable: true, nullable: false, type: "number"},
                        },
                        
                    },
                //    aggregate: [
                //{ field: "LevDays", aggregate: "sum" },

                //    ]
                },
                aggregate: [
                { field: "LevDays", aggregate: "sum" },

                ]
            });


            $("#GridLeaveEntitle").kendoGrid({
                dataSource: dataSource,
                autobind: true,
                resizable: true,
                navigatable: true,
                sortable: true,
                reorderable: true,
                Scrollable: true,

                columns: columnsFinal,
                selectable: "row",
                pageable: {
                    refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
                },
                columnMenu: true,
                filterable:true,
                //filterable: {   
                //    mode: "row"
                //},


                dataBinding: function () {
                    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
                },
                //dataBound: GridOnDataBound,

                editable: false
            });
        }
    }
