"use client";

import { useEffect, useState } from "react";
import { Lock, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStartCashDonation } from "@/queries/donation";
import cookie from "@/services/cookie";
import type { PublicCampaign } from "@/types/donation";

const PRESET_AMOUNTS = [1000, 5000, 10000, 25000];
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 10_000_000;

export default function DonateMoneyDialog({
  campaign,
  onClose,
}: {
  campaign: PublicCampaign;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<string>("5000");
  const { mutate, isPending } = useStartCashDonation();

  // Fill in details for logged-in users
  useEffect(() => {
    const user = cookie.get("auth-user");
    if (user?.email) {
      setName([user.first_name, user.last_name].filter(Boolean).join(" "));
      setEmail(user.email);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const value = Number(amount);
  const amountError =
    amount !== "" &&
    (!Number.isInteger(value) || value < MIN_AMOUNT || value > MAX_AMOUNT)
      ? `Enter a whole amount between ₦${MIN_AMOUNT.toLocaleString()} and ₦${MAX_AMOUNT.toLocaleString()}`
      : "";
  const canSubmit =
    name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(email) &&
    amount !== "" &&
    !amountError &&
    !isPending;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    mutate(
      {
        campaignId: campaign.id,
        name: name.trim(),
        email: email.trim(),
        amount: value,
      },
      {
        onSuccess: (res) => {
          window.location.href = res.data.authorizationUrl;
        },
      },
    );
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-money-title"
        className="bg-white w-full md:max-w-md rounded-t-[18px] md:rounded-[18px] p-6 max-h-[90svh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="donate-money-title" className="text-xl font-black">
              Donate money
            </h2>
            <p className="text-sm text-grey-90 mt-1">to {campaign.title}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer p-1 rounded-md hover:bg-grey-10"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <div>
            <Label htmlFor="donate-amount" className="mb-2 block">
              Amount (₦)
            </Label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setAmount(String(preset))}
                  className={`cursor-pointer h-10 rounded-[10px] border text-sm font-bold ${
                    value === preset
                      ? "bg-primary-60 border-primary-60 text-white"
                      : "border-grey-10 hover:border-primary-60"
                  }`}
                >
                  ₦{preset.toLocaleString()}
                </button>
              ))}
            </div>
            <Input
              id="donate-amount"
              type="number"
              inputMode="numeric"
              min={MIN_AMOUNT}
              step={1}
              placeholder="Or enter another amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-invalid={!!amountError}
            />
            {amountError && (
              <p className="text-xs text-red-500 mt-1">{amountError}</p>
            )}
          </div>

          <div>
            <Label htmlFor="donor-name" className="mb-2 block">
              Your name
            </Label>
            <Input
              id="donor-name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="donor-email" className="mb-2 block">
              Email for your receipt
            </Label>
            <Input
              id="donor-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="cursor-pointer w-full h-12 rounded-[10px] bg-primary-60 hover:bg-primary-50 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? "Please wait..."
              : `Donate ₦${(value || 0).toLocaleString()}`}
          </button>
          <p className="flex items-center justify-center gap-1 text-xs text-grey-90">
            <Lock className="size-3" />
            Secure payment by Paystack: card, bank transfer or USSD
          </p>
        </form>
      </div>
    </div>
  );
}
