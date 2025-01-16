import Link from "next/link";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-100 drop-shadow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" passHref>
          <h1 className="font-bold text-2xl">NovelEditor</h1>
        </Link>

        <Link href="/projects/create" passHref>
          <Button className="space-x-3">
            <Plus className="size-4" />
            Create Project
          </Button>
        </Link>
      </div>
    </nav>
  );
}
