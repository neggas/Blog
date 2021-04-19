import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinColumn1618397778120 implements MigrationInterface {
    name = 'JoinColumn1618397778120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `subscription` DROP FOREIGN KEY `FK_3197bb7659c450d4c033a63414f`");
        await queryRunner.query("ALTER TABLE `subscription` DROP FOREIGN KEY `FK_95a175097e883d7d1deb5780c62`");
        await queryRunner.query("CREATE TABLE `Photo` (`id` int NOT NULL AUTO_INCREMENT, `caption` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `width` int NOT NULL, `height` int NOT NULL, `uploadDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `profileId` int NULL, `articleId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Article` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `body` varchar(255) NOT NULL, `authorId` varchar(36) NULL, UNIQUE INDEX `IDX_84ed9d03f2eb7ac4b2557a5e80` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Category` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `parentCategoryId` varchar(36) NULL, `photoId` int NULL, UNIQUE INDEX `REL_5093c6afec9454fa67ad41697d` (`parentCategoryId`), UNIQUE INDEX `REL_c1d97fa150fe05958e6c9eb2b9` (`photoId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `subscription` DROP COLUMN `subscriberId`");
        await queryRunner.query("ALTER TABLE `subscription` DROP COLUMN `subscribedToId`");
        await queryRunner.query("ALTER TABLE `subscription` ADD `subscriber_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `subscription` ADD `subscribedTo_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `Photo` ADD CONSTRAINT `FK_43fa4426711a8f3b7ca9b0571f4` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Photo` ADD CONSTRAINT `FK_986900dbdaa7b09f2fdba613d19` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subscription` ADD CONSTRAINT `FK_e86c94ef2066df53b34d1e5edec` FOREIGN KEY (`subscriber_id`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subscription` ADD CONSTRAINT `FK_844fbbec461ef7d278cd71c3316` FOREIGN KEY (`subscribedTo_id`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c20404221e5c125a581a0d90c0e` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_d41caa70371e578e2a4791a88ae` FOREIGN KEY (`post_id`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `Article` ADD CONSTRAINT `FK_08e438dd8a3266e724b326129a0` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Category` ADD CONSTRAINT `FK_5093c6afec9454fa67ad41697d2` FOREIGN KEY (`parentCategoryId`) REFERENCES `Category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Category` ADD CONSTRAINT `FK_c1d97fa150fe05958e6c9eb2b93` FOREIGN KEY (`photoId`) REFERENCES `Photo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tag` ADD CONSTRAINT `FK_f0d122075d3287f7f57b2a02a93` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tag` ADD CONSTRAINT `FK_bfd776a82cbfa8f2661fdb2f8a1` FOREIGN KEY (`photoId`) REFERENCES `Photo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tag` DROP FOREIGN KEY `FK_bfd776a82cbfa8f2661fdb2f8a1`");
        await queryRunner.query("ALTER TABLE `tag` DROP FOREIGN KEY `FK_f0d122075d3287f7f57b2a02a93`");
        await queryRunner.query("ALTER TABLE `Category` DROP FOREIGN KEY `FK_c1d97fa150fe05958e6c9eb2b93`");
        await queryRunner.query("ALTER TABLE `Category` DROP FOREIGN KEY `FK_5093c6afec9454fa67ad41697d2`");
        await queryRunner.query("ALTER TABLE `Article` DROP FOREIGN KEY `FK_08e438dd8a3266e724b326129a0`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_d41caa70371e578e2a4791a88ae`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c20404221e5c125a581a0d90c0e`");
        await queryRunner.query("ALTER TABLE `subscription` DROP FOREIGN KEY `FK_844fbbec461ef7d278cd71c3316`");
        await queryRunner.query("ALTER TABLE `subscription` DROP FOREIGN KEY `FK_e86c94ef2066df53b34d1e5edec`");
        await queryRunner.query("ALTER TABLE `Photo` DROP FOREIGN KEY `FK_986900dbdaa7b09f2fdba613d19`");
        await queryRunner.query("ALTER TABLE `Photo` DROP FOREIGN KEY `FK_43fa4426711a8f3b7ca9b0571f4`");
        await queryRunner.query("ALTER TABLE `subscription` DROP COLUMN `subscribedTo_id`");
        await queryRunner.query("ALTER TABLE `subscription` DROP COLUMN `subscriber_id`");
        await queryRunner.query("ALTER TABLE `subscription` ADD `subscribedToId` int NULL");
        await queryRunner.query("ALTER TABLE `subscription` ADD `subscriberId` int NULL");
        await queryRunner.query("DROP INDEX `REL_c1d97fa150fe05958e6c9eb2b9` ON `Category`");
        await queryRunner.query("DROP INDEX `REL_5093c6afec9454fa67ad41697d` ON `Category`");
        await queryRunner.query("DROP TABLE `Category`");
        await queryRunner.query("DROP INDEX `IDX_84ed9d03f2eb7ac4b2557a5e80` ON `Article`");
        await queryRunner.query("DROP TABLE `Article`");
        await queryRunner.query("DROP TABLE `Photo`");
        await queryRunner.query("ALTER TABLE `subscription` ADD CONSTRAINT `FK_95a175097e883d7d1deb5780c62` FOREIGN KEY (`subscriberId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subscription` ADD CONSTRAINT `FK_3197bb7659c450d4c033a63414f` FOREIGN KEY (`subscribedToId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
