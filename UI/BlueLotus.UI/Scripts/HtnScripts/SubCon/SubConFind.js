$(document).ready(function () {
    setdefault();
    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#FindFormGridPayment").height('40vh');
    $('.k-grid-content .k-auto-scrollable').css('height', '24.5vh');
    $(".k-datepicker, .k-combobox, .k-numerictextbox").css('width', "100%");
    //LoadGridWithColumnProp();
});

function setdefault() {
    $('#HdrSec3_FF_Chkbox_IsRec_Val').prop('checked', false);
    var todayDate = new Date();
    $('#HdrSec4_Dat_FF_Todt_Val').data("kendoDatePicker").value(todayDate);
    $('#HdrSec4_Dat_FF_FromDate_Val').data("kendoDatePicker").value("");
    //document.getElementById("TrnNo").value == "";
    document.getElementById("HdrSec4_Inpt_FF_DocNo_Val").value = "";
}

$("#HdrSec4_Dat_FF_FromDate_Val").kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(31, 2, 2009),
});

$("#HdrSec4_Dat_FF_Todt_Val").kendoDatePicker({

    format: "yyyy/MM/dd",
    min: new Date(2009, 2, 31)
});


function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    AccTrnKy: { editable: true, nullable: false, type: "number" },
                    Prefix: { editable: true, nullable: false, type: "string" },
                    TrnNo: { editable: true, nullable: false, type: "string" },
                    TrnDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                    DocNo: { editable: true, nullable: false, type: "string" },
                    AdrId: { editable: true, nullable: true, type: "string" },
                    AdrNm: { editable: true, nullable: true, type: "string" },
                    PrjKy: { editable: true, nullable: false, type: "string" },
                    PrjId: { editable: true, nullable: false, type: "string" },
                    PrjNm: { editable: true, nullable: false, type: "string" },
                    AccKy: { editable: true, nullable: false, type: "number" },
                    AdrKy: { editable: true, nullable: false, type: "number" },
                }
            }
        }
    });

    $("#FindFormGridPayment")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            columnMenu: true,
            editable: false,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}

function onDataBound(e) {
    var id = ("#FindFormGridPayment");
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].IsAct == 0) {
            grid.tbody.find("tr[data-uid='" + dataSource[i].uid + "']").hide();
        }
    }
}

function FindGridDefaultColumns() {
    var columnsDefine = [
        {
            field: "AccTrnKy",
            title: "AccTrnKy",
            width: "100px",
            hidden: "False",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "LiNo",
            title: "LiNo",
            width: "40px",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Prefix",
            title: "Prefix",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "TrnNo",
            title: "TrnNo",
            width: "100px",
            //hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "TrnDt",
            title: "TrnDt",
            format: "{0:MM/dd/yyyy}",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "DocNo",
            title: "DocNo",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrId",
            title: "AdrId",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrNm",
            title: "AdrNm",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },

        {
            field: "PrjKy",
            title: "PrjKy",
            width: "70px",
            //hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjId",
            title: "PrjId",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjNm",
            title: "PrjNm",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AccKy",
            title: "AccKy",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrKy",
            title: "AdrKy",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        }

    ];


    var gridNo = 2;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FindFormGridPayment', gridNo);
}


function Search() {


    var Prefix = $("#HdrSec4_Cmb_FF_TrnNo_Cd").val();
    if (Prefix == null || Prefix == "" || Prefix == undefined) {
        Prefix = 1;
    }


    var FrmDt = $("#HdrSec4_Dat_FF_FromDate_Val").val();
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1/1/1900";
    }


    var ToDt = $("#HdrSec4_Dat_FF_Todt_Val").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "1/1/2078";
    }

    var TrnNo = $("#HdrSec4_Cmb_FF_TrnNo_Val").val();

    if (TrnNo == undefined || TrnNo == "" || TrnNo == null) {
        var TrnNo = null;
    }
    var AccKy = $("#HdrSec4_Cmb_FF_Acc_Cd").data("kendoComboBox").value();
    if (!AccKy || AccKy == "") {
        AccKy = 1;
    }
    var PrjKy = $("#HdrSec4_Cmb_FF_Prj_Cd").data("kendoComboBox").value();
    if (!PrjKy || PrjKy == "") {
        PrjKy = 1;
    }
    var IsRec = 0;
    var DocNo = $("#HdrSec4_Inpt_FF_DocNo_Val").val();
    if (DocNo == undefined || DocNo == "" || DocNo == null) {
        var DocNo = '';
    }
    var IsPrnt = 0;
    var ourcd = viewBag.OurCd;
    var Adrky = $("#HdrSec4_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value();
    if (!Adrky || Adrky == "") {
        Adrky = 1;
    }
    var ApprKy = 1;
    if (!ApprKy || ApprKy == "") {
        ApprKy = 1;
    }
    var BU = 1;
    var UrRef = null;
    $.ajax({
        url: urlGetJournalFind,
        data: JSON.stringify({
            FrmDt: FrmDt,
            ToDt: ToDt,
            TrnNo: TrnNo,
            AccKy: AccKy,
            PrjKy: PrjKy,
            IsRec: IsRec,
            DocNo: DocNo,
            IsPrnt: IsPrnt,
            OurCode: ourcd,
            Prefix: Prefix,
            Adrky: Adrky,
            UrRef: UrRef,
            ApprKy: ApprKy,
            BU: BU

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length == 0) {
                alert("No data to Load");
                return;
            }
            $('#FindFormGridPayment').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGridPayment").data("kendoGrid");
            grid.dataSource.data([]);
            var j = 1;
            for (i = 0; i < data.length; i++) {

                $("#FindFormGridPayment").data("kendoGrid").dataSource.add({
                    Lino: j,
                    TrnKy: data[i].TrnKy,
                    Prefix: data[i].Prefix,
                    TrnNo: data[i].SttrnNo,
                    TrnDt: data[i].TrnDt,
                    DocNo: data[i].docno,
                    AdrId: data[i].AdrID,
                    AdrNm: data[i].AdrNm,
                    PrjId: data[i].PrjID,
                    PrjNm: data[i].PrjNm,
                    PrjKy: data[i].PrjKy,
                    AccKy: data[i].AccKy,
                    AdrKy: data[i].AdrKy
                });
                j++
            }

        },
        error: function (e) {
            return false;
        }
    });

}


$("#FindFormGridPayment").on("dblclick", "tr.k-state-selected", function () {

    var grid = $('#FindFormGridPayment').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    FormGlblData.selectedIndex = grid.select().index();
    //  alert("Index " + FormGlblData.selectedIndex)


    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    $("#pager").data("kendoPager").dataSource.data([]);
    var destinationgrid = $('#pager').data('kendoPager'); // DESTINATION Pager
    for (var i = 0; i < DataSource.length; i++) {
        destinationgrid.dataSource.add(DataSource[i]);
    }
    destinationgrid.dataSource.page(FormGlblData.selectedIndex + 1);
    destinationgrid.refresh();
    //var DataSource = $('#pager').data('kendoGrid').dataSource.data();
    //alert(JSON.stringify(DataSource))

    //return
    // alert("The Row Is SELECTED at index: " + grid.select().index());
    var TrnKy = selectedItem.TrnKy;
    var AccKy = selectedItem.AccKy;
    if (!AccKy) {
        AccKy = 1;
    }
    var PrjKy = selectedItem.PrjKy;
    if (!PrjKy) {
        PrjKy = 1;
    }
    var AdrKy = selectedItem.AdrKy;
    if (!AdrKy) {
        AdrKy = 1;
    }
    var TrnDt = selectedItem.TrnDt;


    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
        FormGlblData.TrnKy = TrnKy;
     //   SetTrnHdrApr_LatestState(TrnKy, FormGlblData.TrnTypKy, 'TrnHdr');
        GetAlldata(TrnKy, AccKy, PrjKy, AdrKy, TrnDt);

    } else {
        alert("please Select Any Trancsaction");
    }
});

function Ok1() {

    ClearAll();
    var grid = $('#FindFormGridPayment').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    FormGlblData.selectedIndex = grid.select().index();

    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    $("#pager").data("kendoPager").dataSource.data([]);
    var destinationgrid = $('#pager').data('kendoPager'); // DESTINATION Pager
    for (var i = 0; i < DataSource.length; i++) {
        destinationgrid.dataSource.add(DataSource[i]);
    }
    destinationgrid.dataSource.page(FormGlblData.selectedIndex + 1);
    destinationgrid.refresh();

    var TrnKy = selectedItem.TrnKy;
    var AccKy = selectedItem.AccKy;
    if (!AccKy) {
        AccKy = 1;
    }
    var PrjKy = selectedItem.PrjKy;
    if (!PrjKy) {
        PrjKy = 1;
    }
    var AdrKy = selectedItem.AdrKy;
    if (!AdrKy) {
        AdrKy = 1;
    }
    var TrnDt = selectedItem.TrnDt;

    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {

        FormGlblData.TrnKy = TrnKy;
       // SetTrnHdrApr_LatestState(TrnKy, FormGlblData.TrnTypKy, 'TrnHdr');

        GetAlldata(TrnKy, AccKy, PrjKy, AdrKy, TrnDt);

    } else {
        alert("please Select Any Trancsaction");
    }
}

function Clear() {
    var grid = $("#FindFormGridPayment").data("kendoGrid");
    grid.dataSource.data([]);
    $("#HdrSec4_Dat_FF_FromDate_Val").val(null);
    $("#HdrSec4_Inpt_FF_DocNo_Val").val(null);
    $("#HdrSec4_Inpt_FF_YurRef_Val").val(null);
    // $("#HdrSec4_Cmb_FF_AprStatesAction_Val").data('kendoComboBox').value(null);
    $("#HdrSec4_Cmb_FF_TrnNo_Cd").data('kendoComboBox').value(null);
    $("#HdrSec4_Cmb_FF_TrnNo_Val").val(null);
    $("#HdrSec4_Cmb_FF_Acc_Cd").data('kendoComboBox').value(null);
    $("#HdrSec4_Cmb_FF_Acc_Nm").data('kendoComboBox').value(null);
    $("#HdrSec4_Cmb_FF_HdrAdr_Cd").data('kendoComboBox').value(null);
    $("#HdrSec4_Cmb_FF_HdrAdr_Nm").data('kendoComboBox').value(null);
    $("#HdrSec4_Cmb_FF_Prj_Cd").data('kendoComboBox').value(null);
    $("#HdrSec4_Cmb_FF_Prj_Nm").data('kendoComboBox').value(null);
}

function GetAlldata(Trnky, AccKy, PrjKy, AdrKy,Date) {

    $.ajax({
        url: UrlLoadGrid,
        data: JSON.stringify({
            TrnTypKy: FormGlblData.TrnTypKy,
            Trnky: FormGlblData.TrnKy,
            AccKy: AccKy,
            PrjKy: PrjKy,
            ObjKy: viewBag.ObjKy,
            adrKy: AdrKy,
            Dt: Date
        }),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length == 0) {
                alert("No Data To show");
                return;
            } else {
                var grid = $('#SubConGrid').data("kendoGrid"),
                    dataSource = new kendo.data.DataSource({
                        data: data
                    });
                grid.setDataSource(dataSource);
                $('#SubConGrid').data('kendoGrid').dataSource.read();
                $('#SubConGrid').data('kendoGrid').dataSource.pageSize(parseInt(10));
                $('#SubConGrid').data('kendoGrid').refresh();
            }
            $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(data[0].PrjKy);
            $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(data[0].PrjKy);
            $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value(data[0].AccKy);
            $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value(data[0].AccKy);
            $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value(data[0].Hdrderail.AdrKy);
            $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value(data[0].Hdrderail.AdrKy);
            document.getElementById("HdrSec1_InptDocNo_Val").value = data[0].Hdrderail.DocNo;
            document.getElementById("HdrSec1_DatVouDate_Val").value = data[0].Hdrderail.TrnDt;
            document.getElementById("HdrSec1_InptVouNo_Val").value = data[0].Hdrderail.TrnNo;


            $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").enable(false),
            $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").enable(false),
            $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").enable(false),
            $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").enable(false),
            document.getElementById('HdrSec1_InptDocNo_Val').readOnly = true;
            try {
                $("#FindFormPayment").data("kendoWindow").close();


            } catch (e) {

            }


        },
        error: function (e) {
            return false;
        }
    });

}

$(document.body)
    .keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 70) {
            e.preventDefault();
            try {
                $("#FindFormGrid").data("kendoGrid").dataSource.filter(null);
                $("#FindFormGrid").data("kendoGrid").dataSource.data([]);
            } catch (e) {

            }

            $("#FindFormPayment")
                .show()
                .kendoWindow({
                    width: "80%",
                    height: "75%",
                    modal: true,
                    title: "Find Form"
                });

            $("#FindFormPayment").data("kendoWindow").center().open();
        }
    });



//Hdr Accounts
function LoadHdrAccount() {
    //Account Dropdown id
    $("#HdrSec4_Cmb_FF_Acc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: AccCd_SelectMob_Datasource("HdrSec4_Cmb_FF_Acc"), //AccountCodeDatasource('HdrSec2_CmbHdrAcc'),

            change: function (e) {
                var cmb = $("#HdrSec4_Cmb_FF_Acc_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy == 1 || AccKy == "") {
                    $("#HdrSec4_Cmb_FF_Acc_Nm").data("kendoComboBox").value("");
                    //$("#HdrSec4_Cmb_FF_Acc_Cd").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");

                }
                if (AccKy != "" && AccKy != 1) {
                    var validate = ComboValidations("HdrSec4_Cmb_FF_Acc_Cd");
                    if (validate) {
                        $("#HdrSec4_Cmb_FF_Acc_Nm").data("kendoComboBox").value(AccKy);
                        //$("#HdrSec4_Cmb_FF_Acc_Cd").data("kendoComboBox").value(AccKy);
                        GetAccountDetailByAccKy(AccKy);
                    } else {
                        $("#HdrSec4_Cmb_FF_Acc_Nm").data("kendoComboBox").value("");
                        $("#HdrSec4_Cmb_FF_Acc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
                        $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Accounts.."
        });
    //Account Dropdown Name
    $("#HdrSec4_Cmb_FF_Acc_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNm",
            dataSource: AccNm_SelectMob_Datasource('HdrSec4_Cmb_FF_Acc'),
            change: function (e) {
                var cmb = $("#HdrSec4_Cmb_FF_Acc_Nm").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy == 1 || AccKy == "") {
                    //$("#HdrSec4_Cmb_FF_Acc_Nm").data("kendoComboBox").value("");
                    $("#HdrSec4_Cmb_FF_Acc_Cd").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
                }
                if (AccKy != "" && AccKy != 1) {
                    var validate = ComboValidations("HdrSec4_Cmb_FF_Acc_Nm");
                    if (validate) {
                        //$("#HdrSec4_Cmb_FF_Acc_Nm").data("kendoComboBox").value(AccKy);
                        $("#HdrSec4_Cmb_FF_Acc_Cd").data("kendoComboBox").value(AccKy);
                        //GetAccountDetailByAccKy(AccKy);

                    } else {
                        $("#HdrSec4_Cmb_FF_Acc_Nm").data("kendoComboBox").value("");
                        $("#HdrSec4_Cmb_FF_Acc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
                        $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Accounts.."
        });

    //Project Code Drop Bottom
    $("#HdrSec4_Cmb_FF_Prj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjId",
            dataSource: PrjId_SelectMob_DataSource("HdrSec2_CmbPrj"), //ProjectCd('HdrSec2_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec4_Cmb_FF_Prj_Cd").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec4_Cmb_FF_Prj_Cd");
                    if (validate) {
                        $("#HdrSec4_Cmb_FF_Prj_Nm").data("kendoComboBox").value(PrjKy);
                    } else {
                        $("#HdrSec4_Cmb_FF_Prj_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Project"
        });
    //Project Name Drop Bottom
    $("#HdrSec4_Cmb_FF_Prj_Nm")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjNm",
            dataSource: PrjNm_SelectMob_DataSource("HdrSec2_CmbPrj"), // ProjectNm('HdrSec2_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec4_Cmb_FF_Prj_Nm").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec4_Cmb_FF_Prj_Nm");
                    if (validate) {
                        $("#HdrSec4_Cmb_FF_Prj_Cd").data("kendoComboBox").value(PrjKy);
                    } else {
                        $("#HdrSec4_Cmb_FF_Prj_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Project"
        });



    $("#HdrSec4_Cmb_FF_HdrAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrID",
            dataSource: AdrID_SelectMob_DataSource("HdrSec4_Cmb_FF_HdrAdr"),
            change: function (e) {
                var cmb = $("#HdrSec4_Cmb_FF_HdrAdr_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec4_Cmb_FF_HdrAdr");
                    if (validate) {

                        $("#HdrSec4_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec4_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value(AkkKy);

                    } else {

                        $("#HdrSec4_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value("");
                        $("#HdrSec4_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Address"
        })
    $("#HdrSec4_Cmb_FF_HdrAdr_Nm")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrNm",// AdrID_SelectMob_DataSource(ObjNm)
            dataSource: AdrNm_SelectMob_DataSource('HdrSec4_Cmb_FF_HdrAdr'),
            change: function (e) {
                var cmb = $("#HdrSec4_Cmb_FF_HdrAdr_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec4_Cmb_FF_HdrAdr");
                    if (validate) {
                        $("#HdrSec4_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec4_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value(AkkKy);

                    } else {

                        $("#HdrSec4_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value("");
                        $("#HdrSec4_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Address"
        })

    $("#HdrSec4_Cmb_FF_TrnNo_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: Code_SelectMob_Datasource("HdrSec4_Cmb_FF_TrnNo"),
            change: function (e) {
                var cmb = $("#HdrSec4_Cmb_FF_TrnNo_Cd").data("kendoComboBox");
                var val = cmb.value();

                if (isNaN(val)) {
                    alert("'" + val + "' is not a Valid input");
                    cmb.value("");
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "prefix"
        })


    $("#HdrSec4_Cmb_FF_Acc_Cd").parent().css("width", "40%");
    $("#HdrSec4_Cmb_FF_Acc_Nm").parent().css("width", "50%");
    $("#HdrSec4_Cmb_FF_Prj_Cd").parent().css("width", "40%");
    $("#HdrSec4_Cmb_FF_Prj_Nm").parent().css("width", "50%");

}


function btnCal1() {

    $("#FindFormJournal").data("kendoWindow").close();
}

//____________________Kendo Pager Action


//<!-- navigation script end -->

var dataSource = new kendo.data.DataSource({
    data: [],
    pageSize: 1,
    schema: {
        model: {
            id: "TrnKy",
            fields: //Relavent fields of the grid should be bind with following model items
            {
                TrnKy: { editable: true, nullable: false, type: "number" },
            }
        }
    }
});

$("#pager").kendoPager({
    dataSource: dataSource,
    buttonCount: 1,
    pageSize: 1,
    messages: {
        previous: "Go to Next Transaction",
        next: "Go to Previous Transaction",
        last: "Go to First Transaction",
        first: "Go to Last Transaction",
        display: "{0} of {2} Transaction"


    }
});

dataSource.read();


//<!-- navigation script end -->


$(".k-icon.k-i-arrow-e").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }

    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    var getnett = FormGlblData.selectedIndex + 1;
    GetRecord(getnett);
    if (FormGlblData.selectedIndex < DataSource.length) {
        FormGlblData.selectedIndex = getnett;
    }
    //right Arrow
});

$(".k-icon.k-i-seek-e").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    var getnett = DataSource.length - 1;
    GetRecord(getnett);
    FormGlblData.selectedIndex = getnett;



    //Last was clicked


});

$(".k-icon.k-i-arrow-w").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    var getnett = FormGlblData.selectedIndex - 1;
    GetRecord(getnett);
    if (getnett > 0) {
        FormGlblData.selectedIndex = getnett;

    }

    //  alert("Left was clicked.");

});

$(".k-icon.k-i-seek-w").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    GetRecord(0);
    FormGlblData.selectedIndex = 0;
    // alert(FormGlblData.selectedIndex)

    // alert("First was clicked.");

});


function GetRecord(IndexNo) {
    // alert(IndexNo)
    try {
        var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
        if (DataSource == []) {
            alert("Please Select a Filtering criteria");
        } else {
            if (IndexNo >= DataSource.length) {
                return;
            }
            TrnKy = DataSource[IndexNo].TrnKy;
            Date = DataSource[IndexNo].TrnDt;

            GetAlldata(TrnKy, AccKy, PrjKy, AdrKy, Date);
            // alert(JSON.stringify(DataSource[0]));
        }
    } catch (e) {
        alert("Network error,Please Reload the page");


    }



}


function GetRecord(IndexNo) {
    //   alert(IndexNo);
    ClearAll();

    try {
        var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
        if (DataSource == []) {
            alert("Please Select a Filtering criteria");
        } else {
            if (IndexNo >= DataSource.length) {
                return;
            }
            var TrnKy = DataSource[IndexNo].TrnKy;
            var AccKy = 1;
            var PrjKy = 1;
            var AdrKy = 1;
            FormGlblData.TrnKy = TrnKy;
            var date = DataSource[IndexNo].TrnDt;
            GetAlldata(TrnKy, AccKy, PrjKy, AdrKy, date);



        }
    } catch (e) {
        alert("Network error,Please Reload the page");


    }



}