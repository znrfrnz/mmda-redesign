"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markerPosition?: [number, number];
  markerLabel?: string;
  className?: string;
}

export function LeafletMap({
  center,
  zoom = 13,
  markerPosition,
  markerLabel,
  className = "h-[400px] w-full rounded-xl",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (markerPosition) {
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:24px;height:24px;background:#0054A6;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(markerPosition, { icon }).addTo(map);
      if (markerLabel) {
        marker.bindPopup(markerLabel);
      }
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [center, zoom, markerPosition, markerLabel]);

  return <div ref={mapRef} className={className} />;
}
