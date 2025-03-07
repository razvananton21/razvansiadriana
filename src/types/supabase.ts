export type RSVPResponse = {
  id?: number;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  attending: boolean;
  vegetarian_menu: boolean;
  bringing_plus_one: boolean;
  message?: string;
  created_at?: string;
}; 