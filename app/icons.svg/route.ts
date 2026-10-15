import { buildIconSprite } from "@/shared/ui/Icon/lib/buildIconSprite"

export const dynamic = "force-static"

export function GET() {
  return new Response(buildIconSprite(), {
    headers: { "Content-Type": "image/svg+xml" },
  })
}
