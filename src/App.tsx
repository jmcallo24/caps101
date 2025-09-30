import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EventRequest from "./pages/EventRequest";
import NotFound from "./pages/NotFound";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Participants from "./pages/Participants";
import VenueAndRegistration from "./pages/Venue-And-Registration";
import Approvals from "./pages/approvals";
import multimedia from "./pages/multimedia";
import Multimedia from "./pages/multimedia";
 

// 1. Change the wrapper to use a white background
const WhiteWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen min-w-full bg-white">
    {children}
  </div>
);

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("user");
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WhiteWrapper><Index /></WhiteWrapper>} />
          <Route path="/login" element={<WhiteWrapper><Login /></WhiteWrapper>} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                  <Dashboard />
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/event-request"
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                  <EventRequest />
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
        
          <Route path="/calendar" element={
            <ProtectedRoute>
              <WhiteWrapper>
                <Calendar />
              </WhiteWrapper>
            </ProtectedRoute>
          } />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                <Notifications/>.
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/participants" 
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                <Participants/>
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/venue"
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                 <VenueAndRegistration/> 
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/program" 
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Program Flow</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/multimedia" 
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                  <Multimedia/> 
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/approvals" 
            element={
               <ProtectedRoute>
                <WhiteWrapper>
                 <Approvals/> 
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/feedback" 
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Feedback</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute>
                <WhiteWrapper>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </WhiteWrapper>
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<WhiteWrapper><NotFound /></WhiteWrapper>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;