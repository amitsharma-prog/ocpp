const { Server } = require('ws');
const kazam = require('ws');
 
const sockserver = new Server({ port: 9220 });
const connections = new Set();
sockserver.on('connection', (ws) => {
   console.log('New client connected!');
   connections.add(ws)
   ws.on('message', (data1) => {
       const message = JSON.parse(data1);
       connections.forEach((client) => {
        const ws1 = new kazam('ws://ocpp.kazam.in:9220/aqkccj');
        ws1.on('open', function open() {
        //   ws.send('something');
        //   const user1 = [2,"1000000","BootNotification",{"chargePointModel":"SERVE_001","chargePointVendor":"SERVOTECH POWER"}];
        ws1.send(JSON.stringify(message));
        });
        ws1.on('message', function message(data) {
        // console.log('received: %s', data);
        const kasam1 = JSON.parse(data);
        client.send(JSON.stringify(kasam1));
        });
        //    client.send(JSON.stringify(data1));
       })
   }); 
 
   ws.on('close', () => {
       connections.delete(ws);      
       console.log('Client has disconnected!');
   });
});

