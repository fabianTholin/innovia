# Projektinlämning 2: IoT implementring 

## Genomförda ändringar 

### RealtimeHub
- *CORS-policy*, tillagd "origin" för frontend-port 

### DeviceRegistry
- Skapade en app.MapDelete för att kunna ta bort *device* som eventuellt skapade problem.

### IngestGateway
-  Lade till *ToUniversalTime()* till payload.Timestamp som skapade problem
-  Kommenterade bort ett cache-anrop som gjorde att inte det inte hämtades från alla önskade enheter. 

### EdgeSimulator
- Lade till konsol-input för att kunna välja *enhets-serial* och simulera data för olika enheter.


### Instruktioner

Starta:
- Docker

- Frontend  ```npm run dev``` : http://localhost:5173/iot

- Backend ```dotnet run```
- DeviceRegistry ```dotnet run```
- IngestGateway ```dotnet run```
- RealtimeHub ```dotnet run```
- PortalAdapter ```dotnet run```
- EdgeSimulator x 10 ```dotnet run``` => ange serial, dev-101...dev-110 (listas från DeviceRegistry i klienten (/iot))

Nu ska realtidsdata visas för alla tio enheter