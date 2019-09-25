
var PrjKy = 1;
var AtnDetKy = 1

var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {
    $(document).ready(function () {

        $.ajax({
            url: urlCodes.GetCdKyByConCdAndOurCd,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                ConCd: 'TrnTyp',
                OurCd: viewBag.OurCd
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (TrnTypKy) {

                FormGlblData.TrnTypKy = TrnTypKy;
                GetFormObjData();
            }
        });
    });

});

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;

            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
    LoadDatePickers();
    LoadTaskCombo();

    //$('#HdrSec1_ChkboxApplyAll_Val').attr('checked', false);

    //$("#GridWin").show();
    //LoadGridView();

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);

}

function LoadDatePickers() {
    $("#HdrSec1_DatPicAttDt_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    var todayDate = new Date();
    $("#HdrSec1_DatPicAttDt_Val").data("kendoDatePicker").value(todayDate);


    $("#HdrSec1_TmPicIn_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_TmPicOut_val").kendoTimePicker({
        format: "HH:mm"
    });

}

function LoadTaskCombo() {
    $("#HdrSec1_CmbTask_Nm").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskNm",
        dataSource: TaskDatasource(PrjKy),
        filter: "contains",
        suggest: true,
        placeholder: "Select Task.."
    });
}

function LoadCombo() {

    $("#HdrSec1_CmbPrj_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: ProjectNm('HdrSec1_CmbPrj'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox");
            PrjKy = cmb.value();

            if (PrjKy == "" || PrjKy == null || PrjKy == undefined) {
                alert(PrjKy + " is not valid Task");
                $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").text("");

            }
            else {
                LoadTaskCombo();
                $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Project.."
    });


    $("#HdrSec1_CmbBU_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbBU'),
        filter: "contains",
        suggest: true,
        placeholder: "Select BU.."
    });


    $("#HdrSec1_CmbEmpNo_cd").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNo",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox");
            var EmpNo = cmb.value();


            if (EmpNo != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpNo_cd");

                if (validate) {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(EmpNo);


                } else {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee EmpNo"
    })
    $("#HdrSec1_CmbEmpNm_Nm").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox");
            var EmpNm = cmb.value();


            if (EmpNm != "") {

                var validate = ComboValidations("HdrSec1_CmbEmpNm_Nm");

                if (validate) {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value(EmpNm);


                } else {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee Name"
    })



    function ComboValidations(cmbNm) {

        var cmb = $("#" + cmbNm + "").data("kendoComboBox");
        var val = cmb.value();

        if (isNaN(val)) {
            alert("'" + val + "' is not a Valid input");
            $("#" + cmbNm + "").data('kendoComboBox').value("");
            return false;
        } else {
            return true;
        }
    }
}

function TaskDatasource(PrjKy) {

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetTaskList,
                  data: {
                      PrjKy: PrjKy
                  },
                  dataType: "json"
              }
          }

      });

    return dataSource;

}

function ProjectNm(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectNm,
                data: {
                    ObjKy: ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}


function Cancel() {
    $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value("");
    $("#HdrSec1_CmbEmpNm_Nm").data('kendoComboBox').text("");
    $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').value(1);
    $("#HdrSec1_CmbTask_Nm").data('kendoComboBox').value(1);
    $("#HdrSec1_CmbBU_Nm").data('kendoComboBox').value(1);

    var todayDate = new Date();
    $("#HdrSec1_DatPicAttDt_Val").data("kendoDatePicker").value(todayDate);

    $('#HdrSec1_chkPrvDt_val').attr('checked', false);
    $('#HdrSec1_chkNxtDt_val').attr('checked', false);

    $('#HdrSec1_TmPicIn_val').val("");
    $('#HdrSec1_TmPicOut_val').val("");

    $('#HdrSec1_InptAddMin_Val').val("");
    $('#HdrSec1_InptDedMin_Val').val("");
    $('#HdrSec1_InptDesc_Val').val("");

}


function Save() {
    var EmpKy = $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value();
    var PrjKy = $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').value();
    if (PrjKy == null || PrjKy == undefined || PrjKy == "")
        PrjKy = 1;

    var PrcsDetKy = $("#HdrSec1_CmbTask_Nm").data('kendoComboBox').value();
    if (PrcsDetKy == null || PrcsDetKy == undefined || PrcsDetKy == "")
        PrcsDetKy = 1;

    var BUKy = $("#HdrSec1_CmbBU_Nm").data('kendoComboBox').value();
    if (BUKy == null || BUKy == undefined || BUKy == "")
        BUKy = 1;

    var AtnDt = $("#HdrSec1_DatPicAttDt_Val").val();

    var isPrvDay;
    if ($("#HdrSec1_chkPrvDt_val").is(":checked")) {
        isPrvDay = 1;
    } else {
        isPrvDay = 0;
    }

    var isNxtDay;
    if ($('#HdrSec1_chkNxtDt_val').is(":checked")) {
        isNxtDay = 1;
    } else {
        isNxtDay = 0;
    }

    var InDtm = $('#HdrSec1_TmPicIn_val').val();
    var OutDtm = $('#HdrSec1_TmPicOut_val').val();

    var AddMin = $('#HdrSec1_InptAddMin_Val').val();
    var DedMin = $('#HdrSec1_InptDedMin_Val').val();
    var Desc = $('#HdrSec1_InptDesc_Val').val();


    if (EmpKy != null && EmpKy != undefined && EmpKy != "") {
        if (AtnDt != null && AtnDt != undefined && AtnDt != "") {
            if (InDtm != "" && OutDtm != "") {

                $.ajax({
                    url: urlAttendance_InsertUpdateweb, //"@Url.Content("~/Attendence/Attendance_InsertUpdateweb")",
                    data: JSON.stringify({
                        AtnDetKy: AtnDetKy,
                        EmpKy: EmpKy,
                        PrcsDetKy: PrcsDetKy,
                        BUKy: BUKy,
                        PrjKy: PrjKy,
                        AtnDt: AtnDt,
                        isPrvDay: isPrvDay,
                        isNxtDay: isNxtDay,
                        InDtm: InDtm,
                        OutDtm: OutDtm,
                        AddMin: AddMin,
                        DedMin: DedMin,
                        Desc:Desc,
                        

                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {
                        if (data > 1) {
                            AtnDetKy = data;
                            alert("Successfully Saved");
                            Cancel();
                        }
                        else { alert("Failed"); }
                    },
                    error: function (e) {
                        alert("Failed");
                        return false;
                    }
                });
            }
            else {
                alert("Please insert InTime & OutTime");
            }
        }
        else {
            alert("Please select a Date");
        }
    }
    else {
        alert("Please select an Employee");
    }

}


$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {

        $("#AttendanceFindForm").show().kendoWindow({
            width: "1050px",
            height: "500px",
            modal: true,
            title: "Find"
        });

        $('#AttendanceFindForm').data('kendoWindow').center().open();
      
        //LoadFindGrid();
        e.preventDefault();
    }
});

function LoadFindGrid() {

    var AttColumn = [
            {
                field: "AtnDetKy", title: "ItmRateKy", width: "70px", hidden: true
            },
            {
                field: "PrcsDetKy", title: "PrcsDetKy", width: "70px", hidden: true
            },
            {
                field: "BUKy", title: "BUKy", width: "70px", hidden: true
            },
            {
                field: "PrjKy", title: "PrjKy", width: "70px", hidden: true
            },
            
            {
                field: "EmpKy", title: "EmpKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "EmpNo", title: "EmpNo", width: "100px", attributes: { style: "text-align:center;" },
                
            },
            {
                field: "EmpNm", title: "EmpNm", width: "100px", attributes: { style: "text-align:center;" },

            },
            {
                field: "InTime", title: "InTime", width: "100px", attributes: { style: "text-align:center;" },
            },
    
            {
                field: "OutTime", title: "OutTime", width: "100px", attributes: { style: "text-align:center;" },
            },
            
            {
                field: "AtnDt", title: "AtnDt", width: "100px", attributes: { style: "text-align:center;" },
                format: "{0: dd-MM-yyyy}"
            },

            {
                field: "isPrvDay", title: "isPrvDay", width: "100px", attributes: { style: "text-align:center;" }, 
            },
            {
                field: "isNxtDay", title: "isNxtDay", width: "100px", attributes: { style: "text-align:center;" },
            },
            {
                field: "Lunchork", title: "Lunchork", width: "100px", attributes: { style: "text-align:center;" },
                
            },
            {
                field: "NonWorkDay", title: "NonWorkDay", width: "100px", attributes: { style: "text-align:center;" },

            },

         

    ];

    var gridNo = 1;
    var FinalItmSettingsColumn = setColumnProp(AttColumn, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {   
  
    var EmpKy = $("#HdrSec1_CmbEmpNofind_cd").data('kendoComboBox').value();
    if (EmpKy == "" || EmpKy == null) { EmpKy = 1; }

    var FrmDt = $("#HdrSec1_DatPicFrmDt_Val").val();
    var ToDt = $("#HdrSec1_DatPicToDt_Val").val();


    if (gridNo == 1) {
        try {
            $('#grid').data().kendoGrid.destroy();
            $('#grid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlAttendance_SearchSelectweb, // '@Url.Action("Attendance_SearchSelectweb", "Attendence")',
                    
                    dataType: "json",
                    type: "POST",
                    //complete: function (data) { },
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'EmpKy': EmpKy,
                            'FrmDt': FrmDt,
                            'ToDt': ToDt
                        })
                    }
                }

            },
            batch: true,
            pageSize: 10,

            schema: {
                model: {
                    id: "AtnDetKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        AtnDetKy: { editable: false, nullable: false, type: "number" },
                        PrcsDetKy: { editable: false, nullable: false, type: "number" },
                        BUKy: { editable: false, nullable: false, type: "number" },
                        PrjKy: { editable: false, nullable: false, type: "number" },
                        EmpNo: {
                            editable: false, nullable: false, type: "string",
                        }, 
                        EmpKy: { editable: false, nullable: false, type: "number", },
                        EmpNm: {
                            editable: false, nullable: false, type: "string",
                        },
                        InTime: { editable: false, nullable: true, type: "string" },
                        OutTime: { editable: false, nullable: true, type: "string" },
                        
                        isPrvDay: { editable: false, nullable: false, type: "boolean" },
                        isNxtDay: { editable: true, nullable: false, type: "boolean" },
                        Lunchork: { editable: false, nullable: false, type: "boolean" },
                        NonWorkDay: { editable: false, nullable: false, type: "boolean" },
                        AtnDt: { editable: false, nullable: false, type: "string" },
                    }
                }
            }
        });


        $("#grid").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },
            columns: columnsFinal,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            edit: function (e) {                
           
            },                 

            editable: true,
        });             

    } 
}



$("#grid").on("dblclick", "tr.k-state-selected", function () {

    var id = ("#grid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    PrjKy = selectedItem.PrjKy;
    LoadTaskCombo();

    var AtnDt = selectedItem.AtnDt;
    AtnDetKy = selectedItem.AtnDetKy;
    var EmpKy = selectedItem.EmpKy;
    var BUKy = selectedItem.BUKy;

    var InTime = selectedItem.InTime;
    var OutTime = selectedItem.OutTime;
    var isPrvDay = selectedItem.isPrvDay;
    var isNxtDay = selectedItem.isNxtDay;


    var PrcsDetKy = selectedItem.PrcsDetKy;


    $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value(EmpKy);
    $("#HdrSec1_CmbEmpNm_Nm").data('kendoComboBox').value(EmpKy);
    $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').value(PrjKy);
    $("#HdrSec1_CmbTask_Nm").data('kendoComboBox').value(PrcsDetKy);
    $("#HdrSec1_CmbBU_Nm").data('kendoComboBox').value(BUKy);

    
    $("#HdrSec1_DatPicAttDt_Val").data("kendoDatePicker").value(AtnDt);


    if (isPrvDay == 1) {
        $("#HdrSec1_chkPrvDt_val").prop("checked", true);
    } else {
        $("#HdrSec1_chkPrvDt_val").prop("checked", false);
    }
    if (isNxtDay == 1) {
        $("#HdrSec1_chkNxtDt_val").prop("checked", true);
    } else {
        $("#HdrSec1_chkNxtDt_val").prop("checked", false);
    }

    $('#HdrSec1_TmPicIn_val').val(InTime);
    $('#HdrSec1_TmPicOut_val').val(OutTime);

  

    $('#AttendanceFindForm').data('kendoWindow').close();

});





