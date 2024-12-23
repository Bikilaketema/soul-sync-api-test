import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ChannelDto } from './dto/channel.dto';
export declare class ChannelService {
    private readonly request;
    private prisma;
    constructor(request: any, prisma: PrismaService);
    create(createChannelDto: CreateChannelDto, accountId: any): Promise<ChannelDto>;
    findAll(accountId: string): Promise<ChannelDto[]>;
    findOne(id: string, accountId: string): Promise<ChannelDto>;
    update(id: string, updateChannelDto: UpdateChannelDto): Promise<ChannelDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
