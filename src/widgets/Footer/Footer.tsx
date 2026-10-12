import Link from "next/link"

import Socials from "@/shared/ui/Socials"

import { footerExtraLinks } from "./config/footerExtraLinks"
import { footerMenu } from "./config/footerMenu"

import "./Footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <nav className="footer__menu" aria-label="Дополнительная навигация">
          {footerMenu.map((section) => (
            <div className="footer__menu-column" key={section.title}>
              {section.titleHref ? (
                <Link
                  className="footer__menu-title h6"
                  href={section.titleHref}
                >
                  {section.title}
                </Link>
              ) : (
                <span className="footer__menu-title h6">{section.title}</span>
              )}
              {section.type === "social" ? (
                <Socials links={section.socialLinks} />
              ) : (
                <ul className="footer__menu-list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        className="footer__menu-link"
                        href={link.href}
                        target={link.newTab ? "_blank" : undefined}
                        rel={link.newTab ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div className="footer__extra">
          <p className="footer__copyright">
            @<time dateTime="2026">2026</time> SoulMe, все права защищены
          </p>
          <div className="footer__extra-links">
            {footerExtraLinks.map(({ label, href }) => (
              <Link className="footer__extra-link" href={href} key={label}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
