import OtpVerification from "@/presentation/components/Auth/OtpVerification";

export default async function VerifyRegistrationPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const params = await searchParams;
  return <OtpVerification email={params.email || ""} />;
}
