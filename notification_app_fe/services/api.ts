import { Log } from "../logging-middleware/logger";

const BASE_URL = "/api/notifications";

export async function fetchNotifications() {
  try {
    Log("frontend", "info", "api", "Fetching notifications");

    const response = await fetch(BASE_URL);

    if (!response.ok) {
      Log("frontend", "error", "api", "Failed to fetch notifications");
      throw new Error("API failed");
    }

    const data = await response.json();

    Log("frontend", "info", "api", "Notifications fetched");

    return data;
  } catch (error) {
    Log("frontend", "fatal", "api", "Unexpected error");
    return null;
  }
}