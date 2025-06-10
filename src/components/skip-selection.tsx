"use client"

import { useState } from "react"
import { motion, type PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SkipCard } from "./cards/skip"
import { SkipType } from "@/index";
import { useQuery } from "@tanstack/react-query"

export const SkipSelection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: skips } = useQuery<SkipType[], Error>({
    queryKey: ['skips'],
    queryFn: () => fetch('http://localhost:3000/api/skips').then(res => res.json()),
    initialData: []
  })

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

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Skip Size {skips?.length}</h2>
          <p className="text-gray-600">Find the perfect skip for your project</p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden bg-red-300">
          <div className="relative overflow-hidden px-16 bg-lime-300 h-400">
            <motion.div
              className="flex items-center"
              animate={{
                x: `calc(-${currentIndex * 280}px + ${280}px)`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{
                left: `calc(-${(skips.length - 1) * 280}px)`,
                right: `${280}px`,
              }}
              onDragEnd={handleDragEnd}
              dragElastic={0.2}
              style={{ width: `${(skips.length + 2) * 280}px` }}
            >
              {skips.map((skip, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;
                const isAdjacent = Math.abs(offset) === 1;
                const isVisible = Math.abs(offset) <= 2;

                return (
                  <motion.div
                    key={skip.id}
                    className="flex-shrink-0 px-2"
                    style={{ width: "280px" }}
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
                  className={`size-8 rounded-full transition-all ${index === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
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
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Current Skip Info */}
          <div className="mt-6 text-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <h3 className="font-semibold text-lg text-gray-900">{skips[currentIndex]?.size}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {skips[currentIndex]?.size} • {skips[currentIndex]?.size} • {skips[currentIndex]?.price_before_vat}
              </p>
              <p className="text-xs text-gray-500 mt-2">Swipe left or right to explore more options</p>
            </motion.div>
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