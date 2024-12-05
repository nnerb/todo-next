export interface UserProps {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  address: {
    city: string
    state: string
  }
}

export interface RegisterProps {
  name?: string;
  email: string;
  password: string;
}
