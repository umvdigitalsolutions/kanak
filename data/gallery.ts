import { assetPath } from "@/lib/assets";

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  src: string;
  order?: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const manufacturingGalleryItems: GalleryItem[] = [
  {
    id: "flow-material",
    src: assetPath("/images/generated/flow/01-material.jpg"),
    title: "Material Preparation",
    description: "Plastic resin and biodegradable material direction visualized before forming.",
    category: "Manufacturing",
    order: 10,
    isPublished: true,
  },
  {
    id: "flow-forming",
    src: assetPath("/images/generated/flow/02-forming.jpg"),
    title: "Container Forming",
    description: "Rigid container shapes formed for food-service handling and consistent presentation.",
    category: "Manufacturing",
    order: 20,
    isPublished: true,
  },
  {
    id: "flow-trimming",
    src: assetPath("/images/generated/flow/03-trimming.jpg"),
    title: "Rim Trimming",
    description: "Clean rim geometry supports practical lid alignment and stacked movement.",
    category: "Manufacturing",
    order: 30,
    isPublished: true,
  },
  {
    id: "flow-lid-fit",
    src: assetPath("/images/generated/flow/04-lid-fit.jpg"),
    title: "Lid Fit Check",
    description: "Matching lid direction is checked around the rim before packing decisions.",
    category: "Manufacturing",
    order: 40,
    isPublished: true,
  },
  {
    id: "flow-quality",
    src: assetPath("/images/generated/flow/05-quality.jpg"),
    title: "Quality Review",
    description: "Shape, finish and batch presentation are reviewed before product movement.",
    category: "Manufacturing",
    order: 50,
    isPublished: true,
  },
  {
    id: "flow-packing",
    src: assetPath("/images/generated/flow/06-packing.jpg"),
    title: "Packing Ready",
    description: "Nested stacks are prepared for clean dispatch and food-service supply.",
    category: "Manufacturing",
    order: 60,
    isPublished: true,
  },
];
