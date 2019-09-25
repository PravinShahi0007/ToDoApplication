
function CdMasLookUp(concd) {
  
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlCdMasLookUp,
                data: { 'concd': concd },
                dataType: "json"
            }
        }
    });
    return dataSource;
}