import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntities1582410623883 implements MigrationInterface {
  name = 'InitEntities1582410623883';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user_attachment" ("id" SERIAL NOT NULL, "attachmentId" integer, "userId" integer, CONSTRAINT "REL_f5ee43fa58d0d3655db6227d72" UNIQUE ("attachmentId"), CONSTRAINT "PK_0b67ce773855d0de4b6e3b7f75e" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" SERIAL NOT NULL, "roleId" integer, "userId" integer, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "event_user" ("id" SERIAL NOT NULL, "roleId" integer, "eventId" integer, "userId" integer, CONSTRAINT "PK_e6358bd3df1b2874637dca92bcf" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "about" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_user" ("id" SERIAL NOT NULL, "roleId" integer, "userId" integer, "organizationId" integer, CONSTRAINT "PK_b93269ca4d9016837d22ab6e1e0" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_attachment" ("id" SERIAL NOT NULL, "attachmentId" integer, "organizationId" integer, CONSTRAINT "REL_772816cceafe814b15db864d19" UNIQUE ("attachmentId"), CONSTRAINT "PK_c750b77b23be02f5d1a7ef23aa4" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "event_organization" ("id" SERIAL NOT NULL, "roleId" integer, "eventId" integer, "organizationId" integer, CONSTRAINT "PK_f476008fe61c6e93f2fe8a3d124" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "additional_info" character varying NOT NULL, "type" integer NOT NULL, "cron_start" character varying NOT NULL, "cron_end" character varying NOT NULL, "date_start" TIMESTAMP WITH TIME ZONE NOT NULL, "date_end" TIMESTAMP WITH TIME ZONE NOT NULL, "completleness" integer NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "event_attachment" ("id" SERIAL NOT NULL, "attachmentId" integer, "eventId" integer, CONSTRAINT "REL_c50ecc36f15eb4832bb94431d7" UNIQUE ("attachmentId"), CONSTRAINT "PK_1832ffaf912637f5496aba5e642" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "attachment" ("id" SERIAL NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_attachment" ADD CONSTRAINT "FK_f5ee43fa58d0d3655db6227d72d" FOREIGN KEY ("attachmentId") REFERENCES "attachment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_attachment" ADD CONSTRAINT "FK_6532eb507c19fde61d829e04923" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_user" ADD CONSTRAINT "FK_4e7446742183c6e459da89cc765" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_user" ADD CONSTRAINT "FK_6e3fbcc18ab70b803bb82f8802c" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_user" ADD CONSTRAINT "FK_600a6c0ba1ff979f6bfbce3bfe3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" ADD CONSTRAINT "FK_a4b2a3d752ecb729980e5dd5945" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" ADD CONSTRAINT "FK_29586d245154770441881d8f4fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" ADD CONSTRAINT "FK_63562fe364ecc738a7be56a8444" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_attachment" ADD CONSTRAINT "FK_772816cceafe814b15db864d194" FOREIGN KEY ("attachmentId") REFERENCES "attachment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_attachment" ADD CONSTRAINT "FK_09b26da2a7a1b68ca1b6706441e" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_organization" ADD CONSTRAINT "FK_0f2c7d50e7148e267233e0094b2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_organization" ADD CONSTRAINT "FK_2222d8efe89ce70dd3a26dde242" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_organization" ADD CONSTRAINT "FK_b5fad63cee3987ea2bf8341eebb" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_attachment" ADD CONSTRAINT "FK_c50ecc36f15eb4832bb94431d74" FOREIGN KEY ("attachmentId") REFERENCES "attachment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_attachment" ADD CONSTRAINT "FK_bbd3c48c1076c853f401f258e31" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "event_attachment" DROP CONSTRAINT "FK_bbd3c48c1076c853f401f258e31"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_attachment" DROP CONSTRAINT "FK_c50ecc36f15eb4832bb94431d74"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_organization" DROP CONSTRAINT "FK_b5fad63cee3987ea2bf8341eebb"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_organization" DROP CONSTRAINT "FK_2222d8efe89ce70dd3a26dde242"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_organization" DROP CONSTRAINT "FK_0f2c7d50e7148e267233e0094b2"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_attachment" DROP CONSTRAINT "FK_09b26da2a7a1b68ca1b6706441e"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_attachment" DROP CONSTRAINT "FK_772816cceafe814b15db864d194"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" DROP CONSTRAINT "FK_63562fe364ecc738a7be56a8444"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" DROP CONSTRAINT "FK_29586d245154770441881d8f4fd"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user" DROP CONSTRAINT "FK_a4b2a3d752ecb729980e5dd5945"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_user" DROP CONSTRAINT "FK_600a6c0ba1ff979f6bfbce3bfe3"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_user" DROP CONSTRAINT "FK_6e3fbcc18ab70b803bb82f8802c"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event_user" DROP CONSTRAINT "FK_4e7446742183c6e459da89cc765"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_attachment" DROP CONSTRAINT "FK_6532eb507c19fde61d829e04923"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_attachment" DROP CONSTRAINT "FK_f5ee43fa58d0d3655db6227d72d"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "attachment"`, undefined);
    await queryRunner.query(`DROP TABLE "event_attachment"`, undefined);
    await queryRunner.query(`DROP TABLE "event"`, undefined);
    await queryRunner.query(`DROP TABLE "event_organization"`, undefined);
    await queryRunner.query(`DROP TABLE "organization"`, undefined);
    await queryRunner.query(`DROP TABLE "organization_attachment"`, undefined);
    await queryRunner.query(`DROP TABLE "organization_user"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "event_user"`, undefined);
    await queryRunner.query(`DROP TABLE "role"`, undefined);
    await queryRunner.query(`DROP TABLE "user_role"`, undefined);
    await queryRunner.query(`DROP TABLE "user_attachment"`, undefined);
  }
}
