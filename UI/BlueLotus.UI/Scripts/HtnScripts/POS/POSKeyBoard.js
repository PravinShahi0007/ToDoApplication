$(function () {

    $("#backSpc").click(function () {
        var backSpc = $("#posFunctionValue");
        var val = backSpc.text();
        if (val != "") {
            backSpc.empty();
            backSpc.append(val.slice(0, -1));
        }
    })

    $("#clear").click(function () {
        $("#posFunctionValue").empty();
        $("#posFunctionLabel").empty();
    })

    $("#1").click(function () {
        $("#posFunctionValue").append("1");
    })

    $("#2").click(function () {
        $("#posFunctionValue").append("2");
    })

    $("#3").click(function () {
        $("#posFunctionValue").append("3");
    })

    $("#4").click(function () {
        $("#posFunctionValue").append("4");
    })

    $("#5").click(function () {
        $("#posFunctionValue").append("5");
    })

    $("#6").click(function () {
        $("#posFunctionValue").append("6");
    })

    $("#7").click(function () {
        $("#posFunctionValue").append("7");
    })

    $("#8").click(function () {
        $("#posFunctionValue").append("8");
    })

    $("#9").click(function () {
        $("#posFunctionValue").append("9");
    })

    $("#0").click(function () {
        $("#posFunctionValue").append("0");
    })

    $("#00").click(function () {
        $("#posFunctionValue").append("00");
    })

    $("#dot").click(function () {
        $("#posFunctionValue").append(".");
    })
});