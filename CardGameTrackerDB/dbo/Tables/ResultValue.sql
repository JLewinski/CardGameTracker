CREATE TABLE [dbo].[ResultValue] (
    [ResultValueId]  INT            IDENTITY (1, 1) NOT NULL,
    [RoundResultId]  INT            NOT NULL,
    [ResultValue]    NVARCHAR (128) NOT NULL,
    [ResultOptionId] INT            NOT NULL,
    CONSTRAINT [PK_ResultValue] PRIMARY KEY CLUSTERED ([ResultValueId] ASC),
    CONSTRAINT [FK_ResultValue_ResultOption] FOREIGN KEY ([ResultOptionId]) REFERENCES [dbo].[ResultOption] ([ResultOptionId]),
    CONSTRAINT [FK_ResultValue_RoundResult] FOREIGN KEY ([RoundResultId]) REFERENCES [dbo].[RoundResult] ([RoundResultId])
);

