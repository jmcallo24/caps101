import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Bell, 
  Users, 
  MapPin, 
  Workflow, 
  Image, 
  CheckSquare, 
  MessageCircle, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/image.png";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Calendar of Activities", url: "/calendar", icon: Calendar },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Participants", url: "/participants", icon: Users },
  { title: "Venue & Registration", url: "/venue", icon: MapPin },
  { title: "Program Flow", url: "/program", icon: Workflow },
  { title: "Multimedia", url: "/multimedia", icon: Image },
  { title: "Approvals", url: "/approvals", icon: CheckSquare },
  { title: "Feedback", url: "/feedback", icon: MessageCircle },
  { title: "Reports & Analytics", url: "/reports", icon: BarChart3 },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}


// ...existing imports...


const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showConfirm, setShowConfirm] = useState(false);

  const isActive = (path: string) => currentPath === path;

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className={cn(
      "h-screen bg-white border-r border-border transition-all duration-300 flex flex-col text-foreground",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded-xl shadow" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Event Manager</h2>
                <p className="text-xs text-muted-foreground">School Events</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2 hover:bg-muted"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive(item.url)
                  ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-sm"
                  : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-violet-500",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className={cn("w-5 h-5", !collapsed && "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div>
            <Button
              variant="outline"
              className="w-full mb-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 hover:from-blue-600 hover:to-violet-600"
              onClick={() => setShowConfirm(true)}
            >
              Log out
            </Button>
            {showConfirm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
                  <p className="mb-4 text-foreground font-semibold">Are you sure you want to log out?</p>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-24"
                    >
                      Yes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirm(false)}
                      className="w-24"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="text-xs text-gray-400">
              <p>Version 1.0.0</p>
              <p>© 2025 Event Manager</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;