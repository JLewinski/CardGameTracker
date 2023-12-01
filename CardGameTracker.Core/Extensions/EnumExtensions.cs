using System.ComponentModel;

namespace CardGameTracker.Extensions;

public static class EnumExtensions
{
    public static string GetDescription(this Enum value)
    {
        var descriptionAttribute = value.GetType()
            .GetMember(value.ToString())
            .FirstOrDefault()?
            .GetCustomAttributes(typeof(DescriptionAttribute), false)
            .FirstOrDefault() as DescriptionAttribute;

        return descriptionAttribute?.Description ?? value.ToString();
    }
}