CREATE TABLE [dbo].[RoundOption] (
    [RoundOptionId] INT            IDENTITY (1, 1) NOT NULL,
    [RoundId]       INT            NOT NULL,
    [Name]          NVARCHAR (64)  NOT NULL,
    [Value]         NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK_RoundOption] PRIMARY KEY CLUSTERED ([RoundOptionId] ASC),
    CONSTRAINT [FK_RoundOption_Round] FOREIGN KEY ([RoundId]) REFERENCES [dbo].[Round] ([RoundId])
);

