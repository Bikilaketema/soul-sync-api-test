import { UserDto } from 'src/modules/admin/user/dto/user.dto';
export declare class AuthDto {
    user: UserDto;
    token: string;
    constructor(partial: Partial<AuthDto>);
}
