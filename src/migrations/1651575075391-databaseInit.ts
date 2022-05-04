import {MigrationInterface, QueryRunner} from "typeorm";

export class databaseInit1651575075391 implements MigrationInterface {
    name = 'databaseInit1651575075391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "movieId" integer NOT NULL, "title" character varying NOT NULL, "originalTitle" character varying NOT NULL, "releaseYear" integer NOT NULL, "overview" character varying NOT NULL, "posterPath" character varying NOT NULL, "voteCount" integer NOT NULL, "voteAverage" integer NOT NULL, "genreIds" integer array NOT NULL, "isViewed" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "genreId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_ec7ed42b2e89092919129bdf990" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genre" ADD CONSTRAINT "FK_23b4eddd5b23764f2fb768be807" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genre" DROP CONSTRAINT "FK_23b4eddd5b23764f2fb768be807"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_ec7ed42b2e89092919129bdf990"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
