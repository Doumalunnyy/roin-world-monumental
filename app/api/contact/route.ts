import { handleContact } from "@/lib/contact";

export const runtime = "nodejs";
// POST runs on a Node host. The Pages export contains only public documents.

export async function POST(request: Request) {
  return handleContact(request);
}
