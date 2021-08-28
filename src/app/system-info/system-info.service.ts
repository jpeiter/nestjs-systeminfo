import { Injectable } from '@nestjs/common';
import { catchError, from, mergeMap, Observable, of } from 'rxjs';
import * as si from 'systeminformation';
import { Systeminformation } from "systeminformation";
import { Info } from './system-info';
import { SystemInfoType } from './system-info-type';

@Injectable()
export class SystemInfoService {

  getMethod(type: SystemInfoType) {
    switch (type) {
      case SystemInfoType.CPU: return this.cpu();
      case SystemInfoType.CPU_SPEED: return this.cpuSpeed();
      case SystemInfoType.CPU_TEMPERATURE: return this.cpuTemperature();
      case SystemInfoType.DISK: return this.disk();
      case SystemInfoType.GPU: return this.gpu();
      case SystemInfoType.OS: return this.os();
      case SystemInfoType.RAM: return this.ram();
      default: return null;
    }
  }

  get(type: SystemInfoType): Observable<Info<any>> {
    if (type) {
      return this.getMethod(type);
    }
    return this.catchError('Please provide info type.');
  }

  cpu(): Observable<Info<Systeminformation.CpuData>> {
    return this.transform(si.cpu(), SystemInfoType.CPU);
  }

  cpuSpeed(): Observable<Info<Systeminformation.CpuCurrentSpeedData>> {
    return this.transform(si.cpuCurrentSpeed(), SystemInfoType.CPU_SPEED);
  }

  cpuTemperature(): Observable<Info<Systeminformation.CpuTemperatureData>> {
    return this.transform(si.cpuTemperature(), SystemInfoType.CPU_TEMPERATURE);
  }

  disk(): Observable<Info<Systeminformation.BlockDevicesData[]>> {
    return this.transform(si.blockDevices(), SystemInfoType.DISK);
  }

  gpu(): Observable<Info<Systeminformation.GraphicsData>> {
    return this.transform(si.graphics(), SystemInfoType.GPU);
  }

  os(): Observable<Info<Systeminformation.OsData>> {
    return this.transform(si.osInfo(), SystemInfoType.OS);
  }

  ram(): Observable<Info<Systeminformation.MemData>> {
    return this.transform(si.mem(), SystemInfoType.RAM);
  }

  private transform(promise: Promise<any>, type: SystemInfoType): Observable<Info<any>> {
    return from(promise).pipe(
      mergeMap(data =>
        of({
          type,
          data,
          success: true,
          updatedOn: this.dateTime()
        })
      ),
      catchError(err => this.catchError())
    );
  }

  private dateTime(): string {
    return new Date().toISOString();
  }

  private catchError(message?: string): Observable<Info<any>> {
    return of({
      message,
      success: false,
      updatedOn: this.dateTime()
    });
  }

}
