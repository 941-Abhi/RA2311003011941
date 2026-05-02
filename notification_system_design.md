# Stage 1 - Notification System Design

## 📌 Problem Statement

Users of the campus notification platform are receiving a high volume of notifications, making it difficult to track important updates. The goal is to design a system that prioritizes and displays the **top 10 most important unread notifications** based on **priority and recency**.

---

## ⚙️ Approach

### 1. Fetch Notifications

* Notifications are fetched from the provided API:

  ```
  GET /evaluation-service/notifications
  ```
* Authentication is handled using a Bearer Token.
* Logging Middleware is used to log API requests and responses.

---

### 2. Priority Assignment

Each notification type is assigned a weight:

| Notification Type | Priority Weight |
| ----------------- | --------------- |
| Placement         | 3 (Highest)     |
| Result            | 2               |
| Event             | 1 (Lowest)      |

---

### 3. Sorting Logic

Notifications are sorted using two criteria:

1. **Priority (Descending)**
   Higher weight notifications appear first.

2. **Timestamp (Descending)**
   Among same priority, newer notifications appear first.

---

### 4. Extract Top 10 Notifications

After sorting:

* Select the top 10 notifications using:

  ```js
  notifications.slice(0, 10)
  ```

---

## 🚀 Efficient Handling of Incoming Notifications

Since new notifications arrive continuously, recomputing the entire list is inefficient.

### Optimized Approach: Min Heap (Priority Queue)

* Maintain a **Min Heap of size 10**
* Each element is compared based on:

  * Priority weight
  * Timestamp

### Algorithm:

1. Insert first 10 notifications into heap
2. For each new notification:

   * Compare with root (lowest priority)
   * If higher priority:

     * Remove root
     * Insert new notification
3. Heap always contains top 10 notifications

### Time Complexity:

* Insert: `O(log n)`
* Maintain Top 10: `O(log 10)` ≈ `O(1)`

---

## 🧱 System Design Overview

### Components:

* **Frontend (Next.js)**

  * Fetches notifications
  * Displays all notifications
  * Displays priority notifications

* **Logging Middleware**

  * Reusable module
  * Sends logs to logging API
  * Tracks:

    * API calls
    * Component lifecycle
    * Errors

* **External API**

  * Provides notification data

---

## 📊 Logging Strategy

Logging is implemented using a reusable function:

```
Log(stack, level, package, message)
```

### Logging Coverage:

| Area      | Example Log            |
| --------- | ---------------------- |
| API Calls | Fetching notifications |
| Component | Component mounted      |
| Errors    | Failed API request     |

### Example:

```js
Log("frontend", "info", "api", "Fetching notifications");
Log("frontend", "info", "component", "Home page mounted");
Log("frontend", "error", "api", "Failed to fetch notifications");
```

---

## ⚠️ Error Handling

* API failures are caught using try-catch
* Errors are logged using logging middleware
* Graceful fallback:

  * Empty state UI
  * Error message display

---

## 🎯 Key Features Implemented

* ✅ Fetch notifications from API
* ✅ Assign priority based on type
* ✅ Sort by priority + recency
* ✅ Display top 10 notifications
* ✅ Logging middleware integration
* ✅ Error handling

---

## 📈 Future Improvements

* Add user-configurable "Top N" selection
* Mark notifications as read/unread
* Real-time updates using WebSockets
* Backend support with database storage
* Pagination and filtering support

---

## ✅ Conclusion

The system efficiently prioritizes notifications using a combination of **weight-based ranking** and **recency sorting**. The use of a **Min Heap** ensures scalability for real-time updates, while the **Logging Middleware** provides strong observability and debugging capabilities.
