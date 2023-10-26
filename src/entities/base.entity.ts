import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  enabled: boolean;

  @Column()
  creationDate: string;
}
