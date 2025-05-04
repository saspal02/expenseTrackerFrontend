import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Ensuring navigation happens after the component is mounted
    const timeout = setTimeout(() => {
      router.push("/(auth)/login");
    }, 0);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [router]);

  return null; // No UI to render, just navigate
}
