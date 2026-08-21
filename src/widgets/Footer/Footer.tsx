import classNames from "classnames"
import { footerMenu } from "@/shared/config/footerMenu"
import { footerExtraLinks } from "@/shared/config/footerExtraLinks"
import Socials from "@/shared/ui/Socials"
import "./Footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <nav className="footer__menu">
          {footerMenu.map((section) => (
            <div className="footer__menu-column" key={section.title}>
              <a
                className={classNames("footer__menu-title h6", {
                  "footer__menu-title--static": !section.titleHref,
                })}
                href={section.titleHref}
              >
                {section.title}
              </a>
              {section.type === "social" ? (
                <Socials links={section.socialLinks} />
              ) : (
                <ul className="footer__menu-list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="footer__menu-link"
                        href={link.href}
                        target={link.newTab ? "_blank" : undefined}
                        rel={link.newTab ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div className="footer__extra">
          <p className="footer__copyright">
            @<time dateTime="2026">2026</time> SoulMe, All Rights Reserved
          </p>
          <div className="footer__extra-links">
            {footerExtraLinks.map(({ label, href }) => (
              <a
                className="footer__extra-link"
                href={href}
                rel="noopener noreferrer"
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
