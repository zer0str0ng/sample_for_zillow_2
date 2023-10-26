import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DeviceInterface } from './../interfaces';
import { VehicleEntity } from './vehicle.entity';

@Entity({
  name: 'dbo.TblDeviceSet',
})
export class DeviceEntity extends BaseEntity implements DeviceInterface {
  @Column()
  information: string;

  @Column()
  serial: string;

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle?: VehicleEntity;
}
