import { PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
export declare class AccountIdPipe implements PipeTransform {
    private readonly prisma;
    private readonly request;
    constructor(prisma: PrismaService, request: any);
    transform(value: any): Promise<any>;
}
