var data_NewFromOrdTypAndTrnTyp = {
    ConCd: '',
    OurCd: ''
}

$(document).ready(function () {
    setTimeout(function () { LoadAfterOneMinuteFindFromPurOrd(); }, 20000);
});

function LoadAfterOneMinuteFindFromPurOrd() {
    LoadComboFindFormPO();
    LoadGridFindViewPO();

    //SearchPO();
}

$("#FrmDtFromPO").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 1900)
});
$("#FrmDtFromPO").closest("span.k-datepicker").width(150);

$("#ToDtFromPO").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 1900)
});
$("#ToDtFromPO").closest("span.k-datepicker").width(150);

function POProjectDataSource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlFindFromPurOrd.GetProjectList,
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function POSupDatasource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlFindFromPurOrd.GetSuplist,
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function LoadComboFindFormPO() {

    $("#cmbSupPO").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: POSupDatasource(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a suplier.."
    });

    $("#cmbPrjectIdPO").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjID",
        dataSource: POProjectDataSource(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a From suplier.."
    });
}

function LoadGridFindViewPO() {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                //url: urlFindFromPurOrd.GetDetailByFromTrnKy,
                dataType: "json"
            },
            update: {
                url: urlFindFromPurOrdHome.UpdateToDo,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                complete: function (e) {
                    alert("Updated successfully..!");
                    var grid = $("#grid").data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            destroy: {
                url: urlFindFromPurOrdHome.UpdateToDo,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                data: { isAct: 0 },
                complete: function (e) {
                    var grid = $("#grid").data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            create: {
                url: urlFindFromPurOrdHome.InsertToDo,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                complete: function (e) {
                    alert("Saved successfully..!");
                    var grid = $("#grid").data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            parameterMap: function (options, operation) {
                if (operation == "create" && options.models) {
                    return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos
                }
                if (operation == "update" && options.models) {
                    return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos
                }
                if (operation == "destroy" && options.models) {
                    return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos
                }
                if (operation == "read") {
                    return ({});
                }
            }
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "ItmKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    OrdKy: { editable: false, nullable: false, type: "number" },
                    Prefix: { editable: false, nullable: false, type: "number" },
                    OrdNo: { editable: false, nullable: false, type: "number" },
                    OrdDt: { editable: false, nullable: false, type: "date" },
                    DocNo: { editable: false, nullable: false, type: "string" }
                }
            }
        }
    });

    $("#FindFormPOGrid").kendoGrid({
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
        selectable: "row",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
             { field: "Lino", title: "LiNo", width: "50px" },
             { field: "OrdKy", title: "Ref #", width: "100px", hidden: true },
             { field: "Prefix", title: "Prefix", width: "150px" },
             { field: "OrdNo", title: "OrdNo", width: "150px" },
             { field: "OrdDt", title: "OrdDt", width: "100px" },
             { field: "DocNo", title: "DocNo", width: "150px" },
        ],
        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        editable: true,
        height: "360px"
    });
}

function SearchPO() {
    $('#FindFormPOGrid').data("kendoGrid").dataSource.filter(null);
    var grid = $("#FindFormPOGrid").data("kendoGrid");
    grid.dataSource.data([]);

    var PrjKy = $("#cmbPrjectIdPO").data('kendoComboBox').value();
    if (PrjKy == undefined || PrjKy == "" || PrjKy == null) {
        var PrjKy = 1;
    }

    var SupKy = $("#cmbSupPO").data('kendoComboBox').value();
    if (SupKy == undefined || SupKy == "" || SupKy == null) {
        var SupKy = 1;
    }

    var FrmDt = $("#FrmDtFromPO").val();
    var ToDt = $("#ToDtFromPO").val();

    var ConCd = data_NewFromOrdTypAndTrnTyp.ConCd;
    var OurCd = data_NewFromOrdTypAndTrnTyp.OurCd;

    $.ajax({
        url: urlFindFromPurOrd.GetOrdfrmPurOrdSearch,
        data: JSON.stringify({
            PrjKy: PrjKy,
            SupKy: SupKy,
            ConCd: ConCd,
            OurCd: OurCd,
            FrmDt: FrmDt,
            ToDt: ToDt
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $("#FindFormPOGrid").data("kendoGrid").dataSource.add({ Lino: data[i].Lino, OrdKy: data[i].OrdKy, Prefix: data[i].Prefix, OrdNo: data[i].OrdNo, OrdDt: data[i].OrdDt, DocNo: data[i].DocNo });
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function OkPO() {

    var grid = $('#FindFormPOGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ordKy = selectedItem.OrdKy;
    if (ordKy != "" || ordKy != undefined || ordKy != null) {
        GetHdrDetailFromPO(ordKy);
    } else {
        alert("please Select Any Trancsaction");
    }
}

function GetHdrDetailFromPO(ordKy) {

    var ConCd = data_NewFromOrdTypAndTrnTyp.ConCd;
    var OurCd = data_NewFromOrdTypAndTrnTyp.OurCd;
    $.ajax({
        url: urlFindFromPurOrd.GetHdrDetailFromPO,
        data: JSON.stringify({
            ordKy: ordKy,
            ConCd: ConCd,
            OurCd: OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            for (i = 0; i < data.length; i++) {

                $("#OrdNo1").val(null);

                var OrdKy = data[0].OrdKy;
                $("#POrdKy").val(OrdKy);

                var OrdNo = data[0].PrefixTrnNo;
                $("#POrdNo").val(OrdNo);

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var YurRef = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val(YurRef);

                var OrdDt = data[0].OrdDt;
                $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(OrdDt);

                var Des = data[0].Des;
                $('#HdrSec6_InptDesc_Val').val(Des);

                var Rem = data[0].Rem;
                $('#HdrSec6_InptRemark_Val').val(Rem);

                var PrjKy = data[0].PrjKy;
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);


                var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
               // $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);



                //var SlsAccKy = data[0].SlsAccKy;
                //$("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(SlsAccKy);
                //$("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(SlsAccKy);
                
                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
               // $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);

                var Datasource = [];
                //Datasource.push({ AdrKy: data[0].AdrKy, AdrId: data[0].AdrId, AdrNm: data[0].AdrNm });
                //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").setDataSource(Datasource);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").setDataSource(Datasource);
                //var OrdAdrId = data[0].AdrId;
                //var OrdAdrNm = data[0].AdrNm;
                var OrdAdrKy = data[0].AdrKy;
                //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(OrdAdrKy);
                //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").text(OrdAdrId);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(OrdAdrKy);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").text(OrdAdrNm);
                LoadAdrComboByAcc(AccKy);
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(OrdAdrKy);

                var LocKy = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy);
              //  $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy);
                var crnky = data[0].CurrenKy;
                var crn = data[0].Currence;
                $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(crnky);
                $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").text(crn);
                var pmtky = data[0].PmtKy;
                var pmt = data[0].Pmt;
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(pmtky);
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").text(pmt);
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").trigger("change");
            }

            GetGRNGridDetailFromPo(ordKy);
        },
        error: function (e) {
            return false;
        }
    });
}

function GetGRNGridDetailFromPo(ordKy) {
    var ConCd = data_NewFromOrdTypAndTrnTyp.ConCd;
    var OurCd = data_NewFromOrdTypAndTrnTyp.OurCd;
    $.ajax({
        url: urlFindFromPurOrd.GetGridDetailFromPO,
        data: JSON.stringify({
            ordKy: ordKy,
            ConCd: ConCd,
            OurCd: OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                var child = $(id).data("kendoGrid");
                //var dataSource = child.dataSource;
                //var total = dataSource.data().length;

                //child.dataSource.read();
                var count = child.dataSource.total();
                var lineNo = count;
                $(id).data("kendoGrid").dataSource.add({
                    LiNo: lineNo + 1,   // data[i].Lino,    // lineNo + 1,
                    OrdDetKy: data[i].OrdDetKy,
                    ItmKy: data[i].ItmKy,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    Des: data[i].Des,
                    DisAmt: data[i].TrnDisAmt,
                    DisPer: data[i].DisPer,
                    Rem: data[i].Rem,
                    POQty: data[i].BaseQty,
                    ReMnQty: Number(data[i].TrnQty - data[i].OrdrdQty),
                    TrnQty: Number(data[i].TrnQty - data[i].OrdrdQty),
                    TrnRate: data[i].TrnRate,
                    SubTotal: data[i].TrnRate * data[i].TrnQty,
                    GrossTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].TrnDisAmt),
                    VatAmt: data[i].VatAmt,
                    WHTAmt: data[i].WHTAmt,
                    NBTAmt: data[i].NBTAmt,
                    SVatAmt: data[i].SVatAmt,
                    VAT: data[i].VAT,
                    WHT: data[i].WHT,
                    NBT: data[i].NBT,
                    SVAT: data[i].SVAT,
                    NetTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].TrnDisAmt + data[i].VatAmt + data[i].WHTAmt + data[i].NBTAmt),
                });
            }
            CreateNewGridRow();
            $('#FindFormPo').data('kendoWindow').close();
        },
        error: function (e) {
            return false;
        }
    });
}


function ItemFromPurOrd() {
    try { ComClearFunction(); }
    catch (e) { }

    data_NewFromOrdTypAndTrnTyp.ConCd = 'OrdTyp';
    data_NewFromOrdTypAndTrnTyp.OurCd = 'PO';

    $("#FindFormPo").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "NEW FROM PURCHASE ORDER"
    });
    $('#FindFormPo').data('kendoWindow').center().open();
}

function ItemFromGRN() {

    data_NewFromOrdTypAndTrnTyp.ConCd = 'TrnTyp';
    data_NewFromOrdTypAndTrnTyp.OurCd = 'GRN';

    $("#FindFormPo").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "NEW FROM GRN"
    });
    $('#FindFormPo').data('kendoWindow').center().open();
}

$('#FindFormPOGrid').dblclick(function () {
    OkPO();
});
