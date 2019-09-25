
function AccCrLimit_Validate(validationData) {

    //        int ObjKy, string CurVal, string EftvDt, int LocKy,
    //        int TrnTypKy, int BUKy, int PrjKy,
    //        int AdrKy, int AccKy

    $.ajax({
        url: urlValidation.AccCrLimit_Validate,
        data: JSON.stringify({
            ObjKy: validationData.ObjKy,
            CurVal: validationData.CurVal,
            EftvDt: validationData.EftvDt,
            LocKy: validationData.LocKy,
            TrnTypKy: validationData.TrnTypKy,
            BUKy: validationData.BUKy,
            PrjKy: validationData.PrjKy,
            AdrKy: validationData.AdrKy,
            AccKy: validationData.AccKy
        }),

        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                ComSaveFunction_AfterAprValidation(1);
            } else {
                alert("Account Credit Limit Exceed.");
                ComSaveFunction_AfterAprValidation(0);
            }
        },
        error: function (e) {
            alert("Account Credit limit Error.");
            ComSaveFunction_AfterAprValidation(0);
        }
    });
}