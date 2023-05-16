import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683951050172 implements MigrationInterface {
    name = 'Default1683951050172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "directors" DROP COLUMN "photo"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "movieFile" text`);
        await queryRunner.query(`ALTER TABLE "series" ADD "serieFile" text`);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD "episodeFile" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "epsodes" DROP COLUMN "episodeFile"`);
        await queryRunner.query(`ALTER TABLE "series" DROP COLUMN "serieFile"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "movieFile"`);
        await queryRunner.query(`ALTER TABLE "directors" ADD "photo" text`);
    }

}
