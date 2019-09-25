
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


