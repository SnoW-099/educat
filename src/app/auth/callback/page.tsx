"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_REDIRECT = "/studentdashboard";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Procesando autenticación…");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const url = new URL(window.location.href);
      const errorDescription =
        url.searchParams.get("error_description") || url.searchParams.get("error");

      if (errorDescription) {
        setError(decodeURIComponent(errorDescription));
        setStatus("No se pudo completar la autenticación.");
        return;
      }

      try {
        let handled = false;

        if (url.searchParams.get("code")) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );
          if (exchangeError) throw exchangeError;
          handled = true;
        }

        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (sessionError) throw sessionError;
          handled = true;
        }

        if (!handled) {
          await supabase.auth.getSession();
        }

        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.replace(DEFAULT_REDIRECT);
        } else {
          router.replace("/auth");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError("No se pudo completar la autenticación. Vuelve a intentarlo.");
        setStatus("Error de autenticación.");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-semibold">Autenticación</h1>
        <p className="text-muted-foreground">{status}</p>
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Te redirigiremos automáticamente en unos segundos.
          </p>
        )}
      </div>
    </div>
  );
}
