"use client";

import React, { useMemo, useState } from "react";

type CardBlock = {
  id: string;
  label: string;
  value: string;
};

type ThemeOption = {
  id: string;
  label: string;
  background: string;
  surface: string;
  accent: string;
  glow: string;
  text: string;
  muted: string;
};

const THEMES: ThemeOption[] = [
  {
    id: "amber",
    label: "Amber Gold",
    background:
      "radial-gradient(circle at 20% 20%, rgba(255,182,68,0.35), transparent 55%), radial-gradient(circle at 80% 20%, rgba(255,140,0,0.25), transparent 45%), linear-gradient(160deg, #1c1100 0%, #2b1a00 50%, #0f0a02 100%)",
    surface:
      "linear-gradient(160deg, rgba(255,182,68,0.25), rgba(133,75,0,0.35))",
    accent: "#ffbf47",
    glow: "rgba(255, 179, 71, 0.4)",
    text: "#fff6e4",
    muted: "rgba(255, 214, 167, 0.7)",
  },
  {
    id: "teal",
    label: "Teal Pulse",
    background:
      "radial-gradient(circle at 20% 10%, rgba(0,255,209,0.2), transparent 55%), radial-gradient(circle at 80% 30%, rgba(24,175,255,0.25), transparent 50%), linear-gradient(160deg, #020b14 0%, #041f2a 60%, #01070b 100%)",
    surface:
      "linear-gradient(160deg, rgba(0,226,209,0.2), rgba(2,90,116,0.35))",
    accent: "#4ee3c1",
    glow: "rgba(78, 227, 193, 0.35)",
    text: "#e6fffb",
    muted: "rgba(198, 255, 244, 0.6)",
  },
  {
    id: "rose",
    label: "Rose Noir",
    background:
      "radial-gradient(circle at 15% 15%, rgba(255,122,194,0.25), transparent 60%), radial-gradient(circle at 85% 10%, rgba(255,72,72,0.25), transparent 50%), linear-gradient(160deg, #14060a 0%, #2b0d15 55%, #0b0507 100%)",
    surface:
      "linear-gradient(160deg, rgba(255,126,191,0.18), rgba(90,24,36,0.4))",
    accent: "#ff87c8",
    glow: "rgba(255, 135, 200, 0.35)",
    text: "#ffeaf4",
    muted: "rgba(255, 203, 226, 0.65)",
  },
];

const createId = () => Math.random().toString(36).slice(2, 10);

const reorderBlocks = (blocks: CardBlock[], fromId: string, toId: string) => {
  const fromIndex = blocks.findIndex((block) => block.id === fromId);
  const toIndex = blocks.findIndex((block) => block.id === toId);
  if (fromIndex === -1 || toIndex === -1) {
    return blocks;
  }
  const next = [...blocks];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};

export default function TestCustomizationPage() {
  const [themeId, setThemeId] = useState<ThemeOption["id"]>("amber");
  const [title, setTitle] = useState("HJ");
  const [subtitle, setSubtitle] = useState("TEST_서명현수");
  const [footer, setFooter] = useState("LOLA ROSE");
  const [radius, setRadius] = useState(32);
  const [padding, setPadding] = useState(28);
  const [shadow, setShadow] = useState(24);
  const [textAlign, setTextAlign] = useState<"left" | "center">("left");
  const [blocks, setBlocks] = useState<CardBlock[]>([
    {
      id: createId(),
      label: "상품주문번호",
      value: "2025121065070191",
    },
    {
      id: createId(),
      label: "상품번호",
      value: "10238796808",
    },
    {
      id: createId(),
      label: "구매일자",
      value: "2025. 12. 10.",
    },
    {
      id: createId(),
      label: "보증기간",
      value: "2030. 03. 10.",
    },
  ]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [titleSize, setTitleSize] = useState(12);
  const [subtitleSize, setSubtitleSize] = useState(16);
  const [labelSize, setLabelSize] = useState(11);
  const [valueSize, setValueSize] = useState(14);
  const [footerSize, setFooterSize] = useState(11);
  const [titleSpacing, setTitleSpacing] = useState(0.3);
  const [labelSpacing, setLabelSpacing] = useState(0.2);
  const [rowGap, setRowGap] = useState(14);
  const [headerBorderOpacity, setHeaderBorderOpacity] = useState(0.15);
  const [footerBorderOpacity, setFooterBorderOpacity] = useState(0.15);
  const [exportedHtml, setExportedHtml] = useState("");

  const theme = useMemo(
    () => THEMES.find((item) => item.id === themeId) ?? THEMES[0],
    [themeId]
  );

  const handleBlockChange = (id: string, key: "label" | "value", value: string) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, [key]: value } : block))
    );
  };

  const handleBlockRemove = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const handleAddBlock = () => {
    setBlocks((prev) => [
      ...prev,
      { id: createId(), label: "새 항목", value: "내용을 입력하세요" },
    ]);
  };

  const handleExport = () => {
    const html = buildExportHtml({
      theme,
      title,
      subtitle,
      footer,
      radius,
      padding,
      shadow,
      textAlign,
      blocks,
      titleSize,
      subtitleSize,
      labelSize,
      valueSize,
      footerSize,
      titleSpacing,
      labelSpacing,
      rowGap,
      headerBorderOpacity,
      footerBorderOpacity,
    });
    setExportedHtml(html);
  };

  return (
    <div
      className='min-h-screen text-white relative overflow-hidden'
      style={{ background: theme.background }}
    >
      <div className='pointer-events-none absolute inset-0'>
        <div className='orb orb--one' />
        <div className='orb orb--two' />
        <div className='orb orb--three' />
      </div>
      <div className='max-w-6xl mx-auto px-6 py-16'>
        <header className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-xs uppercase tracking-[0.4em] text-amber-200/70'>
              Custom Card Studio
            </p>
            <h1 className='text-4xl md:text-5xl font-black mt-2'>
              카드 레이아웃을 직접 설계하고 저장하세요
            </h1>
            <p className='text-slate-300 mt-3 max-w-2xl'>
              Drag & drop으로 순서를 바꾸고, 컬러·반경·타이포를 조정한 뒤 HTML 문자열로 저장합니다.
            </p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <button
              type='button'
              onClick={handleAddBlock}
              className='rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-amber-300'
            >
              + 필드 추가
            </button>
            <button
              type='button'
              onClick={handleExport}
              className='rounded-full bg-amber-400 text-black px-4 py-2 text-sm font-semibold shadow-lg shadow-amber-500/30'
            >
              HTML 출력
            </button>
          </div>
        </header>

        <div className='mt-12 flex flex-col gap-10 lg:flex-row lg:items-start'>
          <section className='space-y-6 lg:w-1/2'>
            <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-6 shadow-2xl'>
              <h2 className='text-lg font-bold mb-4'>라이브 프리뷰</h2>
              <div className='flex items-center justify-center py-6'>
                <div
                  className='relative w-[300px] md:w-[340px] transition-transform duration-500 hover:-translate-y-2 floating-card custom-card'
                  style={{
                    borderRadius: radius + 8,
                    background: theme.surface,
                    boxShadow: `0 24px ${shadow}px rgba(0,0,0,0.45), 0 0 80px ${theme.glow}`,
                    padding,
                    textAlign,
                    color: theme.text,
                  }}
                >
                  <div
                    className='flex flex-col gap-2 pb-4 border-b card-header'
                    style={{
                      borderColor: `rgba(255,255,255,${headerBorderOpacity})`,
                    }}
                  >
                    <div
                      className='uppercase text-slate-300 card-title'
                      style={{
                        fontSize: titleSize,
                        letterSpacing: `${titleSpacing}em`,
                      }}
                    >
                      {title}
                    </div>
                    <div
                      className='font-semibold text-white card-subtitle'
                      style={{ fontSize: subtitleSize }}
                    >
                      {subtitle}
                    </div>
                  </div>
                  <div
                    className='mt-5 card-body'
                    style={{ display: "grid", gap: rowGap }}
                  >
                    {blocks.map((block) => (
                      <div key={block.id} className='space-y-1 card-row'>
                        <div
                          className='uppercase text-amber-200/70 card-row-label'
                          style={{
                            fontSize: labelSize,
                            letterSpacing: `${labelSpacing}em`,
                          }}
                        >
                          {block.label}
                        </div>
                        <div
                          className='font-semibold text-white card-row-value'
                          style={{ fontSize: valueSize }}
                        >
                          {block.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className='mt-8 pt-4 border-t uppercase text-amber-200/70 card-footer'
                    style={{
                      borderColor: `rgba(255,255,255,${footerBorderOpacity})`,
                      fontSize: footerSize,
                      letterSpacing: `${titleSpacing}em`,
                    }}
                  >
                    {footer}
                  </div>
                  <div
                    className='absolute -bottom-6 left-1/2 h-12 w-32 -translate-x-1/2 rounded-full border border-white/10'
                    style={{
                      background: "linear-gradient(140deg, #111 0%, #3d2a00 80%)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-6 shadow-2xl'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-bold'>HTML 출력</h2>
                <button
                  type='button'
                  onClick={() => {
                    if (!exportedHtml) return;
                    navigator.clipboard?.writeText(exportedHtml);
                  }}
                  className='rounded-full border border-white/20 px-3 py-1 text-xs text-slate-200 hover:border-amber-300'
                >
                  Copy
                </button>
              </div>
              <p className='text-xs text-slate-400 mt-2'>
                버튼을 누르면 현재 카드의 HTML/CSS가 문자열로 생성됩니다.
              </p>
              <textarea
                className='mt-3 w-full min-h-[220px] rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-xs text-slate-200'
                value={exportedHtml}
                readOnly
              />
            </div>
          </section>

          <section className='space-y-6 lg:w-1/2 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto lg:pr-2 scrollbar-slim'>
            <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-6 shadow-2xl'>
              <h2 className='text-lg font-bold mb-4'>카드 정보</h2>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-sm text-slate-300'>
                  카드 타이틀
                  <input
                    className='mt-2 w-full rounded-2xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white'
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </label>
                <label className='text-sm text-slate-300'>
                  서브 타이틀
                  <input
                    className='mt-2 w-full rounded-2xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white'
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                  />
                </label>
                <label className='text-sm text-slate-300'>
                  푸터 라벨
                  <input
                    className='mt-2 w-full rounded-2xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white'
                    value={footer}
                    onChange={(event) => setFooter(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-6 shadow-2xl'>
              <h2 className='text-lg font-bold mb-4'>순서 & 내용 편집</h2>
              <div className='space-y-4'>
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    draggable
                    onDragStart={() => setDraggedId(block.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (!draggedId || draggedId === block.id) return;
                      setBlocks((prev) => reorderBlocks(prev, draggedId, block.id));
                      setDraggedId(null);
                    }}
                    className='rounded-2xl border border-white/10 bg-slate-950/60 p-4 flex flex-col gap-3'
                  >
                    <div className='text-xs uppercase tracking-[0.3em] text-slate-500'>
                      Drag me
                    </div>
                    <label className='text-xs text-slate-400'>
                      라벨
                      <input
                        className='mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-white text-sm'
                        value={block.label}
                        onChange={(event) =>
                          handleBlockChange(block.id, "label", event.target.value)
                        }
                      />
                    </label>
                    <label className='text-xs text-slate-400'>
                      값
                      <input
                        className='mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-white text-sm'
                        value={block.value}
                        onChange={(event) =>
                          handleBlockChange(block.id, "value", event.target.value)
                        }
                      />
                    </label>
                    <button
                      type='button'
                      onClick={() => handleBlockRemove(block.id)}
                      className='self-start text-xs text-rose-300 hover:text-rose-200'
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-6 shadow-2xl'>
              <h2 className='text-lg font-bold mb-4'>스타일 조정</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <label className='text-sm text-slate-300'>
                  테마
                  <select
                    className='mt-2 w-full rounded-2xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white'
                    value={themeId}
                    onChange={(event) =>
                      setThemeId(event.target.value as ThemeOption["id"])
                    }
                  >
                    {THEMES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className='text-sm text-slate-300'>
                  텍스트 정렬
                  <div className='mt-2 flex rounded-2xl border border-white/10 bg-slate-900/60 p-1'>
                    {(["left", "center"] as const).map((value) => (
                      <button
                        key={value}
                        type='button'
                        onClick={() => setTextAlign(value)}
                        className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold ${
                          textAlign === value
                            ? "bg-white text-slate-900"
                            : "text-slate-300"
                        }`}
                      >
                        {value.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </label>
                <RangeField
                  label='라운드'
                  value={radius}
                  min={16}
                  max={44}
                  onChange={setRadius}
                  unit='px'
                />
                <RangeField
                  label='패딩'
                  value={padding}
                  min={18}
                  max={36}
                  onChange={setPadding}
                  unit='px'
                />
                <RangeField
                  label='섀도우'
                  value={shadow}
                  min={8}
                  max={40}
                  onChange={setShadow}
                  unit='px'
                />
              </div>
              <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <RangeField
                  label='타이틀 크기'
                  value={titleSize}
                  min={10}
                  max={18}
                  onChange={setTitleSize}
                  unit='px'
                />
                <RangeField
                  label='서브 타이틀 크기'
                  value={subtitleSize}
                  min={12}
                  max={22}
                  onChange={setSubtitleSize}
                  unit='px'
                />
                <RangeField
                  label='라벨 크기'
                  value={labelSize}
                  min={9}
                  max={14}
                  onChange={setLabelSize}
                  unit='px'
                />
                <RangeField
                  label='값 크기'
                  value={valueSize}
                  min={12}
                  max={18}
                  onChange={setValueSize}
                  unit='px'
                />
                <RangeField
                  label='푸터 크기'
                  value={footerSize}
                  min={9}
                  max={14}
                  onChange={setFooterSize}
                  unit='px'
                />
                <RangeField
                  label='타이틀 자간'
                  value={titleSpacing}
                  min={0.1}
                  max={0.6}
                  step={0.05}
                  onChange={setTitleSpacing}
                  unit='em'
                />
                <RangeField
                  label='라벨 자간'
                  value={labelSpacing}
                  min={0.05}
                  max={0.4}
                  step={0.05}
                  onChange={setLabelSpacing}
                  unit='em'
                />
                <RangeField
                  label='행 간격'
                  value={rowGap}
                  min={8}
                  max={22}
                  onChange={setRowGap}
                  unit='px'
                />
                <RangeField
                  label='헤더 선 투명도'
                  value={headerBorderOpacity}
                  min={0.05}
                  max={0.35}
                  step={0.05}
                  onChange={setHeaderBorderOpacity}
                />
                <RangeField
                  label='푸터 선 투명도'
                  value={footerBorderOpacity}
                  min={0.05}
                  max={0.35}
                  step={0.05}
                  onChange={setFooterBorderOpacity}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <style jsx>{`
        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(40px);
          opacity: 0.35;
          animation: drift 14s ease-in-out infinite;
        }
        .orb--one {
          width: 280px;
          height: 280px;
          background: ${theme.accent};
          top: 8%;
          left: 6%;
          animation-delay: 0s;
        }
        .orb--two {
          width: 220px;
          height: 220px;
          background: ${theme.text};
          top: 30%;
          right: 8%;
          animation-delay: 2s;
        }
        .orb--three {
          width: 320px;
          height: 320px;
          background: ${theme.glow};
          bottom: 6%;
          left: 20%;
          animation-delay: 4s;
        }
        .floating-card {
          animation: float 8s ease-in-out infinite;
        }
        @keyframes drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(20px, -18px, 0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

const RangeField = ({
  label,
  value,
  min,
  max,
  onChange,
  step = 1,
  unit,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  step?: number;
  unit?: string;
}) => (
  <label className='text-sm text-slate-300'>
    {label}{" "}
    <span className='text-xs text-slate-500'>
      {value}
      {unit ?? ""}
    </span>
    <input
      type='range'
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className='mt-2 w-full'
    />
  </label>
);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const buildExportHtml = ({
  theme,
  title,
  subtitle,
  footer,
  radius,
  padding,
  shadow,
  textAlign,
  blocks,
  titleSize,
  subtitleSize,
  labelSize,
  valueSize,
  footerSize,
  titleSpacing,
  labelSpacing,
  rowGap,
  headerBorderOpacity,
  footerBorderOpacity,
}: {
  theme: ThemeOption;
  title: string;
  subtitle: string;
  footer: string;
  radius: number;
  padding: number;
  shadow: number;
  textAlign: "left" | "center";
  blocks: CardBlock[];
  titleSize: number;
  subtitleSize: number;
  labelSize: number;
  valueSize: number;
  footerSize: number;
  titleSpacing: number;
  labelSpacing: number;
  rowGap: number;
  headerBorderOpacity: number;
  footerBorderOpacity: number;
}) => {
  const rows = blocks
    .map(
      (block) => `
      <div class="row">
        <div class="row-label">${escapeHtml(block.label)}</div>
        <div class="row-value">${escapeHtml(block.value)}</div>
      </div>`
    )
    .join("");

  const cardMarkup = `<div class="card">
  <div class="card-header">
    <div class="card-title">${escapeHtml(title)}</div>
    <div class="card-subtitle">${escapeHtml(subtitle)}</div>
  </div>
  <div class="card-body">
    ${rows}
  </div>
  <div class="card-footer">${escapeHtml(footer)}</div>
</div>`;
  const serializedMarkup = JSON.stringify(cardMarkup);

  return `<!doctype html>
<div id="card-root"></div>
<script>
  const cardMarkup = ${serializedMarkup};
  document.getElementById("card-root").innerHTML = cardMarkup;
</script>
<style>
  .card {
    background: ${theme.surface};
    color: ${theme.text};
    border-radius: ${radius}px;
    padding: ${padding}px;
    box-shadow: 0 24px ${shadow}px rgba(0,0,0,0.45), 0 0 80px ${theme.glow};
    text-align: ${textAlign};
    font-family: "NanumSquare", system-ui, sans-serif;
  }
  .card-header {
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,${headerBorderOpacity});
  }
  .card-title {
    font-size: ${titleSize}px;
    text-transform: uppercase;
    letter-spacing: ${titleSpacing}em;
    color: ${theme.muted};
  }
  .card-subtitle {
    font-size: ${subtitleSize}px;
    font-weight: 600;
    margin-top: 6px;
  }
  .card-body {
    margin-top: 18px;
    display: grid;
    gap: ${rowGap}px;
  }
  .row-label {
    font-size: ${labelSize}px;
    text-transform: uppercase;
    letter-spacing: ${labelSpacing}em;
    color: ${theme.accent};
  }
  .row-value {
    font-size: ${valueSize}px;
    font-weight: 600;
    color: ${theme.text};
    margin-top: 4px;
  }
  .card-footer {
    margin-top: 24px;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,${footerBorderOpacity});
    font-size: ${footerSize}px;
    text-transform: uppercase;
    letter-spacing: ${titleSpacing}em;
    color: ${theme.muted};
  }
</style>`;
};
