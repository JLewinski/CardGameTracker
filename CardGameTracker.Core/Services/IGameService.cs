using CardGameTracker.Models;

namespace CardGameTracker.Services;

public interface IGameService
{
    Task<List<T>> GetGames<T>(Guid userId) where T : Game;
    Task<T> GetGame<T>(Guid id) where T : Game;
    Task<Game> CreateGame(Game game);
    Task<Game> UpdateGame(Game game);
    Task DeleteGame(Guid id);
}