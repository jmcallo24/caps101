import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Image as ImageIcon, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";




interface Venue {
  id: number;
  name: string;
  location: string;
  image?: string; // image URL or base64
  capacity: number;
  status: "Available" | "Booked";
}

const initialVenues: Venue[] = [
  {
    id: 1,
    name: "Main Auditorium",
    location: "Building A, 2nd Floor",
    capacity: 300,
    status: "Available",
    image: "",
  },
  {
    id: 2,
    name: "Sports Complex",
    location: "North Wing",
    capacity: 500,
    status: "Booked",
    image: "",
  },
];

const VenueAndRegistration = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", location: "", capacity: "", image: "" });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Handle image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setForm(f => ({ ...f, image: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add venue
  const handleAddVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.capacity) return;
    setVenues([
      ...venues,
      {
        id: venues.length > 0 ? venues[venues.length - 1].id + 1 : 1,
        name: form.name,
        location: form.location,
        capacity: Number(form.capacity),
        status: "Available",
        image: form.image,
      },
    ]);
    setForm({ name: "", location: "", capacity: "", image: "" });
    setShowForm(false);
  };

  // Delete venue
  const handleDelete = (id: number) => {
    setVenues(prev => prev.filter(v => v.id !== id));
  };

  const filtered = venues.filter(
    v =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className="flex-1 flex flex-col h-screen w-full p-0 m-0">
        <header className="bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Venue & Registration</h1>
            <Button
            variant="gradient"
            className="bg-gradient-to-r from-blue-500 to-violet-500 text-white flex items-center gap-2"
            onClick={() => navigate("/event-request")}
            >
            Event Request
            </Button>
        </header>
        <section className="flex-1 flex flex-col items-center justify-start bg-white p-4 overflow-auto">
          <div className="w-full max-w-5xl">
            <div className="flex items-center justify-between mb-4">
              <Input
                placeholder="Search by venue or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-80"
              />
              <Button
                variant="gradient"
                className="flex items-center gap-2"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-5 h-5" /> Add Venue
              </Button>
            </div>
            {/* Add Venue Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowForm(false)}
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold mb-4">Add Venue</h2>
                  <form onSubmit={handleAddVenue} className="space-y-3">
                    <div>
                      <Label htmlFor="venue-name">Venue Name</Label>
                      <Input
                        id="venue-name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="venue-location">Location</Label>
                      <Input
                        id="venue-location"
                        value={form.location}
                        onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="venue-capacity">Capacity</Label>
                      <Input
                        id="venue-capacity"
                        type="number"
                        value={form.capacity}
                        onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="venue-image">Image</Label>
                      <Input
                        id="venue-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {form.image && (
                        <img src={form.image} alt="Venue" className="mt-2 h-24 rounded object-cover" />
                      )}
                    </div>
                    <Button type="submit" variant="gradient" className="w-full mt-2">
                      Add Venue
                    </Button>
                  </form>
                </div>
              </div>
            )}
            {/* Venue Table */}
            <div className="overflow-x-auto rounded-lg shadow border bg-white mt-2">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Venue Name</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Capacity</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-400">
                        No venues found.
                      </td>
                    </tr>
                  )}
                  {filtered.map(venue => (
                    <tr key={venue.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2">
                        {venue.image ? (
                          <img src={venue.image} alt={venue.name} className="h-12 w-20 object-cover rounded" />
                        ) : (
                          <div className="flex items-center justify-center h-12 w-20 bg-gray-100 rounded">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 font-semibold">{venue.name}</td>
                      <td className="px-4 py-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        {venue.location}
                      </td>
                      <td className="px-4 py-2">{venue.capacity}</td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            venue.status === "Available"
                              ? "px-2 py-1 rounded bg-green-100 text-green-700"
                              : "px-2 py-1 rounded bg-red-100 text-red-700"
                          }
                        >
                          {venue.status}
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
                          onClick={() => handleDelete(venue.id)}
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

export default VenueAndRegistration;