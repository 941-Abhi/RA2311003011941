import { useEffect, useState } from "react";
import { Log } from "../logging-middleware/logger";
import { fetchNotifications } from "../services/api";
import { getPriorityNotifications } from "../utils/priority";

export default function Home() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [priorityNotifications, setPriorityNotifications] = useState<any[]>([]);

  useEffect(() => {
    Log("frontend", "info", "page", "Home page loaded");

    const loadData = async () => {
      try {
        const data = await fetchNotifications();

        if (data) {
          const notificationsData =
            data.notifications || data.data || data;

          setNotifications(notificationsData);

          const top10 = getPriorityNotifications(notificationsData, 10);
          setPriorityNotifications(top10);

          Log("frontend", "info", "state", "Notifications stored");
        } else {
          Log("frontend", "warn", "state", "No notifications received");
        }
      } catch (error) {
        Log("frontend", "error", "page", "Error loading data");
      }
    };

    loadData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        notifications.map((n, index) => (
          <div key={index}>
            <p><b>{n.Type}</b></p>
            <p>{n.Message}</p>
            <p>{n.Timestamp}</p>
            <hr />
          </div>
        ))
      )}

      <h2>🔥 Priority Notifications (Top 10)</h2>

      {priorityNotifications.map((n, index) => (
        <div key={index} style={{ background: "#f5f5f5", padding: "10px", marginBottom: "10px" }}>
          <p><b>{n.Type}</b> (Priority: {n.weight})</p>
          <p>{n.Message}</p>
          <p>{n.Timestamp}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}