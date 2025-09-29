import React, { useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import AuthButtons from "@/components/auth/AuthButtons";
import { useNavigate } from "react-router-dom";

const plans = [
	{
		name: "Free",
		price: 0,
		currency: "₹",
		description: "Get started with basic features. No credit card required.",
		features: [
			"Community support",
			"Basic threat detection",
			"Limited API access",
			"Single user",
		],
		cta: "Start for Free",
		highlight: false,
	},
	{
		name: "Pro",
		price: 2499,
		currency: "₹",
		description:
			"For teams and professionals who need more power and flexibility.",
		features: [
			"Priority email support",
			"Advanced threat detection",
			"Unlimited API access",
			"Up to 10 users",
			"Custom integrations",
		],
		cta: "Upgrade to Pro",
		highlight: true,
	},
	{
		name: "Enterprise",
		price: "Custom",
		currency: "₹",
		description:
			"For organizations with advanced security, compliance, and support needs.",
		features: [
			"Dedicated account manager",
			"24/7 support",
			"Custom SLAs",
			"Unlimited users",
			"On-premise & SSO options",
			"Compliance & audit tools",
		],
		cta: "Contact Sales",
		highlight: false,
	},
];

export default function Pricing() {
	const [authModalOpen, setAuthModalOpen] = useState<"login" | "signup" | null>(
		null
	);
	const [authed, setAuthed] = useState(false);
	const navigate = useNavigate();

	// Check auth state on mount
	React.useEffect(() => {
		fetch("/api/auth/me", { credentials: "include" })
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => setAuthed(!!data?.email))
			.catch(() => setAuthed(false));
	}, []);

	function handleStartForFree() {
		if (authed) {
			navigate("/app");
		} else {
			setAuthModalOpen("signup");
		}
	}

	return (
		<SiteShell>
			<div className="max-w-5xl mx-auto px-4 py-16">
				<h1 className="text-4xl font-extrabold text-center mb-4">Pricing</h1>
				<p className="text-center text-foreground/70 mb-12 text-lg max-w-2xl mx-auto">
					Simple, transparent pricing. No hidden fees. Upgrade, downgrade, or
					cancel anytime.
				</p>
				<div className="grid md:grid-cols-3 gap-8">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`glass-card p-8 rounded-2xl flex flex-col items-center shadow-lg border-2 transition-all duration-300 ${
								plan.highlight
									? "border-cyan-400 scale-105 z-10 bg-gradient-to-br from-cyan-50/90 to-white/90"
									: "border-transparent"
							}`}
						>
							<h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
							<div className="text-4xl font-extrabold mb-2">
								{plan.price === 0 ? (
									"Free"
								) : plan.price === "Custom" ? (
									<span>Custom</span>
								) : (
									<>
										{plan.currency}
										{plan.price.toLocaleString("en-IN")}
										<span className="text-base font-medium text-foreground/60">
											/mo
										</span>
									</>
								)}
							</div>
							<p className="text-foreground/70 mb-6 text-center">
								{plan.description}
							</p>
							<ul className="mb-8 w-full text-left space-y-3">
								{plan.features.map((feature) => (
									<li
										key={feature}
										className="flex items-center gap-2 text-foreground/90"
									>
										<CheckCircle className="text-cyan-500 w-5 h-5" />
										{feature}
									</li>
								))}
							</ul>
							{plan.price === 0 ? (
								<Button
									className={`w-full py-3 text-lg font-semibold ${
										plan.highlight
											? "bg-gradient-to-tr from-cyan-500 to-teal-400 text-white shadow-cyan-400/30"
											: "bg-background border border-cyan-200 text-cyan-700 hover:bg-cyan-50"
									}`}
									size="lg"
									onClick={handleStartForFree}
								>
									{plan.cta}
								</Button>
							) : (
								<Button
									className={`w-full py-3 text-lg font-semibold ${
										plan.highlight
											? "bg-gradient-to-tr from-cyan-500 to-teal-400 text-white shadow-cyan-400/30"
											: "bg-background border border-cyan-200 text-cyan-700 hover:bg-cyan-50"
									}`}
									size="lg"
								>
									{plan.cta}
								</Button>
							)}
						</div>
					))}
				</div>
				<div className="mt-16 text-center text-foreground/70 text-sm">
					Need a custom plan or have questions?{" "}
					<a
						href="/company"
						className="underline text-cyan-600"
					>
						Contact us
					</a>
					.
				</div>
				{/* Auth Modal (Signup/Login) */}
				{authModalOpen && (
					<AuthButtons open={authModalOpen} onOpenChange={setAuthModalOpen} />
				)}
			</div>
		</SiteShell>
	);
}
