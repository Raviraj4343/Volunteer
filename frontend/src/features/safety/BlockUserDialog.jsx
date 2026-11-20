import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { safetyApi, getErrorMessage } from "@/services/api";

export function BlockUserDialog({ open, onOpenChange, user, onBlocked }) {
  const queryClient = useQueryClient();
  const block = useMutation({
    mutationFn: () => safetyApi.blockUser(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(`${user.name} is blocked`, { description: "You won't see their missions or messages." });
      onOpenChange(false);
      onBlocked?.();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block {user.name}?</DialogTitle>
          <DialogDescription>
            They won't be able to message you, and you won't see missions they host. They won't be notified.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={block.isPending} onClick={() => block.mutate()}>
            {block.isPending ? "Blocking…" : "Block"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
