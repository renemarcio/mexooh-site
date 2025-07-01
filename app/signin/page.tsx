'use client';

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov || {});
    });
  }, []);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/", // ou outro caminho após login
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "2rem" }}>
      <h1>Entrar</h1>

      {providers?.credentials && (
        <form onSubmit={handleCredentialsLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      )}

      {Object.values(providers)
        .filter((p: any) => p.id !== "credentials")
        .map((provider: any) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Entrar com {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}
