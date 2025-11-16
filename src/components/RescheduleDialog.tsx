import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, Clock } from 'lucide-react';

interface RescheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (date: string, time: string, reason: string) => void;
  isMentor?: boolean;
}

export const RescheduleDialog = ({ open, onOpenChange, onSubmit, isMentor = false }: RescheduleDialogProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!date || !time) return;
    onSubmit(date, time, reason);
    // Reset form
    setDate('');
    setTime('');
    setReason('');
    onOpenChange(false);
  };

  const isValid = date && time && reason.length >= 10;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
          <DialogDescription>
            {isMentor 
              ? 'Propose a new date and time for this session. The student will be notified.'
              : 'Request a different time slot. The mentor will review your request.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              New Date*
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              New Time*
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Rescheduling* (min 10 characters)</Label>
            <Textarea
              id="reason"
              placeholder="Please explain why you need to reschedule..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-20 resize-none"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">{reason.length}/200 characters</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Send Reschedule Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
