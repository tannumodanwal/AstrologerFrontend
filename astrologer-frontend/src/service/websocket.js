// src/Component/service/websocket.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const stompClient = new Client({
  brokerURL: null, // null because we're using SockJS
  webSocketFactory: () => new SockJS("http://localhost:9999/chat"), // Spring Boot backend endpoint
  reconnectDelay: 5000,
  debug: (str) => console.log(str),
});

export default stompClient;
