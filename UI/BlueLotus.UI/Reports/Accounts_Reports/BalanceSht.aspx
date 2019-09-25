<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BalanceSht.aspx.cs" Inherits="BlueLotus.UI.Reports.Accounts_Reports.BalanceSht" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <%--        <telerik:ReportViewer ID="ReportViewer1" runat="server" Height="672px" ParametersAreaVisible="False" Visible="False" Width="100%"></telerik:ReportViewer>--%>
        
         <asp:ScriptManager ID="ScriptManager1" runat="server"> </asp:ScriptManager>
        <div>  
            <rsweb:ReportViewer ID="MyReportViewer" runat="server" Height="1000" Width="800">
            </rsweb:ReportViewer>
        </div>
    </form>
    <div>
    </div>
</body>
</html>
<style>
    ::-webkit-scrollbar {
        display: none;
    }

    body {
        margin-right: -16px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
