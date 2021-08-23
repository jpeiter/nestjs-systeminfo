import { Injectable } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
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