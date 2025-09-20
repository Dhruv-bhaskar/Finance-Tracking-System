"use client";
import React from "react";

import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) console.error(error);
    else alert("Check your email for login link!");
  };

   useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Access token:", session.access_token); // copy this for REST client
      } else {
        console.log("No active session yet");
      }
    };

    getSession();
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default Login;
