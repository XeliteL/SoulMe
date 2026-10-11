import type { NextConfig } from "next"
import path from "node:path"

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "${path.join(import.meta.dirname, "src/shared/styles/helpers")}" as *;`,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
  },
}

export default nextConfig
