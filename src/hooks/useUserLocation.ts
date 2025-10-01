import { useState, useEffect } from 'react';
import { Coordinates } from '../types';
import { getUserLocation } from '../services/locationService';

export function useUserLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserLocation()
      .then((coords) => {
        setLocation(coords);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        // Fallback to Madrid if location denied
        setLocation({ lat: 40.4168, lng: -3.7038 });
      });
  }, []);

  return { location, loading, error };
}