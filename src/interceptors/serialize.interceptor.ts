import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // here I can run some code before the request reaches request handler
        // console.log("Before the handler ", context);
        return next.handle().pipe(
            map((data: ClassConstructor) => {
                // here I can run some code before the response is sent out
                // console.log("Before response is sent", data);
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        );
    }
}