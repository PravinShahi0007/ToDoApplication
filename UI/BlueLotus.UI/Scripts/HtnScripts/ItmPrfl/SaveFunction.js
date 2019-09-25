function Save() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    var tab = tabstrip.select();

    tabIndx = tab.index();

    function InsertImgtoServer()
    {
        if (typeof FormData == "undefined") {
            var data = [];
            var opmlFile = document.getElementById('files').files[0];
            data.push('opmlFile', document.getElementById('HdrSec1_FileImgLoad_Val').files[0]);
        }
        else {
            var data = new FormData();

            var opmlFile = document.getElementById('HdrSec1_FileImgLoad_Val').files[0];
            data.append("opmlFile", document.getElementById('HdrSec1_FileImgLoad_Val').files[0]);

            //var GridData = $("#Itemgrid").data("kendoGrid");

            // if (GridData.VersionNo != VersionNo && GridData.InsrtDt != InsrtDt) {


            $.ajax({
                type: "POST",
                url: urlInsertFileswithpath, //'@Url.Content("~/ItmPrfl/InsertFileswithpath")',
                data: data,
                dataType: "html",
                contentType: false,
                processData: false,
                enctype: "multipart/form-data",
                success: function (result) {

                    if (result != "false") {
                        //alert("Success");
                    }
                    else {
                        //alert("Image already Exist");
                    }
                }
            })
        }
    }

    if (tabIndx == 0) {

        //var validationMsg = Save_FinalValidation();

        //if (validationMsg.length > 1) {
        //    alert(validationMsg);
        //    return;
        //}

        //var ItmCd = $("#HdrSec1_InptItmCd_Val").val();
        //var ItmNm = $("#HdrSec1_InptItmNm_Val").val();

        //if (ItmCd == null && ItmCd != "") {
        //    if (ItmNm != null && ItmNm != "") {
                //ClearGrid();
                //InsertGrid();
                //InsertImgtoServer();
                //var ItmCd = $("#HdrSec1_InptItmCd_Val").val();
                //var ItmNm = $("#HdrSec1_InptItmNm_Val").val();
                //var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
                //var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
                //var Brand = $("#HdrSec1_CmbBrand_Cd").data('kendoComboBox').value();
                //var Vat = $("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value();

                //var isAlwTrnRateChange;
                //if ($("#HdrSec1_ChkboxAlwTrnRateChange_Val").is(":checked")) {
                //    isAlwTrnRateChange = 1;
                //} else {
                //    isAlwTrnRateChange = 0;
                //}

                //var isAgeVarification;
                //if ($("#HdrSec1_ChkboxAgeVarification_Val").is(":checked")) {
                //    isAgeVarification = 1;
                //} else {
                //    isAgeVarification = 0;
                //}
                //var isAct;
                //if ($("#HdrSec1_ChkboxAct_Val").is(":checked")) {
                //    isAct = 1;
                //} else {
                //    isAct = 0;
                //}

                var grid = $("#Itemgrid").data("kendoGrid");
                //var ItmKy = $("#ItmKy").val();
                //var ItmTypKy = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
                //var ItmTaxCatKy = $("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value();
                //var fileName = $('input[type=file]').val();

                var currentData = grid.dataSource.data();
                var updatedRecords = [];
                var newRecords = [];

                for (var i = 0; i < currentData.length; i++) {
                    if (currentData[i].isNew()) {
                        newRecords.push(currentData[i].toJSON());
                        //var ItmTypKy = currentData[i].ItmTypKy;
                        //var ItmTaxCatKy = currentData[i].ItmTaxCatKy;
                        //var fileName = "Images\\POSImage\\";
                        //updatedRecords.push(currentData[i].toJSON());
                    }
                    else if (currentData[i].dirty) {
                        //this is an existing item
                        updatedRecords.push(currentData[i].toJSON());
                        //var ItmTypKy = currentData[i].ItmTypKy;
                        //var ItmTaxCatKy = currentData[i].ItmTaxCatKy;
                        //var fileName = "Images\\POSImage\\";
                        //newRecords.push(currentData[i].toJSON());
                    } 
                }
                //var tempSAveChech = true;

                if (newRecords.length != 0 || updatedRecords.length != 0) {

                       // if (tempSAveChech) {

                    $.ajax({
                        url: urlInsert, //'@Url.Content("~/ItmPrfl/Insert")',
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify({

                            NewGridDetail: kendo.stringify(newRecords),
                            updateGrid: kendo.stringify(updatedRecords),
                            //ItmTypKy: ItmTypKy,
                            //ItmTaxCatKy: ItmTaxCatKy,
                            //fileName: fileName,
                            //ItmTypKy: ItmTypKy,
                            //UpdatedGridDetail: kendo.stringify(updatedRecords),
                            //ItmCd: ItmCd,
                            //ItmNm: ItmEAN,
                            //PartNo: ItmEAN,
                            //Vat: Vat,
                            //Make: Brand,
                            //SimilarNm: SimilarNm,
                            //ReOrdLvl: ReOrdLvl,
                            //ItmCat7: Cat,
                            //ItmCat8: Dept,
                            //ReOrdQty: ReOrdQty,
                            //TrnRat: TrnRat,
                            //BuyRat: BuyRat,
                            //OrdUnt: OrdUnt,
                            //SelUnt: SelUnt,

                        }),

                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {

                            if (data == true) {

                                alert("Saved Successfully");
                                //ItmKy = data;
                                //$("#ItmKy").val(ItmKy);

                                //InsertEAN();

                                LoadItemGridView(ItmTypKy);
                            } else {
                                alert("Record Not Saved");

                                LoadItemGridView(ItmTypKy); // update grid
                            }
                        },
                        error: function (e) {
                            return false;
                        }



                    });


                }
                else {
                    $.ajax({
                        url: urlUpdate, // '@Url.Content("~/ItmPrfl/Update")',
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify({

                            NewGridDetail: kendo.stringify(newRecords),
                            updateGrid: kendo.stringify(updatedRecords),
                            //ItmTypKy: ItmTypKy,
                            //ItmTaxCatKy: ItmTaxCatKy,
                            //fileName: fileName,
                        }),

                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data == true) {
                                alert("Saved Successfully");
                                //LoadItem();
                                //SelectEAN();

                                //UpdateEAN();
                            } else {
                                alert("Record Not Updated");
                                LoadItemGridView(ItmTypKy); // update grid
                            }
                        },
                        error: function (e) {
                            return false;
                        }

                    });
                }
                //LoadItemGridView(ItmTypKy);
                //Disable();

        //    }
        //    else
        //    {
        //        alert("Please enter Item Name");
        //    }

        //}
        //else {
        //    alert("Please enter Item Code");
        //}
    }

    else if (tabIndx == 1) {
        ComSaveFunction();
    }

    else if (tabIndx == 5) {
        SaveMultiUnitDet();
    }

    else if (tabIndx == 2) {

        var grid = $("#ItmSettingsgrid").data("kendoGrid");
        var ItmKy = $("#ItmKy").val();
        var currentData = grid.dataSource.data();
        var updatedRecords = [];
        var newRecords = [];

        for (var i = 0; i < currentData.length; i++) {
            //if (currentData[i].ItmCdKy > 1) {
            //    //this is an existing item
            //    updatedRecords.push(currentData[i].toJSON());
            //    //newRecords.push(currentData[i].toJSON());
            //} else {
            //    newRecords.push(currentData[i].toJSON());
            //    //updatedRecords.push(currentData[i].toJSON());
            //}
            if (currentData[i].dirty) {
                newRecords.push(currentData[i].toJSON());
            }
            //} else if (currentData[i].dirty) {
            //updatedRecords.push(currentData[i].toJSON());
            //}
        }

        if (newRecords.length != 0) {

            $.ajax({
                url: urlInsertItmSettings, // '@Url.Content("~/ItmMasCd/InsertItmSettings")',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({

                    NewGridDetail: kendo.stringify(newRecords),
                    //updateGrid: kendo.stringify(updatedRecords),
                    ItmKy: ItmKy,
                    ControlConKy: ControlConKy,
                    ObjKy: viewBag.ObjKy,
                }),

                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    if (data == true) {
                        alert("Successfully Saved");
                        LoadItmSettingsGrid();
                        //LoadItemGridView(ItmTypKy);
                    } else {
                        alert("Record Not Saved");

                        LoadItmSettingsGrid(); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }

            });


        }

        //else if (updatedRecords.length != 0) {
        //    $.ajax({
        //        url: urlUpdateItmSettings, // '@Url.Content("~/ItmMasCd/UpdateItmSettings")',
        //        dataType: "json",
        //        type: "POST",
        //        data: JSON.stringify({

        //            NewGridDetail: kendo.stringify(newRecords),
        //            updateGrid: kendo.stringify(updatedRecords),
        //            ItmKy: ItmKy,
        //            ControlConKy: ControlConKy,
        //            ObjKy: viewBag.ObjKy,
        //        }),

        //        contentType: 'application/json; charset=utf-8',
        //        success: function (data) {
        //            if (data == true) {
        //                alert("Successfully Updated");
        //                LoadItmSettingsGrid();
        //            } else {
        //                alert("Record Not Updated");
        //                LoadItmSettingsGrid(); // update grid
        //            }
        //        },
        //        error: function (e) {
        //            return false;
        //        }

        //    });
        //}
    }

    else if (tabIndx == 3) {

        var ItmKy = $("#ItmKy").val();
        ItmTypKy: $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
        var grid = $("#Pricegrid").data("kendoGrid");

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
                    url: urlUpdatePriceRevision, // '@Url.Content("~/ItmPrfl/UpdatePriceRevision")',
                    data: JSON.stringify({
                        updateGrid: kendo.stringify(updatedRecords),
                        newGrid: kendo.stringify(newRecords),
                        ControlConKy: ConrlConKy,
                        ItmKy: ItmKy,
                        ObjKy: viewBag.ObjKy,
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {

                        if (data == true) {
                            alert("Successfully Saved..!");
                            LoadPriceGrid(); // update grid
                        } else {
                            alert("Record Not Saved");
                            LoadPriceGrid(); // update grid
                        }
                    },
                    error: function (e) {
                        return false;
                    }
                });
            }
        }
    }


}

function Post() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    
    $.ajax({
        url: urlUpdatePost, // '@Url.Content("~/ItmPrfl/Update")',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
         
        }),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == true) {
                alert("Saved Successfully");
               
            } else {
                alert("Record Not Updated");
               
            }
        },
        error: function (e) {
            return false;
        }

    });

}

function SelectEAN() {
    var ItmKy = $("#ItmKy").val();
    if (ItmKy > 1) {
        $.ajax({
            url: urlSelectEAN, // '@Url.Action("SelectEAN", "ItmPrfl")',
            dataType: "Json",
            type: "POST",
            data: JSON.stringify({
                ItmKy: ItmKy,

            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                ItmEANKy = data[0].ItmEANKy;
            }
        });

    }
}

function InsertEAN() {
    var ItmEAN = $("#HdrSec1_InptItmEAN_Val").val();
    var ItmKy = $("#ItmKy").val();

    if (ItmKy > 1) {
        $.ajax({
            url: urlInsertEAN, // '@Url.Action("InsertEAN", "ItmPrfl")',
            dataType: "Json",
            type: "POST",
            data: JSON.stringify({
                EAN: ItmEAN,
                ItmKy: ItmKy,
                ObjKy: viewBag.ObjKy,

            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data == true) {

                    alert("Inserted Successfully");
                    LoadItemGridView(ItmTypKy);
                } else {
                    alert("Record Not Saved");
                    LoadItemGridView(ItmTypKy); // update grid
                }

            }
        });
    }
}

function UpdateEAN() {
    var ItmEAN = $("#HdrSec1_InptItmEAN_Val").val();
    var ItmKy = $("#ItmKy").val();
    if (ItmKy > 1) {
        $.ajax({
            url: urlUpdateEAN, // '@Url.Action("UpdateEAN", "ItmPrfl")',
            dataType: "Json",
            type: "POST",
            data: JSON.stringify({
                EAN: ItmEAN,
                ItmKy: ItmKy,
                ItmEANKy: ItmEANKy,
                ObjKy: viewBag.ObjKy,

            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data == true) {

                    alert("Updated Successfully");
                    LoadItemGridView(ItmTypKy);

                } else {
                    alert("Record Not Updated");
                    LoadItemGridView(ItmTypKy); // update grid
                }

            }
        });
    }
}
function Save_FinalValidation() {

    //  HdrSec2_CmbAcc_Cd
    //  HdrSec2_CmbContractAcc_Cd

    if (!Save_ComboValidation('HdrSec1_CmbDept_Cd'))
        return "Select Department ..!";

    if (!Save_ComboValidation('HdrSec1_CmbCat_Cd'))
        return "Select Category ..!";

    if (!Save_ComboValidation('HdrSec1_CmbTyp_Cd'))
        return "Select Item Type ..!";

    if (!Save_ComboValidation('HdrSec1_CmbVat_Cd'))
        return "Select Vat% ..!";

    if (!Save_ComboValidation('HdrSec1_CmbBaseUnit_Cd'))
        return "Select Base Unit ..!";

    return "";
}


function Save_ComboValidation(ObjNm) {

    var cmbVal = $("#" + ObjNm).data('kendoComboBox').value();

    if (cmbVal == 0 || cmbVal == null || cmbVal == 1)
        return false;
    else
        return true;
}

//@*function SaveNew() {
//    InsertGrid();

//    var grid = $("#Itemgrid").data("kendoGrid");

//    var currentData = grid.dataSource.data();
//    var selectItem = grid.dataItem(grid.select());
//    var updatedRecords = [];
//    var newRecords = [];

//    for (var i = 0; i < currentData.length; i++) {
//        if (currentData[i].ItmKy == null || currentData[i].ItmKy == 0) {
//            //this record is new
//            newRecords.push(currentData[i].toJSON());
//        } else {
//            updatedRecords.push(currentData[i].toJSON());
//        }
//    }
//    var tempSAveChech = true;

//    if (newRecords.length != 0) {

//        if (tempSAveChech) {

//            $.ajax({
//                url: '@Url.Content("~/ItmPrfl/Insert")',
//                dataType: "json",
//                type: "POST",
//                data: JSON.stringify({

//                    NewGridDetail: kendo.stringify(newRecords),
//                    updateGrid: kendo.stringify(updatedRecords),
//                    ItmTypKy: ItmTypKy,


//                }),

//                contentType: 'application/json; charset=utf-8',
//                success: function (data) {
//                    if (data == true) {

//                        alert("Saved Successfully");
//                        LoadItemGridView(ItmTypKy);
//                    } else {
//                        alert("Record Not Saved");
//                        LoadItemGridView(ItmTypKy); // update grid
//                    }
//                },
//                error: function (e) {
//                    return false;
//                }



//            });
//        }

//        //LoadItemGridView(ItmTypKy);
//    }
//    else if (updatedRecords.length != 0) {
//        $.ajax({
//            url: '@Url.Content("~/ItmPrfl/Update")',
//            dataType: "json",
//            type: "POST",
//            data: JSON.stringify({

//                NewGridDetail: kendo.stringify(newRecords),
//                updateGrid: kendo.stringify(updatedRecords),
//                ItmTypKy: ItmTypKy,
//            }),

//            contentType: 'application/json; charset=utf-8',
//            success: function (data) {
//                if (data == true) {

//                    alert("Updated Successfully");
//                    LoadItemGridView(ItmTypKy);
//                } else {
//                    alert("Record Not Updated");
//                    LoadItemGridView(ItmTypKy); // update grid
//                }
//            },
//            error: function (e) {
//                return false;
//            }

//        });
//        Edit();
//    }
//}*@
