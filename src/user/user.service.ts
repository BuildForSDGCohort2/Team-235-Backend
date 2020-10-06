import { Injectable, BadRequestException, ConflictException } from "@nestjs/common";
import _ from "lodash";
import bcrypt from "bcrypt";
import { UserRepository } from "./user.repository";
import { User } from "./user.model";
import { MessageUtil } from "../shared/util/message.util";
import { ValidationUtil } from "../shared/util/validation.util";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Role } from "src/role/role.model";
import { RoleRepository } from "src/role/role.repository";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository
    ) { }

    async createUser(currentUser: User, dto: CreateUserDTO) {

        if (!(dto.firstName && dto.lastName && dto.email && dto.password && dto.roleIds.length)) {
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

        if(dto.phoneNumber && !ValidationUtil.isValidPhoneNumber(dto.phoneNumber)){
            errors["phoneNumber"] = MessageUtil.INVALID_PHONE_NUMBER;
        }

        if (Object.keys(errors).length) {
            throw new BadRequestException(errors);
        }

        if (await this.userRepository.findByEmail(dto.email)) {
            throw new ConflictException(MessageUtil.USER_ALREADY_EXISTS);
        }

        const newUser = new User();
        newUser.firstName = dto.firstName;
        newUser.lastName = dto.lastName;
        newUser.email = dto.email;
        newUser.password = await bcrypt.hash(dto.password, 10);
        newUser.createdBy = currentUser;
        newUser.roles = await Promise.all(dto.roleIds.map((roleId) => {
            return this.roleRepository.find(roleId) ;
        }));
        if(dto.phoneNumber){
            newUser.phoneNumber = dto.phoneNumber;
        }

        //TODO: Send confirmation email to user.

        return await this.userRepository.save(newUser);
    }

    async updateUser(currentUser: User, dto: UpdateUserDTO): Promise<User> {
        const user = await this.userRepository.find(dto.id)
        if(!user){
            throw new BadRequestException(MessageUtil.USER_NOT_FOUND);
        }

        if(user.id != currentUser.id){
            user.updatedBy = currentUser;
        }

        return await this.userRepository.save(
            _.merge(user, dto)
        )
    }

    async getUsers(): Promise<User[]>{
        return await this.userRepository.findAll();
    }

    async getProfile(id: string): Promise<User> {
        return await this.userRepository.find(id);
    }

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async assignRolesToUser(roleIds: number[], user: User){
        
    }

    async removeRolesFromUser(roleIds: number[], user: User){}
}
