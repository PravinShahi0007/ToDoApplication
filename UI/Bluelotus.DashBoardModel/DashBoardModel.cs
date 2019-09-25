using BlueLotus.dailytodo.Entityy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bluelotus.DashBoardModel
{
    public class DashBoardModel
    {

        public int count { get; set; }

        private string _status;
        public string Status { get
            {
                return _status;
            } set {
                if (String.IsNullOrWhiteSpace(value))
                {
                    _status = "Undifined";
                }
                else
                {
                    _status = value;

                }
            } }
        public int Id { get; set; }
        public List<DailyToDoModel> dailyToDos { get; set; }
    }
}
