import "./Preloader.scss"

const Preloader = () => (
  <div className="preloader" id="preloader" role="presentation">
    <span className="preloader__bar" />
    <script src="/scripts/preloader.js" />
  </div>
)

export default Preloader
