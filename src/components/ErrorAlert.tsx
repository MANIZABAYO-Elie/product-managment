export default function ErrorAlert({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-800 text-sm">{message}</div>
  );
}