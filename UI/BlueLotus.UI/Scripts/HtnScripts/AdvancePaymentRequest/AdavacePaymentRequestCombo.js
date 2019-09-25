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


function LoadCombo() {
	//Project Code Drop Bottom
	$("#HdrSec1_CmbPrj_Cd")
        .kendoComboBox({
        	dataValueField: "PrjKy",
        	dataTextField: "PrjCd",
        	dataSource: ProjectCd('HdrSec1_CmbPrj'),
        	change: function (e) {
        		var cmb = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
        		var PrjKy = cmb.value();
        		if (PrjKy != "") {
        			var validate = ComboValidations("HdrSec1_CmbPrj_Cd");
        			if (validate) {
        				$("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
        				$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
        			} else {
        				$("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
        				$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value("");
        			}
        		}

        	},
        	filter: "contains",
        	suggest: true,
        	placeholder: "Select a Project"
        });
	//Project Name Drop Bottom
	$("#HdrSec1_CmbPrj_Nm")
        .kendoComboBox({
        	dataValueField: "PrjKy",
        	dataTextField: "PrjNm",
        	dataSource: ProjectNm('HdrSec1_CmbPrj'),
        	change: function (e) {
        		var cmb = $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox");
        		var PrjKy = cmb.value();
        		if (PrjKy != "") {
        			var validate = ComboValidations("HdrSec1_CmbPrj_Nm");
        			if (validate) {
        				$("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
        				$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
        			} else {
        				$("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
        				$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value("");
        			}
        		}

        	},
        	filter: "contains",
        	suggest: true,
        	placeholder: "Select an Project"
        });

	//Bu
	//BU Code Drop Bottom
	$("#HdrSec1_CmbBU_Cd")
        .kendoComboBox({
        	dataValueField: "CdKy",
        	dataTextField: "Code",
        	dataSource: BUCode('HdrSec1_CmbBU'),
        	change: function (e) {
        		var cmb = $("#HdrSec1_CmbBU_Cd").data("kendoComboBox");
        		var BUKy = cmb.value();
        		if (BUKy != "") {
        			var validate = ComboValidations("HdrSec1_CmbBU_Cd");
        			if (validate) {
        				$("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value(BUKy);
        				$("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(BUKy);
        			} else {
        				$("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
        				$("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value("");
        			}
        		}
        	},
        	filter: "contains",
        	suggest: true,
        	placeholder: "Select a BU"
        });
	//BU Name Drop Bottom
	$("#HdrSec1_CmbBU_Nm")
        .kendoComboBox({
        	dataValueField: "CdKy",
        	dataTextField: "Name",
        	dataSource: BUName('HdrSec1_CmbBU'),
        	change: function (e) {
        		var cmb = $("#HdrSec1_CmbBU_Nm").data("kendoComboBox");
        		var BUKy = cmb.value();
        		if (BUKy != "") {
        			var validate = ComboValidations("HdrSec1_CmbBU_Nm");
        			if (validate) {
        				$("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value(BUKy);
        				$("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(BUKy);
        			} else {
        				$("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
        				$("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value("");
        			}
        		}
        	},
        	filter: "contains",
        	suggest: true,
        	placeholder: "Select an BU"
        });
	//Account
	//Accounts Code Drop Bottom
	$("#HdrSec2_CmbAcc_Cd")
        .kendoComboBox({
        	dataValueField: "AccKy",
        	dataTextField: "AccCode",
        	dataSource: AccDoropCode("HdrSec2_CmbAcc"),
        	change: function (e) {
        	    var cmb = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox");
        		var AkkKy = cmb.value();
        		if (AkkKy != "") {
        		    var validate = ComboValidations("HdrSec2_CmbAcc_Cd");
        			if (validate) {
        				$("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AkkKy);
        				$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);
        			} else {
        				$("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value("");
        				$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value("");
        			}
        		}

        	},
        	filter: "contains",
        	suggest: true,
        	placeholder: "Select an Account"
        });
	//Accounts Name Drop Bottom
	$("#HdrSec2_CmbAcc_Nm")
        .kendoComboBox({
        	dataValueField: "AccKy",
        	dataTextField: "AccNM",
        	dataSource: AccDoropName("HdrSec2_CmbAcc"),
        	change: function (e) {
        		var cmb = $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox");
        		var AkkKy = cmb.value();
        		if (AkkKy != "") {
        		    var validate = ComboValidations("HdrSec2_CmbAcc_Nm");
        			if (validate) {

        				$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);
        				$("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AkkKy);
        			} else {
        				$("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value("");
        				$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value("");
        			}
        		}

        	},
        	filter: "contains",
        	suggest: true,
        	placeholder: "Select an Account"
        });
	//Address  Drop Bottom
	$("#HdrSec2_CmbAdr_Cd")
        .kendoComboBox({
        	dataValueField: "AdrKy",
        	dataTextField: "AdrCode",
        	dataSource: AddressCode('HdrSec2_CmbAdr'),
        	change: function (e) {
        		var cmb = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox");
        		var AdrKy = cmb.value();
        		if (AdrKy != "") {
        			var validate = ComboValidations("HdrSec2_CmbAdr_Cd");
        			if (validate) {

        			    $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
        			    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);

        			} else {

        			    $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value("");
        			    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value("");

        			}
        		}

        	},
        	filter: "contains",
        	suggest: true,
        	placeholder: "Select an Address"
        });


	//Address Name Drop Bottom
	$("#HdrSec2_CmbAdr_Nm")
        .kendoComboBox({
        	dataValueField: "AdrKy",
        	dataTextField: "AdrNM",
        	dataSource: AddressName('HdrSec2_CmbAdr'),
        	change: function (e) {
        		var cmb = $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox");
        		var AdrKy = cmb.value();
        		if (AdrKy != "") {
        		    var validate = ComboValidations("HdrSec2_CmbAdr_Nm");
        			if (validate) {

        				$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
        				$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);

        			} else {

        			    $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value("");
        			    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value("");

        			}
        		}

        	},
        	filter: "contains",
        	suggest: true,
        	placeholder: "Select an Address"
        });
	//
	$("#HdrSec2_NmricAmt_Val")
	  .kendoNumericTextBox({
	  	decimals: 3,
	  	spinners: false,
	  	min: 0,
	  });

	var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val")
    .kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009)
    });
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);

    $("#HdrSec1_CmbPrj_Cd").parent().css("width", "40%");
    $("#HdrSec1_CmbPrj_Nm").parent().css("width", "55%");
    $("#HdrSec1_CmbBU_Cd").parent().css("width", "40%");
    $("#HdrSec1_CmbBU_Nm").parent().css("width", "55%");
    $("#HdrSec2_CmbAcc_Cd").parent().css("width", "40%");
    $("#HdrSec2_CmbAcc_Nm").parent().css("width", "55%");
    $("#HdrSec2_CmbAdr_Cd").parent().css("width", "40%");
    $("#HdrSec2_CmbAdr_Nm").parent().css("width", "55%");
}

//____Project data source
function ProjectCd(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
    {
    	transport: {
    		read: {
    			url: urlGetProjectCode,
    			data: {
    				'ObjKy': ObjKy
    			},
    			dataType: "json"
    		}
    	}

    });
	return dataSource;
}
function ProjectNm(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
    {
    	transport: {
    		read: {
    			url: urlGetProjectNm,
    			data: {
    				ObjKy: ObjKy
    			},
    			dataType: "json"
    		}
    	}

    });
	return dataSource;
}
function ProjectCd(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
    {
    	transport: {
    		read: {
    			url: urlGetProjectCode,
    			data: {
    				'ObjKy': ObjKy
    			},
    			dataType: "json"
    		}
    	}

    });
	return dataSource;
}
//____BU data source
function BUCode(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
    {
    	transport: {
    		read: {
    			url: urlGetBUCode,
    			data: {
    				'ObjKy': ObjKy,
    			},
    			dataType: "json"
    		}
    	}

    });
	return dataSource;
}

function BUName(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
    {
    	transport: {
    		read: {
    			url: urlGetBUNm,
    			data: {
    				'ObjKy': ObjKy,
    			},
    			dataType: "json"
    		}
    	}

    });
	return dataSource;
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
//____Address data source
function AddressCode(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
    {
    	transport: {
    		read: {
    			url: urlGetAddressCd,
    			data: {
    				ObjKy: ObjKy,
    				'PreKy': "1"
    			},
    			dataType: "json"
    		}
    	}

    });
	return dataSource;
}


function AddressName(ObjNm) {
	var ObjKy = GetObjKy(ObjNm);
	var dataSource = new kendo.data.DataSource(
    {
    	transport: {
    		read: {
    			url: urlGetAddressNm,
    			data: {
    				'ObjKy': ObjKy,
    				'PreKy': "1"
    			},

    			dataType: "json"
    		}
    	}

    });
	return dataSource;
}