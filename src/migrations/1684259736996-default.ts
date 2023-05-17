import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1684259736996 implements MigrationInterface {
    name = 'Default1684259736996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "synopsis" text NOT NULL, "gender" text NOT NULL, "photo" text, "movieFile" text, "duration" integer NOT NULL, "directorId" uuid, CONSTRAINT "UQ_5aa0bbd146c0082d3fc5a0ad5d8" UNIQUE ("title"), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "directors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "dob" integer NOT NULL, CONSTRAINT "UQ_405bf12dff92cd37ebbf78bc628" UNIQUE ("name"), CONSTRAINT "PK_a9ae28f00c93801aa034a2c1773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "series" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "synopsis" text NOT NULL, "gender" text NOT NULL, "photo" text, "directorId" uuid, CONSTRAINT "UQ_47fcd3a25ef21a51ae03cf500d5" UNIQUE ("title"), CONSTRAINT "PK_e725676647382eb54540d7128ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "epsodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "synopsis" text NOT NULL, "episodeFile" text, "duration" integer NOT NULL, "serieId" uuid, CONSTRAINT "UQ_4333b2666cf804c543b103f39ef" UNIQUE ("title"), CONSTRAINT "PK_667f392f5263882daf89148d231" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_76fd356fe117a34a58cbccfb854" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "series" ADD CONSTRAINT "FK_a5b1ae034009f4ef0f7831a35a2" FOREIGN KEY ("directorId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "epsodes" ADD CONSTRAINT "FK_cc28620ba7878400be92abd22a9" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "epsodes" DROP CONSTRAINT "FK_cc28620ba7878400be92abd22a9"`);
        await queryRunner.query(`ALTER TABLE "series" DROP CONSTRAINT "FK_a5b1ae034009f4ef0f7831a35a2"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_76fd356fe117a34a58cbccfb854"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "epsodes"`);
        await queryRunner.query(`DROP TABLE "series"`);
        await queryRunner.query(`DROP TABLE "directors"`);
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
