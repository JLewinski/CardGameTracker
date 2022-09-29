namespace CardGameTracker.Services.DataServices
{
    public class DataReaderAttribute
    {
        public bool Ignore { get; set; } = false;
        public string? Name { get; set; } = null;
    }
}