$(document)
    .ready(function () {
        //LoadComboFindForm1();
        //prefixLoad();
        //setdefault();
        //var height = $(window).height() - 70;
        //var h2 = $("#filterCont").height();
        //$("#body").height(height);
        //$("#grid").height(height - (35 + h2 + 40));
        //$(".k-datepicker, .k-combobox, .k-numerictextbox").css("width", "100%");
    });

function load_FindFormJournal_IsOpen() {
    prefixLoad();
    setdefault();
    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#grid").height(height - (35 + h2 + 40));
    $(".k-datepicker, .k-combobox, .k-numerictextbox").css("width", "100%");
}

//Set Default Values to Journal
function setdefault() {

    $("#HdrSec2_ChkboxIsRec_Val").prop("checked", false);
    var todayDate = new Date();
    $("#ToDt").data("kendoDatePicker").value(todayDate);
    $("#FrmDt").data("kendoDatePicker").value("");
    document.getElementById("TrnNo").value == "";
    document.getElementById("DocumentNo").value = "";

}

function prefixLoad() {

    $("#Prefix").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_Selectweb(),
        change: function (e) {

            var cmb = $("#Prefix").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Prefix"
    });
}

function Code_Selectweb() {
    var dataSource = new kendo.data.DataSource(
     {
         transport: {
             read: {
                 url: urlFindJournal,
                 data: { ConCd: "PreFix" },
                 dataType: "json",

             }
         }
     });
    return dataSource;
}

$("#FrmDt")
    .kendoDatePicker({
        format: "yyyy/MM/dd",
        min: new Date(31, 2, 2009)
    });

$("#ToDt")
    .kendoDatePicker({
        format: "yyyy/MM/dd",
        min: new Date(2009, 2, 31)
    });

//Load Find Grid
function LoadGridFindView() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "TrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: true, nullable: false, type: "number" },
                    Prefix: { editable: true, nullable: false, type: "string" },
                    TrnNo: { editable: true, nullable: false, type: "string" },
                    TrnDt: { editable: true, nullable: false, type: "date" },
                    HdrSec1_InptDocNo_Val: { editable: true, nullable: false, type: "string" },
                    AdrId: { editable: true, nullable: true, type: "string" },
                    AdrNm: { editable: true, nullable: true, type: "string" },
                    PrjId: { editable: true, nullable: false, type: "string" },
                    PrjNm: { editable: true, nullable: false, type: "string" },
                }
            }
        }
    });

    $("#FindFormGrid")
        .kendoGrid({
            dataSource: dataSource,
            autobind: true,
            navigatable: true,
            filterable: {
                mode: "row"
            },
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,
            selectable: "column",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

            columns: [
                {
                    field: "Lino",
                    title: "LiNo",
                    width: "50px",
                },
                {
                    field: "TrnKy",
                    title: "Ref #",
                    width: "100px",
                    hidden: true,
                },
                {
                    field: "Prefix",
                    title: "Prefix",
                    width: "50px",

                },
                {
                    field: "TrnNo",
                    title: "TrnNo",
                    width: "100px",
                },
                {
                    field: "TrnDt",
                    title: "TrnDt",
                    width: "100px",
                    format: "{0: MM-dd-yyyy}",
                    template: "#= kendo.toString(kendo.parseDate(TrnDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
                },
                {
                    field: "HdrSec1_InptDocNo_Val",
                    title: "HdrSec1_InptDocNo_Val",
                    width: "100px",

                },
                {
                    field: "AdrId",
                    title: "AdrId",
                    width: "100px",
                },
                {
                    field: "AdrNm",
                    title: "AdrNm",
                    width: "100px",
                },
                {
                    field: "PrjId",
                    title: "PrjId",
                    width: "100px",
                },
                {
                    field: "PrjNm",
                    title: "PrjNm",
                    width: "100px",
                },
            ],
            resizable: true,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            editable: false
        });
}


//project ChekBox Hanler
function PrjChkChange() {

    if (document.getElementById("PrjChk").checked) {
        ProjectLoad();
        document.getElementById("PrjChk").disabled = true;
    }

}
//Account ChekBox Hanler
function AccChkChange() {

    if (document.getElementById("AccChk").checked) {
        loadAcc();
        document.getElementById("AccChk").disabled = true;
    }

}
//project LOader
function ProjectLoad() {
    //Project Code Drop Bottom
    $("#PrjCd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjCd",
            dataSource: {
                type: "POST",
                transport: {
                    read: urlGetPrjCd //readcontroler and action
                }
            },
            change: function (e) {
                var cmb = $("#PrjCd").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("PrjCd");
                    if (validate) {
                        $("#PrjCd").data("kendoComboBox").value(PrjKy);
                        $("#PrjNm").data("kendoComboBox").value(PrjKy);
                    } else {

                        $("#PrjCd").data("kendoComboBox").value("");
                        $("#PrjNm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Project"
        });
    //Project Name Drop Bottom
    $("#PrjNm")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjNm",
            dataSource: {
                type: "POST",
                transport: {
                    read: urlGetPrjNm //readcontroler and action
                }
            },
            change: function (e) {
                var cmb = $("#PrjNm").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("PrjNm");
                    if (validate) {

                        $("#PrjCd").data("kendoComboBox").value(PrjKy);
                        $("#PrjNm").data("kendoComboBox").value(PrjKy);

                    } else {

                        $("#PrjCd").data("kendoComboBox").value("");
                        $("#PrjNm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Project"
        });

}
function AccCodeLoad() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropCode,
                data: {
                    ObjKy: viewBag.ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
function AccNameLoad() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropNm,
                data: {
                    ObjKy: viewBag.ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//Load Accounts
function loadAcc() {

    //Accounts Code Drop Bottom
    $("#AccCode")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCode",
            dataSource: AccCodeLoad(),
            change: function (e) {
                var cmb = $("#AccCode").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec2_CmbCurency_Cd");
                    if (validate) {

                        $("#AccCode").data("kendoComboBox").value(AkkKy);
                        $("#AccName").data("kendoComboBox").value(AkkKy);

                    } else {

                        $("#AccCode").data("kendoComboBox").value("");
                        $("#AccName").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Account"
        });
    //Accounts Name Drop Bottom
    $("#AccName")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNM",
            dataSource: AccNameLoad(),
            change: function (e) {
                var cmb = $("#AccName").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("AccName");
                    if (validate) {

                        $("#AccName").data("kendoComboBox").value(AkkKy);
                        $("#AccCode").data("kendoComboBox").value(AkkKy);

                    } else {

                        $("#AccCode").data("kendoComboBox").value("");
                        $("#AccName").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Account"
        });

}

function Search() {

    var Prefix = $("#Prefix").val();
    if (Prefix == null || Prefix == "" || Prefix == undefined) {
        Prefix = 1;
    }

    var FrmDt = $("#FrmDt").val();
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1/1/1900";
    }

    var ToDt = $("#ToDt").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "1/1/2078";
    }

    var TrnNo = $("#TrnNo").val();

    if (TrnNo == undefined || TrnNo == "" || TrnNo == null) {
        var TrnNo = null;
    }
    var AccKy = 1;
    var PrjKy = 1;
    var AccChk = ($("#AccChk").is(":checked")) ? 1 : 0;
    if (AccChk == 1) {
        AccKy = $("#AccCode").data("kendoComboBox").value();
    }
    if (!AccKy || AccKy == "") {
        AccKy = 1;
    }

    var PrjChk = ($("#PrjChk").is(":checked")) ? 1 : 0;
    if (PrjChk) {
        PrjKy = $("#PrjCd").data("kendoComboBox").value();
    }
    if (!PrjKy || PrjKy == "") {
        PrjKy = 1;
    }

    var HdrSec2_ChkboxIsRec_Val = ($("#IsRec").is(":checked")) ? 1 : 0;

    var HdrSec1_InptDocNo_Val = $("#DocumentNo").val();
    if (HdrSec1_InptDocNo_Val == undefined || HdrSec1_InptDocNo_Val == "" || HdrSec1_InptDocNo_Val == null) {
        var HdrSec1_InptDocNo_Val = "";
    }
    var IsPrnt = ($("#IsPrnt").is(":checked")) ? 1 : 0;

    $.ajax({
        url: urlGetJournalFind,
        data: JSON.stringify({
            FrmDt: FrmDt,
            ToDt: ToDt,
            TrnNo: TrnNo,
            AccKy: AccKy,
            PrjKy: PrjKy,
            IsRec: HdrSec2_ChkboxIsRec_Val,
            DocNo: HdrSec1_InptDocNo_Val,
            IsPrnt: IsPrnt,
            OurCode: OurCode,
            Prefix: Prefix

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            LoadGridFindView();
            $("#FindFormGrid").data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGrid").data("kendoGrid");
            grid.dataSource.data([]);
            var j = 1;
            for (i = 0; i < data.length; i++) {

                $("#FindFormGrid")
                    .data("kendoGrid")
                    .dataSource.add({
                        Lino: j,
                        TrnKy: data[i].TrnKy,
                        Prefix: data[i].Prefix,
                        TrnNo: data[i].SttrnNo,
                        TrnDt: data[i].TrnDt,
                        HdrSec1_InptDocNo_Val: data[i].docno,
                        AdrId: data[i].AdrID,
                        AdrNm: data[i].AdrNm,
                        PrjId: data[i].PrjID,
                        PrjNm: data[i].PrjNm
                    });
                j++;
            }

        },
        error: function (e) {
            return false;
        }
    });

}

$("#FindFormGrid")
    .on("dblclick",
        "tr.k-state-selected",
        function () {

            var grid = $("#FindFormGrid").data().kendoGrid;
            var selectedItem = grid.dataItem(grid.select());
            var TrnKy = selectedItem.TrnKy;

            if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
                FormGlblData.ISNeworUpdateTranction = 0;
                SetTrnDate();
                GetHdrDetailGrnFrmFind(TrnKy);

            } else {
                alert("please Select Any Trancsaction");
            }
        });

function Ok1() {

    var grid = $("#FindFormGrid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var TrnKy = selectedItem.TrnKy;
    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {

        GetHdrDetailGrnFrmFind(TrnKy);

    } else {
        alert("please Select Any Trancsaction");
    }
}

function GetHdrDetailGrnFrmFind(TrnKy) {

    $.ajax({
        url: urlSelected,
        data: JSON.stringify({
            TrnKy: TrnKy,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var TrnsKy = data[0].TrnKy;
                FormGlblData.TrnKy = TrnsKy;

                var TimStmp = data[0].TimeStamp;
                FormGlblData.TimeStamp = TimStmp;


                var TrnNo = data[0].TrnNo;
                $("#HdrSec1_InptVouNo_Val").val(TrnNo);

                var HdrSec1_InptDocNo_Val = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(HdrSec1_InptDocNo_Val);

                var YurRef = data[0].YurRef;
                $("#HdrSec2_InptYrref_Val").val(YurRef);

                var TrnDt = data[0].TrnDt;                
                $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(TrnDt);
                FormGlblData.FromFindDate = TrnDt;

                var TrnCrnKy = data[0].TrnCrnKy;
                $("#HdrSec2_CmbCurency_Cd").data("kendoComboBox").value(TrnCrnKy);

                var TrnExRate = data[0].TrnExRate;
                $("#HdrSec2_InptExRate_Val").val(TrnExRate);

                var isRec = data[0].isRec;
                $("#HdrSec2_ChkboxIsRec_Val").prop("checked", isRec);
                if (isRec) {
                    FormGlblData.IsRecState = 1;
                } else {
                    FormGlblData.IsRecState = 0;

                }
                BackDateFutureDateLock("HdrSec1_DatVouDate_Val");
                GetGridDetailGrn(TrnKy);

            }

        },
        error: function (e) {
            return false;
        }
    });

}

function GetGridDetailGrn(TrnKy) {

    $.ajax({
        url: urlSelectedGrid,
        data: JSON.stringify({
            TrnKy: TrnKy,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {

            var grid = $("#JournalGrid").data("kendoGrid");
            grid.dataSource.data([]);
            var Cramount;
            var Dramount;
            for (i = 0; i < data.length; i++) {
                Cramount = data[i].Ammount;
                if (data[i].Ammount < 0) {
                    Cramount = (data[i].Ammount * -1);
                    Dramount = 0;
                } else {
                    Dramount = data[i].Ammount * 1;
                    Cramount = 0;
                }

                $("#JournalGrid")
                    .data("kendoGrid")
                    .dataSource.add({
                        AccTrnKy: data[i].AccTrnKy,
                        LiNo: data[i].Lino,
                        AccKy: data[i].AccKy,
                        AccCode: data[i].AccCd,
                        AccName: data[i].AccNm,
                        AccAdrName: data[i].AdrNm,
                        AccAdrKy: data[i].AdrKy,
                        Description: data[i].Description,
                        AccCurKy: data[i].CurncyKy,
                        AccCur: data[i].CurncyCd,
                        ExRate: data[i].ExRate,
                        DrAmtGrd: Dramount,
                        CrAmtGrd: Cramount,
                        BuKy: data[i].BuKy,
                        BU: data[i].BUCode,
                        TaskKy: data[i].TaskKy,
                        TaskId: data[i].TaskId,
                        TaskNm: data[i].TaskNm,
                        ProjectNm: data[i].PrjNm,
                        ProjectKy: data[i].PrjKy,
                        HdrSec6_MADate_Cd: data[i].Dt2,
                        LCKy: data[i].LCKy,
                        LC: data[i].LCNo,
                        LoanKy: data[i].LoanKy,
                        Loan: data[i].LoanNo,
                        OrderNoKy: data[i].OrderKy,
                        OrderNo: data[i].OrderNo,
                        OrderDetKy: data[i].OrdrDetKy,
                        OrderDet: data[i].OrdrDetNo,
                        ResAdrKy: data[i].ResAdrKy,
                        ResAdr: data[i].ResAdrCode,
                        Analysys1Ky: data[i].Analysys1Ky,
                        Analysys1: data[i].Analysys1Id,
                        Analysys1Nm: data[i].Analysys1Nm,
                        Analysys2Ky: data[i].Analysys2Ky,
                        Analysys2: data[i].Analysys2Id,
                        Analysys2Nm: data[i].Analysys2Nm,
                        Analysys3Ky: data[i].usAnalysys3Ky,
                        Analysys3: data[i].Analysys3Id,
                        Analysys3Nm: data[i].Analysys3Nm,
                        Analysys4Ky: data[i].Analysys4Ky,
                        Analysys4: data[i].Analysys4Id,
                        Analysys4Nm: data[i].Analysys4Nm,
                        Analysys5Ky: data[i].Analysys5Ky,
                        Analysys5: data[i].Analysys5Id,
                        Analysys5Nm: data[i].Analysys5Nm,
                        Analysys6Ky: data[i].Analysys6Ky,
                        Analysys6: data[i].Analysys6Id,
                        Analysys6Nm: data[i].Analysys6Nm,
                        IsAct: data[i].IsAct





                    });

            }
            DefaultCal();

            $("#FindFormJournal").data("kendoWindow").close();

        },
        error: function (e) {
            return false;
        }
    });

}

function btnCal1() {

    $("#FindFormJournal").data("kendoWindow").close();
}


