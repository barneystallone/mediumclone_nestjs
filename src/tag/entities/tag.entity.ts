import { TimeSeries } from '@/common/embed/time-series.embed';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column(() => TimeSeries, { prefix: false })
  timeSeries: TimeSeries;
}
