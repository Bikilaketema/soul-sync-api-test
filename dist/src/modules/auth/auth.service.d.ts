import { SignInUserDto } from './dto/sign-in-auth.dto';
import { SignUpUserDto } from './dto/sign-up-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    static readonly saltRounds = 10;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signIn(signInUserDto: SignInUserDto): Promise<AuthDto>;
    signUp(signUpUserDto: SignUpUserDto): Promise<AuthDto>;
    signInOrUp(signUpUserDto: SignUpUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        imageUrl: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserIfRefreshTokenMatches(email: string): Promise<{
        userId: string;
    }>;
    getUserRoles(userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
        type: import(".prisma/client").$Enums.RoleType;
        accountId: string | null;
    }[]>;
    getUserAccounts(userId: string): Promise<({
        account: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        isDeleted: boolean;
        roleId: string;
        userId: string;
    })[]>;
}
