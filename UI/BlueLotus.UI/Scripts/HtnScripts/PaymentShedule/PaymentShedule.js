var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    CrnKy: 1,
    selectedIndex : 0,
    newdate: null,
    InpOpenBalText: null,
    FindFormTrnDt: null,
    CreateAccTrnKy:1
}
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
            Button_From_Dynamic('ButtonSec1');
            Button_From_Dynamic('ButtonSec2');
            GetToDayDate();

        }
    });
});

function GetToDayDate() {
    var todayDate = new Date();
    var month = todayDate.getUTCMonth() + 1;
    var day = todayDate.getUTCDate();
    var year = todayDate.getUTCFullYear();

    FormGlblData.newdate = day + "/" + month + "/" + year;
}

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
    //Load datePickeres and set the default dates
    LoadDatePickers();
    LoadCombo();
    setTimeout(setHdrSectionPropFun, 2000);
    //ClearPrevious Values
    //ClearAllElement();
    var h = $("#option").height();
    var i = $("#ButtonSet").height();
    var Div1 = $("#HdrPart").height();
    var height = ($(window).height()) - ( h + i + Div1+40);
    $("#Maingrid").height(height);
    loadCombo();
    LaodGrid();
    FindGridDefaultColumns();
}


function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    SetHandlingEnterKeyEvent('', viewBag.ObjKy);

}

function LoadDatePickers() {
    $("#HdrSec1_DatShowFrom_Val")
    .kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009)
    });
    $("#HdrSec2_DatPayDetail_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    var todayDate = new Date();
    $("#HdrSec1_DatShowFrom_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_DatPayDetail_Val").data("kendoDatePicker").value(todayDate);

}

function ClearAllElement() {
    $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value("");
    //$("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").value("");
    //$("#HdrSec2_CmbCreditAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbPayMode_Cd").data("kendoComboBox").value("");
    var todayDate = new Date();
    $("#HdrSec1_DatShowFrom_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_DatPayDetail_Val").data("kendoDatePicker").value(todayDate);
    $('input:radio[name="ShowDetiils"]').filter('[value="Show_All"]').attr('checked', true);
}

function LaodGrid() {
    GridDefaultColumns();
   
}
function SavePaymentShedule()
{
    var CrAccKy = $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").value();
    var PaymentMode = $("#HdrSec2_CmbPayMode_Cd").data("kendoComboBox").value();

    if (!CrAccKy || CrAccKy == 1 || CrAccKy == "") {
        alert("Select the Payee Account");
        return;
    }
    if (!PaymentMode || PaymentMode == 1 || PaymentMode == "") {
        alert("Select The Payment mode");
        return;
    }
       
    var CrAccCdNm = $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").text();
    var grid = $("#Maingrid").data("kendoGrid");
    var newrecode = [];
    var updaterecode = [];
    var currentData = grid.dataSource.data();

    //for Credit Line 
    var CreateAmount = CalCreadAmount();
    var CrDataRecode = { AccKy: CrAccKy, AccCd: CrAccCdNm, AccAmt: CreateAmount, Des: " ", Adrky: 1, BUKy: 1, PrjKy: 1, PayModeKy: PaymentMode };
    updaterecode.push(CrDataRecode);
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew())
        {
            newrecode.push(currentData[i].toJSON());
        }
        else if (currentData[i].dirty)
        {
            if (currentData[i].select == true) {
                updaterecode.push(currentData[i].toJSON());
            }
            
        }
    }

    //if (updaterecode.length >= 1 || newrecode.length >= 1) {
    //    var CreateAmount = CalCreadAmount();
    //    var CrDataRecode = { AccKy: CrAccKy, AccCd: CrAccCdNm, AccAmt: CreateAmount, Des: " ", AdrID: 1, BUKy: 1, PrjKy: 1, PayModeKy: PaymentMode };
    //    updaterecode.push(CrDataRecode);

    //}

    var todayDate = new Date();
    if (FormGlblData.TrnKy <= 1) {
        $.ajax({
            url: urlSaveHdr,
            data: JSON.stringify({
                TrnTypKy: FormGlblData.TrnTypKy,
                TrnDt: todayDate,
                CrnKy: FormGlblData.CrnKy,
                PrjKy: 1,
                BUKy: 1,
                OurCd: viewBag.OurCd,
                ObjKy: viewBag.ObjKy,

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                var trnKy = data[0].TrnKy;
                FormGlblData.TrnKy = data[0].TrnKy;
                InsertGrid(trnKy, updaterecode, FormGlblData.TrnTypKy);

            },
            error: function (e) {
                return false;
            }
        });


    }
    else {
        var updaterecode = [];
        var grid = $("#Maingrid").data("kendoGrid");
        var currentData = grid.dataSource.data();
        var CreateAmount = CalCreadAmount();
        GetAccKyByCrnKy(CrAccKy);
        var CrDataRecode = { AccKy: CrAccKy, AccCd: CrAccCdNm, AccTypKy:FormGlblData.CreateAccTrnKy, AccAmt: CreateAmount, Des: " ", Adrky: 1, BUKy: 1, PrjKy: 1, PayModeKy: PaymentMode, IsAct: 1 };
        updaterecode.push(CrDataRecode);
        for (var i = 0; i < currentData.length; i++) {
            if (currentData[i].select == true) {
                updaterecode.push(currentData[i].toJSON());
            }
            else {
                currentData[i].IsAct = 0;
                updaterecode.push(currentData[i].toJSON());
            }
        }
        $.ajax({
            url: urlUpdateHdr,
            data: JSON.stringify({
                TrnKy: FormGlblData.TrnKy,
                TrnTypKy:FormGlblData.TrnTypKy,
                TrnDt: todayDate,
                CrnKy: FormGlblData.CrnKy,
                PrjKy: 1,
                BUKy: 1,
                OurCd: viewBag.OurCd,
                ObjKy: viewBag.ObjKy,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                var trnKy = data[0].TrnKy;
                FormGlblData.TrnKy = data[0].TrnKy;
                UpdateGrid(trnKy, updaterecode, FormGlblData.TrnTypKy);
                
            },
            error: function (e) {
                return false;
            }
        });


    }
}

function Clear() {
    $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_CmbPayMode_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
    var todayDate = new Date();
    $("#HdrSec1_DatShowFrom_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_DatPayDetail_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_InpOpnBalText_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec2_InpClosBalTot_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec2_InpCurTotTxt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec1_InpTrnNo_Val").val("");
    $("#Maingrid").data("kendoGrid").dataSource.data([]);
    FormGlblData.TrnKy = 1;
    FormGlblData.TrnTypKy = 1;
}

function CalCreadAmount()
{
    var grid = $("#Maingrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var CrAmount = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].select == true) {
            CrAmount = CrAmount + parseInt(currentData[i].ThisSetOffAmt);
        }
    }
    return CrAmount;
}

function GetAccKyByCrnKy(AccKy) {
    var todayDate = new Date();
    var month = todayDate.getUTCMonth() + 1; 
    var day = todayDate.getUTCDate();
    var year = todayDate.getUTCFullYear();

    newdate = day + "/" + month + "/" + year;
    $.ajax({
        url: urlGetAllDetail,
        data: JSON.stringify({
            AccKy: AccKy,
            datepicker: newdate,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var CurncyKy = data[0].CurncyKy;
                FormGlblData.CrnKy = CurncyKy;
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function InsertGrid(TrnKy, InsertArray, TrnTypKy) {
    $.ajax({
        url: urlInsertGrid,
        data: JSON.stringify({
            TrnKy: TrnKy,
            InsertGrid: kendo.stringify(InsertArray),//,
            OurCd: viewBag.OurCd,
            ObjKy: Number.parseInt(viewBag.ObjKy),
            CrnKy: FormGlblData.CrnKy,
            TrnTypKy: TrnTypKy,
            EftvDt: FormGlblData.newdate,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert("SuccessFull Save");
            GetpaymentHdrDetail(TrnKy);
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
                //$("#FindFormGrid").data("kendoGrid").dataSource.filter(null);
                //$("#FindFormGrid").data("kendoGrid").dataSource.data([]);
            } catch (e) {

            }
            $("#FindFormPaymentShedule")
                .show()
                .kendoWindow({
                    width: "80%",
                    height: "75%",
                    modal: true,
                    title: "Find Form"
                });

            $("#FindFormPaymentShedule").data("kendoWindow").center().open();
        }
    });


$("#Maingrid").on("dblclick", "tr.k-state-selected", function () {

    var grid = $('#Maingrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    FormGlblData.selectedIndex = grid.select().index();
    var DataSource = $('#Maingrid').data('kendoGrid').dataSource.data();
});

function UpdateGrid(trnKy, updaterecode,TrnTypKy){
    $.ajax({
        url: urUpdatatGrid,
        data: JSON.stringify({
            TrnKy: trnKy,
            UpdateGrid: kendo.stringify(updaterecode),//,
            OurCd: viewBag.OurCd,
            ObjKy: Number.parseInt(viewBag.ObjKy),
            CrnKy: FormGlblData.CrnKy,
            TrnTypKy: TrnTypKy,
            EftvDt: FormGlblData.newdate,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert("SuccessFull Update");
            GetpaymentHdrDetail(trnKy);
        },
        error: function (e) {
            return false;
        }
    });
}

function GetTheMainGridParameters() {
    var AccKy = $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value();
    var BUKy = $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value();
    var PrjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    LoadMainGrid(AccKy,BUKy,PrjKy);
}

function LoadMainGrid(AccKy, BUKy, PrjKy) {
    var RadioSelected = $("input[name=ShowDetiils]:checked").val();
    if (RadioSelected == "Show_Selected") {
        var Tempdate = document.getElementById("HdrSec1_DatShowFrom_Val").value;
        var Temp = Tempdate.split('/');
        var DateRange = Temp[2] + '/' + Temp[1] + '/' + Temp[0];
    }
    if (!AccKy) {
        AccKy = 1;
    }
    if (!BUKy) {
        BUKy = 1;
    }
    if (!PrjKy) {
        PrjKy = 1;
    }

    $.ajax({
        url: urlLoadPaymentRequestGrid,
        data: JSON.stringify({
                    AccKy: AccKy,
                    Date: DateRange,
                    ObjKy: viewBag.ObjKy,
                    BUKy: BUKy,
                    PrjKy: PrjKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                try {
                    $('#Maingrid').data('kendoGrid').dataSource.add({
                        TrnKy: data[i].TrnKy,
                        AccTrnKy: data[i].AccTrnKy,
                        TrnDt: data[i].TrnDt,
                        AccKy: data[i].AccKy,
                        AccAmt: data[i].AccAmt,
                        SetOffAccAmt: data[i].SetOffAccAmt,
                        ThisSetOffAmt: data[i].ThisSetOffAmt,
                        DocNo: data[i].DocNo,
                        YurRef: data[i].YurRef,
                        YurRefDt: data[i].YurRefDt,
                        AccCd: data[i].AccCd,
                        IsAct: 1,
                        AccNm: data[i].AccNm,
                        AccTypKy: data[i].AccTypKy,
                        TrnPreFixCd: data[i].TrnPreFixCd,
                        TrnPreFixNm: data[i].TrnPreFixNm,
                        TrnTypCd: data[i].TrnTypCd,
                        TrnTypNm: data[i].TrnTypNm,
                        TrnNo: data[i].TrnNo,
                        Des: data[i].Des,
                        AdrKy: data[i].Adrky,
                        AdrID: data[i].AdrID,
                        AdrNm: data[i].AdrNm,
                        BUKy: data[i].BUKy,
                        BUCd: data[i].BUCd,
                        PrjKy: data[i].Prjky,
                        PrjID: data[i].PrjID,
                        PayModeKy: data[i].PayModeKy,
                        iscross: data[i].isCross,
                        isAccPayee: data[i].isAccPayee,
                        isCash: data[i].Iscash,
                        select: false,
                        NotNegotiable: data[i].NonNego

                    })
                } catch (e) {
                    alert(e);
                }

            }  
        },
        error: function (e) {
            return false;
        }

    });
}

function CheqPrint() {
    PaymentFormPosting(FormGlblData.TrnKy, viewBag.Objky);
}

function PaymentFormPosting(TrnKy,Objky) {
    if (TrnKy > 1) {
        $.ajax({
            url: urlPosting,
            data: JSON.stringify({
                TrnKy: TrnKy,
                ObjKy: Number.parseInt(viewBag.ObjKy),
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data == true) {
                    alert("Posting Successfully Done");
                }
            },
            error: function (e) {
                return false;
            }
        });
    }
    else {
        alert("Please Select The Valid Transaction");
    }

}
