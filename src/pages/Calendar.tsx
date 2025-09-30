import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/Sidebar";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  type: string;
  description: string;
  color: string;
}

const EVENT_TYPES = [
  { label: "Academic", color: "from-blue-400 to-blue-600" },
  { label: "Sports", color: "from-green-400 to-green-600" },
  { label: "Cultural", color: "from-pink-400 to-pink-600" },
  { label: "Other", color: "from-violet-400 to-violet-600" },
];

const initialActivities: Activity[] = [
  { id: 1, title: "Science Fair", date: "2024-10-10", type: "Academic", description: "Annual science fair.", color: "from-blue-400 to-blue-600" },
  { id: 2, title: "Sports Meet", date: "2024-10-15", type: "Sports", description: "Inter-school sports meet.", color: "from-green-400 to-green-600" },
  { id: 3, title: "Cultural Night", date: "2024-10-20", type: "Cultural", description: "Music and dance night.", color: "from-pink-400 to-pink-600" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const Calendar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [eventForm, setEventForm] = useState<Omit<Activity, "id">>({
    title: "",
    date: selectedDate,
    type: EVENT_TYPES[0].label,
    description: "",
    color: EVENT_TYPES[0].color,
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Calendar month/year state
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Open modal for adding
  const handleAddEvent = (date: string) => {
    setEditMode(false);
    setEventForm({
      title: "",
      date,
      type: EVENT_TYPES[0].label,
      description: "",
      color: EVENT_TYPES[0].color,
    });
    setModalOpen(true);
  };

  // Open modal for editing
  const handleEditEvent = (activity: Activity) => {
    setEditMode(true);
    setEditId(activity.id);
    setEventForm({
      title: activity.title,
      date: activity.date,
      type: activity.type,
      description: activity.description,
      color: activity.color,
    });
    setModalOpen(true);
  };

  // Add or update event
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date || !eventForm.type) {
      toast({
        title: "All fields required",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    if (editMode && editId !== null) {
      setActivities(acts =>
        acts.map(act =>
          act.id === editId
            ? { ...act, ...eventForm }
            : act
        )
      );
      toast({ title: "Event Updated", description: "The event was updated." });
    } else {
      setActivities(acts => [
        ...acts,
        {
          ...eventForm,
          id: acts.length > 0 ? acts[acts.length - 1].id + 1 : 1,
        },
      ]);
      toast({ title: "Event Added", description: "The event was added." });
    }
    setModalOpen(false);
  };

  // Delete event
  const handleDeleteEvent = (id: number) => {
    setActivities(acts => acts.filter(act => act.id !== id));
    toast({ title: "Event Deleted", description: "The event was deleted.", variant: "destructive" });
    setModalOpen(false);
  };

  // Filter activities for selected date
  const activitiesForDate = (date: string) => {
    return activities.filter(act => act.date === date);
  };

  // Color for event type
  const getTypeColor = (type: string) => EVENT_TYPES.find(t => t.label === type)?.color || "from-blue-400 to-blue-600";

  // Generate calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  const weeks: Array<Array<{ day: number | null; date: string }>> = [];
  let day = 1 - firstDayOfWeek;
  for (let w = 0; w < 6; w++) {
    const week: Array<{ day: number | null; date: string }> = [];
    for (let d = 0; d < 7; d++) {
      if (day > 0 && day <= daysInMonth) {
        const dateStr = new Date(year, month, day).toISOString().slice(0, 10);
        week.push({ day, date: dateStr });
      } else {
        week.push({ day: null, date: "" });
      }
      day++;
    }
    weeks.push(week);
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className="flex-1 flex flex-col h-screen p-0 m-0">
        <header className="bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Calendar</h1>
            <div className="flex gap-2">
              <Button
                variant="gradient"
                className="bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                onClick={() => handleAddEvent(selectedDate)}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Event
              </Button>
            </div>
          </div>
        </header>
        <section className="flex-1 flex flex-col items-center justify-start bg-white p-4">
          {/* Month/Year Controls */}
          <div className="flex items-center justify-between w-full max-w-3xl mb-2">
            <Button variant="ghost" onClick={() => {
              if (month === 0) {
                setMonth(11);
                setYear(year - 1);
              } else {
                setMonth(month - 1);
              }
            }}>
              &lt;
            </Button>
            <div className="font-bold text-xl text-blue-700">
              {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
            </div>
            <Button variant="ghost" onClick={() => {
              if (month === 11) {
                setMonth(0);
                setYear(year + 1);
              } else {
                setMonth(month + 1);
              }
            }}>
              &gt;
            </Button>
          </div>
          {/* Calendar Grid */}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow border">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <th key={d} className="py-2">{d}</th>
                  ))}
                </tr>
              </thead>
             <tbody>
            {weeks.map((week, wi) => (
                <tr key={wi}>
                {week.map((cell, ci) => (
                    <td
                    key={ci}
                    className="align-top h-24 w-1/7 border border-gray-100 relative cursor-pointer group"
                    onClick={() => cell.day && setSelectedDate(cell.date)}
                    style={{
                        background: cell.date === selectedDate ? "white" : "transparent"
                    }}
                    >
                    {cell.day && (
                        <div className="font-bold text-sm text-black">
                        {cell.day}
                        </div>
                    )}
                    {/* ...existing event rendering... */}
                        {/* Events */}
                        <div className="flex flex-col gap-1 mt-1">
                          {cell.day &&
                            activities
                              .filter(act => act.date === cell.date)
                              .map(act => (
                                <div
                                  key={act.id}
                                  className={`rounded px-1 py-0.5 text-xs text-white cursor-pointer bg-gradient-to-r ${getTypeColor(act.type)} mb-0.5`}
                                  title={act.title}
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleEditEvent(act);
                                  }}
                                >
                                  {act.title}
                                </div>
                              ))}
                        </div>
                        {/* Add event button on hover */}
                        {cell.day && cell.date === selectedDate && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute bottom-1 right-1 text-blue-500 opacity-0 group-hover:opacity-100"
                            onClick={e => {
                              e.stopPropagation();
                              handleAddEvent(cell.date);
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Events for selected date */}
          <div className="w-full max-w-3xl mt-4">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              Events on {selectedDate}
            </h2>
            {activitiesForDate(selectedDate).length === 0 && (
              <div className="text-gray-400">No events for this day.</div>
            )}
            {activitiesForDate(selectedDate).map(act => (
              <div
                key={act.id}
                className={`rounded-lg p-3 mb-2 bg-gradient-to-r ${getTypeColor(act.type)} text-white shadow flex flex-col gap-1`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">{act.title}</div>
                    <div className="text-xs">{act.type}</div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white"
                      onClick={() => handleEditEvent(act)}
                      aria-label="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white"
                      onClick={() => handleDeleteEvent(act.id)}
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs">{act.description}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal for Add/Edit Event */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Event" : "Add Event"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="event-title">Title</Label>
                <Input
                  id="event-title"
                  value={eventForm.title}
                  onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventForm.date}
                  onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="event-type">Type</Label>
                <select
                  id="event-type"
                  value={eventForm.type}
                  onChange={e => {
                    const type = e.target.value;
                    const color = EVENT_TYPES.find(t => t.label === type)?.color || EVENT_TYPES[0].color;
                    setEventForm(f => ({ ...f, type, color }));
                  }}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  {EVENT_TYPES.map(t => (
                    <option key={t.label} value={t.label}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="event-description">Description</Label>
                <Input
                  id="event-description"
                  value={eventForm.description}
                  onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Button type="submit" variant="gradient" className="flex-1">
                  {editMode ? "Update" : "Add"}
                </Button>
                {editMode && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => editId && handleDeleteEvent(editId)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;