using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.Utility
{
    public static class AppSettings
    {

        public static string PublikKey
        {
            get
            {
                return Setting<string>("PublicKey");
            }
        }
        public static string PrivateKey
        {
            get
            {
                return Setting<string>("PrivateKey");
            }
        }
        public static string ThemePath
        {
            get
            {
                return Setting<string>("ThemePath");
            }
        }
        public static string PrivateKey_Entity
        {
            get
            {
                return "MIIBPAIBAAJBAJIlxMNYoX0uzZKkfZagUBAZXIF5gquGqI+hYAKKA8+H4+Q8rh24" +
                        "3NXcoHY+Bi1Fa5Y/4HK/m3iQtY18bCKB91sCAwEAAQJAbZLDo3KgISsmFfwd7QDl" +
                        "Biz9nlVsEw4y8v0a7sxrbvxes8W+R+7NFnDvIUBoVyanuc8U4LVjbjLwfH3Swg2s" +
                        "AQIhAN2jTPTpy3NNDeEG5oqFL7W4CUB2IsW6T17CaHTDYyr7AiEAqM5K6Lr8jsTr" +
                        "umwCfR4g4vavlnwZxU1vcbi/W/0AtyECIQC43sKNMwoxxZ8DCSd5eXh/Qd/ttdxx" +
                        "Q2N67fwFEQkBywIhAJHWiElBIumFn9LTdeL6oJb1YQW1+d3H5LxvTIQAtRmBAiEA" +
                        "1kpd+LZ3/qmUoQZxyLucz7g60XYi5iXhzD4LMDyn408=";
            }
        }
        public static string PublicKey_Entity
        {
            get
            {
                return "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJIlxMNYoX0uzZKkfZagUBAZXIF5gquG" +
                        "qI+hYAKKA8+H4+Q8rh243NXcoHY+Bi1Fa5Y/4HK/m3iQtY18bCKB91sCAwEAAQ==";
            }
        }


        public static string Theme
        {
            get
            {
                return Setting<string>("Theme");
            }
        }

        public static string EncKey
        {
            get
            {
                return "jMKgkM2R2xrsDVxS9HcGnDTFw4QbrC5h";
            }
        }

        public static T Setting<T>(string name)
        {
            string value = System.Configuration.ConfigurationManager.AppSettings[name];

            if (value == null)
            {
                throw new Exception(String.Format("Could not find setting '{0}',", name));
            }

            return (T)Convert.ChangeType(value, typeof(T));
        }
    }
}