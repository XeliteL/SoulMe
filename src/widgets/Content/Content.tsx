import { ReactNode } from "react"

import "./Content.scss"

interface ContentProps {
  children: ReactNode
}

const Content = ({ children }: ContentProps) => {
  return <main className="content">{children}</main>
}

export default Content
