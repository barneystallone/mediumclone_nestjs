// import EnvSchema, { validate } from '@/env/env.validation';
import EnvSchema from '@/env/schema/env.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: EnvSchema,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
})
export class EnvModule {}
