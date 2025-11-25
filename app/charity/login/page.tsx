import { redirect } from "next/navigation";

export default function CharityLoginRedirect() {
  // Reuse the existing login with a charity-specific callback
  redirect(`/login?callbackUrl=${encodeURIComponent('/charity')}`);
}
