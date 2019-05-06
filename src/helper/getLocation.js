export function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(resolveLocation(position)),
      error => reject(rejectLocation(error))
    );
  });
}

function resolveLocation(position) {
  const coords = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
  return coords;
}

function rejectLocation(error) {
  return error;
}
