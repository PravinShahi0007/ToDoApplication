using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;

namespace BlueLotus.UI.Models
{
    enum CachKeys
    {
        UsrObjPrp_SelectAllLastChildWeb,
        UsrObjPrp_SelectWeb,
        UsrObjPrp_SelectDeepSearchWeb,


    }
    enum prefixkeyvalue
    {
        Item,
        Prj,
        Acc,
        Adr,
    }
    public class HTNCache
    {

        /// <summary>
        /// remove a cached object from the HttpRuntime.Cache
        /// </summary>
        public static void RemoveCachedObject(string key)
        {
            HttpRuntime.Cache.Remove(key);
        }

        public static void ClearCacheItems()
        {
            var enumerator = HttpRuntime.Cache.GetEnumerator();


            while (enumerator.MoveNext())
            {
                HttpContext.Current.Cache.Remove(enumerator.Key.ToString());
            }
        }

        public static List<string>  GetCacheItems()
        {
            var enumerator = HttpRuntime.Cache.GetEnumerator();
            List<string> lst = new List<string>();

            while (enumerator.MoveNext())
            {
                lst.Add(enumerator.Key.ToString());
               
            }
            return lst;
        }
        public static void ClearCacheItems(string Prefix)
        {
            var enumerator = HttpRuntime.Cache.GetEnumerator();
        
            foreach (System.Collections.DictionaryEntry entry in HttpContext.Current.Cache)
            {
                var temp = entry.Key.ToString();
                if (entry.Key.ToString().Contains(Prefix))
                HttpContext.Current.Cache.Remove((entry.Key.ToString()));
            }

           
            //while (enumerator.MoveNext())
            //{
            //    HttpContext.Current.Cache.Remove(enumerator.Key.ToString());
            //}
        }

        /// <summary>
        /// retrieve an object from the HttpRuntime.Cache
        /// </summary>
        public static object GetCachedObject(string key)
        {
            return HttpRuntime.Cache[key];
        }

        public static List<object> GetCachedObjectList(string key)
        {
            List<object> ob = (List <object>) HttpRuntime.Cache[key];
            if (ob.Count > 1)
                return (List<object>)HttpRuntime.Cache[key];
            else
                return null;
        }


        /// <summary>
        /// add an object to the HttpRuntime.Cache with an absolute expiration time
        /// </summary>
        public static void SetCachedObject(string key, object o, int durationSecs)
        {
            HttpRuntime.Cache.Add(
                key,
                o,
                null,
                DateTime.Now.AddSeconds(durationSecs),
                Cache.NoSlidingExpiration,
                CacheItemPriority.High,
                null);
        }

        /// <summary>
        /// add an object to the HttpRuntime.Cache with a sliding expiration time. sliding means the expiration timer is reset each time the object is accessed, so it expires 20 minutes, for example, after it is last accessed.
        /// </summary>
        public static void SetCachedObjectSliding(string key, object o, int slidingSecs)
        {
            HttpRuntime.Cache.Add(
                key,
                o,
                null,
                Cache.NoAbsoluteExpiration,
                new TimeSpan(0, 0, slidingSecs),
                CacheItemPriority.High,
                null);
        }

        /// <summary>
        /// add a non-removable, non-expiring object to the HttpRuntime.Cache
        /// </summary>
        public static void SetCachedObjectPermanent(string key, object o)
        {
            HttpRuntime.Cache.Remove(key);
            HttpRuntime.Cache.Add(
                key,
                o,
                null,
                Cache.NoAbsoluteExpiration,
                Cache.NoSlidingExpiration,
                CacheItemPriority.NotRemovable,
                null);
        }

        public static void ClearCacheItems(string Prefix,string Cky)
        {
            var enumerator = HttpRuntime.Cache.GetEnumerator();

            foreach (System.Collections.DictionaryEntry entry in HttpContext.Current.Cache)
            {
                var temp = entry.Key.ToString();
                if (entry.Key.ToString().Contains(Prefix)&&entry.Key.ToString().Contains(Cky))
                    HttpContext.Current.Cache.Remove((entry.Key.ToString()));
            }


            //while (enumerator.MoveNext())
            //{
            //    HttpContext.Current.Cache.Remove(enumerator.Key.ToString());
            //}
        }
    }
}