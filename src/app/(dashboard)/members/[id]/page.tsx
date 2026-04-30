import MemberProfilePage from "@/components/pages/members/sections/MemberProfilePage";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MemberProfile({ params }: PageProps) {
  const { id } = await params;

  return <MemberProfilePage memberId={id} />;
}
