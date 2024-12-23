import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class ChannelController {
    private readonly channelService;
    private readonly jwtService;
    private readonly prisma;
    constructor(channelService: ChannelService, jwtService: JwtService, prisma: PrismaService);
    create(createChannelDto: CreateChannelDto, request: any): Promise<import("./dto/channel.dto").ChannelDto>;
    findAll(request: any): Promise<import("./dto/channel.dto").ChannelDto[]>;
    findOne(id: string, request: any): Promise<import("./dto/channel.dto").ChannelDto>;
    update(id: string, updateChannelDto: UpdateChannelDto): Promise<import("./dto/channel.dto").ChannelDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
