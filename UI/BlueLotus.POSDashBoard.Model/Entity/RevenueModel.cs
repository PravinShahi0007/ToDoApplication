using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.POSDashBoard.Model.Entity
{
    public class RevenueModel
    {
        public event PropertyChangedEventHandler PropertyChanged;

        private void OnPropertyChanged(string propertyName)
        {
            var handler = PropertyChanged;
            if (handler != null)
            {
                handler(this, new PropertyChangedEventArgs(propertyName));
            }
        }
        public string FrmDtm { get; set; }
        public string ToDtm { get; set; }
        public int Amt { get; set; }
        public string HH { get; set; }
        public int amt
        {
            get
            {
                return Amt;
            }
            set
            {
                this.Amt = value;
                OnPropertyChanged("Total");
            }
        }
    }
}
