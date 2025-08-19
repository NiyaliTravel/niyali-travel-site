import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Building2, Lock, Mail, Phone, User, Briefcase } from "lucide-react";

export default function AgentLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
    whatsappNumber: "",
    bio: ""
  });

  const loginMutation = useMutation({
    mutationFn: async (data: typeof loginData) => {
      return await apiRequest("/api/agents/login", {
        method: "POST",
        body: JSON.stringify(data)
      });
    },
    onSuccess: (data) => {
      localStorage.setItem("agentToken", data.token);
      localStorage.setItem("agentProfile", JSON.stringify(data.agent));
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to your agent account"
      });
      setLocation("/agent-portal");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials or not a verified agent",
        variant: "destructive"
      });
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: typeof registerData) => {
      return await apiRequest("/api/agents/register", {
        method: "POST",
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      toast({
        title: "Registration submitted!",
        description: "Your B2B agent application has been submitted for review. We'll contact you within 24-48 hours."
      });
      setIsRegistering(false);
      setRegisterData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        companyName: "",
        whatsappNumber: "",
        bio: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Failed to submit registration",
        variant: "destructive"
      });
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
        >
          <div className="absolute inset-0 bg-niyali-navy bg-opacity-80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            B2B Agent <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">Portal</span>
          </h1>
          <p className="text-xl mb-6">
            Exclusive access for registered travel agents and partners
          </p>
        </div>
      </section>

      {/* Login/Register Section */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-4">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register as Agent</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Login</CardTitle>
                  <CardDescription>
                    Access your B2B agent dashboard and manage your bookings
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="agent@company.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                          className="pl-10"
                          data-testid="input-login-email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                          className="pl-10"
                          data-testid="input-login-password"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-niyali-gradient text-white"
                      disabled={loginMutation.isPending}
                      data-testid="button-agent-login"
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login to Agent Portal"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Registration Tab */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register as B2B Agent</CardTitle>
                  <CardDescription>
                    Apply to become a verified travel agent partner
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-firstName">First Name</Label>
                        <Input
                          id="reg-firstName"
                          placeholder="John"
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                          required
                          data-testid="input-reg-firstname"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-lastName">Last Name</Label>
                        <Input
                          id="reg-lastName"
                          placeholder="Doe"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                          required
                          data-testid="input-reg-lastname"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-companyName">Company Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="reg-companyName"
                          placeholder="Travel Agency Name"
                          value={registerData.companyName}
                          onChange={(e) => setRegisterData({ ...registerData, companyName: e.target.value })}
                          required
                          className="pl-10"
                          data-testid="input-reg-company"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Business Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="agent@company.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                          className="pl-10"
                          data-testid="input-reg-email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-phone">Business Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="reg-phone"
                          type="tel"
                          placeholder="+960 1234567"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                          required
                          className="pl-10"
                          data-testid="input-reg-phone"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-whatsapp">WhatsApp Number</Label>
                      <Input
                        id="reg-whatsapp"
                        type="tel"
                        placeholder="+960 1234567"
                        value={registerData.whatsappNumber}
                        onChange={(e) => setRegisterData({ ...registerData, whatsappNumber: e.target.value })}
                        data-testid="input-reg-whatsapp"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                          className="pl-10"
                          data-testid="input-reg-password"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-bio">About Your Business</Label>
                      <textarea
                        id="reg-bio"
                        placeholder="Tell us about your travel agency..."
                        value={registerData.bio}
                        onChange={(e) => setRegisterData({ ...registerData, bio: e.target.value })}
                        className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                        data-testid="textarea-reg-bio"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-niyali-gradient text-white"
                      disabled={registerMutation.isPending}
                      data-testid="button-agent-register"
                    >
                      {registerMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Need help? Contact our B2B support team:</p>
            <p className="mt-2">
              <a href="mailto:agents@niyalitravel.com" className="text-niyali-navy hover:underline">
                agents@niyalitravel.com
              </a>
              {" | "}
              <a href="tel:+9609107338" className="text-niyali-navy hover:underline">
                +960 910 7338
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}