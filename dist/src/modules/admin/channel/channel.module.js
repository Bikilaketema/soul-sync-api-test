"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModule = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("./channel.service");
const channel_controller_1 = require("./channel.controller");
const prisma_service_1 = require("../../prisma/prisma.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const auth_module_1 = require("../../auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
let ChannelModule = class ChannelModule {
};
exports.ChannelModule = ChannelModule;
exports.ChannelModule = ChannelModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule, jwt_1.JwtModule],
        controllers: [channel_controller_1.ChannelController],
        providers: [channel_service_1.ChannelService, prisma_service_1.PrismaService],
        exports: [channel_service_1.ChannelService],
    })
], ChannelModule);
//# sourceMappingURL=channel.module.js.map