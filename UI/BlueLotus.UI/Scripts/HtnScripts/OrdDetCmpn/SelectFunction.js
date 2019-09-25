

function GetGridDetailFrmItmCmpnDet(OrdDetKy) {

    $.ajax({
        url: urlCmpnBld.ItmCmpn_SelectWeb,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            OrdDetKy: OrdDetKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            var id = ("#PrcsSchDetCmpnGrid");
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);

            for (i = 0; i < data.length; i++) {

                var id = ("#PrcsSchDetCmpnGrid");
                $(id).data("kendoGrid").dataSource.add({
                    OrdDetCmpnKy: data[i].OrdDetCmpnKy,
                    OrdDetKy: data[i].OrdDetKy,
                    FinItmKy: data[i].FinItmKy,
                    ItmKy: data[i].ItmKy,
                    LiNo: data[i].LiNo,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Des: data[i].Des,
                    Unit: data[i].Unit,
                    TrnUnitKy: data[i].TrnUnitKy,
                    Qty: data[i].Qty,
                    ReqQty: data[i].ReqQty,
                    WstPer: data[i].WstPer,
                    WstQty: data[i].WstQty,
                    UsagPer: data[i].UsagPer,
                    TrnQty: data[i].TrnQty,
                    TrnRate: data[i].TrnRate,
                    CompFacPer: data[i].CompFacPer,
                    LineTotal: data[i].LineTotal,
                    ConvRate: data[i].ConvRate,
                    AnlQty: data[i].AnlQty
                });
            }

            //SetReadOnly(TrnKy);
            //Clear();
        },
        error: function (e) {
            return false;
        }
    });

}
