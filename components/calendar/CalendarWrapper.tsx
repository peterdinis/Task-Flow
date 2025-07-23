"use client"

import { FC, useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const CalendarWrapper: FC = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    const events = [
        { id: 1, title: "Team Meeting", time: "09:00", date: "2024-01-20", type: "meeting" },
        { id: 2, title: "Project Deadline", time: "17:00", date: "2024-01-22", type: "deadline" },
        { id: 3, title: "Client Call", time: "14:00", date: "2024-01-23", type: "call" },
        { id: 4, title: "Sprint Planning", time: "10:00", date: "2024-01-25", type: "meeting" },
        { id: 5, title: "Design Review", time: "15:30", date: "2024-01-26", type: "review" }
    ];

    const upcomingEvents = events.slice(0, 3);

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case "meeting": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "deadline": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            case "call": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "review": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
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
                            <span className="hidden sm:inline">New Event</span>
                        </Button>
                    </header>

                    <div className="flex-1 space-y-4 p-4 lg:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Calendar</h1>
                                <p className="text-muted-foreground">Schedule and manage your events</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                            <div className="xl:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <CardTitle className="text-xl">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</CardTitle>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                                                    <ChevronLeft className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CalendarComponent
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            month={currentDate}
                                            onMonthChange={setCurrentDate}
                                            className="w-full [&_table]:w-full [&_td]:p-1 [&_th]:p-1"
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-4 lg:space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upcoming Events</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {upcomingEvents.map((event) => (
                                            <div key={event.id} className="flex flex-col gap-2 p-3 rounded-lg border">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="font-medium leading-tight">{event.title}</h4>
                                                    <Badge className={getEventTypeColor(event.type)} variant="secondary">
                                                        {event.type}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{event.time} • {event.date}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Stats</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Events this month</span>
                                            <span className="font-medium">12</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Meetings today</span>
                                            <span className="font-medium">3</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Upcoming deadlines</span>
                                            <span className="font-medium">2</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}

export default CalendarWrapper