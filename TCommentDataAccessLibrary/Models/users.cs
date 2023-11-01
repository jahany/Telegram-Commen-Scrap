using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TCommentDataAccessLibrary.Models
{
    public class users
    {
        public long id { get; set; }
        [Required(ErrorMessage ="نام نمیتواند خالی باشد")]
        public string name { get; set; }
        public string? phone { get; set; }
        [Required(ErrorMessage = "ای دی تلگرام نمیتواند خالی باشد")]
        public long userTelegramId { get; set; }
        
    }
}
