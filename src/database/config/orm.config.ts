// import { dataSourceOptions } from '@/database/data-source';
import { dataSourceOptions } from '@/database/data-source';
import { registerAs } from '@nestjs/config';

export const ormConfig = registerAs('database', () => {
	const config = {
		...dataSourceOptions(),
		autoLoadEntities: true,
	};
	return config;
});
