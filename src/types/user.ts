export type SignUpDTO = {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
};
