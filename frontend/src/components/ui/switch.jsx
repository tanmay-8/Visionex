"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/redux/hooks";

const Switch = React.forwardRef(({ className, ...props }, ref) => 
{
  const theme = useAppSelector((state) => state.theme.theme);
  return(<SwitchPrimitives.Root

        checked={theme === "dark"}
        className={cn(
            "peer inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-light-bg-sec data-[state=unchecked]:bg-dark-bg-sec",
            className
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-gray-500 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-9 data-[state=unchecked]:translate-x-1 "
            )}
        />
    </SwitchPrimitives.Root>)
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
