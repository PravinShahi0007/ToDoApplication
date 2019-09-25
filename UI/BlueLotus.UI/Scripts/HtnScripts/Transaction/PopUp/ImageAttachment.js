
var DocKy = 0;

//$(document).ready(function () {
//    CancelImage();
//})

function AttachImage() {
    $("#AttachImage").show().kendoWindow({
        width: "1000px",
        height: "500px",
        modal: true,
        title: "Image Attachment"
    });
    $('#AttachImage').data('kendoWindow').center().open();
    CancelImage();
    $("HdrSec1_FileImgLoad_Val").prop('disabled', false);
    GetImage(FormGlblData.RecKy);
    //e.preventDefault();
}

function CancelImage() {
    $('#imageTempPreview').attr('src', '');
    $("#HdrSec1_FileImgLoad_Val").val("");
    $("#imagePreview").empty();
    DocKy = 0;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageTempPreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#HdrSec1_FileImgLoad_Val").change(function () {
    readURL(this);
});

function SaveImage() {
    var RecKy = FormGlblData.RecKy;
    //alert(TrnKy); 

    if (typeof FormData == "undefined") {
        var data = [];
        var opmlFile = document.getElementById('files').files[0];
        data.push('opmlFile', document.getElementById('HdrSec1_FileImgLoad_Val').files[0]);
    }
    else {
        var data = new FormData();

        var opmlFile = document.getElementById('HdrSec1_FileImgLoad_Val').files[0];
        data.append("opmlFile", document.getElementById('HdrSec1_FileImgLoad_Val').files[0]);

        //var GridData = $("#grid").data("kendoGrid");

        // if (GridData.VersionNo != VersionNo && GridData.InsrtDt != InsrtDt) {


        $.ajax({
            type: "POST",
            url: urlInsertFileswithpath, //'@Url.Content("~/ToDoProject/InsertFileswithpath")',
            data: data,
            dataType: "html",
            contentType: false,
            processData: false,
            enctype: "multipart/form-data",
            success: function (result) {
                var obj = JSON.parse(result);


                if (obj != undefined && obj != "") { 
                    for (i = 0; i < obj.length; i++) {

                        FormGlblData.ImagePath = obj[0].FilePath;
                        FormGlblData.ImageNm = obj[0].FileNm;
                    }

                    SaveImgToDb(obj[0].FilePath, obj[0].FileNm);

                    //alert("Success");
                }
                else {


                    FormGlblData.ImagePath = obj[0].FilePath;
                    FormGlblData.ImageNm = obj[0].FileNm;

                    alert("Already Exist");
                }
                $('#AttachImage').data('kendoWindow').close();
            },
            error: function (e) {
                return false;
            }
        })
    }

}

function GetImage(recky) {
    var RecKy = recky;

    $.ajax({
        url: UrlTblRecDoc_SelectWeb,
        data: {
            RecKy: RecKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            
            if (data[0] != undefined && data.length > 0) {
                DocKy = data[0].DocKy;
                //$('#HdrSec1_FileImgLoad_Val').val(data[0].FileNm);
                //$('input type=[file]').val(data[0].FileNm);
                //DocKy = data[0].DocKy;
                var imgSrc = data[0].ImgBase64;
                var imgName = data[0].FileNm;;
                

                var $img = $("<img>", {
                    "src": "data:application/pdf;base64," + imgSrc,
                    "width": "350px", "height": "250px"
                })
                $("#imagePreview").empty();
                $("#imagePreview").append($img);


                //var url = 'data:application/octet-stream,Testing%20one%20two%20three';
                var url = "data:application/octet-stream;base64," + imgSrc;
                var anchor = document.createElement('a');
                anchor.setAttribute('href', url);
                anchor.setAttribute('download', imgName);

                /*
                 * Click the anchor
                 */

                // This works in Chrome, not in Firefox
                $(anchor)[0].click();

                // For Firefox, we need to manually do a click event

                // Create event
                var ev = document.createEvent("MouseEvents");
                ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

                // Fire event
                anchor.dispatchEvent(ev);

                //var iframe = document.createElement("iframe");
                //iframe.style.display = "none";
                //iframe.download = data[0].FileNm;
                //iframe.src = "data:application/octet-stream;base64," + imgSrc;
                ////header('Content-Disposition: attachment; filename= +"data[0].FileNm"');
                //document.body.appendChild(iframe);

                //var embed = document.createElement("embed");
                //iframe.style.display = "none";
                //iframe.download = data[0].FileNm;
                //embed.src = "data:application;base64," + imgSrc;


                try {
                    $("#ButtonSec1_AttachImage").addClass("control-button attachments");
                }
                catch (e) { }

                //document.getElementById('imagePreview').setAttribute('src', 'data:image/png;base64', +imgSrc);

                //            $("<img>", {
                //                "src": "data:image/png;base64," + imgSrc,
                //                "width": "250px", "height": "250px"
                //            })
                //.appendTo("#imagePreview");

            }
            else {
                CancelImage();
                try {
                    $("#ButtonSec1_AttachImage").removeClass("control-button attachments");
                    $("#ButtonSec1_AttachImage").addClass("control-button attach");
                }
                catch (e) { }
            }
        },
        error: function (e) {
            CancelImage();
            try {
                $("#ButtonSec1_AttachImage").removeClass("control-button attachments");
                $("#ButtonSec1_AttachImage").addClass("control-button attach");
            }
            catch (e) { }
            return false;
        }
    })
}

function SaveImgToDb(ImagePath, ImageNm) {

    var RecKy = FormGlblData.RecKy;
    var FilePath = ImagePath;
    var FileNm = ImageNm;
    var TblNm = FormGlblData.TblNm;

    if (FilePath == null || FileNm == null || RecKy < 10) {
        alert("Select a Record/Image");
        return;
    }

    $.ajax({
        url: UrlDocMas_InsertWeb,
        data: {
            RecKy: RecKy,
            FilePath: FilePath,
            FileNm: FileNm,
            TblNm: TblNm,
            DocKy: DocKy

        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                alert("Success");
            }
            else {
                alert("Fail");
            }
        },
        error: function (e) {
            alert("Fail");
            return false;
        }
        
    })

}


function DeleteImage() {

    var RecKy = FormGlblData.RecKy;
    var TblNm = FormGlblData.TblNm;

    $.ajax({
        url: UrlTblRecDoc_DeleteWeb,
        data: {
            RecKy: RecKy,
            TblNm: TblNm,
            DocKy: DocKy

        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                alert("Deleted");
                GetImage();
            }
            else {
                alert("Failed");
            }
        },
        error: function (e) {
            alert("Failed");
            return false;
        }

    })

}

