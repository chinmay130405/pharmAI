import { Loader } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader size={48} className="text-pharma-600 animate-spin mb-4" />
      <p className="text-gray-600 font-medium">Analyzing molecule data...</p>
      <p className="text-gray-500 text-sm mt-2">This may take a moment</p>
    </div>
  );
}
