import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683642907344 implements MigrationInterface {
    name = 'Default1683642907344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "directorId" uuid`);
        await queryRunner.query(`ALTER TABLE "series" ADD "directorId" uuid`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_76fd356fe117a34a58cbccfb854" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "series" ADD CONSTRAINT "FK_a5b1ae034009f4ef0f7831a35a2" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "series" DROP CONSTRAINT "FK_a5b1ae034009f4ef0f7831a35a2"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_76fd356fe117a34a58cbccfb854"`);
        await queryRunner.query(`ALTER TABLE "series" DROP COLUMN "directorId"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "directorId"`);
    }

}
