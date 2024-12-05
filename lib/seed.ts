import * as schema from "@/app/db/schema";
import { db } from "./db";
import to from "await-to-ts";

const sellers = [
  "fa4fb57e-b2ad-4f03-9485-2bff912af0b8",
  "fd8140cc-248d-4c03-bc45-6d5480ffb437",
];

const seedProducts = [
  {
    sellerId: sellers[0],
    title: "Premium UI Kit",
    description: "A high-quality UI kit for modern web apps.",
    price: 49,
    category: "design-assets",
    fileUrl: "https://example.com/ui-kit.jpg",
  },
  {
    sellerId: sellers[1],
    title: "React Course for Beginners",
    description: "Learn React from scratch with hands-on projects.",
    price: 99,
    category: "courses-tutorials",
    fileUrl: "https://example.com/react-course.jpg",
  },
  {
    sellerId: sellers[0],
    title: "JavaScript E-book",
    description: "Comprehensive guide to modern JavaScript.",
    price: 19,
    category: "ebook-guides",
    fileUrl: "https://example.com/js-ebook.jpg",
  },
  {
    sellerId: sellers[1],
    title: "VSCode Plugin Pack",
    description: "A collection of essential plugins for VSCode.",
    price: 25,
    category: "software-plugins",
    fileUrl: "https://example.com/plugin-pack.jpg",
  },
];

const main = async () => {
  for (const product of seedProducts) {
    const [err] = await to(db.insert(schema.products).values(product));

    if (err) {
      console.error(`Failed to insert product: ${product.title}`, err);
    } else {
      console.log(`Inserted product: ${product.title}`);
    }
  }
};

main()
  .then(() => console.log("Seeding complete!"))
  .catch((err) => console.error("Seeding failed:", err));
