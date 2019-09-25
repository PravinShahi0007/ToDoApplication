
var DocKy = 0;
var PrjKyForImageUpload = 1;

function CancelImage() {
    $('#imageTempPreview').attr('src', '');
    $('#imageTempPreview').hide();
    $("#HdrSec1_FileImgLoad_Val").val("");
    $("#imagePreview").empty();
    DocKy = 0;
}

function GetImage(recky) {
    var RecKy = recky;

    $.ajax({
        url: UrlTblRecDoc_SelectWeb,
        data: {
            RecKy: RecKy,
            OurCd: FormGlblData.ImgOurCd,
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data[0] != undefined && data.length > 0) {
                DocKy = data[0].DocKy;
                var imgSrc = data[0].ImgBase64;
                var imgName = data[0].FileNm;
                var ImageExt = imgName.split(".");
                if (ImageExt[1].toUpperCase() == 'JPEG' || ImageExt[1].toUpperCase() == 'JPG' || ImageExt[1].toUpperCase() == 'JPG' || ImageExt[1].toUpperCase() == 'PNG') {

                    var $img = $("<img>", {
                        "src": "data:image/jpeg;base64," + imgSrc,
                        "width": "350px", "height": "250px",
                    })
                    $("#imagePreview").empty();
                    $("#imagePreview").append($img);
                    $('#imageTempPreview').hide();
                    var url = "data:image/jpeg;base64," + imgSrc;
                    //var anchor = document.createElement('a');
                    //anchor.setAttribute('href', url);
                    //anchor.setAttribute('download', imgName);



                    ///*
                    // * Click the anchor
                    // */

                    //// This works in Chrome, not in Firefox
                    ////$(anchor)[0].click();
                    //// For Firefox, we need to manually do a click event
                    //// Create event
                    //var ev = document.createEvent("MouseEvents");
                    //ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

                    // Fire event
                    // anchor.dispatchEvent(ev);


                    $("#imagePreview img").each(function () {
                        var $this = $(this);
                        var a = $('<a/>').attr({ href: url, download: imgName })//'href', url);
                        $this.wrap(a);
                    });
                } else if (ImageExt[1].toUpperCase() == 'PDF') {
                    window.open("data:application/pdf;base64, " + imgSrc);
                    //var $img = $("<img>", {
                    //    "src": "data:image/jpeg;base64," + imgSrc,
                    //    "width": "350px", "height": "250px",
                    //})
                    //$("#imagePreview").empty();
                    //$("#imagePreview").append($img);
                    //$('#imageTempPreview').hide();
                    //var url = "data:image/jpeg;base64," + imgSrc;

                    //$("#imagePreview img").each(function () {
                    //    var $this = $(this);
                    //    var a = $('<a/>').attr({ href: url, download: imgName })//'href', url);
                    //    $this.wrap(a);
                    //});

                } else {
                    var $img = $("<img>", {
                        "src": "data:application/pdf;base64," + imgSrc,
                        "width": "350px", "height": "250px"
                    })
                    $("#imagePreview").empty();
                    $("#imagePreview").append($img);
                    $('#imageTempPreview').hide();
                    var url = "data:application/octet-stream;base64," + imgSrc;
                    var anchor = document.createElement('a');
                    anchor.setAttribute('href', url);
                    anchor.setAttribute('download', imgName);

                    /*
                     * Click the anchor
                     */

                    // This works in Chrome, not in Firefox
                    //$(anchor)[0].click();
                    // For Firefox, we need to manually do a click event
                    // Create event
                    var ev = document.createEvent("MouseEvents");
                    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

                    // Fire event
                    anchor.dispatchEvent(ev);
                }





            }
            else {
                CancelImage();
            }
        },
        error: function (e) {
            CancelImage();
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

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageTempPreview').attr('src', e.target.result);
            $('#imageTempPreview').show();
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
            DocKy: DocKy,
            OurCd:FormGlblData.ImgOurCd

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
