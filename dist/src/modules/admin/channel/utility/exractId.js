"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAccountIdFromToken = extractAccountIdFromToken;
const common_1 = require("@nestjs/common");
async function extractAccountIdFromToken(token, jwtService, prisma) {
    if (!token) {
        throw new common_1.UnauthorizedException('Token not found');
    }
    let userId;
    let accountId;
    try {
        const decoded = jwtService.verify(token, { secret: process.env.JWT_SECRET });
        if (typeof decoded === 'string') {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        userId = decoded.sub;
        accountId = decoded.accounts[0].id;
    }
    catch (error) {
        throw new common_1.UnauthorizedException('Invalid token');
    }
    const account = await prisma.account.findFirst({
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
    return { userId, accountId };
}
//# sourceMappingURL=exractId.js.map