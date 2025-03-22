export interface IUserCreationDto {
  username: string | null | undefined;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface IUserUpdateDto {
  username: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface IUserDto {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface IUserLoginDto {
  email: string;
  password: string;
}
