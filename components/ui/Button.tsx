import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "dark" | "light" | "outline" | "ghost" | "accent";
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  dark: "border-charcoal bg-charcoal text-porcelain hover:bg-soft-black",
  light: "border-porcelain bg-porcelain text-charcoal hover:bg-white",
  outline: "border-current bg-transparent text-current hover:bg-charcoal hover:text-porcelain",
  ghost: "border-transparent bg-transparent text-current hover:bg-charcoal/5",
  accent: "border-ember bg-ember text-white hover:bg-[#c95d24]",
};

export function Button({
  children,
  href,
  variant = "dark",
  className,
  icon,
  type = "button",
  onClick,
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <span className="button-arrow" aria-hidden="true">
        {icon ?? <ArrowUpRight size={16} strokeWidth={1.8} />}
      </span>
    </>
  );

  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-3 border px-5 py-3 text-xs font-semibold uppercase transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      {content}
    </button>
  );
}
