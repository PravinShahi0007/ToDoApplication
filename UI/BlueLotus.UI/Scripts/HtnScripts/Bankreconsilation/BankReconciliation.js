var FormGlblData = {
	FormObjData: null,
	TrnTypKy: 1,
	AccessLvlKy: 1,
	ConfiLvlKy: 1,
	TrnKy: 1
}
$(document).ready(function () {
	GetFormObjData();
});
$('#HdrSec1_DatTo_Val').on('change', function () {
	loadDates();
});
$('#HdrSec1_DatFrom_Val').on('change', function () {
	loadDates();
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
	LoadDates();
	LoadCombo();
	//Label Update
	loadDates();
	ClearAll();
};

function LoadDates() {
	$("#HdrSec1_DatTo_Val").kendoDatePicker({
		format: "dd/MM/yyyy",
		min: new Date(31, 2, 2009)
	});
	var d = new Date().setDate(1);
	$("#HdrSec1_DatFrom_Val").kendoDatePicker({
		format: "dd/MM/yyyy",
		value: new Date(d),
	})
	var todayDate = new Date();
	$("#HdrSec1_DatTo_Val").data("kendoDatePicker").value(todayDate);
}
function loadDates() {
	var FromDate = document.getElementById("HdrSec1_DatFrom_Val").value;
	var todaydatepicker = document.getElementById("HdrSec1_DatTo_Val").value;
	document.getElementById('OpenDate').innerHTML = FromDate //todaydatepicker;
	document.getElementById('ToFrom').innerHTML = FromDate + " - " + todaydatepicker;
	document.getElementById('Ledg').innerHTML = todaydatepicker;
	document.getElementById('ReconBal').innerHTML = todaydatepicker;
}
function LoadCombo() {
	$("#HdrSec1_CmbBank_Cd").kendoComboBox({
		dataValueField: "AccKy",
		dataTextField: "AccCode",
		dataSource: AccDoropCode("HdrSec1_CmbBank"),
		//    {
		//    type: "POST",
		//    transport: {
		//        read: urlGetBankAccCd,
		//    }
		//},
		change: function (e) {
			var cmb = $("#HdrSec1_CmbBank_Cd").data("kendoComboBox");
			var CdKy = cmb.value();
			if (CdKy != "") {
				var validate = ComboValidations("HdrSec1_CmbBank_Cd");

				if (validate) {
					$("#HdrSec1_CmbBank_Cd").data("kendoComboBox").value(CdKy);
					$("#HdrSec1_CmbBank_Nm").data("kendoComboBox").value(CdKy);
					GetAccountNumber(CdKy);
				} else {
					$("#HdrSec1_CmbBank_Cd").data("kendoComboBox").value("");
					$("#HdrSec1_CmbBank_Nm").data("kendoComboBox").value("");
				}
			}
		},
		filter: "contains",
		suggest: true,
		placeholder: "Select a Banck Account"
	});
	$("#HdrSec1_CmbBank_Nm").kendoComboBox({
		dataValueField: "AccKy",
		dataTextField: "AccNM",
		dataSource: AccDoropName("HdrSec1_CmbBank"),
		//    {
		//    type: "POST",
		//    transport: {
		//        read: urlGetBankAccNm,
		//    }
		//},
		change: function (e) {
			var cmb = $("#HdrSec1_CmbBank_Nm").data("kendoComboBox");
			var CdKy = cmb.value();
			if (CdKy != "") {
				var validate = ComboValidations("HdrSec1_CmbBank_Nm");
				if (validate) {
					$("#HdrSec1_CmbBank_Cd").data("kendoComboBox").value(CdKy);
					$("#HdrSec1_CmbBank_Nm").data("kendoComboBox").value(CdKy);
					GetAccountNumber(CdKy);

				} else {
					$("#HdrSec1_CmbBank_Cd").data("kendoComboBox").value("");
					$("#HdrSec1_CmbBank_Nm").data("kendoComboBox").value("");
				}
			}
		},
		filter: "contains",
		suggest: true,
		placeholder: "Select a Banck Account"
	});
	$("#HdrSec1_CmbBank_Cd").parent().css("width", "25%");
	$("#HdrSec1_CmbBank_Nm").parent().css("width", "40%");

}
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


//LOad the Grid
function Preview() {
    try {
        var Grid = $("#BanckRec").data("kendoGrid");
        Grid.destroy();
        $("#BanckRec").empty();
        $("#BanckRec").data('kendoGrid').dataSource.data([]);
        HTNPaginationCtrlLoadWithDataGrid();
    } catch (e) {

    }
	//Clear();
	//loadDates()
	var HdrSec1_CmbBank_Cd = document.getElementById("HdrSec1_CmbBank_Cd").value;
	var FromDate = document.getElementById("HdrSec1_DatFrom_Val").value;
	var todaydatepicker = document.getElementById("HdrSec1_DatTo_Val").value;
	//Check account is selceted or not
	if (!HdrSec1_CmbBank_Cd || HdrSec1_CmbBank_Cd == 1) {
		alert("Please Select an Back Account");
	} else {
		HTNPaginationCtrlLoadWithDataGrid();
		GetBal();
	}
   
}
function HTNPaginationCtrlLoadWithDataGrid() {
	var HdrSec1_CmbBank_Cd = document.getElementById("HdrSec1_CmbBank_Cd").value;
	var FromDate = document.getElementById("HdrSec1_DatFrom_Val").value;
	var todaydatepicker = document.getElementById("HdrSec1_DatTo_Val").value;
	LoadBannkRecGridView(HdrSec1_CmbBank_Cd, FromDate, todaydatepicker)
}
function LoadBannkRecGridView(HdrSec1_CmbBank_Cd, FromDate, todaydatepicker) {
	var dataSource = new kendo.data.DataSource({
		transport: {
			read: {
				data: {
					AccKy: HdrSec1_CmbBank_Cd,
					ToDate: todaydatepicker,
					FromDate: FromDate,
					PageNo: HTNPaginationCtrlData.PageNo,
					PageSize: HTNPaginationCtrlData.PageSize,
				},
				url: urlLoadBankRecGrid,
				dataType: "json"
			},
		},
		batch: true,
		pageSize: 50,
		schema: {
			model: {
				id: "TrnKy",
				fields: //Relavent fields of the grid should be bind with following model items
				{
					AccTrnRelKy: { editable: false, nullable: false, type: "number" },
					TrnKy: { editable: false, nullable: false, type: "number" },
					AccTrnKy: { editable: false, nullable: true, type: "string" },
					TrnDt: { editable: false, nullable: false, type: "string" },
					DRAmt: { editable: false, nullable: false, type: "number" },
					CRAmt: { editable: false, nullable: false, type: "number" },
					isrecon: { editable: true, nullable: false, type: "boolean" },
					RecDt: { editable: true, nullable: false, type: "string" },
					TrnType: { editable: false, nullable: false, type: "string" },
					Prefix: { editable: false, nullable: false, type: "string" },
					TrnNo: { editable: false, nullable: false, type: "number" },
					ChqDt: { editable: false, nullable: false, type: "string" },
					ChqNo: { editable: false, nullable: false, type: "string" },
					Description: { editable: false, nullable: false, type: "string" },

				}
			}
		}
	});

	$("#BanckRec").kendoGrid({
		dataSource: dataSource,
		autobind: true,
		navigatable: true,
		filterable:{
			mode: "row"
		},
	   // pageable: true,
		sortable: true,
		reorderable: true,
		columnMenu: true,
	//    height: 400,
		selectable: "row",
		pageable: { refresh: true, pageSizes: [50, 100,250,500,1000] },
		columns: [
				 { field: "AccTrnRelKy", title: "AccTrnRelKy", width: "100px", hidden: "true" },
				{ field: "TrnKy", title: "TrnKy", width: "100px", hidden: "true" },
				{ field: "AccTrnKy", title: "AccTrnKy", width: "100px", hidden: "true" },
				{ field: "TrnDt", title: "Eft Dt", width: "100px", },
				{ field: "DRAmt", title: "DR Amt", width: "150px", format: "{0:N2}", attributes: { style: "text-align:right;" } },
				{ field: "CRAmt", title: "CR AMT", width: "150px", format: "{0:N2}", attributes: { style: "text-align:right;" } },
				{ template: '<input type="checkbox" #= isrecon ? \'checked="checked"\' : "" # class="chkbx" />', title: "Reconciled", width: "70px", attributes: { style: "text-align:Center;" }, field: "isrecon", },
                { field: "ChqNo", title: "ChqNo", width: "100px" },
				{
					field: "RecDt", title: "RecDt", width: "100px",
					editor: function (container, options) {
						var model = options.model;
						var gview = $("#BanckRec").data("kendoGrid");
						var selectedItem = gview.dataItem(gview.select());
						var RecDate = selectedItem.TrnDt;
						var SplitArray = RecDate.split("/");
						var Year = SplitArray[2];
						var Month = SplitArray[0];
						var Date1 = SplitArray[1];

						$('<input id="Dtpick" name="' + options.field + '"/>').appendTo(container).kendoDatePicker({
							"min": new Date(Year, Month-1, Date1, 0, 0, 0, 0),
							change: function (e) {
								if (selectedItem.RecDt) {
									if (selectedItem.isrecon == true) {
										model.set("isrecon", true);
										model.set("RecDt", e.sender._oldText);

									   // selectedItem.set("RecDt", Todate);
										calTheSelected();
										Save()
									}
								}
								model.set("RecDt", e.sender._oldText);
							},
							//when the user gonna add a new record, combo should automatically bind the values from the Filter

						});
					}
				},
				{ field: "TrnType", title: "TrnType", width: "100px", },
				{ field: "Prefix", title: "Prefix", width: "100px", },
				{ field: "TrnNo", title: "TrnNo", width: "100px", },
				{ field: "ChqDt", title: "ChqDt", width: "100px" },    				
				{ field: "Description", title: "Description", width: "100px", },

		],
		resizable: true,
		editable: true,
		edit: function (e) {

		},
	});


	$("#BanckRec .k-grid-content").on("change", "input", function (e) {
		var Drgrid = $("#BanckRec").data("kendoGrid");
		dataItem = Drgrid.dataItem($(e.target).closest("tr"));
		if (dataItem == null) {
			return
		}
		dataItem.set("isrecon", this.checked);
		if (dataItem.isrecon == true) {
			dataItem.set("isrecon", true);
			var todaydatepicker = document.getElementById("HdrSec1_DatTo_Val").value;
			var afdate = todaydatepicker.split('/');
			var Date = afdate[0];
			var ddlfmonth = afdate[1];
			var ddlfyear = afdate[2];
			var Todate = ddlfmonth + '/' + Date + '/' + ddlfyear//ddlfyear + '/' +;
		  
		//   var todayDate = kendo.toString(kendo.parseDate(todaydatepicker), 'MM/dd/yyyy');
			dataItem.set("RecDt", Todate);
		 //   calTheSelected();
			Save()
		} else {
			dataItem.set("isrecon", false);
			dataItem.set("RecDt", "");
			dataItem.dirty = true;
		 //   calTheSelected();
			Save()
		}
	});
}


function GetBal() {
	var AccKy = document.getElementById("HdrSec1_CmbBank_Cd").value;
	var FromDate = document.getElementById("HdrSec1_DatFrom_Val").value;
	var todaydatepicker = document.getElementById("HdrSec1_DatTo_Val").value;
	GetAllBalances(AccKy, todaydatepicker, FromDate);
}

function GetAllBalances(AccKy, todaydatepicker, FromDate) {
	$.ajax({
		url: urlGetAllAccountBalances,
		data: JSON.stringify({
			AccKy: AccKy,
			ToDate: todaydatepicker,
			FromDate: FromDate
		}),
		contentType: 'application/json; charset=utf-8',
		dataType: "Json",
		type: "POST",
		success: function (data) {
			document.getElementById("LedBal").value = data[0].LedBalance;
			document.getElementById("LedgerBalAt").value = data[0].StLedBalance;
			document.getElementById("Opening").value = data[0].OpenBalance;
			document.getElementById("OpenigBalNow").value = data[0].StOpenBalance;
			document.getElementById("Balanceat").value = data[0].RecPeriodBalance;
			document.getElementById("BalnceForperiod").value = data[0].StRecPeriodBalance;
			document.getElementById("Balnce").value = data[0].Balance;
			document.getElementById("ReconBalAt").value = data[0].StBalance;

		   
		},
		error: function (e) {
		    alert("Something went wrong please reload the page");
		    //return false;
		}
	});

}


//Clear The Fields

function ClearAll() {
	//  $("#BanckRec").data('kendoGrid').dataSource.data([]);
	$("#HdrSec1_CmbBank_Cd").data("kendoComboBox").value("");
	$("#HdrSec1_CmbBank_Nm").data("kendoComboBox").value("");
	document.getElementById("Opening").value = "0.00";
	document.getElementById("Balanceat").value = "0.00";
	document.getElementById("LedBal").value = "0.00";
	document.getElementById("Balnce").value = "0.00";
	document.getElementById("OpenigBalNow").value = "0.00";
	document.getElementById("BalnceForperiod").value = "0.00";
	document.getElementById("LedgerBalAt").value = "0.00";
	document.getElementById("ReconBalAt").value = "0.00";
	document.getElementById("AccountNu").value = "";

}


function AccDoropCode(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
	{
		transport: {
			read: {
				url: urlGetAccDoropCode,
				data: {
					'ObjKy': ObjKy
				},
				dataType: "json"
			}
		}

	});
	return dataSource;
}

function AccDoropName(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
	{
		transport: {
			read: {
				url: urlGetAccDoropNm,
				data: {
					'ObjKy': ObjKy
				},
				dataType: "json"
			}
		}

	});
	return dataSource;
}

function GetAccountNumber(AccKy) {
	$.ajax({
		url: UrlBankDetailSelect,
		dataType: "json",
		type: "POST",
		data: JSON.stringify({
			AccKy: AccKy,
		}),
		contentType: 'application/json; charset=utf-8',
		success: function (BankDetails) {
			if (BankDetails.length >= 1) {
				var AccountNumber = BankDetails[0].AccountNu;
				document.getElementById("AccountNu").value = AccountNumber;
			} else {
				document.getElementById("AccountNu").value = "";
			}

		}
	});
}
//Save Funtion
function Save() {
	var grid = $("#BanckRec").data("kendoGrid");
	//Check if the Grid is load or not
	if (!grid) {
		alert("Please Load The form");
	} else {
		var currentData = grid.dataSource.data();
		var ModifiedRecords = [];
		for (var i = 0; i < currentData.length; i++) {
			if (currentData[i].dirty) {
				//this record is new
				ModifiedRecords.push(currentData[i].toJSON());
			}
		}

		//Sent To the Controler


		//Check if the grid is Changed
		if (ModifiedRecords.length != 0) {
			$.ajax({
				url: urlInserRec,
				data: JSON.stringify({
					UpdatedRecord: kendo.stringify(ModifiedRecords),
				}),
				contentType: 'application/json; charset=utf-8',
				dataType: "Json",
				type: "POST",
				success: function (data) {
					if (data == true) {
						//alert("Successfully Saved..!");
						//var Grid = $("#BanckRec").data("kendoGrid");
						//Grid.destroy();
						//$("#BanckRec").empty();
						//$("#BanckRec").data('kendoGrid').dataSource.data([]);
					   // Preview();
						GetBal();
					} else { 
						alert("Record Not Saved");

					}


				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
				    if (XMLHttpRequest.readyState == 4) {
				        alert("Record Not Saved,Please Reload the page  ");
				        Preview();
				        // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
				    }
				    else if (XMLHttpRequest.readyState == 0) {
				        alert("Record Not Saved,A network-related or instance-specific error occurred,Please Reload the page ");
				        Preview();
				        // Network error (i.e. connection refused, access denied due to CORS, etc.)
				    }
				    else {
				        alert("Oops! Something went wrong,Record Not Saved,Please Reload the page ");
				        Preview();

				        // something weird is happening
				    }
				}
			});


		} else {

			alert("Please Select Reconciliation details");
		}


	}

}