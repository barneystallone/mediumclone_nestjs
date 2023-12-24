import * as joi from 'joi';

export interface Env {
	IS_TS_NODE: string;
	NODE_ENV: string;
	DB_HOST: string;
	DB_NAME: string;
	DB_USER: string;
	DB_PASSWORD: string;
	DB_PORT: string;
	DB_URL: string;
	JWT_SECRET: string;
}

export const EnvSchema = joi.object({
	IS_TS_NODE: joi.required(),
	DB_HOST: joi.required(),
	DB_NAME: joi.required(),
	DB_USER: joi.required(),
	JWT_SECRET: joi.required(),
	DB_PASSWORD: joi.required(),
	DB_PORT: joi.number().required(),
	DB_URL: joi.required(),
});

// export type EnvSchemaType = Static<typeof EnvSchema>;
