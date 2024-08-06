/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const RawHeader = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        let req = ctx.switchToHttp().getRequest();
        return req.rawHeaders
    }
)