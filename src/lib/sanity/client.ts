import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

//Client safe config
export const config = {
  projectId: "ky9ymfew",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
};

export const client = createClient(config);

// Admin level client, used for backed
const adminConfig = {
  ...config,
  token: process.env.SANITY_API_TOKEN,
};
export const adminClient = createClient(adminConfig);

// Image URL builder
const builder = imageUrlBuilder(config);
export const urlFor = (source: string) => builder.image(source);
