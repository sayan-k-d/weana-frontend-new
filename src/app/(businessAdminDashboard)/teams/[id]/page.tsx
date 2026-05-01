import TeamDetailPage from "@/components/pages/businessAdminDashboard/sections/teamsSection/TeamDetailPage";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function TeamDetail({ params }: PageProps) {
  const { id } = await params;

  return <TeamDetailPage teamId={id} />;
}
