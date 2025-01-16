export interface ProjectType {
  title: string;
  slug?: string;
  summary: string;
  content: string;
  createdAt?: Date;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ProjectType]?: string[];
  };
}
