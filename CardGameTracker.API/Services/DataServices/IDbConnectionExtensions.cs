using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.Services.DataServices
{
    public static class IDbConnectionExtensions
    {
        public static SqlCommand CreateStoredProcedure(this SqlConnection connection, string storedProcedureName)
        {
            var command = new SqlCommand(storedProcedureName, connection);
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = storedProcedureName;

            return command;
        }

        public static SqlCommand CreateStoredProcedure(this SqlConnection connection, string storedProcedureName, object parameters)
        {
            var command = connection.CreateStoredProcedure(storedProcedureName);
            command.AddParameters(parameters);

            return command;
        }
    }
}
