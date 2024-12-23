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
exports.ChannelController = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("./channel.service");
const create_channel_dto_1 = require("./dto/create-channel.dto");
const update_channel_dto_1 = require("./dto/update-channel.dto");
const create_pipe_1 = require("./pipe/create/create.pipe");
const auth_guard_1 = require("../../auth/guard/auth/auth.guard");
const auth_decorator_1 = require("../../auth/auth.decorator");
const exractId_1 = require("./utility/exractId");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let ChannelController = class ChannelController {
    constructor(channelService, jwtService, prisma) {
        this.channelService = channelService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    create(createChannelDto, request) {
        return this.channelService.create(createChannelDto, request.accountId);
    }
    async findAll(request) {
        const token = request.headers.authorization?.split(' ')[1];
        const { accountId } = await (0, exractId_1.extractAccountIdFromToken)(token, this.jwtService, this.prisma);
        if (!accountId) {
            throw new common_1.NotFoundException('No accountId provided');
        }
        return this.channelService.findAll(accountId);
    }
    async findOne(id, request) {
        const token = request.headers.authorization?.split(' ')[1];
        const { accountId } = await (0, exractId_1.extractAccountIdFromToken)(token, this.jwtService, this.prisma);
        if (!accountId) {
            throw new common_1.NotFoundException('No accountId provided');
        }
        const channel = await this.channelService.findOne(id, accountId);
        if (channel.accountId !== accountId) {
            throw new common_1.NotFoundException('Channel not found for this account');
        }
        return channel;
    }
    update(id, updateChannelDto) {
        return this.channelService.update(id, updateChannelDto);
    }
    remove(id) {
        return this.channelService.remove(id);
    }
};
exports.ChannelController = ChannelController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(create_pipe_1.CreateChannelPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channel_dto_1.CreateChannelDto, Object]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_channel_dto_1.UpdateChannelDto]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "remove", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)('admin/channel'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, auth_decorator_1.Roles)('ADMIN'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], ChannelController);
//# sourceMappingURL=channel.controller.js.map