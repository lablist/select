import { SignInCredentials } from "../contexts";
import mocksData from "../__mocks__/fileMock";

export type FakeResponse = {
  status: number;
  data?: unknown;
  message?: string;
}

const fakeFetch = function (condition:boolean, successObject:FakeResponse, errorObject:FakeResponse):Promise<FakeResponse> {
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
  login: async function(credentials: SignInCredentials): Promise<FakeResponse> {
    return await fakeFetch(
      !!(credentials?.login?.length && credentials?.password?.length),
      {status: 200, data: credentials?.login},
      {status: 401, message: "Unauthorized"}
    );
  },
  getData: async function(): Promise<FakeResponse> {
    return await fakeFetch(
      true,
      {status: 200, data: mocksData},
      {status: 400, message: "Unknown"}
    );
  },
}
