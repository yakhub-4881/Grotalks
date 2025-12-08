import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Video, CheckCircle2, Link2, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface MeetingPlatform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  meetLink?: string;
}

export interface MeetingPlatformConnectProps {
  platforms: MeetingPlatform[];
  onPlatformsChange: (platforms: MeetingPlatform[]) => void;
  isEditable?: boolean;
}

export const MeetingPlatformConnect = ({ 
  platforms, 
  onPlatformsChange, 
  isEditable = true 
}: MeetingPlatformConnectProps) => {
  const { toast } = useToast();
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<MeetingPlatform | null>(null);
  const [meetLink, setMeetLink] = useState('');

  const handleConnect = (platform: MeetingPlatform) => {
    setSelectedPlatform(platform);
    setMeetLink(platform.meetLink || '');
    setShowLinkDialog(true);
  };

  const handleSaveLink = () => {
    if (!selectedPlatform) return;

    // Validate link based on platform
    const isValidLink = selectedPlatform.id === 'google' 
      ? meetLink.includes('meet.google.com') 
      : selectedPlatform.id === 'zoom' 
        ? meetLink.includes('zoom.us') 
        : meetLink.startsWith('http');

    if (!isValidLink) {
      toast({
        title: 'Invalid Link',
        description: `Please enter a valid ${selectedPlatform.name} meeting link`,
        variant: 'destructive'
      });
      return;
    }

    const updatedPlatforms = platforms.map(p => 
      p.id === selectedPlatform.id 
        ? { ...p, connected: true, meetLink } 
        : p
    );
    
    onPlatformsChange(updatedPlatforms);
    
    toast({
      title: `${selectedPlatform.name} Connected`,
      description: 'Your meeting link has been saved successfully',
    });
    
    setShowLinkDialog(false);
    setSelectedPlatform(null);
    setMeetLink('');
  };

  const handleDisconnect = (platformId: string) => {
    const updatedPlatforms = platforms.map(p => 
      p.id === platformId 
        ? { ...p, connected: false, meetLink: undefined } 
        : p
    );
    
    onPlatformsChange(updatedPlatforms);
    
    toast({
      title: 'Platform Disconnected',
      description: 'Your meeting link has been removed',
    });
  };

  const connectedPlatform = platforms.find(p => p.connected);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold">Meeting Platform</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Connect your preferred video call platform for sessions
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {platforms.map((platform) => (
          <Card 
            key={platform.id} 
            className={`p-4 border-2 transition-all ${
              platform.connected 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                platform.id === 'google' ? 'bg-blue-100' : 'bg-blue-600/10'
              }`}>
                {platform.id === 'google' ? (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M12 11v2.4h3.97c-.16 1-1.25 2.94-3.97 2.94-2.39 0-4.34-1.98-4.34-4.34S9.61 7.66 12 7.66c1.36 0 2.27.58 2.79 1.08l1.9-1.83C15.47 5.69 13.89 5 12 5 8.13 5 5 8.13 5 12s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16H12z" fill="#4285F4"/>
                    <path d="M5 12c0-1.18.29-2.29.81-3.27l-2.15-1.67A6.97 6.97 0 002 12c0 1.88.74 3.59 1.95 4.85l2.19-1.7A4.98 4.98 0 015 12z" fill="#34A853"/>
                    <path d="M12 19c1.89 0 3.47-.62 4.62-1.69l-2.19-1.7c-.62.42-1.42.73-2.43.73-1.87 0-3.46-1.26-4.02-2.96l-2.15 1.67C7.06 17.13 9.32 19 12 19z" fill="#FBBC05"/>
                    <path d="M18.72 12.16c0-.46-.05-.81-.11-1.16H12v2.4h3.97c-.08.53-.32 1.02-.68 1.42l2.19 1.7c1.28-1.18 2.24-2.92 2.24-4.36z" fill="#EA4335"/>
                  </svg>
                ) : (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" fill="#2196F3"/>
                  </svg>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground text-sm">{platform.name}</h4>
                  {platform.connected && (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                </div>
                {platform.connected && platform.meetLink && (
                  <p className="text-xs text-muted-foreground truncate">
                    {platform.meetLink}
                  </p>
                )}
              </div>

              {isEditable && (
                <div className="flex gap-2">
                  {platform.connected ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleConnect(platform)}
                        className="h-8 text-xs"
                      >
                        <Link2 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDisconnect(platform.id)}
                        className="h-8 text-xs text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConnect(platform)}
                      className="h-8 text-xs"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {!connectedPlatform && (
        <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
          ⚠️ Please connect at least one meeting platform to conduct sessions with students.
        </p>
      )}

      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Connect {selectedPlatform?.name}
            </DialogTitle>
            <DialogDescription>
              Paste your personal meeting room link. Students will use this link to join sessions with you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="meet-link" className="text-sm">
                {selectedPlatform?.name} Meeting Link*
              </Label>
              <Input
                id="meet-link"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                placeholder={
                  selectedPlatform?.id === 'google' 
                    ? 'https://meet.google.com/xxx-xxxx-xxx' 
                    : 'https://zoom.us/j/xxxxxxxxx'
                }
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                {selectedPlatform?.id === 'google' 
                  ? 'Enter your Google Meet personal room link' 
                  : 'Enter your Zoom personal meeting room link'}
              </p>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowLinkDialog(false)} 
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveLink} 
              className="w-full sm:w-auto"
              disabled={!meetLink.trim()}
            >
              Save Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const defaultMeetingPlatforms: MeetingPlatform[] = [
  { id: 'google', name: 'Google Meet', icon: 'google', connected: false },
  { id: 'zoom', name: 'Zoom', icon: 'zoom', connected: false },
];