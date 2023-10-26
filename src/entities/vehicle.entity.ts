import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';
import { VehicleInterface } from './../interfaces';

@Entity({
  name: 'dbo.TblVehicleSet',
})
export class VehicleEntity extends BaseEntity implements VehicleInterface {
  @Column()
  name: string;

  @Column()
  type: string;
}
