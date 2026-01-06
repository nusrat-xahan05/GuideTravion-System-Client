import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/services/admin/userManagement";
import { IGuide } from "@/types/user.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IGuideFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    guide?: IGuide;
}

const GuideFormDialog = ({ open, onClose, onSuccess, guide }: IGuideFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isEdit = !!guide;

    // Local state for dropdowns
    const [userStatus, setUserStatus] = useState(guide?.userStatus || "ACTIVE");
    const [isVerified, setIsVerified] = useState(guide?.isVerified ? "true" : "false");
    const [verificationRequest, setVerificationRequest] = useState(
        guide?.verificationRequest || "NOT_SEND"
    );

    // Action state
    const [state, formAction, pending] = useActionState(
        updateUser.bind(null, guide?._id as string),
        null
    );

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    // Handle submission response
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
            onSuccess();
            handleClose();
        } else {
            toast.error(state.message);
        }
    }, [state]); // Only depend on state

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Update Guide Verification</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0 px-6 space-y-4 pb-4"
                >
                    {/* USER STATUS */}
                    <Field>
                        <FieldLabel>User Status</FieldLabel>
                        <Input type="hidden" name="userStatus" value={userStatus} />
                        <Select value={userStatus} onValueChange={setUserStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                                <SelectItem value="BLOCKED">Blocked</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* IS VERIFIED */}
                    <Field>
                        <FieldLabel>Is Verified</FieldLabel>
                        <Input type="hidden" name="isVerified" value={isVerified} />
                        <Select value={isVerified} onValueChange={setIsVerified}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Verified</SelectItem>
                                <SelectItem value="false">Not Verified</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* VERIFICATION REQUEST */}
                    <Field>
                        <FieldLabel>Verification Request</FieldLabel>
                        <Input type="hidden" name="verificationRequest" value={verificationRequest} />
                        <Select value={verificationRequest} onValueChange={setVerificationRequest}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select request status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NOT_SEND">Not Send</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="APPROVED">Approved</SelectItem>
                                <SelectItem value="REJECTED">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* FOOTER BUTTONS */}
                    <div className="flex justify-end gap-2 border-t bg-gray-50 pt-4">
                        <Button className="cursor-pointer" type="button" variant="outline" onClick={onClose} disabled={pending}>
                            Cancel
                        </Button>
                        <Button className="cursor-pointer" type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Update Guide"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GuideFormDialog;
