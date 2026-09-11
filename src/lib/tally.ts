export const TALLY_FORM_ID = "LZrj9l";

const TALLY_SCRIPT = "https://tally.so/widgets/embed.js";

type TallyPopupOptions = {
  layout?: "default" | "modal";
  width?: number;
  overlay?: boolean;
  hideTitle?: boolean;
  autoClose?: number;
  hiddenFields?: Record<string, string>;
};

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: TallyPopupOptions) => void;
      closePopup: (formId: string) => void;
    };
  }
}

let loading: Promise<void> | null = null;

function loadTally(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Tally) return Promise.resolve();
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const done = () => {
      if (window.Tally) resolve();
      else reject(new Error("Tally indisponible"));
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TALLY_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener("load", done, { once: true });
      existing.addEventListener("error", () => reject(new Error("Tally script")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = TALLY_SCRIPT;
    script.async = true;
    script.onload = done;
    script.onerror = () => reject(new Error("Tally script"));
    document.body.appendChild(script);
  });

  return loading;
}

export function candidatureUrl(job: { title: string; slug: string }) {
  const url = new URL(`https://tally.so/r/${TALLY_FORM_ID}`);
  url.searchParams.set("poste", job.title);
  url.searchParams.set("slug", job.slug);
  return url.toString();
}

export async function openCandidature(job: { title: string; slug: string }) {
  try {
    await loadTally();
    window.Tally?.openPopup(TALLY_FORM_ID, {
      layout: "modal",
      width: 440,
      overlay: true,
      autoClose: 2800,
      hiddenFields: {
        poste: job.title,
        slug: job.slug,
      },
    });
  } catch {
    window.open(candidatureUrl(job), "_blank", "noopener,noreferrer");
  }
}
