"use client";

import { useEffect } from "react";
import {
     MapContainer,
     TileLayer,
     Marker,
     Popup,
     useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
     iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
     iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
     shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
     iconSize: [25, 41],
     iconAnchor: [12, 41],
     popupAnchor: [1, -34],
     shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const AREA_COORDS = {
     Bole: [8.995, 38.7896],
     Kazanchis: [9.018, 38.763],
     Megenagna: [9.02, 38.802],
     Piassa: [9.033, 38.75],
     CMC: [9.01, 38.83],
};

function FitBounds({ points }) {
     const map = useMap();
     useEffect(() => {
          if (points.length === 0) return;
          const bounds = L.latLngBounds(points);
          map.fitBounds(bounds, { padding: [40, 40] });
     }, [map, points]);
     return null;
}

/**
 * @param {{ area?: string, customerName?: string, status?: string }} props
 */
export default function DeliveryMap({ area = "Bole", customerName = "Customer", status = "pending" }) {
     const delivery = AREA_COORDS[area] ?? AREA_COORDS.Bole;

     const courier = [delivery[0] + 0.008, delivery[1] - 0.006];

     const points = [delivery, courier];

     return (
          <MapContainer
               center={delivery}
               zoom={14}
               style={{ height: "320px", width: "100%" }}
               scrollWheelZoom={false}
          >
               <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
               />
               <Marker position={delivery}>
                    <Popup>
                         {customerName} · {area} · {status}
                    </Popup>
               </Marker>
               <Marker position={courier}>
                    <Popup>Courier</Popup>
               </Marker>
               <FitBounds points={points} />
          </MapContainer>
     );
}