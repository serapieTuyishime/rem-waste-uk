"use client"

import { useEffect, useState } from "react"
import { motion, type PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SkipCard } from "./cards/skip"
import { SkipType } from "@/index";

export const SkipSelection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [skips, setSkips] = useState<SkipType[]>([])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50

    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < skips.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % skips.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + skips.length) % skips.length)
  }

  useEffect(() => {
    const fetchSkips = async () => {
      const response = await fetch('/api/skips')
      const data = await response.json()
      setSkips(data)
    }
    fetchSkips()
  }, [])


  return (
    <div className="w-full h-full bg-background py-8 pt-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Choose Your Skip Size</h2>
          <p className="text-foreground/30">Find the perfect skip for your project</p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden max-w-dvw">
          <div className="relative overflow-hidden px-16 min-h-400">
            <motion.div
              className="flex items-center"
              animate={{
                x: `calc(-${currentIndex * 320}px + ${30}px)`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              // dragConstraints={{
              //   left: `calc(-${(skips.length - 1) * 320}px)`,
              //   right: `${280}px`,
              // }}
              onDragEnd={handleDragEnd}
              dragElastic={0.2}
              style={{ width: `${(skips.length + 2) * 280}px` }}
            >
              {skips.map((skip, index) => {
                const offset = index - currentIndex - 1;
                const isActive = index === currentIndex;
                const isAdjacent = Math.abs(offset) === 1;

                return (
                  <motion.div
                    key={skip.id}
                    className="flex-shrink-0 px-2"
                    style={{ width: "320px" }}
                    animate={{
                      scale: isActive ? 1 : isAdjacent ? 0.8 : 0.6,
                      opacity: isActive ? 1 : isAdjacent ? 0.7 : 0.4,
                      zIndex: isActive ? 30 : isAdjacent ? 20 : 10,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <SkipCard skip={skip} isActive={isActive} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              {skips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`size-8 rounded-full transition-all ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex === skips.length - 1}
              className="p-2"
            >
              <ChevronRight className="size-16" />
            </Button>
          </div>
        </div>

        {/* Tablet and Desktop Grid */}
        <div className="hidden md:block">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {skips.map((skip, index) => (
              <motion.div
                key={skip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <SkipCard skip={skip} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}