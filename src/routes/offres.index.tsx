import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { JobCardVisual } from "@/components/JobCardVisual";
import { LogoMark } from "@/components/LogoMark";
import { jobs, type Job } from "@/lib/jobs";
import { openCandidature } from "@/lib/tally";

export const Route = createFileRoute("/offres/")({
  head: () => ({
    meta: [
      { title: "Telajob — Postes disponibles" },
      {
        name: "description",
        content: "Parcours les postes disponibles et candidate en une minute.",
      },
    ],
  }),
  component: OffresPage,
});

type ExitDirection = "left" | "right" | "up";
const SWIPE_THRESHOLD = 110;
const TAP_SLOP = 14;

function OffresPage() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [exiting, setExiting] = useState<ExitDirection | null>(null);
  const [open, setOpen] = useState<Job | null>(null);
  const dragRef = useRef({ x: 0, y: 0, startX: 0, startY: 0, active: false });

  const current = jobs[index];
  const upcoming = jobs[index + 1];
  const finished = index >= jobs.length;

  function commit(direction: ExitDirection) {
    if (!current || exiting) return;
    setExiting(direction);
    window.setTimeout(() => {
      setExiting(null);
      setDrag({ x: 0, y: 0 });
      dragRef.current = { x: 0, y: 0, startX: 0, startY: 0, active: false };
      setIndex((i) => i + 1);
    }, 240);
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (exiting) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: 0, y: 0, startX: e.clientX, startY: e.clientY, active: true };
    setDrag({ x: 0, y: 0 });
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragRef.current.active) return;
    const x = e.clientX - dragRef.current.startX;
    const y = e.clientY - dragRef.current.startY;
    dragRef.current.x = x;
    dragRef.current.y = y;
    setDrag({ x, y });
  }

  function handlePointerUp() {
    if (!dragRef.current.active) return;
    const { x, y } = dragRef.current;
    dragRef.current.active = false;
    if (Math.abs(x) > SWIPE_THRESHOLD) {
      commit(x > 0 ? "right" : "left");
    } else if (Math.abs(x) < TAP_SLOP && Math.abs(y) < TAP_SLOP && current) {
      setDrag({ x: 0, y: 0 });
      setOpen(current);
    } else {
      setDrag({ x: 0, y: 0 });
    }
  }

  function handlePointerCancel() {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDrag({ x: 0, y: 0 });
  }

  const rotation = drag.x / 18;

  const exitStyle: { transform: string; opacity?: number } | undefined =
    exiting === "left"
      ? { transform: "translate(-560px, -30px) rotate(-20deg)" }
      : exiting === "right"
        ? { transform: "translate(560px, -30px) rotate(20deg)" }
        : exiting === "up"
          ? { transform: "translate(0, -90px) scale(0.92)", opacity: 0 }
          : undefined;

  return (
    <div className="telajob swipe-page">
      <div className="bg-glow" />
      <div className="bg-grain" />
      <nav>
        <Link to="/" className="logo" aria-label="Accueil Telajob">
          <LogoMark />
          Telajob
        </Link>
      </nav>

      <div className={`swipe-container${finished ? " is-result" : ""}`}>
        {!finished ? (
          <>
            <div className="swipe-head">
              <h1 className="swipe-title">
                <span className="swipe-title-line">Parcours les postes</span>
                disponibles.
              </h1>
              <div className="swipe-progress" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={jobs.length}>
                {jobs.map((job, i) => (
                  <span
                    key={job.slug}
                    className={`swipe-dot${i < index ? " is-done" : ""}${i === index ? " is-active" : ""}`}
                  />
                ))}
              </div>

              <p className="swipe-caption">Glisse, tape la carte, ou « Suivant ».</p>
            </div>

            <div className="swipe-body">
              <div className={`swipe-stack${upcoming ? " has-behind" : ""}`}>
                {upcoming ? (
                  <article className="swipe-card is-behind" aria-hidden="true">
                    <CardContent job={upcoming} />
                  </article>
                ) : null}

                {current ? (
                  <article
                    className={`swipe-card${exiting ? ` is-exiting` : ""}`}
                    style={
                      exitStyle ?? {
                        transform: `translate(${drag.x}px, ${drag.y * 0.3}px) rotate(${rotation}deg)`,
                      }
                    }
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                  >
                    <CardContent job={current} />
                  </article>
                ) : null}
              </div>

              <button type="button" className="cta swipe-next" onClick={() => commit("up")}>
                Suivant
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h13m0 0-5-5m5 5-5 5" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <ResultScreen />
        )}
      </div>
      {open ? <JobSheet job={open} onClose={() => setOpen(null)} quickApply /> : null}
    </div>
  );
}

function CardContent({ job }: { job: Job }) {
  return (
    <>
      <JobCardVisual kind={job.visual} />
      <div className="swipe-card-body">
        {job.tag ? (
          <span className={`swipe-tag${job.tag.tone === "accent" ? " is-accent" : ""}`}>
            {job.tag.label}
          </span>
        ) : null}
        <h2>{job.title}</h2>
        <p className="swipe-short">{job.short}</p>
        <ul className="swipe-facts">
          {job.highlights.map((line) => (
            <li key={line}>
              <span className="sq" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ResultScreen() {
  const [open, setOpen] = useState<Job | null>(null);

  return (
    <div className="result-screen animate-reveal">
      <header className="result-hero">
        <h1>
          Voici les postes
          <span className="result-title-break">
            disponibles
            <span className="accent-dot">.</span>
          </span>
        </h1>
        <p className="result-sub">
          {jobs.length} postes ouverts cette semaine — tu peux candidater
          directement.
        </p>
        <div className="result-meta meta">
          <span className="live" />
          Gratuit
          <span className="sep" />
          sans CV
        </div>
      </header>

      <div className="result-list">
        <div className="result-panel-head">
          <span className="result-panel-sq" />
          Postes ouverts
          <span className="result-panel-live">
            <span className="live" />
            en cours
          </span>
        </div>
        {jobs.map((job, i) => (
          <article key={job.slug} className="result-card">
            <span className="result-num">{String(i + 1).padStart(2, "0")}</span>
            {job.tag ? (
              <span className={`swipe-tag${job.tag.tone === "accent" ? " is-accent" : ""}`}>
                {job.tag.label}
              </span>
            ) : null}
            <h2>{job.title}</h2>
            <p>{job.short}</p>
            <div className="result-actions">
              <button type="button" className="result-more" onClick={() => setOpen(job)}>
                En savoir plus
              </button>
              <button type="button" className="cta result-cta" onClick={() => void openCandidature(job)}>
                Candidater
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h13m0 0-5-5m5 5-5 5" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
      {open ? <JobSheet job={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}

function JobSheet({
  job,
  onClose,
  quickApply = false,
}: {
  job: Job;
  onClose: () => void;
  quickApply?: boolean;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function apply() {
    onClose();
    void openCandidature(job);
  }

  return createPortal(
    <div className="telajob job-sheet" role="dialog" aria-modal="true" aria-labelledby="job-sheet-title">
      <button type="button" className="job-sheet-backdrop" aria-label="Fermer" onClick={onClose} />
      <div className="job-sheet-panel">
        <div className="job-sheet-glow" />
        <header className="job-sheet-head">
          <button type="button" className="logo" onClick={onClose} aria-label="Fermer et revenir aux postes">
            <LogoMark />
            Telajob
          </button>
          <button type="button" className="job-sheet-close" onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>
        <div className="job-sheet-inner">
        {job.tag ? (
          <span className={`swipe-tag${job.tag.tone === "accent" ? " is-accent" : ""}`}>
            {job.tag.label}
          </span>
        ) : null}
        <h2 id="job-sheet-title">{job.title}</h2>
        {quickApply ? (
          <button type="button" className="cta job-sheet-cta job-sheet-cta-top" onClick={apply}>
            Postuler à ce poste
          </button>
        ) : null}
        {job.sections ? null : <p className="job-sheet-intro">{job.intro}</p>}
        <div className="job-sheet-body">
          {job.sections ? (
            job.sections.map((section) => (
              <section key={section.title} className="job-sheet-section">
                <h3>{section.title}</h3>
                {section.type === "text"
                  ? section.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)
                  : null}
                {section.type === "list" ? (
                  <ul className="job-sheet-expect">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.type === "steps" ? (
                  <ol className="job-sheet-flow">
                    {section.items.map((item, i) => (
                      <li key={item}>
                        <span className="job-sheet-flow-num">{String(i + 1).padStart(2, "0")}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </section>
            ))
          ) : (
            <>
              {job.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <h3>Au quotidien</h3>
              <ol>
                {job.missions.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
              <h3>Ce qu'on cherche</h3>
              <p>{job.profile}</p>
            </>
          )}
        </div>
        <button type="button" className="cta job-sheet-cta" onClick={apply}>
          Candidater
        </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
