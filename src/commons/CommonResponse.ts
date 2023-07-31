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
      return {
        status: 200,
        message: 'Success',
        data: res,
      };
    })
    .catch((err) => {
      return {
        status: 500,
        message: err,
        data: null,
      };
    });
}
