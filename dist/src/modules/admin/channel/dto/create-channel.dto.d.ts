import { Prisma } from '@prisma/client';
export declare class CreateChannelDto {
    accountId: string;
    name: string;
    metadata: Prisma.JsonValue;
    configuration: Prisma.JsonValue;
}
