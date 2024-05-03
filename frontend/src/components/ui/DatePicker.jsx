"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {
  const [date, setDate] = React.useState(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
        variant="outlined "
          className={cn(
            "min-w-72  lg:min-w-96 justify-start text-left font-normal text-muted-foreground p-7 hover:none bg-light-bg-sec dark:bg-dark-bg-sec border-none text-gray-800 dark:text-gray-300"
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-light-bg-sec dark:bg-dark-bg-sec">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className={"bg-light-bg-sec dark:bg-dark-bg-sec"}
        />
      </PopoverContent>
    </Popover>
  )
}
