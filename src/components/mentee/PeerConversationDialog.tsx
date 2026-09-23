import { useEffect, useState } from 'react';
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
import { MessageSquare, Clock, Star } from 'lucide-react';
import type { PeerGuidanceSession } from '@/lib/peer-guidance';
import {
  appendToThread,
  getThread,
  nowTime,
  type PeerMessage,
} from '@/lib/peer-conversations';

const QUICK_GIVEN = [
  'Checking in — did that plan work out?',
  'Happy to look at your draft if you share it.',
];
const QUICK_RECEIVED = [
  'I have one more question on this.',
  'Could we talk for 10 minutes this week?',
];

const REPLIES = [
  'Sure, send it across — I will take a look tonight.',
  'Yes, definitely. Evenings after 7 work best for me.',
  'Good question. Start with the basics and build from there.',
];

interface Props {
  session: PeerGuidanceSession;
  /** the signed-in student's role in this conversation */
  role: 'helper' | 'seeker';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PeerConversationDialog = ({ session, role, open, onOpenChange }: Props) => {
  const [messages, setMessages] = useState<PeerMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (open) {
      setMessages(getThread(session.id));
      setDraft('');
      setTyping(false);
    }
  }, [open, session.id]);

  const other = role === 'helper'
    ? {
        name: session.seekerName,
        meta: `${session.seekerYear} · ${session.seekerDepartment}`,
        badge: 'Asked you',
      }
    : {
        name: session.helperName,
        meta: `${session.helperYear} · ${session.helperDepartment}`,
        badge: 'Peer guide',
      };

  const initials = other.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const mine: PeerMessage = { id: Date.now(), from: role, text: value, time: nowTime() };
    setMessages(appendToThread(session.id, mine));
    setDraft('');
    setTyping(true);
    const reply = REPLIES[messages.length % REPLIES.length];
    window.setTimeout(() => {
      setTyping(false);
      setMessages(
        appendToThread(session.id, {
          id: Date.now() + 1,
          from: role === 'helper' ? 'seeker' : 'helper',
          text: reply,
          time: nowTime(),
        })
      );
    }, 1200);
  };

  const quick = role === 'helper' ? QUICK_GIVEN : QUICK_RECEIVED;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid h-[min(680px,calc(100dvh-2rem))] w-[calc(100%-2rem)] max-w-lg grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-lg p-0 sm:h-[min(680px,calc(100dvh-4rem))]">
        <DialogHeader className="border-b px-4 py-3 pr-12 text-left sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="truncate text-base font-semibold leading-5">
                {other.name}
              </DialogTitle>
              <DialogDescription className="truncate text-xs leading-5">
                {other.meta} · {session.topic}
              </DialogDescription>
            </div>
            <Badge variant="secondary" className="hidden flex-shrink-0 text-[11px] sm:inline-flex">
              {other.badge}
            </Badge>
          </div>
        </DialogHeader>

        <Conversation className="min-h-0 min-w-0 bg-muted/30">
          <ConversationContent className="w-full min-w-0 gap-4 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-muted-foreground">
              <span>{session.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {session.minutes} min
              </span>
              {session.seekerRating && (
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-current text-amber-500" />
                  {session.seekerRating}
                </span>
              )}
            </div>

            {messages.map((message) => (
              <Message key={message.id} from={message.from === role ? 'user' : 'assistant'}>
                <MessageContent
                  className={
                    message.from === role
                      ? 'max-w-[85%] gap-1 bg-primary px-3 py-2 text-primary-foreground'
                      : 'max-w-[85%] gap-1'
                  }
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-5">{message.text}</p>
                  <p
                    className={
                      message.from === role
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
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {quick.map((q) => (
              <Button
                key={q}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => send(q)}
                disabled={typing}
                className="h-8 flex-shrink-0 rounded-full px-3 text-[11px] font-normal text-muted-foreground"
              >
                {q}
              </Button>
            ))}
          </div>
          <PromptInput
            className="min-w-0 bg-background"
            onSubmit={(message) => send(message.text || draft)}
          >
            <PromptInputTextarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message..."
              rows={1}
              className="min-h-11 max-h-24 resize-none py-3 text-sm"
              aria-label="Message in this peer conversation"
            />
            <PromptInputFooter className="justify-end px-2 pb-2 pt-0">
              <PromptInputSubmit disabled={!draft.trim() || typing} />
            </PromptInputFooter>
          </PromptInput>
          <p className="flex items-start gap-1.5 px-1 text-[11px] leading-4 text-muted-foreground">
            <MessageSquare className="mt-0.5 h-3 w-3 flex-shrink-0" />
            Peer chats stay on both students' guidance records.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PeerConversationDialog;
