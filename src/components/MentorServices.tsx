import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/college-config';
import { Plus, Edit2, Trash2, Video, MessageSquare, Users, Package, GraduationCap, FileText, ArrowRight, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface MentorService {
  id: number;
  type: 'call' | 'dm' | 'workshop' | 'product' | 'package';
  title: string;
  duration: number;
  price: number;
  description?: string;
}

const serviceTypes = [
  { id: 'call', label: '1:1 Call', description: 'Conduct 1:1 video sessions', icon: Video },
  { id: 'dm', label: 'Priority DM', description: 'Setup your priority inbox', icon: MessageSquare },
  { id: 'workshop', label: 'Workshops/Live Cohorts', description: 'Host one time or recurring group sessions', icon: Users },
  { id: 'product', label: 'Products/Courses', description: 'Sell digital products, courses, paid videos & more', icon: GraduationCap },
  { id: 'package', label: 'Package', description: 'Bundle your offerings into one', icon: Package },
] as const;

const getServiceIcon = (type: MentorService['type']) => {
  const typeConfig = serviceTypes.find(t => t.id === type);
  return typeConfig?.icon || Video;
};

const getServiceLabel = (type: MentorService['type']) => {
  const typeConfig = serviceTypes.find(t => t.id === type);
  return typeConfig?.label || '1:1 Call';
};

interface MentorServicesProps {
  services: MentorService[];
  onServicesChange?: (services: MentorService[]) => void;
  isEditable?: boolean;
  onBookService?: (service: MentorService) => void;
}

export const MentorServices = ({ 
  services, 
  onServicesChange, 
  isEditable = false,
  onBookService 
}: MentorServicesProps) => {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState<MentorService | null>(null);
  const [selectedType, setSelectedType] = useState<MentorService['type']>('call');
  const [formData, setFormData] = useState({
    title: '',
    duration: 30,
    price: 2000,
    description: ''
  });

  const handleAdd = () => {
    setEditingService(null);
    setSelectedType('call');
    setFormData({ title: '', duration: 30, price: 2000, description: '' });
    setShowDialog(true);
  };

  const handleEdit = (service: MentorService) => {
    setEditingService(service);
    setSelectedType(service.type);
    setFormData({
      title: service.title,
      duration: service.duration,
      price: service.price,
      description: service.description || ''
    });
    setShowDialog(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a service title',
        variant: 'destructive'
      });
      return;
    }

    if (formData.price < 500 || formData.price > 10000) {
      toast({
        title: 'Validation Error',
        description: 'Price must be between ₹500 and ₹10,000',
        variant: 'destructive'
      });
      return;
    }

    if (editingService) {
      const updated = services.map(s => 
        s.id === editingService.id 
          ? { ...s, type: selectedType, ...formData }
          : s
      );
      onServicesChange?.(updated);
      toast({ title: 'Service updated successfully' });
    } else {
      const newService: MentorService = {
        id: Date.now(),
        type: selectedType,
        ...formData
      };
      onServicesChange?.([...services, newService]);
      toast({ title: 'Service added successfully' });
    }

    setShowDialog(false);
  };

  const handleDelete = (id: number) => {
    onServicesChange?.(services.filter(s => s.id !== id));
    toast({ title: 'Service removed' });
  };

  return (
    <div className="space-y-3">
      {isEditable && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Services Offered</h3>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      )}

      {services.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">
          <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No services listed yet</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {services.map((service) => {
            const Icon = getServiceIcon(service.type);
            return (
              <Card 
                key={service.id} 
                className={`p-4 transition-all ${!isEditable ? 'hover:shadow-md hover:border-primary/30 cursor-pointer group' : ''}`}
                onClick={() => !isEditable && onBookService?.(service)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground mb-0.5">{getServiceLabel(service.type)}{service.duration > 0 && ` • ${service.duration} mins`}</p>
                        <h4 className="font-semibold text-foreground text-sm">{service.title}</h4>
                      </div>
                      {/* Subtle arrow button for booking */}
                      {!isEditable && (
                        <button 
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookService?.(service);
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {service.description && (
                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{service.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-foreground">{formatPrice(service.price)}</span>
                    </div>
                  </div>
                </div>

                {isEditable && (
                  <div className="flex gap-2 justify-end mt-3 pt-3 border-t">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(service)} className="h-8 text-xs">
                      <Edit2 className="h-3 w-3 md:mr-2" />
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(service.id)} className="h-8 text-xs text-destructive">
                      <Trash2 className="h-3 w-3 md:mr-2" />
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Add/Edit Service Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              Configure your service details below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Service Type Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select type</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {serviceTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id as MentorService['type'])}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        {type.label}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="service-title">Title</Label>
              <Input
                id="service-title"
                placeholder="Name of Service"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="service-duration">Duration (mins)</Label>
              <Input
                id="service-duration"
                type="number"
                min={15}
                max={180}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="service-price">Amount (₹)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="service-price"
                  type="number"
                  min={500}
                  max={10000}
                  className="pl-7"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 2000 })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingService ? 'Save Changes' : 'Add Service'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};