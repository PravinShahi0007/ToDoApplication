

function GetGridDetailFrmItmCmpnDet(PrcsSchDetKy) {

    $.ajax({
        url: urlCmpnBld.ItmCmpn_SelectWeb,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            PrcsSchDetKy: PrcsSchDetKy
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

                    PrcsSchDetCmpnKy: data[i].PrcsSchDetCmpnKy,
                    PrcsSchDetKy: data[i].PrcsSchDetKy,
                    PrcsDetKy: data[i].PrcsDetKy,
                    FinItmKy: data[i].FinItmKy,
                    ItmKy: data[i].ItmKy,
                    LiNo: data[i].LiNo,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    TrnUnitKy: data[i].TrnUnitKy,
                    Qty: data[i].Qty,
                    ReqQty: data[i].ReqQty,
                    WstPer: data[i].WstPer,
                    WstQty: data[i].WstQty,
                    UsagPer: data[i].UsagPer,
                    TrnQty: data[i].TrnQty,
                    CompFacPer: data[i].CompFacPer
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
