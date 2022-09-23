CREATE TABLE [dbo].[Round] (
    [RoundId]     INT IDENTITY (1, 1) NOT NULL,
    [RoundNumber] INT NOT NULL,
    [GameId]      INT NOT NULL,
    CONSTRAINT [PK_Round] PRIMARY KEY CLUSTERED ([RoundId] ASC),
    CONSTRAINT [FK_Round_Game] FOREIGN KEY ([GameId]) REFERENCES [dbo].[Game] ([GameId])
);

