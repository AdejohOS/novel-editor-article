"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";
import { createProjectAction } from "@/actions/action";
import { ActionResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'Type " / " for commands or start writing...',
        },
      ],
    },
  ],
};

const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

export default function ProjectForm() {
  const [content, setContent] = useState<string>("");

  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    initialState
  );

  useEffect(() => {
    if (state?.message) {
      toast(state.message, {
        icon: state.success ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <TriangleAlert className="h-4 w-4" />
        ),
      });
    }
  }, [state]);
  return (
    <>
      <form action={formAction} className="space-y-4" autoComplete="on">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            placeholder="Project title"
            id="title"
            name="title"
            autoComplete="title"
            aria-describedby="title-error"
            required
            disabled={isPending}
            className={state.errors?.title ? "border-red-500" : ""}
          />
          {state.errors?.title && (
            <p id="title-error" className="text-sm text-red-500">
              {state.errors.title[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            placeholder="Give a brief summary"
            id="summary"
            name="summary"
            autoComplete="summary"
            aria-describedby="summary-error"
            required
            minLength={50}
            maxLength={500}
            disabled={isPending}
            className={cn(
              `resize-none`,
              state.errors?.summary && "border-red-500"
            )}
          />
          {state.errors?.summary && (
            <p id="summary-error" className="text-sm text-red-500">
              {state.errors.summary[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Description</Label>
          <div className="">
            <Editor initialValue={defaultValue} onChange={setContent} />

            <Input id="content" type="hidden" name="content" value={content} />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex items-center space-x-3"
            disabled={isPending}
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
