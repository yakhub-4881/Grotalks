import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Eye, EyeOff, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';

const StudentVirtualCard = () => {
  const navigate = useNavigate();
  const [cardRevealed, setCardRevealed] = useState(false);

  const cardData = {
    fullNumber: 'VTGU-2024-8834-1234',
    maskedNumber: 'XXXX-XXXX-XXXX-1234',
    universityName: 'Vel Tech University',
    studentName: 'Rahul Sharma',
    collegeId: 'VTU4881',
    validUntil: 'Dec 2025',
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-lg">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-xl font-bold text-foreground mb-6">Student Alumni Guidance Virtual Card</h1>

          {/* Virtual Card Visual */}
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/5 rounded-full -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full -ml-8 -mb-8" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <CreditCard className="h-8 w-8" />
                <span className="text-xs opacity-80">{cardData.universityName}</span>
              </div>

              <div className="mb-4">
                <p className="text-xs opacity-70 mb-1">Card Number</p>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-mono font-bold tracking-wider">
                    {cardRevealed ? cardData.fullNumber : cardData.maskedNumber}
                  </p>
                  <button
                    onClick={() => setCardRevealed(!cardRevealed)}
                    className="p-1 rounded hover:bg-primary-foreground/10 transition-colors"
                  >
                    {cardRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-70">Student</p>
                  <p className="text-sm font-semibold">{cardData.studentName}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">College ID</p>
                  <p className="text-sm font-semibold">{cardData.collegeId}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">Valid Until</p>
                  <p className="text-sm font-semibold">{cardData.validUntil}</p>
                </div>
              </div>
            </div>
          </Card>

          <p className="text-xs text-muted-foreground text-center">
            This card was issued by your university alumni admin. Keep this number confidential.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default StudentVirtualCard;
