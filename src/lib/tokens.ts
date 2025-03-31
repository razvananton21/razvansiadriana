import { supabase } from './supabase';
import type { InvitationToken } from '@/types/supabase';

/**
 * Create a new invitation token
 */
export async function createInvitationToken(inviteeName: string, token: string): Promise<InvitationToken> {
  try {
    const tokenData = {
      token,
      invitee_name: inviteeName,
      is_viewed: false,
      is_completed: false
    };
    
    const { data, error } = await supabase
      .from('invitation_tokens')
      .insert([tokenData])
      .select();
    
    if (error) {
      console.error('Error creating invitation token:', error);
      throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
    }
    
    return data?.[0] as InvitationToken;
  } catch (err) {
    console.error('Error in createInvitationToken:', err);
    throw err;
  }
}

/**
 * Get all invitation tokens
 */
export async function getInvitationTokens(): Promise<InvitationToken[]> {
  try {
    const { data, error } = await supabase
      .from('invitation_tokens')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching invitation tokens:', error);
      throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
    }
    
    return data as InvitationToken[];
  } catch (err) {
    console.error('Error in getInvitationTokens:', err);
    throw err;
  }
}

/**
 * Mark a token as viewed
 */
export async function markTokenAsViewed(token: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('invitation_tokens')
      .update({ 
        is_viewed: true,
        viewed_at: new Date().toISOString()
      })
      .eq('token', token);
    
    if (error) {
      console.error('Error marking token as viewed:', error);
      throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
    }
  } catch (err) {
    console.error('Error in markTokenAsViewed:', err);
    throw err;
  }
}

/**
 * Mark a token as completed
 */
export async function markTokenAsCompleted(token: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('invitation_tokens')
      .update({ 
        is_completed: true,
        completed_at: new Date().toISOString()
      })
      .eq('token', token);
    
    if (error) {
      console.error('Error marking token as completed:', error);
      throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
    }
  } catch (err) {
    console.error('Error in markTokenAsCompleted:', err);
    throw err;
  }
}

/**
 * Validate if a token exists and get its status
 */
export async function validateToken(token: string): Promise<{ valid: boolean; token?: InvitationToken & { response?: any } }> {
  try {
    // First get the token
    const { data, error } = await supabase
      .from('invitation_tokens')
      .select('*')
      .eq('token', token)
      .maybeSingle();
    
    if (error) {
      console.error('Error validating token:', error);
      return { valid: false };
    }
    
    if (!data) {
      return { valid: false };
    }
    
    // If we have a token, check if there's an associated response
    const { data: responseData } = await supabase
      .from('rsvp_responses')
      .select('*')
      .eq('invitation_token', token)
      .maybeSingle();
    
    // Return both the token and its associated response
    return { 
      valid: true,
      token: { 
        ...data as InvitationToken,
        response: responseData || undefined
      }
    };
  } catch (err) {
    console.error('Error in validateToken:', err);
    return { valid: false };
  }
}

/**
 * Get all invitation tokens with their associated RSVP responses
 */
export async function getTokensWithResponses() {
  try {
    // First get all tokens
    const { data: tokens, error: tokensError } = await supabase
      .from('invitation_tokens')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (tokensError) {
      console.error('Error fetching invitation tokens:', tokensError);
      throw new Error(`Supabase error: ${tokensError.message} (Code: ${tokensError.code})`);
    }
    
    // Then get all responses
    const { data: responses, error: responsesError } = await supabase
      .from('rsvp_responses')
      .select('*');
    
    if (responsesError) {
      console.error('Error fetching RSVP responses:', responsesError);
      throw new Error(`Supabase error: ${responsesError.message} (Code: ${responsesError.code})`);
    }
    
    // Map responses to tokens
    const tokensWithResponses = tokens.map(token => {
      const matchingResponse = responses.find(response => response.invitation_token === token.token);
      return {
        ...token,
        response: matchingResponse || null
      };
    });
    
    return tokensWithResponses;
  } catch (err) {
    console.error('Error in getTokensWithResponses:', err);
    throw err;
  }
} 