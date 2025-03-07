import { supabase } from './supabase';
import type { RSVPResponse } from '@/types/supabase';

/**
 * Submit an RSVP response to Supabase
 */
export async function submitRSVP(data: Omit<RSVPResponse, 'id' | 'created_at'>) {
  console.log('Submitting RSVP to Supabase:', data);
  console.log('Supabase client:', supabase);
  
  try {
    const { data: responseData, error } = await supabase
      .from('rsvp_responses')
      .insert([data])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
    }
    
    console.log('RSVP submitted successfully:', responseData);
    return { success: true, data: responseData };
  } catch (err) {
    console.error('Error in submitRSVP:', err);
    throw err;
  }
}

/**
 * Get all RSVP responses (for admin purposes)
 */
export async function getRSVPResponses() {
  try {
    const { data, error } = await supabase
      .from('rsvp_responses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching RSVP responses:', error);
      throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
    }
    
    return data as RSVPResponse[];
  } catch (err) {
    console.error('Error in getRSVPResponses:', err);
    throw err;
  }
} 