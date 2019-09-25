function LoadBankDetails(AccKy) {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: UrlBankDetailSelect,// UrlBankDetailSelect,//UrlCreditList, // '@Url.Content("~/ManageAllAccount/CreditsPop")',
                dataType: "json"
            },
            parameterMap: function (options, operation) {

                if (operation == "read") {
                    return ({
                        'AccKy': AccKy,
                    });
                }
            }

        },
        batch: true,
        pageSize: 50,
        schema: {
            model: {
                id: "BankKy",
                fields: {
                    AccAdrKy: { editable: true, nullable: false, type: "number" },
                    AdrKy: { editable: true, nullable: false, type: "number" },
                    BankKy: { editable: true, nullable: false, type: "number" },
                    BankName: { editable: true, nullable: false, type: "string" },
                    BranchKy: { editable: true, nullable: true, type: "number" },
                    BranchNm: { editable: true, nullable: false, type: "string" },
                    AccountNu: { editable: true, nullable: false, type: "number" }
                }
            }
        }
    });
    $("#PopUpBank")
        .kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            selectable: "column",
            pageable: true,
            columns: [
                { field: "AccAdrKy", title: "Account Adress Key", width: "70px", hidden: "true" },
                { field: "AdrKy", title: "AdrKy", width: "70px", hidden: "true" },
                { field: "BankKy", title: "BankKy", width: "70px", hidden: "true" },
                {
                    field: "BankName", title: "Bank Name", width: "70px", width: "150px",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="cmbBankName" name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                dataSource: BanckName(),
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);
                                    var validate = ComboValidations("cmbBankName");

                                    if (validate) {
                                        model.set("BankKy", dataItem.BankKy);
                                        model.set("BankName", dataItem.BankCode);
                                    } else {
                                        model.set("BankKy", 1);
                                        model.set("BankName", "");
                                    }
                                },
                                //when the user gonna add a new record, combo should automatically bind the values from the Filter
                                filter: "startswith",
                                dataValueField: "BankKy",
                                dataTextField: "BankCode",
                            });
                    }
                },
                { field: "BranchKy", title: "BranchKy", width: "70px", hidden: "true" },
                {
                    field: "BranchNm", title: "Branch Name", width: "150px",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="CmbBranchNm" name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                dataSource: BranchName(),
                                //dataSource: {
                                //    type: "POST",
                                //    transport: {
                                //        read: UrlBranchName // '@Url.Content("~/ManageAllAccount/Buxdrop")'
                                //    }
                                //},
                                change: function (e) {

                                    combo = e.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);
                                    var validate = ComboValidations("CmbBranchNm");

                                    if (validate) {
                                        model.set("BranchKy", dataItem.BrachKy);
                                        model.set("BranchNm", dataItem.BrachCode);
                                    } else {
                                        model.set("BranchKy", 1);
                                        model.set("BranchNm", "");
                                    }


                                },
                                //when the user gonna add a new record, combo should automatically bind the values from the Filter
                                filter: "startswith",
                                dataValueField: "BrachKy",
                                dataTextField: "BrachCode",
                            });
                    }
                },
                { field: "AccountNu", title: "AccountNu", width: "70px" },

            ],

            editable: true
        });

//    CheckCount();
}

function CheckToAddBank() {
    var gridlength = $("#PopUpBank").data("kendoGrid").dataSource.data().length;
    if (gridlength != 1) {
        insertbankBranch();
    } else {
        alert("Only one Bank can be assing to one address");
    }

}

//____Bank Code 
function BanckName() {
    // var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: UrlBankName,
                data: {
                    'ObjKy': 1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____branch code 
function BranchName() {
    // var ObjKy = GetObjKy(ObjNm);

    var id = ("#PopUpBank");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var BankKy = selectedItem.BankKy;
    //var BankKy = document.getElementById("HdrSec6_CmbBank_Cd").value;
    //if (!BankKy || BankKy == null) {
    //    BankKy = 1;
    //}
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: UrlBranchName,
                data: {
                    'ObjKy': 1,
                    'BankKy': BankKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function closeBankDetails() {
    //$("#PopUpBankDetails").fadeOut();
    $("#PopUpBankDetails").data("kendoWindow").close();
}
function insertbankBranch() {
    var grid = $("#PopUpBank").data("kendoGrid");
    grid.addRow();

}

function onClose() {
    $("#PopUpBankDetails").fadeIn();
}

function BankDetailsSave() {
    var grid = $("#PopUpBank").data("kendoGrid");
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
    var AccountCode = document.getElementById("BankAccCd").value;
    var AccountName = document.getElementById("BankAccNm").value;
    var AccountKey = document.getElementById("BankAccKy").value;

    //ajax for unsert update and delete
    $.ajax({
        url: UrlBankDetailsInsert,//UrlInsertUpdateAccMass, //"@Url.Content("~/ManageAllAccount/InsertDetail")",
        data: JSON.stringify({
            updateAccmacc: kendo.stringify(updatedRecords),
            newAccmacc: kendo.stringify(newRecords),
            AccountCode: AccountCode,
            AccountName: AccountName,
            AccountKey: AccountKey,


        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {

            if (data == true) {
                alert("Successfully Saved..!");
                grid.destroy();
                grid.wrapper.empty();
                var AccountKey = document.getElementById("BankAccKy").value;
                LoadBankDetails(AccountKey);
                // AccMassColumn();

                //oadGrid();
            } else {
                alert("Record Not Saved");
                grid.destroy();
                grid.wrapper.empty();
                var AccountKey = document.getElementById("BankAccKy").value;
                LoadBankDetails(AccountKey);
                // AccMassColumn();
                //  AccMassColumn();

                //LoadGrid();
            }


        },
        error: function (e) {
            return false;
        }
    });



}
