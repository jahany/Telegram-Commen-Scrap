using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TCommentDataAccessLibrary.DataAccess;
using TCommentDataAccessLibrary.Models;
using TL;

namespace TComment.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        public IConfiguration _configuration;

        private readonly ILogger<CommentController> _logger;
        private readonly TComment_DBContext _db;
        public CommentController(IConfiguration config,ILogger<CommentController> log, TComment_DBContext db)
        {
            _configuration = config;

            _logger = log;
            _db = db;
        }

        [HttpGet("getComments")]
        public ActionResult getComments(long TelegramUserId)
        {
            var res = from ua in _db.Set<userActivity>()
                      join u in _db.Set<users>()
                      on ua.userTelegramId equals u.userTelegramId
                      where u.userTelegramId == TelegramUserId
                      select ua;

            return Ok(res.ToList());
        }

        [HttpGet("getUsers")]
        public ActionResult getUsers()
        {

            return Ok(_db.users.ToList());
        }

        [HttpPost("insertUser")]
        public ActionResult insertUser(users u)
        {
            if (ModelState.IsValid)
            {
                _db.users.Add(u);
                _db.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPost("deleteUser")]
        public ActionResult deleteUser(long UserId)
        {
            users u = new users() { id = UserId };
            _db.users.Attach(u);
            _db.users.Remove(u);
            _db.SaveChanges();

            return Ok();
        }

        [HttpGet("getChannels")]
        public ActionResult getChannels()
        {

            return Ok(_db.channels.ToList());
        }
        [HttpPost("deleteChannels")]
        public ActionResult deleteChannels(string ChannelId)
        {
            channels c = new channels() { id = ChannelId };
            _db.channels.Attach(c);
            _db.channels.Remove(c);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPost("insertcahnnel")]
        public ActionResult insertcahnnel(channels c)
        {
            if (ModelState.IsValid)
            {
                if (_db.channels.Where(x => x.id == c.id).Count() > 0)
                {
                    _db.channels.Update(c);
                    _db.SaveChanges();
                }
                else
                {
                    _db.channels.Add(c);
                    _db.SaveChanges();
                }
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
