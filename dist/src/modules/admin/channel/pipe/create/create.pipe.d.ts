import { PipeTransform } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateChannelDto } from 'src/modules/admin/channel/dto/create-channel.dto';
export declare class CreateChannelPipe implements PipeTransform {
    private readonly request;
    private readonly prisma;
    private readonly jwtService;
    constructor(request: any, prisma: PrismaService, jwtService: JwtService);
    transform(value: CreateChannelDto): Promise<CreateChannelDto>;
}
