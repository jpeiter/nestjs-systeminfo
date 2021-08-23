import { Module } from '@nestjs/common';
import { SystemInfoModule } from './system-info/system-info.module';

@Module({
  imports: [SystemInfoModule],
})
export class AppModule {
}
