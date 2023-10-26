import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DeviceEntity } from './device.entity';
import { DeviceInterface, HistoryInterface, VehicleInterface } from './../interfaces';
import { VehicleEntity } from './vehicle.entity';

@Entity({
  name: 'dbo.TblHistorySet',
})
export class HistoryEntity extends BaseEntity implements HistoryInterface {
  @Column({
    type: 'uuid',
  })
  deviceId: string;

  @ManyToOne(() => DeviceEntity)
  @JoinColumn({ name: 'deviceId', referencedColumnName: 'id' })
  device?: DeviceInterface;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  vehicleId?: string;

  @ManyToOne(() => VehicleEntity)
  @JoinColumn({ name: 'vehicleId', referencedColumnName: 'id' })
  vehicle?: VehicleInterface;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  vehicleName?: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  eventId?: string;

  @Column({
    type: 'nvarchar',
  })
  location: string;

  @Column({
    type: 'nvarchar',
  })
  speed: string;

  @Column({
    type: 'datetime',
  })
  locationDate: Date;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  source: string;

  @Column({
    type: 'nvarchar',
    nullable: true,
    default: '{}',
  })
  metadata: string;
}
