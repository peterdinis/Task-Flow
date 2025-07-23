import { FC } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../dashboard/DashboardSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, Calendar, Users, Filter, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const ProjectsWrapper: FC = () => {
    const projects = [
        {
            id: 1,
            name: "Website Redesign",
            description: "Complete overhaul of the company website with modern design",
            status: "In Progress",
            progress: 65,
            dueDate: "2024-02-15",
            team: ["JD", "JS", "MJ"],
            color: "bg-blue-500"
        },
        {
            id: 2,
            name: "Mobile App",
            description: "Native mobile application for iOS and Android",
            status: "Planning",
            progress: 20,
            dueDate: "2024-03-20",
            team: ["SW", "JD"],
            color: "bg-green-500"
        },
        {
            id: 3,
            name: "Marketing Campaign",
            description: "Q1 digital marketing campaign across all channels",
            status: "Review",
            progress: 90,
            dueDate: "2024-01-30",
            team: ["JS", "MJ", "SW"],
            color: "bg-purple-500"
        },
        {
            id: 4,
            name: "Data Migration",
            description: "Migrate legacy data to new cloud infrastructure",
            status: "Completed",
            progress: 100,
            dueDate: "2024-01-15",
            team: ["JD", "MJ"],
            color: "bg-gray-500"
        },
        {
            id: 5,
            name: "API Development",
            description: "REST API for third-party integrations",
            status: "In Progress",
            progress: 45,
            dueDate: "2024-02-28",
            team: ["MJ", "SW"],
            color: "bg-orange-500"
        },
        {
            id: 6,
            name: "Security Audit",
            description: "Comprehensive security review and penetration testing",
            status: "Planning",
            progress: 10,
            dueDate: "2024-04-10",
            team: ["JD"],
            color: "bg-red-500"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "Review": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "Planning": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };

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
                            <span className="hidden sm:inline">New Project</span>
                        </Button>
                    </header>

                    <div className="flex-1 space-y-4 p-4 lg:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projects</h1>
                                <p className="text-muted-foreground">Manage and track all your projects</p>
                            </div>
                        </div>

                        {/* Filters and Search */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search projects..." className="pl-9" />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
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
                            {projects.map((project) => (
                                <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center space-x-2 min-w-0">
                                                <div className={`w-3 h-3 rounded-full ${project.color} shrink-0`}></div>
                                                <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="shrink-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                                                <span className="text-sm font-medium">{project.progress}%</span>
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
                                                    <span className="truncate">{project.dueDate}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    <div className="flex -space-x-1">
                                                        {project.team.map((member, index) => (
                                                            <Avatar key={index} className="w-6 h-6 border-2 border-background">
                                                                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                                                    {member}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}

export default ProjectsWrapper;