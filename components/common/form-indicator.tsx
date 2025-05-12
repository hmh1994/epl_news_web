export function FormIndicator({ result }: { result: string }) {
  let bgColor = "";
  switch (result) {
    case "W":
      bgColor = "bg-green-500";
      break;
    case "D":
      bgColor = "bg-yellow-500";
      break;
    case "L":
      bgColor = "bg-red-500";
      break;
    default:
      bgColor = "bg-gray-300";
  }

  return (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${bgColor}`}
    >
      {result}
    </div>
  );
}
