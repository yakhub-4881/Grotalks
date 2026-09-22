import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { MessageSquare } from 'lucide-react';
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

  useEffect(() => {
    if (open) {
      setMessages([]);
      setDraft('');
      setTyping(false);
    }
  }, [open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const mine: ChatMessage = { id: Date.now(), from: 'me', text: value, time: now() };
    setMessages((prev) => [...prev, mine]);
    setDraft('');
    setTyping(true);
    const replyIndex = messages.filter((m) => m.from === 'me').length % PEER_REPLIES.length;
    window.setTimeout(() => {
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
      <DialogContent className="grid h-[min(680px,calc(100dvh-2rem))] w-[calc(100%-2rem)] max-w-lg grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-lg p-0 sm:h-[min(680px,calc(100dvh-4rem))]">
        <DialogHeader className="border-b px-4 py-3 pr-12 text-left sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="truncate text-base font-semibold leading-5">{peer.name}</DialogTitle>
              <DialogDescription className="truncate text-xs leading-5">
                {peer.year} · {peer.department}
              </DialogDescription>
            </div>
            <Badge variant="secondary" className="hidden flex-shrink-0 text-[11px] sm:inline-flex">
              Peer guide
            </Badge>
          </div>
        </DialogHeader>

        <Conversation className="min-h-0 min-w-0 bg-muted/30">
          <ConversationContent className="w-full min-w-0 gap-4 p-4 sm:p-5">
            <div className="w-full min-w-0 rounded-lg border bg-background p-3">
              <p className="mb-1 text-[11px] font-medium uppercase text-muted-foreground">
                Your question
              </p>
              <p className="break-words text-sm leading-5 text-foreground">{question}</p>
            </div>

            {messages.length === 0 && (
              <div className="flex w-full min-w-0 flex-col items-center px-4 py-5 text-center">
                <MessageSquare className="mx-auto mb-2 h-5 w-5 text-primary" />
                <p className="w-full max-w-xs break-words text-xs leading-5 text-muted-foreground">
                  Say hello — {peer.name.split(' ')[0]} opted in to guide juniors on this topic.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <Message key={message.id} from={message.from === 'me' ? 'user' : 'assistant'}>
                <MessageContent
                  className={
                    message.from === 'me'
                      ? 'max-w-[85%] gap-1 bg-primary px-3 py-2 text-primary-foreground'
                      : 'max-w-[85%] gap-1'
                  }
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-5">{message.text}</p>
                  <p
                    className={
                      message.from === 'me'
                        ? 'text-[10px] text-primary-foreground/70'
                        : 'text-[10px] text-muted-foreground'
                    }
                  >
                    {message.time}
                  </p>
                </MessageContent>
              </Message>
            ))}

            {typing && (
              <Message from="assistant">
                <MessageContent>
                  <Shimmer className="text-xs">Typing…</Shimmer>
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton className="bottom-3 h-8 w-8" />
        </Conversation>

        <div className="min-w-0 space-y-2 border-t bg-background p-3 sm:p-4">
          {messages.length === 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {QUICK_MESSAGES.map((q) => (
                <Button
                  key={q}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => send(q)}
                  className="h-8 flex-shrink-0 rounded-full px-3 text-[11px] font-normal text-muted-foreground"
                >
                  {q}
                </Button>
              ))}
            </div>
          )}
          <PromptInput
            className="min-w-0 bg-background"
            onSubmit={(message) => {
              send(message.text || draft);
            }}
          >
            <PromptInputTextarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message..."
              rows={1}
              className="min-h-11 max-h-24 resize-none py-3 text-sm"
              aria-label="Message to peer guide"
            />
            <PromptInputFooter className="justify-end px-2 pb-2 pt-0">
              <PromptInputSubmit disabled={!draft.trim() || typing} />
            </PromptInputFooter>
          </PromptInput>
          <p className="flex items-start gap-1.5 px-1 text-[11px] leading-4 text-muted-foreground">
            <MessageSquare className="mt-0.5 h-3 w-3 flex-shrink-0" />
            Peer chats are recorded on their guidance record.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
