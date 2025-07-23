'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { FC, ReactNode } from 'react';

type ClerkProviderProps = {
    children: ReactNode;
};

const AppClerkProvider: FC<ClerkProviderProps> = ({
    children,
}: ClerkProviderProps) => {
    return <ClerkProvider>{children}</ClerkProvider>;
};

export default AppClerkProvider;
