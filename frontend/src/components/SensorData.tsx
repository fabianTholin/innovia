import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import styles from "./css/SensorData.module.css";

export default function SensorData() {
  const [sensorData, setSensorData] = useState({
    deviceId: "dev-101",
    apiKey: "dev-101-key",
    timestamp: "2026-10-19T14:46:00.6562917+02:00",
    metrics: [
      {
        type: "temperature",
        value: 22.031826729097553,
        unit: "C",
      },
      {
        type: "co2",
        value: 1239,
        unit: "ppm",
      },
    ],
  });

  useEffect(()=> {
      async function GetSensorData() {
          
          const connection = new signalR.HubConnectionBuilder()
          .withUrl("http://localhost:5103/hub/telemetry")
          .build();
          await connection.start();
          await connection.invoke("JoinTenant", "innovia");
          connection.on("measurementReceived", (data) => setSensorData(data));
        }
        
        GetSensorData();
    },[]);  


  return (
    <li className={styles.list}>
      {sensorData.timestamp}: {sensorData.metrics[1].type}:{" "}
      {sensorData.metrics[1].value} {sensorData.metrics[1].unit}
    </li>
  );
}
