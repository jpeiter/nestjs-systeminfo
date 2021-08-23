import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SystemInfoService } from './system-info/system-info.service';
import { AppWSGateway } from './ws/ws.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    SystemInfoService,
    AppWSGateway
  ],
})
export class AppModule {
}
