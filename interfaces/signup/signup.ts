export interface Signup {
  name: string;
  email: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  message: string;
  status: SignupResponseStatus;
}

export enum SignupResponseStatus {
  error = "error",
  success = "success",
}
