/*
  Warnings:

  - You are about to drop the column `status` on the `Cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `status`;

-- CreateTable
CREATE TABLE `Relacionamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `ativoId` INTEGER NOT NULL,

    UNIQUE INDEX `Relacionamento_clienteId_ativoId_key`(`clienteId`, `ativoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Relacionamento` ADD CONSTRAINT `Relacionamento_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relacionamento` ADD CONSTRAINT `Relacionamento_ativoId_fkey` FOREIGN KEY (`ativoId`) REFERENCES `Ativo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
