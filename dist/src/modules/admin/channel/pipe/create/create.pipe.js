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
exports.CreateChannelPipe = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const core_1 = require("@nestjs/core");
let CreateChannelPipe = class CreateChannelPipe {
    constructor(request, prisma, jwtService) {
        this.request = request;
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async transform(value) {
        const token = this.request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token not found');
        }
        let userId;
        let accountId;
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            if (typeof decoded === 'string') {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            userId = decoded.sub;
            accountId = decoded.accounts[0].id;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const account = await this.prisma.account.findFirst({
            where: {
                id: accountId,
                AccountUser: {
                    some: { userId: userId },
                },
            },
        });
        if (!account) {
            throw new common_1.UnauthorizedException('Account not found or user does not have access to this account!');
        }
        this.request.userId = userId;
        this.request.accountId = accountId;
        if (!value.name || value.name.trim() === '') {
            throw new common_1.BadRequestException('Channel name is required');
        }
        if (!value.configuration || typeof value.configuration !== 'string' || value.configuration.trim() === '') {
            throw new common_1.BadRequestException('Configuration is required and must be a non-empty JSON string');
        }
        if (!value.metadata || typeof value.metadata !== 'string' || value.metadata.trim() === '') {
            throw new common_1.BadRequestException('Metadata is required and must be a non-empty JSON string');
        }
        try {
            value.configuration = JSON.parse(value.configuration);
        }
        catch (error) {
            throw new common_1.BadRequestException('Configuration must be a valid JSON string');
        }
        try {
            value.metadata = JSON.parse(value.metadata);
        }
        catch (error) {
            throw new common_1.BadRequestException('Metadata must be a valid JSON string');
        }
        return value;
    }
};
exports.CreateChannelPipe = CreateChannelPipe;
exports.CreateChannelPipe = CreateChannelPipe = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService,
        jwt_1.JwtService])
], CreateChannelPipe);
//# sourceMappingURL=create.pipe.js.map