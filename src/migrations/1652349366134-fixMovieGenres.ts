import {MigrationInterface, QueryRunner} from "typeorm";

export class fixMovieGenres1652349366134 implements MigrationInterface {
    name = 'fixMovieGenres1652349366134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" RENAME COLUMN "genreIds" TO "genres"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genres"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "genres" character varying array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genres"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "genres" integer array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" RENAME COLUMN "genres" TO "genreIds"`);
    }

}
