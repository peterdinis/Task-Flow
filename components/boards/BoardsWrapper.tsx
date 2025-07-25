'use client';

import { FC, useState } from 'react';
import { format } from 'date-fns';
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { DashboardSidebar } from '../dashboard/DashboardSidebar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Plus,
    MoreHorizontal,
    Calendar,
    Filter,
    Search,
    Loader2,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { FormValues, formSchema } from '@/schemas/boardSchema';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewBoard, getBoards } from '@/supabase/queries/boardQueries';
import { Board } from '@/types/Board';

const PAGE_LIMIT = 10;

const BoardsWrapper: FC = () => {
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const [page] = useState(1);

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            color: '#3b82f6',
            user_id: user?.id || '',
        },
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['boards', page],
        queryFn: () => getBoards({ page, limit: PAGE_LIMIT }),
        enabled: !!user?.id,
    });

    const mutation = useMutation({
        mutationFn: createNewBoard,
        onSuccess: () => {
            toast.success('Board created successfully!');
            setOpen(false);
            reset();
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
        onError: (err: any) => {
            toast.error(err?.message || 'Failed to create board');
        },
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'In Progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Review':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Planning':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <DashboardSidebar />
                <SidebarInset className="flex-1">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:px-6">
                        <SidebarTrigger className="-ml-1" />
                        <div className="flex-1" />
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="ml-auto">
                                    <Plus className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">New Project</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Create New Board</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <Input placeholder="Board title" {...register('title')} />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Textarea placeholder="Board description" {...register('description')} />
                                    </div>
                                    <div>
                                        <Input
                                            type="color"
                                            {...register('color')}
                                            className="h-10 w-20 p-1"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={isSubmitting || mutation.isPending}>
                                            {mutation.isPending ? 'Creating...' : 'Create'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </header>

                    <div className="flex-1 space-y-4 p-4 lg:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-foreground text-2xl font-bold sm:text-3xl">Boards</h1>
                                <p className="text-muted-foreground">Manage and track all your boards</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="relative max-w-sm flex-1">
                                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                <Input placeholder="Search for board..." className="pl-9" />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Filter className="mr-2 h-4 w-4" />
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

                        {isLoading && <Loader2 className='animate-spin w-8 h-8' />}
                        {isError && <p className="text-red-500">{(error as Error).message}</p>}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                            {data?.boards.map((project: Board) => (
                                <Card
                                    key={project.id}
                                    className="cursor-pointer transition-shadow hover:shadow-lg"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex min-w-0 items-center space-x-2">
                                                <div
                                                    className={`h-3 w-3 rounded-full`}
                                                    style={{ backgroundColor: project.color }}
                                                ></div>
                                                <CardTitle className="truncate text-lg">{project.title}</CardTitle>
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
                                                    <DropdownMenuItem className="text-destructive">
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <CardDescription className="line-clamp-2 text-sm">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Badge className={getStatusColor(project.status || 'Planning')}>
                                                    {project.status || 'Planning'}
                                                </Badge>
                                                <span className="text-sm font-medium">
                                                    {project.progress ?? 0}%
                                                </span>
                                            </div>

                                            <div className="bg-secondary h-2 w-full rounded-full">
                                                <div
                                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${project.progress ?? 0}%` }}
                                                ></div>
                                            </div>

                                            <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex items-center">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    <span className="truncate">
                                                        {project.created_at
                                                            ? format(new Date(project.created_at), 'd. MMMM yyyy')
                                                            : '-'}
                                                    </span>
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
    );
};

export default BoardsWrapper;
