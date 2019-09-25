function PrintSourceWithReportNo(ReptNo) {
    //
    if (ReptNo == '2')
    {
        if (FormGlblData.TrnKy > 1) {
            $.ajax({
                url: CheqNoValdation,
                data: {
                    TrnKy: FormGlblData.TrnKy
                },
                type: "POST",
                datatype: "Json",
                success: function (data) {
                    if (data == 1) {

                        //var formOrdKy = document.getElementById("TrnKy").value;
                        var formOrdKy = FormGlblData.TrnKy;
                        var formObjCaption = viewBagObjCaptn;
                        var formObjKy = viewBagObjKy;

                        // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js>"
                        PrintCommonWithReportNo(formOrdKy, formObjCaption, formObjKy, ReptNo);
                    }
                    else {
                        alert("You Can't Print Cheque");
                        return;
                    }
                }
            });
        }
        else {
            alert("Select the Traction");
            return;
        }
    }
    else {
        //var formOrdKy = document.getElementById("TrnKy").value;
        var formOrdKy = FormGlblData.TrnKy;
        var formObjCaption = viewBagObjCaptn;
        var formObjKy = viewBagObjKy;

        // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js>"
        PrintCommonWithReportNo(formOrdKy, formObjCaption, formObjKy, ReptNo);
    }
   


}