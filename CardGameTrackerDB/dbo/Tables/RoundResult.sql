CREATE TABLE [dbo].[RoundResult] (
    [RoundResultId] INT IDENTITY (1, 1) NOT NULL,
    [RoundId]       INT NOT NULL,
    [PlayerId]      INT NOT NULL,
    CONSTRAINT [PK_RoundResult] PRIMARY KEY CLUSTERED ([RoundResultId] ASC),
    CONSTRAINT [FK_RoundResult_Player] FOREIGN KEY ([PlayerId]) REFERENCES [dbo].[Player] ([PlayerId]),
    CONSTRAINT [FK_RoundResult_Round] FOREIGN KEY ([RoundId]) REFERENCES [dbo].[Round] ([RoundId])
);

