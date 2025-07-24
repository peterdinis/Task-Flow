'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef, ReactNode, FC } from 'react';

const User = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
    >
        <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
        <circle cx='12' cy='7' r='4' />
    </svg>
);

const Settings = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
    >
        <circle cx='12' cy='12' r='3' />
        <path d='M12 1v6m0 6v6' />
        <path d='M1 12h6m6 0h6' />
    </svg>
);

const CreditCard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
    >
        <rect width='20' height='14' x='2' y='5' rx='2' />
        <line x1='2' x2='22' y1='10' y2='10' />
    </svg>
);

const HelpCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
    >
        <circle cx='12' cy='12' r='10' />
        <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
        <line x1='12' x2='12.01' y1='17' y2='17' />
    </svg>
);

const LogOut = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
    >
        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
        <polyline points='16 17 21 12 16 7' />
        <line x1='21' x2='9' y1='12' y2='12' />
    </svg>
);

// Dropdown Components
interface DropdownMenuProps {
    children: ReactNode;
    trigger: ReactNode;
}

const DropdownMenu = ({ children, trigger }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTriggerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative inline-block text-left' ref={dropdownRef}>
            <div onClick={handleTriggerClick} className='cursor-pointer'>
                {trigger}
            </div>
            {isOpen && (
                <div
                    className='ring-opacity-5 animate-in fade-in-0 zoom-in-95 absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-xl bg-white p-2 shadow-xl ring-1 ring-black focus:outline-none dark:bg-zinc-900'
                    role='menu'
                    aria-orientation='vertical'
                >
                    {children}
                </div>
            )}
        </div>
    );
};

interface DropdownMenuItemProps {
    children: ReactNode;
    onClick?: () => void;
}

const DropdownMenuItem = ({ children, onClick }: DropdownMenuItemProps) => (
    <a
        href='#'
        onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (onClick) onClick();
        }}
        className='group flex items-center rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition-colors duration-150 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
        role='menuitem'
    >
        {children}
    </a>
);

const DropdownMenuSeparator = () => (
    <div className='my-2 h-px bg-zinc-200 dark:bg-zinc-700' />
);

const ProfileDropdown: FC = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    return (
        <div className='flex items-center justify-center font-sans'>
            <DropdownMenu
                trigger={
                    <button className='flex items-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white'>
                            JD
                        </div>
                    </button>
                }
            >
                {/* Menu Items */}
                <div className='py-1'>
                    <DropdownMenuItem onClick={() => console.log('Profile')}>
                        <User className='mr-3 h-4 w-4 text-zinc-500' />
                        {user?.fullName}
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <div className='py-1'>
                    <DropdownMenuItem
                        onClick={() => {
                            signOut();
                            router.push('/');
                        }}
                    >
                        <LogOut className='mr-3 h-4 w-4 text-zinc-500' />
                        Sign Out
                    </DropdownMenuItem>
                </div>
            </DropdownMenu>
        </div>
    );
};

export default ProfileDropdown;
