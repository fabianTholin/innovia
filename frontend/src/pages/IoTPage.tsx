import styles from "./css/IoTPage.module.css";
import Navbar from "../components/Navbar";
import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

const tenant = "innovia";
type Device = {
  id: string;
  tenantId: string;
  roomId: string;
  model: string;
  serial: string;
  status: string;
};

type RealtimeMeasurement = {
  deviceId: string;
  tenantSlug: string;
  type: string;
  value: number;
  time: string;
};

export default function IoTPage() {
  const [deviceData, setDeviceData] = useState<Device[]>([]);
  const tenantId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const [realtimeMeasurements, setRealTimeMeasurements] = useState<
    RealtimeMeasurement[]
  >([]);

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

    function AddToList(data: RealtimeMeasurement) {
      setRealTimeMeasurements((previous) => [data, ...previous].slice(0, 22));
    }

    async function GetMessages() {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5103/hub/telemetry")
        .build();

      connection.on("measurementReceived", (data) => {
        AddToList(data);
        console.log(data);
      });

      try {
        await connection.start();
        console.log("Ansluten.");
      } catch (error) {
        console.error("Fel i SignalR-anslutningen", error);
      }
      try {
        await connection.invoke("JoinTenant", tenant);
        console.log(tenant + " ansluten");
      } catch (error) {
        console.error("Kunde inte ansluta " + tenant, error);
        await connection.stop();
      }
    }
    GetMessages();
  }, []);

  function ListDevices() {
    return (
      <table>
        <caption>{tenant}: Registrerade enheter </caption>
        <thead>
          <tr>
            <th>serial</th>
            <th>rum</th>
            <th>id</th>
            <th>tid</th>
            <th>värde</th>
            <th>typ</th>
          </tr>
        </thead>
        {deviceData.map((device) => (
          <tr key={device.id}>
            <td>{device.serial}</td>
            <td>{device.roomId}</td>
            <td>{device.id}</td>
            {RealtimeDataOutput(device.id)}
          </tr>
        ))}
        <tbody></tbody>
      </table>
    );
  }

  function RealtimeDataOutput(id: string) {
    const rTM = realtimeMeasurements.find((m) => m.deviceId === id);
    const twinRTM = realtimeMeasurements.find((m)=>m.deviceId === id && m.type != rTM?.type)
    
    return (
      <section>
        <td>{rTM?.time}</td>
        <td>{rTM?.value}</td>
        <td>{rTM?.type}</td>
        <tr>

        <td>{twinRTM?.time}</td>
        <td>{twinRTM?.value}</td>
        <td>{twinRTM?.type}</td>
        </tr>

      </section>
    );
  }

  return (
    <main>
      <Navbar />
      {ListDevices()}
    </main>
  );
}
