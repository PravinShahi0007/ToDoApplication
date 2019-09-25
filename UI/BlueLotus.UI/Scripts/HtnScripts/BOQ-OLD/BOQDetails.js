//Top Grid Div Functions
$(function () {
	loadBOQDetailsByBOQKy(1);

	$("#tGridBOQDetails_SelectWeb").delegate("tbody>tr>td:not(.k-edit-cell)", "dblclick", function () { // tbody>tr
	    openResTab(); //Function is in ResAllocationforBOQ. To Open the first tab from tab strip
		var gview = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
		var selectedItem = gview.dataItem(gview.select());
		var ItmCd = selectedItem.ItmCd;
		var ItmNm = selectedItem.ItmNm;
		$("#TaskNm").show();
		$("#TaskId").show();
		$("#TaskId").val(ItmCd);
		$("#TaskNm").val(ItmNm);


		$("#ResourceAnalysisWin").show().kendoWindow({
			width: "1250px",
			height: "650px",
			modal: true,
			title: "View And Manage Task Resource Details"
		});

		$('#ResourceAnalysisWin').data('kendoWindow').center().open();

		try {
			//$('#divGrid').data().kendoGrid.destroy();
			//$('#divGrid').empty();
		} catch (e) { }
		//loadBOQComponents_SelectWeb(selectedItem.BOQDetKy);
	});

});

function AssignResrc() {
	try {
		var gview = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
		var selectedItem = gview.dataItem(gview.select());
		var TskId = selectedItem.ItmCd;
		var TskNm = selectedItem.ItmNm;
		var AdrKy = ($("#clientCmb").val()) ? $("#clientCmb").data("kendoComboBox").value() : 1;
		var reslvl1selected = 0;
		var reslvl2selected = 0;
		var reslvl1 = $("#gridForAloc").data("kendoGrid");
		var reslvl2 = $("#AdrgridForAloc").data("kendoGrid");
		var selectedDataItem2 = reslvl2.dataItem(reslvl2.select());
		if (selectedDataItem2 == null) {
		    var selectedDataItem1 = reslvl1.dataItem(reslvl1.select());
		    if (selectedDataItem1 == null) {
		        alert("Please select a resource");
		    }
		    else {
		        reslvl1selected = 1;
		    }
		}
		else {
		    var selectedDataItem2 = reslvl2.dataItem(reslvl2.select());
		    reslvl2selected = 1;
		}
	    var finalRes = $("#grid2").data("kendoGrid");
	    var dataSource = finalRes.dataSource;
	    if (reslvl1selected == 1)
	    {
	        var gridForAloc = $("#gridForAloc").data("kendoGrid");
	        var selectedDataItem1 = gridForAloc.dataItem(gridForAloc.select());
	        var ResCd = selectedDataItem1.ResCd;
	        var ResNm = selectedDataItem1.ResNm;
	        var Unit = selectedDataItem1.Unit;
	    }
	    if (reslvl2selected == 1) {
	        var AdrgridForAloc = $("#AdrgridForAloc").data("kendoGrid");
	        var selectedDataItem2 = AdrgridForAloc.dataItem(AdrgridForAloc.select());

	        var AdrId = selectedDataItem2.AdrID;
	        var AdrNm = selectedDataItem2.AdrNm;
	        var Unit = selectedDataItem2.Unit;
	    }
	    $("#gridForAloc").find("tr.k-state-selected").removeClass("k-state-selected");//to unselect the selected row
	    $("#AdrgridForAloc").find("tr.k-state-selected").removeClass("k-state-selected");
	    if (reslvl1selected == 1) {
	        dataSource.add({
	            TaskID: TskId,
	            TaskNm: TskNm,
	            AdrKy: AdrKy,
	            ResCd: ResCd,
	            ResNm: ResNm,
	            Unit: Unit

	        })
	    }
	    if (reslvl2selected == 1) {
	        dataSource.add({
	            TaskID: TskId,
	            TaskNm: TskNm,
	            AdrKy: AdrKy,
	            ResCd: AdrId,
	            ResNm: AdrNm,
	            Unit: Unit

	        })
	    }
	    





		//var dataSource = reslvl2.dataSource;
		//var total = dataSource.data().length;
		//var reslvl2count = reslvl2.dataSource.total();








		//var reslvl1 = $("#gridForAloc").data("kendoGrid");
		//var selectedDataItem = reslvl1.dataItem(reslvl1.select());
		//if (selectedDataItem == null) {
		//	alert("Please select a resource");
		//}
		//else {
		//	reslvl1selected = 1;
		//}


		//if (reslvl1selected == 1)
		//{
		//	var reslvl2 = $("#AdrgridForAloc").data("kendoGrid");
		//	var dataSource = reslvl2.dataSource;
		//	var total = dataSource.data().length;
		//	var reslvl2count = reslvl2.dataSource.total();
		//	if (reslvl2count == 1) {
		//		reslvl2selected = 1;
		//		reslvl1selected = 0;
		//	}
		//	else
		//	{
		//		var selectedDataItem = reslvl2.dataItem(reslvl2.select());
		//		if (selectedDataItem == null) {
		//		alert("Please select a resource");
		//	}
		//}
		//}
		//var child = $("#grid2").data("kendoGrid");
		//var dataSource = child.dataSource;
		//if (reslvl1selected == 1)
		//{
		//	var resGrid = $("#gridForAloc").data("kendoGrid");
		//	var selectedDataItem = resGrid.dataItem(resGrid.select());
		//	var ResCd = selectedDataItem.ResCd;
		//	var ResNm = selectedDataItem.ResNm;
		//	var Unit = selectedDataItem.Unit;
		//	dataSource.add({
		//		TaskID: TskId,
		//		TaskNm: TskNm,
		//		AdrKy: AdrKy,
		//		ResCd: ResCd,
		//		ResNm: ResNm,
		//		Unit: Unit

		//	})
		//}
		//if (reslvl2selected == 1) {
	    //	var resGrid = $("#AdrgridForAloc").data("kendoGrid");

		//	var selectedDataItem = resGrid.dataItem(resGrid.select());
		//	var ResCd = selectedDataItem.AdrId;
		//	var ResNm = selectedDataItem.AdrNm;
		//	var Unit = selectedDataItem.Unit;
		//	dataSource.add({
		//		TaskID: TskId,
		//		TaskNm: TskNm,
		//		AdrKy: AdrKy,
		//		ResCd: ResCd,
		//		ResNm: ResNm,
		//		Unit: Unit

		//	})
		//}
		

	 







//		if (reslvl1select == 1)
//		{
//		    var reslvl2 = $("#AdrgridForAloc").data("kendoGrid");
//		    var dataSource = reslvl2.dataSource;
//		    var total = dataSource.data().length;
//		    var reslvl2count = reslvl2.dataSource.total();
//		    if (reslvl2count == 1) {
//		        reslvl2.select("tr:eq(1)");
//		        reslvl2select = 1;
//		    }
//		    else {
//		        var selectedDataItem = reslvl2.dataItem(reslvl2.select());
//		        if (selectedDataItem == null) {
//		            alert("Please select a resource")
//		        }
//		        else {
//var resGrid = $("#HtnResAdrSelect").data("kendoGrid");
//		//	var selectedDataItem = resGrid.dataItem(resGrid.select());
//		//	var ResCd = selectedDataItem.ResCd;
//		//	var ResNm = selectedDataItem.ResNm;
//		//	var Unit = selectedDataItem.Unit;
//		        }
//		    }
//		}









//		var reslvl2 = $("#AdrgridForAloc").data("kendoGrid");
//		var dataSource = reslvl2.dataSource;
//		var total = dataSource.data().length;
//		var reslvl2count = reslvl2.dataSource.total();
//		if (reslvl2count == 1)
//		{
//		    reslvl2.select("tr:eq(1)");
//		    reslvl2select = 1;
//		}
//		else
//		{
//		    var selectedDataItem = reslvl2.dataItem(reslvl2.select());
//		    if (selectedDataItem == null) {
//		        alert("Please select a resource")
//		    }
//		}







		//else
		//{
		//	var reslvl1 = $("#gridForAloc").data("kendoGrid");
		//	var selectedDataItem = resGrid.dataItem(reslvl1.select());
		//	if (selectedDataItem == null) {
		//		alert("Please select a resource")
		//	}
		//	else
		//	{
		//		reslvl2select = 1;
		//	}
		//}

		//if (reslvl1select == 1)
		//{
		//	var resGrid = $("#gridForAloc").data("kendoGrid");
		//	var selectedDataItem = resGrid.dataItem(resGrid.select());
		//	var ResCd = selectedDataItem.ResCd;
		//	var ResNm = selectedDataItem.ResNm;
		//	var Unit = selectedDataItem.Unit;
		//}
		//if (reslvl2select == 1) {
		//	var resGrid = $("#HtnResAdrSelect").data("kendoGrid");
		//	var selectedDataItem = resGrid.dataItem(resGrid.select());
		//	var ResCd = selectedDataItem.ResCd;
		//	var ResNm = selectedDataItem.ResNm;
		//	var Unit = selectedDataItem.Unit;
		//}
		//var child = $("#grid2").data("kendoGrid");
		//var dataSource = child.dataSource;
		//var total = dataSource.data().length;
		//var count = child.dataSource.total();
		//var lineNo = count;

		//dataSource.add({
		//	TaskID: TskId,
		//	TaskNm: TskNm,
		//	AdrKy: AdrKy,
		//	ResCd: ResCd,
		//	ResNm: ResNm

		//})

	}

catch (exception) {
	alert("Error" + exception)
}



}

function calcTotal(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, Disper, ConvRate, model) {

    //total=(trnQty*ConvRate*rateBasic*(1-(Disper*0.01))*(1+(profitPer+DOHPer+GOHPer)*0.01))
    //9*4*700*(1-(4 * 0.01))*(1+(1+3+2)*0.01)

	var varTGridBOQDetails_SelectWeb = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
	var dataRows = varTGridBOQDetails_SelectWeb.items();
	var rowIndex = dataRows.index(varTGridBOQDetails_SelectWeb.select());
	var dtaSrc = varTGridBOQDetails_SelectWeb.dataSource._data;
	var total = (parseFloat(trnQty) * parseFloat(ConvRate) * parseFloat(rateBasic) * (1 - (parseFloat(Disper) * 0.01)) * (1 + ((parseFloat(profitPer) + parseFloat(dOHPer) + parseFloat(gOHPer)) * 0.01)));
	model.set("Total", parseFloat(total).toFixed(2));
	varTGridBOQDetails_SelectWeb.refresh();
}
function loadBOQDetailsByBOQKy(BOQKy) {
	
	var pageNo = $("#boqDetidPageNo").val();
	var pageSize = $("#boqDetidPageSize option:selected").val();

	if (searchBOQSearchSelectCriteriaPicker == "MainBOQWindow") {
		var pageNo = $("#boqDetidPageNo").val();
		var pageSize = $("#boqDetidPageSize option:selected").val();
	} else if (searchBOQSearchSelectCriteriaPicker == "CopyBOQWindow") {
		var pageNo = $("#boqCpyDetidPageNo").val();
		var pageSize = $("#boqCpyDetidPageSize option:selected").val();
	}

	// TODO Need to add all columns in model
	var BOQDetails_SelectWebDataSource = new kendo.data.DataSource({
		transport: {
			read:
			{
				data: { BOQKy: BOQKy, PageNo: pageNo, PageSize: pageSize, isCpyBOQ: false },
				url: urlBOQDetails_SelectWeb,
				dataType: "json"
			}
		},
		batch: true,
		schema: {
			model: {
				id: "BOQky",
				fields: {
					BOQDetKy: {},
					LiNo: { editable: false },
					ItmKy: {},
					ItmNo: {},
					ItmNm: {
						//validation: {
						//    required: true,
						//    ItmNm: function (input) {
						//        if (input.val() != "") {
						//            input.attr("data-ItmNm-msg", "Product Name should start with capital letter");
						//            return /^[A-Z]/.test(input.val());
						//        }
						//        return true;
						//    }
						//}
					},
					TrnUM: {},
					Qty: {},
					RateWMrkUp: {},
					ConvRate: {},
					Total: {},
					RateBasic: {  },
					//isContainSubTask: { type: "boolean",visible:false },
				}
			}
		}
		//, pageSize: 20
	});


	// TODO Need to add all columns in model
	var CpyBOQDetails_SelectWebDataSource = new kendo.data.DataSource({
		transport: {
			read:
			{
				data: { BOQKy: BOQKy, PageNo: pageNo, PageSize: pageSize, isCpyBOQ: true },
				url: urlBOQDetails_SelectWeb,
				dataType: "json"
			}
		},
		batch: true,
		schema: {
			model: {
				id: "BOQky",
				fields: {
					BOQDetKy: {},
					LiNo: { editable: false },
					ItmKy: {},
					ItmNo: {},
					ItmNm: {},
					TrnUM: {},
					Qty: {},
					RateWMrkUp: {},
					ConvRate: {},
					Total: {},
					RateBasic: {},
					//isContainSubTask: { type: "boolean" },
				}
			}
		}
		//, pageSize: 20
	});

	if (searchBOQSearchSelectCriteriaPicker == "MainBOQWindow") {
		defineBOQDetails_SelectWebGrid(BOQDetails_SelectWebDataSource);
	} else if (searchBOQSearchSelectCriteriaPicker == "CopyBOQWindow") {
		defineCpyBOQDetails_SelectWebGrid(CpyBOQDetails_SelectWebDataSource);
	}
}

function intBOQDetailsByBOQKy(urlBOQDetailsXml, xml) {
	var BOQDetails_SelectWebDataSource = new kendo.data.DataSource({
		transport: {
			read:
			{
				data: { xmlData: xml },
				url: urlBOQDetailsXml,
				dataType: "json"
			}
		},
		batch: true,
		schema: {
			model: {
				id: "BOQDetKy",
				fields: {
					BOQky: {
						editor: function (container, options) {
							var model = options.model;

						}
					},
					LiNo: {
						editable: false,
						editor: function (container, options) {
							var model = options.model;

						}
					},
					ItmKy: {
						editor: function (container, options) {
							var model = options.model;

						}
					},
					ItmNo: {
						editor: function (container, options) {
							var model = options.model;

						}
					},
					ItmNm: {},
					TrnUM: {},
					Qty: {
						type: "number", editor: function (container, options) {
							var model = options.model;

						}
					},
					RateWMrkUp: {
						editor: function (container, options) {
							var model = options.model;

						}
					},
					ConvRate: {
						editor: function (container, options) {
							var model = options.model;

						}
					},
					Total: {
						type: "number", editor: function (container, options) {
							var model = options.model;

						}
					},
					RateBasic: {
						type: "number", editor: function (container, options) {
							var model = options.model;

						}
					},
					ProfitPer: {
						type: "number", editor: function (container, options) {
							var model = options.model;

						}
					},
					DisPer: {
						type: "number", editor: function (container, options) {
							var model = options.model;

						}
					},
					GOHPer: {
						type: "number", editor: function (container, options) {
							var model = options.model;

						}
					},
					//isContainSubTask: {
					//	type: "boolean", editor: function (container, options) {
					//		var model = options.model;

					//	}, editable: false
					//},
					BOQHdrCdKy: {
						editor: function (container, options) {
							var model = options.model;

						}
					}
				}
			}
		},
		pageSize: 20
	});

	defineBOQDetails_SelectWebGrid(BOQDetails_SelectWebDataSource);
}


function defineBOQDetails_SelectWebGrid(BOQDetails_SelectWebDataSource) {

	// Data Sources for Unit combo Binding On BOQDet Grid.
	var varDtaSrcUnitCombo = new kendo.data.DataSource(
	{
		transport: {
			read: {
				url: urlGetUnit,
				dataType: "json"
			}
		}
	});

	// Data Sources for ItemCode combo Binding On BOQDet Grid.
	var varDtaSrcItmNoCombo = new kendo.data.DataSource(
	{
		transport: {
			read: {
				url: urlItmByTrnTyp_SelectWeb,
				data: { TrnTypKy: globalBOQTypKy },
				dataType: "json"
			}
		}
	});

	// Bind On BOQDet Grid.
	var varTGridBOQDetails_SelectWeb = $("#tGridBOQDetails_SelectWeb").kendoGrid({
		dataSource: BOQDetails_SelectWebDataSource,
		//navigatable: true,
		selectable: 'multiple',
		allowCopy: true,
		scrollable: true,
		//reorderable: true,
		resizable: true,
		columnMenu: true,
		//pageable: true,
		//groupable: true,
		filterable: true,
		sortable: true,
		height: 510,
		dataBound: function () {
			$('#tGridBOQDetails_SelectWeb .k-grid-content').height(445);
		},
		//filterable: {
		//    mode: "row"
		//},
		columnMenu: true,
		toolbar: [
			{
				name: "AddTask",
				text: "Add Task",
				click: function (e) {
					return false;
				}
			},
			{
				name: "InsertBefore",
				text: "",
				imageClass: "rowBeforeInsert",
				click: function (e) {
					return false;
				}
			},
			{
				name: "InsertAfter",
				text: "",
				imageClass: "rowAfterInsert",
				click: function (e) {
					return false;
				}
			},
			{
				name: "deleteSelectedow",
				text: "Delete",
				//imageClass: "myStyle",
				click: function (e) {
					return false;
				}
			},
			"cancel", "excel"
		],        // "save",
		excel: {
			allPages: true,
			fileName: "ResourceOfBOQDet.xlsx",
		},
		columns: [
			{
				field: "BOQky", hidden: "true",
				locked: true,
				lockable: false
			},
			{
				field: "BOQDetKy", hidden: "true",
				locked: true,
				lockable: false
			},
			{
				field: "LiNo", title: "Line No", width: '90px',
				locked: true
			},
			{
				field: "ItmKy", title: "Item Key", width: '120px', hidden: "true",
				locked: true,
				lockable: false
			},
			{
				field: "ItmNo", title: "Item No", width: '100px',
				locked: true
			},
			//{
			//	field: "ItmCd", title: "Item Code", width: "250px",
			//	editor: function (container, options) {
			//		var model = options.model;

			//		$('<input id="cmbUnitKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
			//			dataSource: varDtaSrcItmNoCombo,
			//			change: function (e) {

			//			    
			//				combo = e.sender;
			//				selectedItm = combo.select();
			//				dataItem = combo.dataItem(selectedItm);

			//				model.set("ItmKy", dataItem.ItmKy);
			//				model.set("ItmCd", dataItem.ItmCd);

			//				var selectBoqdetItm = varTGridBOQDetails_SelectWeb.dataItem(varTGridBOQDetails_SelectWeb.select());
			//				//alert("BOQDetKy : " + selectBoqdetItm.BOQDetKy + " and ItmKy : " + dataItem.ItmKy);

			//				itmkyItmKyChangePopUpBOQDet = dataItem.ItmKy;
			//				boqdetkyItmKyChangePopUpBOQDet = selectBoqdetItm.BOQDetKy;

			//				//itmKyChangePopUpBOQDet.dialog("open");
			//			},
			//			dataValueField: "ItmKy",
			//			dataTextField: "ItmCd",
			//			dataBound: function (e) { }
			//		});
			//	}
			//}
			//,
			{
				field: "ItmCd", title: "Item Code", width: '120px',
				lockable: false

			},

			{
				field: "ItmNm", title: "Item Name", width: '500px',
				lockable: false

			},

			{
				field: "TrnUnitKy", title: "TrnUnitKy", width: '120px', hidden: "true",
				locked: true,
				lockable: false
			},
			{
				field: "TrnUM", title: "Usage Unit", width: "120px",
				editor: function (container, options) {
					var model = options.model;

					$('<input id="cmbUnitKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
						dataSource: varDtaSrcUnitCombo,
						change: function (e) {

							combo = e.sender;
							selectedItm = combo.select();
							dataItem = combo.dataItem(selectedItm);

							model.set("TrnUnitKy", dataItem.UnitKy);
							model.set("TrnUM", dataItem.Unit);
						},
						dataValueField: "UnitKy",
						dataTextField: "Unit",
						dataBound: function (e) {
						}
					});
				}
			}
			,
			//{ field: "Qty", title: "Quantity", width: '100px' },

			//{
			//	field: "Cal", title: "*", width: '50px',
			//	template: "<img src='../../Images/PMIcons/calculator.png'/>",
			//	editor: function (container, options) {
			//		var model = options.model;

			//		// Add containers to the DOM
			//		var $calculator = $('<div/>', { id: 'calculatorCal' }).appendTo($('<div/>', { id: 'cal' }));
			//		var $input = $('<input/>', { id: 'inputCal' }).appendTo($calculator);
			//		var $buttons = $('<div/>', { id: 'buttonsCal' }).appendTo($calculator);

			//		// Add buttons to the DOM
			//		$.each('0123456789.=+-*/()←C'.split(''), function () {
			//			var $button = $('<button/>', {
			//				id: 'buttonCal',
			//				text: this.toString(), click: function () {
			//					// Handle button clicks
			//					switch ($(this).text()) {
			//						// '=' will fetch the current expression string, evaluate it,
			//						// and write the result back into the input/output field.
			//						// That's where the actual calculation happens.
			//						case '=': try {
			//							$input.val(eval($input.val()));
			//							model.set("Qty", $input.val());
			//						} catch (e) {
			//							alert("ERROR");
			//							//$input.val('ERROR');
			//							return false;
			//						}
			//							// 'C' will clear the input/output field
			//							break; case 'C': return $input.val('');
			//								// 'CE' will delete the last character from the input/output field
			//								break; case '←': return $input.val($input.val().replace(/.$/, ''));
			//									// All other buttons will add a character to the input/output field
			//									break; default: $input.val($input.val() + $(this).text());
			//					}
			//				}
			//			}).appendTo($buttons);
			//		});

			//		// Calculater Window Popup
			//		$calculator.show().kendoWindow({
			//			width: "170px",
			//			height: "240px",
			//			modal: true,
			//			title: "Cal",
			//			close: function () {
			//				try {
			//					$input.val(eval($input.val()));
			//				} catch (e) {
			//					alert("ERROR");
			//					return false;
			//				}
			//			}
			//		});
			//		$calculator.data('kendoWindow').center().open();

			//		$input.val(model.Qty);
			//		var strLength = $input.val().length * 2;
			//		$input.focus();
			//		$input[0].setSelectionRange(strLength, strLength);

			//		$input.keypress(function handle(e) {
			//			if (e.charCode === 61) {
			//				try {
			//					$input.val(eval($input.val()));
			//				} catch (e) {
			//					alert("ERROR");
			//					return false;
			//				}
			//				model.set("Qty", $input.val())
			//				$calculator.data('kendoWindow').center().close();
			//			}
			//		});

			//	}
			//},
			{ field: "TrnQty", title: "Trn Qty", width: '100px' },
			{ field: "RateWMrkUp", title: "RateWithMarkUp", width: '80px' },
			{ field: "ConvRate", title: "ConvRate", width: '80px' },
			{ field: "Total", title: "Total", width: '80px' },
			{ field: "RateBasic", title: "Basic Rate", width: '120px' },
			{ field: "ProfitPer", title: "ProfitPer", width: '120px' },
			{ field: "DisPer", title: "DisPer", width: '80px' },
			{ field: "DOHPer", title: "DOHPer", width: '80px' },
			{ field: "GOHPer", title: "GOHPer", width: '100px' },
			//{
			//	field: "isContainSubTask", title: "isContainSubTask", width: "85px", editable: false,
			//	template: "<input name='isContainSubTask' class='ob-paid' type='checkbox' data-bind='checked: isContainSubTask' #= isContainSubTask ? checked='checked' : '' # />"
			//},
			{ field: "BOQDetCat1Ky", title: "BOQDetCat1Ky", width: '140px', hidden: "true" },
			{ field: "BOQHdrCdKy", title: "BOQHdrCdKy", width: '120px', hidden: "true" }],
		editable: true,
		edit: function (e) {

			var input = e.container.find(".k-input");
			var td = input.closest("td");
			var rowIndex = td.parent().index();
			var cellIndex = td.index();


			input.on("keydown", function (event) {
				if (event.keyCode == 13) {
					if (cellIndex == 0) {

						var input = e.container.find(".k-input");
						var ItmCd = input.val();
						if (ItmCd != 0 || ItmCd != null) {
							$.ajax({
								url: urlgetItmDetails,
								dataType: "json",
								type: "POST",
								data: JSON.stringify({

									ItmCd: ItmCd

								}),
								contentType: 'application/json; charset=utf-8',
								success: function (list) {
									
									if (list == "ItmCdWrng") {
										if (confirm('Cannot find the item. Do you want to open item picker?')) {
											CallItmNmWindow();
										}
										else {
											var parent = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
											var selectedDataItem = parent.dataItem(parent.select());
											selectedDataItem.set("");
										}
									}
									else {
										for (i = 0; i < list.length; i++) {
											var itmcd = list[0].ItmCd;
											var itmnm = list[0].ItmNm;
											var itmky = list[0].ItmKy;
											var unitky = list[0].TrnUnitKy;
											var unit = list[0].Unit;
											var ratebasic = list[0].Rate;
											var input = e.container.find(".k-input");
											
											setItmDet(itmcd, itmnm, itmky, unitky, unit, ratebasic, e.model);

										}

										for (i = 0; i < list.length; i++) {

											var itmNm = list[0].itmNm;
											var itmKy = list[0].itmKy;
											var input = e.container.find(".k-input");

											
											//changeKyAndNm(itmcd, itmky, itmnm, e.model);
											//setProp(itmcd, itmky, itmnm, Unit, UnitKy, Rate, DisPer, VAT, NBT, SVAT, WHT, e.model);


											//CreateNewGridRow();
											//cellIndex = 6;


											//var cellCloseT = $('#grid1').data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent());

											//$('#grid1').data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").next().focusin(cellCloseT));

											//var grid = $("#grid1").data("kendoGrid");
											//grid.dataSource.read();
											//var count = grid.dataSource.total();
											//setRow(count, e.model);

										}
									}
								},
								error: function (e) {
									alert("Item Finding Error !");
								}

							});

						}
					}
					return false;
				}
			});









			//var input = e.container.find(".k-input");
			//var value = input.val();
			//input.keyup(function () {
			//    value = input.val();
			//});
			//$("[name='Qty']", e.container).blur(function () {
			//    var input = $(this);
			//    alert(input.attr('name') + " blurred : " + value);
			//    var grid = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
			//    var row = $(this).closest("tr");
			//    var item = grid.dataItem(row);
			//    alert("Total is : " + item.Total);
			//});

			//// -------------------------------- Enter Key Press Focus Nxt Cell.
			//var input = e.container.find(".k-input");
			//var td = input.closest("td");
			//var rowIndex = td.parent().index();
			//var cellIndex = td.index();
			//    //input.on("keydown", function (event) {
			//    window.onkeydown = function (event) {
			//        if (event.keyCode == 13) {
			//            varTGridBOQDetails_SelectWeb.editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").next().focusin(varTGridBOQDetails_SelectWeb.closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent())));
			//            return false;
			//        }
			//    }
			//    //});
			//// ---------------------- 
		},
		save: function (e) {
			var total = e.model.Total;
			var trnQty = e.model.TrnQty;
			var ratewithmarkup = e.model.RateWMrkUp;
			var rateBasic = e.model.RateBasic;
			var oHPer = e.model.OHPer;
			var intrRate = e.model.IntrRate;
			var dOHPer = e.model.DOHPer;
			var gOHPer = e.model.GOHPer;
			var profitPer = e.model.ProfitPer;
			var DisPer = e.model.DisPer;
			var ConvRate = e.model.ConvRate;
			if (total == undefined || total == null || total == "") {
				total = 0.00;
				e.model.set("Total", total);
			}
			if (ConvRate == undefined || ConvRate == null || ConvRate == "") {
				ConvRate = 0.00;
				e.model.set("ConvRate", ConvRate);
			}
			if (trnQty == undefined || trnQty == null || trnQty == "") {
				trnQty = 0.00;
				e.model.set("TrnQty", trnQty);
			}
			if (ratewithmarkup == undefined || ratewithmarkup == null || ratewithmarkup == "") {
				ratewithmarkup = 0.00;
				e.model.set("RateWMrkUp", ratewithmarkup);
			}
			if (rateBasic == undefined || rateBasic == null || rateBasic == "") {
				rateBasic = 0.00;
				e.model.set("RateBasic", rateBasic);
			}
			if (profitPer == undefined || profitPer == null || profitPer == "") {
				profitPer = 0.00;
				e.model.set("ProfitPer", profitPer);
			}
			if (DisPer == undefined || DisPer == null || DisPer == "") {
				DisPer = 0.00;
				e.model.set("DisPer", DisPer);
			}
			if (dOHPer == undefined || dOHPer == null || dOHPer == "") {
				dOHPer = 0.00;
				e.model.set("DOHPer", dOHPer);
			}
			if (gOHPer == undefined || gOHPer == null || gOHPer == "") {
				gOHPer = 0.00;
				e.model.set("GOHPer", gOHPer);
			}
			if (e.values.Total) {
				Total = e.values.Total;
				calcRate(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, ConvRate, e.model);
			}
			if (e.values.Rate) {
				Rate = e.values.Rate;
				calcRate(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, ConvRate, e.model);
			}
			if (e.values.ProfitPer) {
				ProfitPer = e.values.ProfitPer;
				calcRate(ratewithmarkup, rateBasic, dOHPer, gOHPer, ProfitPer, trnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, rateBasic, dOHPer, gOHPer, ProfitPer, trnQty, DisPer, ConvRate, e.model);
			}
			if (e.values.TrnQty) {
				TrnQty = e.values.TrnQty;
				calcRate(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, TrnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, TrnQty, DisPer, ConvRate, e.model);
			}
			if (e.values.DOHPer) {
				DOHPer = e.values.DOHPer;
				calcRate(ratewithmarkup, rateBasic, DOHPer, gOHPer, profitPer, trnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, rateBasic, DOHPer, gOHPer, profitPer, trnQty, DisPer, ConvRate, e.model);
			}
			if (e.values.GOHPer) {
				GOHPer = e.values.GOHPer;
				calcRate(ratewithmarkup, rateBasic, dOHPer, GOHPer, profitPer, trnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, rateBasic, dOHPer, GOHPer, profitPer, trnQty, DisPer, ConvRate, e.model);
			}
			if (e.values.DisPer) {
				DisPer = e.values.DisPer;
				calcRate(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, ConvRate, e.model);
			}
			if (e.values.RateBasic) {
				RateBasic = e.values.RateBasic;
				calcRate(ratewithmarkup, RateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, RateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, ConvRate, e.model);
			}
			if (e.values.ConvRate) {
			    ConvRate = e.values.ConvRate;
				calcRate(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, e.model);
				calcTotal(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, DisPer, ConvRate, e.model);
			}
		}
	}).data("kendoGrid");

	$(".k-grid-AddTask", "#tGridBOQDetails_SelectWeb").bind("click", function (ev) {
		
		var dtaSrc = varTGridBOQDetails_SelectWeb.dataSource._data;
		if (dtaSrc.length <= 0 || dtaSrc == undefined) {
			//varTGridBOQDetails_SelectWeb.dataSource.insert(0, { LiNo: 1, isContainSubTask: false });
			varTGridBOQDetails_SelectWeb.dataSource.insert(0, { LiNo: 1 });
		} else {
			var nxtSlectedBOQDet = dtaSrc[dtaSrc.length - 1];
			//varTGridBOQDetails_SelectWeb.dataSource.insert(dtaSrc.length, { LiNo: (parseFloat(nxtSlectedBOQDet.LiNo) + parseInt(nxtSlectedBOQDet.LiNo) + 1) / 2, isContainSubTask: false });
			varTGridBOQDetails_SelectWeb.dataSource.insert(dtaSrc.length, { LiNo: (parseFloat(nxtSlectedBOQDet.LiNo) + parseInt(nxtSlectedBOQDet.LiNo) + 1) / 2});
		}
	});

	$(".k-grid-InsertBefore", "#tGridBOQDetails_SelectWeb").bind("click", function (ev) {
		var newLiNo = 1;
		var seletedBOQDet = varTGridBOQDetails_SelectWeb.dataItem(varTGridBOQDetails_SelectWeb.select());
		if (seletedBOQDet != null) {
			var idx = varTGridBOQDetails_SelectWeb.dataSource.indexOf(seletedBOQDet);
			var nxtSlectedBOQDet = varTGridBOQDetails_SelectWeb.dataSource._data[idx - 1];
			if (nxtSlectedBOQDet == undefined || nxtSlectedBOQDet == null) {
				newLiNo = (parseFloat(seletedBOQDet.LiNo)) / 2;
			} else {
				newLiNo = (parseFloat(seletedBOQDet.LiNo) + parseFloat(nxtSlectedBOQDet.LiNo)) / 2;
			}
			//varTGridBOQDetails_SelectWeb.dataSource.insert(idx, { LiNo: newLiNo, isContainSubTask: false });
			varTGridBOQDetails_SelectWeb.dataSource.insert(idx, { LiNo: newLiNo });
		} else {
			alert("Select one row and insert ... !");
		}
	});

	$(".k-grid-InsertAfter", "#tGridBOQDetails_SelectWeb").bind("click", function (ev) {
		var newLiNo = 1;
		var seletedBOQDet = varTGridBOQDetails_SelectWeb.dataItem(varTGridBOQDetails_SelectWeb.select());
		if (seletedBOQDet != null) {
			var idx = varTGridBOQDetails_SelectWeb.dataSource.indexOf(seletedBOQDet);
			var nxtSlectedBOQDet = varTGridBOQDetails_SelectWeb.dataSource._data[idx + 1];
			if (nxtSlectedBOQDet == undefined || nxtSlectedBOQDet == null) {
				newLiNo = (parseFloat(seletedBOQDet.LiNo) + 1) / 2;
			} else {
				newLiNo = (parseFloat(seletedBOQDet.LiNo) + parseFloat(nxtSlectedBOQDet.LiNo)) / 2;
			}
			//varTGridBOQDetails_SelectWeb.dataSource.insert(idx + 1, { LiNo: newLiNo, isContainSubTask: false });
			varTGridBOQDetails_SelectWeb.dataSource.insert(idx + 1, { LiNo: newLiNo });
		} else {
			alert("Select one row and insert ... !");
		}
	});

	$(".k-grid-deleteSelectedow", "#tGridBOQDetails_SelectWeb").bind("click", function (ev) {
		removeSelectedRowtGridBOQDetails_SelectWeb();
	});

	//$("#tGridBOQDetails_SelectWeb").on("click", "td", function (e) {
	//    var rowIndex = $(this).parent().index();
	//    var cellIndex = $(this).index();
	//    //$("input").on("keydown", function (event) {
	//    window.onkeydown = function (event) {
	//        if (event.keyCode == 13) {
	//            varTGridBOQDetails_SelectWeb.editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").next().focusin(varTGridBOQDetails_SelectWeb.closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent())));
	//            return false;
	//        }
	//    }
	//    //});
	//});

	//var grid = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
	//grid.tbody.on("change", ".ob-paid", function (e) {
	//	var row = $(e.target).closest("tr");
	//	var item = grid.dataItem(row);
	//	item.set("isContainSubTask", $(e.target).is(":checked") ? true : false);
	//});
}

function calcRate(ratewithmarkup, rateBasic, dOHPer, gOHPer, profitPer, trnQty, Disper, model) {
	
	ratewithoutDisper = parseFloat(rateBasic) * (((parseFloat(dOHPer) + parseFloat(gOHPer) + parseFloat(profitPer)) / 100) + 1);
	var varTGridBOQDetails_SelectWeb = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
	var dataRows = varTGridBOQDetails_SelectWeb.items();
	var rowIndex = dataRows.index(varTGridBOQDetails_SelectWeb.select());
	var dtaSrc = varTGridBOQDetails_SelectWeb.dataSource._data;
	if (Disper <= 0) {
		
			model.set("RateWMrkUp", parseFloat(ratewithoutDisper).toFixed(2));
			var total = parseFloat(ratewithoutDisper) * parseFloat(trnQty);
			model.set("RateWMrkUp", parseFloat(total).toFixed(2));
			//dtaSrc[rowIndex].Total = parseFloat(total).toFixed(2);
		}
		else
		{
			ratewithDisper = parseFloat(ratewithoutDisper) * (1 - (parseFloat(Disper) / 100));
			model.set("RateWMrkUp", parseFloat(ratewithDisper).toFixed(2));
			var total = parseFloat(ratewithDisper) * parseFloat(trnQty);
			//dtaSrc[rowIndex].Total = parseFloat(total).toFixed(2);
		}
		varTGridBOQDetails_SelectWeb.refresh();
}

function CallItmNmWindow() {
	
	$("#ResourceAnalysisWinForChild").show().kendoWindow({
		width: "1000px",
		height: "500px",
		model: true,
		title: "Find"

	});
	$('#ResourceAnalysisWinForChild').data('kendoWindow').center().open();
}


function setRow(count, model) {
	var exchangeRow = model.set("LiNo", count - 1);

}
function removeSelectedRowtGridBOQDetails_SelectWeb() {
	$.each($("#tGridBOQDetails_SelectWeb").data("kendoGrid").tbody.find(".k-state-selected"), function (index, value) {
		$("#tGridBOQDetails_SelectWeb").data("kendoGrid").removeRow(value);
	});
}
function setItmDet(itmcd, itmnm, itmky, unitky, unit, ratebasic, model) {
	
	var exchangeTesNm = model.set("ItmCd", itmcd);
	var exchangeTesNm = model.set("ItmNm", itmnm);
	var exchangeTesKy = model.set("ItmKy", itmky);
	var exchangeTesUnitKy = model.set("TrnUnitKy", unitky);
	var exchangeTesUnit = model.set("TrnUM", unit);
	var exchangeTesRate = model.set("RateBasic", parseFloat(ratebasic).toFixed(2));
	
	var varTGridBOQDetails_SelectWeb = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
	var dataRows = varTGridBOQDetails_SelectWeb.items();
	var rowIndex = dataRows.index(varTGridBOQDetails_SelectWeb.select());
	var dtaSrc = varTGridBOQDetails_SelectWeb.dataSource._data;
	//dtaSrc[rowIndex].RateBasic = parseFloat(ratebasic).toFixed(2);
	varTGridBOQDetails_SelectWeb.refresh();
}
function CreateNewGridRow() {
	var grid = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
	if (grid) {
		var dataSource = grid.dataSource;
		var total = dataSource.data().length;
		dataSource.insert(total, {});
	}

}
// Copy BOQ Det Grid
function defineCpyBOQDetails_SelectWebGrid(BOQDetails_SelectWebDataSource) {

	// Bind On BOQDet Grid.
	var varTGridCpyBOQDetails_SelectWeb = $("#tGridCpyBOQDetails_SelectWeb").kendoGrid({
		dataSource: BOQDetails_SelectWebDataSource,
		selectable: 'multiple',
		allowCopy: true,
		scrollable: true,
		resizable: true,
		columnMenu: true,
		filterable: true,
		sortable: true,
		height: 540,
		dataBound: function () {
			$('#tGridCpyBOQDetails_SelectWeb .k-grid-content').height(475);
		},
		columnMenu: true,
		toolbar: [
			{
				name: "LoadCpyBOQ",
				text: "Find BOQ",
				click: function (e) {
					return false;
				}
			},
			{
				name: "InsertCpyBOQ",
				text: "Insert",
				click: function (e) {
					return false;
				}
			},
			{
				name: "AboveCpyBOQ",
				text: "Above",
				click: function (e) {
					return false;
				}
			},
			{
				name: "BelowCpyBOQ",
				text: "Below",
				click: function (e) {
					return false;
				}
			},
			{
				name: "MergeCpyBOQ",
				text: "Replace",
				click: function (e) {
					return false;
				}
			}
		],
		columns: [
			{
				field: "BOQky", hidden: "true",
				locked: true,
				lockable: false
			},
			{
				field: "BOQDetKy", hidden: "true",
				locked: true,
				lockable: false
			},
			{
				field: "LiNo", title: "Line No", width: '90px',
				locked: true
			},
			{
				field: "ItmKy", title: "Item Key", width: '120px', hidden: "true",
				locked: true,
				lockable: false
			},
			{
				field: "ItmNo", title: "Item No", width: '100px',
				locked: true
			},
			{ field: "ItmCd", title: "Item Code", width: "250px" },


			{
				field: "ItmNm", title: "Item Name", width: '1100px',
				lockable: false
			},

			{
				field: "TrnUnitKy", title: "TrnUnitKy", width: '120px', hidden: "true",
				locked: true,
				lockable: false
			},

			{ field: "TrnUM", title: "Usage Unit", width: "120px" },
			//{ field: "Qty", title: "Quantity", width: '100px' }, -->Removed
			//{ field: "Cal", title: ".", width: '50px' },-->Removed
			{ field: "TrnQty", title: "Trn Qty", width: '100px' },
			//{ field: "Rate", title: "Rate", width: '80px' },
			//{ field: "IntrRate", title: "IntrRate", width: '80px' },-->Removed
			{ field: "Total", title: "Total", width: '80px' },
			{ field: "RateBasic", title: "Basic Rate", width: '120px' },
			{ field: "ProfitPer", title: "ProfitPer", width: '120px' },
			{ field: "DisPer", title: "DisPer", width: '80px' },
			{ field: "DOHPer", title: "DOHPer", width: '80px' },
			//{ field: "OHPer", title: "OHPer", width: '80px' },-->Removed
			{ field: "GOHPer", title: "GOHPer", width: '100px' },
			//{ field: "OthMarkUpPer", title: "OthMarkUpPer", width: '100px' },-->Removed
			//{
			//	field: "isContainSubTask", title: "is Contain SubTask", width: "85px", editable: false,
			//	template: "<input name='isContainSubTask' class='ob-paid' type='checkbox' data-bind='checked: isContainSubTask' #= isContainSubTask ? checked='checked' : '' # />"
			//},
			{ field: "BOQDetCat1Ky", title: "BOQDetCat1Ky", width: '140px', hidden: "true" },
			{ field: "BOQHdrCdKy", title: "BOQHdrCdKy", width: '120px', hidden: "true" }],
		editable: false
	}).data("kendoGrid");



	varTGridCpyBOQDetails_SelectWeb.table.kendoDraggable({
		filter: "tbody > tr",
		group: "gridGroup",
		hint: function (e) {
			return $('<div class="k-grid k-widget"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
		}
	});

	varTGridCpyBOQDetails_SelectWeb.table/*.find("tbody > tr")*/.kendoDropTarget({
		group: "gridGroup",
		drop: function (e) {
			var target = dataSource.get($(e.draggable.currentTarget).data("LiNo")),
				dest = $(e.target);

			if (dest.is("th")) {
				return;
			}
			dest = dataSource.get(dest.parent().data("LiNo"));

			//not on same item
			if (target.get("LiNo") !== dest.get("LiNo")) {
				//reorder the items
				var tmp = target.get("DisPer");
				target.set("LiNo", dest.get("LiNo"));
				dest.set("LiNo", tmp);
				dataSource.sort({ field: "LiNo", dir: "asc" });
			}

		}
	});







	$(".k-grid-LoadCpyBOQ", "#tGridCpyBOQDetails_SelectWeb").bind("click", function (ev) {
		$('#boqDetailDblClick').data('kendoWindow').close();
		firstLoadClientCmbForCriteriaD();
		searchBOQSearchSelectCriteriaPicker = "CopyBOQWindow";
		boqSearchSelectCriteriaPicker.dialog("open");
	});

	$(".k-grid-InsertCpyBOQ", "#tGridCpyBOQDetails_SelectWeb").bind("click", function (ev) {
		var varTGridBOQDetails_SelectWeb = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
		var seletedBOQDet = varTGridBOQDetails_SelectWeb.dataItem(varTGridBOQDetails_SelectWeb.select());
		if (seletedBOQDet != null) {
			varTGridCpyBOQDetails_SelectWeb
			//var entityGrid = varTGridCpyBOQDetails_SelectWeb;//$("#tGridCpyBOQDetails_SelectWeb").data("kendoGrid");
			var rows = varTGridCpyBOQDetails_SelectWeb.select();
			var tmpConut = 0;
			rows.each(function (index, row) {
				var selectBigLookUpData = varTGridCpyBOQDetails_SelectWeb.dataItem(row);
				// selectedItem has EntityVersionId and the rest of your model
				var idx = 0;
				var newLiNo = 1;
				var dtaSrc = varTGridBOQDetails_SelectWeb.dataSource._data;
				if (dtaSrc.length <= 0 || dtaSrc == undefined) {
					idx = 0;
					newLiNo = 1;
					//varTGridBOQDetails_SelectWeb.dataSource.insert(0, { LiNo: 1, isContainSubTask: false });
					varTGridBOQDetails_SelectWeb.dataSource.insert(0, { LiNo: 1 });
				} else {
					var nxtSlectedBOQDet = dtaSrc[dtaSrc.length - 1];
					idx = dtaSrc.length
					newLiNo = (parseFloat(nxtSlectedBOQDet.LiNo) + parseInt(nxtSlectedBOQDet.LiNo) + 1) / 2;
				}
				//varTGridBOQDetails_SelectWeb.dataSource.insert(idx, { LiNo: newLiNo, ItmKy: selectBigLookUpData.ItmKy, ItmCd: selectBigLookUpData.ItmCd, ItmNo: selectBigLookUpData.ItmNo, ItmNm: selectBigLookUpData.ItmNm, TrnUnitKy: selectBigLookUpData.TrnUnitKy, TrnUM: selectBigLookUpData.TrnUM, isContainSubTask: 0 });
				varTGridBOQDetails_SelectWeb.dataSource.insert(idx, { LiNo: newLiNo, ItmKy: selectBigLookUpData.ItmKy, ItmCd: selectBigLookUpData.ItmCd, ItmNo: selectBigLookUpData.ItmNo, ItmNm: selectBigLookUpData.ItmNm, TrnUnitKy: selectBigLookUpData.TrnUnitKy, TrnUM: selectBigLookUpData.TrnUM});
				// ------------- Tempry solution for avoid duplicate entry.
				tmpConut = tmpConut + 1;
				if (tmpConut >= rows.length / 2) {
					return false;
				} else {
					return true;
				}
				// ----------------

			});
		} else {
			alert("Select one row and insert ... !");
		}

		$("#boqDetailDblClick").data("kendoWindow").close();
	});

	$(".k-grid-AboveCpyBOQ", "#tGridCpyBOQDetails_SelectWeb").bind("click", function (ev) {
		var varTGridBOQDetails_SelectWeb = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
		var seletedBOQDet = varTGridBOQDetails_SelectWeb.dataItem(varTGridBOQDetails_SelectWeb.select());
		if (seletedBOQDet != null) {
			//var entityGrid = $("#tGridResourceForItmAloc_SelectAnlTab2").data("kendoGrid");
			var rows = varTGridCpyBOQDetails_SelectWeb.select();
			var tmpConut = 0;
			rows.each(function (index, row) {
				var selectBigLookUpData = varTGridCpyBOQDetails_SelectWeb.dataItem(row);
				// selectedItem has EntityVersionId and the rest of your model
				var newLiNo = 1;
				var idx = varTGridBOQDetails_SelectWeb.dataSource.indexOf(seletedBOQDet);
				var nxtSlectedBOQDet = varTGridBOQDetails_SelectWeb.dataSource._data[idx - 1];
				if (nxtSlectedBOQDet == undefined || nxtSlectedBOQDet == null) {
					newLiNo = (parseFloat(seletedBOQDet.LiNo)) / 2;
				} else {
					newLiNo = (parseFloat(seletedBOQDet.LiNo) + parseFloat(nxtSlectedBOQDet.LiNo)) / 2;
				}
				
				varTGridBOQDetails_SelectWeb.dataSource.insert(idx, { LiNo: newLiNo, ItmKy: selectBigLookUpData.ItmKy, ItmCd: selectBigLookUpData.ItmCd, ItmNo: selectBigLookUpData.ItmNo, ItmNm: selectBigLookUpData.ItmNm, TrnUnitKy: selectBigLookUpData.TrnUnitKy, TrnUM: selectBigLookUpData.TrnUM });
				//varTGridBOQDetails_SelectWeb.dataSource.insert(idx, { LiNo: newLiNo, ItmKy: selectBigLookUpData.ItmKy, ItmCd: selectBigLookUpData.ItmCd, ItmNo: selectBigLookUpData.ItmNo, ItmNm: selectBigLookUpData.ItmNm, TrnUnitKy: selectBigLookUpData.TrnUnitKy, TrnUM: selectBigLookUpData.TrnUM, isContainSubTask: false });
				// ------------- Tempry solution for avoid duplicate entry.
				tmpConut = tmpConut + 1;
				if (tmpConut >= rows.length / 2) {
					return false;
				} else {
					return true;
				}
				// ----------------

			});
		} else {
			alert("Select one row and insert ... !");
		}

		$("#boqDetailDblClick").data("kendoWindow").close();
	});

	$(".k-grid-BelowCpyBOQ", "#tGridCpyBOQDetails_SelectWeb").bind("click", function (ev) {
		var varTGridBOQDetails_SelectWeb = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
		var seletedBOQDet = varTGridBOQDetails_SelectWeb.dataItem(varTGridBOQDetails_SelectWeb.select());
		if (seletedBOQDet != null) {
			//var entityGrid = $("#tGridResourceForItmAloc_SelectAnlTab2").data("kendoGrid");
			var rows = varTGridCpyBOQDetails_SelectWeb.select();
			var tmpConut = 0;
			rows.each(function (index, row) {
				var selectBigLookUpData = varTGridCpyBOQDetails_SelectWeb.dataItem(row);
				// selectedItem has EntityVersionId and the rest of your model
				var newLiNo = 1;
				var idx = varTGridBOQDetails_SelectWeb.dataSource.indexOf(seletedBOQDet);
				var nxtSlectedBOQDet = varTGridBOQDetails_SelectWeb.dataSource._data[idx + 1];
				if (nxtSlectedBOQDet == undefined || nxtSlectedBOQDet == null) {
					newLiNo = (parseFloat(seletedBOQDet.LiNo) + 1) / 2;
				} else {
					newLiNo = (parseFloat(seletedBOQDet.LiNo) + parseFloat(nxtSlectedBOQDet.LiNo)) / 2;
				}
				varTGridBOQDetails_SelectWeb.dataSource.insert(idx + 1, { LiNo: newLiNo, ItmKy: selectBigLookUpData.ItmKy, ItmCd: selectBigLookUpData.ItmCd, ItmNo: selectBigLookUpData.ItmNo, ItmNm: selectBigLookUpData.ItmNm, TrnUnitKy: selectBigLookUpData.TrnUnitKy, TrnUM: selectBigLookUpData.TrnUM });
				//varTGridBOQDetails_SelectWeb.dataSource.insert(idx + 1, { LiNo: newLiNo, ItmKy: selectBigLookUpData.ItmKy, ItmCd: selectBigLookUpData.ItmCd, ItmNo: selectBigLookUpData.ItmNo, ItmNm: selectBigLookUpData.ItmNm, TrnUnitKy: selectBigLookUpData.TrnUnitKy, TrnUM: selectBigLookUpData.TrnUM, isContainSubTask: false });
				// ------------- Tempry solution for avoid duplicate entry.
				tmpConut = tmpConut + 1;
				if (tmpConut >= rows.length / 2) {
					return false;
				} else {
					return true;
				}
				// ----------------

			});
		} else {
			alert("Select one row and insert ... !");
		}

		$("#boqDetailDblClick").data("kendoWindow").close();
	});

	$(".k-grid-MergeCpyBOQ", "#tGridCpyBOQDetails_SelectWeb").bind("click", function (ev) {

		var varTGridBOQDetails_SelectWeb = $("#tGridBOQDetails_SelectWeb").data("kendoGrid");
		var seletedBOQDet = varTGridBOQDetails_SelectWeb.dataItem(varTGridBOQDetails_SelectWeb.select());
		if (seletedBOQDet != null) {
			//var entityGrid = $("#tGridResourceForItmAloc_SelectAnlTab2").data("kendoGrid");
			var rows = varTGridCpyBOQDetails_SelectWeb.select();
			var tmpConut = 0;
			if (rows.length == 2) {
				rows.each(function (index, row) {
					var selectBigLookUpData = varTGridCpyBOQDetails_SelectWeb.dataItem(row);
					// selectedItem has EntityVersionId and the rest of your model
					var itmky = seletedBOQDet.set("ItmKy", selectBigLookUpData.ItmKy);
					var resnm = seletedBOQDet.set("ItmCd", selectBigLookUpData.ItmCd);
					
					itmkyItmKyChangePopUpBOQDet = selectBigLookUpData.ItmKy;
					boqdetkyItmKyChangePopUpBOQDet = seletedBOQDet.BOQDetKy;

					$("#boqDetailDblClick").data("kendoWindow").close();
					itmKyChangePopUpBOQDet.dialog("open");

					// ------------- Tempry solution for avoid duplicate entry.
					tmpConut = tmpConut + 1;
					if (tmpConut >= rows.length / 2) {
						return false;
					} else {
						return true;
					}
					// ----------------

				});
			}
			else {
				alert("Select one row and Replace ... !");
			}
		} else {
			alert("Select one row and insert ... !");
		}
	});
}
