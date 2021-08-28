import { Controller, Get, Query } from '@nestjs/common';
import { SystemInfoType } from './system-info-type';
import { SystemInfoService } from './system-info.service';

@Controller('system')
export class SystemInfoController {

  constructor(
    private readonly systemInfoService: SystemInfoService
  ) { }

  @Get('info')
  getInfo(@Query('type') type: SystemInfoType) {
    return this.systemInfoService.get(type);
  }
}
