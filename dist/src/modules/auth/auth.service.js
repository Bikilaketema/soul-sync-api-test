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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const user_dto_1 = require("../admin/user/dto/user.dto");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signIn(signInUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: signInUserDto.email },
        });
        if (!user) {
            throw new Error('User not found');
        }
        if (!(await bcrypt.compare(signInUserDto.password, user.password))) {
            throw new Error('Invalid password');
        }
        const token = await this.jwtService.signAsync(user, {
            secret: process.env.JWT_SECRET,
        });
        const roles = await this.prisma.role.findMany({
            where: { AccountUser: { some: { userId: user.id } } },
        });
        return {
            token,
            user: { ...user, roles: roles.map((role) => role.id) },
        };
    }
    async signUp(signUpUserDto) {
        const user = await this.signInOrUp(signUpUserDto);
        if (!user) {
            throw new Error('User not found');
        }
        const token = await this.jwtService.signAsync(user, {
            secret: process.env.JWT_SECRET,
        });
        return {
            token,
            user: new user_dto_1.UserDto(user),
        };
    }
    async signInOrUp(signUpUserDto) {
        const { email, name, password } = signUpUserDto;
        const user = await this.prisma.user.findFirst({ where: { email } });
        if (user) {
            return user;
        }
        return this.prisma.$transaction(async (tx) => {
            const account = await tx.account.create({
                data: { name },
            });
            if (!account) {
                throw new Error('Failed to create account');
            }
            const role = await tx.role.findFirst({
                where: {
                    type: client_1.RoleType.OWNER,
                    isDefault: true,
                },
            });
            if (!role) {
                throw new Error('Default owner role not found');
            }
            const hashedPassword = await bcrypt.hash(password, AuthService_1.saltRounds);
            return tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    accountUser: {
                        create: {
                            accountId: account.id,
                            roleId: role.id,
                            isDeleted: false,
                        },
                    },
                },
            });
        });
    }
    async getUserIfRefreshTokenMatches(email) {
        let user = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: { email: email, name: email, password: '' },
            });
        }
        return { userId: email };
    }
    async getUserRoles(userId) {
        return this.prisma.role.findMany({
            where: { AccountUser: { some: { userId } } },
        });
    }
    async getUserAccounts(userId) {
        return this.prisma.accountUser.findMany({
            where: { userId },
            include: { account: true },
        });
    }
};
exports.AuthService = AuthService;
AuthService.saltRounds = 10;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map