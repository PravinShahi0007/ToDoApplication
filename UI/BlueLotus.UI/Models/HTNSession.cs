using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Sockets;
using System.Net;
using System.Web.Configuration;
using System.Drawing.Printing;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.Models
{

    public static class HTNSession
    {

        private static bool isFirstLogin = true;

        public static bool IsFirstLogin
        {
            get { return isFirstLogin; }
            set { isFirstLogin = value; }
        }

        public static int CKy
        {
            get
            {
                if (HttpContext.Current.Request.Cookies["CKy"] != null)
                {
                    int myInt = 0;
                    return int.TryParse(HttpContext.Current.Request.Cookies["CKy"].Value, out myInt) ? myInt : 0;
                }
                else
                    return 0;
            }
            set { HttpContext.Current.Response.Cookies["CKy"].Value = value.ToString(); }
        }

        public static string CNm
        {
            get
            {
                if (HttpContext.Current.Request.Cookies["CNm"] != null)
                    return HttpContext.Current.Request.Cookies["CNm"].Value.ToString();                
                else 
                    return "";
            }
            set { HttpContext.Current.Response.Cookies["CNm"].Value = value; }
        }

        public static int UsrKy
        {
            get
            {
                if (HttpContext.Current.Request.Cookies["UsrKy"] != null)
                {
                    int myInt = 0;
                    return int.TryParse(HttpContext.Current.Request.Cookies["UsrKy"].Value, out myInt) ? myInt : 0;
                }
                else 
                    return 0;
            }
            set { 
                HttpContext.Current.Response.Cookies["UsrKy"].Value = value.ToString(); 
            }
        }

        public static string UsrId
        {
            get
            {
                if (HttpContext.Current.Request.Cookies["UsrId"] != null)
                    return HttpContext.Current.Request.Cookies["UsrId"].Value;                
                else 
                    return "";
            }
            set { HttpContext.Current.Response.Cookies["UsrId"].Value = value; }
        }

        public static string UserName
        {
            get
            {
                if (HttpContext.Current.Request.Cookies["UserName"] != null)
                    return HttpContext.Current.Request.Cookies["UserName"].Value;                
                else 
                    return "";
            }
            set { HttpContext.Current.Response.Cookies["UserName"].Value = value; }
        }

        public static long AdrKy
        {
            get
            {
                if (HttpContext.Current.Request.Cookies["AdrKy"] != null)
                {
                    int myInt = 0;
                    return int.TryParse(HttpContext.Current.Request.Cookies["AdrKy"].Value, out myInt) ? myInt : 0;
                }
                else
                    return 0;
            }
            set { HttpContext.Current.Response.Cookies["AdrKy"].Value = value.ToString(); }
        }

        public static string Environment
        {
            get
            {
                string environment = "";

                if (HttpContext.Current.Request.Cookies["Environment"] != null)
                    environment = HttpContext.Current.Request.Cookies["Environment"].Value;

                if (!(environment != null && environment.Length > 0))
                    environment = WebConfigurationManager.AppSettings["DefaultEnvironment"];

                return environment;
            }
            set { HttpContext.Current.Response.Cookies["Environment"].Value = value; }
        }

        public static User User
        {
            get { return HttpContext.Current.Session["User"] as User; }
            set { HttpContext.Current.Session["User"] = value; }
        }

        public static Company Company
        {
            get { return HttpContext.Current.Session["Company"] as Company; }
            set { HttpContext.Current.Session["Company"] = value; }
        }

        public static List<MenuModel> MenuItems
        {
            get { return HttpContext.Current.Session["MenuItems"] as List<MenuModel>; }
            set { HttpContext.Current.Session["MenuItems"] = value; }
        }
    }


    //public static class HTNSession
    //{

    //    private static bool isFirstLogin = true;

    //    public static bool IsFirstLogin
    //    {
    //        get { return isFirstLogin; }
    //        set { isFirstLogin = value; }
    //    }

    //    public static int CKy
    //    {
    //        get { return Convert.ToInt32(HttpContext.Current.Session["CKy"]); }
    //        set { HttpContext.Current.Session["CKy"] = value; }
    //    }

    //    public static string CNm
    //    {
    //        get { return HttpContext.Current.Session["CNm"].ToString(); }
    //        set { HttpContext.Current.Session["CNm"] = value; }
    //    }

    //    public static int UsrKy
    //    {
    //        get { return Convert.ToInt32(HttpContext.Current.Session["UsrKy"]); }
    //        set { HttpContext.Current.Session["UsrKy"] = value; }
    //    }

    //    public static string UsrId
    //    {
    //        get { return HttpContext.Current.Session["UsrId"].ToString(); }
    //        set { HttpContext.Current.Session["UsrId"] = value; }
    //    }

    //    public static string UserName
    //    {
    //        get { return HttpContext.Current.Session["UserName"].ToString(); }
    //        set { HttpContext.Current.Session["UserName"] = value; }
    //    }

    //    public static long AdrKy
    //    {
    //        get { return Convert.ToInt64(HttpContext.Current.Session["AdrKy"]); }
    //        set { HttpContext.Current.Session["AdrKy"] = value; }
    //    }

    //    public static string Environment
    //    {
    //        get { return HttpContext.Current.HTNSession.Environment; }
    //        set { HttpContext.Current.Session["Environment"] = value; }
    //    }

    //    public static User User
    //    {
    //        get { return HttpContext.Current.Session["User"] as User; }
    //        set { HttpContext.Current.Session["User"] = value; }
    //    }

    //    public static Company Company
    //    {
    //        get { return HttpContext.Current.Session["Company"] as Company; }
    //        set { HttpContext.Current.Session["Company"] = value; }
    //    }

    //    public static List<MenuModel> MenuItems
    //    {
    //        get { return HttpContext.Current.Session["MenuItems"] as List<MenuModel>; }
    //        set { HttpContext.Current.Session["MenuItems"] = value; }
    //    }
    //}

}