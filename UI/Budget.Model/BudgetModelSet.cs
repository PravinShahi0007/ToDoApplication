using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.Model
{
    public class BudgetModelSet
    {
        public int AccBgtKy { get; set; }
        public int AccBgtTypKy { get; set; }
        public string BgtDt { get; set; }

        public int AccKy { get; set; }
        public int BuKy { get; set; }
        public int PrjKy { get; set; }
        public string DocNo { get; set; }
        public decimal Amt { get; set; }
        public int PrntKy { get; set; }
        public string Lvl { get; set; }
        public string SO { get; set; }
        public int isLeaf { get; set; }
        public int isRoot { get; set; }
        public int AcsLvlKy { get; set; }
        public int ConFinLvlKy { get; set; }
        public string Sky { get; set; }
        public string Maint { get; set; }
        public int OrgKy { get; set; }
    }
    
    public class BudgeHeaderModel
    {
        public string BgtDt { get; set; }
        public string AccKy { get; set; }
        public string BuKy { get; set; }
        public string PrjKy { get; set; }

    }
}
