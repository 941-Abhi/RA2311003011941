export function getPriorityNotifications(notifications: any[], limit = 10) {
  const weightMap: any = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  return notifications
    .map((n) => ({
      ...n,
      weight: weightMap[n.Type] || 0,
      time: new Date(n.Timestamp).getTime(),
    }))
    .sort((a, b) => {
      if (b.weight !== a.weight) {
        return b.weight - a.weight;
      }
      return b.time - a.time;
    })
    .slice(0, limit);
}