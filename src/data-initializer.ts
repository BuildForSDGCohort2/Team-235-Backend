import moment from "moment";
import _ from "lodash";
import bcrypt from "bcrypt";
import {User} from "./user/user.model";
import { Role } from "./role/role.model";
import { Permission } from "./role/permission.model";
import { Model } from "objection";

export class DataInitializer {

    static async init(){

        const transaction = await Model.startTransaction();
        try{

            const permissions = await Permission.query();

            if(!(await Role.query()).length){
                const role = new Role();
                role.name = "Super Administrator",
                role.permissions = permissions;
                await Role.query().upsertGraph(role, {relate: true});
            }
    
            let user = await User.query().findOne({
                email: "admin@gmail.com"
            })
            .withGraphFetched("*")
            .orderBy("createdAt", "ASC");
    
            if(!user){
                user = new User();
                user.firstName = "Admin";
                user.lastName = "Admin";
                user.email = "admin@gmail.com";
                user.roles = await Role.query();
                user.verifiedAt = moment().toISOString();
                user.password = await bcrypt.hash(String(process.env.ADMIN_SEEDER_PASSWORD), 10);

                await User.query().upsertGraph(user, {
                    relate: true,
                    noUpdate: true,
                    noDelete: true
                });
            }
            else{
                const superAdminRole = user.roles[0];
                if(superAdminRole.permissions.length !== permissions.length){
                    user.roles[0].permissions = superAdminRole.permissions.concat(
                        _.differenceBy(permissions, superAdminRole.permissions, "id")
                    );
                }

                await Role.query().upsertGraph(superAdminRole, {relate: true});
            }

            transaction.commit();
        }catch(e){
            transaction.rollback();
        }
    }

}