using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ObjModel.Entity
{
    public class ObjModels
    {
        public int ObjTypKy { get; set; }
        public string ObjTyp { get; set; }
        public string ObjTypNm { get; set; }       
    }

    public class Objselect
    {
        public int ObjKy { get; set; }
        public string ObjCaptn { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public bool isAct { get; set; }
        public bool isApr { get; set; }
        public int ObjTypKy { get; set; }
        public string MenuPath { get; set; }
        public string ObjKyPath { get; set; }
    }
}
