import { Suspense } from "react";
import OAuthRoleSelectionClient from "./oauth-role-selection-client";

export default function OAuthRoleSelectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthRoleSelectionClient />
    </Suspense>
  );
}