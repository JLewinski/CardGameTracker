CREATE TABLE [dbo].[PlayerGame] (
    [PlayerId] INT NOT NULL,
    [GameId]   INT NOT NULL,
    CONSTRAINT [PK_PlayerGame] PRIMARY KEY CLUSTERED ([PlayerId] ASC, [GameId] ASC),
    CONSTRAINT [FK_PlayerGame_Game] FOREIGN KEY ([GameId]) REFERENCES [dbo].[Game] ([GameId]),
    CONSTRAINT [FK_PlayerGame_Player] FOREIGN KEY ([PlayerId]) REFERENCES [dbo].[Player] ([PlayerId])
);

