import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { ProjectType } from "@/lib/types";
import { Clock } from "lucide-react";
import Link from "next/link";

interface ProjectProps {
  project: ProjectType;
}

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <h2 className="font-bold text-3xl tracking-wide border-b-2 w-max">
          All Projects
        </h2>
        {!projects.length && <p>No Project available!</p>}
        <div className="grid grid-cols-3 gap-5 ">
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}

function Project({ project }: ProjectProps) {
  return (
    <Card className="p-4 space-y-4 flex flex-col">
      <h3 className="text-2xl font-bold">{project.title}</h3>
      <p className="text-xs flex items-center gap-2 text-muted-foreground">
        <Clock className="size-3" />
        {project.createdAt?.toLocaleDateString()}
      </p>
      <Separator className="my-3" />
      <p className="flex-grow">{project.summary.slice(0, 200)}...</p>
      <div>
        <Link href={`/projects/${project.slug}`} passHref>
          <Button className="button" variant="secondary">
            Read More
          </Button>
        </Link>
      </div>
    </Card>
  );
}
