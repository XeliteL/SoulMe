import Script from "next/script"

import "./Preloader.scss"

const Preloader = () => (
  <div className="preloader" id="preloader" role="presentation">
    <span className="preloader__bar" />
    <Script src="/scripts/preloader.js" />
  </div>
)

export default Preloader
