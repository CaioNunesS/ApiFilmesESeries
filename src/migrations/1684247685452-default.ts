import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1684247685452 implements MigrationInterface {
    name = 'Default1684247685452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "series" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "series" DROP COLUMN "serieFile"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "series" ADD "serieFile" text`);
        await queryRunner.query(`ALTER TABLE "series" ADD "duration" integer NOT NULL`);
    }

}
