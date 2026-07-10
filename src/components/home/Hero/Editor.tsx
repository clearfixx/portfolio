"use client";

import { useEffect, useState } from "react";

type SyntaxToken = {
  type:
    | "plain"
    | "keyword"
    | "decorator"
    | "type"
    | "method"
    | "string"
    | "comment"
    | "number";
  text: string;
};

type EditorStatus = "ready" | "typing" | "issue" | "success" | "selected";

type EditorAction =
  | { type: "type"; text: string }
  | { type: "pause"; duration: number }
  | { type: "backspace"; count: number; fast?: boolean }
  | { type: "issue"; active: boolean };

interface EditorViewState {
  code: string;
  issueLine: number | null;
  isSelected: boolean;
  shortcut: string | null;
  status: EditorStatus;
}

const TYPE_DELAYS = [1, 5, 8, 10, 12, 15, 18, 23, 27, 33];
const BACKSPACE_DELAYS = [8, 10, 12, 15, 18, 22];
const FAST_BACKSPACE_DELAYS = [3, 4, 5, 6, 8, 10];

const SCRIPT: EditorAction[] = [
  { type: "type", text: "import { Injectable } from '@nestjs/common'" },
  { type: "type", text: "\nimport type { User } from '@prisma/client'" },
  { type: "type", text: "\nimport { UserNotFoundError } from './errors'" },
  {
    type: "type",
    text: "\nimport { UsersRepository } from './users.repository'",
  },
  { type: "pause", duration: 280 },
  { type: "type", text: "\n\n@Injectable()" },
  { type: "type", text: "\nexport class UsersService {" },
  {
    type: "type",
    text: "\n  constructor(private readonly users: UsersRepository) {}",
  },
  { type: "pause", duration: 360 },
  { type: "type", text: "\n\n  async findById(id: string): Promise<User> {" },
  { type: "type", text: "\n    const usee" },
  { type: "issue", active: true },
  { type: "pause", duration: 460 },
  { type: "backspace", count: 1 },
  { type: "issue", active: false },
  { type: "type", text: "r = await this.users.findByI" },
  { type: "issue", active: true },
  { type: "type", text: "D" },
  { type: "pause", duration: 340 },
  { type: "backspace", count: 1 },
  { type: "issue", active: false },
  { type: "type", text: "d(id)" },
  { type: "pause", duration: 260 },
  { type: "type", text: "\n\n    if (!user) {" },
  { type: "type", text: "\n      throw new UserNotFoundError(id)" },
  { type: "type", text: "\n    }" },
  { type: "pause", duration: 300 },
  { type: "type", text: "\n\n    user.lastSeenAt = new Date()" },
  { type: "issue", active: true },
  { type: "pause", duration: 620 },
  { type: "backspace", count: 32, fast: true },
  { type: "issue", active: false },
  { type: "pause", duration: 220 },
  { type: "type", text: "    await this.users.updateLastSeen(user.id)" },
  { type: "type", text: "\n    return user" },
  { type: "type", text: "\n  }" },
  { type: "type", text: "\n}" },
];

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

const TOKEN_PATTERN =
  /(\/\/.*|`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|@\w+|\b(?:import|from|type|export|class|constructor|private|readonly|async|const|await|if|throw|new|return)\b|\b(?:string|void|Promise)\b|\b[A-Z]\w*\b|\b\d+\b|\b\w+(?=\s*\()|\b\w+(?=\.))/g;

function randomItem(values: readonly number[]) {
  return values[Math.floor(Math.random() * values.length)];
}

function getTypingDelay(character: string) {
  const delay = randomItem(TYPE_DELAYS);

  if (character === "\n") {
    return 70 + Math.floor(Math.random() * 100);
  }

  if (/[{}()[\],.;]/.test(character)) {
    return delay + 20 + Math.floor(Math.random() * 45);
  }

  if (character === " ") {
    return Math.max(3, delay - 4);
  }

  return delay;
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

function classifyToken(text: string): SyntaxToken["type"] {
  if (text.startsWith("//")) return "comment";
  if (/^[`'"]/.test(text)) return "string";
  if (text.startsWith("@")) return "decorator";
  if (/^\d+$/.test(text)) return "number";

  if (
    /^(import|from|type|export|class|constructor|private|readonly|async|const|await|if|throw|new|return)$/.test(
      text,
    )
  ) {
    return "keyword";
  }

  if (/^(string|void|Promise)$/.test(text) || /^[A-Z]/.test(text)) {
    return "type";
  }

  if (/^\w+$/.test(text)) {
    return "method";
  }

  return "plain";
}

function tokenizeLine(line: string): SyntaxToken[] {
  const tokens: SyntaxToken[] = [];
  let cursor = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;

    if (index > cursor) {
      tokens.push({ type: "plain", text: line.slice(cursor, index) });
    }

    tokens.push({ type: classifyToken(match[0]), text: match[0] });
    cursor = index + match[0].length;
  }

  if (cursor < line.length) {
    tokens.push({ type: "plain", text: line.slice(cursor) });
  }

  return tokens;
}

export function Editor() {
  const [view, setView] = useState<EditorViewState>(INITIAL_STATE);

  useEffect(() => {
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

      const selectAllShortcut = /Mac|iPhone|iPad/i.test(navigator.userAgent)
        ? "⌘ A"
        : "CTRL A";

      if (!(await sleep(850, signal))) return;

      while (!signal.aborted) {
        code = "";
        issueLine = null;
        isSelected = false;
        shortcut = null;
        status = "typing";
        render();

        for (const action of SCRIPT) {
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
            const delays = action.fast
              ? FAST_BACKSPACE_DELAYS
              : BACKSPACE_DELAYS;

            for (let index = 0; index < action.count; index += 1) {
              code = code.slice(0, -1);
              render();

              if (!(await sleep(randomItem(delays), signal))) return;
            }

            continue;
          }

          for (const character of action.text) {
            code += character;
            render();

            if (!(await sleep(getTypingDelay(character), signal))) return;
          }
        }

        issueLine = null;
        status = "success";
        render();

        if (!(await sleep(1900, signal))) return;

        isSelected = true;
        shortcut = selectAllShortcut;
        status = "selected";
        render();

        if (!(await sleep(620, signal))) return;

        shortcut = "DEL";
        render();

        if (!(await sleep(260, signal))) return;

        code = "";
        issueLine = null;
        isSelected = false;
        status = "ready";
        render();

        if (!(await sleep(420, signal))) return;

        shortcut = null;
        render();

        if (!(await sleep(780, signal))) return;
      }
    }

    void runAnimation();

    return () => {
      controller.abort();
    };
  }, []);

  const lines = view.code.length > 0 ? view.code.split("\n") : [""];
  const cursor = getCursorPosition(view.code);
  const lastLineIndex = lines.length - 1;

  return (
    <div className="hero-editor">
      <div className="hero-editor__head">
        <span>TS</span>
        <strong>users.service.ts</strong>
        <em>TypeScript</em>
      </div>

      <div className="hero-editor__viewport">
        <pre
          aria-label="Animated TypeScript code example"
          className={`hero-editor__code${view.isSelected ? " hero-editor__code--selected" : ""}`}
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
