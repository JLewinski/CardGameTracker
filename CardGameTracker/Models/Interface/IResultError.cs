namespace CardGameTracker.Models.Interface
{
    public interface IResultError
    {
        int ResultErrorId { get; set; }
        string ErrorMessage { get; set; }
        int ErrorCode { get; set; }
        int ResultOptionId { get; set; }
        IResultOption ResultOption { get; set; }
    }
}