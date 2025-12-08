import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { MeetingPlatformConnect, MeetingPlatform, defaultMeetingPlatforms } from '@/components/MeetingPlatformConnect';

const MentorMeetingSetup = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<MeetingPlatform[]>(defaultMeetingPlatforms);

  const hasConnectedPlatform = platforms.some(p => p.connected);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Meeting Platform Setup</h1>
            <p className="text-sm text-muted-foreground">Step 7 of 9</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[77%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6">
            <MeetingPlatformConnect
              platforms={platforms}
              onPlatformsChange={setPlatforms}
              isEditable={true}
            />

            {/* Navigation */}
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/mentor/availability')} 
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={() => navigate('/mentor/payment')}
                className="flex-1 h-12 font-medium"
                disabled={!hasConnectedPlatform}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorMeetingSetup;