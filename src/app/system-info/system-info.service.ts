import { Injectable } from '@nestjs/common';
import { catchError, forkJoin, from, mergeMap, Observable, of } from 'rxjs';
import * as si from 'systeminformation';
import { Systeminformation } from "systeminformation";
import { CpuInfo, Info } from './system-info';
import { SystemInfoOptions } from './system-info-options';

@Injectable()
export class SystemInfoService {

  get(option: SystemInfoOptions): Observable<Info<any>> {
    if (option) {
      const index = SystemInfoOptions[option.toString().toUpperCase()];
      if (typeof index == 'number') {
        const value = SystemInfoOptions[index].toLowerCase();
        return this[value]();
      }
      return this.catchError('Option not available');
    }
    return this.catchError();
  }

  os(): Observable<Info<Systeminformation.OsData>> {
    return this.transform(si.osInfo());
  }

  cpu(): Observable<Info<CpuInfo>> {
    const obs = [
      from(si.cpu()),
      from(si.cpuCurrentSpeed()),
      from(si.cpuTemperature())
    ];
    return forkJoin(obs).pipe(
      mergeMap(results => {
        return of({
          data: {
            info: (results[0]) as Systeminformation.CpuData,
            speed: (results[1]) as Systeminformation.CpuCurrentSpeedData,
            temperature: (results[2]) as Systeminformation.CpuTemperatureData,
          },
          success: true,
          updatedOn: this.dateTime()
        })
      }),
      catchError(err => {
        return this.catchError();
      })
    );
  }

  ram(): Observable<Info<Systeminformation.MemData>> {
    return this.transform(si.mem());
  }

  gpu(): Observable<Info<Systeminformation.GraphicsData>> {
    return this.transform(si.graphics());
  }

  disk(): Observable<Info<Systeminformation.BlockDevicesData[]>> {
    return this.transform(si.blockDevices());
  }

  private transform(promise: Promise<any>): Observable<Info<any>> {
    return from(promise).pipe(
      mergeMap(data => {
        return of({
          data,
          success: true,
          updatedOn: this.dateTime()
        })
      }),
      catchError(err => {
        return this.catchError();
      })
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
