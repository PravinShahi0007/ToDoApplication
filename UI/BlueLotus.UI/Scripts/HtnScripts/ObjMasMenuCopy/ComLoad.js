$(document).ready(function () {
    loadtheCombo();
    LoadTheUserCombo();
    LoadToUserCombo();
});
function loadtheCombo() {
    $("#HdrSec1_ComFmCmp_Cd")
        .kendoComboBox({
            dataValueField: "CKy",
            dataTextField: "CNm",
            dataSource: CompanyCd(),
            change: function (e) {
                var cky = $("#HdrSec1_ComFmCmp_Cd").data("kendoComboBox").value();
                if (cky != null) {
                    LoadTheUserCombo(cky);
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Company"
        });
    $("#HdrSec1_ComToCmp_Cd")
       .kendoComboBox({
           dataValueField: "CKy",
           dataTextField: "CNm",
           dataSource: CompanyCd(),
           change: function (e) {
               var cky = $("#HdrSec1_ComFmCmp_Cd").data("kendoComboBox").value();
               if (cky != null) {
                   LoadToUserCombo(cky);
               }
           },
           filter: "startswith",
           suggest: true,
           placeholder: "Select a Company"
       });

}
function LoadTheUserCombo(cky) {
    $("#HdrSec1_ComFMUser_Cd")
        .kendoComboBox({
            dataValueField: "UsrKy",
            dataTextField: "UsrNm",
            dataSource: LoadUserNm(cky),
            change: function (e) {
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Company"
        });
}

function LoadToUserCombo(cky) {
    $("#HdrSec1_ComToUser_Cd")
        .kendoComboBox({
            dataValueField: "UsrKy",
            dataTextField: "UsrNm",
            dataSource: LoadUserNm(cky),
            change: function (e) {
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Company"
        });
}
function CompanyCd() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetCompanyCode,
                data: {
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
function LoadUserNm(cky) {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetUserNm,
                data: {
                    'CKy': cky,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}