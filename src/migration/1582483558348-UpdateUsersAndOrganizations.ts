import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersAndOrganizations1582483558348
  implements MigrationInterface {
  name = 'UpdateUsersAndOrganizations1582483558348';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "mainImageLink" character varying NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "organization" DROP COLUMN "mainImageLink"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "password"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "email"`,
      undefined,
    );
  }
}
