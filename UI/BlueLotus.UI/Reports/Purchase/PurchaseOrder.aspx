<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PurchaseOrder.aspx.cs" Inherits="BlueLotus.UI.Reports.Purchase.PurchaseOrder" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<%--<%@ Register assembly="Telerik.ReportViewer.WebForms, Version=8.0.14.225, Culture=neutral, PublicKeyToken=a9d7983dfcc261be" namespace="Telerik.ReportViewer.WebForms" tagprefix="telerik" %>--%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"> </asp:ScriptManager>
    <div>
       
     <rsweb:ReportViewer ID="MyReportViewer" runat="server" Height="1000" Width="800">
        </rsweb:ReportViewer>
    </div>

    </form>
    </body>
    </html>