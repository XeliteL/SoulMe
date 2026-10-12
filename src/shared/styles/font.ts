import localFont from "next/font/local"

export const manrope = localFont({
  src: [
    { path: "../assets/fonts/Manrope-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/Manrope-Medium.woff2", weight: "500" },
    { path: "../assets/fonts/Manrope-SemiBold.woff2", weight: "600" },
    { path: "../assets/fonts/Manrope-Bold.woff2", weight: "700" },
  ],
  variable: "--font-manrope",
  display: "swap",
})
