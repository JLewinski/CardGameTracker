using System.Data;

namespace CardGameTracker.Services.DataServices
{
    public static class IDataReaderExtensions
    {
        public static void AddParameter(this IDbCommand command, string name, object? value)
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
                var attr = property.GetCustomAttributes(true).FirstOrDefault(x => x is DataReaderAttribute) as DataReaderAttribute;
                if (attr?.Ignore != true)
                {
                    command.AddParameter(attr?.Name ?? property.Name, property.GetValue(parameters));
                }
            }
        }

        public static T GetObject<T>(this IDataReader reader) where T : new()
        {
            var objType = typeof(T);
            T obj = new T();

            bool hasClassAttr = objType.GetCustomAttributes(true).Any(x => x is DataReaderAttribute);
            foreach (var property in objType.GetProperties())
            {
                if (!property.CanWrite)
                {
                    continue;
                }

                var attr = property.GetCustomAttributes(true).FirstOrDefault(x => x is DataReaderAttribute) as DataReaderAttribute;
                if ((hasClassAttr && attr?.Ignore != true) || attr?.Ignore == false)
                {
                    string name = attr?.Name ?? property.Name;
                    property.SetValue(obj, reader.GetValueOrNull(name, property.PropertyType));
                }
            }

            return obj;
        }

        public static object? GetValueOrNull(this IDataReader dataReader, string name, Type propertyType)
        {
            object value = dataReader[name];

            if (value == DBNull.Value)
            {
                if (Nullable.GetUnderlyingType(propertyType) == null && propertyType.IsValueType)
                {
                    throw new InvalidCastException($"Field: {name} could not be cast to a type of {propertyType.Name}");
                }
                return null;
            }
            return value;
        }

        public static T GetValue<T>(this IDataReader dataReader, string name)
        {
            object value = dataReader[name];

            if (value == DBNull.Value)
            {
                throw new InvalidCastException($"Field: {name} could not be cast to a type of {typeof(T).Name}");
            }
            return (T)value;
        }

        public static T? GetValueOrNull<T>(this IDataReader dataReader, string name)
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
