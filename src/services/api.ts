import { SignInCredentials } from "../contexts";
import mocksData from "../__mocks__/fileMock";

export type TreeViewItem = {
  key: string;
  name: string;
  children?: TreeViewItem[];
}

export type ResponseError = {
  status: number;
  data?: undefined;
  message: string;
}

export type ResponseSuccess<T> = {
  status: number;
  data: T;
}

const fakeFetch = function<T, U> (condition:boolean, successObject:T, errorObject:U):Promise<T|U> {
  const min = 500;
  const max = 3000;
  const fDelay = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise(async (resolve, reject) => {
    try {
      setTimeout(() => (
        condition ? resolve(successObject): reject(errorObject)
      ), fDelay);
    } catch (error) {
      return reject(error);
    }
  });
}

export default {
  login: async function(credentials: SignInCredentials):Promise<ResponseSuccess<string>|ResponseError> {
    return await fakeFetch(
      !!(credentials?.login?.length && credentials?.password?.length),
      {status: 200, data: credentials?.login},
      {status: 401, message: "Unauthorized"}
    );
  },
  getData: async function():Promise<ResponseSuccess<TreeViewItem[]>|ResponseError> {
    return await fakeFetch(
      true,
      {status: 200, data: mocksData},
      {status: 400, message: "Unknown"}
    );
  },
}
