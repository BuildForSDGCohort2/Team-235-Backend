import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/authentication/gql.auth.guard';
import { CurrentUser } from 'src/authentication/current-user.decorator';
import { User } from './user.model';
import { UserMapper } from './user.mapper';

@Resolver(() => UserDTO)
export class UserResolver {

    constructor(
        private readonly userService: UserService,
        private readonly userMapper: UserMapper
    ){}

    @Query(() => UserDTO)
    @UseGuards(GqlAuthGuard)
    whoAmI(@CurrentUser() currentUser: User): UserDTO {
      return this.userMapper.mapFromModel(currentUser);
    }

    @Mutation(() => UserDTO)
    @UseGuards(GqlAuthGuard)
    async createUser(@Args("data") dto: CreateUserDTO, @CurrentUser() currentUser: User){
        const createdUser = await this.userService.createUser(currentUser, dto);
        return this.userMapper.mapFromModel(createdUser);
    }

}
