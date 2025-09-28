import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem("cn_cookie_consent");
    setVisible(!v);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 inset-x-4 md:left-1/2 md:-translate-x-1/2 md:inset-x-auto md:w-[560px] z-50 glass-card p-4 md:p-5">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <p className="text-sm text-foreground/80">
          We use minimal cookies to analyze usage. No tracking across sites. See
          our{" "}
          <a className="underline" href="/legal">
            Privacy
          </a>
          .
        </p>
        <div className="ml-auto flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              localStorage.setItem("cn_cookie_consent", "dismissed");
              setVisible(false);
            }}
          >
            Dismiss
          </Button>
          <Button
            onClick={() => {
              localStorage.setItem("cn_cookie_consent", "accepted");
              setVisible(false);
            }}
            className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
