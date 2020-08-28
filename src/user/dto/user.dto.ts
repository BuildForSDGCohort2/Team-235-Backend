import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("User")
export class UserDTO {

    constructor(data: {
        id: string,
        firstName: string,
        lastName: string,
        imageUrl: string,
        email: string,
        phoneNumber?: string,
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
    imageUrl: string

    @Field()
    email: string

    @Field({
        nullable: true
    })
    phoneNumber: string

    @Field()
    blocked: boolean

    @Field()
    isVerified: boolean

    @Field()
    createdAt: number
}