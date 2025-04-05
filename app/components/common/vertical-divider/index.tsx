import React from "react";

interface VerticalDividerProps {
  // 세로 구분선의 높이 (Tailwind 높이 클래스, 예: h-6, h-8 등)
  height?: string;
  // 구분선의 색상 (Tailwind border 색상 클래스, 예: border-gray-400)
  borderColor?: string;
  // 좌우 마진 (Tailwind margin 클래스, 예: mx-2)
  marginX?: string;
}

const VerticalDivider: React.FC<VerticalDividerProps> = ({
  height = "h-6",
  borderColor = "border-neutral-500",
  marginX = "mx-2",
}) => {
  return <div className={`${height} ${borderColor} border-l ${marginX}`} />;
};

export default VerticalDivider;
