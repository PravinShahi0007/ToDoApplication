
var list = [];
//List of Cache Combo prefix keys 
var prefixlist = ["ItmID", "ItmNm", "PrjID", "PrjNm", "AccID", "AccNm", "AdrID", "AdrNm", "Code", "CdNm", "TskID", "TskNm", "BUCode", "BUNm", "ObjMas", "ObjMasObjSec"];
//final output Array for displaying the Grid 
var finaloutput = [];
//Login Company Details 
var LoginCompanyDetails = [];

$(document).ready(function () {
    LoadCombo();
    //Cache_SelectMob_DataSourcelist();
    //GetLoginCompanyDetails();
});

//Load the Combo
function LoadCombo() {
        $("#HdrSec1_ComCache_Cd").kendoComboBox({
            dataSource: Cache_SelectMob_DataSource(),
            filter: "contains",
            suggest: true,
            iplaceholder: "Select a the Combo"
        });
}

//Function To Get the All Cache Keys
function Cache_SelectMob_DataSource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: GetCacheUrl,
                data: {
                    
                },
                dataType: "json",
                cache: false
            }
        }

    });
    return dataSource;
}

//Claer Cach Button Click Event 
function clearcach() {
    var cleaKy = $("#HdrSec1_ComCache_Cd").data("kendoComboBox").value();


    var gview = $("#CachGrid").data("kendoGrid");
    var selectedItem = gview.dataItem(gview.select());
    var gridseletKy = selectedItem.Ky;
    if (cleaKy.length>1) {
        $.ajax({
            type: 'POST',
            url: ClaerCacheUrl,
            dataType: "json",

            data: {
                'Key': cleaKy
            },
            success: function (data) {
                alert(data);
                $("#HdrSec1_ComCache_Cd").data("kendoComboBox").value("");
                LoadCombo();
            },
            error: function () {
                alert("Failed! Please try again.");
            }
        });
    }

        //Select the cache Key From grid And clear 
    else if(gridseletKy.length>1)
    {
        $.ajax({
            type: 'POST',
            url: ClaerCacheUrl,
            dataType: "json",

            data: {
                'Key': gridseletKy
            },
            success: function (data) {
                alert(data);
                $("#HdrSec1_ComCache_Cd").data("kendoComboBox").value("");
                LoadCombo();
                const index = list.indexOf(gridseletKy);
                list.splice(index, 1);
                load();

                
            },
            error: function () {
                alert("Failed! Please try again.");
            }
        });
    }



}


//button click event for Claer All Cache 
function claerAllcach() {
    $.ajax({
        type: 'POST',
        url: ClearAllCacheUrl,
        dataType: "json",

        data: {
        },
        success: function (data) {
            alert(data);
            LoadCombo();
            load();

        },
        error: function () {
            alert("Failed! Please try again.");
        }
    });
}

//Get All Cach list
function Cache_SelectMob_DataSourcelist() {
    $.ajax({
        url: GetCacheUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            list = data;
            //splitfunction();
            
        },
        error: function (e) {
            return false;
        }
    });
}

function splitfunction() {
    $.ajax({
        type: 'POST',
        url: GetCompanyDetails,
        dataType: "json",
        data: {
        },
        success: function (data) {

            LoginCompanyDetails = data;
        }
    });

    
    
   
}

function GetLoginCompanyDetails()
{
    $.ajax({
        type: 'POST',
        url: GetCompanyDetails,
        dataType: "json",
        data: {
        },
        success: function (data) {
            
            LoginCompanyDetails = data;
            finaloutput = [];
            if (LoginCompanyDetails != null) {
                for (var i = 0; i < list.length; i++) {
                    var splitstr = list[i];
                    var str = splitstr.split("-");

                    for (var j = 0; j < prefixlist.length; j++) {
                        if (prefixlist[j] == str[0]) {
                            var checkobjky = str[1].split(" ");
                            var ckey = str[2].split(":");
                            if (checkobjky[0] == "ObjKy") {
                                var gettheobjky = checkobjky[1].split(":");
                                if (LoginCompanyDetails[0] == ckey[1]) {
                                    finaloutput.push({ Ky: splitstr, ComNm: str[0], Objky: gettheobjky[0], Cky: LoginCompanyDetails[1] });
                                }

                            }
                            else {
                                var Checkprnky = checkobjky[1].split(":");
                                if (LoginCompanyDetails[0] == ckey[1]) {
                                    finaloutput.push({ Ky: splitstr, ComNm: str[0], PrntKy: Checkprnky[0], Cky: LoginCompanyDetails[1] });
                                }

                            }
                        }
                    }
                }
                loadGrid(finaloutput);
            }
        }
    });
}
function loadGrid(data) {
    $("#CachGrid").kendoGrid({
        columns: [
               {
                   title: "CacheKey", field: "Ky", hidden: true,
                   width: 50
               },
               {
                   title: "Combo Name", field: "ComNm", hidden: false,
                   width: 50
               },
                  {
                      title: "Objkey", field: "Objky", hidden: false,
                      width: 50
                  },
                  {
                      title: "PrntKy", field: "PrntKy", hidden: false,
                      width: 50
                  },
                  {
                      title: "Cky", field: "Cky", hidden: true,
                      width: 50
                  },
                  {
                      title: "Company Name", field: "CNm", hidden: false,
                      width: 50
                  },
           ],
        dataSource: {
            data
        },
        height: 400,
        scrollable: true,
        selectable: true, schema: {
            model: {
                id: "CacheKey",
                fields: {
                    Ky: { editable: true, nullable: true, type: "string" },
                    ComNm: { editable: true, nullable: true, type: "string" },
                    PrntKy: { editable: true, nullable: true, type: "string" },
                    Objky: { editable: true, nullable: true, type: "string" },
                    Cky: { editable: false, nullable: false, type: "string" },
                    CNm: { editable: false, nullable: false, type: "string" },

                }
            }
        }
    });
}


function load() {

    $.ajax({
        type: 'POST',
        url: getall,
        dataType: "json",

        data: {
            
        },
        success: function (data) {
            loadGrid(data);
        },
        error: function () {
            alert("Failed! Please try again.");
        }
    });

    
}
