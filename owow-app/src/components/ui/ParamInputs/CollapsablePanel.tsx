import React, { FC, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsablePanelProps {
  title: string;
  isCollapsed?: boolean;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

const CollapsablePanel: FC<CollapsablePanelProps> = ({
  title,
  isCollapsed = false,
  children,
  className = "",
  headerClassName = "",
}) => {
  const [show, setShow] = useState(!isCollapsed);

  const onToggle = () => {
    setShow((prev) => !prev);

    const el = document.getElementById("main");
    //console.log(el.style.height);

    // if (webviewProps) {
    //   sendToWebView({
    //     id: webviewProps.id,
    //     command: webviewProps.command,
    //     payload: { value: !show },
    //   });
    // }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex items-center justify-between cursor-pointer select-none ${headerClassName}`}
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            show ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {!show ? null : <>{children}</>}
    </div>
  );
};

export default CollapsablePanel;
