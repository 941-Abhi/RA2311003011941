import { LogPayload } from "./types";
import { LOG_API_URL, getAuthToken } from "./config";

export async function Log(
  stack: LogPayload["stack"],
  level: LogPayload["level"],
  pkg: LogPayload["package"],
  message: string
): Promise<void> {
  try {
    const payload: LogPayload = {
      stack,
      level,
      package: pkg,
      message,
    };

    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Logging failed: ${response.status}`);
    }

    const data = await response.json();
    // DO NOT console.log in final submission
  } catch (error) {
    // Silent fail (important)
  }
}