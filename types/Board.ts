export type Board = {
    id: string;
    title: string;
    description: string | null;
    color: string;
    status?: string | null;
    progress?: number | null;
    dueDate?: string | null;
    team?: string[];
    created_at?: string;
    user_id: string;
};
