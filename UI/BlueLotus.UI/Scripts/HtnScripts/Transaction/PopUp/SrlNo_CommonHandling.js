$("#HdrSec5_SerNo_Btn").click(function () {

    try {        
        $("#SrlNo_Grid_Web").data('kendoGrid').dataSource.data([]);
    } catch (e) {

    }
    SrlNoPartialViewPopUpOpen();
});

$("#HdrSec6_SerNo_Btn").click(function () {
    SrlNoPartialViewPopUpOpen();
});
var serNoUpdateItm = {
    Ky: 1,
    Cd: '',
    Nm: ''
}

function SrlNoPartialViewPopUpOpen() {

    if(viewBag.OurCd != 'GRN' && viewBag.OurCd != 'SALE' && viewBag.OurCd != 'SVatSALE' && viewBag.OurCd != 'NonVatSALE' && viewBag.OurCd != 'TRFOUT')
    return;

    $("#SrlNoPartialView").show().kendoWindow({
        width: "1000px",
        height: "560px",
        modal: true,
        title: "Serial Numbers"
    });
    $('#SrlNoPartialView').data('kendoWindow').center().open();

    document.getElementById('SrlNoPartialView_ItmLbl_Lbl').innerHTML = serNoUpdateItm.Cd + ' : ' + serNoUpdateItm.Nm;
    LoadSrlNo_Grid_WebViewColumn();
}

function SrlNoPartialViewPopUpClose() {
    $('#SrlNoPartialView').data('kendoWindow').close();
}

function SrlNoGridAdd() {
    var grid = $("#SrlNo_Grid_Web").data("kendoGrid").addRow();
}

function SrlNoGridCancel() {
    var grid = $("#SrlNo_Grid_Web").data("kendoGrid").cancelChanges();
}

function SrlNoGridDone() {

    var gridData = $("#SrlNo_Grid_Web").data("kendoGrid").dataSource.data();
    for (var i = 0; i < gridData.length; i++) {
        //SupWrntyReading, CWrntyReading, CExpryDt

        FormGlblData.SerialNumber_Array.push({
            ItmTrnKy: serNoUpdateItm.ItmTrnKy,//gridData[i].ItmTrnKy,
            SerNoKy: gridData[i].SerNoKy,
            LiNo: gridData[i].LiNo,
            SerNo: gridData[i].SerNo,
            CSerNo: gridData[i].CSerNo,
            BatchNo: gridData[i].BatchNo,
            EngineNo: gridData[i].EngineNo,
            SupWrntyReading: gridData[i].SupWrntyReading,
            CWrntyReading: gridData[i].CWrntyReading,
            SupExpryDt: gridData[i].SupExpryDt,
            CExpryDt: gridData[i].CExpryDt,
            VehicleNumber: gridData[i].VehicleNumber,
            ItmKy: serNoUpdateItm.Ky,
            isAct: gridData[i].isAct
        });
    }

    SrlNoPartialViewPopUpClose();
    var count = 0;

    if(viewBag.OurCd == 'GRN')
        count = $("#SrlNo_Grid_Web").data().kendoGrid.dataSource.total();
    else if (viewBag.OurCd == 'SALE' || viewBag.OurCd == 'TRFOUT') {
        count = 0;
        var gridData = $("#SrlNo_Grid_Web").data("kendoGrid").dataSource.data();
        for (var i = 0; i < gridData.length; i++) {

            if(gridData[i].isAct){
                count = count + 1;
            }
        }
    }

    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(count);
   // $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value(count);
    DetailChangeFire();
    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
    //$("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").focus();
}

function SendToSerialNumber_Array(UpdatingLiNo) {
    for (var i = 0; i < FormGlblData.SerialNumber_Array.length; i++) {

        if (FormGlblData.SerialNumber_Array[i].LiNo == 0) 
            FormGlblData.SerialNumber_Array[i].LiNo = UpdatingLiNo;

        //if (FormGlblData.SerialNumber_Array[i].LiNo == UpdatingLiNo)
        //    FormGlblData.SerialNumber_Array[i].ItmKy = serNoUpdateItm.Ky;
        
        if (FormGlblData.SerialNumber_Array[i].ItmTrnKy == 1 && UpdatingLiNo >= 1)
            FormGlblData.SerialNumber_Array[i].ItmTrnKy = serNoUpdateItm.ItmTrnKy;
    }
}

function SaveSerialNumberData(TrnKy) {
    $.ajax({
        url: urlTransaction.SerialNo.ItmTrnSer_InsertUpdateWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            TrnKy: Number(TrnKy),
            TrnTypKy: Number(FormGlblData.TrnTypKy),
            SerNoListString: JSON.stringify(FormGlblData.SerialNumber_Array)
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            FormGlblData.SerialNumber_Array = [];
            //alert(data);
        }
    });
}

$('#SrlNo_Grid_Web').on('click', '.isActSerialPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#SrlNo_Grid_Web').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAct', checked);
    }
});

