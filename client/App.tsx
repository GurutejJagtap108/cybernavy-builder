import ProfilePage from "./pages/Profile";
import React, { useEffect, useState } from "react";
// ErrorBoundary component to catch runtime errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    // Log error to an error reporting service if needed
    console.error("[ErrorBoundary] Caught error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-8">
          <h1 className="text-3xl font-bold mb-4 text-red-500">Something went wrong</h1>
          <p className="mb-4 text-foreground/70">An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.</p>
          <pre className="bg-white/10 rounded p-4 text-left text-xs max-w-xl overflow-x-auto mb-4">{String(this.state.error)}</pre>
          <button className="px-4 py-2 bg-cyan-500 text-white rounded" onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Docs from "./pages/Docs";
import Company from "./pages/company";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "@/components/common/PlaceholderPage";
import Solutions from "./pages/solutions";
import Blog from "./pages/blog";
import Legal from "./pages/Legal";
import AppDashboard from "@/pages/AppDashboard";
import Pricing from "./pages/pricing";
import { PageFade } from "@/components/common/PageFade";
import { I18nProvider } from "@/i18n/i18n";

import Threats from "./pages/dashboard/Threats";
import Detection from "./pages/dashboard/Detection";
import Moderation from "./pages/dashboard/Moderation";
import URLManager from "./pages/dashboard/URLManager";
import Alerts from "./pages/dashboard/Alerts";
import Incidents from "./pages/dashboard/Incidents";
import Network from "./pages/dashboard/Network";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import Integrations from "./pages/dashboard/Integrations";

const queryClient = new QueryClient();

function Protected({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!cancelled) {
          setAuthed(!!data?.email);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuthed(false);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);
  if (loading) {
    return <div className="flex items-center justify-center min-h-[40vh] text-lg">Loading...</div>;
  }
  if (!authed) {
    return (
      <div className="mx-auto max-w-[800px] p-6">
        <PlaceholderPage
          title="Sign in required"
          description="This area is protected. Please sign in to continue."
          showAuthButtons
        />
      </div>
    );
  }
  return <>{children}</>;
}



const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <PageFade>
                  <Routes>
                    <Route
                      path="/profile"
                      element={
                        <Protected>
                          <ProfilePage />
                        </Protected>
                      }
                    />
                    <Route path="/" element={<Index />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/docs" element={<Docs />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/legal" element={<Legal />} />

                    {/* Dashboard main and function routes */}
                    <Route
                      path="/app"
                      element={
                        <Protected>
                          <AppDashboard />
                        </Protected>
                      }
                    />
                    <Route path="/app/threats" element={<Protected><Threats /></Protected>} />
                    <Route path="/app/detection" element={<Protected><Detection /></Protected>} />
                    <Route path="/app/moderation" element={<Protected><Moderation /></Protected>} />
                    <Route path="/app/url-manager" element={<Protected><URLManager /></Protected>} />
                    <Route path="/app/alerts" element={<Protected><Alerts /></Protected>} />
                    <Route path="/app/incidents" element={<Protected><Incidents /></Protected>} />
                    <Route path="/app/network" element={<Protected><Network /></Protected>} />
                    <Route path="/app/reports" element={<Protected><Reports /></Protected>} />
                    <Route path="/app/settings" element={<Protected><Settings /></Protected>} />
                    <Route path="/app/integrations" element={<Protected><Integrations /></Protected>} />

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageFade>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;


