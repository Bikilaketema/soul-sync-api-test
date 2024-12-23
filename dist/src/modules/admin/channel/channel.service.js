"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const core_1 = require("@nestjs/core");
const channel_dto_1 = require("./dto/channel.dto");
let ChannelService = class ChannelService {
    constructor(request, prisma) {
        this.request = request;
        this.prisma = prisma;
    }
    async create(createChannelDto, accountId) {
        const channelData = await this.prisma.channel.create({
            data: {
                name: createChannelDto.name,
                accountId: accountId,
                metadata: typeof createChannelDto.metadata === 'string'
                    ? JSON.parse(createChannelDto.metadata)
                    : createChannelDto.metadata,
                configuration: typeof createChannelDto.configuration === 'string'
                    ? JSON.parse(createChannelDto.configuration)
                    : createChannelDto.configuration,
                isDeleted: false,
            },
        });
        return new channel_dto_1.ChannelDto(channelData);
    }
    async findAll(accountId) {
        if (!accountId) {
            throw new Error('accountId is required');
        }
        const channels = await this.prisma.channel.findMany({
            where: {
                accountId: accountId,
                isDeleted: false,
            }
        });
        return channels.map((channel) => new channel_dto_1.ChannelDto(channel));
    }
    async findOne(id, accountId) {
        const channel = await this.prisma.channel.findFirst({
            where: {
                id,
                accountId,
                isDeleted: false,
            },
        });
        if (!channel) {
            throw new common_1.NotFoundException(`Channel with id ${id} not found`);
        }
        return new channel_dto_1.ChannelDto(channel);
    }
    async update(id, updateChannelDto) {
        try {
            const channel = await this.prisma.channel.update({
                where: { id },
                data: {
                    name: updateChannelDto.name,
                    metadata: typeof updateChannelDto.metadata === 'string'
                        ? JSON.parse(updateChannelDto.metadata)
                        : updateChannelDto.metadata,
                    configuration: typeof updateChannelDto.configuration === 'string'
                        ? JSON.parse(updateChannelDto.configuration)
                        : updateChannelDto.configuration,
                    isDeleted: false,
                },
            });
            if (!channel) {
                throw new common_1.NotFoundException(`Channel with id ${id} not found`);
            }
            return new channel_dto_1.ChannelDto(channel);
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Channel with id ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        const channel = await this.prisma.channel.update({
            where: { id },
            data: { isDeleted: true },
        });
        if (!channel) {
            throw new common_1.NotFoundException(`Channel with id ${id} not found`);
        }
        return { message: 'Channel deleted successfully' };
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map