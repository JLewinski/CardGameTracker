using CardGameTracker.Models;
using Microsoft.AspNetCore.Components;

partial class Start : ComponentBase
{
    private readonly string[] _playerNames = new string[4];

    [Inject]
    private NavigationManager NavigationManager { get; set; }

    private void StartGame()
    {
        var players = _playerNames
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Select(x => new Player(x))
            .ToList();

        NavigationManager.NavigateTo($"/wizard/game/{players.Count}/{string.Join(",", players.Select(x => x.Name))}");
    }
}