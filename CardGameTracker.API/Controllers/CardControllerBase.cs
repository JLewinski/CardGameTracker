using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.API.Controllers
{
    public abstract class CardControllerBase<T> : ControllerBase
    {
        protected readonly ILogger<T> _logger;

        public CardControllerBase(ILogger<T> logger)
        {
            _logger = logger;
        }
    }
}
