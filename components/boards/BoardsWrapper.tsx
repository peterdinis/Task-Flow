'use client';

import { FC, useEffect, useState } from 'react';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Plus,
    MoreHorizontal,
    Calendar,
    Users,
    Filter,
    Search,
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewBoard, getBoards } from '@/actions/boardActions';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { useAction } from 'next-safe-action/hooks';

type Board = {
    id: string;
    title: string;
    description: string | null;
    color: string;
    status: string | null;
    progress: number | null;
    dueDate: string | null;
    team: string[]; // uprav podľa potreby
    created_at: string;
    user_id: string;
};

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    color: z.string().optional(),
    user_id: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const BoardsWrapper: FC = () => {
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const [boards, setBoards] = useState<Board[]>([]);

    const { execute: fetchBoards, status, result } = useAction(getBoards);

    useEffect(() => {
        if (user?.id) {
            fetchBoards({ page: 1, limit: 10 });
        }
    }, [fetchBoards, user?.id]);

    useEffect(() => {
        if (result?.data) {
            setBoards(result.data.boards);
        }
    }, [result]);

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

    const onSubmit = async (values: FormValues) => {
        try {
            await createNewBoard(values);
            reset();
            setOpen(false);
            toast.success('Board created successfully!');
            fetchBoards({ page: 1, limit: 10 });
        } catch (error) {
            console.error('Failed to create board:', error);
            toast.error('Failed to create board.');
        }
    };

    const getStatusColor = (status: string | null | undefined) => {
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
            <SidebarInset className='flex flex-col gap-4 py-4 pr-6 pl-8'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-2xl font-bold'>Projects</h1>
                    <Button
                        variant='outline'
                        size='sm'
                        className='ml-auto gap-1'
                    >
                        <Filter className='h-4 w-4' />
                        Filter
                    </Button>
                    <Button variant='outline' size='sm'>
                        <Calendar className='mr-2 h-4 w-4' />
                        This Month
                    </Button>
                </div>
                <div className='relative'>
                    <Search className='text-muted-foreground absolute top-2.5 left-3 h-4 w-4' />
                    <Input placeholder='Search projects...' className='pl-10' />
                </div>
                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {boards.map((project: Board) => (
                        <Card key={project.id}>
                            <CardHeader className='pb-2'>
                                <CardDescription>
                                    {project.dueDate || 'No due date'}
                                </CardDescription>
                                <CardTitle className='line-clamp-1'>
                                    {project.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='text-muted-foreground flex space-x-2 text-sm'>
                                    <div>{project.progress ?? 0}%</div>
                                    <div>•</div>
                                    <div>
                                        {project.team?.length ?? 0} Members
                                    </div>
                                </div>
                                <div className='mt-2 flex items-center justify-between'>
                                    <Badge
                                        className={getStatusColor(
                                            project.status
                                        )}
                                    >
                                        {project.status || 'Planning'}
                                    </Badge>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='ghost' size='icon'>
                                                <MoreHorizontal className='h-4 w-4' />
                                                <span className='sr-only'>
                                                    More
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SidebarInset>
            <DashboardSidebar />
            <SidebarTrigger className='h-10 w-10 border' />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant='outline' className='w-full justify-start'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Board
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Board</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='grid gap-4 py-4'
                    >
                        <Input
                            placeholder='Board title'
                            {...register('title')}
                        />
                        {errors.title && (
                            <p className='text-sm text-red-500'>
                                {errors.title.message}
                            </p>
                        )}
                        <Textarea
                            placeholder='Description'
                            {...register('description')}
                        />
                        <input
                            type='hidden'
                            value={user?.id}
                            {...register('user_id')}
                        />
                        <DialogFooter>
                            <Button type='submit' disabled={isSubmitting}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
};

export default BoardsWrapper;
