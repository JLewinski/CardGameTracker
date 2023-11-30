using CardGameTracker.Models;

namespace CardGameTracker.Services;

public interface IGameService
{
    Task<List<T>> GetGames<T>(Guid userId) where T : Game;
    Task<T> GetGame<T>(Guid id) where T : Game;
    Task<Game> CreateGame(Game game);
    Task<T> UpdateGame<T>(T game) where T : Game;
    Task DeleteGame(Guid id);
}