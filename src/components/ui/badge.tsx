import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-primary/90 text-primary-foreground backdrop-blur-xl shadow-sm shadow-primary/20",
        secondary:
          "border-white/20 bg-white/10 text-foreground backdrop-blur-xl",
        destructive:
          "border-destructive/30 bg-destructive/90 text-destructive-foreground backdrop-blur-xl shadow-sm shadow-destructive/20",
        outline: "text-foreground border-white/20 bg-white/5 backdrop-blur-sm",
        success:
          "border-success/30 bg-success/90 text-success-foreground backdrop-blur-xl shadow-sm",
        warning:
          "border-warning/30 bg-warning/90 text-warning-foreground backdrop-blur-xl shadow-sm",
        accent:
          "border-accent/30 bg-accent/80 text-accent-foreground backdrop-blur-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
