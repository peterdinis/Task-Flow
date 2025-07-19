"use client";

import {
	Calendar,
	Users,
	Loader2,
	MoreHorizontal,
	Plus,
	TrendingUp,
	CheckCircle,
	Clock,
	AlertTriangle,
} from "lucide-react";
import { useState, type FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreateBoard } from "@/hooks/boards/useCreateNewBoard";
import { useAuthenticatedProfile } from "@/hooks/auth/useAuthentificatedUser";

const DashboardWrapper: FC = () => {
	const { user } = useAuthenticatedProfile();
	const createBoard = useCreateBoard();

	const recentProjects = [
		{
			id: "1",
			title: "Landing Page Redesign",
			description: "Redesign the marketing landing page for better conversion.",
			progress: 45,
			status: "In Progress",
			color: "#3B82F6",
		},
		{
			id: "2",
			title: "Mobile App Planning",
			description: "Start defining features and UI flows for mobile MVP.",
			progress: 10,
			status: "Planning",
			color: "#A855F7",
		},
	];

	const upcomingTasks = [
		{
			id: "1",
			title: "Fix navbar responsiveness",
			dueDate: "2025-07-22",
			priority: "High",
		},
		{
			id: "2",
			title: "Write blog post about AI assistant",
			dueDate: "2025-07-25",
			priority: "Medium",
		},
	];

	const teamActivity = [
		{ id: "1", name: "Anna", action: "commented on task", time: "2h ago" },
		{ id: "2", name: "John", action: "completed task", time: "1d ago" },
	];

	const stats = [
		{
			id: "1",
			label: "Completed Tasks",
			value: "128",
			icon: CheckCircle,
		},
		{
			id: "2",
			label: "Active Projects",
			value: "4",
			icon: TrendingUp,
		},
		{
			id: "3",
			label: "Upcoming Deadlines",
			value: "3",
			icon: Clock,
		},
		{
			id: "4",
			label: "Overdue Tasks",
			value: "2",
			icon: AlertTriangle,
		},
	];

	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		title: "",
		description: "",
		progress: 0,
		projectColor: "#aabbcc",
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "In Progress":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
			case "Planning":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "High":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
			case "Medium":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
			case "Low":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
		}
	};

	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full">
				<DashboardSidebar />
				<SidebarInset className="flex-1">
					<header className="flex h-16 items-center gap-2 px-4 border-b lg:px-6">
						<SidebarTrigger className="-ml-1" />
						<div className="flex-1" />
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<Button size="sm">
									<Plus className="h-4 w-4 mr-2" />
									New Project
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
										<Label htmlFor="progress">Progress</Label>
										<Input
											id="progress"
											type="number"
											value={form.progress}
											onChange={(e) =>
												setForm({ ...form, progress: +e.target.value })
											}
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="color">Color</Label>
										<Input
											id="color"
											type="color"
											value={form.projectColor}
											onChange={(e) =>
												setForm({ ...form, projectColor: e.target.value })
											}
										/>
									</div>
								</div>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											onClick={async () => {
												try {
													if (!user?.id) {
														toast.error("You must be logged in.");
														return;
													}
													await createBoard.mutateAsync({
														...form,
														ownerId: user.id,
													});
													setForm({
														title: "",
														description: "",
														progress: 0,
														projectColor: "#aabbcc",
													});
													setOpen(false);
													toast.success("Project created");
												} catch (err) {
													toast.error("Failed to create project");
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

					<div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{stats.map((s) => (
							<Card key={s.id}>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										{s.label}
									</CardTitle>
									<s.icon className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{s.value}</div>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{recentProjects.map((project) => (
							<Card key={project.id}>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded-full"
												style={{ backgroundColor: project.color }}
											/>
											<CardTitle className="text-base">
												{project.title}
											</CardTitle>
										</div>
										<Button variant="ghost" size="icon">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</div>
									<CardDescription>{project.description}</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center justify-between text-sm">
										<Badge className={getStatusColor(project.status)}>
											{project.status}
										</Badge>
										<span>{project.progress}%</span>
									</div>
									<Progress value={project.progress} />
									<div className="flex items-center justify-between text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Calendar className="h-4 w-4" />
											<span>Jul 10, 2025</span>
										</div>
										<div className="flex items-center gap-1">
											<Users className="h-4 w-4" />
											<Avatar className="w-6 h-6">
												<AvatarFallback className="text-xs">A</AvatarFallback>
											</Avatar>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
};

export default DashboardWrapper;
