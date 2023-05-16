import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1684265047319 implements MigrationInterface {
    name = 'Default1684265047319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "series" DROP CONSTRAINT "FK_a5b1ae034009f4ef0f7831a35a2"`);
        await queryRunner.query(`ALTER TABLE "series" DROP COLUMN "directorId"`);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD "directorId" uuid`);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD CONSTRAINT "FK_c6927867cadafbe4577837eaaef" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "epsodes" DROP CONSTRAINT "FK_c6927867cadafbe4577837eaaef"`);
        await queryRunner.query(`ALTER TABLE "epsodes" DROP COLUMN "directorId"`);
        await queryRunner.query(`ALTER TABLE "series" ADD "directorId" uuid`);
        await queryRunner.query(`ALTER TABLE "series" ADD CONSTRAINT "FK_a5b1ae034009f4ef0f7831a35a2" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
