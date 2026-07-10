export type SyntaxToken = {
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

export type EditorStatus =
  | "ready"
  | "typing"
  | "issue"
  | "success"
  | "selected";

export type EditorAction =
  | { type: "type"; text: string }
  | { type: "pause"; duration: number }
  | { type: "backspace"; count: number; fast?: boolean }
  | { type: "deleteLine" }
  | { type: "issue"; active: boolean };

export interface EditorViewState {
  code: string;
  issueLine: number | null;
  isSelected: boolean;
  shortcut: string | null;
  status: EditorStatus;
}
