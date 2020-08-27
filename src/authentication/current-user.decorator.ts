import { createParamDecorator, Req, ExecutionContext } from "@nestjs/common";
import { User } from "../user/user.model";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User;
  },
);

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
