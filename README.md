# nestjs-systeminfo

Simple HTTP/WebSocket  interface created with [NestJS](https://nestjs.com/), [socket.io](https://socket.io/) and [systeminformation](https://systeminformation.io/), that provides information about the server/pc it is running on.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## HTTP

To make an HTTP request, all you've got to do is send a GET request to:
```
http://localhost:3000/system/info?type={TYPE}
```
Where the query parameter `type` has to be one of the following options: `CPU`, `CPU_SPEED`, `CPU_TEMPERATURE`, `DISK`, `GPU`, `OS`, or `RAM`.

## WebSocket

To request and listen to messages via WS, just connect to the port 3000, and emit/listen to the `update` event. The following code shows an example using socket.io's [Client API](https://socket.io/docs/v4/client-api/).

```javascript
const socket = io('http://localhost:3000');

listen = () => {
  socket.on('update', (data) => {
    console.log('data :', data);
  })
}

emit = (type) => socket.emit('update', { type });

listen();
emit(); // You may decide when to call it
```
