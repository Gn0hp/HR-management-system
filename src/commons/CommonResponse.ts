import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

export interface ICommonResponse {
  status: number;
  message: string;
  data: any;
}

export async function commonResponse(
  data: Promise<any>,
): Promise<ICommonResponse> {
  return await data
    .then((res) => {
      return <CommonResponse>{
        status: 200,
        time: new Date(),
        message: 'Success',
        data: res,
      };
    })
    .catch((err) => {
      return {
        status: 500,
        time: new Date(),
        message: err,
        data: null,
      };
    });
}
export interface CommonResponse {
  status: number;
  message: string;
  time: Date;
  data: any;
}
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(
        (data) =>
          <CommonResponse>{
            status: HttpStatus.OK,
            message: 'Success',
            time: new Date(),
            data,
          },
      ),
      catchError((err) => {
        if (err instanceof HttpException) {
          return Promise.resolve(<CommonResponse>{
            status: err.getStatus(),
            message: err.message,
            time: new Date(),
            data: null,
          });
        }
        return Promise.resolve(<CommonResponse>{
          status: 500,
          time: new Date(),
          message: err.message,
          data: null,
        });
      }),
    );
  }
}
