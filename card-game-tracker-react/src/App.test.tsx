import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import WizardGame, { IWizardGame } from './models/wizard/game';
import { v4 as uuid } from 'uuid';
import { Player } from './models/player';
import Round from './models/wizard/round';
import Score from './models/wizard/score';
import LocalStorageSaveService from './services/localStorage';
import { ISaveService } from './services/ISaveService';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

function createGame(){
  const game = new WizardGame(uuid());

  for (let i = 0; i < 4; i++) {
    game.Players.push({ Name: `Player ${i}`, Id: uuid() });
  }

  game.AddRound();

  for (let i = 0; i < 5; i++) {
    game.AddRound();
    const round = game.Rounds[i];
    for (let j = 0; j < i + 1; j++) {
      const score = round.Scores[game.Players[j % game.Players.length].Name];
      score.Bid++;
      score.TricksTaken = 1 + (score.TricksTaken ?? 0);
    }
  }
  return game;
}

test('serialize wizard game', () => {
  const game = createGame();

  const serialized = JSON.stringify(game);
  const deserialized = JSON.parse(serialized) as IWizardGame;
  const loadedGame = new WizardGame(deserialized);
  expect(deserialized.Id).toBe(game.Id);
  expect(loadedGame.getTotalTricks(1)).toBe(1);
});

test('local save game', async () => {
  const game = createGame();
  const saveService = new LocalStorageSaveService() as ISaveService;
  await saveService.save(game);
  const loadedGame = await saveService.load<IWizardGame>(game.Id);
  expect(loadedGame.Id).toBe(game.Id);
});

