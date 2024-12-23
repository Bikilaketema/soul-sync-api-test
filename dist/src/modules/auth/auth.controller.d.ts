import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-auth.dto';
import { SignUpUserDto } from './dto/sign-up-auth.dto';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    signIn(signInUserDto: SignInUserDto): Promise<AuthDto>;
    signUp(signUpUserDto: SignUpUserDto): Promise<AuthDto>;
}
