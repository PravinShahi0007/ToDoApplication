var data_NewFromOrdTypAndTrnTyp = {
    ConCd: '',
    OurCd: ''
}

function LoadAfterOneMinuteTrnTypPendingTynTyp() {
    var Now = new Date();
    var dd = Now.getDate();
    if (dd == 0) dd = 01;
    var mm = Now.getMonth() + 1;
    var yy = Now.getFullYear();
    $('#TrnTypTrn_FrmDtFromPO').val(dd + "/" + mm + "/" + yy);

    LoadComboFindFormPO();
    LoadGridFindViewPO();

    //SearchPO();
}

$("#TrnTypTrn_FrmDtFromPO").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 1900)
});
$("#TrnTypTrn_FrmDtFromPO").closest("span.k-datepicker").width(150);

$("#TrnTypTrn_ToDtFromPO").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 1900)
});
$("#TrnTypTrn_ToDtFromPO").closest("span.k-datepicker").width(150);

//function POProjectDataSource() {
//    var dataSource = new kendo.data.DataSource(
//    {
//        transport: {
//            read: {
//                url: urlFindFromPurOrd.GetProjectList,
//                dataType: "json"
//            }
//        }
//    });
//    return dataSource;
//}

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

    $("#TrnTypTrn_cmbSupPO").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: POSupDatasource(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a suplier.."
    });

    $("#TrnTypTrn_cmbPrjectIdPO").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: GetPrjID_SelectMobDataSource(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project.."
    });

    
}

function GetPrjID_SelectMobDataSource() {
    var ObjKy = 1;
    //alert(ObjKy);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.GetPrjID_SelectMobDataSource,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function LoadGridFindViewPO() {

    var dataSource = new kendo.data.DataSource({
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

    $("#TrnTypTrn_FindFormPOGrid").kendoGrid({
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
    $('#TrnTypTrn_FindFormPOGrid').data("kendoGrid").dataSource.filter(null);
    var grid = $("#TrnTypTrn_FindFormPOGrid").data("kendoGrid");
    grid.dataSource.data([]);

    var PrjKy = $("#TrnTypTrn_cmbPrjectIdPO").data('kendoComboBox').value();
    if (PrjKy == undefined || PrjKy == "" || PrjKy == null) {
        var PrjKy = 1;
    }

    var SupKy = $("#TrnTypTrn_cmbSupPO").data('kendoComboBox').value();
    if (SupKy == undefined || SupKy == "" || SupKy == null) {
        var SupKy = 1;
    }

    var FrmDt = $("#TrnTypTrn_FrmDtFromPO").val();
    var ToDt = $("#TrnTypTrn_ToDtFromPO").val();

    var ConCd = data_NewFromOrdTypAndTrnTyp.ConCd;
    var OurCd = data_NewFromOrdTypAndTrnTyp.OurCd;

    $.ajax({
        url: UrlGetFromGRN.LoadFindGrid,
        data: JSON.stringify({
            PrjKy: PrjKy,
            SupKy: SupKy,
            ConCd: ConCd,
            OurCd: OurCd,
            FrmDt: FrmDt,
            ToDt: ToDt,
            TrnTypKy: FormGlblData.TrnTypKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $("#TrnTypTrn_FindFormPOGrid").data("kendoGrid").dataSource.add({
                    Lino: data[i].Lino,
                    OrdKy: data[i].OrdKy,
                    Prefix: data[i].Prefix,
                    OrdNo: data[i].OrdNo,
                    OrdDt: data[i].OrdDt,
                    DocNo: data[i].DocNo
                });
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function OkPO() {

    var grid = $('#TrnTypTrn_FindFormPOGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ordKy = selectedItem.OrdKy;
    if (ordKy != "" || ordKy != undefined || ordKy != null) {
        var findOurCd = data_NewFromOrdTypAndTrnTyp.OurCd;
        if (findOurCd == "RMI") {
            LoadFromIssueHdr(ordKy);
            data_NewFromOrdTypAndTrnTyp.OurCd = "";
        } else {
            GetHdrDetailFromPO(ordKy);
        }

      
       
    } else {
        alert("please Select Any Trancsaction");
    }
}

function GetHdrDetailFromPO(ordKy) {

    var ConCd = data_NewFromOrdTypAndTrnTyp.ConCd;
    var OurCd = data_NewFromOrdTypAndTrnTyp.OurCd;
    $.ajax({
        url: UrlGetFromGRN.GettingAllRecords,
        data: JSON.stringify({
            ordKy: ordKy,
            ConCd: ConCd,
            OurCd: OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            //for (i = 0; i < data.length; i++) {
            if (data.length > 0) {

                $("#OrdNo1").val(null);

                var OrdKy = data[0].OrdKy;
                $("#POrdKy").val(OrdKy);

                var OrdNo = data[0].PrefixTrnNo;
                $("#POrdNo").val(OrdNo);

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var YurRef = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val(YurRef);

                var OrdDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(OrdDt);

                var Des = data[0].Des;
                $('#HdrSec6_InptDesc_Val').val(Des);

                var Rem = data[0].Rem;
                $('#HdrSec6_InptRemark_Val').val(Rem);

                var PrjKy = data[0].PrjKy;
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
               // $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);

                var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
                //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);

                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
               // $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);

                var Datasource = [];
                var OrdAdrKy = data[0].AdrKy;
                LoadAdrComboByAcc(AccKy);
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(OrdAdrKy);

                var LocKy = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy);
                //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy);
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
            //========================================= Grid Filling Records
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (ij = 0; ij < data.length; ij++) {
                if (OurCd == 'SALE') {
                    data[ij].ItmTrnKy = "";
                }
                var child = $(id).data("kendoGrid");
                var count = child.dataSource.total();
                var lineNo = count;
                $(id).data("kendoGrid").dataSource.add({
                    //ItmTrnKy: data[ij].ItmTrnKy,  
                    LiNo: data[ij].LiNo,    // lineNo + 1,
                    OrdDetKy: data[ij].OrdDetKy,
                    ItmKy: data[ij].ItmKy,
                    ItmCd: data[ij].ItmCd,
                    ItmNm: data[ij].ItmNm,
                    Unit: data[ij].Unit,
                    UnitKy: data[ij].UnitKy,
                    Des: data[ij].DetDes,
                    DisAmt: data[ij].TrnDisAmt,
                    DisPer: data[ij].DisPer,
                    Rem: data[ij].DetRem,
                    POQty: data[ij].BaseQty,
                    ReMnQty: Number(data[ij].TrnQty - data[ij].OrdrdQty),
                    TrnQty: data[ij].Qty,
                    TrnRate: data[ij].TrnRate,
                    SubTotal: data[ij].TrnRate * data[ij].TrnQty,
                    GrossTotal: ((data[ij].TrnRate * data[ij].TrnQty) - data[ij].TrnDisAmt),
                    VatAmt: data[ij].VatAmt,
                    WHTAmt: data[ij].WHTAmt,
                    NBTAmt: data[ij].NBTAmt,
                    VAT: data[ij].VAT,
                    SVatAmt: data[ij].SVatAmt,                  
                    WHT: data[ij].WHT,
                    NBT: data[ij].NBT,
                    SVAT: data[ij].SVAT,
                    NetTotal: ((data[ij].TrnRate * data[ij].TrnQty) - data[ij].TrnDisAmt + data[ij].VatAmt + data[ij].WHTAmt + data[ij].NBTAmt + data[ij].SVatAmt),
                    IsAct: data[ij].isAct
                });
            }
            CreateNewGridRow();
            $('#GetFromGRN').data('kendoWindow').close();
            Calculatetotal();
            //GetGRNGridDetailFromPo(ordKy);
        },
        error: function (e) {
            return false;
        }
    });
}

var TrnTypTrnTypSelect_GetFromGRN_IsOpen = true;
function TrnTypTrnTypSelect(ConCd, OurCd) { //================== This Window will open when click GetFromGrn from Purchase Return

    if (TrnTypTrnTypSelect_GetFromGRN_IsOpen) {
        LoadAfterOneMinuteTrnTypPendingTynTyp();
        TrnTypTrnTypSelect_GetFromGRN_IsOpen = true;
    }

    data_NewFromOrdTypAndTrnTyp.ConCd = ConCd;
    data_NewFromOrdTypAndTrnTyp.OurCd = OurCd;

    $("#GetFromGRN").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "GET FROM " + OurCd
    });

    $("#GetFromGRN_wnd_title").html("GET FROM " + OurCd);

    $('#GetFromGRN').data('kendoWindow').center().open();
}

$('#TrnTypTrn_FindFormPOGrid').dblclick(function () {
    OkPO();
});

function LoadItemData(ConCd, OurCd) {
    data_NewFromOrdTypAndTrnTyp.ConCd = ConCd;
    data_NewFromOrdTypAndTrnTyp.OurCd = OurCd;
    $("#FindFormGRN").show().kendoWindow({
        width: "80%",
        height: "550px",
        modal: true,
        title: "Find"
    });
    $('#FindFormGRN').data('kendoWindow').center().open();
    $("#OrdNoTo").focus();

}