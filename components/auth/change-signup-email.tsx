"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeSignupEmail } from "@/queries/auth";

// "Wrong email? Change it" for the sign-up code screens. The account isn't
// verified yet, so the password they just chose proves it's theirs.
export default function ChangeSignupEmail({
  email,
  onChanged,
}: {
  email: string;
  onChanged: (newEmail: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useChangeSignupEmail();

  if (!open) {
    return (
      <p className="text-sm text-center text-grey-50">
        Wrong email?{" "}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer font-bold text-primary-60 hover:underline"
        >
          Change it
        </button>
      </p>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !password) return;
    mutate(
      { email, newEmail: newEmail.trim(), password },
      {
        onSuccess: (res) => {
          setOpen(false);
          setNewEmail("");
          setPassword("");
          onChanged(res.data.email);
        },
      },
    );
  };

  return (
    <form
      onSubmit={submit}
      className="w-full space-y-3 rounded-xl border border-grey-10 p-4 text-left"
    >
      <p className="font-bold">Change your email</p>
      <div>
        <Label htmlFor="new-email" className="mb-1.5 block text-sm">
          Correct email
        </Label>
        <Input
          id="new-email"
          type="email"
          autoComplete="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-11 bg-[#F3F3F3] border-none"
          required
        />
      </div>
      <div>
        <Label htmlFor="confirm-password" className="mb-1.5 block text-sm">
          The password you just created
        </Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 bg-[#F3F3F3] border-none pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-30 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="cursor-pointer h-10 px-4 rounded-[10px] bg-[#F3F3F3] text-sm font-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending || !newEmail.trim() || !password}
          className="cursor-pointer flex-1 h-10 rounded-[10px] bg-primary-60 hover:bg-primary-50 text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          Update email and send code
        </button>
      </div>
    </form>
  );
}
