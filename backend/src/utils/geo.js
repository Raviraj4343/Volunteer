/**
 * utils/geo.js — small helpers for GeoJSON + distances.
 *
 * Connects to: services/mission.service.js (nearby search),
 * models/Mission.js (location.point is a GeoJSON Point).
 *
 * ⚠️ GeoJSON order is [longitude, latitude] — the OPPOSITE of how humans
 * (and the frontend: { lat, lng }) usually write it. #1 beginner bug!
 */

export function toPoint({ lat, lng }) {
  // TODO: return { type: "Point", coordinates: [lng, lat] }
}

export function fromPoint(point) {
  // TODO: return { lat: point.coordinates[1], lng: point.coordinates[0] }
}

export function kmToMeters(km) {
  // TODO: $near / $geoNear use METERS → km * 1000
}

export function metersToKm(meters) {
  // TODO: round to 1 decimal so the frontend shows "2.4 km away"
}

export function parseOrigin(query) {
  // TODO: if query.lat and query.lng are valid numbers, return { lat, lng }; else return null
  // HINT: Number.isFinite(Number(x)). lat must be -90..90, lng -180..180.
}
