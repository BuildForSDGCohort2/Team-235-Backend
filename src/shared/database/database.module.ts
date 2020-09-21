import { Module } from "@nestjs/common";
import { ObjectionModule } from "@willsoto/nestjs-objection"
import * as knexfile from "./knexfile";
import { User } from "src/user/user.model";

@Module({
    imports: [
        ObjectionModule.register({
            config: knexfile[process.env.NODE_ENV || "development"],
        })
    ]
})
export class DatabaseModule { }