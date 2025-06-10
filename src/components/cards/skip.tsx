import { SkipType } from "@/index"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const SkipCard = ({ skip, isActive = true }: { skip: SkipType; isActive?: boolean }) => {
  return (
    <Card className={cn("overflow-hidden h-300 bg-white shadow-lg", ` ${!isActive ? 'opacity-50' : ''}`)} >
      <div className="aspect-[3/2] h-200 overflow-hidden" >
        <div className="size-30" />
      </div>
      < CardContent className="p-4 space-y-3" >
        <div className="flex justify-between items-start" >
          <div>
            <h3 className="font-bold text-lg text-gray-900" > {skip.size} </h3>
            <p className="text-sm text-gray-600" >
              {skip.size}
            </p>
          </div>
          < div className="text-right" >
            <p className="font-bold text-xl text-blue-600" > {skip.price_before_vat} </p>
            <p className="text-xs text-gray-500" > per week </p>
          </div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed" > {skip.postcode} </p>
        <div className="pt-2 border-t border-gray-100" >
          <p className="text-xs text-gray-500" > Dimensions: {skip.size} </p>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" > Book This Skip </Button>
      </CardContent>
    </Card>
  )
}