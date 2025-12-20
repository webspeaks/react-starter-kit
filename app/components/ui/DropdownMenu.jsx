import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

const DropdownMenuContext = React.createContext({
  open: false,
  setOpen: () => {},
});

const DropdownMenu = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative" ref={dropdownRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const { open, setOpen } = React.useContext(DropdownMenuContext);
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn("cursor-pointer inline-flex", className)}
      onClick={(e) => {
        setOpen(!open);
        props.onClick?.(e);
      }}
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </Comp>
  );
};

const DropdownMenuContent = ({
  children,
  className,
  align = "end",
  forceMount,
  ...props
}) => {
  const { open } = React.useContext(DropdownMenuContext);

  if (!open && !forceMount) return null;

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[12rem] overflow-hidden rounded-xl border border-border/70 bg-card text-card-foreground shadow-lg ring-1 ring-black/5 backdrop-blur",
        align === "end" ? "right-0" : "left-0",
        "mt-2 p-1.5",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const DropdownMenuItem = ({
  children,
  className,
  onClick,
  asChild = false,
  ...props
}) => {
  const { setOpen } = React.useContext(DropdownMenuContext);
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </Comp>
  );
};

const DropdownMenuLabel = ({ children, className }) => {
  return (
    <div
      className={cn(
        "px-3 py-2 text-sm font-semibold text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
};

const DropdownMenuSeparator = ({ className }) => {
  return <div className={cn("-mx-1.5 my-1 h-px bg-border/70", className)} />;
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
