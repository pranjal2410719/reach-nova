import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href="/"
            className="font-medium underline underline-offset-4"
          >
            ReachNova
          </Link>
          . Connecting citizens to civic opportunities.
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:underline">Terms</Link>
          <Link href="#" className="hover:underline">Privacy</Link>
          <Link href="#" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
