
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Chrome, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth, useFirestore } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    
    const provider = new GoogleAuthProvider();
    
    try {
      // Check if we are using placeholder keys
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "placeholder-api-key") {
        throw new Error("Firebase API Key is missing. Please configure your .env file or use Demo Mode.");
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (db) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName,
            plan: "Starter",
            credits: 1000,
            status: "Active",
            joinedAt: new Date().toISOString(),
          });
        }
      }

      toast({
        title: "Welcome back!",
        description: `Signed in as ${user.displayName}`,
      });
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const bypassForDemo = () => {
    toast({
      title: "Demo Mode Active",
      description: "Redirecting to dashboard...",
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      </div>

      <Card className="w-full max-w-md glass border-white/10 z-10">
        <CardHeader className="text-center space-y-1">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold font-headline tracking-tight text-white">AI1 Studio</span>
          </Link>
          <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your studio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {error && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Auth Error</AlertTitle>
              <AlertDescription className="text-xs">
                {error}
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] border-destructive/30 hover:bg-destructive/10 text-destructive" onClick={bypassForDemo}>
                    Bypass for Demo
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="name@example.com" className="pl-10 bg-white/5 border-white/10 text-white" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white">Password</label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/10 text-white" disabled />
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 mt-4 h-11 text-base" disabled title="Email sign-in is coming soon">
            Sign In with Email (Disabled)
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button 
              variant="outline" 
              className="border-white/10 gap-2 h-11 bg-white/5 hover:bg-white/10 text-white"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Chrome className="h-4 w-4" />
              )}
              Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary font-semibold hover:underline">Create Account</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
