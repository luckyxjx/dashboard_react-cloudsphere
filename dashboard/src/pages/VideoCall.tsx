import { Video } from 'lucide-react';

function VideoCall() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Video className="h-16 w-16 mx-auto mb-4 text-purple-500" />
        <h2 className="text-2xl font-semibold mb-2">Video Call Integration Ready</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your video service API here to enable video conferencing.
        </p>
      </div>
    </div>
  );
}

export default VideoCall;