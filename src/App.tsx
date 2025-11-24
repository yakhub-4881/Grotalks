import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./lib/app-context";
import Landing from "./pages/Landing";
import UniversalLanding from "./pages/universal/UniversalLanding";
import About from "./pages/universal/About";
import Contact from "./pages/universal/Contact";
import Pricing from "./pages/universal/Pricing";
import FAQ from "./pages/universal/FAQ";
import Terms from "./pages/universal/Terms";
import Privacy from "./pages/universal/Privacy";
import Login from "./pages/Login";
import LoginOTP from "./pages/LoginOTP";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import BookingConfirmation from "./pages/BookingConfirmation";
import MentorRequests from "./pages/mentor/MentorRequests";

// Mentor Signup Flow
import MentorSignupPhone from "./pages/mentor/MentorSignupPhone";
import MentorSignupOTP from "./pages/mentor/MentorSignupOTP";
import MentorLinkedIn from "./pages/mentor/MentorLinkedIn";
import MentorBio from "./pages/mentor/MentorBio";
import MentorExpertise from "./pages/mentor/MentorExpertise";
import MentorAvailability from "./pages/mentor/MentorAvailability";
import MentorManageAvailability from "./pages/mentor/MentorManageAvailability";
import MentorPayment from "./pages/mentor/MentorPayment";
import MentorDashboard from "./pages/mentor/MentorDashboard";

// Mentee Signup Flow & Dashboard
import MenteeSignupPhone from "./pages/mentee/MenteeSignupPhone";
import MenteeSignupOTP from "./pages/mentee/MenteeSignupOTP";
import MenteeSignupProfile from "./pages/mentee/MenteeSignupProfile";
import MenteeSignupInterests from "./pages/mentee/MenteeSignupInterests";
import MenteeSignupLinkedInUPI from "./pages/mentee/MenteeSignupLinkedInUPI";
import MenteeWallet from "./pages/mentee/MenteeWallet";
import MenteeDashboard from "./pages/mentee/MenteeDashboard";
import BrowseMentors from "./pages/mentee/BrowseMentors";
import MenteeProfile from "./pages/mentee/MenteeProfile";
import MenteeSessions from "./pages/mentee/MenteeSessions";
import WalletRecharge from "./pages/mentee/WalletRecharge";
import BecomeMentor from "./pages/mentee/BecomeMentor";

// Booking & Feedback
import BookingSchedule from "./pages/BookingSchedule";
import FeedbackRating from "./pages/FeedbackRating";

// Mentor Profile & Withdrawal
import MentorProfile from "./pages/MentorProfile";
import MentorWithdraw from "./pages/mentor/MentorWithdraw";

// Chat Session
import ChatSession from "./pages/ChatSession";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/universal" element={<UniversalLanding />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/otp" element={<LoginOTP />} />
            <Route path="/booking/confirm" element={<BookingConfirmation />} />
            <Route path="/booking/schedule/:id" element={<BookingSchedule />} />
            <Route path="/mentor/profile/:id" element={<MentorProfile />} />
            <Route path="/feedback" element={<FeedbackRating />} />
            
            {/* Universal Website Pages */}
            <Route path="/universal/about" element={<About />} />
            <Route path="/universal/contact" element={<Contact />} />
            <Route path="/universal/pricing" element={<Pricing />} />
            <Route path="/universal/faq" element={<FAQ />} />
            <Route path="/universal/terms" element={<Terms />} />
            <Route path="/universal/privacy" element={<Privacy />} />
            
            {/* Mentor Routes */}
            <Route path="/mentor/signup" element={<MentorSignupPhone />} />
            <Route path="/mentor/signup/phone" element={<MentorSignupPhone />} />
            <Route path="/mentor/otp" element={<MentorSignupOTP />} />
            <Route path="/mentor/linkedin" element={<MentorLinkedIn />} />
            <Route path="/mentor/bio" element={<MentorBio />} />
            <Route path="/mentor/expertise" element={<MentorExpertise />} />
            <Route path="/mentor/availability" element={<MentorAvailability />} />
            <Route path="/mentor/manage-availability" element={<MentorManageAvailability />} />
            <Route path="/mentor/payment" element={<MentorPayment />} />
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />
            <Route path="/mentor/requests" element={<MentorRequests />} />
            <Route path="/mentor/profile" element={<MentorProfile />} />
            <Route path="/mentor/withdraw" element={<MentorWithdraw />} />
            
            {/* Mentee Routes */}
            <Route path="/mentee/signup" element={<MenteeSignupPhone />} />
            <Route path="/mentee/otp" element={<MenteeSignupOTP />} />
            <Route path="/mentee/signup/profile" element={<MenteeSignupProfile />} />
            <Route path="/mentee/interests" element={<MenteeSignupInterests />} />
            <Route path="/mentee/linkedin" element={<MenteeSignupLinkedInUPI />} />
            <Route path="/mentee/wallet" element={<MenteeWallet />} />
            <Route path="/mentee/wallet/recharge" element={<WalletRecharge />} />
            <Route path="/mentee/dashboard" element={<MenteeDashboard />} />
            <Route path="/mentee/browse" element={<BrowseMentors />} />
            <Route path="/mentee/profile" element={<MenteeProfile />} />
            <Route path="/mentee/sessions" element={<MenteeSessions />} />
            <Route path="/mentee/become-mentor" element={<BecomeMentor />} />
            
            {/* Chat Session */}
            <Route path="/session/:sessionId" element={<ChatSession />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
