import { Module } from '@nestjs/common';
import { AppWSGateway } from '../ws/ws.gateway';
import { SystemInfoController } from './system-info.controller';
import { SystemInfoService } from './system-info.service';

@Module({
  imports: [],
  controllers: [SystemInfoController],
  providers: [
    SystemInfoService,
    AppWSGateway
  ],
})
export class SystemInfoModule {
}
