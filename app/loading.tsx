"use client"
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex flex-col items-center space-y-6">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading
          <span className="animate-pulse">.</span>
          <span className="animate-pulse delay-150">.</span>
          <span className="animate-pulse delay-300">.</span>
        </h2>
      </div>
    </div>
  );
}