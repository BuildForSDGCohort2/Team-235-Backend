import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("User")
export class UserDTO {

    constructor(data: {
        id: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string,
        blocked: boolean,
        isVerified: boolean,
        createdAt: number
    }){
        Object.assign(this, data)
    }

    @Field()
    id: string

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field({
        nullable: true
    })
    phoneNumber: string

    @Field()
    email: string

    @Field()
    blocked: boolean

    @Field()
    isVerified: boolean

    @Field()
    createdAt: number
}