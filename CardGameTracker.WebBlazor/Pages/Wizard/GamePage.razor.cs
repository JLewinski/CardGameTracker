using CardGameTracker.Models;
using CardGameTracker.Models.Wizard;
using CardGameTracker.Services;
using Microsoft.AspNetCore.Components;

namespace CardGameTracker.WebBlazor.Pages.Wizard;
partial class GamePage : ComponentBase
{
    [Parameter]
    public Guid Id { get; set; }

    [Inject]
    private IGameService GameService { get; set; } = null!;

    private WizardGame Game { get; set; } = new();

    private string firstDealerText = string.Empty;
    private string currentDealer = string.Empty;
    private int currentRound = 0;
    private void SetFirstDealer()
    {
        if (string.IsNullOrEmpty(firstDealerText))
        {
            return;
        }

        currentRound = 1;
        currentDealer = firstDealerText;
        Game.AddRound();
        Game.FirstDealer = firstDealerText;

        GameService.UpdateGame(Game);
    }

    private bool isLoading = true;

    protected override async Task OnParametersSetAsync()
    {
        Game = await GameService.GetGame<WizardGame>(Id);
        currentRound = Game.Rounds.Count;
        UpdateFields();
        isLoading = false;
    }

    private void UpdateFields()
    {
        currentDealer = Game.GetDealer(currentRound);
    }

    private void PreviousRound()
    {
        if (currentRound == 0)
        {
            return;
        }
        currentRound--;
        UpdateFields();
    }

    private void NextRound()
    {
        if (!Game.IsValidRound(currentRound))
        {
            //TODO: Show error
            return;
        }

        if (currentRound == Game.Rounds.Count)
        {
            Game.AddRound();
            currentRound = Game.Rounds.Count;
        }
        else if (currentRound < Game.Rounds.Count)
        {
            currentRound++;
        }
        else if (currentRound > Game.Rounds.Count)
        {
            currentRound = Game.Rounds.Count;
        }

        UpdateFields();

        GameService.UpdateGame(Game);
    }
}