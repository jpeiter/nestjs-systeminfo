import { Systeminformation } from "systeminformation";
import { SystemInfoType } from "./system-info-type";

export class SystemInfo {
  readonly os?: Info<Systeminformation.OsData>;
  readonly cpu?: Info<CpuInfo>;
  readonly ram?: Info<Systeminformation.MemData>;
  readonly gpu?: Info<Systeminformation.GraphicsData[]>;
  readonly disk?: Info<Systeminformation.BlockDevicesData[]>;
}

export class Info<T>{
  type?: SystemInfoType;
  data?: T;
  success: boolean;
  updatedOn: string;
}

export class CpuInfo {
  info?: Systeminformation.CpuData;
  speed?: Systeminformation.CpuCurrentSpeedData;
  temperature?: Systeminformation.CpuTemperatureData;
}