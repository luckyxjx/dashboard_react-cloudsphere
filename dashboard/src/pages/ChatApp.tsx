import { MessageSquare } from 'lucide-react';

function ChatApp() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-blue-500" />
        <h2 className="text-2xl font-semibold mb-2">Chat Integration Ready</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your chat service API here to enable real-time messaging.
        </p>
      </div>
    </div>
  );
}

export default ChatApp;