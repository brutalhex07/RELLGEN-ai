"use client";

import { 
  LayoutGrid, 
  Search, 
  Sparkles, 
  FileText, 
  Code, 
  Mail, 
  PenTool,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    title: "Blog Post Generator",
    description: "Create SEO-optimized blog content in seconds.",
    icon: <FileText className="h-6 w-6 text-blue-500" />,
    category: "Writing",
    tokens: "500"
  },
  {
    title: "React Component",
    description: "Generate accessible UI components from a prompt.",
    icon: <Code className="h-6 w-6 text-purple-500" />,
    category: "Development",
    tokens: "800"
  },
  {
    title: "Marketing Email",
    description: "Draft high-converting sales sequences.",
    icon: <Mail className="h-6 w-6 text-emerald-500" />,
    category: "Marketing",
    tokens: "300"
  },
  {
    title: "Poetry Assistant",
    description: "Rhyme and rhythm generation for creative writers.",
    icon: <PenTool className="h-6 w-6 text-amber-500" />,
    category: "Creative",
    tokens: "200"
  }
];

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">AI Templates</h1>
          <p className="text-muted-foreground">Pre-configured prompts for specific creative tasks.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search for a template..." 
          className="pl-10 bg-white/5 border-white/10 h-12"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, i) => (
          <Card key={i} className="glass border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-white/5 rounded-lg">
                  {template.icon}
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {template.category}
                </Badge>
              </div>
              <CardTitle className="text-xl">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">{template.tokens} tokens</span>
                <Button variant="ghost" size="sm" className="gap-2 group-hover:text-primary transition-colors">
                  Use Template <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="glass border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center bg-transparent">
          <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">Custom Template</CardTitle>
          <CardDescription className="mt-2">Have a specific prompt you use often?</CardDescription>
          <Button variant="outline" size="sm" className="mt-6 border-white/10">
            Request Template
          </Button>
        </Card>
      </div>
    </div>
  );
}
