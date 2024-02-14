import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const UserId = createParamDecorator((_data : unknown, context : ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return Number(request.user.id)
})