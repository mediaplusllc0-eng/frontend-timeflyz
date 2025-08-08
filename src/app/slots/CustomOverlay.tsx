// components/CustomOverlay.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CustomOverlay({
  map,
  position,
  children,
}: {
  map: google.maps.Map;
  position: google.maps.LatLng;
  children: React.ReactNode;
}) {
  const overlayRef = useRef<google.maps.OverlayView | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = new google.maps.OverlayView();
    overlayRef.current = overlay;

    overlay.onAdd = () => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      setContainer(div);

      const panes = overlay.getPanes();
      panes?.overlayMouseTarget.appendChild(div);
    };

    overlay.draw = () => {
      if (!container || !overlay.getProjection()) return;

      const point = overlay.getProjection().fromLatLngToDivPixel(position);
      if (point) {
        container.style.left = `${point.x}px`;
        container.style.top = `${point.y}px`;
        container.style.transform = "translate(-50%, -100%)";
      }
    };

    overlay.onRemove = () => {
      if (container?.parentNode) {
        container.parentNode.removeChild(container);
      }
      setContainer(null);
    };

    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map]);

  // Redraw on position change
  useEffect(() => {
    overlayRef.current?.draw();
  }, [position, container]);

  if (!container) return null;
  return createPortal(children, container);
}
