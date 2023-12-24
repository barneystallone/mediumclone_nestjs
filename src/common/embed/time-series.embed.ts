import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TimeSeries {
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
