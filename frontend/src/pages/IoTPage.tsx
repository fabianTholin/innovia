import styles from "./css/IoTPage.module.css";
import Navbar from "../components/Navbar";
import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

type Device = {
  id: string;
  tenantId: string;
  roomId: string;
  model: string;
  serial: string;
  status: string;
};

export default function IoTPage() {
  const [deviceData, setDeviceData] = useState<Device[]>([]);
  const tenantId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  useEffect(() => {
    async function GetDevices() {
      const fetchPromise = fetch(
        `http://localhost:5101/api/tenants/${tenantId}/devices`,
      );
      fetchPromise
        .then((response) => response.json())
        .then((data) => setDeviceData(data));
    }
    GetDevices();

    async function GetMessages() {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5103/hub/telemetry")
        .build();

      connection.on("measurementReceived", (data) => {
        console.log("measurementReceived: " + (data));
      });

      try {
        await connection.start();
        console.log("Ansluten.");
      } catch (error) {
        console.error("Fel i SignalR-anslutningen", error);
      }
      try {
        await connection.invoke("JoinTenant", "innovia");
        console.log("Tenant ansluten");
      } catch (error) {
        console.error("Kunde inte ansluta tenant", error);
        await connection.stop();
      }
    }
    GetMessages();

  }, []);

  function DeviceLIst() {
    const listItems = deviceData.map((device) => (
      <li key={device.id} className={styles.list}>
        serial: {device.serial}, id: {device.id}
      </li>
    ));
    return <ul>{listItems}</ul>;
  }

  return (
    <main className={styles.IoTPage}>
      <Navbar />
      {DeviceLIst()}
    </main>
  );
}

// tenants/innovia/devices/dev-101/measurements
// public record RealtimeMeasurement(
//     string TenantSlug,
//     System.Guid DeviceId,
//     string Type,
//     double Value,
//     System.DateTimeOffset Time
// );

// type RealtimeMeasurement = {
//   tenantSlug: string;
//   deviceId: string;
//   type: string;
//   value: number;
//   time: string;
// };

// const [realtimeMeasurement, setRealtimeMeasurement] = useState<RealtimeMeasurement>();
