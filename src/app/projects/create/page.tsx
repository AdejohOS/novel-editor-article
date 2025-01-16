import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import ProjectForm from "./_components/project-form";

const CreateProject = () => {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create a project</CardTitle>
          <CardDescription>
            Fill out the fields to create a project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateProject;
