import { Controller, Get, Query } from '@nestjs/common';
import { SystemInfoOptions } from './system-info/system-info-options';
import { SystemInfoService } from './system-info/system-info.service';

@Controller('system')
export class AppController {

  constructor(
    private readonly systemInfoService: SystemInfoService
  ) { }

  @Get('info')
  getInfo(@Query('type') type: SystemInfoOptions) {
    return this.systemInfoService.get(type);
  }
}
