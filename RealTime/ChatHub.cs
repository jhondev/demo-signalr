using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace DemoSignalR.RealTime
{
    public class ChatHub : Hub
    {
        public async Task SendToAll(string name, string message)
        {
            await Clients.All.SendAsync("handleNewMessage", name, message);
        }
    }
}