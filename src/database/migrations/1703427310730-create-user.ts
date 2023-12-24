import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1703427310730 implements MigrationInterface {
  name = 'CreateUser1703427310730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "email" character varying NOT NULL,
                "bio" character varying NOT NULL DEFAULT '',
                "image" character varying NOT NULL DEFAULT '',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            ) 
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
