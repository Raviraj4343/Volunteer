import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { safetyApi, getErrorMessage } from "@/services/api";
import { cn } from "@/lib/utils";

const REASONS = [
  { id: "spam", label: "Spam or scam" },
  { id: "unsafe", label: "Safety concern" },
  { id: "fake", label: "Fake or misleading mission" },
  { id: "harassment", label: "Harassment or hate" },
  { id: "other", label: "Something else" },
];

export function ReportDialog({ open, onOpenChange, targetType, targetId, targetName }) {
  const [reason, setReason] = useState(null);
  const [details, setDetails] = useState("");

  const report = useMutation({
    mutationFn: () => safetyApi.report({ targetType, targetId, reason, details }),
    onSuccess: () => {
      toast.success("Thanks for letting us know", {
        description: "Our safety team reviews every report within 24 hours.",
      });
      onOpenChange(false);
      setReason(null);
      setDetails("");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report {targetType === "user" ? targetName : "this mission"}</DialogTitle>
          <DialogDescription>Your report is anonymous. If someone is in immediate danger, call 112.</DialogDescription>
        </DialogHeader>

        <fieldset className="space-y-2">
          <legend className="sr-only">Reason</legend>
          {REASONS.map((r) => (
            <label
              key={r.id}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-[15px] font-medium transition-colors",
                reason === r.id ? "border-primary bg-primary-soft" : "hover:bg-muted"
              )}
            >
              {r.label}
              <input
                type="radio"
                name="reason"
                value={r.id}
                checked={reason === r.id}
                onChange={() => setReason(r.id)}
                className="size-4 accent-[var(--primary)]"
              />
            </label>
          ))}
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="report-details">Anything else we should know? (optional)</Label>
          <Textarea id="report-details" value={details} onChange={(e) => setDetails(e.target.value)} maxLength={500} />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={!reason || report.isPending} onClick={() => report.mutate()}>
            {report.isPending ? "Sending…" : "Submit report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
