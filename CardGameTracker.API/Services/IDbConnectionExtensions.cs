﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.API.Services
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

        public static void AddParameter(this IDbCommand command, string name, object value)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = name;
            parameter.Value = value ?? DBNull.Value;
            command.Parameters.Add(parameter);
        }

        public static void AddParameters(this IDbCommand command, object parameters)
        {
            foreach (var property in parameters.GetType().GetProperties())
            {
                //TODO: make attribute to put on property to ignore
                //TODO: make attrubute to set name of propertiy if different from variable name
                command.AddParameter(property.Name, property.GetValue(parameters));
            }
        }

        public static T GetValue<T>(this IDataReader dataReader, string name)
        {
            object value = dataReader[name];

            if (value == DBNull.Value)
            {
                if (Nullable.GetUnderlyingType(typeof(T)) == null && typeof(T).IsValueType)
                {
                    throw new InvalidCastException($"Field: {name} could not be cast to a type of {typeof(T).Name}");
                }
                return default(T);
            }
            return (T)value;
        }
    }
}
