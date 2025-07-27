"use client";

import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Label } from "../ui/label";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateMeeting } from "@/hooks/meetings/useCreateMeeting";
import { useToast } from "@/hooks/shared/use-toast";
import { Loader2 } from "lucide-react";
import { MeetingFormData, meetingSchema } from "@/schemas/meetingSchema";

const CreateNewMeeting: FC<{ onClose?: () => void }> = ({ onClose }) => {
    const [form, setForm] = useState<MeetingFormData>({
        name: "",
        description: "",
        start_date: "",
        from: "",
        to: "",
        type: "",
    });

    const { toast } = useToast()

    const [errors, setErrors] = useState<Partial<Record<keyof MeetingFormData, string>>>({});

    const createMeetingMutation = useCreateMeeting();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const parsed = meetingSchema.safeParse(form);

        if (!parsed.success) {
            const fieldErrors: typeof errors = {};

            parsed.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof MeetingFormData;
                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);

            toast({
                title: "Validation Error",
                description: "Please fix the form fields.",
            });

            return;
        }

        createMeetingMutation.mutate(parsed.data, {
            onSuccess: () => {
                toast({
                    title: "Meeting Created",
                    description: "Your new meeting has been successfully created.",
                });
                if (onClose) onClose();
            },
            onError: () => {
                toast({
                    title: "Error",
                    description: "Failed to create meeting. Please try again.",
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Title</Label>
                <Input name="name" value={form.name} onChange={handleChange} />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" value={form.description} onChange={handleChange} />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="start_date">Date</Label>
                    <Input
                        type="date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleChange}
                    />
                    {errors.start_date && (
                        <p className="text-sm text-red-500">{errors.start_date}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Input
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        placeholder="e.g., meeting"
                    />
                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="from">From</Label>
                    <Input
                        type="time"
                        name="from"
                        value={form.from}
                        onChange={handleChange}
                    />
                    {errors.from && <p className="text-sm text-red-500">{errors.from}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="to">To</Label>
                    <Input
                        type="time"
                        name="to"
                        value={form.to}
                        onChange={handleChange}
                    />
                    {errors.to && <p className="text-sm text-red-500">{errors.to}</p>}
                </div>
            </div>

            <DialogFooter>
                <Button type="submit" disabled={createMeetingMutation.isPending}>
                    {createMeetingMutation.isPending ? <Loader2 className="animate-spin w-8 h-8" /> : "Create"}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default CreateNewMeeting;
