import type { SyntaxToken } from "./editorTypes";

const TOKEN_PATTERN =
  /(\/\/.*|`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|@\w+|\b(?:import|from|type|export|class|constructor|private|readonly|async|const|await|if|throw|new|return)\b|\b(?:string|void|boolean|null|Promise)\b|\b[A-Z]\w*\b|\b\d+\b|\b\w+(?=\s*\()|\b\w+(?=\.))/g;

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

  if (
    /^(string|void|boolean|null|Promise)$/.test(text) ||
    /^[A-Z]/.test(text)
  ) {
    return "type";
  }

  if (/^\w+$/.test(text)) {
    return "method";
  }

  return "plain";
}

export function tokenizeLine(line: string): SyntaxToken[] {
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
