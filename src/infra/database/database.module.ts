import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaPartnersRepository } from './prisma/repositories/prisma-partners-repository'

@Module({
  providers: [PrismaService, PrismaPartnersRepository],
  exports: [PrismaService],
})
export class DatabaseModule {}
