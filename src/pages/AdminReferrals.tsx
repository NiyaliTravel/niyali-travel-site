import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { referralService } from '@/services/referralService';
import { supabase } from '@/lib/supabase';
import {
  Users,
  Gift,
  TrendingUp,
  DollarSign,
  Award,
  BarChart3,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Eye,
  Settings,
  Calendar,
  Hash,
  Percent,
  AlertCircle
} from 'lucide-react';

interface AdminReferralData {
  totalCodes: number;
  activeCodes: number;
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalRewardsIssued: number;
  totalRewardsPending: number;
  totalRevenuGenerated: number;
  referralCodes: any[];
  referrals: any[];
  rewards: any[];
  topReferrers: any[];
}

const AdminReferrals: React.FC = () => {
  const [data, setData] = useState<AdminReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [selectedReferral, setSelectedReferral] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadAdminData();
  }, [selectedTimeRange]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Get all referral codes
      const { data: codes, error: codesError } = await supabase
        .from('referral_codes')
        .select('*')
        .order('created_at', { ascending: false });

      // Get all referrals
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select(`
          *,
          referral_codes (code, reward_type, reward_value),
          travelers:referred_id (name, email)
        `)
        .order('created_at', { ascending: false });

      // Get all rewards
      const { data: rewards, error: rewardsError } = await supabase
        .from('referral_rewards')
        .select(`
          *,
          travelers:recipient_id (name, email)
        `)
        .order('created_at', { ascending: false });

      // Get top referrers
      const { data: topReferrers, error: topError } = await supabase
        .from('referral_stats')
        .select(`
          *,
          travelers:user_id (name, email, profile_picture_url)
        `)
        .order('successful_referrals', { ascending: false })
        .limit(10);

      // Calculate statistics
      const totalCodes = codes?.length || 0;
      const activeCodes = codes?.filter(c => c.status === 'active').length || 0;
      const totalReferrals = referrals?.length || 0;
      const successfulReferrals = referrals?.filter(r => r.status === 'completed').length || 0;
      const pendingReferrals = referrals?.filter(r => r.status === 'pending').length || 0;
      const totalRewardsIssued = rewards?.reduce((sum, r) => sum + (r.status === 'paid' ? r.reward_amount : 0), 0) || 0;
      const totalRewardsPending = rewards?.reduce((sum, r) => sum + (r.status !== 'paid' ? r.reward_amount : 0), 0) || 0;
      const totalRevenuGenerated = topReferrers?.reduce((sum, r) => sum + r.lifetime_value_generated, 0) || 0;

      setData({
        totalCodes,
        activeCodes,
        totalReferrals,
        successfulReferrals,
        pendingReferrals,
        totalRewardsIssued,
        totalRewardsPending,
        totalRevenuGenerated,
        referralCodes: codes || [],
        referrals: referrals || [],
        rewards: rewards || [],
        topReferrers: topReferrers || []
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load admin data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const approveReward = async (rewardId: string) => {
    try {
      const { error } = await supabase
        .from('referral_rewards')
        .update({ status: 'approved' })
        .eq('id', rewardId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Reward approved successfully'
      });
      
      await loadAdminData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve reward',
        variant: 'destructive'
      });
    }
  };

  const rejectReward = async (rewardId: string) => {
    try {
      const { error } = await supabase
        .from('referral_rewards')
        .update({ status: 'cancelled' })
        .eq('id', rewardId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Reward rejected successfully'
      });
      
      await loadAdminData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject reward',
        variant: 'destructive'
      });
    }
  };

  const deactivateCode = async (codeId: string) => {
    try {
      const { error } = await supabase
        .from('referral_codes')
        .update({ status: 'inactive' })
        .eq('id', codeId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Referral code deactivated'
      });
      
      await loadAdminData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to deactivate code',
        variant: 'destructive'
      });
    }
  };

  const exportData = () => {
    // Convert data to CSV
    const csvContent = generateCSV(data?.referrals || []);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referrals_${new Date().toISOString()}.csv`;
    a.click();
  };

  const generateCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    
    return [headers, ...rows].join('\n');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>
            Unable to load admin data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const filteredCodes = data.referralCodes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || code.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredReferrals = data.referrals.filter(referral => {
    const matchesFilter = filterStatus === 'all' || referral.status === filterStatus;
    return matchesFilter;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Referral Management</h1>
          <p className="text-muted-foreground">Monitor and manage the referral program</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportData} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Codes</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalCodes}</div>
            <p className="text-xs text-muted-foreground">
              {data.activeCodes} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">
              {data.successfulReferrals} successful
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards Issued</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalRewardsIssued.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${data.totalRewardsPending.toFixed(2)} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalRevenuGenerated.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From referrals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="codes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="codes">Referral Codes</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        {/* Referral Codes Tab */}
        <TabsContent value="codes" className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCodes.map((code) => (
                    <TableRow key={code.id}>
                      <TableCell className="font-mono">{code.code}</TableCell>
                      <TableCell>{code.owner_id}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={code.status === 'active' ? 'default' : 'secondary'}
                          className={code.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {code.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{code.reward_type}</TableCell>
                      <TableCell>
                        {code.reward_type === 'percentage' ? 
                          `${code.reward_value}%` : 
                          `$${code.reward_value}`
                        }
                      </TableCell>
                      <TableCell>
                        {code.current_uses} / {code.max_uses || '∞'}
                      </TableCell>
                      <TableCell>{new Date(code.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setSelectedReferral(code)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {code.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deactivateCode(code.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referral Code</TableHead>
                    <TableHead>Referrer</TableHead>
                    <TableHead>Referred User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>First Booking</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReferrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-mono">
                        {referral.referral_codes?.code}
                      </TableCell>
                      <TableCell>{referral.referrer_id}</TableCell>
                      <TableCell>
                        {referral.travelers?.name || 'N/A'}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          {referral.travelers?.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            referral.status === 'completed' ? 'default' : 
                            referral.status === 'pending' ? 'secondary' :
                            'destructive'
                          }
                          className={
                            referral.status === 'completed' ? 'bg-green-100 text-green-800' :
                            referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            ''
                          }
                        >
                          {referral.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(referral.registration_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {referral.first_booking_date ? 
                          new Date(referral.first_booking_date).toLocaleDateString() :
                          'Not yet'
                        }
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedReferral(referral)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reward Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.rewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell>
                        {reward.travelers?.name || 'N/A'}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          {reward.travelers?.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {reward.recipient_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{reward.reward_type}</TableCell>
                      <TableCell className="font-semibold">
                        ${reward.reward_amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            reward.status === 'paid' ? 'default' :
                            reward.status === 'approved' ? 'secondary' :
                            reward.status === 'pending' ? 'outline' :
                            'destructive'
                          }
                          className={
                            reward.status === 'paid' ? 'bg-green-100 text-green-800' :
                            reward.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                            reward.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            ''
                          }
                        >
                          {reward.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(reward.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {reward.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="text-green-600"
                                onClick={() => approveReward(reward.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="text-red-600"
                                onClick={() => rejectReward(reward.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setSelectedReferral(reward)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>Users with the most successful referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topReferrers.map((referrer, index) => (
                  <div key={referrer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-3">
                        {referrer.travelers?.profile_picture_url ? (
                          <img 
                            src={referrer.travelers.profile_picture_url} 
                            alt={referrer.travelers.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{referrer.travelers?.name || 'N/A'}</p>
                          <p className="text-sm text-muted-foreground">{referrer.travelers?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Referrals</p>
                          <p className="text-xl font-bold">{referrer.successful_referrals}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rewards Earned</p>
                          <p className="text-xl font-bold">${referrer.total_rewards_earned.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue Generated</p>
                          <p className="text-xl font-bold">${referrer.lifetime_value_generated.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={!!selectedReferral} onOpenChange={() => setSelectedReferral(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Referral Details</DialogTitle>
            <DialogDescription>
              Complete information about this referral
            </DialogDescription>
          </DialogHeader>
          {selectedReferral && (
            <div className="space-y-4">
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(selectedReferral, null, 2)}
              </pre>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReferrals;