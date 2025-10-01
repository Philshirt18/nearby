import { Coordinates, Location } from '../types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  point1: Coordinates,
  point2: Coordinates
): number {
  const R = 6371; // Earth's radius in km
  
  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) *
    Math.cos(toRadians(point2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Get approximate location for privacy (rounds to ~300m radius)
 */
export function getApproximateLocation(
  coords: Coordinates,
  privacyLevel: Location['privacyLevel']
): Coordinates {
  if (privacyLevel === 'exact') {
    return coords;
  }
  
  if (privacyLevel === 'hidden') {
    return { lat: 0, lng: 0 }; // Don't show location
  }
  
  // Approximate: Round to 2 decimals (~1.1km precision)
  return {
    lat: Math.round(coords.lat * 100) / 100,
    lng: Math.round(coords.lng * 100) / 100,
  };
}

/**
 * Get compass direction from point1 to point2
 */
export function getDirection(
  point1: Coordinates,
  point2: Coordinates
): string {
  const dLat = point2.lat - point1.lat;
  const dLng = point2.lng - point1.lng;
  
  const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
  
  if (angle >= -22.5 && angle < 22.5) return 'N';
  if (angle >= 22.5 && angle < 67.5) return 'NE';
  if (angle >= 67.5 && angle < 112.5) return 'E';
  if (angle >= 112.5 && angle < 157.5) return 'SE';
  if (angle >= 157.5 || angle < -157.5) return 'S';
  if (angle >= -157.5 && angle < -112.5) return 'SW';
  if (angle >= -112.5 && angle < -67.5) return 'W';
  return 'NW';
}

/**
 * Get user's current location from browser
 */
export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false, // Save battery
        timeout: 5000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
}