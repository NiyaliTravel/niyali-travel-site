import supabase from '../supabaseClient';
import { User } from '../types/user';

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

/**
 * Authenticate a user with email and password
 * @param email User's email
 * @param password User's password
 * @returns AuthResponse with user data or error message
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: 'No user data returned' };
    }

    // Get user role from database
    const { data: roleData, error: roleError } = await supabase
      .from('travelers')
      .select('id, name, profile_photo, tier_badge')
      .eq('id', data.user.id)
      .single();

    if (roleError) {
      // Try to get agent data
      const { data: agentData, error: agentError } = await supabase
        .from('agents')
        .select('id, name, company_name, profile_photo, tier_badge, commission_rate')
        .eq('id', data.user.id)
        .single();

      if (agentError) {
        // Try to get admin data
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('id, email, role')
          .eq('id', data.user.id)
          .single();

        if (adminError) {
          return { user: null, error: 'User not found in any role table' };
        }

        // Return admin user
        return {
          user: {
            id: adminData.id,
            name: 'Admin',
            email: adminData.email,
            role: 'admin',
            tierBadge: 'Admin',
          },
          error: null,
        };
      }

      // Return agent user
      return {
        user: {
          id: agentData.id,
          name: agentData.name,
          email: data.user.email || '',
          role: 'agent',
          profilePhoto: agentData.profile_photo,
          company: agentData.company_name,
          tierBadge: agentData.tier_badge,
        },
        error: null,
      };
    }

    // Return traveler user
    return {
      user: {
        id: roleData.id,
        name: roleData.name,
        email: data.user.email || '',
        role: 'traveler',
        profilePhoto: roleData.profile_photo,
        tierBadge: roleData.tier_badge,
      },
      error: null,
    };
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
};

/**
 * Register a new user
 * @param userData User registration data
 * @param password User's password
 * @param role User's role (traveler or agent)
 * @returns AuthResponse with user data or error message
 */
export const register = async (
  userData: Partial<User> & { email: string },
  password: string,
  role: 'traveler' | 'agent'
): Promise<AuthResponse> => {
  try {
    // Sign up with email and password
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: 'No user data returned' };
    }

    // Insert user data into appropriate table based on role
    if (role === 'traveler') {
      const { error: insertError } = await supabase.from('travelers').insert([
        {
          id: data.user.id,
          email: userData.email,
          name: userData.name,
          profile_photo: userData.profilePhoto,
          tier_badge: 'New Explorer',
        },
      ]);

      if (insertError) {
        return { user: null, error: insertError.message };
      }

      return {
        user: {
          id: data.user.id,
          name: userData.name || '',
          email: userData.email,
          role: 'traveler',
          profilePhoto: userData.profilePhoto,
          tierBadge: 'New Explorer',
        },
        error: null,
      };
    } else {
      // Agent registration
      const { error: insertError } = await supabase.from('agents').insert([
        {
          id: data.user.id,
          email: userData.email,
          name: userData.name,
          company_name: userData.company,
          country: userData.country,
          contact_number: userData.contactNumber,
          whatsapp_number: userData.whatsappNumber,
          profile_photo: userData.profilePhoto,
          bio: userData.bio,
          languages_spoken: userData.languages,
          preferred_atolls: userData.preferredAtolls,
          tier_badge: 'New Explorer',
        },
      ]);

      if (insertError) {
        return { user: null, error: insertError.message };
      }

      return {
        user: {
          id: data.user.id,
          name: userData.name || '',
          email: userData.email,
          role: 'agent',
          profilePhoto: userData.profilePhoto,
          company: userData.company,
          country: userData.country,
          contactNumber: userData.contactNumber,
          whatsappNumber: userData.whatsappNumber,
          bio: userData.bio,
          languages: userData.languages,
          preferredAtolls: userData.preferredAtolls,
          tierBadge: 'New Explorer',
        },
        error: null,
      };
    }
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
};

/**
 * Log out the current user
 * @returns Promise that resolves when logout is complete
 */
export const logout = async (): Promise<void> => {
  await supabase.auth.signOut();
};

/**
 * Get the current authenticated user
 * @returns AuthResponse with user data or error message
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return { user: null, error: error?.message || 'No user found' };
    }

    // Get user role from database
    const { data: roleData, error: roleError } = await supabase
      .from('travelers')
      .select('id, name, profile_photo, tier_badge')
      .eq('id', data.user.id)
      .single();

    if (roleError) {
      // Try to get agent data
      const { data: agentData, error: agentError } = await supabase
        .from('agents')
        .select('id, name, company_name, profile_photo, tier_badge, commission_rate')
        .eq('id', data.user.id)
        .single();

      if (agentError) {
        // Try to get admin data
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('id, email, role')
          .eq('id', data.user.id)
          .single();

        if (adminError) {
          return { user: null, error: 'User not found in any role table' };
        }

        // Return admin user
        return {
          user: {
            id: adminData.id,
            name: 'Admin',
            email: adminData.email,
            role: 'admin',
            tierBadge: 'Admin',
          },
          error: null,
        };
      }

      // Return agent user
      return {
        user: {
          id: agentData.id,
          name: agentData.name,
          email: data.user.email || '',
          role: 'agent',
          profilePhoto: agentData.profile_photo,
          company: agentData.company_name,
          tierBadge: agentData.tier_badge,
        },
        error: null,
      };
    }

    // Return traveler user
    return {
      user: {
        id: roleData.id,
        name: roleData.name,
        email: data.user.email || '',
        role: 'traveler',
        profilePhoto: roleData.profile_photo,
        tierBadge: roleData.tier_badge,
      },
      error: null,
    };
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
};

/**
 * Update user profile
 * @param userId User's ID
 * @param role User's role
 * @param profileData Profile data to update
 * @returns Promise that resolves when update is complete
 */
export const updateProfile = async (
  userId: string,
  role: 'traveler' | 'agent',
  profileData: Partial<User>
): Promise<AuthResponse> => {
  try {
    if (role === 'traveler') {
      const { error } = await supabase
        .from('travelers')
        .update({
          name: profileData.name,
          profile_photo: profileData.profilePhoto,
        })
        .eq('id', userId);

      if (error) {
        return { user: null, error: error.message };
      }
    } else if (role === 'agent') {
      const { error } = await supabase
        .from('agents')
        .update({
          name: profileData.name,
          company_name: profileData.company,
          country: profileData.country,
          contact_number: profileData.contactNumber,
          whatsapp_number: profileData.whatsappNumber,
          profile_photo: profileData.profilePhoto,
          bio: profileData.bio,
          languages_spoken: profileData.languages,
          preferred_atolls: profileData.preferredAtolls,
        })
        .eq('id', userId);

      if (error) {
        return { user: null, error: error.message };
      }
    }

    // Get updated user data
    return await getCurrentUser();
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
};