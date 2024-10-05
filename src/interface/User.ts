import Role from "./Role";

export default interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  phone: string;
  address: string;
  gender: string;
  created_at: string;
  updated_at: string;
  roles: Role | null;
  device_id: string | null;
  permission: Array<string> | null;
  active: boolean;
  first_name: string;
  last_name: string;
}
