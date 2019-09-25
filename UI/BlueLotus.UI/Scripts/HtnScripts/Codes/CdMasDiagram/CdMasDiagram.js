function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp("", ObjKy, "", "HdrSec1");
}

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    SelectedConCd: "",
};

$(document).ready(function() {
    OPENLodingForm();

    GetFormObjData();
    Button_From_Dynamic("ButtonSec1");
});

function DocReadyCus() {
    setTimeout(function() {
            CLOSELoadingForm();
        },
        3000);

}

function GetCdMasAllChildy(ConCd) {
    $.ajax({
        url: getAllChild,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            //ObjKy: viewBag.ObjKy,
            ConCd: ConCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function(CdMasModelData) {
            createDiagram(CdMasModelData);
        }
    });
}

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function(HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            DocReadyCus();
        }
    });
}


// ========= Diagram Start =========

function createDiagram(CdMasModelData) {
    $("#diagram").kendoDiagram({
        dataSource: CdMasModelData, // {
        //    //data: diagramNodes(),
        //    //schema: {
        //    //    model: {
        //    //        children: "items"
        //    //    }
        //    //}
        //},
        layout: {
            type: "tree",
            subtype: "down",
            horizontalSeparation: 30,
            verticalSeparation: 20
        },
        shapeDefaults: {
            visual: visualTemplate,
            //content: {
            //  template: "#= dataItem.id #, #= dataItem.text #",
            //  fontSize: 12
            //},
            //width: 110,
            //height: 40,
            //fill: "#43b9e5cf" //"#64d4ea",
        }
    });
}


function visualTemplate(options) {
    var dataviz = kendo.dataviz;
    var g = new dataviz.diagram.Group();
    var dataItem = options.dataItem;

    g.append(new dataviz.diagram.Rectangle({
       width: 200,
       height: 55,
        fontSize: 12,
        stroke: {
            width: 0.5
        },
        fill: {
            gradient: {
                type: "linear",
                stops: [
                    {
                        color: "#43b9e5cf",
                        offset: 0,
                        opacity: 0.5
                    }, {
                        color: "#65c6f7",
                        offset: 1,
                        opacity: 1
                    }
                ]
            }
        }
    }));
    g.append(new dataviz.diagram.TextBlock({
        text: "Name: ",
        x: 12,
        y: 10,
        fill: "#000",
        fontSize: 12,
        color:"#006699",
    }));
    g.append(new dataviz.diagram.TextBlock({
        text:dataItem.Name,
        x: 52,
        y: 10,
        fill: "#000",
        fontSize: 12,
    }));
    g.append(new dataviz.diagram.TextBlock({
        text: "Code: ",
        x: 12,
        y: 30,
        fill: "#000",
        fontSize: 12,
        color: "#006699",
    }));
    g.append(new dataviz.diagram.TextBlock({
        text:dataItem.Code,
        x: 52,
        y: 30,
        fill: "#000",
        fontSize: 12,
    }));

    return g;
}

// ================ Diagram End ==============

function loadView() {

    var SelectedConCd = $("#HdrSec1_CmbConCd_Cd").data("kendoComboBox").value();
    if (SelectedConCd !== "") {
        // GettingData(SelectedConCd);
        GetCdMasAllChildy(SelectedConCd);
    }

    //createDiagram();
    // $(document).bind("kendo:skinChange", createDiagram)
}

function GettingData(SelectedConCd) {
    CdMas_LookupWebByConCdDatasource(SelectedConCd);
}


function CdMas_LookupWebByConCdDatasource(SelectedConCd) {

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: CdMas_LookupWebByConCd,
                    data: { ConCd: SelectedConCd },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}
