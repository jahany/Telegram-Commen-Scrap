using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TCommentDataAccessLibrary.Models
{
    public class channels
    {
        [Key]
        public string id { get; set; }

        public string? name { get; set; }
        public string? telegramId { get; set; }
        public bool isActive { get; set; } = true;
        public List<userActivity> useractivity { get; set; } = new List<userActivity>();
    }
}
