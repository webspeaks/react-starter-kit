import { cn } from "@/lib/utils";

export function Page({ className, ...props }) {
  return (
    <div
      data-slot="page"
      className={cn("p-6 space-y-8", className)}
      {...props}
    />
  );
}

export function PageHeader({ className, withBorder = false, ...props }) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        withBorder && "border-b border-border pb-6",
        className,
      )}
      {...props}
    />
  );
}

export function PageTitle({ className, ...props }) {
  return (
    <h1
      data-slot="page-title"
      className={cn(
        "text-2xl font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function PageDescription({ className, ...props }) {
  return (
    <p
      data-slot="page-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function PageActions({ className, ...props }) {
  return (
    <div
      data-slot="page-actions"
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3",
        className,
      )}
      {...props}
    />
  );
}

export function PageContent({ className, ...props }) {
  return (
    <div
      data-slot="page-content"
      className={cn("space-y-6", className)}
      {...props}
    />
  );
}
