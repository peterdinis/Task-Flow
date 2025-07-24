"use client"

import { FC } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';
import {
    User,
    Bell,
    Shield,
    Palette,
    Save,
    Camera,
    Moon,
    Sun,
    Monitor,
} from 'lucide-react';

const SettingsWrapper: FC = () => {
    const { theme, setTheme } = useTheme();
    return (
        <SidebarProvider>
            <div className='flex min-h-screen w-full'>
                <DashboardSidebar />
                <SidebarInset className='flex-1'>
                    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:px-6'>
                        <SidebarTrigger className='-ml-1' />
                        <div className='flex-1' />
                    </header>

                    <div className='flex-1 space-y-4 p-4 lg:p-6'>
                        <div>
                            <h1 className='text-foreground text-2xl font-bold sm:text-3xl'>
                                Settings
                            </h1>
                            <p className='text-muted-foreground'>
                                Manage your account settings and preferences
                            </p>
                        </div>

                        <Tabs defaultValue='profile' className='space-y-4'>
                            <TabsList className='grid w-full grid-cols-2 lg:grid-cols-4'>
                                <TabsTrigger
                                    value='profile'
                                    className='flex items-center gap-2'
                                >
                                    <User className='h-4 w-4' />
                                    <span className='hidden sm:inline'>
                                        Profile
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='appearance'
                                    className='flex items-center gap-2'
                                >
                                    <Palette className='h-4 w-4' />
                                    <span className='hidden sm:inline'>
                                        Appearance
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='notifications'
                                    className='flex items-center gap-2'
                                >
                                    <Bell className='h-4 w-4' />
                                    <span className='hidden sm:inline'>
                                        Notifications
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value='security'
                                    className='flex items-center gap-2'
                                >
                                    <Shield className='h-4 w-4' />
                                    <span className='hidden sm:inline'>
                                        Security
                                    </span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value='profile' className='space-y-6'>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Profile Information
                                        </CardTitle>
                                        <CardDescription>
                                            Update your account details and
                                            personal information
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-6'>
                                        <div className='flex flex-col items-start gap-6 sm:flex-row'>
                                            <div className='relative'>
                                                <Avatar className='h-20 w-20'>
                                                    <AvatarFallback className='bg-gradient-to-br from-blue-600 to-purple-600 text-xl text-white'>
                                                        <User className='h-8 w-8' />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <Button
                                                    size='sm'
                                                    variant='outline'
                                                    className='absolute -right-2 -bottom-2 rounded-full'
                                                >
                                                    <Camera className='h-3 w-3' />
                                                </Button>
                                            </div>
                                            <div className='w-full flex-1 space-y-4 sm:w-auto'>
                                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                                    <div className='space-y-2'>
                                                        <Label htmlFor='firstName'>
                                                            First Name
                                                        </Label>
                                                        <Input
                                                            id='firstName'
                                                            defaultValue='John'
                                                        />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <Label htmlFor='lastName'>
                                                            Last Name
                                                        </Label>
                                                        <Input
                                                            id='lastName'
                                                            defaultValue='Doe'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='space-y-2'>
                                                    <Label htmlFor='email'>
                                                        Email
                                                    </Label>
                                                    <Input
                                                        id='email'
                                                        type='email'
                                                        defaultValue='john.doe@company.com'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                            <div className='space-y-2'>
                                                <Label htmlFor='phone'>
                                                    Phone
                                                </Label>
                                                <Input
                                                    id='phone'
                                                    defaultValue='+1 (555) 123-4567'
                                                />
                                            </div>
                                            <div className='space-y-2'>
                                                <Label htmlFor='location'>
                                                    Location
                                                </Label>
                                                <Input
                                                    id='location'
                                                    defaultValue='New York, NY'
                                                />
                                            </div>
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='bio'>Bio</Label>
                                            <Textarea
                                                id='bio'
                                                placeholder='Tell us about yourself...'
                                                className='min-h-[100px]'
                                                defaultValue='Experienced project manager with a passion for team collaboration and delivering results.'
                                            />
                                        </div>

                                        <Button>
                                            <Save className='mr-2 h-4 w-4' />
                                            Save Changes
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value='appearance'
                                className='space-y-6'
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Theme</CardTitle>
                                        <CardDescription>
                                            Choose your preferred theme
                                            appearance
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-6'>
                                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                                            <div
                                                className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${
                                                    theme === 'light'
                                                        ? 'border-primary'
                                                        : 'border-muted'
                                                }`}
                                                onClick={() =>
                                                    setTheme('light')
                                                }
                                            >
                                                <Sun className='mx-auto mb-2 h-8 w-8' />
                                                <div className='font-medium'>
                                                    Light
                                                </div>
                                                <div className='text-muted-foreground text-xs'>
                                                    Light theme
                                                </div>
                                            </div>
                                            <div
                                                className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${
                                                    theme === 'dark'
                                                        ? 'border-primary'
                                                        : 'border-muted'
                                                }`}
                                                onClick={() => setTheme('dark')}
                                            >
                                                <Moon className='mx-auto mb-2 h-8 w-8' />
                                                <div className='font-medium'>
                                                    Dark
                                                </div>
                                                <div className='text-muted-foreground text-xs'>
                                                    Dark theme
                                                </div>
                                            </div>
                                            <div
                                                className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-colors ${
                                                    theme === 'system'
                                                        ? 'border-primary'
                                                        : 'border-muted'
                                                }`}
                                                onClick={() =>
                                                    setTheme('system')
                                                }
                                            >
                                                <Monitor className='mx-auto mb-2 h-8 w-8' />
                                                <div className='font-medium'>
                                                    System
                                                </div>
                                                <div className='text-muted-foreground text-xs'>
                                                    Auto theme
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Display Preferences
                                        </CardTitle>
                                        <CardDescription>
                                            Customize your display settings
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                                            <div>
                                                <Label>Compact sidebar</Label>
                                                <p className='text-muted-foreground text-sm'>
                                                    Use a more compact sidebar
                                                    layout
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>
                                        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                                            <div>
                                                <Label>Show animations</Label>
                                                <p className='text-muted-foreground text-sm'>
                                                    Enable interface animations
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value='notifications'
                                className='space-y-6'
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Email Notifications
                                        </CardTitle>
                                        <CardDescription>
                                            Choose what email notifications you
                                            want to receive
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                                            <div>
                                                <Label>Project updates</Label>
                                                <p className='text-muted-foreground text-sm'>
                                                    Get notified about project
                                                    changes
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                                            <div>
                                                <Label>Task assignments</Label>
                                                <p className='text-muted-foreground text-sm'>
                                                    Get notified when assigned
                                                    to tasks
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                                            <div>
                                                <Label>Team mentions</Label>
                                                <p className='text-muted-foreground text-sm'>
                                                    Get notified when mentioned
                                                    by team members
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                                            <div>
                                                <Label>Marketing emails</Label>
                                                <p className='text-muted-foreground text-sm'>
                                                    Receive product updates and
                                                    news
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Push Notifications
                                        </CardTitle>
                                        <CardDescription>
                                            Manage your push notification
                                            preferences
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        <div className='space-y-2'>
                                            <Label htmlFor='notificationFrequency'>
                                                Notification frequency
                                            </Label>
                                            <Select defaultValue='immediate'>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='immediate'>
                                                        Immediate
                                                    </SelectItem>
                                                    <SelectItem value='hourly'>
                                                        Hourly digest
                                                    </SelectItem>
                                                    <SelectItem value='daily'>
                                                        Daily digest
                                                    </SelectItem>
                                                    <SelectItem value='never'>
                                                        Never
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value='security' className='space-y-6'>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Password</CardTitle>
                                        <CardDescription>
                                            Update your password to keep your
                                            account secure
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        <div className='space-y-2'>
                                            <Label htmlFor='currentPassword'>
                                                Current password
                                            </Label>
                                            <Input
                                                id='currentPassword'
                                                type='password'
                                            />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='newPassword'>
                                                New password
                                            </Label>
                                            <Input
                                                id='newPassword'
                                                type='password'
                                            />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='confirmPassword'>
                                                Confirm new password
                                            </Label>
                                            <Input
                                                id='confirmPassword'
                                                type='password'
                                            />
                                        </div>
                                        <Button>Update Password</Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Two-Factor Authentication
                                        </CardTitle>
                                        <CardDescription>
                                            Add an extra layer of security to
                                            your account
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                                            <div>
                                                <Label>
                                                    Two-factor authentication
                                                </Label>
                                                <p className='text-muted-foreground text-sm'>
                                                    Use authenticator app for
                                                    extra security
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>
                                        <Button variant='outline'>
                                            Configure 2FA
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Sessions</CardTitle>
                                        <CardDescription>
                                            Manage your active sessions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='space-y-4'>
                                        <div className='space-y-3'>
                                            <div className='flex flex-col justify-between gap-4 rounded-lg border p-3 sm:flex-row sm:items-center'>
                                                <div>
                                                    <div className='font-medium'>
                                                        Current session
                                                    </div>
                                                    <div className='text-muted-foreground text-sm'>
                                                        MacBook Pro • New York,
                                                        NY
                                                    </div>
                                                </div>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    disabled
                                                >
                                                    Current
                                                </Button>
                                            </div>
                                            <div className='flex flex-col justify-between gap-4 rounded-lg border p-3 sm:flex-row sm:items-center'>
                                                <div>
                                                    <div className='font-medium'>
                                                        iPhone 15
                                                    </div>
                                                    <div className='text-muted-foreground text-sm'>
                                                        Mobile app • New York,
                                                        NY
                                                    </div>
                                                </div>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                >
                                                    Revoke
                                                </Button>
                                            </div>
                                        </div>
                                        <Button variant='destructive'>
                                            Sign out of all devices
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default SettingsWrapper;
