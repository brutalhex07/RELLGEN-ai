
"use client";

import { 
  Settings, 
  Bot, 
  ImageIcon, 
  CreditCard, 
  ShieldAlert, 
  Save, 
  RotateCcw,
  Sparkles,
  Cloud,
  Cpu,
  Lock,
  Globe,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Platform configuration updated successfully.",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">Global Configuration</h1>
          <p className="text-muted-foreground italic">Master control for AI models, limits, and security.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-white/10 h-11">
            <RotateCcw className="h-4 w-4" /> Discard
          </Button>
          <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 gap-2 h-11 shadow-lg shadow-accent/20">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 mb-6">
          <TabsTrigger value="ai" className="gap-2"><Bot className="h-4 w-4" /> AI Models</TabsTrigger>
          <TabsTrigger value="usage" className="gap-2"><CreditCard className="h-4 w-4" /> Limits & Plans</TabsTrigger>
          <TabsTrigger value="content" className="gap-2"><Globe className="h-4 w-4" /> Content Control</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><ShieldAlert className="h-4 w-4" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-white/5 bg-card/30">
              <CardHeader>
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Bot className="h-5 w-5" />
                  <CardTitle className="text-lg">Chat Intelligence</CardTitle>
                </div>
                <CardDescription>Configure primary conversational models.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Chat Model</Label>
                  <Select defaultValue="gemini-flash">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-flash">Gemini 2.0 Flash (Fastest)</SelectItem>
                      <SelectItem value="gemini-pro">Gemini 1.5 Pro (Brain)</SelectItem>
                      <SelectItem value="openai-4o">GPT-4o (Integration Mode)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Global System Prompt</Label>
                  <Textarea 
                    placeholder="Enter the master system prompt..." 
                    className="bg-white/5 border-white/10 min-h-[120px] resize-none"
                    defaultValue="You are AI1 Studio, a premium AI creativity assistant..."
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-black/10">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Long-term Memory</Label>
                    <p className="text-[10px] text-muted-foreground">Enable vector search for user history.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/5 bg-card/30">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <ImageIcon className="h-5 w-5" />
                  <CardTitle className="text-lg">Image Generation</CardTitle>
                </div>
                <CardDescription>Visual model defaults and restrictions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Image Model</Label>
                  <Select defaultValue="imagen-4">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imagen-4">Imagen 4.0 Fast</SelectItem>
                      <SelectItem value="imagen-3">Imagen 3.0 Stable</SelectItem>
                      <SelectItem value="veo-2">Veo 2.0 Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Max Resolution</Label>
                    <Select defaultValue="1024">
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512">512 x 512</SelectItem>
                        <SelectItem value="1024">1024 x 1024</SelectItem>
                        <SelectItem value="2048">2048 x 2048</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Safety Filter</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Internal Only)</SelectItem>
                        <SelectItem value="low">Low Threshold</SelectItem>
                        <SelectItem value="medium">Medium (Standard)</SelectItem>
                        <SelectItem value="high">High (Strict)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-black/10">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Upscaling Support</Label>
                    <p className="text-[10px] text-muted-foreground">Allow users to 4x image results.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card className="glass border-white/5 bg-card/30">
            <CardHeader>
              <CardTitle>Plan Limit Configuration</CardTitle>
              <CardDescription>Define usage caps for different subscription tiers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <LimitSetting 
                    label="Starter Plan Tokens" 
                    value="1,000" 
                    icon={<Zap className="h-4 w-4 text-emerald-500" />}
                  />
                  <LimitSetting 
                    label="Pro Plan Tokens" 
                    value="50,000" 
                    icon={<Sparkles className="h-4 w-4 text-primary" />}
                  />
                  <LimitSetting 
                    label="Enterprise Tokens" 
                    value="Unlimited" 
                    icon={<Cloud className="h-4 w-4 text-accent" />}
                  />
                </div>
                <div className="pt-4 border-t border-white/5">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-rose-500">Emergency Controls</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                    <div className="space-y-1">
                      <Label className="text-rose-500 font-bold flex items-center gap-2">
                        <Lock className="h-4 w-4" /> Global API Kill Switch
                      </Label>
                      <p className="text-xs text-muted-foreground">Immediately stop all external API calls in case of cost spike or security breach.</p>
                    </div>
                    <Button variant="destructive" size="sm" className="font-bold">ACTIVATE LOCKDOWN</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LimitSetting({ label, value, icon }: any) {
  return (
    <div className="space-y-2 p-4 rounded-xl border border-white/5 bg-black/20">
      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
        {icon} {label}
      </div>
      <Input defaultValue={value} className="bg-white/5 border-white/10 font-mono font-bold" />
    </div>
  );
}
