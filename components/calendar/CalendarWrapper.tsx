'use client';

import { FC, useState } from 'react';
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { DashboardSidebar } from '../dashboard/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserMeetings } from '@/hooks/meetings/useUserMeetings';
import { useCreateMeeting } from '@/hooks/meetings/useCreateMeeting';

const CalendarWrapper: FC = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data, isLoading } = useUserMeetings({ page: 1, limit: 5 });
    const meetings = data?.meetings ?? [];

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'meeting':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'deadline':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'call':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'review':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        direction === 'prev'
            ? newDate.setMonth(newDate.getMonth() - 1)
            : newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    return (
        <SidebarProvider>
            <div className='flex min-h-screen w-full'>
                <DashboardSidebar />
                <SidebarInset className='flex-1'>
                    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:px-6'>
                        <SidebarTrigger className='-ml-1' />
                        <div className='flex-1' />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='sm' className='ml-auto'>
                                    <Plus className='mr-2 h-4 w-4' />
                                    <span className='hidden sm:inline'>
                                        New Event
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className='sm:max-w-md'>
                                <DialogHeader>
                                    <DialogTitle>Create New Event</DialogTitle>
                                    <DialogDescription>
                                        Fill out the form to create a meeting.
                                    </DialogDescription>
                                </DialogHeader>
                                <NewEventForm />
                            </DialogContent>
                        </Dialog>
                    </header>

                    <div className='flex-1 space-y-4 p-4 lg:p-6'>
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                            <div>
                                <h1 className='text-foreground text-2xl font-bold sm:text-3xl'>
                                    Calendar
                                </h1>
                                <p className='text-muted-foreground'>
                                    Schedule and manage your events
                                </p>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 gap-4 lg:gap-6 xl:grid-cols-3'>
                            <div className='xl:col-span-2'>
                                <Card>
                                    <CardHeader>
                                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                                            <CardTitle className='text-xl'>
                                                {
                                                    monthNames[
                                                        currentDate.getMonth()
                                                    ]
                                                }{' '}
                                                {currentDate.getFullYear()}
                                            </CardTitle>
                                            <div className='flex space-x-2'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() =>
                                                        navigateMonth('prev')
                                                    }
                                                >
                                                    <ChevronLeft className='h-4 w-4' />
                                                </Button>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() =>
                                                        navigateMonth('next')
                                                    }
                                                >
                                                    <ChevronRight className='h-4 w-4' />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CalendarComponent
                                            mode='single'
                                            selected={date}
                                            onSelect={setDate}
                                            month={currentDate}
                                            onMonthChange={setCurrentDate}
                                            className='w-full [&_table]:w-full [&_td]:p-1 [&_th]:p-1'
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className='space-y-4 lg:space-y-6'>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upcoming Events</CardTitle>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        {isLoading ? (
                                            <p className='text-muted-foreground text-sm'>
                                                Loading events...
                                            </p>
                                        ) : meetings.length === 0 ? (
                                            <p className='text-muted-foreground text-sm'>
                                                No events
                                            </p>
                                        ) : (
                                            meetings.map((event: any) => (
                                                <div
                                                    key={event.id}
                                                    className='flex flex-col gap-2 rounded-lg border p-3'
                                                >
                                                    <div className='flex items-start justify-between gap-2'>
                                                        <h4 className='leading-tight font-medium'>
                                                            {event.name}
                                                        </h4>
                                                        <Badge
                                                            className={getEventTypeColor(
                                                                event.type
                                                            )}
                                                            variant='secondary'
                                                        >
                                                            {event.type}
                                                        </Badge>
                                                    </div>
                                                    <p className='text-muted-foreground text-sm'>
                                                        {event.from}–{event.to}{' '}
                                                        • {event.start_date}
                                                    </p>
                                                </div>
                                            ))
                                        )}
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

const NewEventForm: FC = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        start_date: '',
        from: '',
        to: '',
        type: '',
    });

    const createMeetingMutation = useCreateMeeting();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMeetingMutation.mutate(form);
    };

    return (
        <form onSubmit={handleSubmit} className='grid gap-4'>
            <div className='grid gap-2'>
                <Label htmlFor='name'>Title</Label>
                <Input
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='grid gap-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                    name='description'
                    value={form.description}
                    onChange={handleChange}
                />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <div className='grid gap-2'>
                    <Label htmlFor='start_date'>Date</Label>
                    <Input
                        type='date'
                        name='start_date'
                        value={form.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='type'>Type</Label>
                    <Input
                        name='type'
                        value={form.type}
                        onChange={handleChange}
                        placeholder='e.g., meeting'
                        required
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <div className='grid gap-2'>
                    <Label htmlFor='from'>From</Label>
                    <Input
                        type='time'
                        name='from'
                        value={form.from}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='to'>To</Label>
                    <Input
                        type='time'
                        name='to'
                        value={form.to}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <DialogFooter>
                <Button
                    type='submit'
                    disabled={createMeetingMutation.isPending}
                >
                    {createMeetingMutation.isPending ? 'Creating...' : 'Create'}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default CalendarWrapper;
