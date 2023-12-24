import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTag1703399790541 implements MigrationInterface {
    name = 'CreateTag1703399790541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tags" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updateAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "tags"
        `);
    }

}
