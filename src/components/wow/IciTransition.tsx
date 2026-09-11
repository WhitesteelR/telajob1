import { createPortal } from "react-dom";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  onNavigate: () => void;
  onDone: () => void;
};

const LINES = [
  "Pas besoin de CV.",
  "Pas besoin de diplôme ou d'expérience.",
  "Postule en une minute.",
];

const IciCtx = createContext<() => void>(() => {});

export function useIciTransition() {
  return useContext(IciCtx);
}

export function IciGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const play = useCallback(() => setActive(true), []);

  return (
    <IciCtx.Provider value={play}>
      {children}
      {active ? (
        <IciTransition
          onNavigate={() => {
            void navigate({ to: "/offres" });
          }}
          onDone={() => setActive(false)}
        />
      ) : null}
    </IciCtx.Provider>
  );
}

export function IciTransition({ onNavigate, onDone }: Props) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"off" | "in" | "out">("off");
  const [bloom, setBloom] = useState(false);
  const onNavigateRef = useRef(onNavigate);
  const onDoneRef = useRef(onDone);
  onNavigateRef.current = onNavigate;
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onNavigateRef.current();
      onDoneRef.current();
      return;
    }

    document.body.style.overflow = "hidden";
    const timers = [
      window.setTimeout(() => setMode("in"), 50),
      window.setTimeout(() => setMode("out"), 1300),
      window.setTimeout(() => {
        setIndex(1);
        setMode("off");
      }, 1720),
      window.setTimeout(() => setMode("in"), 1740),
      window.setTimeout(() => setMode("out"), 2990),
      window.setTimeout(() => {
        setIndex(2);
        setMode("off");
      }, 3410),
      window.setTimeout(() => setMode("in"), 3430),
      window.setTimeout(() => setMode("out"), 4680),
      window.setTimeout(() => {
        setBloom(true);
        onNavigateRef.current();
      }, 5100),
      window.setTimeout(() => {
        onDoneRef.current();
      }, 5900),
    ];
    return () => {
      document.body.style.overflow = "";
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return createPortal(
    <div className="wow-stage" role="presentation">
      <div className="wow-slot">
        <p className={`wow-line${mode === "in" ? " is-in" : ""}${mode === "out" ? " is-out" : ""}`}>
          {LINES[index]}
        </p>
      </div>
      <div className={`wow-bloom${bloom ? " is-on" : ""}`} />
    </div>,
    document.body,
  );
}
