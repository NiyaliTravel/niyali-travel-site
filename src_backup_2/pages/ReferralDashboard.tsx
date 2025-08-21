import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useToast } from '../hooks/use-toast';
import { referralService } from '../services/referralService';
import { ReferralDashboardData, ReferralCode, ReferralReward } from '../types/referral';
import {
  Copy,
  Share2,
  Users,
  Gift,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Link2,
  Send,
  Star
} from 'lucide-react';

const ReferralDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<ReferralDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [selectedCode, setSelectedCode] = useState<ReferralCode | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Get current user ID from auth context (you'll need to implement this)
      const userId = 'current-user-id'; // Replace with actual user ID
      const data = await referralService.getUserDashboard(userId);
      setDashboardData(data);
      
      // Select first active code by default
      if (data?.active_codes.length) {
        setSelectedCode(data.active_codes[0]);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load referral dashboard',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateNewCode = async () => {
    setGeneratingCode(true);
    try {
      const userId = 'current-user-id'; // Replace with actual user ID
      const newCode = await referralService.generateReferralCode({
        owner_id: userId
      });
      
      if (newCode) {
        toast({
          title: 'Success',
          description: 'New referral code generated successfully!'
        });
        await loadDashboardData();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate referral code',
        variant: 'destructive'
      });
    } finally {
      setGeneratingCode(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard'
    });
  };

  const shareCode = (code: string) => {
    const shareUrl = `https://niyalitravel.com/register?ref=${code}`;
    const shareText = `Join NiyaliTravel using my referral code ${code} and we both get rewards!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join NiyaliTravel',
        text: shareText,
        url: shareUrl
      });
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const redeemReward = async (rewardId: string) => {
    try {
      const userId = 'current-user-id'; // Replace with actual user ID
      const success = await referralService.redeemReward(rewardId, userId);
      
      if (success) {
        toast({
          title: 'Success',
          description: 'Reward redeemed successfully!'
        });
        await loadDashboardData();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to redeem reward',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>
            Unable to load referral dashboard. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { user_stats, active_codes, recent_referrals, pending_rewards, current_tier, next_tier } = dashboardData;
  const progressToNextTier = next_tier
    ? ((user_stats.successful_referrals - current_tier.min_referrals) /
       (next_tier.min_referrals - current_tier.min_referrals)) * 100
    : 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Referral Program</h1>
          <p className="text-muted-foreground">Share the love and earn rewards!</p>
        </div>
        <Button onClick={generateNewCode} disabled={generatingCode}>
          <Gift className="mr-2 h-4 w-4" />
          Generate New Code
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user_stats.total_referrals}</div>
            <p className="text-xs text-muted-foreground">
              {user_stats.pending_referrals} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Referrals</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user_stats.successful_referrals}</div>
            <p className="text-xs text-muted-foreground">
              Completed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${user_stats.total_rewards_earned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${user_stats.total_rewards_pending.toFixed(2)} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lifetime Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${user_stats.lifetime_value_generated.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Generated from referrals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Tier Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your Referral Tier
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {current_tier.badge_url && (
                <img src={current_tier.badge_url} alt={current_tier.name} className="h-12 w-12" />
              )}
              <div>
                <h3 className="font-semibold text-lg">{current_tier.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {current_tier.reward_multiplier}x rewards multiplier
                </p>
              </div>
            </div>
            {next_tier && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Next tier</p>
                <p className="font-semibold">{next_tier.name}</p>
              </div>
            )}
          </div>
          
          {next_tier && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{user_stats.successful_referrals} referrals</span>
                <span>{next_tier.min_referrals} needed</span>
              </div>
              <Progress value={progressToNextTier} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {next_tier.min_referrals - user_stats.successful_referrals} more referrals to reach {next_tier.name}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {current_tier.perks?.map((perk, index) => (
              <Badge key={index} variant="secondary">
                <Star className="h-3 w-3 mr-1" />
                {perk}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="codes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="codes">My Codes</TabsTrigger>
          <TabsTrigger value="referrals">Recent Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* My Codes Tab */}
        <TabsContent value="codes" className="space-y-4">
          {active_codes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">You don't have any active referral codes yet.</p>
                <Button onClick={generateNewCode}>Generate Your First Code</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {active_codes.map((code) => (
                <Card key={code.id} className={selectedCode?.id === code.id ? 'ring-2 ring-primary' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-mono">{code.code}</CardTitle>
                        <CardDescription>
                          Used {code.current_uses} {code.max_uses ? `/ ${code.max_uses}` : ''} times
                        </CardDescription>
                      </div>
                      <Badge variant={code.status === 'active' ? 'default' : 'secondary'}>
                        {code.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reward Type:</span>
                        <span className="font-medium">{code.reward_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Referrer Reward:</span>
                        <span className="font-medium">
                          {code.reward_type === 'percentage' ? `${code.referrer_reward_value}%` : `$${code.referrer_reward_value}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Friend Reward:</span>
                        <span className="font-medium">
                          {code.reward_type === 'percentage' ? `${code.reward_value}%` : `$${code.reward_value}`}
                        </span>
                      </div>
                      {code.valid_until && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expires:</span>
                          <span className="font-medium">{new Date(code.valid_until).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => copyToClipboard(`https://niyalitravel.com/register?ref=${code.code}`)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => shareCode(code.code)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Recent Referrals Tab */}
        <TabsContent value="referrals" className="space-y-4">
          {recent_referrals.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No referrals yet. Share your code to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Recent Referrals</CardTitle>
                <CardDescription>Track your referral progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recent_referrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          referral.status === 'completed' ? 'bg-green-100' :
                          referral.status === 'pending' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          {referral.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : referral.status === 'pending' ? (
                            <Clock className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">New referral</p>
                          <p className="text-sm text-muted-foreground">
                            Registered {new Date(referral.registration_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={referral.status === 'completed' ? 'default' : 'secondary'}
                        className={
                          referral.status === 'completed' ? 'bg-green-100 text-green-800' :
                          referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          ''
                        }
                      >
                        {referral.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          {pending_rewards.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No rewards available yet. Keep referring to earn rewards!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pending_rewards.map((reward) => (
                <Card key={reward.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        reward.status === 'approved' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        <DollarSign className={`h-6 w-6 ${
                          reward.status === 'approved' ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {reward.reward_type === 'cash' ? 'Cash Reward' :
                           reward.reward_type === 'credit' ? 'Store Credit' :
                           reward.reward_type === 'points' ? 'Reward Points' :
                           'Discount Code'}
                        </p>
                        <p className="text-2xl font-bold">
                          {reward.reward_type === 'points' ? 
                            `${reward.reward_amount} points` :
                            `$${reward.reward_amount.toFixed(2)}`
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {reward.recipient_type === 'referrer' ? 'Referral bonus' : 'Welcome bonus'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {reward.status === 'approved' ? (
                        <Button onClick={() => redeemReward(reward.id)}>
                          Redeem Now
                        </Button>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      )}
                      {reward.expires_at && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Expires {new Date(reward.expires_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Share Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="text-center py-8">
          <Send className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Invite Friends & Earn Together</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Share your unique referral code with friends. When they book their first trip, 
            you both get rewarded! The more you share, the more you earn.
          </p>
          {selectedCode && (
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                value={`https://niyalitravel.com/register?ref=${selectedCode.code}`}
                readOnly
                className="flex-1"
              />
              <Button onClick={() => shareCode(selectedCode.code)}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralDashboard;