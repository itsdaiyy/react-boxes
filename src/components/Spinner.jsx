export default function Spinner() {
  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-main-100 border-t-main-600"></div>
    </div>
  );
}
