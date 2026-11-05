import { RequestResetForm, ResetPasswordForm } from "@/features/auth"

const ResetPasswordPage = async ({
  searchParams,
}: PageProps<"/reset-password">) => {
  const { token } = await searchParams

  return typeof token === "string" && token ? (
    <>
      <h1 className="visually-hidden">Новый пароль</h1>
      <ResetPasswordForm token={token} />
    </>
  ) : (
    <>
      <h1 className="visually-hidden">Восстановление пароля</h1>
      <RequestResetForm />
    </>
  )
}

export default ResetPasswordPage
