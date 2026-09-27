'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export type AccountStatus = 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
export type UserRole = 'STUDENT' | 'EDUCATOR' | 'SUPER_ADMIN';

export interface UserProfile {
  user_id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  institution_name: string | null;
  location: string | null;
  role: UserRole;
  account_status: AccountStatus;
  curriculum?: string | null;
  grade?: number | null;
  board_id: string | null;
  grade_level: number | null;
  onboarding_completed: boolean;
  trial_ends_at?: string | null;
  subscription_status?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SignUpMetadata {
  full_name?: string;
  institution_name?: string;
  location?: string;
  curriculum?: string;
  grade?: number;
  board_id?: string;
  grade_level?: number;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isCustomerAdmin: boolean;
  isSuperAdmin: boolean;
  isSubscribed: boolean;
  onboardingCompleted: boolean;
  accountStatus: AccountStatus | null;
  isTrialExpired: boolean;
  daysLeftInTrial: number | null;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, metadata?: SignUpMetadata) => Promise<{ error: AuthError | null; data?: any }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  refreshProfile: () => Promise<void>;
  activateSubscription: () => Promise<{ success: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isCustomerAdmin, setIsCustomerAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfileAndAdminStatus = useCallback(async (userId: string) => {
    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (profileError) {
        console.warn('Could not fetch user profile:', profileError.message);
      }

      const p = (profileData as UserProfile) || null;
      setProfile(p);

      // 2. Fetch Customer Admin Status
      const { data: adminData, error: adminError } = await supabase
        .from('customer_administrators')
        .select('is_active')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (adminError && adminError.code !== 'PGRST116') {
        // Suppress expected RLS / not found warnings
      }

      const hasActiveAdmin = Boolean(adminData?.is_active);
      const isAccountActive = p?.account_status === 'ACTIVE';
      setIsCustomerAdmin(hasActiveAdmin && isAccountActive);
    } catch (err) {
      console.warn('Error during profile hydration:', err);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfileAndAdminStatus(user.id);
    }
  }, [user?.id, fetchProfileAndAdminStatus]);

  

  useEffect(() => {
  let isMounted = true;

  // If Supabase is not configured, skip auth loading
  if (!isSupabaseConfigured()) {
    if (isMounted) setIsLoading(false);
    return;
  }

  // Initial session check with error handling
  supabase.auth
    .getSession()
    .then(({ data: { session: initialSession } }) => {
      if (!isMounted) return;
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession?.user) {
        fetchProfileAndAdminStatus(initialSession.user.id).finally(() => {
          if (isMounted) setIsLoading(false);
        });
      } else {
        if (isMounted) setIsLoading(false);
      }
    })
    .catch((err) => {
      console.warn('Auth session retrieval error:', err);
      if (isMounted) setIsLoading(false);
    });

  // Auth state change listener
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await fetchProfileAndAdminStatus(newSession.user.id);
      } else {
        setProfile(null);
        setIsCustomerAdmin(false);
      }
      setIsLoading(false);
    }
  );

  return () => {
    isMounted = false;
    subscription.unsubscribe();
  };
}, [fetchProfileAndAdminStatus]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.data.user) {
      setUser(result.data.user);
      setSession(result.data.session);
      await fetchProfileAndAdminStatus(result.data.user.id);
    }
    setIsLoading(false);
    return { error: result.error };
  };

  const signUp = async (
    email: string,
    password: string,
    metadata?: SignUpMetadata
  ) => {
    setIsLoading(true);
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata?.full_name,
          institution_name: metadata?.institution_name,
          location: metadata?.location,
          curriculum: metadata?.curriculum || metadata?.board_id || 'CBSE',
          grade: metadata?.grade || metadata?.grade_level || 6,
          board_id: metadata?.board_id || metadata?.curriculum || 'CBSE',
          grade_level: metadata?.grade_level || metadata?.grade || 6,
        },
      },
    });

    if (result.data.user) {
      setUser(result.data.user);
      setSession(result.data.session);
      await fetchProfileAndAdminStatus(result.data.user.id);
    }
    setIsLoading(false);
    return { error: result.error, data: result.data };
  };

  const signOut = async () => {
    setIsLoading(true);
    const result = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsCustomerAdmin(false);
    setIsLoading(false);
    return { error: result.error };
  };

  const activateSubscription = useCallback(async () => {
    if (!user?.id) return { success: false };
    try {
      // 1. Backend verification API route
      await fetch('/api/billing/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
        }),
      });

      // 2. Direct client update
      await supabase
        .from('profiles')
        .update({
          subscription_status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      // 3. User metadata update
      await supabase.auth.updateUser({
        data: { subscription_status: 'active' },
      });

      // 4. Refresh local profile state
      await fetchProfileAndAdminStatus(user.id);
      return { success: true };
    } catch (err) {
      console.warn('activateSubscription error:', err);
      return { success: false };
    }
  }, [user, fetchProfileAndAdminStatus]);

  const isSuperAdmin = profile?.role === 'SUPER_ADMIN' && profile?.account_status === 'ACTIVE';
  const onboardingCompleted = Boolean(profile?.onboarding_completed);
  const accountStatus = profile?.account_status ?? null;

  const isSubscribed = Boolean(
    profile?.subscription_status?.toLowerCase() === 'active' ||
    profile?.subscription_status?.toLowerCase() === 'paid' ||
    profile?.subscription_status?.toLowerCase() === 'subscribed' ||
    user?.user_metadata?.subscription_status?.toLowerCase() === 'active'
  );

  // 7-Day Trial Status Evaluation
  const isTrialExpired = Boolean(
    !isSubscribed &&
    profile?.trial_ends_at &&
    new Date() > new Date(profile.trial_ends_at)
  );

  const daysLeftInTrial = isSubscribed
    ? null
    : profile?.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isCustomerAdmin,
        isSuperAdmin,
        isSubscribed,
        onboardingCompleted,
        accountStatus,
        isTrialExpired,
        daysLeftInTrial,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        activateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
