
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignInForm from '@/components/auth/SignInForm';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-5xl w-full">
        <div className="hidden md:flex justify-center items-center">
           <Image
            src="https://placehold.co/450x450.png"
            alt="Health illustration for sign-in page"
            width={450}
            height={450}
            className="rounded-xl shadow-2xl object-cover"
            data-ai-hint="health security"
          />
        </div>
        <Card className="w-full max-w-md shadow-2xl rounded-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back!</CardTitle>
            <CardDescription className="text-md">Sign in to access your HealthWorld dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

