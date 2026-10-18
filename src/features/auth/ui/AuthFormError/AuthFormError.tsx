import "./AuthFormError.scss"

interface AuthFormErrorProps {
  message?: string
}

const AuthFormError = ({ message }: AuthFormErrorProps) => {
  return (
    <p className="auth-form-error" role="alert">
      {message}
    </p>
  )
}

export default AuthFormError
