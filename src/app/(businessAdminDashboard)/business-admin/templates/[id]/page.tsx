// app/templates/[id]/page.tsx
import TemplateDetailPage from "@/components/pages/businessAdminDashboard/sections/templateSection/TemplateDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TemplateDetailRoute({ params }: Props) {
  const { id } = await params;
  return <TemplateDetailPage templateId={id} />;
}
