"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type InstallPromptWindow = Window & {
  __kubeteeInstallPrompt?: BeforeInstallPromptEvent;
};

export function InstallAppButton({
  className = "",
  label = "Install app",
}: {
  className?: string;
  label?: string;
}) {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const installWindow = window as InstallPromptWindow;

    const syncPrompt = () => {
      const captured = installWindow.__kubeteeInstallPrompt;
      if (captured) setPrompt(captured);
    };

    const onInstalled = () => {
      setInstalled(true);
      setPrompt(null);
      installWindow.__kubeteeInstallPrompt = undefined;
      window.dispatchEvent(new Event("kubetee-install-used"));
    };

    const onUsed = () => {
      setPrompt(null);
    };

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    syncPrompt();
    window.addEventListener("kubetee-install-ready", syncPrompt);
    window.addEventListener("kubetee-install-used", onUsed);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("kubetee-install-ready", syncPrompt);
      window.removeEventListener("kubetee-install-used", onUsed);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!prompt || installed) return null;

  const install = async () => {
    const installWindow = window as InstallPromptWindow;

    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
    } catch {
      // The browser may have consumed the prompt already; hide the controls.
    } finally {
      setPrompt(null);
      installWindow.__kubeteeInstallPrompt = undefined;
      window.dispatchEvent(new Event("kubetee-install-used"));
    }
  };

  return (
    <button type="button" onClick={install} className={className}>
      {label}
    </button>
  );
}
