// figma-claude-demo — Design System Generator
// Mirrors tokens/tokens.json into Figma: Variables, Token pages, and Component frames.

figma.showUI(__html__, { width: 320, height: 380 });

// ── Token definitions (mirrors tokens/tokens.json) ────────────────────────
const COLORS = {
  primary:        '#2563EB',
  'primary-dark': '#1D4ED8',
  secondary:      '#6B7280',
  background:     '#FFFFFF',
  surface:        '#F9FAFB',
  border:         '#E5E7EB',
  'text-primary':   '#111827',
  'text-secondary': '#6B7280',
  'text-disabled':  '#9CA3AF',
  'text-inverse':   '#FFFFFF',
  success:        '#10B981',
  'success-light': '#D1FAE5',
  warning:        '#F59E0B',
  'warning-light': '#FEF3C7',
  error:          '#EF4444',
  'error-light':  '#FEE2E2',
  info:           '#3B82F6',
  'info-light':   '#DBEAFE',
};

const SPACING = { 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 8:32, 10:40, 12:48, 16:64 };

const TYPE_SCALE = [
  { name:'xs',   size:12, weight:400 },
  { name:'sm',   size:14, weight:400 },
  { name:'base', size:16, weight:400 },
  { name:'lg',   size:18, weight:400 },
  { name:'xl',   size:20, weight:500 },
  { name:'2xl',  size:24, weight:600 },
  { name:'3xl',  size:30, weight:600 },
  { name:'4xl',  size:36, weight:700 },
];

// ── Helpers ───────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  return { r, g, b };
}

function send(text) {
  figma.ui.postMessage({ type: 'log', text });
}

function getOrCreatePage(name) {
  let page = figma.root.children.find(p => p.name === name);
  if (!page) {
    page = figma.createPage();
    page.name = name;
  }
  // Clear existing content
  for (const node of [...page.children]) node.remove();
  return page;
}

async function loadFont(family, style) {
  try { await figma.loadFontAsync({ family, style }); } catch (_) {}
}

function createText(content, size, weight, color) {
  const t = figma.createText();
  t.characters = content;
  t.fontSize = size;
  t.fontName = { family: 'Inter', style: weight >= 700 ? 'Bold' : weight >= 600 ? 'SemiBold' : weight >= 500 ? 'Medium' : 'Regular' };
  t.fills = [{ type: 'SOLID', color: hexToRgb(color || '#111827') }];
  return t;
}

function createRect(w, h, fill) {
  const r = figma.createRectangle();
  r.resize(w, h);
  if (fill) r.fills = [{ type: 'SOLID', color: hexToRgb(fill) }];
  return r;
}

function frame(name, w, h, fill) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.fills = fill ? [{ type: 'SOLID', color: hexToRgb(fill) }] : [];
  f.clipsContent = false;
  return f;
}

function autoFrame(name, direction, gap, padding, fill) {
  const f = frame(name, 100, 100, fill);
  f.layoutMode = direction;
  f.itemSpacing = gap ?? 8;
  f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = padding ?? 0;
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  return f;
}

// ── Figma Variables (color tokens) ───────────────────────────────────────
async function createColorVariables() {
  send('Creating color variables…');
  let collection;
  const existing = figma.variables.getLocalVariableCollections().find(c => c.name === 'figma-claude-demo / Colors');
  if (existing) {
    collection = existing;
    // clear old variables
    for (const id of existing.variableIds) {
      try { figma.variables.getVariableById(id)?.remove(); } catch(_) {}
    }
  } else {
    collection = figma.variables.createVariableCollection('figma-claude-demo / Colors');
  }
  const modeId = collection.defaultModeId;

  for (const [name, hex] of Object.entries(COLORS)) {
    const v = figma.variables.createVariable(name, collection, 'COLOR');
    const { r, g, b } = hexToRgb(hex);
    v.setValueForMode(modeId, { r, g, b, a: 1 });
    v.description = hex;
  }
  send(`  → ${Object.keys(COLORS).length} color variables created`);
}

// ── Page 1: Design Tokens ─────────────────────────────────────────────────
async function buildTokensPage() {
  send('Building "🎨 Design Tokens" page…');
  const page = getOrCreatePage('🎨 Design Tokens');
  figma.currentPage = page;

  let y = 0;
  const GAP = 48;

  // ── Color swatches ──
  const colorSection = autoFrame('Color Tokens', 'VERTICAL', 16, 0, null);
  const colorTitle = createText('Color Tokens', 24, 700, '#111827');
  colorSection.appendChild(colorTitle);

  const swatchRow = autoFrame('Swatches', 'HORIZONTAL', 12, 0, null);
  swatchRow.layoutWrap = 'WRAP';
  swatchRow.resize(880, 100);
  swatchRow.primaryAxisSizingMode = 'FIXED';
  swatchRow.counterAxisSizingMode = 'AUTO';
  swatchRow.itemSpacing = 12;

  for (const [name, hex] of Object.entries(COLORS)) {
    const card = autoFrame(name, 'VERTICAL', 4, 0, null);
    const swatch = createRect(80, 48, hex);
    swatch.cornerRadius = 6;
    swatch.strokes = [{ type:'SOLID', color:{ r:.9,g:.9,b:.9 } }];
    swatch.strokeWeight = 1;
    card.appendChild(swatch);
    card.appendChild(createText(name, 10, 500, '#374151'));
    card.appendChild(createText(hex, 10, 400, '#6B7280'));
    swatchRow.appendChild(card);
  }
  colorSection.appendChild(swatchRow);
  page.appendChild(colorSection);
  colorSection.x = 40; colorSection.y = y;
  y += colorSection.height + GAP;

  // ── Typography scale ──
  const typeSection = autoFrame('Typography Scale', 'VERTICAL', 12, 0, null);
  typeSection.appendChild(createText('Typography Scale', 24, 700, '#111827'));

  for (const { name, size, weight } of TYPE_SCALE) {
    const row = autoFrame(`type-${name}`, 'HORIZONTAL', 24, 0, null);
    const label = createText(`text-${name}  ${size}px`, 11, 400, '#9CA3AF');
    label.resize(160, label.height);
    row.appendChild(label);
    row.appendChild(createText('The quick brown fox jumps', size, weight, '#111827'));
    typeSection.appendChild(row);
  }
  page.appendChild(typeSection);
  typeSection.x = 40; typeSection.y = y;
  y += typeSection.height + GAP;

  // ── Spacing scale ──
  const spaceSection = autoFrame('Spacing Scale', 'VERTICAL', 10, 0, null);
  spaceSection.appendChild(createText('Spacing Scale', 24, 700, '#111827'));

  for (const [name, px] of Object.entries(SPACING)) {
    const row = autoFrame(`spacing-${name}`, 'HORIZONTAL', 16, 0, null);
    row.counterAxisAlignItems = 'CENTER';
    const lbl = createText(`spacing-${name}  ${px}px`, 11, 400, '#9CA3AF');
    lbl.resize(160, lbl.height);
    row.appendChild(lbl);
    const bar = createRect(px, 12, '#2563EB');
    bar.cornerRadius = 3;
    bar.opacity = 0.7;
    row.appendChild(bar);
    spaceSection.appendChild(row);
  }
  page.appendChild(spaceSection);
  spaceSection.x = 40; spaceSection.y = y;

  send('  → Design Tokens page done');
}

// ── Page 2: Components ────────────────────────────────────────────────────
async function buildComponentsPage() {
  send('Building "🧩 Components" page…');
  const page = getOrCreatePage('🧩 Components');
  figma.currentPage = page;

  let y = 0;
  const GAP = 64;

  // Helper: section header
  function sectionHeader(title) {
    const t = createText(title, 20, 600, '#111827');
    t.x = 40; t.y = y;
    page.appendChild(t);
    y += 36;
  }

  // ── Buttons ──
  sectionHeader('Button');
  const variants = [
    { label:'Primary',   bg:'#2563EB', fg:'#FFFFFF', border: null },
    { label:'Secondary', bg:'#F9FAFB', fg:'#111827', border: '#E5E7EB' },
    { label:'Ghost',     bg:'#FFFFFF', fg:'#111827', border: null },
    { label:'Danger',    bg:'#EF4444', fg:'#FFFFFF', border: null },
  ];
  const sizes = [
    { label:'sm', px:12, py:6,  fs:12, radius:4 },
    { label:'md', px:16, py:8,  fs:14, radius:6 },
    { label:'lg', px:24, py:12, fs:16, radius:8 },
  ];

  let bx = 40;
  for (const v of variants) {
    let colY = y;
    for (const s of sizes) {
      const btnFrame = autoFrame(`Button/${v.label}/${s.label}`, 'HORIZONTAL', 6, 0, v.bg);
      btnFrame.paddingLeft = btnFrame.paddingRight = s.px;
      btnFrame.paddingTop = btnFrame.paddingBottom = s.py;
      btnFrame.cornerRadius = s.radius;
      if (v.border) {
        btnFrame.strokes = [{ type:'SOLID', color: hexToRgb(v.border) }];
        btnFrame.strokeWeight = 1;
      }
      const lbl = createText(`${v.label} ${s.label}`, s.fs, 500, v.fg);
      btnFrame.appendChild(lbl);
      btnFrame.primaryAxisAlignItems = 'CENTER';
      btnFrame.counterAxisAlignItems = 'CENTER';
      page.appendChild(btnFrame);
      btnFrame.x = bx; btnFrame.y = colY;
      colY += btnFrame.height + 10;
    }
    bx += 160;
  }
  y += 130 + GAP;

  // ── Cards ──
  sectionHeader('Card');
  const cardVariants = [
    { label:'Default',  bg:'#F9FAFB', border:'#E5E7EB', shadow: false },
    { label:'Outlined', bg:'#FFFFFF', border:'#E5E7EB', shadow: false, borderW: 2 },
    { label:'Elevated', bg:'#FFFFFF', border: null,      shadow: true  },
  ];

  let cx = 40;
  for (const cv of cardVariants) {
    const cardFrame = frame(`Card/${cv.label}`, 220, 160, cv.bg);
    cardFrame.cornerRadius = 10;
    if (cv.border) {
      cardFrame.strokes = [{ type:'SOLID', color: hexToRgb(cv.border) }];
      cardFrame.strokeWeight = cv.borderW || 1;
    }
    if (cv.shadow) {
      cardFrame.effects = [{
        type: 'DROP_SHADOW',
        color: { r:0,g:0,b:0,a:0.1 },
        offset: { x:0,y:4 },
        radius: 8,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL',
      }];
    }

    const headerBar = createRect(220, 48, cv.border ? cv.bg : '#F9FAFB');
    cardFrame.appendChild(headerBar);
    const titleT = createText(`${cv.label} Card`, 13, 600, '#111827');
    titleT.x = 16; titleT.y = 12;
    cardFrame.appendChild(titleT);
    const sep = createRect(220, 1, '#E5E7EB');
    sep.y = 48;
    cardFrame.appendChild(sep);
    const body = createText('Card body content goes here.', 12, 400, '#6B7280');
    body.x = 16; body.y = 64;
    cardFrame.appendChild(body);

    page.appendChild(cardFrame);
    cardFrame.x = cx; cardFrame.y = y;
    cx += 240;
  }
  y += 180 + GAP;

  // ── Badges ──
  sectionHeader('Badge');
  const badgeVariants = [
    { label:'Default', bg:'#F9FAFB', fg:'#6B7280', border:'#E5E7EB' },
    { label:'Success', bg:'#D1FAE5', fg:'#10B981', border: null },
    { label:'Warning', bg:'#FEF3C7', fg:'#F59E0B', border: null },
    { label:'Error',   bg:'#FEE2E2', fg:'#EF4444', border: null },
    { label:'Info',    bg:'#DBEAFE', fg:'#3B82F6', border: null },
  ];

  let bdx = 40;
  for (const bv of badgeVariants) {
    const badgeFrame = autoFrame(`Badge/${bv.label}`, 'HORIZONTAL', 0, 0, bv.bg);
    badgeFrame.paddingLeft = badgeFrame.paddingRight = 10;
    badgeFrame.paddingTop = badgeFrame.paddingBottom = 4;
    badgeFrame.cornerRadius = 9999;
    if (bv.border) {
      badgeFrame.strokes = [{ type:'SOLID', color: hexToRgb(bv.border) }];
      badgeFrame.strokeWeight = 1;
    }
    const lbl = createText(bv.label, 12, 500, bv.fg);
    badgeFrame.appendChild(lbl);
    badgeFrame.primaryAxisAlignItems = 'CENTER';
    badgeFrame.counterAxisAlignItems = 'CENTER';
    page.appendChild(badgeFrame);
    badgeFrame.x = bdx; badgeFrame.y = y;
    bdx += badgeFrame.width + 12;
  }
  y += 40 + GAP;

  // ── Inputs ──
  sectionHeader('Input');
  const inputStates = [
    { label:'Default',  borderColor:'#E5E7EB' },
    { label:'Focused',  borderColor:'#2563EB' },
    { label:'Error',    borderColor:'#EF4444' },
    { label:'Disabled', borderColor:'#E5E7EB', bg:'#F9FAFB' },
  ];

  let ix = 40;
  for (const inp of inputStates) {
    const container = autoFrame(`Input/${inp.label}`, 'VERTICAL', 6, 0, null);
    container.appendChild(createText(inp.label, 12, 500, '#111827'));

    const inputBox = frame(`input-box`, 200, 38, inp.bg || '#FFFFFF');
    inputBox.cornerRadius = 6;
    inputBox.strokes = [{ type:'SOLID', color: hexToRgb(inp.borderColor) }];
    inputBox.strokeWeight = inp.label === 'Focused' ? 2 : 1;
    const placeholder = createText('Placeholder text…', 13, 400, '#9CA3AF');
    placeholder.x = 10; placeholder.y = 9;
    inputBox.appendChild(placeholder);
    container.appendChild(inputBox);

    if (inp.label === 'Error') {
      container.appendChild(createText('This field is required.', 11, 400, '#EF4444'));
    }

    page.appendChild(container);
    container.x = ix; container.y = y;
    ix += 220;
  }

  send('  → Components page done');
}

// ── Main entry ────────────────────────────────────────────────────────────
figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'generate') return;

  try {
    // Load fonts first
    send('Loading fonts…');
    for (const style of ['Regular','Medium','SemiBold','Bold']) {
      await loadFont('Inter', style);
    }

    await createColorVariables();
    await buildTokensPage();
    await buildComponentsPage();

    // Return to first page
    figma.currentPage = figma.root.children[0];

    figma.ui.postMessage({ type: 'done' });
    figma.notify('✓ Design system generated! Check "🎨 Design Tokens" and "🧩 Components" pages.');
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    figma.ui.postMessage({ type: 'error', text: msg });
    figma.notify('Plugin error: ' + msg, { error: true });
  }
};
