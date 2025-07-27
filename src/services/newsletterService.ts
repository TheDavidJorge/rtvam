
import { newsletterService } from './supabaseService';

// Subscribe to newsletter
export const subscribeToNewsletter = async (email: string, name?: string): Promise<string> => {
  try {
    return await newsletterService.subscribe(email, name);
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

// Unsubscribe from newsletter (optional function for future use)
export const unsubscribeFromNewsletter = async (email: string): Promise<void> => {
  try {
    // This would implement unsubscribe logic
    console.log('Unsubscribe functionality to be implemented', email);
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    throw error;
  }
};

// Get all newsletter subscribers (admin function)
export const getNewsletterSubscribers = async (): Promise<any[]> => {
  try {
    // This would implement getting all subscribers for admin purposes
    console.log('Get subscribers functionality to be implemented');
    return [];
  } catch (error) {
    console.error('Error getting newsletter subscribers:', error);
    throw error;
  }
};
