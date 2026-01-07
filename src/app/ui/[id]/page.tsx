export default async function UIPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-3xl">
        UI PAGE {id}
      </div>
    </div>
  );
}
