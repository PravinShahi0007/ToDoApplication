function AccCd_SelectMob_Datasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.AccCd_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
function F0x1f4G1G0x3e7() { }
function AccNm_SelectMob_Datasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.AccNm_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

//CdmasLookUpModelWeb
function Code_SelectMob_Datasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.Code_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function CdNm_SelectMob_Datasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.CdNm_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AdrID_SelectMob_DataSource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    //alert(ObjKy);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.AdrID_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
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

function AdrNm_SelectMob_DataSource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.AdrNm_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
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

//=========== Project Name =========================
function PrjNm_SelectMob_DataSource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjNm_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.PrjTypKy,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

//========== Project Code/ID ==========================
function PrjId_SelectMob_DataSource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjID_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.PrjTypKy,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

//=========== Employee ==================================
function EmpNo_SelectMob_DataSource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.EmpNo_SelectMob,
                data: {
                    ObjKy: ObjKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function EmpNm_SelectMob_DataSource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.EmpNm_SelectMob,
                data: {
                    ObjKy: ObjKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

//============= Item ===================================
function ItmCd_SelectMob_Datasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.ItmCd_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1,//FormGlblData.TrnTypKy,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function ItmNm_SelectMob_Datasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.ItmNm_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1, //FormGlblData.TrnTypKy,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function ItmCd_SelectMob_DatasourceWithPreKy(ObjNm,PreKy) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.ItmCd_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1,//FormGlblData.TrnTypKy,
                    PreKy: PreKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function ItmNm_SelectMob_DatasourceWithPreKy(ObjNm, PreKy) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.ItmNm_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1, //FormGlblData.TrnTypKy,
                    PreKy: PreKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

//------------- Order No --------------
function OrdNo_SelectMob_Datasource(ObjNm, prjky) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    MicrosoftDefault(F0x1f4G1G0x3e7, "x00658C2335K0025y124");
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.OrdNo_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.OrdTypKy,
                    PreKy: prjky
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}


//------------ Order Item No --------------
function OrdItmNo_SelectMob_Datasource(ObjNm, OrdKy) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.OrdItmNo_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.OrdTypKy,
                    PreKy: 1,
                    OrdKy: OrdKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function SerNo_SelectMob_Datasource(ObjNm, ItmKy) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.SerNo_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    ItmKy: ItmKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}
