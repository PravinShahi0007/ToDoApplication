using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TransactionModel.Entity
{
    public class TransactionLockStatus
    {
        public bool IsLocked { get; set; }
        public string UserName { get; set; }
        public string ErrorMsg { get; set; }

    }
}
