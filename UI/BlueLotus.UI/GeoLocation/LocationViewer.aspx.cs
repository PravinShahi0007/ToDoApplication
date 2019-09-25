using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BlueLotus.UI.Views.GeoLoc
{
    public partial class LocationViewer : System.Web.UI.Page
    {
            //String todt = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            
//            if (!IsPostBack)
//            {
//                FillDropDownList();
//                 //fromdt = fromdatetimepicker.Text;
//                 //todt = todatetimepicker.Text;
                
//            }

//            string script;
//            if (IsPostBack)
//            {
//                script = "var isPostBack = true;";
//            }
//            else
//            {
//                script = "var isPostBack = false;";
//            }
//            Page.ClientScript.RegisterStartupScript(GetType(), "IsPostBack", script, true);

//            //setTimeout(function () { location.reload(1); }, 10000);
//            string markers = GetMarkers();
//            Literal1.Text = @"
//     <script type='text/javascript'>
//    document.title='HTN Geo Mapping Service';
//     function initialize() {
// 
//     var mapOptions = {
//     center: new google.maps.LatLng(6.8655215, 79.8695),
//     zoom: 11,
//     mapTypeId: google.maps.MapTypeId.ROADMAP 
//     };
// 
//     var myMap = new google.maps.Map(document.getElementById('mapArea'),
//     mapOptions);"
//            + markers +
//            @"
//google.maps.event.addDomListener(window, 'resize', function() {
//    myMap.setCenter(center);
//});
//
}
//     </script>";

//        }

        //private void FillDropDownList()
        //{
        //    using (SqlConnection conn = new
        //    SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["BLueLotusDataConnection_BL10Data"].ConnectionString))
        //    {
        //        DataTable dt = new DataTable();
        //        dt.Columns.Add("UsrNm", typeof(string));
        //        SqlCommand newCmd = conn.CreateCommand();
        //        newCmd.Connection = conn;
        //        newCmd.CommandText = "GetUsrNmForGeo_SelectWeb";
        //        newCmd.CommandType = CommandType.StoredProcedure;
        //        conn.Open();
        //        SqlDataReader dr = newCmd.ExecuteReader();
        //        while (dr.Read())

        //        {
        //            dt.Rows.Add(dr["UsrNm"]);
        //        }
        //        conn.Close();

        //        DropDownList1.DataSource = dt;
        //        DropDownList1.DataValueField = "UsrNm";
        //        DropDownList1.DataTextField = "UsrNm";
        //        DropDownList1.DataBind();
        //    }


        //}
//        protected string GetMarkers()
//        {
//            string markers = "";
//            using (SqlConnection con = new
//            SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["BLueLotusDataConnection_BL10Data"].ConnectionString))
//            {
//                //SqlCommand cmd = new SqlCommand("SELECT dbo.GeoLoc.Latitude, dbo.GeoLoc.Longitude, dbo.GeoLoc.Area, dbo.GeoLoc.LogDt FROM dbo.UsrMas INNER JOIN dbo.GeoLoc ON dbo.UsrMas.UsrKy = dbo.GeoLoc.UsrKy WHERE dbo.UsrMas.UsrId ='"+DropDownList1.SelectedItem.ToString()+ "'", con);
//                SqlCommand newCmd = con.CreateCommand();
//                newCmd.Connection = con;
//                newCmd.CommandText = "GeoLoc_SelectWeb";
//                newCmd.Parameters.Add("@UsrNm", SqlDbType.VarChar).Value = DropDownList1.SelectedItem.ToString();
//                newCmd.Parameters.Add("@FrmDt", SqlDbType.VarChar).Value = fromdatetimepicker.Text.ToString();
//                newCmd.Parameters.Add("@ToDt", SqlDbType.VarChar).Value = todatetimepicker.Text.ToString();
//                newCmd.CommandType = CommandType.StoredProcedure;
//                con.Open();
//                SqlDataReader reader = newCmd.ExecuteReader();
//                int i = 0;

//                while (reader.Read())
//                {
//                    i++;
//                    markers +=
//                    @"var marker" + i.ToString() + @" = new google.maps.Marker({
//              position: new google.maps.LatLng(" + reader["Latitude"].ToString() + ", " +
//                    reader["Longitude"].ToString() + ")," +
//                    @"map: myMap,
//              title:'" + reader["Area"].ToString() + "\\n" + String.Format("{0:dddd, MMMM d, yyyy}", reader["LogDt"])
//                       + "\\n" + String.Format("{0:HH:mm:ss}", reader["LogDt"]) + "'});";
//                }
//                //title:'" + reader["Area"].ToString() +"\\n"+ reader["LogDt"].ToString() + "'});";
//            }
//            return markers;
//        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            //fromdatetimepicker.Text=fromdt;
            //todatetimepicker.Text = todt;
           // string markers = GetMarkers();
//            Literal1.Text = @"
//     <script type='text/javascript'>
//    document.title='HTN Geo Mapping Service';
//     function initialize() {
// 
//     var mapOptions = {
//     center: new google.maps.LatLng(6.8655215, 79.8695),
//     zoom: 11,
//     mapTypeId: google.maps.MapTypeId.ROADMAP 
//     };
// 
//     var myMap = new google.maps.Map(document.getElementById('mapArea'),
//     mapOptions);"
//            + markers +
//            @"
//google.maps.event.addDomListener(window, 'resize', function() {
//    map.setCenter(center);
//});
//
//}
//     </script>";
        }
    }
}