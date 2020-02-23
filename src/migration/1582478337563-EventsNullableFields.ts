import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventsNullableFields1582478337563 implements MigrationInterface {
  name = 'EventsNullableFields1582478337563';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "additional_info" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "cron_start" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "cron_end" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "date_start" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "date_end" DROP NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "date_end" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "date_start" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "cron_end" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "cron_start" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "additional_info" SET NOT NULL`,
      undefined,
    );
  }
}
