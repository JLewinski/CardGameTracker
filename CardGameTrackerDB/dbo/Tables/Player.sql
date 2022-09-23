CREATE TABLE [dbo].[Player] (
    [PlayerId] INT            IDENTITY (1, 1) NOT NULL,
    [Name]     NVARCHAR (128) NOT NULL,
    [Nickname] NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK_Player] PRIMARY KEY CLUSTERED ([PlayerId] ASC)
);

