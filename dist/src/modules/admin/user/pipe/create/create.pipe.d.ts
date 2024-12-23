import { PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
export declare class CreatePipe implements PipeTransform {
    private readonly prisma;
    private readonly request;
    constructor(prisma: PrismaService, request: any);
    transform(value: CreateUserDto): Promise<CreateUserDto>;
}
