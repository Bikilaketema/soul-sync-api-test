"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.role.createMany({
        data: [
            {
                name: 'Owner',
                type: client_1.RoleType.OWNER,
                isDefault: true,
            },
            {
                name: 'Mentor',
                type: client_1.RoleType.MENTOR,
                isDefault: true,
            },
        ],
        skipDuplicates: true,
    });
    console.log('Roles seeded!');
}
main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map