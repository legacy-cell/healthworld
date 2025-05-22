'use client';

import { useState, useEffect } from 'react';
import ProfileForm from '@/components/profile/ProfileForm';
import type { ClientProfile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const LOCAL_STORAGE_KEY = 'healthworld_profile';
const PROFILE_ID = 'currentUserProfile'; // Fixed ID for single user profile

export default function ProfilePage() {
  const [profile, setProfile] = useState<ClientProfile | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        // Initialize with a default structure if no profile exists
        setProfile({ id: PROFILE_ID });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isClient && profile) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile, isClient]);

  const handleSaveProfile = (updatedProfileData: Omit<ClientProfile, 'id'>) => {
    setProfile(prev => ({
      ...(prev || { id: PROFILE_ID }), // Ensure id is always present
      ...updatedProfileData,
    }));
  };
  
  if (!isClient || profile === undefined) { // Wait for profile to be loaded or initialized
    return <div className="flex justify-center items-center h-screen"><p>Loading profile information...</p></div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Your Profile</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your personal and contact information.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
             <Image 
                src="https://placehold.co/400x500.png" 
                alt="Profile illustration" 
                width={400} 
                height={500} 
                className="rounded-lg shadow-md w-full object-cover"
                data-ai-hint="user profile"
            />
        </div>
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Edit Your Information</CardTitle>
            <CardDescription>Keep your details up-to-date for better service.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm onSubmit={handleSaveProfile} initialData={profile} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
