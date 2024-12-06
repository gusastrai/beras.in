import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import mapData from "../data/indonesia.json";

const Map = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="text-center relativ bg-gray-800 rounded-2xl">
      <div className="relative">
        {tooltipContent && (
          <div
            style={{
              position: "absolute",
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              backgroundColor: "white",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            {tooltipContent}
          </div>
        )}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1600,
            center: [118, -3],
          }}
          style={{
            width: "100%",
            height: "600px",
          }}
        >
          <Geographies geography={mapData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(event) => {
                    const { province } = geo.properties; 
                    setTooltipContent(province || "Unknown");
                  }}
                  onMouseMove={(event) => {
                    setTooltipPosition({
                      x: event.pageX - 100,
                      y: event.pageY - 200,
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: { fill: "rgb(103 232 249)"},
                    hover: { fill: "rgb(255 255 255)", outline: "none" },
                    pressed: { fill: "rgb(255 245 245)", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

export default Map;
