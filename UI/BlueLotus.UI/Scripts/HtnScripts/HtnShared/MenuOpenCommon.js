
function OpenMenuByItem(data, isWithSmartGrid, isSamePage) {
    if (data.ReportServerURL.length > 0 && data.ReportPath.length > 0) {
        $.ajax({
            url: urlCommonReportSessionSetting, // "@Url.Content("~/CommonReportViwer/CommonReportSessionSetting")",
            data: JSON.stringify({
                ReportServerUrl: data.ReportServerURL,
                ReportPath: data.ReportPath,
                ReportName: data.ReportName,
                ObjKy: data.ObjKy
            }),

            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (dataN) {
                var url = "http://" + document.location.host +RootDir+"/Report/CommonReportViwer.aspx?ObjKy=" + data.ObjKy;
                if (isSamePage == 1) {
                    window.open(url, '_blank');
                }
                else {
                    window.location.href = url;
                }

                if (isWithSmartGrid == 1) {

                    // Select the SmartMenu Grid Row
                    var dataItem = $("#SmartMenugrid").data("kendoGrid").dataSource.get(data.ObjKy);
                    var row = $("#SmartMenugrid").data("kendoGrid").tbody.find("tr[data-uid='" + dataItem.uid + "']");

                    var objKy = data.ObjKy;
                    findDataItem(objKy);
                }
            },
            error: function (e) {
                return false;
            }
        });
    }

    if (data.URLController.length > 0 && data.URLAction.length > 0) {
        if (data.ChildKy == 0) data.ChildKy = 1;
        if (data.ChildKy != 1 || data.ChildKy == undefined || data.ChildKy == "")
        {
            var url = "http://" + document.location.host + "/" + RootDir + "/"  +data.URLController + "/" + data.URLAction + "?ObjCaptn=" + data.ObjCaptn + "&OurCd=" + data.OurCd + "&OurCd2=" + data.OurCd2 + "&ObjKy=" + data.ObjKy + "&ChildKy=" + data.ChildKy;
            if (isSamePage == 1) {
                window.open(url, '_blank');
            }
            else {
                window.location.href = url;
            }

            if (isWithSmartGrid == 1) {

                try {
                    var dataItem = $("#SmartMenugrid").data("kendoGrid").dataSource.get(data.ObjKy);
                    var row = $("#SmartMenugrid").data("kendoGrid").tbody.find("tr[data-uid='" + dataItem.uid + "']");

                } catch (ex) { }

                // Select the SmartMenu Grid Row

                var objKy = data.ObjKy;
                findDataItem(objKy);
            }
        }
        else {
            var url = "http://" + document.location.host + "/" + RootDir + "/" + data.URLController + "/" + data.URLAction + "?ObjCaptn=" + data.ObjCaptn + "&OurCd=" + data.OurCd + "&OurCd2=" + data.OurCd2 + "&ObjKy=" + data.ObjKy;
            if (isSamePage == 1) {
                window.open(url, '_blank');
            }
            else {
                window.location.href = url;
            }

            if (isWithSmartGrid == 1) {

                try {
                    var dataItem = $("#SmartMenugrid").data("kendoGrid").dataSource.get(data.ObjKy);
                    var row = $("#SmartMenugrid").data("kendoGrid").tbody.find("tr[data-uid='" + dataItem.uid + "']");

                } catch (ex) { }

                // Select the SmartMenu Grid Row

                var objKy = data.ObjKy;
                findDataItem(objKy);
            }
        }
    }
}

function OpenFormByObjNm(ObjNm) {

  
    $.ajax({
        url: urlAutoCompleteGoToMenu,
        data: JSON.stringify({
            SearchQuery: $("#AutoCompleteGoToMenu").val(),
            ColNm: 'ObjNm'

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ObjCaptn == ObjNm) {//'Set-offs'
                    OpenMenuByItem(data[i], 0, 0)
                }
            }

        },
        error: function (e) {
            return false;
        }
    });
  
}