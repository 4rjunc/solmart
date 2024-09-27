import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { ReactNode } from 'react';

interface IModal {
  modalTrigger: ReactNode;
  children: ReactNode;
  title?: string;
}

const DefaultModal = ({ title, children, modalTrigger }: IModal) => {
  return (
    <Dialog>
      <DialogTrigger>{modalTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DefaultModal;
