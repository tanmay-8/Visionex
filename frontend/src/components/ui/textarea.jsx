import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[100px] w-full outline-none rounded-md bg-transparent px-3 py-2 text-sm laceholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 focus:border resize-none",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
