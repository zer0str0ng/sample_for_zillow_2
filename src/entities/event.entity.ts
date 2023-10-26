import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';
import { EventInterface } from './../interfaces';

@Entity({
  name: 'dbo.TblEventSet',
})
export class EventEntity extends BaseEntity implements EventInterface {
  @Column()
  name: string;

  @Column()
  startDateTime: Date;

  @Column()
  endDateTime: Date;
}
