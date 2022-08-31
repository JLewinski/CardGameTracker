﻿using CardGameTracker.Models.Interface;
using CardGameTracker.Models.Poco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.Services.DataServices
{
    public interface IDataService
    {
        List<GameDisplay> GetGameList(int startIndex = 0, int endIndex = 0, string? name = null, bool? isFinished = null, DateTime? startDate = null, DateTime? endDate = null);
        IGame GetGame(int id);
        Task<IGame> GetGameAsync(int id);
        IRound GetRound(int id);
        Task<IRound> GetRoundAsync(int id);
        IRound GetRound(int gameId, int roundNumber);
        Task<IRound> GetRoundAsync(int gameId, int roundNumber);
        IPlayer GetPlayer(int id);
        Task<IPlayer> GetPlayerAsync(int id);
        bool Insert(IRound round);
        Task<bool> InsertAsync(IRound round);
        bool Save(IRound round);
        Task<bool> SaveAsync(IRound round);
        bool Save(IGame game);
        Task<bool> SaveAsync(IGame game);
        bool Save(IPlayer player);
        Task<bool> SaveAsync(IPlayer player);
        bool Save(IRoundResult roundResult);
        Task<bool> SaveAsync(IRoundResult roundResult);
        bool Save(IResultValue roundValue);
        Task<bool> SaveAsync(IResultValue roundValue);
    }
}
