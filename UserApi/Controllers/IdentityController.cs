using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace UserApi.Controllers
{
    [Route("[controller]")]
    public class IdentityController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var claims = from c in User.Claims select new { c.Type, c.Value };
            return new JsonResult(claims);
        }

        [HttpPost]
        [Authorize("write_access")]
        public IActionResult Post()
        {
            var claims = from c in User.Claims select new { c.Type, c.Value };
            return new JsonResult(claims);
        }
    }
}