import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare } from 'lucide-react';
import type { PeerHelper } from '@/lib/knowledge-base';

interface ChatMessage {
  id: number;
  from: 'me' | 'peer';
  text: string;
  time: string;
}

const QUICK_MESSAGES = [
  'Hey! I have the same query — could you help me out?',
  'Do you have 10 minutes to discuss this?',
  'What worked for you after that session?',
];

const PEER_REPLIES = [
  'Hey! Sure, happy to help. I went through exactly this last semester.',
  'I can hop on a quick call this evening if that works for you.',
  'The biggest thing that helped me was starting small and documenting everything.',
];

const now = () =>
  new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });

interface PeerChatDialogProps {
  peer: PeerHelper;
  question: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PeerChatDialog = ({ peer, question, open, onOpenChange }: PeerChatDialogProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setMessages([]);
      setDraft('');
      setTyping(false);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const mine: ChatMessage = { id: Date.now(), from: 'me', text: value, time: now() };
    setMessages((prev) => [...prev, mine]);
    setDraft('');
    setTyping(true);
    const replyIndex = messages.filter((m) => m.from === 'me').length % PEER_REPLIES.length;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'peer', text: PEER_REPLIES[replyIndex], time: now() },
      ]);
    }, 1200);
  };

  const initials = peer.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 border-b text-left space-y-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm font-semibold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-sm font-semibold truncate">{peer.name}</DialogTitle>
              <DialogDescription className="text-xs truncate">
                {peer.year} · {peer.department}
              </DialogDescription>
            </div>
            <Badge variant="secondary" className="ml-auto text-[11px] flex-shrink-0">
              Peer guide
            </Badge>
          </div>
        </DialogHeader>

        <div className="h-[46vh] max-h-80 overflow-y-auto p-4 space-y-3 bg-muted/30">
          <div className="rounded-lg border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
              Your question
            </p>
            <p className="text-xs text-foreground">{question}</p>
          </div>

          {messages.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-2">
              Say hello — {peer.name.split(' ')[0]} opted in to guide juniors on this topic.
            </p>
          )}

          {messages.map((m) => (
            <div key={m.id} className={m.from === 'me' ? 'flex justify-end' : 'flex justify-start'}>
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  m.from === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{m.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    m.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-background border rounded-lg px-3 py-2 flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-3 border-t space-y-2">
          {messages.length === 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {QUICK_MESSAGES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message..."
              className="h-10"
            />
            <Button type="submit" size="icon" className="h-10 w-10 flex-shrink-0" disabled={!draft.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            <MessageSquare className="h-3 w-3" />
            Peer chats are recorded on their guidance record.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
