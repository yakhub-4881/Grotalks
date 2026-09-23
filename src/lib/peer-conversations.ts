// Prototype message threads for peer guidance chats.
// Each guidance session has a transcript both students can reopen and continue.

import { peerGuidanceSessions, type PeerGuidanceSession } from './peer-guidance';

export interface PeerMessage {
  id: number;
  /** who sent it, relative to the roles on the session */
  from: 'helper' | 'seeker';
  text: string;
  time: string;
}

const seedFor = (session: PeerGuidanceSession): PeerMessage[] => {
  const helperFirst = session.helperName.split(' ')[0];
  const seekerFirst = session.seekerName.split(' ')[0];
  const base: PeerMessage[] = [
    {
      id: 1,
      from: 'seeker',
      text: session.question,
      time: '6:12 PM',
    },
    {
      id: 2,
      from: 'helper',
      text: `Hey ${seekerFirst}! Happy to help — I went through exactly this last year.`,
      time: '6:15 PM',
    },
    {
      id: 3,
      from: 'seeker',
      text: 'That would be great. What did you start with?',
      time: '6:16 PM',
    },
    {
      id: 4,
      from: 'helper',
      text: `I kept it simple: one small project, weekly notes, and I asked seniors for feedback every fortnight. Ping me anytime, ${seekerFirst}.`,
      time: '6:21 PM',
    },
  ];
  if (session.status === 'ongoing') {
    return base.slice(0, 3);
  }
  return [
    ...base,
    {
      id: 5,
      from: 'seeker',
      text: `Thanks ${helperFirst}, this really helped.`,
      time: '6:24 PM',
    },
  ];
};

const threads = new Map<number, PeerMessage[]>();

export const getThread = (sessionId: number): PeerMessage[] => {
  if (!threads.has(sessionId)) {
    const session = peerGuidanceSessions.find((s) => s.id === sessionId);
    threads.set(sessionId, session ? seedFor(session) : []);
  }
  return threads.get(sessionId) ?? [];
};

export const appendToThread = (sessionId: number, message: PeerMessage): PeerMessage[] => {
  const next = [...getThread(sessionId), message];
  threads.set(sessionId, next);
  return next;
};

export const nowTime = () =>
  new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
