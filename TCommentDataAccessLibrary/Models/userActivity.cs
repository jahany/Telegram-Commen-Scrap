using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TCommentDataAccessLibrary.Models
{
    public class userActivity
    {
        public long id { get; set; }

        public string? username { get; set; }
        public DateTime regdate { get; set; }
        public string messagetext { get; set; }

        public string? posttext { get; set; }
        public string? postlink { get; set; }
        public string channelsid { get; set; }
        public long userTelegramId { get; set; }
    }
}
