import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md bg-light-bg dark:bg-dark-bg", className)} {...props} />);
}

export { Skeleton }
