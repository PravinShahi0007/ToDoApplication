
$(document).ready(function () {

});
function OpenWindowSampleSMS()
{
    $("#SMS_DemoDiv").show().kendoWindow({
        width: "400px",
        height: "150px",
        resizable: false,
        title: "Send Test SMS",
    });
    $('#SMS_DemoDiv').data('kendoWindow').center().open();
}
function SendSampleSMS()
{
    var Mob = $("#MobNo").val();
    var Msg = $("#MsgLn").val();
    $.ajax({

        url: urlSendSampleSMS,
        data: { Mob: Mob, Msg: Msg },
        type: "POST",
        error: function () {
            alert("Unable to send SMS");
        },
        success: function (data) {
            if (data == true) {
                alert("Message Successfully Added to the Queue");
                location.reload();
            }
        }
    })
}