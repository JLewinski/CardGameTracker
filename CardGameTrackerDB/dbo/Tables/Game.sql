CREATE TABLE [dbo].[Game] (
    [GameId]     INT           IDENTITY (1, 1) NOT NULL,
    [Name]       NVARCHAR (64) NOT NULL,
    [Created]    DATETIME      NOT NULL,
    [Updated]    DATETIME      NOT NULL,
    [Deleted]    DATETIME      NOT NULL,
    [IsFinished] BIT           NOT NULL,
    CONSTRAINT [PK_Game] PRIMARY KEY CLUSTERED ([GameId] ASC)
);

