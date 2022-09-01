namespace CardGameTracker.Models.Interface{
    public interface IParcable<T>
    {
        T Value { get; set; }
        void Update(string val);
    }
}