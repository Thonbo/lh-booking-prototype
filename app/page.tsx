import { Button, Card, Badge, Input, H1, H2, H3, H4, Body, Caption, Label } from '@/components/ui';

// ── Token data ──────────────────────────────────────────────
const COLORS = [
  { name: 'primary',        hex: '#2563EB', dark: true  },
  { name: 'primary-dark',   hex: '#1D4ED8', dark: true  },
  { name: 'secondary',      hex: '#6B7280', dark: true  },
  { name: 'background',     hex: '#FFFFFF', dark: false },
  { name: 'surface',        hex: '#F9FAFB', dark: false },
  { name: 'border',         hex: '#E5E7EB', dark: false },
  { name: 'text-primary',   hex: '#111827', dark: true  },
  { name: 'text-secondary', hex: '#6B7280', dark: true  },
  { name: 'text-disabled',  hex: '#9CA3AF', dark: false },
  { name: 'success',        hex: '#10B981', dark: true  },
  { name: 'warning',        hex: '#F59E0B', dark: true  },
  { name: 'error',          hex: '#EF4444', dark: true  },
  { name: 'info',           hex: '#3B82F6', dark: true  },
];

const TYPE_SCALE = [
  { name: 'xs',   size: '12px', weight: '400' },
  { name: 'sm',   size: '14px', weight: '400' },
  { name: 'base', size: '16px', weight: '400' },
  { name: 'lg',   size: '18px', weight: '400' },
  { name: 'xl',   size: '20px', weight: '500' },
  { name: '2xl',  size: '24px', weight: '600' },
  { name: '3xl',  size: '30px', weight: '600' },
  { name: '4xl',  size: '36px', weight: '700' },
];

const SPACING = [
  { name: '1',  px: '4px'  },
  { name: '2',  px: '8px'  },
  { name: '3',  px: '12px' },
  { name: '4',  px: '16px' },
  { name: '5',  px: '20px' },
  { name: '6',  px: '24px' },
  { name: '8',  px: '32px' },
  { name: '10', px: '40px' },
  { name: '12', px: '48px' },
  { name: '16', px: '64px' },
];

// ── Section wrapper ──────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <H2>{title}</H2>
        <div className="flex-1 h-px bg-border" />
      </div>
      {children}
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────
export default function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface px-10 py-6">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div>
            <H1 className="text-2xl">figma-claude-demo</H1>
            <Caption className="mt-1">
              Design system — tokens &amp; components mirrored between Figma and code
            </Caption>
          </div>
          <div className="flex gap-2">
            <Badge variant="info" size="sm">Next.js 16</Badge>
            <Badge variant="success" size="sm">Tailwind v4</Badge>
            <Badge size="sm">Figma Plugin ready</Badge>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-10 py-12 flex flex-col gap-16">

        {/* ── Colors ── */}
        <Section title="Color Tokens">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {COLORS.map(({ name, hex, dark }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <div
                  className="h-14 rounded-md border border-border shadow-sm"
                  style={{ backgroundColor: hex }}
                />
                <Label className="text-xs text-text-primary">{name}</Label>
                <Caption className="text-xs font-mono">{hex}</Caption>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section title="Typography Scale">
          <Card variant="outlined">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-6 font-medium">Token</th>
                  <th className="pb-3 pr-6 font-medium">Size</th>
                  <th className="pb-3 font-medium">Sample</th>
                </tr>
              </thead>
              <tbody>
                {TYPE_SCALE.map(({ name, size, weight }) => (
                  <tr key={name} className="border-b border-border last:border-0">
                    <td className="py-3 pr-6">
                      <span className="font-mono text-xs text-text-secondary">text-{name}</span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className="font-mono text-xs text-text-secondary">{size} / {weight}</span>
                    </td>
                    <td className="py-3" style={{ fontSize: size, fontWeight: weight, lineHeight: 1.4 }}>
                      The quick brown fox
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="flex flex-col gap-4 pt-2">
            <H1>H1 — Heading One</H1>
            <H2>H2 — Heading Two</H2>
            <H3>H3 — Heading Three</H3>
            <H4>H4 — Heading Four</H4>
            <Body>Body — The five boxing wizards jump quickly over the lazy dog.</Body>
            <Caption>Caption — Secondary / muted supporting text at 14px.</Caption>
            <Label>Label — Used for form labels and UI metadata.</Label>
          </div>
        </Section>

        {/* ── Spacing ── */}
        <Section title="Spacing Scale">
          <div className="flex flex-col gap-2">
            {SPACING.map(({ name, px }) => (
              <div key={name} className="flex items-center gap-4">
                <span className="font-mono text-xs text-text-secondary w-16">spacing-{name}</span>
                <div
                  className="h-4 bg-primary rounded-sm opacity-70"
                  style={{ width: px }}
                />
                <Caption className="text-xs">{px}</Caption>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Buttons ── */}
        <Section title="Button">
          {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <Label className="text-xs text-text-secondary capitalize">{variant}</Label>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant={variant} size="sm">Small</Button>
                <Button variant={variant} size="md">Medium</Button>
                <Button variant={variant} size="lg">Large</Button>
                <Button variant={variant} disabled>Disabled</Button>
                <Button variant={variant} loading>Loading</Button>
              </div>
            </div>
          ))}
        </Section>

        {/* ── Cards ── */}
        <Section title="Card">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card
              variant="default"
              title="Default card"
              description="Uses surface background with border."
              footer={<Button size="sm" variant="ghost">Action</Button>}
            >
              <Body className="text-sm">Card body content goes here.</Body>
            </Card>
            <Card
              variant="outlined"
              title="Outlined card"
              description="White background with 2px border."
              footer={<Button size="sm" variant="secondary">Action</Button>}
            >
              <Body className="text-sm">Card body content goes here.</Body>
            </Card>
            <Card
              variant="elevated"
              title="Elevated card"
              description="White background with drop shadow."
              footer={<Button size="sm">Action</Button>}
            >
              <Body className="text-sm">Card body content goes here.</Body>
            </Card>
          </div>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badge">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge size="sm">Default sm</Badge>
              <Badge variant="success" size="sm">Success sm</Badge>
              <Badge variant="warning" size="sm">Warning sm</Badge>
              <Badge variant="error" size="sm">Error sm</Badge>
              <Badge variant="info" size="sm">Info sm</Badge>
            </div>
          </div>
        </Section>

        {/* ── Inputs ── */}
        <Section title="Input">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <Input label="Default" placeholder="Enter a value…" hint="This is a hint message." />
            <Input label="With error" placeholder="Enter a value…" error="This field is required." defaultValue="bad input" />
            <Input label="Disabled" placeholder="Cannot edit" disabled defaultValue="Read-only value" />
            <Input label="Email" type="email" placeholder="you@example.com" hint="We'll never share your email." />
          </div>
        </Section>

        {/* ── Footer ── */}
        <footer className="border-t border-border pt-8 pb-4">
          <Caption>
            figma-claude-demo · tokens defined in{' '}
            <code className="font-mono text-xs bg-surface px-1 py-0.5 rounded">tokens/tokens.json</code>
            {' '}· Figma plugin in{' '}
            <code className="font-mono text-xs bg-surface px-1 py-0.5 rounded">figma-plugin/</code>
          </Caption>
        </footer>

      </main>
    </div>
  );
}
