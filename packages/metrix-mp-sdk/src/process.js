export function processAppLaunchData(data = {}) {
  return Object.assign(
    {
      endTime: data.startTime + data.duration,
      timestamp: Date.now(),
    },
    data
  );
}

export function processRouteData(data) {
  return Object.assign(
    {
      endTime: data.startTime + data.duration,
      timestamp: Date.now(),
    },
    data
  );
}
