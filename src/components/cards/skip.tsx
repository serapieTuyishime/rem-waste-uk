import { Card, CardContent } from "@/components/ui/card"
import { SkipType } from "@/index"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface SkipHireCardProps {
  skip: SkipType,
  isActive?: boolean
}

export const SkipCard = ({ skip, isActive }: SkipHireCardProps) => {
  const data: SkipType = skip 

  const totalPrice = data.price_before_vat * (1 + data.vat / 100)

  return (
    <Card className={cn("w-full pt-0 max-w-sm mx-auto overflow-hidden bg-gray-50 border-primary/20", !isActive ? "opacity-50 md:opacity-100" : "")}>
      {/* Header with image and dollar sign */}
      <div className="relative h-200">
        <Image
          src={data.url || "/skip-images/4-yarder-skip.jpg"}
          alt={data.size + "Yards Skip"}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-24 space-y-16 relative">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">{data.size}Yards</h2>
          <p className="text-primary/80 font-medium">#{data.id}</p>
        </div>

        <div className="text-center md:absolute md:bg-amber-400 px-12 rounded-xl -top-24">
          <div className="text-sm font-bold text-primary mb-2">£{totalPrice.toFixed(2)}</div>
          <p className="text-primary/80 text-xs">Including VAT</p>
        </div>

        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <span className="text-primary font-medium">Duration:</span>
            <span className="text-primary font-semibold">{data.hire_period_days} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-primary font-medium">Area:</span>
            <span className="text-primary font-semibold">{data.postcode}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-primary font-medium">Allowed on the road</span>
            <span className="text-primary font-semibold">{data.allowed_on_road ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Perfect for section */}
        <div className="bg-white rounded-lg p-16 border border-primary/20">
          <h3 className="text-primary font-semibold text-center mb-2">Perfect for:</h3>
          <p className="text-primary/80 text-sm text-center leading-relaxed line-clamp-2">{data.ideal_use}</p>
        </div>
      </CardContent>
    </Card>
  )
}
