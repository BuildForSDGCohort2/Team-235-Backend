import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserDTO } from "./dto/user.dto";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../authentication/gql.auth.guard";
import { CurrentUser } from "../authentication/current-user.decorator";
import { User } from "./user.model";
import { UserMapper } from "./user.mapper";
import { PermissionGuard } from "src/role/permission.guard";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Resolver(() => UserDTO)
export class UserResolver {

    constructor(
        private readonly userService: UserService,
        private readonly userMapper: UserMapper
    ) { }

    @Query(() => UserDTO)
    @UseGuards(GqlAuthGuard)
    whoAmI(@CurrentUser() currentUser: User): UserDTO {
        return this.userMapper.mapFromModel(currentUser);
    }

    @Query(() => [UserDTO])
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["users.read"])
    )
    async getUsers() {
        return (await this.userService.getUsers()).map((user) => {
            return this.userMapper.mapFromModel(user);
        });
    }

    @Query(() => UserDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["users.read"])
    )
    async getUserById(@Args("id") id: string) {
        const user = await this.userService.getProfile(id);
        return this.userMapper.mapFromModel(user);
    }

    @Mutation(() => UserDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["users.create"])
    )
    async createUser(@Args("data") dto: CreateUserDTO, @CurrentUser() currentUser: User) {
        const createdUser = await this.userService.createUser(currentUser, dto);
        return this.userMapper.mapFromModel(createdUser);
    }

    @Mutation(() => UserDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["users.update"])
    )
    async updateUser(@Args("data") dto: UpdateUserDTO, @CurrentUser() currentUser: User){
        const updatedUser = await this.userService.updateUser(currentUser, dto);
        return this.userMapper.mapFromModel(updatedUser);
    }

}
