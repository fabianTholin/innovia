import { startTransition, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import styles from "./css/SensorData.module.css";

// type DeviceData = {
//   id: string;
//   tenantId: string;
//   roomId: string;
//   model: string;
//   serial: string;
//   status: string;
// }[];

// type SensorData = {
//   deviceId: string;
//   apiKey: string;
//   timestamp: string;
//   metrics: { type: string; value: number; unit: string }[];
// };

// const mockDeviceData: DeviceData = [
//   {
//     id: "ijljiojipo",
//     tenantId: "",
//     roomId: "",
//     model: "",
//     serial: "dev-xxx",
//     status: "",
//   },
// ];

// const mockSensorData: SensorData = {
//   deviceId: "Mockyson",
//   apiKey: "dev-101-key",
//   timestamp: "1900-01-01T12:00:00Z",
//   metrics: [
//     { type: "fakeTemp", value: 225, unit: "C" },
//     { type: "fraudCarbodioxideLevel", value: 10000, unit: "ppm" },
//   ],
// };

export default function SensorData() {
  //  const [deviceData, setDeviceData] = useState<DeviceData>(mockDeviceData);
  // const [sensorData, setSensorData] = useState<SensorData>(mockSensorData);
  const [sensorData, setSensorData] = useState("mockString");
  // const [devices, setDevices] = useState<string[]>([]);
  const tenantId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  useEffect(() => {
    async function getDevices() {
      try {
        const response = await fetch(
          `http://localhost:5101/api/tenants/${tenantId}/devices`,
          {
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error(
            `Kunde inte hämta enheter. Status ${response.status}`,
          );
        }
        console.log(response);
        const data = await response.json();
        // setDeviceData(data);
        console.log(data);
      } catch (error) {
        console.error("Fel vid hämtning från Device Registry", error);
      }
    }
    getDevices();

    // async function getDevicesFromPortal() {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:5104/portal/devices`,
    //       {
    //         method: "GET",
    //       },
    //     );
    //     if (!response.ok) {
    //       throw new Error(
    //         `Kunde inte hämta enheter. Status ${response.status}`,
    //       );
    //     }
    //     console.log(response);
    //     const data = await response.json();
    //     setDevices(data);
    //   } catch (error) {
    //     console.error("Fel vid hämtning från Portal", error);
    //   }
    // }
    // getDevicesFromPortal();

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5103/hub/telemetry")
      .withAutomaticReconnect()
      // .configureLogging(signalR.LogLevel.Trace)
      .build();

    connection.on("measurementReceived", (data) => {
      console.log("measurement received", data);
      const receivedData = data;
      const json = JSON.parse(receivedData);
      setSensorData(json);
    });

    async function startConnection() {
      try {
        await connection.start();
        console.log("SignalR connected");

        await connection.invoke("JoinTenant", { tenantId });
        console.log("Joined tenant");
      } catch (error) {
        console.error("SignalR setup failed", error);
      }
    }
    void startConnection().then(() => console.log(sensorData));

    return () => {
      connection.off("measurementReceived");
      void connection.stop();
    };
  });

  return <div className={styles.list}>{sensorData}</div>;
  // if (sensorData === null) {
  //   return <div>Väntar på sensordata...</div>;
  // } else if (sensorData != null && sensorData.metrics.length > 0) {
  //   return (
  //     // obs className bara för att slippa varning.
  //     <div className={styles.list}>
  //       <h4>Enheter</h4>
  //       <ul>
  //         <li>{devices}</li>
  //         {deviceData.map((element) => (
  //           <li>Serial: {element.serial}</li>
  //         ))}
  //       </ul>
  //       <h4>Sensordata</h4>
  //       <ul>
  //         <li>
  //           Apparat: {sensorData.deviceId} <br />
  //           Tid: {sensorData.timestamp} <br />
  //           Mätvärden:
  //           <ul>
  //             <li>
  //               {sensorData.metrics[0].value} {sensorData.metrics[0].unit} (
  //               {sensorData.metrics[0].type})
  //             </li>
  //             <li>
  //               {sensorData.metrics[1].value} {sensorData.metrics[1].unit} (
  //               {sensorData.metrics[1].type})
  //             </li>
  //           </ul>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // }
}
