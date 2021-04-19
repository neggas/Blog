import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1618393437528 implements MigrationInterface {
    name = 'CreateDatabase1618393437528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Photo` (`id` int NOT NULL AUTO_INCREMENT, `caption` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `width` int NOT NULL, `height` int NOT NULL, `uploadDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `profileId` int NULL, `articleId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subscription` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `status` enum ('blocked', 'accepted', 'pending') NOT NULL DEFAULT 'pending', `subscriberId` int NULL, `subscribedToId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profile` (`id` int NOT NULL AUTO_INCREMENT, `phone` varchar(255) NULL, `birthday` date NULL, `website` varchar(255) NULL, `occupation` varchar(255) NULL, `firstName` varchar(255) NOT NULL DEFAULT 'John', `lastName` varchar(255) NOT NULL DEFAULT 'Smith', `age` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `passwordChangedAt` date NULL, `passwordResetToken` varchar(255) NULL, `active` tinyint NOT NULL DEFAULT 1, `confirmed` tinyint NOT NULL DEFAULT 0, `profileId` int NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `REL_9466682df91534dd95e4dbaa61` (`profileId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comment` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` varchar(36) NULL, `articleId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `like` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('happy', 'sad', 'angry', 'like') NOT NULL DEFAULT 'like', `user_id` int NULL, `post_id` varchar(36) NULL, `comment_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Article` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `body` varchar(255) NOT NULL, `authorId` varchar(36) NULL, UNIQUE INDEX `IDX_84ed9d03f2eb7ac4b2557a5e80` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Category` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `parentCategoryId` varchar(36) NULL, `photoId` int NULL, UNIQUE INDEX `REL_5093c6afec9454fa67ad41697d` (`parentCategoryId`), UNIQUE INDEX `REL_c1d97fa150fe05958e6c9eb2b9` (`photoId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tag` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `articleId` varchar(36) NULL, `photoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Photo` ADD CONSTRAINT `FK_43fa4426711a8f3b7ca9b0571f4` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Photo` ADD CONSTRAINT `FK_986900dbdaa7b09f2fdba613d19` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subscription` ADD CONSTRAINT `FK_95a175097e883d7d1deb5780c62` FOREIGN KEY (`subscriberId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subscription` ADD CONSTRAINT `FK_3197bb7659c450d4c033a63414f` FOREIGN KEY (`subscribedToId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_9466682df91534dd95e4dbaa616` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c20404221e5c125a581a0d90c0e` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_4356ac2f9519c7404a2869f1691` FOREIGN KEY (`user_id`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_d41caa70371e578e2a4791a88ae` FOREIGN KEY (`post_id`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_307553e232b4620fde327c59eb5` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
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
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_307553e232b4620fde327c59eb5`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_d41caa70371e578e2a4791a88ae`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_4356ac2f9519c7404a2869f1691`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c20404221e5c125a581a0d90c0e`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_9466682df91534dd95e4dbaa616`");
        await queryRunner.query("ALTER TABLE `subscription` DROP FOREIGN KEY `FK_3197bb7659c450d4c033a63414f`");
        await queryRunner.query("ALTER TABLE `subscription` DROP FOREIGN KEY `FK_95a175097e883d7d1deb5780c62`");
        await queryRunner.query("ALTER TABLE `Photo` DROP FOREIGN KEY `FK_986900dbdaa7b09f2fdba613d19`");
        await queryRunner.query("ALTER TABLE `Photo` DROP FOREIGN KEY `FK_43fa4426711a8f3b7ca9b0571f4`");
        await queryRunner.query("DROP TABLE `tag`");
        await queryRunner.query("DROP INDEX `REL_c1d97fa150fe05958e6c9eb2b9` ON `Category`");
        await queryRunner.query("DROP INDEX `REL_5093c6afec9454fa67ad41697d` ON `Category`");
        await queryRunner.query("DROP TABLE `Category`");
        await queryRunner.query("DROP INDEX `IDX_84ed9d03f2eb7ac4b2557a5e80` ON `Article`");
        await queryRunner.query("DROP TABLE `Article`");
        await queryRunner.query("DROP TABLE `like`");
        await queryRunner.query("DROP TABLE `comment`");
        await queryRunner.query("DROP INDEX `REL_9466682df91534dd95e4dbaa61` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `profile`");
        await queryRunner.query("DROP TABLE `subscription`");
        await queryRunner.query("DROP TABLE `Photo`");
    }

}
