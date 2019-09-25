
$(document).ready(function () {
    getAlertStatus();
    var tempSMSStat, tempEmailStat, tempMobStat;
    $('#SMS').change(function () {
        tempSMSStat = document.getElementById('SMS');
        if (tempSMSStat.checked) {
            tempSMSStat = 1;
        }
        else {
            tempSMSStat = 0;
        }
        tempEmailStat = document.getElementById('Email');
        if (tempEmailStat.checked) {
            tempEmailStat = 1;
        }
        else {
            tempEmailStat = 0;
        }
        tempMobStat = document.getElementById('Mob');
        if (tempMobStat.checked) {
            tempMobStat = 1;
        }
        else {
            tempMobStat = 0;
        }
        setAlertStatus(tempSMSStat, tempEmailStat, tempMobStat);
    });
    $('#Email').change(function () {
        tempSMSStat = document.getElementById('SMS');
        if (tempSMSStat.checked) {
            tempSMSStat = 1;
        }
        else {
            tempSMSStat = 0;
        }
        tempEmailStat = document.getElementById('Email');
        if (tempEmailStat.checked) {
            tempEmailStat = 1;
        }
        else {
            tempEmailStat = 0;
        }
        tempMobStat = document.getElementById('Mob');
        if (tempMobStat.checked) {
            tempMobStat = 1;
        }
        else {
            tempMobStat = 0;
        }
        setAlertStatus(tempSMSStat, tempEmailStat, tempMobStat);
    });
    $('#Mob').change(function () {
        tempSMSStat = document.getElementById('SMS');
        if (tempSMSStat.checked) {
            tempSMSStat = 1;
        }
        else {
            tempSMSStat = 0;
        }
        tempEmailStat = document.getElementById('Email');
        if (tempEmailStat.checked) {
            tempEmailStat = 1;
        }
        else {
            tempEmailStat = 0;
        }
        tempMobStat = document.getElementById('Mob');
        if (tempMobStat.checked) {
            tempMobStat = 1;
        }
        else {
            tempMobStat = 0;
        }
        setAlertStatus(tempSMSStat, tempEmailStat, tempMobStat);
    });
});
function setAlertStatus(tempSMSStat, tempEmailStat, tempMobStat)
{
    $.ajax({

        url: urlSetAlertStatus,
        data: { SMSStat: tempSMSStat, EmailStat: tempEmailStat, MobStat: tempMobStat },
        type: "POST",
        error: function () {
            alert("Unable to set Alert Services");
        },
        success: function (data) {
            if(data==true)
            {
                alert("Successfully Updated the Alert Status");
            }
        }
    })
}
function getAlertStatus()
{
    $.ajax({

        url: urlGetAlertStatus,
        type: "POST",
        error: function () {
            alert("Unable to get Alert Status");
        },
        success: function (data) {
            if (data[0].EmailStat == "1") {
                $("#Email").prop("checked", true);
            }
            else
                {
                $("#Email").prop("checked", false);
        }
            if (data[0].SMSStat == "1") {
                $("#SMS").prop("checked", true);
            }
            else {
                $("#SMS").prop("checked", false);
            }
            if (data[0].MobileStat == "1") {
                $("#Mob").prop("checked", true);
            }
            else {
                $("#Mob").prop("checked", false);
            }
            //document.getElementById('SentTm').innerHTML = "Last Run Time : " + data[0].LstRnTm;
        }
    })
}