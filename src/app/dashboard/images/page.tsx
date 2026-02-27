"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Download, 
  ImageIcon, 
  Loader2, 
  Trash2, 
  Maximize2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { aiImageGenerationWithStyle } from "@/ai/flows/ai-image-generation-with-style";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type GeneratedImage = {
  id: string;
  url: string;
  prompt: string;
  style: string;
  timestamp: Date;
};

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    try {
      const result = await aiImageGenerationWithStyle({ prompt, style });
      const newImage: GeneratedImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: result.imageUrl,
        prompt,
        style,
        timestamp: new Date()
      };
      setHistory(prev => [newImage, ...prev]);
      toast({ 
        title: "Success", 
        description: "Your image has been generated!" 
      });
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Something went wrong while creating your image.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `ai-image-${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">AI Image Studio</h1>
          <p className="text-muted-foreground">Turn your ideas into stunning visuals with Google Imagen.</p>
        </div>
      </div>

      <Card className="glass border-white/10 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-4">
              <label className="text-sm font-medium">Prompt</label>
              <div className="relative">
                <Input 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic city with purple neon lights and flying cars..."
                  className="bg-white/5 border-white/10 py-6 h-14 focus-visible:ring-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                />
              </div>
            </div>
            <div className="w-full md:w-64 space-y-4">
              <label className="text-sm font-medium">Artistic Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="h-14 bg-white/5 border-white/10">
                  <SelectValue placeholder="Select Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Realistic">Realistic</SelectItem>
                  <SelectItem value="Anime">Anime</SelectItem>
                  <SelectItem value="3D Render">3D Render</SelectItem>
                  <SelectItem value="Cinematic">Cinematic</SelectItem>
                  <SelectItem value="Watercolor">Watercolor</SelectItem>
                  <SelectItem value="Cyberpunk">Cyberpunk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 h-12 px-8 gap-2"
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Your Generations</h2>
        
        {history.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <ImageIcon className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No images generated yet. Start creating!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <Card className="glass animate-pulse border-white/10 overflow-hidden aspect-square flex items-center justify-center">
              <div className="text-center p-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Creating masterpiece...</span>
                <p className="text-[10px] text-muted-foreground mt-2">This usually takes 10-20 seconds</p>
              </div>
            </Card>
          )}

          {history.map((item) => (
            <div key={item.id} className="group relative glass border-white/10 rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="aspect-square relative overflow-hidden bg-card">
                <Image 
                  src={item.url} 
                  alt={item.prompt} 
                  fill 
                  unoptimized
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button size="icon" variant="secondary" className="h-9 w-9 glass" onClick={() => handleDownload(item.url, item.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-9 w-9 glass">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="icon" variant="destructive" className="h-9 w-9 glass border-destructive/20" onClick={() => setHistory(prev => prev.filter(i => i.id !== item.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-white/5">
                <p className="text-sm font-medium line-clamp-2 mb-2">{item.prompt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary font-bold px-2 py-1 bg-primary/10 rounded uppercase">{item.style}</span>
                  <span className="text-[10px] text-muted-foreground">{item.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
