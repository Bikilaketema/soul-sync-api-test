export declare class UserDto {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    roles: string[];
    constructor(partial: Partial<UserDto>);
}
