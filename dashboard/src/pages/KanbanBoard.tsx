import { KanbanSquare } from 'lucide-react';

function KanbanBoard() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <KanbanSquare className="h-16 w-16 mx-auto mb-4 text-green-500" />
        <h2 className="text-2xl font-semibold mb-2">Kanban Integration Ready</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your task management API here to enable Kanban functionality.
        </p>
      </div>
    </div>
  );
}

export default KanbanBoard;