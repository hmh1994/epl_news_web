import Divider from "../../common/divider";

export default function StadiumInfo() {
  return (
    <div className={"flex flex-col justify-self-center my-auto"}>
      <span className={"text-neutral-100  font-black"}>경기장</span>
      <div className={"flex text-neutral-100  mt-2"}>
        Estadi Olimpic Lluis Compnays
      </div>
      <Divider />
      <div className='flex justify-between'>
        <div className={"px-2 w-fit my-2"}>
          <div className={"text-neutral-100 text-sm  justify-self-center"}>
            55,926
          </div>
          <div className={"text-neutral-100 text-xs justify-self-center"}>
            수용 능력
          </div>
        </div>
        <div className={"px-2 w-fit my-2"}>
          <div className={"text-neutral-100 text-sm  justify-self-center"}>
            1929년
          </div>
          <div className={"text-neutral-100 text-xs justify-self-center"}>
            개장
          </div>
        </div>
        <div className={"px-2 w-fit my-2"}>
          <div className={"text-neutral-100 text-sm  justify-self-center"}>
            잔디
          </div>
          <div className={"text-neutral-100 text-xs justify-self-center"}>
            표면
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
}
