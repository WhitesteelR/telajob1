import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogoMark } from "@/components/LogoMark";
import { useIciTransition } from "@/components/wow/IciTransition";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Telajob — Un téléphone suffit pour trouver un job" },
      {
        name: "description",
        content:
          "Telajob, c’est des jobs sans diplôme, sans expérience, sans CV. Vous postulez en une minute — on vous rappelle, et c’est parti.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const playIci = useIciTransition();

  useEffect(() => {
    const steps = Array.prototype.slice.call(
      document.querySelectorAll(".telajob .step"),
    ) as HTMLElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || steps.length === 0) return;
    let current = 1;
    function render() {
      steps.forEach(function (el, i) {
        el.classList.remove("done", "active", "upcoming");
        if (i < current) el.classList.add("done");
        else if (i === current) el.classList.add("active");
        else el.classList.add("upcoming");
      });
    }
    const id = window.setInterval(function () {
      current = (current + 1) % steps.length;
      render();
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  function goOffres(e: { preventDefault: () => void }) {
    e.preventDefault();
    playIci();
  }

  return (
    <div className="telajob landing">
      <div className="bg-glow" />
      <div className="bg-grain" />
      <nav>
        <Link to="/" className="logo" aria-label="Accueil Telajob">
          <LogoMark />
          Telajob
        </Link>
        <a className="nav-cta" href="/offres" onClick={goOffres}>
          Postes
        </a>
      </nav>
      <div className="container">
        <div className="hero">
          <div className="hero-copy">
            <h1>
              Un téléphone{" "}
              <br className="h1-m" />
              suffit{" "}
              <br className="h1-d" />
              pour trouver un job
              <span className="accent-dot">.</span>
            </h1>
            <p className="sub">
              Telajob, c’est des jobs sans diplôme, sans expérience, sans CV.
              Vous postulez en une minute — on vous rappelle, et c’est parti.
            </p>
            <div className="cta-row">
              <a className="cta" href="/offres" onClick={goOffres}>
                Voir les postes disponibles
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h13m0 0-5-5m5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <div className="meta">
                <span className="live" />
                2 postes ouverts
                <span className="sep" />
                Gratuit · sans CV
              </div>
            </div>
            <a className="why-link" href="#pourquoi">
              En savoir plus
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
          </div>

          <div className="phone-wrap">
            <div className="phone">
              <div className="phone-screen">
                <div className="phone-status">
                  <div className="time" />
                  <div className="icons">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="phone-app-header">
                  <div className="sq" />
                  <div className="ln" />
                </div>

                <div className="steps">
                  <div className="step done" data-step="0">
                    <div className="step-line" />
                    <div className="step-icon">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="step-body">
                      <div className="step-title">Vous choisissez votre job.</div>
                      <div className="step-sub">Créateur UGC</div>
                      <span className="pulse-tag">
                        <span className="dot" />
                        en cours
                      </span>
                    </div>
                  </div>
                  <div className="step active" data-step="1">
                    <div className="step-line" />
                    <div className="step-icon">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="step-body">
                      <div className="step-title">On vous appelle.</div>
                      <div className="step-sub">Réponse sous 24 h</div>
                      <span className="pulse-tag">
                        <span className="dot" />
                        en cours
                      </span>
                    </div>
                  </div>
                  <div className="step upcoming" data-step="2">
                    <div className="step-icon">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                    </div>
                    <div className="step-body">
                      <div className="step-title">Vous démarrez le travail.</div>
                      <div className="step-sub">Dès validation</div>
                      <span className="pulse-tag">
                        <span className="dot" />
                        en cours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="why" id="pourquoi">
          <div className="divider" />
          <div className="cards">
            <div className="card">
              <h3>Aucune expérience exigée</h3>
              <p>Ce qui compte, c’est la motivation et la régularité.</p>
            </div>
            <div className="card">
              <h3>Candidature gratuite</h3>
              <p>Voir les postes et postuler ne coûte rien. Aucun paiement n’est demandé.</p>
            </div>
            <div className="card">
              <h3>Candidature simplifiée</h3>
              <p>Pas de CV. Vous répondez à quelques questions, c’est envoyé.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
