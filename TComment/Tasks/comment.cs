using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using TCommentDataAccessLibrary.DataAccess;
using TCommentDataAccessLibrary.Models;
using TL;

namespace StockCore.Tasks
{

    public class GetCommentsTask : IHostedService, IDisposable
    {
        private readonly IServiceScopeFactory scopeFactory;


        private int executionCount = 0;
        private readonly ILogger<GetCommentsTask> _logger;
        private TComment_DBContext _db;
        private Timer? _timer = null;

        WTelegram.Client client;
        public GetCommentsTask(ILogger<GetCommentsTask> logger, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            this.scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Get Telegram Comments Started");

            client = new WTelegram.Client(26475186, "f08311ba2a37b09a51ded487aaee049e"); // this constructor doesn't need a Config method


            DoLogin("989116914051"); // initial call with user's phone_number


            //_timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(3));
            DoWork(null);
            return Task.CompletedTask;

        }
        async Task DoLogin(string loginInfo) // (add this method to your code)
        {
            while (client.User == null)
                switch (await client.Login(loginInfo)) // returns which config is needed to continue login
                {
                    case "verification_code":
                        {
                            _logger.LogInformation("Insert Code in telegramPassword.txt");
                            await Task.Delay(30000);
                            string res = System.IO.File.ReadAllText("telegramPassword.txt");
                            loginInfo = res;
                            break;
                        }
                    case "name": loginInfo = "John Doe"; break;    // if sign-up is required (first/last_name)
                    case "password": loginInfo = "secret!"; break; // if user has enabled 2FA
                    default: loginInfo = null; break;
                }
            _logger.LogInformation($"We are logged-in as {client.User} (id {client.User.id})");

        }

        private async void DoWork(object? state)
        {
            try
            {
                _logger.LogInformation("Comments Readed");
                using (var scope = scopeFactory.CreateScope())
                {
                    _db = scope.ServiceProvider.GetRequiredService<TComment_DBContext>();

                    List<channels> channels = _db.channels.Where(x => x.isActive == true).ToList();
                    foreach (var c in channels)
                    {

                        InputPeer channel = await client.Contacts_ResolveUsername(c.id);
                        var peerDialogs = await client.Messages_GetPeerDialogs(channel);
                        var msg_id = peerDialogs.dialogs[0].TopMessage;

                        var replies = await client.Messages_GetReplies(channel, msg_id, 0);
                        foreach (var item in replies.Messages)
                        {
                            userActivity ua = new userActivity();
                            ua.messagetext = item.ToString().Split(">")[1];
                            ua.regdate = item.Date;
                            ua.userTelegramId = long.Parse(item.ToString().Split(">")[0]);
                            ua.postlink = "https://t.me/" + c.id + "/" + msg_id;
                            ua.channelsid = c.id;
                            List<userActivity> res = _db.userActivity.Where(x => x.userTelegramId == ua.userTelegramId && x.regdate == ua.regdate && x.postlink == ua.postlink).ToList();
                            if (res.Count < 1)
                            {
                                _db.userActivity.Add(ua);
                                _db.SaveChanges();
                            }
                        }


                        var replies1 = await client.Messages_GetReplies(channel, msg_id-1, 0);
                        foreach (var item in replies1.Messages)
                        {
                            userActivity ua = new userActivity();
                            ua.messagetext = item.ToString().Split(">")[1];
                            ua.regdate = item.Date;
                            ua.userTelegramId = long.Parse(item.ToString().Split(">")[0]);
                            ua.postlink = "https://t.me/" + c.id + "/" + (msg_id-1);
                            ua.channelsid = c.id;
                            List<userActivity> res = _db.userActivity.Where(x => x.userTelegramId == ua.userTelegramId && x.regdate == ua.regdate && x.postlink == ua.postlink).ToList();
                            if (res.Count < 1)
                            {
                                _db.userActivity.Add(ua);
                                _db.SaveChanges();
                            }
                        }



                        var replies2 = await client.Messages_GetReplies(channel, msg_id-2, 0);
                        foreach (var item in replies2.Messages)
                        {
                            userActivity ua = new userActivity();
                            ua.messagetext = item.ToString().Split(">")[1];
                            ua.regdate = item.Date;
                            ua.userTelegramId = long.Parse(item.ToString().Split(">")[0]);
                            ua.postlink = "https://t.me/" + c.id + "/" + (msg_id-2);
                            ua.channelsid = c.id;
                            List<userActivity> res = _db.userActivity.Where(x => x.userTelegramId == ua.userTelegramId && x.regdate == ua.regdate && x.postlink == ua.postlink).ToList();
                            if (res.Count < 1)
                            {
                                _db.userActivity.Add(ua);
                                _db.SaveChanges();
                            }
                        }
                    }
                }
                await Task.Delay(180000);
                DoWork(null);
            }
            catch (Exception ex)
            {
                DoWork(null);
            }
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}