const codeLines = [
  [{ type: 'decorator', text: '@Injectable()' }],
  [
    { type: 'keyword', text: 'export class ' },
    { type: 'class', text: 'UsersService ' },
    { type: 'plain', text: '{' },
  ],
  [{ type: 'keyword', text: '  constructor' }, { type: 'plain', text: '(' }],
  [
    { type: 'plain', text: '    private readonly repository: ' },
    { type: 'type', text: 'UserRepository' },
    { type: 'plain', text: ',' },
  ],
  [
    { type: 'plain', text: '    private readonly logger: ' },
    { type: 'type', text: 'Logger' },
    { type: 'plain', text: ',' },
  ],
  [{ type: 'plain', text: '  ) {}' }],
  [{ type: 'plain', text: '' }],
  [
    { type: 'keyword', text: '  async ' },
    { type: 'method', text: 'findById' },
    { type: 'plain', text: '(id: ' },
    { type: 'type', text: 'string' },
    { type: 'plain', text: '): ' },
    { type: 'type', text: 'Promise<User>' },
    { type: 'plain', text: ' {' },
  ],
  [
    { type: 'keyword', text: '    const ' },
    { type: 'plain', text: 'user = ' },
    { type: 'keyword', text: 'await ' },
    { type: 'plain', text: 'this.repository.' },
    { type: 'method', text: 'findById' },
    { type: 'plain', text: '(id);' },
  ],
  [{ type: 'keyword', text: '    if ' }, { type: 'plain', text: '(!user) {' }],
  [
    { type: 'keyword', text: '      throw new ' },
    { type: 'class', text: 'UserNotFoundException' },
    { type: 'plain', text: '(id);' },
  ],
  [{ type: 'plain', text: '    }' }],
  [{ type: 'plain', text: '' }],
  [
    { type: 'plain', text: '    this.logger.' },
    { type: 'method', text: 'log' },
    { type: 'plain', text: '(' },
    { type: 'string', text: '`User ${id} retrieved`' },
    { type: 'plain', text: ');' },
  ],
  [{ type: 'keyword', text: '    return ' }, { type: 'plain', text: 'user;' }],
  [{ type: 'plain', text: '  }' }],
  [{ type: 'plain', text: '}' }],
  [
  { type: 'keyword', text: '  async ' },
  { type: 'method', text: 'create' },
  { type: 'plain', text: '(data: ' },
  { type: 'type', text: 'CreateUserDto' },
  { type: 'plain', text: '): ' },
  { type: 'type', text: 'Promise<User>' },
  { type: 'plain', text: ' {' },
],
[
  { type: 'keyword', text: '    const ' },
  { type: 'plain', text: 'user = ' },
  { type: 'keyword', text: 'await ' },
  { type: 'plain', text: 'this.repository.' },
  { type: 'method', text: 'create' },
  { type: 'plain', text: '(data);' },
],
[
  { type: 'plain', text: '    this.logger.' },
  { type: 'method', text: 'log' },
  { type: 'plain', text: '(' },
  { type: 'string', text: '`User ${user.id} created`' },
  { type: 'plain', text: ');' },
],
[{ type: 'keyword', text: '    return ' }, { type: 'plain', text: 'user;' }],
[{ type: 'plain', text: '  }' }],
] as const

export function Editor() {
  return (
    <div className="hero-editor">
      <div className="hero-editor__head">
        <span>TS</span>
        <strong>users.service.ts</strong>
        <em>TypeScript ●</em>
      </div>

      <pre className="hero-editor__code">
        {codeLines.map((line, index) => (
          <code key={index}>
            <span className="hero-editor__line">{index + 1}</span>
            {line.map((token, tokenIndex) => (
              <b className={`syntax-${token.type}`} key={`${token.text}-${tokenIndex}`}>
                {token.text}
              </b>
            ))}
          </code>
        ))}
      </pre>

      <div className="hero-editor__footer">
        <span>Ln 14, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <strong>● No errors</strong>
      </div>
    </div>
  )
}
