import { useMemo } from 'react';
import { Offer } from '../../types';
import { OfferCard } from './OfferCard';
import { calculateDistance } from '../../services/locationService';

interface OfferFeedProps {
  offers: Omit<Offer, 'distance'>[];
  userLocation: { lat: number; lng: number } | null;
}

export function OfferFeed({ offers, userLocation }: OfferFeedProps) {
  // Calculate distances and sort by closest
  const offersWithDistance = useMemo(() => {
    if (!userLocation) return offers.map(o => ({ ...o, distance: undefined }));

    return offers
      .map(offer => ({
        ...offer,
        distance: calculateDistance(
          userLocation,
          offer.location.coordinates
        )
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [offers, userLocation]);

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No offers available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {offersWithDistance.map(offer => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}