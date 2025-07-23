import { Calendar, Users, FolderOpen, Settings, Home, Plus, User } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FC } from "react";

export const DashboardSidebar: FC = () => {
  const navigation = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Projects", url: "/projects", icon: FolderOpen },
    { title: "Calendar", url: "/calendar", icon: Calendar },
    { title: "Team", url: "/team", icon: Users },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const recentProjects = [
    { id: 1, name: "Website Redesign", color: "bg-blue-500" },
    { id: 2, name: "Mobile App", color: "bg-green-500" },
    { id: 3, name: "Marketing Campaign", color: "bg-purple-500" },
  ];

  const teamMembers = [
    { id: 1, name: "John Doe", initials: "JD" },
    { id: 2, name: "Jane Smith", initials: "JS" },
    { id: 3, name: "Mike Johnson", initials: "MJ" },
    { id: 4, name: "Sarah Wilson", initials: "SW" },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FolderOpen className="h-4 w-4 text-white" />
          </div>
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TaskFlow
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Recent Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentProjects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/project/${project.id}`}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                      <span className="text-sm">{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="px-3 mt-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Team Members
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teamMembers.map((member) => (
                <SidebarMenuItem key={member.id}>
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700">{member.name}</span>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm font-medium">Your Account</div>
            <div className="text-xs text-gray-500">Free Plan</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
