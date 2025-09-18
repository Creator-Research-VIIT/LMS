'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, FileText, Calendar, Users, DollarSign } from 'lucide-react';

interface CourseAccessAgreementProps {
  onClose: () => void;
}

export default function CourseAccessAgreement({ onClose }: CourseAccessAgreementProps) {
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    phone: '',
    courseName: '',
    instructorName: '',
    duration: '',
    maxStudents: '',
    accessFee: '',
    startDate: '',
    endDate: '',
    description: '',
    requirements: '',
    termsAccepted: false,
    privacyAccepted: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted || !formData.privacyAccepted) {
      alert('Please accept all terms and conditions');
      return;
    }
    
    // Here you would typically send the data to your API
    console.log('Agreement submitted:', formData);
    alert('Course access agreement submitted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Course Access Agreement</CardTitle>
                <p className="text-sm text-gray-600">Partnership agreement for external course access</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Institution Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Institution Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="institutionName">Institution Name *</Label>
                  <Input
                    id="institutionName"
                    value={formData.institutionName}
                    onChange={(e) => handleInputChange('institutionName', e.target.value)}
                    placeholder="e.g., Tech University"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    placeholder="e.g., Dr. John Smith"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contact@institution.edu"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="courseName">Course Name *</Label>
                  <Input
                    id="courseName"
                    value={formData.courseName}
                    onChange={(e) => handleInputChange('courseName', e.target.value)}
                    placeholder="e.g., Advanced Machine Learning"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="instructorName">Instructor Name *</Label>
                  <Input
                    id="instructorName"
                    value={formData.instructorName}
                    onChange={(e) => handleInputChange('instructorName', e.target.value)}
                    placeholder="e.g., Prof. Sarah Johnson"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Course Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 12 weeks"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxStudents">Maximum Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                    placeholder="e.g., 50"
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description of the course content, objectives, and learning outcomes..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="requirements">Prerequisites & Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="List any prerequisites, technical requirements, or special conditions..."
                  rows={3}
                />
              </div>
            </div>

            {/* Financial Terms */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Financial Terms</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accessFee">Course Access Fee (USD) *</Label>
                  <Input
                    id="accessFee"
                    type="number"
                    step="0.01"
                    value={formData.accessFee}
                    onChange={(e) => handleInputChange('accessFee', e.target.value)}
                    placeholder="e.g., 299.99"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Fee Structure</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Course access fee covers full duration access</li>
                  <li>• Payment will be processed through our secure platform</li>
                  <li>• Revenue sharing will be discussed separately</li>
                  <li>• Refund policy applies as per standard terms</li>
                </ul>
              </div>
            </div>

            {/* Agreement Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Agreement Summary</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Duration</span>
                    </div>
                    <p className="text-lg font-bold text-blue-700 mt-1">
                      {formData.duration || 'TBD'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-900">Max Students</span>
                    </div>
                    <p className="text-lg font-bold text-emerald-700 mt-1">
                      {formData.maxStudents || 'TBD'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Access Fee</span>
                    </div>
                    <p className="text-lg font-bold text-purple-700 mt-1">
                      ${formData.accessFee || '0.00'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-900">Status</span>
                    </div>
                    <Badge className="mt-1 bg-orange-100 text-orange-700 hover:bg-orange-100">
                      Draft
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">5</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Terms & Conditions</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                  />
                  <Label htmlFor="termsAccepted" className="text-sm leading-relaxed">
                    I agree to the <span className="text-blue-600 underline cursor-pointer">Course Partnership Terms</span> including content standards, quality requirements, and intellectual property guidelines.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked as boolean)}
                  />
                  <Label htmlFor="privacyAccepted" className="text-sm leading-relaxed">
                    I acknowledge the <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span> and data sharing agreements for student information and course analytics.
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!formData.termsAccepted || !formData.privacyAccepted}
              >
                Submit Agreement
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}