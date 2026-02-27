import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      router.pathname
    );
  }, [router.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Ups! Pàgina no trobada</p>
        <Link href="/" className="text-accent hover:opacity-80 underline">
          Tornar a l'inici
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
