function objMasLoadData_None(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (ObjChild) {
            if (ObjChild.length > 0) {
                for (h = 0; h < ObjChild.length; h++)
                    if ("Grid_0" == ObjChild[h].ObjNm) {
                        var ObjKyChild = ObjChild[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, ObjKyChild, ObjChild[h]);
                    }
            } else firstLoadData(columnsT, spRestCount, ObjKyChild);
            $.holdReady(!1);
        }
    })
}

function objMasLoadData_0(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            var objKy;
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_0" == data[h].ObjNm) {
                        objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h]);
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1);
        }
    })
}

function objMasLoadData_1(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            var objKy=1;
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_1" == data[h].ObjNm) {
                        objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h]);
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_2(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function(columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function(data) {
            var objKy;
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_2" == data[h].ObjNm) {
                        objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1);
        }
    });
}

function objMasLoadData_3(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            var objKy;
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_3" == data[h].ObjNm) {
                        objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_4(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_4" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_5(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_5" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_6(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_6" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_7(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_7" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_8(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_8" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_9(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_9" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_10(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_10" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_11(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_11" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_12(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_12" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_13(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_13" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_14(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_14" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_15(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_15" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_16(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_16" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_17(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_17" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_18(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_18" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_19(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_19" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_20(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_20" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}

function objMasLoadData_21(columnsT, spRestCount) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            PrntKy: viewBag.SelectedReportObjKy,
            ObjTyp: "GridParameter",
            ObjNm: ""
        },
        url: urlObjMas.UsrObjChild_SelectByPrntandSubObjTypWeb,
        converters: {
            "text json": function (columnsT) {
                return $.parseJSON(columnsT, !0, !0)
            }
        },
        success: function (data) {
            if (data.length > 0) {
                for (h = 0; h < data.length; h++)
                    if ("Grid_21" == data[h].ObjNm) {
                        var objKy = data[h].ObjKy;
                        firstLoadData(columnsT, spRestCount, objKy, data[h])
                    }
            } else firstLoadData(columnsT, spRestCount, objKy);
            $.holdReady(!1)
        }
    })
}