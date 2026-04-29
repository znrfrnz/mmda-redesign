"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface TrafficRoute {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
}

interface TrafficMapProps {
  selectedRoute?: TrafficRoute | null;
  className?: string;
}

const TOMTOM_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

export function TrafficMap({
  selectedRoute,
  className = "h-[500px] w-full rounded-xl",
}: TrafficMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      minZoom: 11,
      maxZoom: 18,
    }).setView([14.5995, 121.0352], 12);

    mapInstanceRef.current = map;

    // Base map layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // TomTom real-time traffic flow tile layer
    if (TOMTOM_KEY) {
      L.tileLayer(
        `https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${TOMTOM_KEY}&tileSize=256`,
        {
          attribution: '&copy; <a href="https://tomtom.com">TomTom</a> Traffic Flow',
          opacity: 0.75,
          zIndex: 10,
        }
      ).addTo(map);
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Fly to selected route
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedRoute) {
      map.flyTo(selectedRoute.center, selectedRoute.zoom, { duration: 0.8 });
    } else {
      map.flyTo([14.5995, 121.0352], 12, { duration: 0.8 });
    }
  }, [selectedRoute]);

  return (
    <div className="relative">
      <div ref={mapRef} className={className} />
      {!TOMTOM_KEY && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80 rounded-xl">
          <p className="text-sm text-muted-foreground text-center px-4">
            Traffic flow unavailable — TomTom API key not configured.
          </p>
        </div>
      )}
    </div>
  );
}
