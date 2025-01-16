"use client";
import { JSONContent } from "novel";
import { ContentRenderer } from "./content-renderer";
import { ProjectType } from "@/lib/types";

interface ProjectInfoProps {
  project: ProjectType;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  const parsedContent: JSONContent = JSON.parse(project.content);
  return (
    <div>
      <h2 className="font-bold text-2xl">{project?.title}</h2>
      <p className="max-w-3xl">
        <em>{project?.summary}</em>
      </p>

      <div className="prose prose-stone">
        <ContentRenderer content={parsedContent} />
      </div>
    </div>
  );
}
