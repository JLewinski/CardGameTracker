using CardGameTracker.Models;
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

        Game.FirstDealer = firstDealerText;
        currentDealer = Game.FirstDealer;
        currentRound = 1;
    }

    protected override async Task OnParametersSetAsync()
    {
        Game = await GameService.GetGame<WizardGame>(Id);
        firstDealerText = Game.FirstDealer;
        currentDealer = Game.GetCurrentDealer();
        currentRound = Game.Rounds.Count;
    }
}