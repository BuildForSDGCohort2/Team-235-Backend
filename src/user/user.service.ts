import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import bcrypt from "bcrypt";
import { UserRepository } from './user.repository';
import { User } from './user.model';
import { MessageUtil } from 'src/shared/util/message.util';
import { ValidationUtil } from 'src/shared/util/validation.util';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async createUser(currentUser: User, dto: CreateUserDTO) {

        if (!(dto.firstName && dto.lastName && dto.email && dto.password)) {
            throw new BadRequestException(MessageUtil.INVALID_REQUEST_DATA);
        }

        const errors: Record<string, string> = {};

        if (!ValidationUtil.isValidName(dto.firstName)) {
            errors["firstName"] = MessageUtil.INVALID_FIRST_NAME;
        }

        if (!ValidationUtil.isValidName(dto.lastName)) {
            errors["lastName"] = MessageUtil.INVALID_LAST_NAME;
        }

        if (!ValidationUtil.isValidEmail(dto.email)) {
            errors["email"] = MessageUtil.INVALID_EMAIL_ADDRESS;
        }

        if (!ValidationUtil.isValidPassword(dto.password)) {
            errors["password"] = MessageUtil.INVALID_PASSWORD;
        }

        if (Object.keys(errors).length) {
            throw new BadRequestException(errors);
        }

        if (await this.userRepository.findByEmail(dto.email)) {
            throw new ConflictException(MessageUtil.USER_ALREADY_EXISTS)
        }

        const newUser = new User();
        newUser.firstName = dto.firstName;
        newUser.lastName = dto.lastName;
        newUser.email = dto.email;
        newUser.password = await bcrypt.hash(dto.password, 10);
        newUser.createdBy = currentUser;

        console.log(newUser);

        //TODO: Send email via sendgrid or similar.

        return await this.userRepository.save(newUser);
    }


    async getProfile(id: string): Promise<User> {
        return await this.userRepository.find(id);
    }

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }
}
