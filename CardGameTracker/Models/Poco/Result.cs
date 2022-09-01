﻿using CardGameTracker.Models.Interface;

namespace CardGameTracker.Models.Poco
{
    public abstract class ResultPoco : ResultBase, IResult
    {
        public int ResultValueId { get; set; }
        public int RoundResultId { get; set; }
        public int ResultOptionId { get; set; }

        private IRoundResult roundResult;
        public IRoundResult RoundResult
        {
            get => roundResult;
            set
            {
                roundResult = value;
                RoundResultId = roundResult.RoundResultId;
            }
        }

        private IResultOption resultOption;
        public override IResultOption ResultOption
        {
            get => resultOption;
            set
            {
                resultOption = value;
                ResultOptionId = resultOption.ResultOptionId;
            }
        }


    }

}
