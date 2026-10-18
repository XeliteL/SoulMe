import PlayEmblem from "@/shared/ui/PlayEmblem"

import "./AuthBanner.scss"

const AuthBanner = () => {
  return (
    <div className="auth-banner">
      <div className="auth-banner__play">
        <PlayEmblem />
      </div>
    </div>
  )
}

export default AuthBanner
