import { Injectable } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SystemInfoType } from "../system-info/system-info-type";
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
  handleEvent(client: Socket, type: { type: SystemInfoType }) {
    this.service.get(type.type).subscribe(data => {
      this.server.to(client.id).emit('update', data);
    });
  }

}