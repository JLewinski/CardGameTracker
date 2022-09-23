CREATE TABLE [dbo].[ResultOption] (
    [ResultOptionId] INT            IDENTITY (1, 1) NOT NULL,
    [GameId]         INT            NOT NULL,
    [Name]           NVARCHAR (128) NOT NULL,
    [ResultType]     TINYINT        NOT NULL,
    CONSTRAINT [PK_ResultOption] PRIMARY KEY CLUSTERED ([ResultOptionId] ASC),
    CONSTRAINT [FK_ResultOption_Game] FOREIGN KEY ([GameId]) REFERENCES [dbo].[Game] ([GameId])
);

