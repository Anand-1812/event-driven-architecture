'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"

const Signup = () => {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  if (!isLoaded) return null

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setLoading(true)

    try {
      await signUp.create({
        emailAddress: userData.email,
        password: userData.password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      })

      setPendingVerification(true)
    } catch (error: any) {
      const msg =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        "Something went wrong. Try again."

      setErrorMsg(msg)
      console.log(JSON.stringify(error, null, 2))
    } finally {
      setLoading(false)
    }
  }

  const onPressVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setLoading(true)

    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignup.status !== "complete") {
        setErrorMsg("Verification not complete. Please try again.")
        return
      }

      await setActive({ session: completeSignup.createdSessionId })
      router.push("/dashboard")
    } catch (error: any) {
      const msg =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        "Invalid code. Try again."

      setErrorMsg(msg)
      console.log(JSON.stringify(error, null, 2))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center
      px-4 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800
        bg-neutral-900/70 backdrop-blur p-6 shadow-xl">

        <h1 className="text-3xl font-semibold text-white text-center">
          {pendingVerification ? "Verify Email" : "Create account"}
        </h1>
        <p className="text-center text-sm text-neutral-400 mt-2">
          {pendingVerification
            ? "Enter the 6-digit code sent to your email."
            : "Sign up to continue to your dashboard."}
        </p>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errorMsg}
          </div>
        )}

        {!pendingVerification ? (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-sky-500/60"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Password</label>
              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Minimum 8 characters"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-sky-500/60"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            <p className="text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-sky-400 hover:text-sky-300"
              >
                Sign in
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={onPressVerify} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Verification code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="w-full tracking-[0.35em] text-center rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-emerald-500/60"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <button
              type="button"
              onClick={() => {
                setPendingVerification(false)
                setCode("")
              }}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 font-semibold text-neutral-200 hover:bg-neutral-900"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Signup

