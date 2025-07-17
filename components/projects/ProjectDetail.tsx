"use client"

import { useState } from "react";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { 
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, MoreHorizontal, Trash2, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SortableItem } from "../shared/SortableItem";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  priority: 'Low' | 'Medium' | 'High';
  tags?: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const ProjectDetail = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', title: 'Design homepage mockups', assignee: 'JS', priority: 'High', tags: ['Design', 'UI'] },
        { id: '2', title: 'Set up development environment', assignee: 'MJ', priority: 'Medium', tags: ['Dev'] },
        { id: '3', title: 'Create user personas', assignee: 'SW', priority: 'Low', tags: ['Research'] },
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: '4', title: 'Implement authentication system', assignee: 'MJ', priority: 'High', tags: ['Backend'] },
        { id: '5', title: 'Design database schema', assignee: 'SW', priority: 'Medium', tags: ['Database'] },
      ]
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        { id: '6', title: 'Code review for login feature', assignee: 'JD', priority: 'Medium', tags: ['Review'] },
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '7', title: 'ProjectDetail kickoff meeting', assignee: 'JD', priority: 'High', tags: ['Meeting'] },
        { id: '8', title: 'Requirements gathering', assignee: 'JS', priority: 'Medium', tags: ['Planning'] },
      ]
    }
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [deleteAllColumnId, setDeleteAllColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find source column and task
    const sourceColumn = columns.find(col => 
      col.tasks.some(task => task.id === activeId)
    );
    const sourceTask = sourceColumn?.tasks.find(task => task.id === activeId);

    if (!sourceColumn || !sourceTask) return;

    // Determine target column
    let targetColumnId = overId;
    if (columns.some(col => col.tasks.some(task => task.id === overId))) {
      // Dropped on a task, find its column
      targetColumnId = columns.find(col => 
        col.tasks.some(task => task.id === overId)
      )?.id || overId;
    }

    // Update columns
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Remove task from source column
      const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn.id);
      newColumns[sourceColIndex] = {
        ...newColumns[sourceColIndex],
        tasks: newColumns[sourceColIndex].tasks.filter(task => task.id !== activeId)
      };

      // Add task to target column
      const targetColIndex = newColumns.findIndex(col => col.id === targetColumnId);
      if (targetColIndex !== -1) {
        const targetTasks = [...newColumns[targetColIndex].tasks];
        
        if (overId === targetColumnId) {
          // Dropped on column, add to end
          targetTasks.push(sourceTask);
        } else {
          // Dropped on task, insert at position
          const overTaskIndex = targetTasks.findIndex(task => task.id === overId);
          targetTasks.splice(overTaskIndex + 1, 0, sourceTask);
        }
        
        newColumns[targetColIndex] = {
          ...newColumns[targetColIndex],
          tasks: targetTasks
        };
      }

      return newColumns;
    });

    setActiveId(null);
  };

  const deleteTask = (taskId: string) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== taskId)
      }))
    );
    setDeleteTaskId(null);
  };

  const deleteAllTasks = (columnId: string) => {
    setColumns(prevColumns =>
      prevColumns.map(column => 
        column.id === columnId 
          ? { ...column, tasks: [] }
          : column
      )
    );
    setDeleteAllColumnId(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const activeTask = activeId ? 
    columns.flatMap(col => col.tasks).find(task => task.id === activeId) : null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <Button size="sm" className="ml-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
          </header>

          <div className="flex-1 p-4 lg:p-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Website Redesign</h1>
              <p className="text-muted-foreground mb-4">Complete overhaul of the company website with modern design</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">Team:</span>
                  <div className="flex -space-x-1">
                    {['JD', 'JS', 'MJ', 'SW'].map((member, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-background">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {member}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <Badge variant="secondary">In Progress</Badge>
              </div>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                {columns.map((column) => (
                  <Card key={column.id} className="flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {column.title}
                          <Badge variant="secondary" className="text-xs">
                            {column.tasks.length}
                          </Badge>
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Task
                            </DropdownMenuItem>
                            <Dialog open={deleteAllColumnId === column.id} onOpenChange={() => setDeleteAllColumnId(null)}>
                              <DialogTrigger asChild>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    setDeleteAllColumnId(column.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete All Tasks
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete All Tasks</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete all tasks in "{column.title}"? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setDeleteAllColumnId(null)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={() => deleteAllTasks(column.id)}>
                                    Delete All
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                          {column.tasks.map((task) => (
                            <SortableItem key={task.id} id={task.id}>
                              <div className="group p-3 bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h4 className="font-medium text-sm leading-tight flex-1">{task.title}</h4>
                                  <Dialog open={deleteTaskId === task.id} onOpenChange={() => setDeleteTaskId(null)}>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                        onClick={() => setDeleteTaskId(task.id)}
                                      >
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Delete Task</DialogTitle>
                                        <DialogDescription>
                                          Are you sure you want to delete "{task.title}"? This action cannot be undone.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setDeleteTaskId(null)}>
                                          Cancel
                                        </Button>
                                        <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                                          Delete
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <Badge className={getPriorityColor(task.priority)} variant="secondary">
                                    {task.priority}
                                  </Badge>
                                  {task.tags?.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                {task.assignee && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <Avatar className="w-5 h-5">
                                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                        {task.assignee}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">Assigned</span>
                                  </div>
                                )}
                              </div>
                            </SortableItem>
                          ))}
                        </div>
                      </SortableContext>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <DragOverlay>
                {activeTask ? (
                  <div className="p-3 bg-card border rounded-lg shadow-lg opacity-90">
                    <h4 className="font-medium text-sm mb-2">{activeTask.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(activeTask.priority)} variant="secondary">
                        {activeTask.priority}
                      </Badge>
                      {activeTask.assignee && (
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {activeTask.assignee}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProjectDetail;
