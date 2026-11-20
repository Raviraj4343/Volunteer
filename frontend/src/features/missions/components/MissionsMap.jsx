import { useEffect, useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Link } from "react-router";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, CircleMarker, useMap } from "react-leaflet";
import { CATEGORIES } from "@/config/categories";
import { formatMissionDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { MissionCover } from "./MissionCover";
import { SpotsLabel } from "./MissionCard";

const TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const iconCache = {};
function categoryIcon(categoryId) {
  if (iconCache[categoryId]) return iconCache[categoryId];
  const cat = CATEGORIES[categoryId];
  const svg = renderToStaticMarkup(<cat.icon size={18} color="white" strokeWidth={2.2} />);
  iconCache[categoryId] = L.divIcon({
    className: "mission-pin",
    html: `<div style="background:${cat.color}" class="flex size-10 items-center justify-center rounded-full border-[3px] border-white shadow-[0_4px_14px_rgb(0_0_0/0.25)] transition-transform hover:scale-110">${svg}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });
  return iconCache[categoryId];
}

function FitToMissions({ missions, center }) {
  const map = useMap();
  useEffect(() => {
    const points = missions.map((m) => [m.location.lat, m.location.lng]);
    if (points.length === 0) map.setView([center.lat, center.lng], 12);
    else if (points.length === 1) map.setView(points[0], 14);
    else map.fitBounds(L.latLngBounds(points).pad(0.15), { maxZoom: 14 });
  }, [map, missions, center]);
  return null;
}

/**
 * Map of missions. Pass `missions` for many pins, or a single mission
 * with `interactive={false}` for a static location preview.
 */
export function MissionsMap({ missions, center, interactive = true, showUser = true, className }) {
  const centerPoint = useMemo(() => center ?? missions[0]?.location, [center, missions]);

  return (
    <div className={cn("isolate overflow-hidden", className)}>
      <MapContainer
        center={[centerPoint.lat, centerPoint.lng]}
        zoom={13}
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={interactive}
        doubleClickZoom={interactive}
        touchZoom={interactive}
        attributionControl
        className="size-full"
      >
        <TileLayer url={TILE_URL} attribution={ATTRIBUTION} />
        {interactive && <FitToMissions missions={missions} center={centerPoint} />}

        {showUser && center && (
          <CircleMarker
            center={[center.lat, center.lng]}
            radius={8}
            pathOptions={{ color: "#fff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 }}
          />
        )}

        {missions.map((mission) => (
          <Marker key={mission.id} position={[mission.location.lat, mission.location.lng]} icon={categoryIcon(mission.category)}>
            {interactive && (
              <Popup closeButton={false}>
                <Link to={`/missions/${mission.id}`} className="block !text-foreground no-underline">
                  <MissionCover category={mission.category} className="h-24 rounded-b-none" />
                  <div className="p-3">
                    <p className="text-xs font-semibold text-primary">{formatMissionDate(mission.startsAt)}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm leading-snug font-bold">{mission.title}</p>
                    <SpotsLabel mission={mission} className="mt-1 block" />
                  </div>
                </Link>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
