import MemberProfilePage from "@/components/pages/businessAdminDashboard/sections/memberSection/MemberProfilePage";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MemberProfile({ params }: PageProps) {
  const { id } = await params;

  return <MemberProfilePage memberId={id} />;
}
