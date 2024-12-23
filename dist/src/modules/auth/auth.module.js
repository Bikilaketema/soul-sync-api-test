"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const prisma_module_1 = require("../prisma/prisma.module");
const google_starategy_1 = require("./strategy/google.starategy");
const refresh_strategy_1 = require("./strategy/refresh.strategy");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./guard/auth/auth.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            google_starategy_1.GoogleStrategy,
            refresh_strategy_1.RefreshStrategy,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
            auth_guard_1.AuthGuard,
        ],
        exports: [passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map