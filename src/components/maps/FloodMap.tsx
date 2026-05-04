"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface FloodZone {
  id: string;
  name: string;
  level: "low" | "moderate" | "high";
  center: [number, number];
  radius: number;
}

interface FloodMapProps {
  zones: FloodZone[];
  className?: string;
}

const levelConfig = {
  low: { color: "#facc15", fillColor: "#fef08a", fillOpacity: 0.3 },
  moderate: { color: "#f97316", fillColor: "#fdba74", fillOpacity: 0.35 },
  high: { color: "#ef4444", fillColor: "#fca5a5", fillOpacity: 0.4 },
};

export function FloodMap({
  zones,
  className = "h-[500px] w-full rounded-xl",
}: FloodMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      minZoom: 11,
      maxZoom: 16,
    }).setView([14.5995, 121.0352], 12);

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    zones.forEach((zone) => {
      const cfg = levelConfig[zone.level];
      L.circle(zone.center, {
        radius: zone.radius,
        color: cfg.color,
        fillColor: cfg.fillColor,
        fillOpacity: cfg.fillOpacity,
        weight: 2,
      })
        .addTo(map)
        .bindPopup(
          `<strong>${zone.name}</strong><br/>Flood risk: ${zone.level.charAt(0).toUpperCase() + zone.level.slice(1)}`
        );
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [zones]);

  return <div ref={mapRef} className={className} />;
}
