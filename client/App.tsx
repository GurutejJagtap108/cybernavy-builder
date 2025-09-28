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
import Legal from "./pages/Legal";
import AppDashboard from "@/pages/AppDashboard";
import { I18nProvider } from "@/i18n/i18n";

const queryClient = new QueryClient();

function Protected({ children }: { children: React.ReactNode }) {
  // SSO-ready guard placeholder
  const authed = localStorage.getItem("cn_authed") === "1";
  if (!authed)
    return (
      <div className="mx-auto max-w-[800px] p-6">
        <PlaceholderPage
          title="Sign in required"
          description="This area is protected. Hook up your SSO provider here. For now, click the button to simulate sign in."
        />
        <div className="mt-4">
          <button
            onClick={() => {
              localStorage.setItem("cn_authed", "1");
              location.reload();
            }}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Simulate SSO Sign in
          </button>
        </div>
      </div>
    );
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/solutions"
              element={<PlaceholderPage title="Solutions" />}
            />
            <Route
              path="/pricing"
              element={<PlaceholderPage title="Pricing" />}
            />
            <Route path="/docs" element={<Docs />} />
            <Route
              path="/blog"
              element={<PlaceholderPage title="Blog & Resources" />}
            />
            <Route path="/company" element={<Company />} />
            <Route path="/legal" element={<Legal />} />

            <Route
              path="/app"
              element={
                <Protected>
                  <AppDashboard />
                </Protected>
              }
            />
            <Route
              path="/app/:rest"
              element={
                <Protected>
                  <AppDashboard />
                </Protected>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")! as HTMLElement;
const rootKey = "__CYBERNAVY_REACT_ROOT__";
// reuse root during HMR to avoid createRoot being called multiple times
if (!(window as any)[rootKey]) {
  (window as any)[rootKey] = createRoot(container);
}
(window as any)[rootKey].render(<App />);

if (import.meta.hot) {
  import.meta.hot.accept();
}
