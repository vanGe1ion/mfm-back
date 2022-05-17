import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFirstUser1652776230372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user"(login, password) VALUES ( 'user', 'user');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE login='user';`);
  }
}
