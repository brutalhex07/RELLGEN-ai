
"use client";

import { Check, Zap, Sparkles, Rocket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Flexible Plans for Every Creator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose the plan that fits your needs. Upgrade or downgrade anytime. 
          Get extra credits when you need them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          icon={<Rocket className="h-6 w-6" />}
          title="Starter"
          price="0"
          description="Perfect for individuals exploring AI."
          features={[
            "1,000 monthly tokens",
            "Basic Image Generation (10/mo)",
            "Access to Gemini 2.5 Flash",
            "Community Support",
            "Mobile App Access"
          ]}
          buttonText="Current Plan"
          buttonVariant="outline"
        />
        <PricingCard 
          icon={<Sparkles className="h-6 w-6" />}
          title="Pro"
          price="29"
          description="For power users and small teams."
          features={[
            "50,000 monthly tokens",
            "Unlimited Image Generation",
            "Access to Pro AI Models",
            "Priority Support",
            "API Access (Early)",
            "No Ads"
          ]}
          buttonText="Upgrade to Pro"
          highlighted={true}
        />
        <PricingCard 
          icon={<Crown className="h-6 w-6" />}
          title="Enterprise"
          price="99"
          description="Custom solutions for organizations."
          features={[
            "Unlimited monthly tokens",
            "Custom Fine-tuning",
            "Dedicated Support Manager",
            "Advanced API Integration",
            "SLA Guarantees",
            "Team Collaboration"
          ]}
          buttonText="Contact Sales"
          buttonVariant="outline"
        />
      </div>

      <div className="mt-16 text-center bg-card/50 p-12 rounded-3xl border border-white/5 glass">
        <h2 className="text-2xl font-bold mb-4">Need more credits?</h2>
        <p className="text-muted-foreground mb-8">Buy one-time credits if you run out on your current plan.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <CreditBundle amount="1,000" price="5" />
          <CreditBundle amount="5,000" price="20" />
          <CreditBundle amount="20,000" price="50" highlighted={true} />
        </div>
      </div>
    </div>
  );
}

function PricingCard({ icon, title, price, description, features, buttonText, buttonVariant = "default", highlighted = false }: any) {
  return (
    <Card className={cn(
      "glass flex flex-col h-full transition-all duration-300",
      highlighted ? "border-primary/50 shadow-2xl shadow-primary/10 scale-105" : "border-white/5 hover:border-white/20"
    )}>
      <CardHeader className="text-center pb-8 pt-8">
        <div className={cn(
          "h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4",
          highlighted ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
        )}>
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
        <div className="mt-6">
          <span className="text-5xl font-bold">${price}</span>
          <span className="text-muted-foreground ml-1">/mo</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {features.map((f: string, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <Check className="h-3 w-3" />
            </div>
            <span className="text-sm">{f}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-8">
        <Button className={cn("w-full h-12 text-base", highlighted ? "bg-primary hover:bg-primary/90" : "")} variant={buttonVariant}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

function CreditBundle({ amount, price, highlighted = false }: any) {
  return (
    <div className={cn(
      "px-8 py-6 rounded-2xl border transition-all cursor-pointer text-center min-w-[180px]",
      highlighted ? "bg-primary/20 border-primary shadow-lg" : "bg-white/5 border-white/10 hover:border-white/20"
    )}>
      <div className="text-sm text-muted-foreground mb-1">Buy Credits</div>
      <div className="text-xl font-bold mb-3">{amount} Credits</div>
      <div className="text-2xl font-bold mb-4">${price}</div>
      <Button size="sm" variant={highlighted ? "default" : "secondary"} className="w-full">Purchase</Button>
    </div>
  );
}
