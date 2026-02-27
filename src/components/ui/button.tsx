import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98] rounded-lg backdrop-blur-xl",
  {
    variants: {
      variant: {
        default: "bg-primary/90 text-primary-foreground hover:bg-primary border border-primary/30 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 backdrop-blur-xl",
        destructive: "bg-destructive/90 text-destructive-foreground hover:bg-destructive border border-destructive/30 shadow-lg shadow-destructive/20 backdrop-blur-xl",
        outline: "border border-input bg-background hover:text-accent-foreground shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        dashboard: "bg-primary/90 text-primary-foreground hover:bg-primary border border-primary/30 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 backdrop-blur-xl",
        dark: "bg-foreground/90 text-background hover:bg-foreground border border-foreground/30 shadow-lg backdrop-blur-xl",
        accent: "bg-accent/80 text-accent-foreground hover:bg-accent/90 border border-accent/30 backdrop-blur-xl shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
