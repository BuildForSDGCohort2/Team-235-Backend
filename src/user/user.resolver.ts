import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/authentication/gql.auth.guard';
import { CurrentUser } from 'src/authentication/current-user.decorator';
import { User } from './user.model';
import { UserMapper } from './user.mapper';

@Resolver('User')
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
    async createUser(@Args("data") dto: CreateUserDTO){
        return await this.userService.createUser(null, dto);
    }

}
