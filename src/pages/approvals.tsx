import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

// Example EventRequest type (adjust fields as needed)
interface EventRequest {
  id: number;
  eventTitle: string;
  eventType: string;
  description: string;
  requestedBy: string;
  requestedAt: string; // ISO string
  status: "Pending" | "Approved" | "Rejected";
}

// Simulate fetching from EventRequest (replace with real API call if needed)
const fetchEventRequests = (): Promise<EventRequest[]> =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          eventTitle: "sports fest",
          eventType: "Academic",
          description: "An energetic day filled with competitive sports and team spirit.",
          requestedBy: "Juan Dela Cruz",
          requestedAt: "2024-09-15 10:30:00Z",
          status: "Pending",
        },
        {
          id: 2,
          eventTitle: "Sports Meet",
          eventType: "Sports",
          description: "Inter-school sports meet.",
          requestedBy: "Maria Santos",
          requestedAt: "2024-09-27T14:00:00Z",
          status: "Approved",
        },
        {
          id: 3,
          eventTitle: "Cultural Night",
          eventType: "Cultural",
          description: "Music and dance night.",
          requestedBy: "Pedro Reyes",
          requestedAt: "2024-09-26T09:00:00Z",
          status: "Rejected",
        },
      ]);
    }, 800)
  );

const Approvals = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [requests, setRequests] = useState<EventRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventRequests().then(data => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  // Format time (e.g., "2 hours ago")
  const timeAgo = (iso: string) => {
    const now = new Date();
    const date = new Date(iso);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return date.toLocaleString();
  };

  // Approve/Reject handlers (demo only)
  const handleApprove = (id: number) => {
    setRequests(reqs =>
      reqs.map(r => (r.id === id ? { ...r, status: "Approved" } : r))
    );
  };
  const handleReject = (id: number) => {
    setRequests(reqs =>
      reqs.map(r => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className="flex-1 flex flex-col h-screen w-full p-0 m-0">
        <header className="bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Event Approvals</h1>
        </header>
        <section className="flex-1 flex flex-col items-center justify-start bg-white p-4 overflow-auto">
          <div className="w-full max-w-5xl">
            <div className="overflow-x-auto rounded-lg shadow border bg-white mt-2">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                    <th className="px-4 py-2 text-left">Event Title</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Requested By</th>
                    <th className="px-4 py-2 text-left">Requested At</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-gray-400">
                        Loading...
                      </td>
                    </tr>
                  )}
                  {!loading && requests.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-gray-400">
                        No event requests found.
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    requests.map(req => (
                      <tr key={req.id} className="border-b last:border-b-0">
                        <td className="px-4 py-2 font-semibold">{req.eventTitle}</td>
                        <td className="px-4 py-2">{req.eventType}</td>
                        <td className="px-4 py-2">{req.description}</td>
                        <td className="px-4 py-2">{req.requestedBy}</td>
                        <td className="px-4 py-2">{timeAgo(req.requestedAt)}</td>
                        <td className="px-4 py-2">
                          <span
                            className={
                              req.status === "Approved"
                                ? "px-2 py-1 rounded bg-green-100 text-green-700"
                                : req.status === "Rejected"
                                ? "px-2 py-1 rounded bg-red-100 text-red-700"
                                : "px-2 py-1 rounded bg-yellow-100 text-yellow-700"
                            }
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 flex gap-2">
                          {req.status === "Pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-700 border-green-300"
                                onClick={() => handleApprove(req.id)}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-700 border-red-300"
                                onClick={() => handleReject(req.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" /> Reject
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Approvals;