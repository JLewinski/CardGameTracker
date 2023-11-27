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
    
    protected override async Task OnParametersSetAsync()
    {
        Game = await GameService.GetGame<WizardGame>(Id);
    }
}