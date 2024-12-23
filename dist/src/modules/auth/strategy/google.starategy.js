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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_service_1 = require("../auth.service");
const jwt_1 = require("@nestjs/jwt");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(authService, jwtService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
        });
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { name, emails, photos } = profile;
        try {
            const user = await this.authService.signInOrUp({
                email: emails[0].value,
                name: name.givenName,
                password: emails[0].value,
                imageUrl: photos[0].value,
            });
            const roles = await this.authService.getUserRoles(user.id);
            const accounts = await this.authService.getUserAccounts(user.id);
            const payload = {
                sub: user.id,
                email: user.email,
                imageUrl: user.imageUrl,
                accounts: accounts.map((acc) => ({
                    id: acc.account.id,
                    name: acc.account.name,
                })),
                roles: roles.map((role) => role.type),
            };
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
            });
            done(null, token);
        }
        catch (error) {
            done(error, false);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], GoogleStrategy);
//# sourceMappingURL=google.starategy.js.map