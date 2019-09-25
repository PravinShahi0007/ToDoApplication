//load AddID Combo
function LoadResCombo() {
    $("#HdrSec1_ComRes_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrCode",
        dataSource: AddressCode("HdrSec1_ComRes"),
        change: function (e) {
            var AdrKy = $("#HdrSec1_ComRes_Cd").data("kendoComboBox").value();
            $("#HdrSec1_ComRes_Nm").data("kendoComboBox").value(AdrKy);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a the Resource"
    });
}

//load AddNm Combo
function LoadRecNmCombo() {
    $("#HdrSec1_ComRes_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNM",
        dataSource: AddressName("HdrSec1_ComRes"),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a the Resource Name"
    });
}
function AddressName(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressNm,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': "1"
                },

                dataType: "json"
            }
        }

    });
    return dataSource;
}
function AddressCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressCd,
                data: {
                    ObjKy: ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': "1"
                },
                dataType: "json",
                cache: false
            }
        }

    });
    return dataSource;
}

// load PrjID Combo
function PrjComLoad() {
    $("#HdrSec2_ComPro_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource("HdrSec2_ComPro_Cd"),
        change: function (e) {
            var PrjKy = $("#HdrSec2_ComPro_Cd").data("kendoComboBox").value();
            $("#HdrSec2_ComPro_Nm").data("kendoComboBox").value(PrjKy);
            $('#HdrSec2_ComTsk_Cd').data("kendoComboBox").setDataSource(TaskDatasource_Cd('HdrSec2_ComTsk', PrjKy));
            $('#HdrSec2_ComTsk_Cd').data("kendoComboBox").refresh();

            $('#HdrSec2_ComTsk_Nm').data("kendoComboBox").setDataSource(TaskDatasource_Nm('HdrSec2_ComTsk', PrjKy));
            $('#HdrSec2_ComTsk_Nm').data("kendoComboBox").refresh();
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a the Project"
    });
    LoadPrjName();

}

//load PrjNm Combo
function LoadPrjName() {
    $("#HdrSec2_ComPro_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource("HdrSec2_ComPro_Nm"),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select the Project Name"
    });
}

//load TaskID Combo
function Loadtask() {
    $("#HdrSec2_ComTsk_Cd").kendoComboBox({
        dataValueField: "PrcsDetKy",
        dataTextField: "TaskID",
        change: function (e) {
            var taskKy = $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").value();
            $("#HdrSec2_ComTsk_Nm").data("kendoComboBox").value(taskKy);
            var selectedObject = $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").dataItem($("#HdrSec2_ComTsk_Cd").data("kendoComboBox").select());
            $("#HdrSec2_CmbUnit_Cd").val(selectedObject.Unit);
        },
    });
    $("#HdrSec2_ComTsk_Nm").kendoComboBox({
        dataValueField: "PrcsDetKy",
        dataTextField: "TaskNm",
    });
}

//javaScrip Function to get the Task id Data
function TaskDatasource_Cd(ObjNm, PreKy) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    //url: urlComboLoad.TaskID_SelectMob,
                    url: urlComboLoad.SubConTaskId_SelectMob,
                    data: {
                        PreKy: PreKy,
                        accKy: 1,
                        ObjKy: ObjKy
                       

                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

//javaScrip Function to get the Task name Data
function TaskDatasource_Nm(ObjNm, PreKy) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    //url: urlComboLoad.TaskNm_SelectMob,
                    url: urlComboLoad.SubConTaskNm_SelectMob,
                    data: {
                        PreKy: PreKy,
                        accKy: 1,
                        ObjKy: ObjKy
                        
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}
