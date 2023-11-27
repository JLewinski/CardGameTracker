using CardGameTracker.Models;

namespace CardGameTracker.Services;

public interface IGameService<T> where T : Game
{
    Task<List<T>> GetGames(Guid userId);
    Task<T> GetGame(Guid id);
    Task<T> CreateGame(T game);
    Task<T> UpdateGame(T game);
    Task DeleteGame(Guid id);
}