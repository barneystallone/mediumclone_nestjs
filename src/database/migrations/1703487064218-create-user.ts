import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1703487064218 implements MigrationInterface {
    name = 'CreateUser1703487064218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
    }

}