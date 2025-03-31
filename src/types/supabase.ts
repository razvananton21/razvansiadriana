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
  invitation_token: string;
  used?: boolean;
  created_at?: string;
};

export type InvitationToken = {
  id?: number;
  token: string;
  invitee_name: string;
  is_viewed: boolean;
  is_completed: boolean;
  viewed_at?: string;
  completed_at?: string;
  created_at?: string;
}; 