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
import AlumniRequests from "./pages/alumni/AlumniRequests";

// Alumni Signup Flow
import AlumniSignupPhone from "./pages/alumni/AlumniSignupPhone";
import AlumniSignupOTP from "./pages/alumni/AlumniSignupOTP";
import AlumniLinkedIn from "./pages/alumni/AlumniLinkedIn";
import AlumniAlumniVerification from "./pages/alumni/AlumniAlumniVerification";
import AlumniBio from "./pages/alumni/AlumniBio";
import AlumniExpertise from "./pages/alumni/AlumniExpertise";
import AlumniAvailability from "./pages/alumni/AlumniAvailability";
import AlumniMeetingSetup from "./pages/alumni/AlumniMeetingSetup";
import AlumniManageAvailability from "./pages/alumni/AlumniManageAvailability";
import AlumniPayment from "./pages/alumni/AlumniPayment";
import AlumniDashboard from "./pages/alumni/AlumniDashboard";

// Mentee Signup Flow & Dashboard
import MenteeSignupPhone from "./pages/mentee/MenteeSignupPhone";
import MenteeSignupOTP from "./pages/mentee/MenteeSignupOTP";
import MenteeSignupProfile from "./pages/mentee/MenteeSignupProfile";
import MenteeSignupInterests from "./pages/mentee/MenteeSignupInterests";
import MenteeSignupLinkedInUPI from "./pages/mentee/MenteeSignupLinkedInUPI";
import MenteeWallet from "./pages/mentee/MenteeWallet";
import MenteeDashboard from "./pages/mentee/MenteeDashboard";
import BrowseAlumni from "./pages/mentee/BrowseAlumni";
import MenteeProfile from "./pages/mentee/MenteeProfile";
import MenteeSessions from "./pages/mentee/MenteeSessions";
import WalletRecharge from "./pages/mentee/WalletRecharge";
import BecomeAlumni from "./pages/mentee/BecomeAlumni";

// Booking & Feedback
import BookingSchedule from "./pages/BookingSchedule";
import FeedbackRating from "./pages/FeedbackRating";

// Alumni Profile & Withdrawal
import AlumniProfile from "./pages/AlumniProfile";
import AlumniProfileEdit from "./pages/alumni/AlumniProfile";
import AlumniReviews from "./pages/alumni/AlumniReviews";
import AlumniWithdraw from "./pages/alumni/AlumniWithdraw";

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
            <Route path="/alumni/profile/:id" element={<AlumniProfile />} />
            <Route path="/feedback" element={<FeedbackRating />} />
            
            {/* Universal Website Pages */}
            <Route path="/universal/about" element={<About />} />
            <Route path="/universal/contact" element={<Contact />} />
            <Route path="/universal/pricing" element={<Pricing />} />
            <Route path="/universal/faq" element={<FAQ />} />
            <Route path="/universal/terms" element={<Terms />} />
            <Route path="/universal/privacy" element={<Privacy />} />
            
            {/* Alumni Routes */}
            <Route path="/alumni/signup" element={<AlumniSignupPhone />} />
            <Route path="/alumni/signup/phone" element={<AlumniSignupPhone />} />
            <Route path="/alumni/otp" element={<AlumniSignupOTP />} />
            <Route path="/alumni/linkedin" element={<AlumniLinkedIn />} />
            <Route path="/alumni/alumni-verification" element={<AlumniAlumniVerification />} />
            <Route path="/alumni/bio" element={<AlumniBio />} />
            <Route path="/alumni/expertise" element={<AlumniExpertise />} />
            <Route path="/alumni/availability" element={<AlumniAvailability />} />
            <Route path="/alumni/meeting-setup" element={<AlumniMeetingSetup />} />
            <Route path="/alumni/manage-availability" element={<AlumniManageAvailability />} />
            <Route path="/alumni/payment" element={<AlumniPayment />} />
            <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
            <Route path="/alumni/requests" element={<AlumniRequests />} />
            <Route path="/alumni/profile/edit" element={<AlumniProfileEdit />} />
            <Route path="/alumni/reviews" element={<AlumniReviews />} />
            <Route path="/alumni/withdraw" element={<AlumniWithdraw />} />
            
            {/* Mentee Routes */}
            <Route path="/mentee/signup" element={<MenteeSignupPhone />} />
            <Route path="/mentee/otp" element={<MenteeSignupOTP />} />
            <Route path="/mentee/signup/profile" element={<MenteeSignupProfile />} />
            <Route path="/mentee/interests" element={<MenteeSignupInterests />} />
            <Route path="/mentee/linkedin" element={<MenteeSignupLinkedInUPI />} />
            <Route path="/mentee/wallet" element={<MenteeWallet />} />
            <Route path="/mentee/wallet/recharge" element={<WalletRecharge />} />
            <Route path="/mentee/dashboard" element={<MenteeDashboard />} />
            <Route path="/mentee/browse" element={<BrowseAlumni />} />
            <Route path="/mentee/profile" element={<MenteeProfile />} />
            <Route path="/mentee/sessions" element={<MenteeSessions />} />
            <Route path="/mentee/become-alumni" element={<BecomeAlumni />} />
            
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
