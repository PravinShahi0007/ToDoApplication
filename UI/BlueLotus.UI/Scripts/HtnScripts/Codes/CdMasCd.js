
$(document).ready(function () {

	//alert('@ViewBag.ObjKy');
	LoadCombo();
	LoadCdMas_LookupWebByConCdCombo("");
});


function LoadCombo() {

	$("#cmbCdMasCdTyp").kendoComboBox({
		dataValueField: "ControlConKy",
		dataTextField: "ControlConNm",
		dataSource: CdMasCdTypLookupDatasource(),
		//change: function (e) {
		//    var selDat = this.dataItem(this.select());
		//    LoadCdMas_LookupWebByConCdCombo(selDat.GrpConCd);
		//},
		change: function (e) {
			var cmb = $("#cmbCdMasCdTyp").data("kendoComboBox");
			var Crnky = cmb.value();
			if (Crnky != "") {
				var validate = ComboValidations("cmbCdMasCdTyp");
				if (validate) {

					$("#cmbCdMasCdTyp").data("kendoComboBox").value(Crnky);
					//var Concord = $("#cmbCdMasCdTyp").data("kendoComboBox").text();// $("#cmbCdMasCdTyp").data("kendoComboBox").text;
					var object = $("#cmbCdMasCdTyp").data("kendoComboBox").dataItem($("#cmbCdMasCdTyp").data("kendoComboBox").select());

					LoadCdMas_LookupWebByConCdCombo(object.GrpConCd)
				} else {

					$("#cmbCrnId").data("kendoComboBox").value("");
				}
			}
		},
		filter: "contains",
		suggest: true,
		placeholder: "Select a CdMasTyp."
	});

}
function CdMasCdTypLookupDatasource() {

	var dataSource = new kendo.data.DataSource(
	  {
		  transport: {
			  read: {
				  url: urlCodes.CdMasCdTypLookup,
				  dataType: "json",
				  data: {
				      ObjKy: viewBag.ObjKy,
				      TblNm: "CdMasCd"
				  }
			  }
		  }
	  });
	return dataSource;
}


function LoadCdMas_LookupWebByConCdCombo(GrpConCd) {
	$("#cmbConCd").kendoComboBox({
		dataValueField: "CdKy",
		dataTextField: "Code",
		dataSource: CdMas_LookupWebByConCdDatasource(GrpConCd),
		change: function (e) {

		},
		filter: "contains",
		suggest: true,
		placeholder: "Select a ConCd."
	});

	$("#cmbConCd").parent().css('width', "250px");
}
function CdMas_LookupWebByConCdDatasource(GrpConCd) {

	var dataSource = new kendo.data.DataSource(
	  {
		  transport: {
			  read: {
				  url: urlCodes.CdMas_LookupWebByConCd,
				  data: { ConCd: GrpConCd },
				  dataType: "json"
			  }
		  }
	  });
	return dataSource;
}

function LoadGridView() {

	var ControlConKy = $("#cmbCdMasCdTyp").data('kendoComboBox').value();
	var CdKy = $("#cmbConCd").data('kendoComboBox').value();
	//var ConCd = $("#cmbConCd").data('kendoComboBox').text();

	var object = $("#cmbCdMasCdTyp").data("kendoComboBox").dataItem($("#cmbCdMasCdTyp").data("kendoComboBox").select());

	ConCd = object.ConCd;

	var dataSourceLoadGridView = new kendo.data.DataSource({
		transport: {
			read:
			{
				//int GrpCdKy, int CdKy, string ConCdGrid
				data: { GrpCdKy: ControlConKy, CdKy: CdKy, ConCdGrid: ConCd },
				url: urlCodes.LoadGridView,
				dataType: "json"
			}
		},
		batch: true,
		pageSize: 20,
		schema: {
			model: {
				id: "CdKy",
				fields:
				{
					ConCd: { editable: false, nullable: false, },
					GrpCdKy: { editable: false, nullable: false, },
					CdMasCdTypKy: { editable: false, nullable: false, },
					Prefix: { editable: false, nullable: false },
					CdKy: { editable: false, nullable: false },
					Code: { editable: false, nullable: false },
					CdNm: { editable: false, nullable: false },
					Val: { editable: false, nullable: false },
					RecKy: { editable: true, nullable: false },
					LiNo: { editable: true, nullable: false },
					is1: { editable: true, nullable: false, type: "boolean" },
					Checked: { editable: true, nullable: false, type: "boolean" }
				  
				}
			}
		}
	});


	$("#CdMasCdGrid").kendoGrid({
		dataSource: dataSourceLoadGridView,
		//autobind: true,
		height: 500,
		navigatable: true,
		filterable: {
		    mode: "row"
		},
		pageable: true,
		sortable: true,
		reorderable: true,
		columnMenu: true,
		selectable: "row",
		resizable: true,
		pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
		columns: [
		{ field: "ConCd", title: "ConCd", width: "100px", hidden: true},
		{ field: "GrpCdKy", title: "GrpCdKy", width: "100px", hidden: true },
		{ field: "CdMasCdTypKy", title: "CdMasCdTypKy", width: "100px", hidden: true },
		{ field: "ConCdGrid", title: "ConCdGrid", width: "100px", hidden: true },
		{ field: "PreFix", title: "PreFix", width: "100px", hidden: true },
		{ field: "CdKy", title: "CdKy", width: "100px", hidden: true },
		{ field: "Code", title: "Code", width: "50px"},
		{ field: "CdNm", title: "Name", width: "180px" },
        { field: "Val ", title: "Val ", width: "50px", hidden: true },
         { field: "RecKy", title: "RecKy", width: "50px", hidden: true },
         { field: "LiNo", title: "LiNo", width: "50px", hidden: true },
         {
             field: "is1", title: "is1",
             template: '<input type="checkbox"#= is1? "checked=checked" : "" # disabled="disabled" ></input>',
             width: "50px", hidden: true,
         },
		{

			field: "Checked", title: "IsAct",
			template: '<input type="checkbox"#= Checked? "checked=checked" : "" # disabled="disabled" ></input>',
			width: "100px",

		},

		],
	
		editable:true
	});
}

// Update Grid
function UpdateDetails() {

	var grid = $("#CdMasCdGrid").data("kendoGrid");
	var currentData = grid.dataSource.data();
	var updatedRecords = [];

	for (var i = 0; i < currentData.length; i++) {
		if (currentData[i].dirty) {
			updatedRecords.push(currentData[i].toJSON());
		}
	}

	if (updatedRecords.length) {

		$.ajax({

			url: urlCodes.UpdateGrid,
			data: JSON.stringify({
				GridUpdateDetail: kendo.stringify(updatedRecords),
			}),
			contentType: 'application/json; charset=utf-8',
			dataType: "Json",
			type: "POST",
			success: function (data) {
				if (data) {
					alert("Update Successfully");
					//$("#CdMasCdGrid").data("kendoGrid").dataSource.read();
					$("#CdMasCdGrid").data('kendoGrid').dataSource.data([]);
					LoadGridView();
				} else
				{
					alert("Please Try Again");
				}
			}
		});
	}
}

function ComboValidations(cmbNm) {

	var cmb = $("#" + cmbNm + "").data("kendoComboBox");
	var val = cmb.value();

	if (isNaN(val)) {
		alert("'" + val + "' is not a Valid input");
		$("#" + cmbNm + "").data("kendoComboBox").value("");
		return false;
	} else {
		return true;
	}
}
