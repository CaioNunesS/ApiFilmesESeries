import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683553533677 implements MigrationInterface {
    name = 'Default1683553533677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "synopsis" text NOT NULL, "gender" text NOT NULL, "photo" text, "duration" integer NOT NULL, CONSTRAINT "UQ_5aa0bbd146c0082d3fc5a0ad5d8" UNIQUE ("title"), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "epsodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "synopsis" text NOT NULL, "duration" integer NOT NULL, "serieId" uuid, CONSTRAINT "UQ_4333b2666cf804c543b103f39ef" UNIQUE ("title"), CONSTRAINT "PK_667f392f5263882daf89148d231" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "series" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "synopsis" text NOT NULL, "gender" text NOT NULL, "photo" text, "duration" integer NOT NULL, CONSTRAINT "UQ_47fcd3a25ef21a51ae03cf500d5" UNIQUE ("title"), CONSTRAINT "PK_e725676647382eb54540d7128ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "directors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "age" integer NOT NULL, "photo" text, CONSTRAINT "UQ_405bf12dff92cd37ebbf78bc628" UNIQUE ("name"), CONSTRAINT "PK_a9ae28f00c93801aa034a2c1773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "directors_movie_movies" ("directorsId" uuid NOT NULL, "moviesId" uuid NOT NULL, CONSTRAINT "PK_2de2bd8c50b118a0fdbc2fa776f" PRIMARY KEY ("directorsId", "moviesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_152bf4d06e3d49631a537fee48" ON "directors_movie_movies" ("directorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3480d42f637abd6f68a92bc103" ON "directors_movie_movies" ("moviesId") `);
        await queryRunner.query(`CREATE TABLE "directors_serie_series" ("directorsId" uuid NOT NULL, "seriesId" uuid NOT NULL, CONSTRAINT "PK_b9245888b6288a53991056aa2af" PRIMARY KEY ("directorsId", "seriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c401c47b2717a6a095a388abcb" ON "directors_serie_series" ("directorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_817b03fa3a99d317b2ca46b653" ON "directors_serie_series" ("seriesId") `);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD CONSTRAINT "FK_cc28620ba7878400be92abd22a9" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "directors_movie_movies" ADD CONSTRAINT "FK_152bf4d06e3d49631a537fee483" FOREIGN KEY ("directorsId") REFERENCES "directors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "directors_movie_movies" ADD CONSTRAINT "FK_3480d42f637abd6f68a92bc103c" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "directors_serie_series" ADD CONSTRAINT "FK_c401c47b2717a6a095a388abcb1" FOREIGN KEY ("directorsId") REFERENCES "directors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "directors_serie_series" ADD CONSTRAINT "FK_817b03fa3a99d317b2ca46b6533" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "directors_serie_series" DROP CONSTRAINT "FK_817b03fa3a99d317b2ca46b6533"`);
        await queryRunner.query(`ALTER TABLE "directors_serie_series" DROP CONSTRAINT "FK_c401c47b2717a6a095a388abcb1"`);
        await queryRunner.query(`ALTER TABLE "directors_movie_movies" DROP CONSTRAINT "FK_3480d42f637abd6f68a92bc103c"`);
        await queryRunner.query(`ALTER TABLE "directors_movie_movies" DROP CONSTRAINT "FK_152bf4d06e3d49631a537fee483"`);
        await queryRunner.query(`ALTER TABLE "epsodes" DROP CONSTRAINT "FK_cc28620ba7878400be92abd22a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_817b03fa3a99d317b2ca46b653"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c401c47b2717a6a095a388abcb"`);
        await queryRunner.query(`DROP TABLE "directors_serie_series"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3480d42f637abd6f68a92bc103"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_152bf4d06e3d49631a537fee48"`);
        await queryRunner.query(`DROP TABLE "directors_movie_movies"`);
        await queryRunner.query(`DROP TABLE "directors"`);
        await queryRunner.query(`DROP TABLE "series"`);
        await queryRunner.query(`DROP TABLE "epsodes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
