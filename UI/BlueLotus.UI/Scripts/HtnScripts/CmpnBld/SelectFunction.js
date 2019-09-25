

function GetGridDetailFrmItmCmpnDet(FinItmKy) {
    $('#HdrSec1_NmricAnlQty_Val').data("kendoNumericTextBox").value(1);
    $.ajax({
        url: urlCmpnBld.ItmCmpn_SelectWeb,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            FinItmKy: FinItmKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            var id = ("#ItmCmpnGrid");
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);

            for (i = 0; i < data.length; i++) {

                $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(data[i].AnalQty);                
                $('#HdrSec1_NmricAnlQty_Val').siblings('input:visible').focus();

                var id = ("#ItmCmpnGrid");
                $(id).data("kendoGrid").dataSource.add({

                    ItmCmpnKy: data[i].ItmCmpnKy,
                    FinItmKy: data[i].FinItmKy,
                    ItmKy: data[i].ItmKy,
                    LiNo: data[i].LiNo,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Des: data[i].Des,
                    Unit: data[i].Unit,
                    TrnUnitKy: data[i].TrnUnitKy,
                    ResReqSchTyp: data[i].ResReqSchTyp,
                    ResReqSchTypKy: data[i].ResReqSchTypKy,
                    ItmPrp: data[i].ItmPrp,
                    ItmPrpKy: data[i].ItmPrpKy,
                    Qty: data[i].Qty,
                    ReqQty: data[i].ReqQty,
                    WstPer: data[i].WstPer,
                    WstQty: data[i].WstQty,
                    UsagPer: data[i].UsagPer,
                    TrnQty: data[i].TrnQty,
                    CompFacPer: data[i].CompFacPer,
                    AnalQty: data[i].AnalQty
                });
            }
            
            //SetReadOnly(TrnKy);
            //Clear();
        },
        error: function (e) {
            $('#HdrSec1_NmricAnlQty_Val').siblings('input:visible').focus();
            return false;
        }

    });   
    
}
