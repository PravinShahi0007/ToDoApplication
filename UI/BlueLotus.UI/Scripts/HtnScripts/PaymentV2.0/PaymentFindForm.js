$(document).ready(function () {
    //LoadComboFindForm1();
    setdefault();
    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#grid").height(height - (35 + h2 + 40));
    $(".k-datepicker, .k-combobox, .k-numerictextbox").css('width', "100%");
});

function setdefault() {

    $('#IsRec').prop('checked', false);
    var todayDate = new Date();
    $('#ToDt').data("kendoDatePicker").value(todayDate);
    $('#FrmDt').data("kendoDatePicker").value("");
    document.getElementById("TrnNo").value == "";
    document.getElementById("DocumentNo").value = "";

}


$("#FrmDt").kendoDatePicker({

    format: "yyyy/MM/dd",
    min: new Date(31, 2, 2009)
});

$("#ToDt").kendoDatePicker({

    format: "yyyy/MM/dd",
    min: new Date(2009, 2, 31)
});



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
                    DocNo: { editable: true, nullable: false, type: "string" },
                    AdrId: { editable: true, nullable: true, type: "string" },
                    AdrNm: { editable: true, nullable: true, type: "string" },
                    PrjId: { editable: true, nullable: false, type: "string" },
                    PrjNm: { editable: true, nullable: false, type: "string" },
                }
            }
        }
    });

    $("#FindFormGrid").kendoGrid({
        dataSource: dataSource,
        autobind: true,

        navigatable: true,
        filterable: {
            mode: "row"
        },
        columnHide: createFilterRow,
        columnShow: createFilterRow,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,

        selectable: "column",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },


        columns: [
             {
                 field: "Lino", title: "LiNo", width: "50px",
             },

                 {
                     field: "TrnKy", title: "Ref #", width: "100px", hidden: true,
                 },
                  {
                      field: "Prefix", title: "Prefix", width: "50px",

                  },
               {
                   field: "TrnNo",
                   title: "TrnNo",
                   width: "100px",
               },


           {
               field: "TrnDt", title: "TrnDt", width: "100px", format: "{0: MM-dd-yyyy}",
               template: "#= kendo.toString(kendo.parseDate(TrnDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
           },
            {
                field: "DocNo", title: "DocNo", width: "100px",

            },
            {
                field: "AdrId", title: "AdrId", width: "100px",
            },

           {
               field: "AdrNm", title: "AdrNm", width: "100px",
           },
          {
              field: "PrjId", title: "PrjId", width: "100px",
          },
           {
               field: "PrjNm", title: "PrjNm", width: "100px",
           },
        ],

        resizable: true,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },

        editable: false
    });
    createFilterRow();
}







//filter

function createFilterRow() {
    var grid = $('#FindFormGrid').data('kendoGrid');

    var oldRow = grid.thead.find("#grid-filter-row");
    var th;

    if (typeof oldRow === 'object') {
        th = oldRow.find('th');
        oldRow.remove();
    }

    var filterRow = "<tr id='grid-filter-row'>";

    for (var i = 0; i < grid.dataSource.group().length; i++) {
        filterRow += '<th class="k-group-cell k-header">&nbsp;</th>';
    }
    for (var i = 0; i < th.length; i++) {
        filterRow += th[i].outerHTML;
    }
    for (var i = 0; i < grid.columns.length; i++) {
        if (!grid.columns[i].hidden)
            filterRow += '<td><input type=\'search\' id=\'gridId-filter-column-' + grid.columns[i].field + '\' style=\'width:98%\' /></td>';
    }
    filterRow += '</tr>';
    grid.thead.append(filterRow);

    var searchField;
    for (i = 0; i < grid.columns.length; i++) {
        if (!grid.columns[i].hidden) {
            searchField = $('#gridId-filter-column-' + grid.columns[i].field);
            searchField.change({ index: i }, function (e) {
                var grid = $('#FindFormGrid').data('kendoGrid');
                updateSearchFilters(grid, grid.columns[e.data.index].field, 'contains', this.value);
            });
        }
    }
}

function updateSearchFilters(grid, field, operator, value) {
    var newFilter = { field: field, operator: operator, value: value };

    var dataSource = grid.dataSource;
    var filters = null;
    if (dataSource.filter() != null) {
        filters = dataSource.filter().filters;
    }
    if (filters == null) {
        filters = [newFilter];
    }
    else {
        var isNew = true;
        var index = 0;
        for (index = 0; index < filters.length; index++) {
            if (filters[index].field == field) {
                isNew = false;
                break;
            }
        }
        if (isNew) {
            filters.push(newFilter);
        }
        else {

            if (value == '')
                filters.splice(index, 1);

            else
                filters[index] = newFilter;
        }
    }
    dataSource.filter(filters);
}


function PrjChkChange() {

    if (document.getElementById('PrjChk').checked) {
        ProjectLoad();
        document.getElementById("PrjChk").disabled = true;
    }

}



function AccChkChange() {

    if (document.getElementById('AccChk').checked) {
        loadAcc();
        document.getElementById("AccChk").disabled = true;
    }

}

function ProjectLoad() {
    //Project Code Drop Bottom
    $("#PrjCd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjCd",
        dataSource: {
            type: "POST",
            transport: {

                read: urlGetPrjCd//readcontroler and action
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
    $("#PrjNm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: {
            type: "POST",
            transport: {

                read: urlGetPrjNm//readcontroler and action
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

function loadAcc() {

    //Accounts Code Drop Bottom
    $("#AccCode").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCode",
        dataSource: {
            type: "POST",
            transport: {

                read: urlGetAccDoropCode//readcontroler and action
            }
        },
        change: function (e) {
            var cmb = $("#AccCode").data("kendoComboBox");
            var AkkKy = cmb.value();
            if (AkkKy != "") {
                var validate = ComboValidations("AccCode");
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
    $("#AccName").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccNM",
        dataSource: {
            type: "POST",
            transport: {

                read: urlGetAccDoropNm//readcontroler and action
            }
        },
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
    var AccChk = ($("#AccChk").is(':checked')) ? 1 : 0;
    if (AccChk == 1) {
        AccKy = $("#AccCode").data("kendoComboBox").value();
    }
    if (!AccKy || AccKy == "") {
        AccKy = 1;
    }


    var PrjChk = ($("#PrjChk").is(':checked')) ? 1 : 0;
    if (PrjChk) {
        PrjKy = $("#PrjCd").data("kendoComboBox").value();
    }
    if (!PrjKy || PrjKy == "") {
        PrjKy = 1;
    }

    var IsRec = ($("#IsRec").is(':checked')) ? 1 : 0;

    var DocNo = $("#DocumentNo").val();
    if (DocNo == undefined || DocNo == "" || DocNo == null) {
        var DocNo = '';
    }
    var IsPrnt = ($("#IsPrnt").is(':checked')) ? 1 : 0;



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
            OurCode: viewBag.OurCd,
            Prefix:1
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            LoadGridFindView();
            $('#FindFormGrid').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGrid").data("kendoGrid");
            grid.dataSource.data([]);
            var j = 1;
            for (i = 0; i < data.length; i++) {
                $("#FindFormGrid").data("kendoGrid").dataSource.add({
                    Lino: j,
                    TrnKy: data[i].TrnKy,
                    Prefix: data[i].Prefix,
                    TrnNo: data[i].SttrnNo,
                    TrnDt: data[i].TrnDt,
                    DocNo: data[i].docno,
                    AdrId: data[i].AdrID,
                    AdrNm: data[i].AdrNm,
                    PrjId: data[i].PrjID,
                    PrjNm: data[i].PrjNm
                });
                j++
            }

        },
        error: function (e) {
            return false;
        }
    });

}


$("#FindFormGrid").on("dblclick", "tr.k-state-selected", function () {


    var grid = $('#FindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var TrnKy = selectedItem.TrnKy;

    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
        SetTrnHdrApr_LatestState(TrnKy, FormGlblData.TrnTypKy, 'TrnHdr');
        GetpaymentHdrDetail(TrnKy);

    } else {
        alert("please Select Any Trancsaction");
    }
});

function Ok1() {

    var grid = $('#FindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var TrnKy = selectedItem.TrnKy;
    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {

        GetpaymentHdrDetail(TrnKy);

    } else {
        alert("please Select Any Trancsaction");
    }
}

function GetpaymentHdrDetail(TrnKy) {    
    $.ajax({
        url: urlHrdSelected,
        data: JSON.stringify({
            TrnKy: TrnKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var TrnsKy = data[0].TrnKy;
                $("#TrnKy").val(TrnsKy);
                FormGlblData.TrnKy = TrnsKy
                var TimStmp = data[0].TimeStamp
                $("#TimeStamp").val(TimStmp);
                var TrnNo = data[0].TrnNo;
                $("#HdrSec1_InptVouNo_Val").val(TrnNo);

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var YurRef = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val(YurRef);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatVouDate_Val').data("kendoDatePicker").value(TrnDt);

                var UrRefDt = data[0].UrRefDt;
                $('#HdrSec1_DatVouRefDate_Val').data("kendoDatePicker").value(UrRefDt);
                var TrnCrnKy = data[0].TrnCrnKy;
                $("#HdrSec1_CmbTrnCurrncy_Cd").data("kendoComboBox").value(TrnCrnKy);
                var TrnExRate = data[0].TrnExRate;
                $("#HdrSec1_InptTrnExRate_Val").val(TrnExRate);
                var isRec = data[0].isRec;
                $('#HdrSec1_Chkbox_IsRec_Val').prop('checked', isRec);

              //  $('#HdrSec7_filesImgPath').val(data[0].ImageName);
                var imgSrc = data[0].TrnImg;
                var $img = $("<img >", {
                    "src": "data:image;base64," + imgSrc,
                    "width": "50px", "height": "50px"
                })
                $("#HdrSec2_InptEmpImagePreview_Val").empty();
                $("#HdrSec2_InptEmpImagePreview_Val").append($img);
             
                $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value("");
                $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value("");
                FirstinsetDetail.LineNo = 2;
                LoadAccounts();
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
            ObjKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            document.getElementById("HdrSec3_CmbAcc_Lbl").innerHTML = "Debit To";

            var grid = $("#PmtRcprGrd").data("kendoGrid");
            grid.dataSource.data([]);
            var TempAmt=0;
            for (i = 0; i < data.length; i++) {
                TempAmt = data[i].Amount;
                if (TempAmt < 0) {
                    TempAmt = parseFloat(data[i].Amount * (-1)).toFixed(2);// ;
                }
                $("#PmtRcprGrd").data("kendoGrid").dataSource.add({
                    AccTrnKy: data[i].AccTrnKy,
                    LiNo: data[i].LiNo,
                    AccKy: data[i].AccKy,
                    AccCd: data[i].AccCd,
                    AccNm: data[i].AccNm,
                    AdrNm: data[i].AdrNm,
                    AdrKy: data[i].AdrKy,
                    AdrCd: data[i].AdrCd,
                    PayModeKy: data[i].PayModeKy,
                    PayModeCd: data[i].PayModeCode,
                    ChqNo: data[i].ChqNo,
                    ChqDate: data[i].ChqDate,
                    IsCash: data[i].IsCash,
                    Amount: TempAmt,
                    CRAMT: data[i].CRAMT,
                    DRAMT: data[i].DRAMT,
                    BanckKy: data[i].BanckKy,
                    BanckCd: data[i].BanckCd,
                    BranchKy: data[i].BranchKy,
                    BranchCD: data[i].BranchCD,
                    CurencyKy: data[i].CurencyKy,
                    CurencyCd: data[i].CurencyCode,
                    ExRate: data[i].ExRate,
                    Des: data[i].Des,
                    TaskKy: data[i].TaskKy,
                    TaskId: data[i].TaskId,
                    TaskNm: data[i].TaskNm,
                    Analysys1Ky: data[i].Analysys1Ky,
                    Analysys1: data[i].Analysys1Id,
                    Analysys1Nm: data[i].Analysys1Nm,
                    Analysys2Ky: data[i].Analysys2Ky,
                    Analysys2: data[i].Analysys2Id,
                    Analysys2Nm: data[i].Analysys2Nm,
                    Analysys3Ky: data[i].Analysys3Ky,
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
                    IsAccPay: data[i].IsAccPay,
                    PrjKy: data[i].PrjKy,
                    PrjCd: data[i].PrjId,
                    PrjNm: data[i].PrjNm,
                    BuKy: data[i].BuKy,
                    BuCd: data[i].BUCode,
                    BuNm: data[i].BUNM,
                    Dt2: data[i].Dt2,
                    OrgPmtDetky: data[i].OrgPmtDetky,
                    LCKy: data[i].LCKy,
                    LCNo: data[i].LCNo,
                    LoanKy: data[i].LoanKy,
                    LoanNo: data[i].LoanNo,
                    OrderKy: data[i].OrderKy,
                    OrderNo: data[i].OrderNo,
                    OrdrDetKy: data[i].OrdrDetKy,
                    OrdrDetNo: data[i].OrdrDetNo,
                    PayeeName: data[i].PayeeName,
                    DueDate: data[i].DueDate,
                    DetYurRef: data[i].DetYurRef,
                    IsNegotiable: data[i].IsNegotiable,
                    isCross: data[i].isCross,
                    DetDocNo: data[i].DetDocNo,
                    IsAct: data[i].IsAct

                });


            };
            FirstinsetDetail.PrjKey = data[0].PrjKy;
            FirstinsetDetail.BUKey = data[0].BuKy;
            $('#HdrSec2_Chkbox_multi_Val').prop('checked', data[0].isMulti);
            var totAmt = data[0].Amount
            if (totAmt < 0) {
                totAmt = totAmt * -1;
            }
            $("#HdrSec2_InptTotAmt_Val").data("kendoNumericTextBox").value(totAmt);

           // SetTotalAmount();
            $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value(1);
            $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").readonly(true);
            try{
                $('#FindFormPayment').data('kendoWindow').close();
            }catch(ex){}

        },
        error: function (e) {
            return false;
        }
    });


}

function btnCal1() {
    $('#FindFormPayment').data('kendoWindow').close();
}

function SetTotalAmount() {
    var TempTotal = parseFloat(CalTotal()).toFixed(2);// CalTotal();
    $("#HdrSec2_InptTotAmt_Val").val(TempTotal);
}

//