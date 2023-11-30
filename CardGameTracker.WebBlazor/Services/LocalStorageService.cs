using Blazored.LocalStorage;
using CardGameTracker.Models;

namespace CardGameTracker.Services;

public class LocalStorageService(ILocalStorageService localStorageService) : IGameService
{
    private readonly ILocalStorageService _localStorageService = localStorageService;

    public async Task<Game> CreateGame(Game game)
    {
        await _localStorageService.SetItemAsync(game.Id.ToString(), game);

        List<Guid> ids;

        if (await _localStorageService.ContainKeyAsync("gameIds"))
        {
            ids = await _localStorageService.GetItemAsync<List<Guid>>("gameIds");
            ids.Add(game.Id);
        }
        else
        {
            ids = new() { game.Id };
        }

        await _localStorageService.SetItemAsync("gameIds", ids);

        return game;
    }

    public async Task DeleteGame(Guid id)
    {
        await _localStorageService.RemoveItemAsync(id.ToString());
        var ids = await _localStorageService.GetItemAsync<List<Guid>>("gameIds");
        ids.Remove(id);
        await _localStorageService.SetItemAsync("gameIds", ids);
    }

    public async Task<T> GetGame<T>(Guid id) where T : Game
    {
        return await _localStorageService.GetItemAsync<T>(id.ToString());
    }

    public async Task<List<T>> GetGames<T>(Guid userId) where T : Game
    {
        var ids = await _localStorageService.GetItemAsync<List<Guid>>("gameIds");
        List<T> games = [];
        foreach (var id in ids)
        {
            games.Add(await GetGame<T>(id));
        }

        return games;
    }

    public async Task<T> UpdateGame<T>(T game) where T : Game
    {
        await _localStorageService.SetItemAsync(game.Id.ToString(), game);
        return game;
    }
}
