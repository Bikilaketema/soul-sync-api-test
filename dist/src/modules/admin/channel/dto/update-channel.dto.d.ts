import { Prisma } from '@prisma/client';
export declare class UpdateChannelDto {
    name: string;
    metadata: Prisma.JsonValue;
    configuration: Prisma.JsonValue;
}
