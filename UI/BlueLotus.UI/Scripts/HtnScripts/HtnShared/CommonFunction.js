
function Tooltip(){
    $('.k-textbox').keyup(function () {
        $(this).attr('title', $(this).val());
    });

    $('.combo').keyup(function () {
        $(this).attr('title', $(this).val());
    });
    $('.input').keyup(function () {
        $(this).attr('title', $(this).val());
    });

    $("label").prop("title", function () {
        return $(this).text();
    });

    $(".k-numerictextbox").keyup("title", function () {
        return $(this).text();
    });
}

function SelectText() {
    $('.k-input').on('focus', function () {
        var input = $(this);
        setTimeout(function () { input.select(); });
    });

    $('input').focus(function () { $(this).select(); });

    $('.k-textbox').focus(function () {

        $(this).select();
    });

    $('.k-numerictextbox').focus(function () {

        $(this).select();
    });
}

function CheckDateforAutoMonthYear(Current_Date_Val)
{
    var date = new Date();
    var month = date.getMonth() + 1;
    var Year = date.getFullYear();
    var Real_Date = "";
    
    if (Current_Date_Val == null || Current_Date_Val == undefined || Current_Date_Val == "")
    {
        alert("Please Fill the Date");
    }
    
    else 
    {
        if (isValidDate(Current_Date_Val)) return Current_Date_Val;
        else if (Current_Date_Val.indexOf("/") == -1) {
            Real_Date = Current_Date_Val + "/" + month + "/" + Year
            if (isValidDate(Real_Date)) return Real_Date;
            else alert("Please Enter the Correct Date!"); return "";
        }
        else if (Current_Date_Val.indexOf("/") >= 1) {
            Real_Date = Current_Date_Val + "/" + Year
            if (isValidDate(Real_Date)) return Real_Date;
            else alert("Please Enter the Correct Date!"); return "";
        }
        else return Current_Date_Val;
    }
}

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10); // 10 for prevent it to think like octal value
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month-1];
};

function CheckUserPermission() {
    try {
        if (FormGlblData.isAlwAdd == 0 && FormGlblData.isAlwUpdate == 0) { alert("Please Note: You Don't Have Permission to Insert or Update Record!"); }
        else if (FormGlblData.isAlwAdd == 0) { alert("Please Note: You Don't Have Permission to Add New Record!"); }
        else if (FormGlblData.isAlwUpdate == 0) { alert("Please Note: You Don't Have Permission to Update Record!"); }
    } catch (e) { }
}

function GetUserPermission() {
    try{
        $.ajax({
            url: urlCodes.GetUserPermission,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                CurntAprStsKy: 1,
                TrnTypKy: 1 //its trnky
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (Data) {
                FormGlblData.isAlwAcs = Data[0].isAlwAcs;
                FormGlblData.isAlwAdd = Data[0].isAlwAdd;
                FormGlblData.isAlwUpdate = Data[0].isAlwUpdate;
                FormGlblData.isAlwDel = Data[0].isAlwDel;
                FormGlblData.isAlwApr = Data[0].isAlwApr;
            }
        });
    }catch(ex){}
}

function textareaNewLien(ElementId) {//ALT + ENTER shortcut function for textarea new line
    var textarea = document.getElementById(ElementId);
    textarea.onkeydown = function (event) {
        //if (event.defaultPrevented) {
        //    return;
        //}       
        if (event.key !== undefined) {
            if (event.key === 'Enter' && event.altKey) {
                textarea.value += "\n";
            }
        } else if (event.keyIdentifier !== undefined) {
            if (event.keyIdentifier === "Enter" && event.altKey) {
                textarea.value += "\n";
            }

        } else if (event.keyCode !== undefined) {
            if (event.keyCode === 13 && event.altKey) {
                textarea.value += "\n";
            }
        }
        if (event.keyCode === 13) {         
            event.preventDefault();
        }
    };
}