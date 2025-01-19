"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

import { ProjectType } from "@/lib/types";

interface ProjectInfoProps {
  project: ProjectType;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [project.content]);

  return (
    <div>
      <h2 className="font-bold text-2xl">{project?.title}</h2>
      <p className="max-w-3xl">
        <em>{project?.summary}</em>
      </p>

      <div className="prose prose-stone">
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </div>
    </div>
  );
}
