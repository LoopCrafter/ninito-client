export function BreadcrumbSkeleton() {
  return (
    <nav className="mb-8 animate-pulse">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li className="h-4 w-10 rounded bg-muted" />
        <li>
          <div className="h-4 w-4 rounded bg-muted" />
        </li>
        <li className="h-4 w-16 rounded bg-muted" />
        <li>
          <div className="h-4 w-4 rounded bg-muted" />
        </li>
        <li className="h-4 w-20 rounded bg-muted" />
        <li>
          <div className="h-4 w-4 rounded bg-muted" />
        </li>
        <li className="h-4 w-24 rounded bg-muted" />
      </ol>
    </nav>
  );
}
