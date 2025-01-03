import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./dto/user.dto").UserDto>;
    findAll(): Promise<import("./dto/user.dto").UserDto[]>;
    findOne(id: string): Promise<import("./dto/user.dto").UserDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./dto/user.dto").UserDto>;
    remove(id: string): string;
}
