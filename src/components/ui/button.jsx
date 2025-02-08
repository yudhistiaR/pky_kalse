"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = React.useState([]);
    const Comp = asChild ? Slot : motion.button;

    const rippleColors = {
      default: "rgba(255, 255, 255, 0.5)",
      destructive: "rgba(255, 255, 255, 0.5)",
      outline: "rgba(0, 0, 0, 0.1)",
      secondary: "rgba(0, 255, 0, 0.3)",
      ghost: "rgba(0, 0, 0, 0.1)",
      link: "rgba(0, 0, 255, 0.3)",
    };

    const addRipple = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple = {
        id: Date.now(),
        x,
        y,
        size,
        color: rippleColors[variant] || "rgba(255, 255, 255, 0.5)",
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id),
        );
      }, 300);
    };

    return (
      <Comp
        className={cn(
          "relative overflow-hidden",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.04 }}
        onClick={addRipple}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full animate-ripple"
              style={{
                width: ripple.size,
                height: ripple.size,
                top: ripple.y,
                left: ripple.x,
                backgroundColor: ripple.color,
              }}
            />
          ))}
        </div>
        <span className="relative z-10">{props.children}</span>
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
