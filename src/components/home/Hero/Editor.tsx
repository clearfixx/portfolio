"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { EDITOR_SCRIPT, FINAL_CODE } from "./editorScript";
import { tokenizeLine } from "./editorSyntax";
import type { EditorStatus, EditorViewState } from "./editorTypes";

const TYPE_DELAYS = [6, 8, 10, 12, 15, 18, 23, 29];
const BACKSPACE_DELAYS = [14, 18, 22, 26, 31, 36];
const FAST_BACKSPACE_DELAYS = [5, 7, 9, 11, 14, 17];

const INITIAL_STATE: EditorViewState = {
  code: "",
  issueLine: null,
  isSelected: false,
  shortcut: null,
  status: "ready",
};

const STATUS_LABELS: Record<EditorStatus, string> = {
  ready: "● Ready",
  typing: "● Writing…",
  issue: "● 1 issue",
  success: "● No errors",
  selected: "● All selected",
};

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function randomItem(values: readonly number[]) {
  return values[Math.floor(Math.random() * values.length)];
}

function getTypingDelay(character: string) {
  const delay = randomItem(TYPE_DELAYS);
  const hesitation = Math.random() < 0.02 ? 55 + Math.random() * 90 : 0;

  if (character === "\n") {
    return 75 + Math.floor(Math.random() * 80);
  }

  if (/[{}()[\],.;]/.test(character)) {
    return delay + 18 + Math.floor(Math.random() * 35) + hesitation;
  }

  if (character === " ") {
    return Math.max(5, delay - 4);
  }

  return delay + hesitation;
}

function sleep(duration: number, signal: AbortSignal) {
  return new Promise<boolean>((resolve) => {
    if (signal.aborted) {
      resolve(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      signal.removeEventListener("abort", handleAbort);
      resolve(true);
    }, duration);

    function handleAbort() {
      window.clearTimeout(timeoutId);
      resolve(false);
    }

    signal.addEventListener("abort", handleAbort, { once: true });
  });
}

function getCurrentLineIndex(code: string) {
  return code.split("\n").length - 1;
}

function getCursorPosition(code: string) {
  const lines = code.split("\n");

  return {
    line: lines.length,
    column: (lines.at(-1)?.length ?? 0) + 1,
  };
}

async function typeText(
  text: string,
  updateCode: (value: string) => void,
  getCode: () => string,
  signal: AbortSignal,
) {
  for (const character of text) {
    updateCode(getCode() + character);

    if (!(await sleep(getTypingDelay(character), signal))) {
      return false;
    }
  }

  return true;
}

async function eraseCharacters(
  count: number,
  fast: boolean,
  updateCode: (value: string) => void,
  getCode: () => string,
  signal: AbortSignal,
) {
  const delays = fast ? FAST_BACKSPACE_DELAYS : BACKSPACE_DELAYS;

  for (let index = 0; index < count; index += 1) {
    updateCode(getCode().slice(0, -1));

    if (!(await sleep(randomItem(delays), signal))) {
      return false;
    }
  }

  return true;
}

async function eraseCurrentLine(
  updateCode: (value: string) => void,
  getCode: () => string,
  signal: AbortSignal,
) {
  while (!getCode().endsWith("\n") && getCode().length > 0) {
    updateCode(getCode().slice(0, -1));

    if (!(await sleep(randomItem(FAST_BACKSPACE_DELAYS), signal))) {
      return false;
    }
  }

  return true;
}

export function Editor() {
  const [view, setView] = useState<EditorViewState>(INITIAL_STATE);
  const codeRef = useRef<HTMLPreElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const editor = codeRef.current;

      if (!editor) return;

      editor.scrollTop = view.isSelected ? 0 : editor.scrollHeight;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [view.code, view.isSelected]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const frameId = window.requestAnimationFrame(() => {
        setView({
          code: FINAL_CODE,
          issueLine: null,
          isSelected: false,
          shortcut: null,
          status: "success",
        });
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const controller = new AbortController();
    const { signal } = controller;

    async function runAnimation() {
      let code = "";
      let issueLine: number | null = null;
      let isSelected = false;
      let shortcut: string | null = null;
      let status: EditorStatus = "ready";

      const render = () => {
        if (signal.aborted) return;

        setView({
          code,
          issueLine,
          isSelected,
          shortcut,
          status,
        });
      };

      const setCode = (value: string) => {
        code = value;
        render();
      };

      const selectAllShortcut = /Mac|iPhone|iPad/i.test(navigator.userAgent)
        ? "⌘ A"
        : "CTRL A";

      if (!(await sleep(1050, signal))) return;

      while (!signal.aborted) {
        code = "";
        issueLine = null;
        isSelected = false;
        shortcut = null;
        status = "typing";
        render();

        for (const action of EDITOR_SCRIPT) {
          if (signal.aborted) return;

          if (action.type === "pause") {
            if (!(await sleep(action.duration, signal))) return;
            continue;
          }

          if (action.type === "issue") {
            issueLine = action.active ? getCurrentLineIndex(code) : null;
            status = action.active ? "issue" : "typing";
            render();
            continue;
          }

          if (action.type === "backspace") {
            const completed = await eraseCharacters(
              action.count,
              Boolean(action.fast),
              setCode,
              () => code,
              signal,
            );

            if (!completed) return;
            continue;
          }

          if (action.type === "deleteLine") {
            const completed = await eraseCurrentLine(
              setCode,
              () => code,
              signal,
            );

            if (!completed) return;
            continue;
          }

          const completed = await typeText(
            action.text,
            setCode,
            () => code,
            signal,
          );

          if (!completed) return;
        }

        issueLine = null;
        status = "success";
        render();

        if (!(await sleep(2400, signal))) return;

        isSelected = true;
        shortcut = selectAllShortcut;
        status = "selected";
        render();

        if (!(await sleep(760, signal))) return;

        shortcut = "DEL";
        render();

        if (!(await sleep(340, signal))) return;

        code = "";
        issueLine = null;
        isSelected = false;
        status = "ready";
        render();

        if (!(await sleep(520, signal))) return;

        shortcut = null;
        render();

        if (!(await sleep(980, signal))) return;
      }
    }

    void runAnimation();

    return () => {
      controller.abort();
    };
  }, [prefersReducedMotion]);

  const lines = view.code.length > 0 ? view.code.split("\n") : [""];
  const cursor = getCursorPosition(view.code);
  const lastLineIndex = lines.length - 1;

  return (
    <div className="hero-editor">
      <div className="hero-editor__head">
        <span>TS</span>

        <div className="hero-editor__file">
          <strong>users.service.ts</strong>
          <small>DSS Universe</small>
        </div>

        <em>TypeScript</em>
      </div>

      <div className="hero-editor__viewport">
        <pre
          aria-label="Animated DSS Universe UsersService TypeScript example"
          className={`hero-editor__code${view.isSelected ? " hero-editor__code--selected" : ""}`}
          ref={codeRef}
        >
          {lines.map((line, index) => (
            <code
              className={
                index === view.issueLine
                  ? "hero-editor__code-line--issue"
                  : undefined
              }
              key={index}
            >
              <span aria-hidden="true" className="hero-editor__line">
                {index + 1}
              </span>

              <span className="hero-editor__source">
                {tokenizeLine(line).map((token, tokenIndex) => (
                  <b
                    className={`syntax-${token.type}`}
                    key={`${token.text}-${tokenIndex}`}
                  >
                    {token.text}
                  </b>
                ))}

                {index === lastLineIndex && !view.isSelected ? (
                  <i aria-hidden="true" className="hero-editor__caret" />
                ) : null}
              </span>
            </code>
          ))}
        </pre>

        {view.shortcut ? (
          <span
            aria-hidden="true"
            className="hero-editor__shortcut"
            key={view.shortcut}
          >
            {view.shortcut}
          </span>
        ) : null}
      </div>

      <div className="hero-editor__footer">
        <span>
          Ln {cursor.line}, Col {cursor.column}
        </span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>TypeScript</span>
        <strong
          className={`hero-editor__status hero-editor__status--${view.status}`}
        >
          {STATUS_LABELS[view.status]}
        </strong>
      </div>
    </div>
  );
}
