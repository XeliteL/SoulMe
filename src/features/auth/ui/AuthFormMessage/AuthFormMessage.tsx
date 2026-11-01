import "./AuthFormMessage.scss"

interface AuthFormMessageProps {
  message?: string
  type?: "error" | "success"
}

const AuthFormMessage = ({ message, type = "error" }: AuthFormMessageProps) => {
  return (
    <p
      className={`auth-form-message auth-form-message--${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      {message}
    </p>
  )
}

export default AuthFormMessage
