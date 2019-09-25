
    $(document).ready(function () {

        NewBOQ();

        $("#resrcAll").click(function () {
            $("#tGridBOQDetails_SelectWeb").data('kendoGrid').refresh();
        })

        $("#boqHdrNew").click(function () {
            NewBOQ();
        })
        $("#boqClose").click(function () {
            NewBOQ();
        })
        $("#boqRefresh").click(function () {
            NewBOQ();
        })
        $("#boqHdrSave").click(function () {
            var grid = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
            var date = $("#date").val();
            var billNo = $("#billNo").val();
            var boqno = $("#boqNo").val();
            var currentData = grid.dataSource.data();
            var hasRows = 1;
            if (date == "" && billNo == "") {
                alert("Please enter the Date and Bill No");
            }
            else {
                isExistingBillNo();
            }
        })

        $("#boqHdrNewAndSave").click(function () {
            var grid = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
            var date = $("#date").val();
            var billNo = $("#billNo").val();
            var boqno = $("#boqNo").val();
            var currentData = grid.dataSource.data();
            var hasRows = 1;
            if (date == "" && billNo == "") {
                alert("Please enter the Date and Bill No");
            }
            else {
                isExistingBillNo();
                NewBOQ();
            }
        })
       
    })
    var globalBOQKy = -1;
    var globalBOQTypKy; // = 452;
    $(document).ready(function () {
        $("#tabs").tabs();
        $.holdReady(true);
        $.ajax({
            type: "GET",
            url: urlGetTypKy,
            dataType: "json",
            data: { OurCd: "boq" },
            async: false,
            success: function (globalTypKy) {
                globalBOQTypKy = globalTypKy;
                //alert("GlobalTypKy (BOQ) : " + globalTypKy);
                $.holdReady(false);
            }
        });
    });
    function fillBOQDetailGrid()
    {
        var BOQNo = $("#boqNo").val();

    }



function NewBOQ() {
        
    var grid = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
    globalBOQKy = -1;
    /// Header level Clear
    $("#boqNo").val("");
    $("#date").data("kendoDatePicker").value("");
    $("#billNo").val("");
    $('#isApproved').prop('checked', false);
    $('#isContractBOQ').prop('checked', false);
    $("#billNo").prop("readonly", false);
    $("#billNo").prop('disabled', false);
    $("#yourRef").val("");
    $("#boqTitle").val("");
    $("#BnkODIntrPer").val("0.00");
    $("#clientCmb").data("kendoComboBox").value(1);
    $("#locationCmb").data("kendoComboBox").value(1);
    $("#advancePer").val("0.00");
    $("#advanceRecPer").val("0.00");
    $("#currencyCmb").data("kendoComboBox").value(1);
    $("#offlineApprovelCmb").data("kendoComboBox").value(1);
    $("#exchngRate").val("0.00");
    $("#retention").val("0.00");
    $("#maxRetention").val("0.00");
    $("#retnPerDays").val("0.00");
    $("#guarantee").val("");
    $("#expryDt").data("kendoDatePicker").value("");
    $("#payLagDys").val("0.00");
    $("#bankODIntst").val("0.00");
    $("#adressNameCmb").data("kendoComboBox").value(1);
    $("#heldDtAndTm").data("kendoDatePicker").value("");
    $("#Des").val("");
    $("#Rem").val("");

    /// Detail Level Clear
    $('#tGridBOQDetails_SelectWeb').data().kendoGrid.destroy();
    $('#tGridBOQDetails_SelectWeb').empty();
    loadBOQDetailsByBOQKy(1);
}
function setToZero()
{
    var advancePer=$("#advancePer").val();
    var advanceRecPer = $("#advanceRecPer").val();
    var exchngRate=$("#exchngRate").val();
    var retention=$("#retention").val();
    var maxRetention=$("#maxRetention").val();
    var retnPerDays = $("#retnPerDays").val();
    var payLagDys = $("#payLagDys").val();
    var BnkODIntrPer = $("#BnkODIntrPer").val();
    
    if (parseFloat(advancePer)<=0.00 || advancePer=="")
        var advancePerVal = $("#advancePer").val("0.00");
    if (parseFloat(advanceRecPer) <= 0.00 || advanceRecPer == "")
        var advanceRecPerVal = $("#advanceRecPer").val("0.00");
    if (parseFloat(exchngRate) <= 0.00 || exchngRate == "")
        var exchngRateVal = $("#exchngRate").val("0.00");
    if (parseFloat(retention) <= 0.00 || retention == "")
        var retentionVal = $("#retention").val("0.00");
    if (parseFloat(maxRetention) <= 0.00 || maxRetention == "")
        var maxRetentionVal = $("#maxRetention").val("0.00");
    if (parseFloat(retnPerDays) <= 0.00 || retnPerDays == "")
        var retnPerDaysVal = $("#retnPerDays").val("0.00");
    if (parseFloat(payLagDys) <= 0.00 || payLagDys == "")
        var payLagDysVal = $("#payLagDys").val("0.00");
    if (parseFloat(BnkODIntrPer) <= 0.00 || BnkODIntrPer == "")
        var BnkODIntrPerVal = $("#BnkODIntrPer").val("0.00");
}


function SaveBOQ(isItemKyChanged) {
    setToZero();
    var locAdrKy = ($("#locationCmb").val()) ? $("#locationCmb").data("kendoComboBox").value() : 1;
    var adrKy = ($("#adressNameCmb").val()) ? $("#adressNameCmb").data("kendoComboBox").value() : 1;
    var locKy = ($("#locationCmb").val()) ? $("#locationCmb").data("kendoComboBox").value() : 1;
    var crnKy = ($("#currencyCmb").val()) ? $("#currencyCmb").data("kendoComboBox").value() : 1;
    var adrKy = ($("#clientCmb").val()) ? $("#clientCmb").data("kendoComboBox").value() : 1;
    var OffLineAprAdrKy = ($("#offlineApprovelCmb").val()) ? $("#offlineApprovelCmb").data("kendoComboBox").value() : 1;
    var chckisApproved = 0;
    var chckisContractBOQ = 0;
    if ($('#isApproved').is(':checked')) 
    {
        chckisApproved = 1;
    }
    else
    {
        chckisApproved = 0;
    }
    if ($('#isContractBOQ').is(':checked')) {
        chckisContractBOQ = 1;
    }
    else {
        chckisContractBOQ = 0;
    }

    //Harsha
    var headerData = "[{ \"BOQKy\":\"" + globalBOQKy +
        "\",\"BOQTypKy\":\"" + globalBOQTypKy +
        "\",\"BOQNo\":\"" + $("#boqNo").val() +
        "\",\"isAct\":\"" + 1 +
        "\",\"isApr\":\"" + chckisApproved +
        "\",\"BOQNm\":\"" + $("#boqTitle").val() +
        "\",\"DocNo\":\"" + $("#billNo").val() +
        "\",\"YurRef\":\"" + $("#yourRef").val() +
        "\",\"BOQDt\":\"" + $("#date").val() +
        "\",\"BOQStsKy\":\"" + 1 +
        "\",\"Adrky\":\"" + adrKy +
        "\",\"LocKy\":\"" + locKy +
        "\",\"DisPer\":\"" + 0.00 +
        "\",\"CosPri\":\"" + 0.00 +
        "\",\"Amt1\":\"" + 0.00 +
        "\",\"Amt2\":\"" + 0.00 +
        "\",\"MarkUpPer\":\"" + 0.00 +
        "\",\"RetnPer\":\"" + $("#retention").val() +
        "\",\"MaxRetnPer\":\"" + $("#maxRetention").val() +
        "\",\"RetnPeriod\":\"" + $("#retnPerDays").val() +
        "\",\"Des\":\"" + $("#Des").val() +
        "\",\"Rem\":\"" + $("#Rem").val() +
        "\",\"RetnPeriodUnitKy\":\"" + 1 +
        "\",\"Guarantee\":\"" + $("#guarantee").val() +
        "\",\"Expiry\":\"" + $("#expryDt").val() +
        "\",\"TmStmp\":\"" + $("#payLagDys").val() +
        "\",\"LocAdrKy\":\"" + locAdrKy +
        "\",\"BnkODIntrPer\":\"" + $("#BnkODIntrPer").val() +
        "\",\"AdvPer\":\"" + $("#advancePer").val() +
         "\",\"AdvRdcn\":\"" + $("#advanceRecPer").val() +
         "\",\"TrnExRate\":\"" + $("#exchngRate").val() +
         "\",\"PmtLagDays\":\"" + $("#payLagDys").val() + 
        "\",\"TrnCrnKy\":\"" + crnKy +
        "\",\"PlnStDt\":\"" + $("#heldDtAndTm").val() +
        "\",\"OffLineAprAdrKy\":\"" + OffLineAprAdrKy +
        "\",\"isContractBOQ\":\"" + chckisContractBOQ +
        "\",\"Original_BOQKy\":\"" + globalBOQKy +
        "\",\"Original_TmStmp\":\"" + 1 +
        "\"}]";
    /// BOQ Header Level Savings
    
    var isNewBOQ = $("#boqNo").val();
    if (globalBOQKy == -1 && isNewBOQ.length==0) {         // Checking for new or old
        $.holdReady(true);
        $.ajax({
            type: "GET",
            url: urlBOQHeader_InsertWeb,
            dataType: "json",
            data: { headerInsertData: headerData },
            async: false,
            success: function (datalist) {
                for (i = 0; i < datalist.length; i++) {
                    var BOQNo = datalist[0].BOQNo;
                    $("#boqNo").val(BOQNo);
                    var isHdrSaveed = sendDataSaveChanges(datalist[0].BOQKy, 1, isItemKyChanged);
                    globalBOQKy = datalist[0].BOQKy;
                    if (isHdrSaveed) {
                        $.holdReady(false);
                        $("#billNo").prop("readonly", true);
                        return true;
                    }
                }
            }
        });
    } else {
        $.holdReady(true);
        $.ajax({
            type: "GET",
            url: urlBOQHeader_UpdateWeb,
            dataType: "json",
            data: { headerUpdateData: headerData },
                        
            async: false,
            success: function (data) {
                
                for (i = 0; i < data.length; i++) {
                    //alert("Header Saving Done.");
                    //alert(data[0].BOQKy);
                    var isHdrSaveed = sendDataSaveChanges(data[0].BOQKy, 1, isItemKyChanged);
                    if (isHdrSaveed) {

                        $.holdReady(false);
                        return true;
                    }
                }
            }
        });
    }
}
function isExistingBillNo() {
    var BOQNo = $("#boqNo").val();
    var billNo = $("#billNo").val();
    var grid = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
    var date = $("#date").val();
    var currentData = grid.dataSource.data();
    var hasRows = 1;
    $.ajax({
        url: urlisExistingBillNo,
        data: JSON.stringify({
            billNo: billNo,
        }),

    contentType: 'application/json; charset=utf-8',
    dataType: "Json",
    type: "POST",

    success: function (data) {
        
        if (data.length != 0 && BOQNo.length != 0) 
        {
                    

            for (var i = 0; i < currentData.length; i++) {
                if ((currentData[i].ItmNm == undefined || currentData[i].ItmNm == null || currentData[i].ItmNm == "") || (currentData[i].ItmNo == undefined || currentData[i].ItmNo == null || currentData[i].ItmNo == "") || (currentData[i].ItmCd == undefined || currentData[i].ItmCd == null || currentData[i].ItmCd == "")) {
                    // Chq weather req itm details are there. Other wise saving will cancel from header level
                    hasRows = 0;
                }
            }
            if (hasRows == 0) {
                alert("Can't save without required item details (ItmCd,ItmNm,ItmNo)");
            }
            else {
                SaveBOQ(billNo);
            }
        }
        else if (data.length != 0 && BOQNo.length == 0) 
        {
            if (confirm('Doc Number Exist. Do you want to load it?')) {
                var BOQKy = data[0].BOQKy;
                okBoqSearchSelectCriteriaPicker(BOQKy);
            } else {
                alert('Please try a different DOC number');
            }
        }
            //else if (data.length == 0 && BOQNo.length == 0) 
            //{
            //    if (confirm('Doc Number Exist. Do you want to load it?')) {
            //        var BOQKy = data[0].BOQKy;
            //        okBoqSearchSelectCriteriaPicker(BOQKy);
            //    } else {
            //        alert('Please try a different DOC number');
            //    }
            //}
        else {
            for (var i = 0; i < currentData.length; i++) {
                // if ((currentData[i].ItmNm == undefined || currentData[i].ItmNm == null || currentData[i].ItmNm == "") || (currentData[i].ItmNo == undefined || currentData[i].ItmNo == null || currentData[i].ItmNo == "") || (currentData[i].ItmCd == undefined || currentData[i].ItmCd == null || currentData[i].ItmCd == "") || (currentData[i].UnitKy == undefined || currentData[i].UnitKy == null || currentData[i].UnitKy== "")) {
                if ((currentData[i].ItmNm == undefined || currentData[i].ItmNm == null || currentData[i].ItmNm == "") || (currentData[i].ItmNo == undefined || currentData[i].ItmNo == null || currentData[i].ItmNo == "") || (currentData[i].ItmCd == undefined || currentData[i].ItmCd == null || currentData[i].ItmCd == "")) {
                    // Chq weather req itm details are there. Other wise saving will cancel from header level
                    hasRows = 0;
                }
            }
            if (hasRows == 0) {
                alert("Can't save without required item details (ItmCd,ItmNm,ItmNo)");
            }
            else {
                SaveBOQ(billNo);
            }
        }
    },
    error: function (e) {
        return false;
    }
});

}
function okBoqSearchSelectCriteriaPicker(BOQKy) {
    
    if (BOQKy) {
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            async: false,
            timeout: 20000,
            data: {
                BOQKy: BOQKy
            },
            url: urlBOQHeader_SelectWeb,
            converters:
            {
                "text json": function (data) {
                    return $.parseJSON(data, true
                    /*converts date strings to date objects*/
                    , true
                    /*converts ISO dates to local dates*/
                    );
                }
            },
            success: function (data) {
                if (data) {
                    
                    if (searchBOQSearchSelectCriteriaPicker == "MainBOQWindow") {
                        globalBOQKy = data[0].BOQKy;
                        $("#boqNo").val(data[0].BOQNo);
                        $("#billNo").val(data[0].DocNo);
                        $("#date").data("kendoDatePicker").value(data[0].BOQDt);
                        $("#adressNameCmb").data("kendoComboBox").value(data[0].Adrky);
                        $("#locationCmb").val(data[0].LocKy);
                        $("#retention").val(data[0].RetnPer);
                        $("#maxRetention").val(data[0].MaxRetnPer);
                        $("#retnPerDays").val(data[0].RetnPeriod);
                        $("#Des").val(data[0].Des);
                        $("#Rem").val(data[0].Rem);
                        $("#guarantee").val(data[0].Guarantee);
                        $("#expryDt").data("kendoDatePicker").value(data[0].Expiry);
                        $("#payLagDys").val(data[0].TmStmp);
                        $("#heldDtAndTm").data("kendoDatePicker").value(data[0].PlnStDt);
                          
                        $("#offlineApprovelCmb").data("kendoComboBox").value("");
                        $("#clientCmb").data("kendoComboBox").value("");
                        $("#currencyCmb").data("kendoComboBox").value("");
                        $('#tGridBOQDetails_SelectWeb').data().kendoGrid.destroy();
                        $('#tGridBOQDetails_SelectWeb').empty();
                        loadBOQDetailsByBOQKy(data[0].BOQKy);
                    } else if (searchBOQSearchSelectCriteriaPicker == "CopyBOQWindow") {
                        $('#tGridCpyBOQDetails_SelectWeb').data().kendoGrid.destroy();
                        $('#tGridCpyBOQDetails_SelectWeb').empty();
                        loadBOQDetailsByBOQKy(data[0].BOQKy);
                    } else {
                        return;
                    }

                    boqSearchSelectCriteriaPicker.dialog("close");
                    if (searchBOQSearchSelectCriteriaPicker == "CopyBOQWindow") {
                        $('#boqDetailDblClick').data('kendoWindow').center().open();
                    }
                }
                else {
                    alert("No Data ... !")
                }
                $.holdReady(false);
            }
        });

        boqSearchSelectCriteriaPicker.dialog("close");
        if (searchBOQSearchSelectCriteriaPicker == "CopyBOQWindow") {
            $('#boqDetailDblClick').data('kendoWindow').center().open();
        }
    }
    else {
        alert("Selecte the Resource ... !")
    }
}

function sendDataSaveChanges(boqky, boqhdrcdky, isItemKyChanged) {
    var grid = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
    //get the new and the updated records
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew() && currentData[i].BOQDetKy == undefined) {
            //this record is new
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].BOQDetKy != undefined) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    //this records are deleted
    var deletedRecords = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    }

    var pageNo = $("#boqDetidPageNo").val();
    var pageSize = $("#boqDetidPageSize option:selected").val();

    $.holdReady(true);
    $.ajax({

        url: urlBOQDetails_UpdateAndInsertAndDelete, //"/PMResource/sendDataSaveChanges",
        //string BOQDetails_Update, string BOQDetails_Insert, string BOQDetails_Delete, int BOQKy, int BOQHdrCdKy
        data: { BOQDetails_Update: kendo.stringify(updatedRecords), BOQDetails_Insert: kendo.stringify(newRecords), BOQDetails_Delete: kendo.stringify(deletedRecords), BOQKy: boqky, BOQHdrCdKy: boqhdrcdky, BOQTypKy: globalBOQTypKy, PageNo: pageNo, PageSize: pageSize },
        type: "POST",
        error: function () {
            //Handle the server errors using the approach from the previous example
        },
        success: function (data) {
            alert("Data Saved.");
                
            grid.dataSource._destroyed = [];
            //refresh the grid - optional
            //grid.dataSource.read();

            $('#tGridBOQDetails_SelectWeb').empty();
            loadBOQDetailsByBOQKy(globalBOQKy);

            $("#billNo").prop("readonly", true);
            $("#billNo").prop('disabled', true);
            if (isItemKyChanged == true) {
                funBOQDetCmpnByBOQDetKy_InsertDelete();
            }

            $.holdReady(false);
        }
    })
}




//This popup for itemky changes on boqdet

var boqdetkyItmKyChangePopUpBOQDet = 1;
var itmkyItmKyChangePopUpBOQDet = 1;

itmKyChangePopUpBOQDet = $("#divItmKyChangePopUpBOQDet").dialog({
    autoOpen: false,
    height: 80,
    width: 250,
    title: "Do you want update the Anyls ... ?",
    modal: true,
    buttons: {
        "Yes": yesItmKyChangePopUpBOQDet,
        "No": noItmKyChangePopUpBOQDet
    },
    close: function () {
        //form[0].reset();
        //allFields.removeClass("ui-state-error");
    }
});

function yesItmKyChangePopUpBOQDet() {
    SaveBOQ(true);
    //setTimeout(function () {
    //    funBOQDetCmpnByBOQDetKy_InsertDelete();
    //}, 2000);
}

function funBOQDetCmpnByBOQDetKy_InsertDelete() {
    alert("start");
    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: {
            BOQDetKy: boqdetkyItmKyChangePopUpBOQDet,
            Dt: $("#date").val(),
        },
        url: urlBOQDetCmpnByBOQDetKy_InsertDelete,
        success: function (data) {
            $.holdReady(false);
            itmKyChangePopUpBOQDet.dialog("close");
        }
    });
}

function noItmKyChangePopUpBOQDet() {
    itmKyChangePopUpBOQDet.dialog("close");
}

// ItemCode Or ItemKy Change On BOQDet