$(function () {

   
});

function GetBOQNo() {

    $.ajax({
        url: '(@Url.Content("~/BOQ/GetBOQNo_SelectWeb")',
        data: JSON.stringify({
        }),
        
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (boqno) {

            for (i = 0; i < boqno.length; i++){
                  
                var newboqno = boqno[0].BOQNo;
                alert(newboqno);
                $("#boqNo").val(newboqno)
                   
            }
        
   
        },
        error: function (e) {
            return false;
        }
    });
    }