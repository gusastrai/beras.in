import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import mapData from "../data/indonesia.json";
import LoadingModal from "../components/LoadingModal";

const Map = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [clusteredMapData, setClusteredMapData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClusteringData = async () => {
    try {
      const response = await fetch(
        "https://gusssatria.us-east-1.aws.modelbit.com/v1/get_clustering_data/latest",
        {
          method: "POST",
          body: JSON.stringify({ data: [[null]] }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const clusteringData = await response.json();
      localStorage.setItem("clusteringData", JSON.stringify(clusteringData));
      processClusteringData(clusteringData);
    } catch (error) {
      console.error("Error fetching clustering data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processClusteringData = (clusteringData) => {
    const clusterResults = clusteringData.data[0][1];

    const updatedMapData = mapData.features.map((feature) => {
      const provinceData = clusterResults.find(
        (item) =>
          item.Provinsi.toLowerCase() ===
          feature.properties.province.toLowerCase()
      );

      const cluster = provinceData ? provinceData.Cluster : null;
      const produksi = provinceData ? provinceData.Produksi : null;

      return {
        ...feature,
        properties: {
          ...feature.properties,
          cluster,
          produksi,
        },
      };
    });

    setClusteredMapData(updatedMapData);
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("clusteringData");
    if (cachedData) {
      processClusteringData(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      fetchClusteringData();
    }
  }, []);

  const getClusterColor = (cluster) => {
    switch (cluster) {
      case 0:
        return "rgb(249 168 212)"; // pink
      case 1:
        return "rgb(165 180 252)"; // ungu
      case 2:
        return "rgb(103 232 249)"; // cyan
      default:
        return "rgb(255, 255, 255)"; // white
    }
  };

  return (
    <div className="text-center relative bg-gray-800 rounded-2xl">
      
      {isLoading && <LoadingModal />}

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
          <ZoomableGroup>
            <Geographies geography={clusteredMapData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const { cluster, produksi, province } = geo.properties;
                  const fillColor = getClusterColor(cluster);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(
                          `${province || "Unknown"} (${
                            produksi
                              ? produksi
                                  .toFixed(0)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ton)"
                              : "No data"
                          }`
                        );
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
                        default: {
                          fill: fillColor,
                        },
                        hover: { fill: "rgb(255, 255, 255)", outline: "none" },
                        pressed: { fill: "rgb(255, 245, 245)", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className="absolute top-0 left-0 right-0 p-4 text-white">
        <div className="flex justify-center gap-4">
          <div className="flex items-center">
            <div className="sm:w-4 sm:h-4 w-2 h-2 rounded-full bg-cyan-300 mr-2"></div>
            <span className="text-xs sm:text-base">Rendah</span>
          </div>
          <div className="flex items-center">
            <div className="sm:w-4 sm:h-4 w-2 h-2 rounded-full bg-purple-300 mr-2"></div>
            <span className="text-xs sm:text-base">Sedang</span>
          </div>
          <div className="flex items-center">
            <div className="sm:w-4 sm:h-4 w-2 h-2 rounded-full bg-pink-300 mr-2"></div>
            <span className="text-xs sm:text-base">Tinggi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
