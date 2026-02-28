
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Zap, MessageSquare, Image as ImageIcon, CreditCard, Shield, Download, Sparkles } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-image") || {
    imageUrl: "https://picsum.photos/seed/fallback/1200/800",
    description: "AI Studio Hero",
    imageHint: "ai technology"
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/50 px-3 py-1 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Sparkles className="h-4 w-4" />
            <span>Next-Gen AI Workspace</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/60">
            The Ultimate AI <br /> Creativity Studio.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Chat with powerful models, generate stunning visuals, and manage your entire AI workflow in one sleek, unified platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90" asChild>
              <Link href="/auth/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 hover:bg-white/5" asChild>
              <Link href="/#features">Explore Features</Link>
            </Button>
          </div>

          <div className="mt-20 relative max-w-5xl mx-auto rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm p-2 shadow-2xl overflow-hidden group">
            <Image 
              src={heroImg.imageUrl}
              alt={heroImg.description}
              width={1200}
              height={800}
              className="rounded-lg w-full transition-transform duration-700 group-hover:scale-[1.02]"
              data-ai-hint={heroImg.imageHint}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline tracking-tight">Everything you need to build with AI</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Powerful tools designed for creators, developers, and businesses.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6" />}
              title="AI Chat"
              description="Engage with advanced language models for brainstorming, coding, or writing. Powered by Gemini 2.5."
            />
            <FeatureCard 
              icon={<ImageIcon className="h-6 w-6" />}
              title="Image Generation"
              description="Turn text into breathtaking visuals with various styles including Realistic, Anime, and 3D."
            />
            <FeatureCard 
              icon={<CreditCard className="h-6 w-6" />}
              title="Credit System"
              description="Simple pay-as-you-go credit system. No hidden fees, only pay for what you use."
            />
            <FeatureCard 
              icon={<Download className="h-6 w-6" />}
              title="Easy Downloads"
              description="Export your creations in high definition with a single click. Full commercial usage rights."
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6" />}
              title="Secure & Private"
              description="Your data and chats are encrypted and private. We never train on your personal data."
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Lightning Fast"
              description="Optimized performance for real-time chat responses and quick image generation."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-accent/20 border border-white/10 p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-headline tracking-tight">Ready to unlock your AI potential?</h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">Join thousands of creators who are building the future with AI1 Studio today.</p>
              <Button size="lg" className="h-12 px-10 text-base bg-white text-black hover:bg-white/90" asChild>
                <Link href="/auth/signup">Start Creating Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold font-headline tracking-tight">AI1 Studio</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 AI1 Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border border-white/5 bg-card/50 hover:border-primary/50 transition-all group">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
