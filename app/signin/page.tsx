import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation';

const SignInPage = async () => {

  const session = await auth()
  if(session) redirect("/")

  return (
    <div className="min-h-screen bg-[#D81B60] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background elements remain the same */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-48 h-48 bg-pink-300/15 rounded-full blur-xl animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-200/20 rounded-full blur-xl animate-[float_10s_ease-in-out_infinite_1s]"></div>
        <div className="absolute top-1/3 right-1/4 w-44 h-44 bg-pink-400/15 rounded-full blur-xl animate-[float_9s_ease-in-out_infinite_2s]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-52 h-52 bg-pink-100/20 rounded-full blur-xl animate-[float_11s_ease-in-out_infinite_0.5s]"></div>

        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <style>
          {`
            @keyframes float {
              0% { transform: translate(0, 0) scale(1); }
              25% { transform: translate(10px, -10px) scale(1.02); }
              50% { transform: translate(0, -20px) scale(1); }
              75% { transform: translate(-10px, -10px) scale(0.98); }
              100% { transform: translate(0, 0) scale(1); }
            }
          `}
        </style>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md relative">
        <div className="bg-white backdrop-blur-lg bg-opacity-95 rounded-3xl shadow-2xl p-8 relative">
          {/* Close Button */}
          <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <Link href="/">
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </Link>
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
            <p className="text-gray-600 mt-3">Sign in to continue</p>
          </div>

          {/* Social Sign In Buttons */}
          <div className="space-y-4">
            {/* Google Sign In */}
            <div className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              <svg viewBox="0 0 48 48" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <form 
                className="text-gray-700 font-medium"
                action={async () => {
                    "use server";
                    await signIn("google")
                  }}>
                  <button type='submit'>
                    Continue with Google
                  </button>
              </form>
            </div>

            {/* GitHub Sign In */}
            <div className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#24292F] text-white rounded-2xl hover:bg-[#1a1f24] transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#24292F]">
              <svg width="24" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
              </svg>
              <form 
                className="font-medium"
                action={async () => {
                    "use server";
                    await signIn("github")
                  }}>
                  <button type='submit'>
                    Continue with GitHub
                  </button>
              </form>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account? Sign In automatically Creates One!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;