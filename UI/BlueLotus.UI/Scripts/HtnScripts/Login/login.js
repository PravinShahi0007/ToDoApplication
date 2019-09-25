
function Cancel() {
    $("#username").val(null);
    $("#password").val(null);
    $("#environment").val(null);
}


/*input error lable */
$('#username').keypress(function () {
    $('#error').css({ "visibility": "hidden" });
});

$('#password').keypress(function () {
    $('#errorPassword').css({ "visibility": "hidden" });
});

/*-- input + div  focus --*/
$('#divUserName').click(function () {
    $('#username').focus();
});

$('#divPassword').click(function () {
    $('#password').focus();
});

$('#divEnvironment').click(function () {
    $('#environment').focus();
});

$('#username').focus(function () {
    $('#divUserName').css({ "background-color": "#ebebeb" });
    $('#divUserName').css({ "border-color": "#aaaaaa" });
    $('#username').css({ "background-color": "#ebebeb" });
    $('#lblUserName').css({ "color": "#aaaaaa" });
});

$('#password').focus(function () {
    $('#divPassword').css({ "background-color": "#ebebeb" });
    $('#divPassword').css({ "border-color": "#aaaaaa" });
    $('#password').css({ "background-color": "#ebebeb" });
    $('#lblPassword').css({ "color": "#aaaaaa" });
});

$('#environment').focus(function () {
    $('#divEnvironment').css({ "background-color": "#ebebeb" });
    $('#divEnvironment').css({ "border-color": "#aaaaaa" });
    $('#environment').css({ "background-color": "#ebebeb" });
    $('#lblEnvironment').css({ "color": "#aaaaaa" });
});

/* input null value submit validations and color change */
function validateUserName() {
    var userName = document.getElementById('username').value;
    if (userName.length <= 0) {
        document.getElementById('error').innerHTML = "Username is required."
        document.getElementById('error').style.visibility = "visible";
        document.getElementById('divUserName').style.backgroundColor = "#FEECEC";
        document.getElementById('divUserName').style.borderColor = "#ccc";
        document.getElementById('username').style.backgroundColor = "#FEECEC";
        document.getElementById('lblUserName').style.color = "#626262";
    }
    else {
        document.getElementById('error').innerHTML = ""
        document.getElementById('divUserName').style.backgroundColor = "#fff";
        document.getElementById('divUserName').style.borderColor = "#ccc";
        document.getElementById('username').style.backgroundColor = "#fff";
        document.getElementById('lblUserName').style.color = "#959595";
    }
}
function validatePassword() {
    var Password = document.getElementById('password').value;
    if (Password.length <= 0) {
        document.getElementById('errorPassword').innerHTML = "Password is required."
        document.getElementById('errorPassword').style.visibility = "visible";
        document.getElementById('divPassword').style.backgroundColor = "#FEECEC";
        document.getElementById('divPassword').style.borderColor = "#ccc";
        document.getElementById('password').style.backgroundColor = "#FEECEC";
        document.getElementById('lblPassword').style.color = "#626262";
    }
    else {
        document.getElementById('errorPassword').innerHTML = ""
        document.getElementById('divPassword').style.backgroundColor = "#fff";
        document.getElementById('divPassword').style.borderColor = "#ccc";
        document.getElementById('password').style.backgroundColor = "#fff";
        document.getElementById('lblPassword').style.color = "#959595";
    }
}

function validateEnvironment() {
    document.getElementById('divEnvironment').style.backgroundColor = "#fff";
    document.getElementById('divEnvironment').style.borderColor = "#ccc";
    document.getElementById('environment').style.backgroundColor = "#fff";
    document.getElementById('lblEnvironment').style.color = "#626262";
}


/*input focus control for Enter key*/
$("#username").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#password").focus();
    }
});

$("#environment").keypress(function (e) {

    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#login").focus();
    }
});

try {
    document.getElementById('username').addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
} catch (e) { }

