import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="box-border h-screen flex items-center justify-center">
      <button
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-xl px-5 py-2.5 text-center"
        onClick={() => router.push("/onboarding")}
      >
        Take me to Onboarding!!
      </button>
    </div>
  );
}
