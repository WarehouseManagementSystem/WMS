using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Source.Z_Template.Controllers
{
    /// <summary>
    /// Route 规范
    /// API 调用地址根据其 Controller 所在 API 项目中的文件地址而定
    /// Controller 相对于 API 项目根节点地址为：api/Source/Z_Template/ValuesController.cs
    /// 其对应的 API 调用地址为：api/Z_Template/ValuesController/[controller]
    /// 即：api/子模块地址/所在 Controller.cs 的文件名/[controller]
    /// 注意：由于项目的源文件均在 Source 目录下因此去除文件地址中的 `Source/`
    /// 但会在调用地址前保留 `api/`，以表明其为 API 调用
    /// </summary>
    [Route("api/Z_Template/ValuesController/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
