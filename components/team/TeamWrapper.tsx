import { FC } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../dashboard/DashboardSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Mail, 
  Phone, 
  MoreHorizontal, 
  Search, 
  Filter,
  User,
  Calendar,
  MapPin
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const TeamWrapper: FC = () => {
    const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      department: "Management",
      email: "john.doe@company.com",
      phone: "+1 (555) 123-4567",
      avatar: "JD",
      status: "Online",
      location: "New York, NY",
      joinDate: "Jan 2023",
      projectsCount: 8,
      tasksCompleted: 45
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "UI/UX Designer",
      department: "Design",
      email: "jane.smith@company.com",
      phone: "+1 (555) 234-5678",
      avatar: "JS",
      status: "Away",
      location: "San Francisco, CA",
      joinDate: "Mar 2023",
      projectsCount: 5,
      tasksCompleted: 32
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Frontend Developer",
      department: "Engineering",
      email: "mike.johnson@company.com",
      phone: "+1 (555) 345-6789",
      avatar: "MJ",
      status: "Online",
      location: "Austin, TX",
      joinDate: "Feb 2023",
      projectsCount: 6,
      tasksCompleted: 58
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Backend Developer",
      department: "Engineering",
      email: "sarah.wilson@company.com",
      phone: "+1 (555) 456-7890",
      avatar: "SW",
      status: "Offline",
      location: "Seattle, WA",
      joinDate: "Apr 2023",
      projectsCount: 4,
      tasksCompleted: 41
    },
    {
      id: 5,
      name: "Alex Chen",
      role: "DevOps Engineer",
      department: "Engineering",
      email: "alex.chen@company.com",
      phone: "+1 (555) 567-8901",
      avatar: "AC",
      status: "Online",
      location: "Denver, CO",
      joinDate: "May 2023",
      projectsCount: 3,
      tasksCompleted: 29
    },
    {
      id: 6,
      name: "Emily Brown",
      role: "Marketing Manager",
      department: "Marketing",
      email: "emily.brown@company.com",
      phone: "+1 (555) 678-9012",
      avatar: "EB",
      status: "Away",
      location: "Chicago, IL",
      joinDate: "Jun 2023",
      projectsCount: 7,
      tasksCompleted: 38
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Away": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Offline": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Engineering": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Design": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Management": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Marketing": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
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
              <span className="hidden sm:inline">Add Member</span>
            </Button>
          </header>

          <div className="flex-1 space-y-4 p-4 lg:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Team</h1>
                <p className="text-muted-foreground">Manage your team members and their roles</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search team members..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Department
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Departments</DropdownMenuItem>
                    <DropdownMenuItem>Engineering</DropdownMenuItem>
                    <DropdownMenuItem>Design</DropdownMenuItem>
                    <DropdownMenuItem>Management</DropdownMenuItem>
                    <DropdownMenuItem>Marketing</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Online Now</CardTitle>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">75% of team</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Across all teams</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Departments</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">Engineering, Design, etc.</p>
                </CardContent>
              </Card>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                          <CardDescription className="truncate">{member.role}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Member</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStatusColor(member.status)} variant="secondary">
                        {member.status}
                      </Badge>
                      <Badge className={getDepartmentColor(member.department)} variant="secondary">
                        {member.department}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3 w-3 shrink-0" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{member.location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{member.projectsCount}</div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{member.tasksCompleted}</div>
                        <div className="text-xs text-muted-foreground">Tasks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{member.joinDate}</div>
                        <div className="text-xs text-muted-foreground">Joined</div>
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

export default TeamWrapper;