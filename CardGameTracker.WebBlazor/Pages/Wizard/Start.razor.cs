using CardGameTracker.Models;
using CardGameTracker.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;

namespace CardGameTracker.WebBlazor.Pages.Wizard;

partial class Start : ComponentBase
{
    [Inject]
    private NavigationManager NavigationManager { get; set; } = null!;

    [Inject]
    private IGameService GameService { get; set; } = null!;

    private List<WizardGame> SavedGames { get; set; } = new();

    protected override async Task OnInitializedAsync()
    {
        SavedGames = await GameService.GetGames<WizardGame>(Guid.NewGuid());
    }

    public async Task StartGame()
    {
        await GameService.CreateGame(game);
        NavigationManager.NavigateTo($"/wizard/game/{game.Id}");
    }

    private void DeleteGame(WizardGame game)
    {
        GameService.DeleteGame(game.Id);
        SavedGames.Remove(game);
    }
    
    private WizardGame game = new();

    private Player createPlayer = new(string.Empty);


    public void AddPlayer(EditContext editContext)
    {
        if (string.IsNullOrEmpty(createPlayer.Name))
        {
            // editContext.
            return;
        }

        if (game.Players.Any(p => p.Name == createPlayer.Name))
        {
            //Show error, player already exists
            return;
        }

        if (game.Players.Count == 6)
        {
            //Show error, too many players
            return;
        }

        game.Players.Add(new Player(createPlayer.Name));
        createPlayer.Name = string.Empty;
    }

    private void RemovePlayer(Player player)
    {
        game.Players.Remove(player);
    }
}