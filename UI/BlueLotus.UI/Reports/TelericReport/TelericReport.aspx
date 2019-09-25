<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TelericReport.aspx.cs" Inherits="BlueLotus.UI.Reports.TelericReport.TelericReport" %>

<%@ Register TagPrefix="telerik" Namespace="Telerik.ReportViewer.WebForms" Assembly="Telerik.ReportViewer.WebForms, Version=11.2.17.913, Culture=neutral, PublicKeyToken=a9d7983dfcc261be" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        html#html, body#body, form#form1, div#content {
            height: 100%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" height="100%">
        <telerik:ReportViewer ID="ReportViewer1" runat="server" Height="800px" Width="1265px">
        </telerik:ReportViewer>

    </form>
</body>

</html>
