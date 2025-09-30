import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, UserPlus } from "lucide-react";

interface Notification {
  id: number;
  type: "approval" | "registration" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "approval",
    title: "Event Approval Required",
    message: "Winter Sports Meet needs your approval",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "registration",
    title: "New Registration",
    message: "15 new participants registered for Science Fair",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "System Update",
    message: "School event system updated successfully.",
    time: "1 day ago",
    read: true,
  },
];

const typeColor = {
  approval: "bg-gradient-to-r from-red-500 to-pink-500",
  registration: "bg-gradient-to-r from-blue-500 to-violet-500",
  info: "bg-gradient-to-r from-gray-400 to-gray-600",
};

const typeIcon = {
  approval: <Bell className="w-5 h-5 text-white" />,
  registration: <UserPlus className="w-5 h-5 text-white" />,
  info: <CheckCircle2 className="w-5 h-5 text-white" />,
};

const Notifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(n =>
      n.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className="flex-1 flex flex-col h-screen w-full p-0 m-0">
        <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
          <div className="w-full max-w-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Notifications</h2>
            <div className="space-y-4">
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 rounded-xl border shadow-sm p-4 bg-white transition-all ${
                    notif.read ? "opacity-70" : "opacity-100"
                  } hover:shadow-md`}
                >
                  <div className={`flex items-center justify-center rounded-full w-10 h-10 ${typeColor[notif.type]}`}>
                    {typeIcon[notif.type]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg text-black">{notif.title}</span>
                      {!notif.read && (
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>
                    <div className="text-gray-600 text-sm">{notif.message}</div>
                    <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                  </div>
                  {!notif.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-2"
                      onClick={() => markAsRead(notif.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-8 font-semibold text-blue-700">
              View All Notifications
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;