import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  Plus, 
  TrendingUp, 
  AlertCircle,
  Activity,
  CalendarDays
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import logo from "@/assets/image.png";
import { supabase } from "../lib/supabaseClient";
import { Bell, LogOut, User, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const { data: { user } } = await supabase.auth.getUser();

if (user) {
  console.log("Email:", user.email);
  console.log("Role:", user.user_metadata.role);
}






// Mock data for the dashboard
const mockEvents = [
  {
    id: 1,
    title: "foundation day",
    date: "2025-09-10",
    participants: 156,
    status: "approved",
    type: "Academic"
  },
  {
    id: 2,
    title: "Sports fest",
    date: "2025-09-15",
    participants: 89,
    status: "approved",
    type: "Sports"
  },
  
 
];

const mockNotifications = [
  {
    id: 1,
    title: "Event Approval Required",
    message: "Winter Sports Meet needs your approval",
    time: "2 hours ago",
    type: "urgent"
  },
  {
    id: 2,
    title: "New Registration",
    message: "15 new participants registered for Science Fair",
    time: "5 hours ago",
    type: "info"
  }
];

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    // Fetch events from localStorage (or replace with API call)
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents([]); // fallback if no events
    }
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-border p-6">
          <div className="flex items-center justify-between">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded-xl shadow" /> {/* Logo added here */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.name || "Admin"}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your school events today.
              </p>
            </div>
            <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="relative hover:bg-muted/50 transition-smooth"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full border-2 border-card"></span>
            </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting review
                </p>

              </CardContent>
            </Card>
            

            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">50%</div>
                <p className="text-xs text-muted-foreground">
                 
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Events */}
            <div className="lg:col-span-2">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Recent Events</span>
                  </CardTitle>
                  <CardDescription>
                    Overview of your latest school events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                            <CalendarDays className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{event.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{event.date}</span>
                              <span>•</span>
                              <span>{event.participants} participants</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={event.status === 'approved' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                          <Badge variant="outline">
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications */}
            <div>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Recent Notifications</span>
                  </CardTitle>
                  <CardDescription>
                    Stay updated with the latest activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'urgent' ? 'bg-destructive' : 'bg-primary'
                          }`} />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm text-foreground">
                              {notification.title}
                            </h5>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Notifications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;