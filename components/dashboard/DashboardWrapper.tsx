'use client';

import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
    Plus,
    Calendar,
    Users,
    TrendingUp,
    Clock,
    AlertTriangle,
    CheckCircle,
    MoreHorizontal,
} from 'lucide-react';
import { DashboardSidebar } from './DashboardSidebar';
import { FC } from 'react';
import { ModeToggle } from '../shared/ModeToggle';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const DashboardWrapper: FC = () => {
    const {user} = useUser();
    
    const recentProjects = [
        {
            id: 1,
            name: 'Website Redesign',
            progress: 75,
            dueDate: '2024-02-15',
            status: 'In Progress',
            team: 4,
        },
        {
            id: 2,
            name: 'Mobile App',
            progress: 45,
            dueDate: '2024-03-20',
            status: 'Planning',
            team: 3,
        },
        {
            id: 3,
            name: 'Marketing Campaign',
            progress: 90,
            dueDate: '2024-01-30',
            status: 'Review',
            team: 6,
        },
        {
            id: 4,
            name: 'Marketing Campaign',
            progress: 90,
            dueDate: '2024-01-30',
            status: 'Review',
            team: 6,
        },
        {
            id: 5,
            name: 'Marketing Campaign',
            progress: 90,
            dueDate: '2024-01-30',
            status: 'Review',
            team: 6,
        },
        {
            id: 6,
            name: 'Marketing Campaign',
            progress: 90,
            dueDate: '2024-01-30',
            status: 'Review',
            team: 6,
        },
        {
            id: 7,
            name: 'Marketing Campaign',
            progress: 90,
            dueDate: '2024-01-30',
            status: 'Review',
            team: 6,
        },
    ];

    const upcomingTasks = [
        {
            id: 1,
            title: 'Design mockups review',
            project: 'Website Redesign',
            dueDate: 'Today',
            priority: 'High',
        },
        {
            id: 2,
            title: 'Client presentation',
            project: 'Mobile App',
            dueDate: 'Tomorrow',
            priority: 'Medium',
        },
        {
            id: 3,
            title: 'Content creation',
            project: 'Marketing Campaign',
            dueDate: 'Jan 25',
            priority: 'Low',
        },
        {
            id: 4,
            title: 'Database migration',
            project: 'Backend Update',
            dueDate: 'Jan 27',
            priority: 'High',
        },
    ];

    const teamActivity = [
        {
            user: 'John Doe',
            action: 'completed task',
            project: 'Website Redesign',
            time: '2 hours ago',
        },
        {
            user: 'Jane Smith',
            action: 'added comment',
            project: 'Mobile App',
            time: '4 hours ago',
        },
        {
            user: 'Mike Johnson',
            action: "updated project's status",
            project: 'Marketing Campaign',
            time: '6 hours ago',
        },
    ];

    const stats = [
        {
            title: 'Active Boards',
            value: '12',
            change: '+2',
            icon: <TrendingUp className='h-4 w-4' />,
        },
        {
            title: 'Tasks Completed',
            value: '48',
            change: '+8',
            icon: <CheckCircle className='h-4 w-4' />,
        },
        {
            title: 'Team Members',
            value: '16',
            change: '+3',
            icon: <Users className='h-4 w-4' />,
        },
        {
            title: 'Pending Reviews',
            value: '6',
            change: '-2',
            icon: <AlertTriangle className='h-4 w-4' />,
        },
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Planning':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'Review':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <SidebarProvider>
            <div className='flex min-h-screen w-full'>
                <DashboardSidebar />
                <SidebarInset className='flex-1'>
                    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:px-6'>
                        <SidebarTrigger className='-ml-1' />
                        <div className='flex-1' />
                        <Button size='sm' className='ml-auto'>
                            <Plus className='mr-2 h-4 w-4' />
                            <span className='hidden sm:inline'>
                                New Project
                            </span>
                        </Button>
                        <ModeToggle />
                    </header>

                    <div className='flex-1 space-y-4 p-4 lg:p-6'>
                        {/* Welcome Section */}
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                            <div>
                                <h1 className='text-foreground text-2xl font-bold sm:text-3xl'>
                                    Welcome back! {user?.firstName + user?.lastName!}
                                </h1>
                                <p className='text-muted-foreground'>
                                    Here&apos;s what&apos;s happening with your
                                    projects today.
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 sm:flex-row'>
                                <Button variant='outline' size='sm'>
                                    <Calendar className='mr-2 h-4 w-4' />
                                    <span className='hidden sm:inline'>
                                        <Link href="/calendar">
                                            Schedule
                                        </Link>
                                    </span>
                                </Button>
                                <Button variant='outline' size='sm'>
                                    <Users className='mr-2 h-4 w-4' />
                                    <span className='hidden sm:inline'>
                                        <Link href="/team">
                                            Team
                                        </Link>
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                            {stats.map((stat, index) => (
                                <Card key={index}>
                                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                        <CardTitle className='text-sm font-medium'>
                                            {stat.title}
                                        </CardTitle>
                                        {stat.icon}
                                    </CardHeader>
                                    <CardContent>
                                        <div className='text-xl font-bold sm:text-2xl'>
                                            {stat.value}
                                        </div>
                                        <p className='text-muted-foreground text-xs'>
                                            <span className='text-green-600'>
                                                {stat.change}
                                            </span>{' '}
                                            from last month
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6'>
                            {/* Recent Projects */}
                            <div className='lg:col-span-2'>
                                <Card>
                                    <CardHeader>
                                        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                            <CardTitle>Recent Boards</CardTitle>
                                            <Button variant='outline' size='sm'>
                                                View All
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        {recentProjects.map((project) => (
                                            <div
                                                key={project.id}
                                                className='bg-card flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center'
                                            >
                                                <div className='min-w-0 flex-1'>
                                                    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                                        <h4 className='truncate font-medium'>
                                                            {project.name}
                                                        </h4>
                                                        <div className='flex items-center gap-2'>
                                                            <Badge
                                                                className={getStatusColor(
                                                                    project.status
                                                                )}
                                                            >
                                                                {project.status}
                                                            </Badge>
                                                            <Button
                                                                variant='ghost'
                                                                size='sm'
                                                            >
                                                                <MoreHorizontal className='h-4 w-4' />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className='mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                                        <div className='text-muted-foreground flex items-center gap-4 text-sm'>
                                                            <span className='flex items-center gap-1'>
                                                                <Calendar className='h-3 w-3' />
                                                                {
                                                                    project.dueDate
                                                                }
                                                            </span>
                                                            <span className='flex items-center gap-1'>
                                                                <Users className='h-3 w-3' />
                                                                {project.team}{' '}
                                                                members
                                                            </span>
                                                        </div>
                                                        <div className='flex min-w-0 items-center gap-2 sm:min-w-[120px]'>
                                                            <Progress
                                                                value={
                                                                    project.progress
                                                                }
                                                                className='flex-1'
                                                            />
                                                            <span className='text-sm font-medium whitespace-nowrap'>
                                                                {
                                                                    project.progress
                                                                }
                                                                %
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar Content */}
                            <div className='space-y-4 lg:space-y-6'>
                                {/* Upcoming Tasks */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className='text-lg'>
                                            Upcoming Tasks
                                        </CardTitle>
                                        <CardDescription>
                                            Your tasks for the next few days
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-3'>
                                        {upcomingTasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className='bg-muted/50 flex flex-col gap-2 rounded-lg p-3'
                                            >
                                                <div className='flex items-start justify-between gap-2'>
                                                    <h5 className='text-sm leading-tight font-medium'>
                                                        {task.title}
                                                    </h5>
                                                    <Badge
                                                        className={`${getPriorityColor(task.priority)} text-xs`}
                                                        variant='secondary'
                                                    >
                                                        {task.priority}
                                                    </Badge>
                                                </div>
                                                <div className='text-muted-foreground flex flex-col gap-1 text-xs'>
                                                    <span>{task.project}</span>
                                                    <span className='flex items-center gap-1'>
                                                        <Clock className='h-3 w-3' />
                                                        {task.dueDate}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* Team Activity */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className='text-lg'>
                                            Team Activity
                                        </CardTitle>
                                        <CardDescription>
                                            Recent updates from your team
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-3'>
                                        {teamActivity.map((activity, index) => (
                                            <div
                                                key={index}
                                                className='flex items-start space-x-3'
                                            >
                                                <Avatar className='mt-1 h-6 w-6'>
                                                    <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-500 text-xs text-white'>
                                                        {activity.user
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className='min-w-0 flex-1 text-sm'>
                                                    <span className='font-medium'>
                                                        {activity.user}
                                                    </span>{' '}
                                                    <span className='text-muted-foreground'>
                                                        {activity.action}{' '}
                                                        in{' '}
                                                    </span>
                                                    <span className='font-medium'>
                                                        {activity.project}
                                                    </span>
                                                    <div className='text-muted-foreground mt-1 text-xs'>
                                                        {activity.time}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default DashboardWrapper;
