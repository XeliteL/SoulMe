import { ReactNode } from "react"
import "./Content.scss"

interface Props {
  children: ReactNode
}

const Content = ({ children }: Props) => {
  return <main className="content">{children}</main>
}

export default Content
