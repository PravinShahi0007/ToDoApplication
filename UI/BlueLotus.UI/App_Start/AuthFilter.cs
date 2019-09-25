using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.App_Start
{
    class AuthFilter : FilterAttribute, IAuthorizationFilter
    {
        ApiOperation apiOpr = new ApiOperation();
        public string Role { get; set; }

        public AuthFilter(params object[] roles)
        {
            if (roles.Any(r => r.GetType().BaseType != typeof(Enum)))
                throw new ArgumentException("roles");

            this.Role = string.Join(",", roles.Select(r => Enum.GetName(r.GetType(), r)));
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            //CheckAddEmployee(filterContext);
            //string user = filterContext.HttpContext.User.Identity.Name;
            try
            {
                int objKy = int.Parse(filterContext.Controller.ValueProvider.GetValue("ObjKy").AttemptedValue);

                int cKy = Convert.ToInt32(HTNSession.CKy);
                int usrKy = Convert.ToInt32(HTNSession.UsrKy);

                if (!Auth(Role, usrKy, cKy, objKy))
                {
                    HttpContext.Current.Server.TransferRequest("~/Errors/UnAuthorised");
                }
            }
            catch { }
        }

        private bool Auth(string role, int usrKy, int cKy, int objKy)
        {
            if (apiOpr.Date())
                return apiOpr.MenuAuthorization(HTNSession.Environment, usrKy, cKy, objKy);
            else
                return false;
        }

        //private void CheckAddEmployee(AuthorizationContext filterContext)
        //{
        //    string userName = filterContext.HttpContext.User.Identity.Name;
        //    EmployeeProcess empProcessor = new EmployeeProcess(new EmployeeDataAccess());
        //    if (!empProcessor.CheckEmployee(userName))
        //    {
        //        var currentUser = UserPrincipal.Current;
        //        EmployeeModel emp = new EmployeeModel { EmployeeFirstName = currentUser.GivenName, EmployeeLastName = currentUser.Surname, UserName = userName };
        //        empProcessor.AddEmployee(emp);
        //    }
        //}

    }
}