import { Prisma } from '@prisma/client';
export declare class ChannelDto {
    id: string;
    accountId: string;
    name: string;
    metadata: Prisma.JsonValue;
    configuration: Prisma.JsonValue;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<ChannelDto>);
}
