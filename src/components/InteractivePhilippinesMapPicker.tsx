"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { provinces } from "@/data/provinces";
import { provincePaths } from "@/data/provincePaths";

function marketScoreToColor(score: number, min: number, max: number) {
  const lightness = 85 - ((score - min) / Math.max(max - min, 1)) * 50;
  return `hsl(217, 96%, ${lightness}%)`;
}

export default function InteractivePhilippinesMapPicker() {
  const [hovered, setHovered] = useState<null | { id: string; name: string; x: number; y: number }>(null);
  const router = useRouter();
  const scores = provinces.map(p => p.marketScore ?? 0);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white"
      style={{ width: "100vw", height: "100vh", minHeight: "100vh", minWidth: "100vw", overflow: "hidden" }}>
      <svg
        viewBox="0 0 1000 1200"
        width="90vw"
        height="auto"
        style={{ maxWidth: "1400px", minHeight: "90vh", display: "block" }}
      >
        {(provincePaths || []).map((prov) => {
          const province = provinces.find((p) => p.id === prov.id);
          const score = province?.marketScore ?? minScore;
          const isHovered = hovered?.id === prov.id;
          let fill = marketScoreToColor(score, minScore, maxScore);
          if (isHovered) fill = "#2563eb";
          return (
            <path
              key={prov.id}
              id={prov.id}
              d={prov.d}
              fill={fill}
              stroke="#fff"
              strokeWidth={0.5}
              style={{ cursor: "pointer", transition: "fill 0.2s" }}
              onMouseEnter={e => {
                setHovered({
                  id: prov.id,
                  name: province?.name || prov.id,
                  x: (e as React.MouseEvent).clientX,
                  y: (e as React.MouseEvent).clientY,
                });
              }}
              onMouseMove={e => {
                setHovered(old =>
                  old
                    ? { ...old, x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY }
                    : null
                );
              }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => router.push(`/admin/analytics/market/province/${(province?.name ?? prov.id).replace(/\s+/g, "_")}`)}
            />
          );
        })}
      </svg>
      {/* Tooltip at mouse pointer */}
      {hovered && (
        <div
          style={{
            position: "fixed",
            top: hovered.y + 15,
            left: hovered.x + 12,
            pointerEvents: "none",
            background: "rgba(30,64,175,0.95)",
            color: "white",
            padding: "8px 18px",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: 500,
            zIndex: 1000,
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.13)",
            whiteSpace: "nowrap",
            maxWidth: "90vw",
          }}
        >
          {hovered.name}
        </div>
      )}
      {/* Fixed legend at bottom right */}
      <div
        style={{
          position: "fixed",
          right: 40,
          bottom: 40,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "18px 28px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
          zIndex: 101,
          minWidth: 220,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Market Score</div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <div style={{
            width: 110,
            height: 20,
            background: `linear-gradient(to right, ${marketScoreToColor(minScore, minScore, maxScore)}, ${marketScoreToColor(maxScore, minScore, maxScore)})`,
            marginRight: 12,
            borderRadius: 6,
            border: "1px solid #e5e7eb",
          }} />
          <span style={{ fontWeight: 400, color: "#1e293b" }}>Low → High</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 400, color: "#64748b", fontSize: 16 }}>
          <span>{minScore}</span>
          <span>{maxScore}</span>
        </div>
        <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Darker = Higher score</div>
      </div>
    </div>
  );
}