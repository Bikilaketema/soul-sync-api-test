import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
export declare function extractAccountIdFromToken(token: string, jwtService: JwtService, prisma: PrismaService): Promise<{
    userId: string;
    accountId: string;
}>;
