import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Smile, Meh, Frown, Zap, AlertCircle } from "lucide-react";

interface MoodWellnessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const moods = [
  { id: "confident", emoji: "😊", label: "Confident", icon: Smile },
  { id: "neutral", emoji: "😐", label: "Neutral", icon: Meh },
  { id: "anxious", emoji: "😰", label: "Anxious", icon: Frown },
  { id: "excited", emoji: "😃", label: "Excited", icon: Zap },
  { id: "stress", emoji: "😫", label: "Stress", icon: AlertCircle }
];

export function MoodWellnessDialog({ open, onOpenChange }: MoodWellnessDialogProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      setSubmitted(false);
      setSelectedMood(null);
      setNote("");
    }, 2000);
  };

  const recentMoods = [
    { day: "Yesterday", mood: "😃 Excited" },
    { day: "Monday", mood: "😫 Stressed (after loss)" },
    { day: "Sunday", mood: "😃 Excited" },
    { day: "Friday", mood: "😊 Confident" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/20 max-w-lg">
        {!submitted ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={24} className="text-primary animate-pulse" />
                </div>
              </div>
              <DialogTitle className="text-xl font-bold text-center">Welcome Back FEM's</DialogTitle>
              <p className="text-sm text-muted-foreground text-center">
                Analyzing markets and emotions...
              </p>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2 text-sm">
                <Smile size={16} className="text-primary" />
                <span>Before we dive in, what's your vibe today?</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`glass-card p-4 rounded-lg border transition-all hover:scale-105 flex flex-col items-center gap-2 ${
                      selectedMood === mood.id
                        ? "border-primary/60 bg-primary/10"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                  >
                    <span className="text-3xl">{mood.emoji}</span>
                    <span className="text-xs font-medium">{mood.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Bot size={16} className="text-primary" />
                  <span>Mood Note</span>
                </div>
                <Textarea
                  placeholder="Tell us more..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="glass-card border-primary/20 min-h-[80px] resize-none"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!selectedMood}
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold"
              >
                Submit
              </Button>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-warning">⚡</span>
                  <span className="font-medium">Recent Mood</span>
                </div>
                <div className="glass-card rounded-lg p-3 space-y-2">
                  {recentMoods.map((entry, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{entry.day}:</span>
                      <span>{entry.mood}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <span className="text-5xl">{moods.find(m => m.id === selectedMood)?.emoji}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {moods.find(m => m.id === selectedMood)?.label}
              </h3>
              <p className="text-muted-foreground">
                You're feeling {moods.find(m => m.id === selectedMood)?.label} today
              </p>
            </div>
            <Button
              onClick={() => onOpenChange(false)}
              className="mt-4 bg-primary hover:bg-primary/90 text-white"
            >
              Lets Trade
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
