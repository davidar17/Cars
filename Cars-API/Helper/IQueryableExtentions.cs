using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Cars_API.Model;

namespace Cars_API.Helper
{
    public static class IQueryableExtentions
    {
        public static IQueryable<T> ApplyOrderBy<T>(this IQueryable<T> query,
         IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnMap)
        {
            if (string.IsNullOrWhiteSpace(queryObj.SortBy))
                return query;
            if (queryObj.IsSortAscending)
            {

                return query.OrderBy(columnMap[queryObj.SortBy]);
            }
            else
            {
                return query.OrderByDescending(columnMap[queryObj.SortBy]);
            }
        }
        
        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query,IQueryObject queryObj)
        {
            // if(queryObj.Page == 0)
            return query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);
        }
    }
}