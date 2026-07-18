import { AlertDialog, Button } from "@heroui/react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[360px]">
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="danger" />
            <AlertDialog.Heading>{title}</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <p className="text-sm text-graphite">{description}</p>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button
              slot="close"
              variant="danger"
              onPress={onConfirm}
            >
              {confirmLabel}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  );
}
