import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const CustomUser = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)