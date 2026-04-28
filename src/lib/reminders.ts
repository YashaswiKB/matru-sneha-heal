export interface Reminder {
  id: string;
  title: string;
  date: string; // ISO
  fired?: boolean;
}

const REM_KEY = "matrusneh:reminders";

function loadAll(): Reminder[] {
  try {
    const raw = localStorage.getItem(REM_KEY);
    return raw ? (JSON.parse(raw) as Reminder[]) : [];
  } catch {
    return [];
  }
}
function saveAll(r: Reminder[]) {
  localStorage.setItem(REM_KEY, JSON.stringify(r));
}

export const reminders = {
  list: loadAll,
  upsert(r: Reminder) {
    const all = loadAll().filter((x) => x.id !== r.id);
    all.push(r);
    saveAll(all);
  },
  remove(id: string) {
    saveAll(loadAll().filter((x) => x.id !== id));
  },
};

export async function ensureNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const res = await Notification.requestPermission();
  return res === "granted";
}

/**
 * Reminder loop: every 60s, check pending reminders. Persists in localStorage,
 * so after device restart, when the PWA is reopened, due reminders fire.
 */
let started = false;
export function startReminderLoop() {
  if (started) return;
  started = true;
  const tick = () => {
    const now = Date.now();
    const all = loadAll();
    let changed = false;
    for (const r of all) {
      const due = new Date(r.date).getTime();
      if (!r.fired && due <= now) {
        notify(r.title, "Reminder for your check-up today.");
        r.fired = true;
        changed = true;
      }
    }
    if (changed) saveAll(all);
  };
  tick();
  setInterval(tick, 60_000);
}

function notify(title: string, body: string) {
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body, icon: "/icon-192.png", badge: "/icon-192.png" });
      return;
    }
  } catch {}
  // Fallback: in-app toast event
  window.dispatchEvent(new CustomEvent("matrusneh:reminder", { detail: { title, body } }));
}
