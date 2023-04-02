import { ErrorResponseStatus } from "../ErrorResponseStatus";

export interface Signup {
  name: string;
  email: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  message: string;
  status: ErrorResponseStatus;
}
