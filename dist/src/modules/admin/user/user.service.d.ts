import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
export declare class UserService {
    private readonly request;
    private prisma;
    constructor(request: any, prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(id: string): Promise<UserDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto>;
    remove(id: number): string;
}
