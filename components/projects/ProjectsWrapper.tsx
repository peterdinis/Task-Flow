"use client";

import { FC, Key, useEffect, useState, unstable_ViewTransition as ViewTransition } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  Users,
  Search,
  Loader2,
  Ghost,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAllBoards } from "@/hooks/boards/useAllBoards";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBoard } from "@/hooks/boards/useCreateNewBoard";
import { toast } from "sonner";
import { useAuthenticatedProfile } from "@/hooks/auth/useAuthentificatedUser";
import { format } from "date-fns";

const ProjectsWrapper: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const { user } = useAuthenticatedProfile();
  const { data, isLoading, isError } = useAllBoards({
    page: currentPage,
    limit: pageSize,
    ownerId: user?.id!,
  });

  const projects = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const [searchQuery, setSearchQuery] = useState("");
  const filteredProjects = projects.filter((project: any) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    progress: 0,
    projectColor: "#aabbcc",
  });

  const createBoard = useCreateBoard();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Planning":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  if (isError)
    return (
      <p className="text-red-800 font-bold text-base dark:text-red-200 leading-[130%]">
        Failed to fetch projects
      </p>
    );

  if (isLoading) return <Loader2 className="animate-spin h-8 w-8" />;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="ml-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">New Project</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="progress">Progress (%)</Label>
                    <Input
                      id="progress"
                      type="number"
                      min={0}
                      max={100}
                      value={form.progress}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          progress: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Project Color</Label>
                    <Input
                      id="color"
                      type="color"
                      value={form.projectColor}
                      onChange={(e) =>
                        setForm({ ...form, projectColor: e.target.value })
                      }
                      className="h-10 w-16 p-0 border-none"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      onClick={async () => {
                        try {
                          if (!user?.id) {
                            toast.error(
                              "You must be logged in to create a project"
                            );
                            return;
                          }

                          await createBoard.mutateAsync({
                            ...form,
                            ownerId: user.id,
                          });

                          setOpen(false);
                          setForm({
                            title: "",
                            description: "",
                            progress: 0,
                            projectColor: "#aabbcc",
                          });
                          toast.success("New project was created");
                        } catch (err) {
                          console.error(err);
                          toast.error(
                            err instanceof Error
                              ? err.message
                              : "Failed to create project"
                          );
                        }
                      }}
                      disabled={createBoard.isPending}
                    >
                      {createBoard.isPending ? (
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </header>

          <div className="flex-1 space-y-4 p-4 lg:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Projects
                </h1>
                <p className="text-muted-foreground">
                  Manage and track all your projects
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Name</DropdownMenuItem>
                    <DropdownMenuItem>Due Date</DropdownMenuItem>
                    <DropdownMenuItem>Status</DropdownMenuItem>
                    <DropdownMenuItem>Progress</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground text-base">
                  <Ghost className="w-10 h-10 mb-2 animate-bounce" />
                  Project does not exists
                </div>
              ) : (
                filteredProjects.map((project: any) => (
                  <Card
                    key={project.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2 min-w-0">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: project.projectColor }}
                          ></div>
                          <CardTitle className="text-lg truncate">
                            {project.title}
                          </CardTitle>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit Project</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription className="text-sm line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor("In Progress")}>
                            In Progress
                          </Badge>
                          <span className="text-sm font-medium">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="truncate">
                              {project.createdAt
                                ? format(
                                  new Date(project.createdAt),
                                  "dd.MM.yyyy"
                                )
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <div className="flex -space-x-1">
                              {project.members?.map(
                                (member: any, index: number) => (
                                  <Avatar
                                    key={index}
                                    className="w-6 h-6 border-2 border-background"
                                  >
                                    <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                      {member.name?.[0] ?? "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((p) => Math.max(p - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4 text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProjectsWrapper;
