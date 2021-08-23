import { Injectable } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer } from "@nestjs/websockets";
import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Server } from "socket.io";
import { SystemInfoOptions } from "../system-info/system-info-options";
import { SystemInfoService } from "../system-info/system-info.service";

@Injectable()
@WebSocketGateway({
  cors: true
})
export class AppWSGateway {

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly service: SystemInfoService
  ) { }

  @SubscribeMessage('update')
  handleEvent(client: Socket, option: { option: SystemInfoOptions }) {
    this.service.get(option.option).subscribe(data => {
      this.server.to(client.id).emit('update', data);
    });
  }

}