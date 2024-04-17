-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatarUUID` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_avatarUUID_fkey` FOREIGN KEY (`avatarUUID`) REFERENCES `File`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
