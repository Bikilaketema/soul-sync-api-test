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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_dto_1 = require("./dto/user.dto");
const core_1 = require("@nestjs/core");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../../auth/auth.service");
let UserService = class UserService {
    constructor(request, prisma) {
        this.request = request;
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, auth_service_1.AuthService.saltRounds);
        const userData = await this.prisma.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                password: hashedPassword,
                accountUser: {
                    create: {
                        accountId: createUserDto.accountId,
                        roleId: createUserDto.roleId,
                        isDeleted: false
                    },
                },
            },
        });
        return new user_dto_1.UserDto(userData);
    }
    async findAll() {
        const user = this.request.user;
        const users = await this.prisma.user.findMany({
            where: { accountUser: { some: { userId: user.id } } },
        });
        return users.map((user) => new user_dto_1.UserDto(user));
    }
    async findOne(id) {
        const user = this.request.user;
        const userData = await this.prisma.user.findFirst({
            where: { id, accountUser: { some: { userId: user.id } } },
        });
        if (!userData) {
            throw new Error('User not found');
        }
        return new user_dto_1.UserDto(userData);
    }
    async update(id, updateUserDto) {
        const user = this.request.user;
        const userData = await this.prisma.user.update({
            where: { id, accountUser: { some: { userId: user.id } } },
            data: updateUserDto,
        });
        if (!userData) {
            throw new Error('User not found');
        }
        return new user_dto_1.UserDto(userData);
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map