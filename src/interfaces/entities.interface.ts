export interface BaseEntityInterface {
  id?: string;
  enabled?: boolean;
}

export interface DeviceInterface extends BaseEntityInterface {
  information: string;
  serial: string;
  vehicle?: VehicleInterface;
}

export interface VehicleInterface extends BaseEntityInterface {
  name: string;
  type: string;
}

export interface EventInterface extends BaseEntityInterface {
  name: string;
  startDateTime: Date;
  endDateTime: Date;
}

export interface HistoryInterface extends BaseEntityInterface {
  deviceId: string;
  device?: DeviceInterface;
  vehicleId?: string;
  vehicle?: VehicleInterface;
  vehicleName?: string;
  eventId?: string;
  location: string;
  speed: string;
  locationDate: Date;
  source: string;
  metadata: string;
}
