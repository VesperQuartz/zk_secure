import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Confetti from "react-confetti";

interface CongratsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CongratsDialog({ isOpen, onClose }: CongratsDialogProps) {
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Congratulations!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <p className="text-xl mb-6">Your purchase was successful!</p>
          <p className="text-lg text-gray-600">
            Thank you for shopping with us. We hope you enjoy your new item!
          </p>
        </div>
      </DialogContent>
      {isOpen && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
    </Dialog>
  );
}
