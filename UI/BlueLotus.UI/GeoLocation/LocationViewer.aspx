<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LocationViewer.aspx.cs" Inherits="BlueLotus.UI.Views.GeoLoc.LocationViewer" %>



<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="../Scripts/GeoLocation/jquery.datetimepicker.css" />
    <title>Geo Location Viewer
    </title>
    <script src="../Scripts/GeoLocation/jquery.js"></script>
      <script src="http://cdn.kendostatic.com/2015.2.624/js/jquery.min.js"></script>
    <script src="http://cdn.kendostatic.com/2015.2.624/js/kendo.all.min.js"></script>  
     <script src="../Scripts/GeoLocation/LocationViewer.js"></script>
    <script src="../Scripts/GeoLocation/build/jquery.datetimepicker.full.js"></script>
    <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcGSrojwraFXqxeoVsT5m1H8eidqNDZto&sensor=false">
    </script>
    <link rel="stylesheet" type="text/css" href="style/style.css" />
</head>

<body onload="initialize()" style="background-color: #daecf4;">
    <div class="nipmain">

        <div class="nipimg">
            <!--insert your image hear-->
            &nbsp;
        </div>
        <div class="niphead" id="subcon">
            <h2>TrackIt - Geo Location Service</h2>
        </div>
    </div>
    <form id="form1" runat="server">
        <div style="border: solid 2px rgb(35, 180, 244); margin-left: 20%; margin-right: 10px; padding: 6px; margin: 10px; height: auto">

            <div style="float: left; padding-left: 20px; margin-left: 6%">
                <label id="Label1">Name</label>&nbsp;
                <div id="cmbGeoUsr"></div>
                 <asp:DropDownList ID="DropDownList1" runat="server" Height="18px" Width="135px">
                 </asp:DropDownList>
            </div>
            <div style="float: left; padding-left: 20px; margin-left: 6%">

                <label id="Label3">Start Date</label>&nbsp;
             <asp:TextBox ID="fromdatetimepicker" runat="server"></asp:TextBox>
            </div>
            <div style="float: left; padding-left: 20px; margin-left: 6%">


                <label id="Label2">End Date</label>&nbsp;
             <asp:TextBox ID="todatetimepicker" runat="server"></asp:TextBox>

            </div>
            <div style="padding-left: 20px; margin-left: 6%">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Load Map" />
                <br />
            </div>
        </div>
        <div id="mapArea" style="width: 100%; height: 500px; float: left;">
        </div>

        <asp:Literal ID="Literal1" runat="server"></asp:Literal>
    </form>
</body>
</html>
<script>
    var urlGetGeoUsr = '@Url.Content("~/GeoLoc/GetGeoUsr")';

    $("#Button1").click(function () {
        localStorage.setItem('GeoFromDate', $('#fromdatetimepicker').val());
        localStorage.setItem('GeoToDate', $('#todatetimepicker').val());
    });

    $.datetimepicker.setLocale('en');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy;
    $('#fromdatetimepicker').datetimepicker({
        dayOfWeekStart: 1,
        lang: 'en',
        disabledDates: ['1986/01/08', '1986/01/09', '1986/01/10'],
        startDate: today
    });
    $('#fromdatetimepicker').datetimepicker({ value: localStorage.getItem('GeoFromDate'), step: 10 });
    var logic = function (currentDateTime) {
        if (currentDateTime && currentDateTime.getDay() == 6) {
            this.setOptions({
                minTime: '11:00'
            });
        } else
            this.setOptions({
                minTime: '8:00'
            });
    };
    $('#todatetimepicker').datetimepicker({
        dayOfWeekStart: 1,
        lang: 'en',
        disabledDates: ['1986/01/08', '1986/01/09', '1986/01/10'],
        startDate: today
    });
    $('#todatetimepicker').datetimepicker({ value: localStorage.getItem('GeoToDate'), step: 10 });
    var logic = function (currentDateTime) {
        if (currentDateTime && currentDateTime.getDay() == 6) {
            this.setOptions({
                minTime: '11:00'
            });
        } else
            this.setOptions({
                minTime: '8:00'
            });
    };
    if (!isPostBack) {
        $('#fromdatetimepicker').datetimepicker({ value: today, step: 10 });
        $('#todatetimepicker').datetimepicker({ value: today, step: 10 });
    }

</script>
