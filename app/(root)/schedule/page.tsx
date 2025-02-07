import dynamic from "next/dynamic";

const DetailSchedule = dynamic(
  () => import("@/app/components/schedule/detail-schedule"),
  { ssr: false }
);

export default function Schedule() {
  return (
    <div className='bg-neutral-700 grid  gap-6 w-full px-4 pt-10 mb-10'>
      <div className={`bg-neutral-800 rounded-lg p-2 h-content mb-3`}>
        <DetailSchedule />
      </div>
    </div>
  );
}
