"use client";

import { Button } from "@/components/ui/button";

const GoToTop = () => {
  const goBackToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-center">
      <Button onClick={goBackToTop} variant="default" size="default">
        ↑
      </Button>
    </div>
  );
};

export default GoToTop;
