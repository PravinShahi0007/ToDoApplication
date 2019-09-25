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
    $('#HdrSec16_Chkbox_FF_IsAct_Val').prop('checked', true);
    $('#HdrSec16_Chkbox_FF_IsApr_Val').prop('checked', true);
    var todayDate = new Date();
    $('#HdrSec16_Dat_FF_SchDt_Val').data("kendoDatePicker").value(todayDate);
    document.getElementById("HdrSec16_Inpt_FF_VerNo_Val").value = "";
}


$("#HdrSec16_Dat_FF_SchDt_Val").kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(31, 2, 2009),
});


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

function Ok1() {

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
    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {

        GetpaymentHdrDetail(TrnKy);

    } 
else {
        alert("please Select Any Trancsaction");
    }
}

function Clear() {
    var grid = $("#FindFormGridPayment").data("kendoGrid");
    grid.dataSource.data([]);
    $("#HdrSec16_Dat_FF_SchDt_Val").val(null);
    $("#HdrSec16_Inpt_FF_VerNo_Val").val(null);
    $("#HdrSec16_Cmb_FF_Prj_Cd").data('kendoComboBox').value(null);
    $('#HdrSec16_Chkbox_FF_IsAct_Val').attr('checked', true);
    $('#HdrSec16_Chkbox_FF_IsApr_Val').attr('checked', true);
}


function back() {
    $('#FindFormVersionNo').data('kendoWindow').close();
    FormGlblData.OurCode2 = null;
}

function SetTotalAmount() {
    var TempTotal = parseFloat(CalTotal()).toFixed(2);// CalTotal();
    $("#HdrSec3_InptTotAmt_Val").val(TempTotal);

    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
    FirstRow.set("Amount", TempTotal);
}

function TempRcptSerch(tempOurCd) {
    FormGlblData.OurCode2 = tempOurCd;
    $("#FindFormVersionNo")
        .show()
        .kendoWindow({
            width: "1000px",
            height: "600px",
            modal: true,
            title: "Find Form"
        });

    $("#FindFormVersionNo").data("kendoWindow").center().open();

    try {
        $('#FindFormGridPayment').data("kendoGrid").dataSource.filter(null);
        $("#FindFormGridPayment").data("kendoGrid").dataSource.data([]);

    } catch (e) {

    }
    // e.preventDefault();


}

function DecideLock() {
    if (FormGlblData.AprStsLock == 0) {
        SetReadOnlyAttr(1);
    }
    else {
        SetReadOnlyAttr(0);
    }
}



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
            GetpaymentHdrDetail(TrnKy);
            // alert(JSON.stringify(DataSource[0]));
        }
    } catch (e) {
        alert("Network error,Please Reload the page");


    }
}

function Search() {
     var Prefix = $("#HdrSec16_Cmb_FF_TrnNo_Cd").val();
     if (Prefix == null || Prefix == "" || Prefix == undefined) {
         Prefix = 1;
     }
     var TrnNo = $("#HdrSec16_Cmb_FF_TrnNo_Val").val();

     if (TrnNo == undefined || TrnNo == "" || TrnNo == null) {
         var TrnNo = null;
     }
        var versionno = $("#HdrSec16_Inpt_FF_VerNo_Val").val();

        var schDt = $("#HdrSec16_Dat_FF_SchDt_Val").val();
        if (schDt == undefined || schDt == "" || schDt == null) {
            var schDt = "1/1/1900";
        }

        var PrjKy = $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value();
        if (!PrjKy || PrjKy == "") {
            PrjKy = 1;
        }

        var IsAct = ($("#HdrSec16_Chkbox_FF_IsAct_Val").is(":checked")) ? 1 : 0;// ($("#HdrSec3_FF_Chkbox_IsRec_Val").is(":checked")) ? 1 : 0;
      
        var IsApr = ($("#HdrSec16_Chkbox_FF_IsApr_Val").is(":checked")) ? 1 : 0;
       
        $.ajax({
            url: urlGetVersionnoFind,
            data: JSON.stringify({
                frmDt: schDt,  
                toDt:'2018/11/16',
                prefix: Prefix,
                trnno: TrnNo,
                versionno: versionno,
                AprStatKy: 1,
                PrjKy: PrjKy,
                IsAct: IsAct,             
                IsApr: IsApr,
                trnTypKy: FormGlblData.TrnTypKy,
                Objky: viewBag.ObjKy,
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                $('#FindFormGridPayment').data("kendoGrid").dataSource.filter(null);
                var grid = $("#FindFormGridPayment").data("kendoGrid");
                grid.dataSource.data([]);
                var PrcsSchKyds = data[0].PrcsSchky;
                var j = 1;
                for (i = 0; i < data.length; i++) {

                    $("#FindFormGridPayment").data("kendoGrid").dataSource.add({
                        Lino: j,
                        PrcsSchKy: data[i].PrcsSchky,
                        Prefix: data[i].Prefix,                        
                        AdrID: data[i].AdrID,
                        AdrNm: data[i].AdrNm,
                        PrjKy: data[i].Prjky,
                        PrjId: data[i].PrjID,
                        PrjNm: data[i].PrjNm,
                        VersionNo: data[i].VersionNo
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
        $('#FindFormGridPayment').data('kendoGrid').dataSource.data([]);
       
        var PrcsSchKy = selectedItem.PrcsSchKy;

        if (PrcsSchKy != "" || PrcsSchKy != undefined || PrcsSchKy != null) {
            FormGlblData.ISNeworUpdateTranction = 0;                              
            GetpaymentHdrDetail(PrcsSchKy);
        }
        else {
            alert("please Select Any Trancsaction");
        }
    });

    function GetpaymentHdrDetail(PrcsSchKy) {

        $.ajax({
            url: urlHrdSelected,
            data: JSON.stringify({
                PrcsSchKy: PrcsSchKy,
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                for (i = 0; i < data.length; i++) {
                    var TrnsKy = data[0].PrcsSchky;
                    FormGlblData.TrnKy = TrnsKy;                   

                    var SchDt = data[0].SchDt;
                    $('#HdrSec2_DatVouDate_Val').data("kendoDatePicker").value(SchDt);
                                    

                  /*  $('#HdrSec2_Chkbox_IsAct_Val').prop('checked', isRec);
                    if (isRec) {
                        FormGlblData.IsRecState = 1;
                    } else {
                        FormGlblData.IsRecState = 0;

                    } */
                    var grid = $("#PmtRcprGrd").data("kendoGrid");
                    grid.dataSource.data([]);

                    for (i = 0; i < data.length; i++) {

                        $("#PmtRcprGrd").data("kendoGrid").dataSource.add({
                            PrcsSchKy: data[i].PrcsSchky,
                            VersionNo: data[i].VerNo,
                            Projects: data[i].PrjID + " - " + data[i].PrjNm,

                        });


                    };

                    $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(data[0].PrjKy);
                    var Schdate = data[0].SchDt;
                    $("#HdrSec2_DatVouDate_Val").data("kendoDatePicker").value(Schdate);
                    document.getElementById("HdrSec2_InptDocNo_Val").value = data[0].VerNo;
                    GetGridDetailGrn(TrnsKy);
                }
            },
            error: function (e) {
                return false;
            }
        });

    }

    function GetGridDetailGrn(PrcsSchKy) {
    /*    var ObjctKy = viewBag.ObjKy;
        $.ajax({
            url: urlDetailSelected,
            data: JSON.stringify({
                PrcsSchKy: PrcsSchKy,
                ObjKy: ObjctKy,
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data.length == 0) {
                    alert("There is an error with Transaction Please Contact any Support person \n Error Code " + TrnKy);
                }

                var grid = $("#PmtRcprGrd").data("kendoGrid");
                grid.dataSource.data([]);
                
                for (i = 0; i < data.length; i++) {

                    $("#PmtRcprGrd").data("kendoGrid").dataSource.add({
                        PrcsSchKy: data[i].PrcsSchKy,                      
                        VersionNo: data[i].VerNo,                   
                        PrjIDNM: data[i].PrjID + " - " + data[i].PrjNm,
                     
                    });


                };

                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(data[0].PrjKy)// 
                //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(data[0].PrjKy)// 
                FormGlblData.TempPrj = data[0].PrjKy;
                $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value(data[0].BuKy)// 
                //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value(data[0].BuKy)// 
                FormGlblData.TempBU = data[0].BuKy;

                //  $('#HdrSec2_Chkbox_multi_Val').prop('checked', data[0].isMulti);
                $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").setDataSource(AccountCodeDatasource('HdrSec2_CmbHdrAcc'));
                //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").setDataSource(AccountDatasource('HdrSec2_CmbHdrAcc'));
                $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value(data[0].AccKy)// 
                //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value(data[0].AccKy)// 
                $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value(data[0].AdrKy)// 
                //$("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value(data[0].AdrKy)// 
                $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").value(data[0].CurencyKy)// 
                $("#HdrSec3_InptAccExRate_Val").val(data[0].ExRate);
                $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").setDataSource(urlGetTaskCode("HdrSec4_CmbTsk"));
                //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").setDataSource(urlGetTaskNm("HdrSec4_CmbTsk"));

                // SetTotalAmount();
                var TempTotal = parseFloat(data[0].TotalAmount).toFixed(2);// CalTotal();
                $("#HdrSec3_InptTotAmt_Val").val(TempTotal);
                setTimeout(DecideLock(), 2000);
                
               

            },
            error: function (e) {
                return false;
            }
        }); */

        try {
            $('#FindFormVersionNo').data('kendoWindow').close();

        } catch (ex) { } 
    }
