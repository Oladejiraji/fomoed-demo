import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import { motion } from "motion/react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{ display: "flex" }}
    >
      <Loader2Icon role="status" aria-label="Loading" className={cn("size-4", className)} {...props} />
    </motion.div>
  )
}

export { Spinner }
