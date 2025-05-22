
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpForm from '@/components/auth/SignUpForm';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-5xl w-full">
         <div className="hidden md:flex justify-center items-center">
           <Image
            src="https://placehold.co/450x550.png"
            alt="Health illustration for sign-up page"
            width={450}
            height={550}
            className="rounded-xl shadow-2xl object-cover"
            data-ai-hint="medical team community"
          />
        </div>
        <Card className="w-full max-w-md shadow-2xl rounded-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">Create an Account</CardTitle>
            <CardDescription className="text-md">Join HealthWorld today as a Patient or Doctor.</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

