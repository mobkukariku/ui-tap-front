"use client";

import { useState } from "react";
import {Dialog, DialogContent, DialogTitle} from "@/shared/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ImageGalleryProps = {
  images: string[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const goPrev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  const goNext = () => setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));

  return (
    <>
      <div className="overflow-x-auto py-2">
        <div className="flex gap-3">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="flex-shrink-0 w-64 h-48 rounded-lg overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img
                src={url}
                alt={`Фото ${i + 1}`}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className="md:min-w-6xl w-[90dvw] h-[90dvh] p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={goPrev}
              className="absolute left-4 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-4 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <img
              src={images[currentIndex]}
              alt={`Фото ${currentIndex + 1}`}
              className="md:min-w-full max-w-full max-h-full object-contain"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-8 bg-white" : "w-1 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}