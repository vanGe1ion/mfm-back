import {MigrationInterface, QueryRunner} from "typeorm";

export class movieFloatFix1651767279385 implements MigrationInterface {
    name = 'movieFloatFix1651767279385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_ec7ed42b2e89092919129bdf990"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "voteAverage"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "voteAverage" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genre" DROP CONSTRAINT "FK_23b4eddd5b23764f2fb768be807"`);
        await queryRunner.query(`ALTER TABLE "genre" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_ec7ed42b2e89092919129bdf990" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genre" ADD CONSTRAINT "FK_23b4eddd5b23764f2fb768be807" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genre" DROP CONSTRAINT "FK_23b4eddd5b23764f2fb768be807"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_ec7ed42b2e89092919129bdf990"`);
        await queryRunner.query(`ALTER TABLE "genre" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genre" ADD CONSTRAINT "FK_23b4eddd5b23764f2fb768be807" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "voteAverage"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "voteAverage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_ec7ed42b2e89092919129bdf990" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
