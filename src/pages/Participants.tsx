import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Trash2, Edit2 } from "lucide-react";


interface Participant {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Registered" | "Checked In" | "Cancelled";
}

const initialParticipants: Participant[] = [
  { id: 1, name: "Juan Dela Cruz", email: "juan@email.com", role: "Student", status: "Registered" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", role: "Teacher", status: "Checked In" },
  { id: 3, name: "Pedro Reyes", email: "pedro@email.com", role: "Parent", status: "Registered" },
];

const Participants = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [search, setSearch] = useState("");

  // Add, Edit, Delete logic (for demo, only delete is implemented)
  const handleDelete = (id: number) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  const filtered = participants.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className="flex-1 flex flex-col h-screen w-full p-0 m-0">
        <header className="bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Participants</h1>
            <Button variant="gradient" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5" /> Add Participant
            </Button>
          </div>
        </header>
        <section className="flex-1 flex flex-col items-center justify-start bg-white p-4 overflow-auto">
          <div className="w-full max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <Input
                placeholder="Search by name, email, or role..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-80"
              />
              <span className="text-gray-500 text-sm">{filtered.length} participant(s)</span>
            </div>
            <div className="overflow-x-auto rounded-lg shadow border bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-400">
                        No participants found.
                      </td>
                    </tr>
                  )}
                  {filtered.map(participant => (
                    <tr key={participant.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2">{participant.name}</td>
                      <td className="px-4 py-2">{participant.email}</td>
                      <td className="px-4 py-2">{participant.role}</td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            participant.status === "Checked In"
                              ? "px-2 py-1 rounded bg-green-100 text-green-700"
                              : participant.status === "Cancelled"
                              ? "px-2 py-1 rounded bg-red-100 text-red-700"
                              : "px-2 py-1 rounded bg-blue-100 text-blue-700"
                          }
                        >
                          {participant.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <Button size="icon" variant="outline" aria-label="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-destructive"
                          aria-label="Delete"
                          onClick={() => handleDelete(participant.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default Participants;