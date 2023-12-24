// import EnvSchema, { validate } from '@/env/env.validation';
import { EnvSchema } from '@/env/schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			validationSchema: EnvSchema,
			isGlobal: true,
			envFilePath: [`.env.${process.env.NODE_ENV}`],
		}),
	],

	// providers: [ConfigService],
	// exports: [ConfigService],
})
export class EnvModule {}
