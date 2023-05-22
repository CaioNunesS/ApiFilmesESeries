import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1684764131782 implements MigrationInterface {
    name = 'Default1684764131782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "epsodes" DROP CONSTRAINT "FK_cc28620ba7878400be92abd22a9"`);
        await queryRunner.query(`ALTER TABLE "epsodes" DROP CONSTRAINT "FK_c6927867cadafbe4577837eaaef"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_76fd356fe117a34a58cbccfb854"`);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD CONSTRAINT "FK_cc28620ba7878400be92abd22a9" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD CONSTRAINT "FK_c6927867cadafbe4577837eaaef" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_76fd356fe117a34a58cbccfb854" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_76fd356fe117a34a58cbccfb854"`);
        await queryRunner.query(`ALTER TABLE "epsodes" DROP CONSTRAINT "FK_c6927867cadafbe4577837eaaef"`);
        await queryRunner.query(`ALTER TABLE "epsodes" DROP CONSTRAINT "FK_cc28620ba7878400be92abd22a9"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_76fd356fe117a34a58cbccfb854" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD CONSTRAINT "FK_c6927867cadafbe4577837eaaef" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD CONSTRAINT "FK_cc28620ba7878400be92abd22a9" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
