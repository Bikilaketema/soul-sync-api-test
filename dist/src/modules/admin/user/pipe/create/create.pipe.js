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
exports.CreatePipe = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let CreatePipe = class CreatePipe {
    constructor(prisma, request) {
        this.prisma = prisma;
        this.request = request;
    }
    async transform(value) {
        const user = this.request.user;
        if (!value.accountId) {
            throw new Error('accountId: Account id is required!');
        }
        const account = await this.prisma.account.findFirst({
            where: {
                AccountUser: { some: { userId: user.id, accountId: value.accountId } },
            },
        });
        if (!account) {
            throw new Error('Account not found!');
        }
        return value;
    }
};
exports.CreatePipe = CreatePipe;
exports.CreatePipe = CreatePipe = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('REQUEST')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], CreatePipe);
//# sourceMappingURL=create.pipe.js.map