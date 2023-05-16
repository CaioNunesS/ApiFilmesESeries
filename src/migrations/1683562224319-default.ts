import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683562224319 implements MigrationInterface {
    name = 'Default1683562224319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "directors" RENAME COLUMN "age" TO "dob"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "directors" RENAME COLUMN "dob" TO "age"`);
    }

}
