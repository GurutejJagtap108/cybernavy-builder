import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import PlaceholderPage from "@/components/common/PlaceholderPage";

const Legal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-2xl bg-gradient-to-r from-white/5 via-white/3 to-white/5 p-8 shadow-lg backdrop-blur-md ring-1 ring-white/6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">Legal & Terms</h1>
              <p className="mt-2 text-slate-300 max-w-2xl">
                Everything you need to know — terms, privacy, copyright, DMCA and more. We keep it short, scannable and fair.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-md bg-gradient-to-tr from-indigo-600 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-md transform transition-transform hover:-translate-y-1">
                Updated: Sep 2025
              </div>
              <div className="hidden md:block rounded-md border border-white/6 px-4 py-2 text-sm text-slate-200/80">
                Need help? <a className="underline" href="/contact">Contact legal</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-xl bg-muted p-6 shadow-sm">
              <Tabs defaultValue="terms">
                <TabsList>
                  <TabsTrigger value="terms">Terms</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  <TabsTrigger value="copyright">Copyright</TabsTrigger>
                </TabsList>

                <TabsContent value="terms">
                  <article className="prose max-w-none text-slate-200">
                    <h2 className="mt-0">Terms of Service</h2>
                    <p>
                      Welcome to CyberNavy. By using our services, you agree to these terms. Use must be lawful, respectful, and compliant with all applicable laws.
                    </p>
                    <h3>Acceptable Use</h3>
                    <p>
                      You may not use the service to infringe intellectual property, distribute malware, or perform unlawful activities. We reserve the right to suspend accounts that abuse the platform.
                    </p>
                    <h3>Limitation of Liability</h3>
                    <p>
                      To the maximum extent permitted by law, our liability is limited to the amount you paid us in the past 12 months. We are not liable for indirect damages.
                    </p>
                  </article>
                </TabsContent>

                <TabsContent value="privacy">
                  <article className="prose max-w-none text-slate-200">
                    <h2 className="mt-0">Privacy Policy</h2>
                    <p>
                      We collect only the minimum personal information required to operate the service: account email, usage metadata, and billing details if you purchase a paid plan.
                    </p>
                    <h3>Data Retention</h3>
                    <p>
                      We retain data necessary to provide the service and for legal compliance, then securely delete or anonymize it.
                    </p>
                    <h3>Third-Party Services</h3>
                    <p>
                      We may share data with third-party providers for hosting, analytics, and payments. Those providers are contractually required to protect your data.
                    </p>
                  </article>
                </TabsContent>

                <TabsContent value="copyright">
                  <article className="prose max-w-none text-slate-200">
                    <h2 className="mt-0">Copyright & DMCA</h2>
                    <p>
                      If you believe your copyrighted work has been used without permission, notify our DMCA agent. Include a description of the work, the infringing material, and a statement under penalty of perjury.
                    </p>
                    <h3>How to File a Notice</h3>
                    <ol>
                      <li>Identify the copyrighted work</li>
                      <li>Specify the infringing content location</li>
                      <li>Provide your contact information</li>
                      <li>Sign the notice</li>
                    </ol>
                  </article>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-6 rounded-xl bg-muted p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Frequently asked legal questions</h3>
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="a1">
                  <AccordionTrigger>What happens to my data if I delete my account?</AccordionTrigger>
                  <AccordionContent>
                    We will delete or anonymize personally identifiable data within 30 days, except where retention is required by law.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="a2">
                  <AccordionTrigger>Who can access my account data?</AccordionTrigger>
                  <AccordionContent>
                    Only you and authorized personnel for support and legal compliance. We log access for audit purposes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="a3">
                  <AccordionTrigger>Can I export my data?</AccordionTrigger>
                  <AccordionContent>
                    Yes — contact support or use the account export feature in the dashboard. Exports are provided in common formats (CSV/JSON).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl bg-gradient-to-b from-white/3 to-white/2 p-4 shadow-inner">
              <h4 className="text-sm font-medium text-slate-300">Quick summary</h4>
              <ul className="mt-3 list-inside list-disc text-sm text-slate-200/90">
                <li>Be lawful and respectful</li>
                <li>We protect your data</li>
                <li>DMCA procedures available</li>
              </ul>
            </div>

            <div className="rounded-xl bg-muted p-4 text-center">
              <div className="mb-3">
                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
              </div>
              <div className="text-sm text-slate-300">Legal Team</div>
              <div className="mt-2 text-xs text-slate-400">legal@cybernavy.example</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Legal;
