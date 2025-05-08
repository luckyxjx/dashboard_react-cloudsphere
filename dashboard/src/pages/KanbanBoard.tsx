import { KanbanSquare, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

function KanbanBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          status: 'pending'
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNewTask({ title: '', description: '' });
        fetchTasks(); // Refresh the task list
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => {
      if (status === 'pending') return task.status === 'pending';
      if (status === 'in-progress') return task.status === 'in-progress';
      if (status === 'completed') return task.status === 'completed';
      return false;
    });
  };

  const columns = [
    {
      title: "Pending",
      tasks: getTasksByStatus('pending'),
      bgColor: "bg-gray-100 dark:bg-gray-800",
      borderColor: "border-gray-300 dark:border-gray-700"
    },
    {
      title: "In Progress",
      tasks: getTasksByStatus('in-progress'),
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      title: "Completed",
      tasks: getTasksByStatus('completed'),
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    }
  ];

  return (
    <div className="h-full p-6 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your tasks efficiently</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`${column.bgColor} ${column.borderColor} rounded-lg border p-4 h-full`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {column.title}
              </h2>
              {column.title === "Pending" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Plus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              )}
            </div>
            
            <div className="h-full overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : column.tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700">
                  <KanbanSquare className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No tasks in {column.title.toLowerCase()}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {column.tasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full mb-3 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Task Description"
              className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;
