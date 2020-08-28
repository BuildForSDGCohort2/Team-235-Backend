import { createParamDecorator, Req, ExecutionContext } from "@nestjs/common";
import { User } from "../user/user.model";


export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user as User,
);
