import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";
import ProjectInfo from "./_components/project-info";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const project = await prisma.project.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!project) {
    return notFound;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4 ">
      <div>
        <Link href="/">
          <Button className="flex items-center space-x-2" variant="ghost">
            <ArrowLeft className="size-4" />
            Back to projects
          </Button>
        </Link>
      </div>
      <ProjectInfo project={project} />
    </section>
  );
};

export default Page;
