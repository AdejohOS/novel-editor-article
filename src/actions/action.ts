"use server";
import { prisma } from "@/lib/prisma";
import { ProjectSchema } from "@/lib/schema";
import { ActionResponse, ProjectType } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createProjectAction(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData: ProjectType = {
      title: formData.get("title") as string,
      summary: formData.get("summary") as string,
      content: formData.get("content") as string,
    };

    const validatedData = ProjectSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid form fields",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const { title, summary, content } = validatedData.data;
    const slug = createSlug(title);
    await prisma.project.create({
      data: {
        title,
        slug,
        summary,
        content,
      },
    });

    return {
      success: true,
      message: "Project created successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  } finally {
    revalidatePath("/");
    redirect("/");
  }
}
