import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface PortalDropdownProps {
  open: boolean;
  anchorRect: DOMRect | null;
  onClose: () => void;
  children: React.ReactNode;
}

const PortalDropdown: React.FC<PortalDropdownProps> = ({
  open,
  anchorRect,
  onClose,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open || !anchorRect) return null;

  const style: React.CSSProperties = {
    position: "fixed",
    top: anchorRect.bottom + 4, // 4px below the button
    left: anchorRect.left,
    zIndex: 9999,
    minWidth: anchorRect.width,
  };

  return ReactDOM.createPortal(
    <div ref={dropdownRef} style={style}>
      {children}
    </div>,
    document.body
  );
};

export default PortalDropdown;