import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Gift, CheckCircle, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { referralService } from '@/services/referralService';
import { ReferralValidationResult } from '@/types/referral';

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'traveler' as 'traveler' | 'agent',
    company: '',
    country: '',
    contactNumber: '',
    whatsappNumber: '',
    referralCode: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [referralValidation, setReferralValidation] = useState<ReferralValidationResult | null>(null);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  // Check for referral code in URL parameters
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      handleInputChange('referralCode', refCode);
      validateReferralCode(refCode);
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate referral code when it changes
    if (field === 'referralCode' && typeof value === 'string') {
      if (value.length > 0) {
        validateReferralCode(value);
      } else {
        setReferralValidation(null);
      }
    }
  };

  const validateReferralCode = async (code: string) => {
    if (!code) {
      setReferralValidation(null);
      return;
    }
    
    setIsValidatingCode(true);
    try {
      const result = await referralService.validateReferralCode(code);
      setReferralValidation(result);
    } catch (error) {
      setReferralValidation({
        is_valid: false,
        message: 'Error validating referral code'
      });
    } finally {
      setIsValidatingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      // Register the user first
      const registrationData = { ...formData };
      delete (registrationData as any).referralCode; // Remove referral code from registration data
      
      const userId = await register(registrationData);
      if (userId) {
        // Apply referral code if provided and valid
        if (formData.referralCode && referralValidation?.is_valid) {
          await referralService.applyReferralCode({
            code: formData.referralCode,
            referred_user_id: userId
          });
        }
        
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NiyaliTravel
            </span>
          </div>
          <CardTitle className="text-2xl">Join NiyaliTravel</CardTitle>
          <CardDescription>
            Create your account and start your Maldivian adventure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={formData.role} onValueChange={(value: 'traveler' | 'agent') => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traveler">Traveler</SelectItem>
                  <SelectItem value="agent">Travel Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === 'agent' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Enter your country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  placeholder="+1 234 567 8900"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  placeholder="+1 234 567 8900"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Referral Code Section */}
            <div className="space-y-2">
              <Label htmlFor="referralCode" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Referral Code (Optional)
              </Label>
              <div className="relative">
                <Input
                  id="referralCode"
                  placeholder="Enter referral code"
                  value={formData.referralCode}
                  onChange={(e) => handleInputChange('referralCode', e.target.value)}
                  className={
                    referralValidation
                      ? referralValidation.is_valid
                        ? 'border-green-500 pr-10'
                        : 'border-red-500 pr-10'
                      : 'pr-10'
                  }
                />
                {isValidatingCode && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  </div>
                )}
                {!isValidatingCode && referralValidation && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {referralValidation.is_valid ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Info className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {referralValidation && (
                <p className={`text-sm ${referralValidation.is_valid ? 'text-green-600' : 'text-red-600'}`}>
                  {referralValidation.message}
                </p>
              )}
              {formData.referralCode && referralValidation?.is_valid && (
                <Alert className="bg-green-50 border-green-200">
                  <Gift className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Great! You'll receive rewards after your first booking.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;