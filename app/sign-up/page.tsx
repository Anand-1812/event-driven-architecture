'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"

const Singup = () => {
  const router = useRouter()

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const { isLoaded, signUp, setActive } = useSignUp()

  if (!isLoaded) return null;

  const submit = async (e: React.FormEvent) => {
    try {
      await signUp.create({
        emailAddress: userData.email,
        password: userData.password
      })

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code"
      })
      setPendingVerification(true)
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
    }
  }

  const onPressVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignup =  await signUp.attemptEmailAddressVerification({code})

      if (completeSignup.status !== 'complete') {
        return;
      }

      if (completeSignup.status === 'complete') {
        await setActive({session: completeSignup.createdSessionId})
        router.push("/dashboard")
      }

    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div>

    </div>
  )
}

export default Singup
