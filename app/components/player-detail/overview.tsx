import VerticalDivider from "../common/vertical-divider";
import PlayerCareer from "./player-career";

export default function Overview() {
  return (
    <div className='gap-4 px-2 my-5'>
      <div>
        <div className='font-black text-3xl text-neutral-100'>
          Personal Details
        </div>
        <div className='rounded-lg border-1 border-neutral-500 p-3 text-neutral-100 mt-5 flex justify-between'>
          <div>Nationality</div>
          <div>Brazil</div>
          <VerticalDivider />
          <div>Birth</div>
          <div>17/08/1993 (31)</div>
          <VerticalDivider />
          <div>Height</div>
          <div>188cm</div>
        </div>

        <div className='font-black text-3xl text-neutral-100 mt-5'>
          Premier League Playing Career
        </div>
        <div>
          <PlayerCareer />
        </div>
      </div>
    </div>
  );
}
