// import { dataSourceOptions } from '@/database/data-source';
import { dataSourceOptions } from '@/database/data-source';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const config = {
    ...dataSourceOptions(),
    autoLoadEntities: true,
  };
  return config;
});
