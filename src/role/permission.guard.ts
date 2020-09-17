import { Injectable, CanActivate, ExecutionContext, mixin, ForbiddenException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql/dist/services/gql-execution-context";
import { Role } from "./role.model";
import { Permission } from "./permission.model";
import { MessageUtil } from "src/shared/util/message.util";

export const PermissionGuard = (permissions: string[]) => {
    class RoleGuardMixin implements CanActivate {
      canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const roles: Role[]= request.user.roles;
        let permissionValues: string[] = roles.flatMap((role) => {
            return role.permissions.map((permission) => {
                return permission.value;
            });
        });

        permissionValues = [...new Set(permissionValues)];
        if(!permissions.every((value) => permissionValues.indexOf(value) > -1)){
            throw new ForbiddenException(MessageUtil.PERMISSION_DENIED);
        }

        return true;
      }
    }
  
    const guard = mixin(RoleGuardMixin);
    return guard;
  };