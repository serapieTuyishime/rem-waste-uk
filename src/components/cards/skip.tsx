import { SkipType } from "@/index"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const SkipCard = ({ skip, isActive = true }: { skip: SkipType; isActive?: boolean }) => {
  return (
    <Card className={cn("overflow-hidden min-h-300 border-t-0 ", ` ${!isActive ? 'opacity-50' : ''}`)} >
      <div className="aspect-[3/2] h-300 overflow-hidden" >
        <Image
          src={skip.url || "/skip-images/4 Yarder Skip.jpg"}
          alt={skip.size.toString()}
          width={200}
          height={200}
          className="object-cover h-full w-full"
        />
      </div>
      <CardContent className="p-16 space-y-12" >
        <div className="flex justify-between items-start" >
          <div>
            <h3 className="font-bold text-lg text-gray-900" > {skip.size} </h3>
            <p className="text-sm text-gray-600" >
              {skip.size}
            </p>
          </div>
          < div className="text-right" >
            <p className="font-bold text-xl text-primary" > {skip.price_before_vat} </p>
            <p className="text-xs text-gray-500" > per week </p>
          </div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed" > {skip.postcode} </p>
        <div className="pt-8 border-t border-gray-100" >
          <p className="text-xs text-gray-500" > Dimensions: {skip.size} </p>
        </div>
        <Button className="w-full h-50 bg-primary hover:bg-primary/80 text-white" > Book This Skip </Button>
      </CardContent>
    </Card>
  )
}