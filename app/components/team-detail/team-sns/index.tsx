import { Facebook, Instagram, X, Youtube } from "lucide-react";

export default function TeamSns() {
  return (
    <div className={"flex flex-col justify-self-center my-auto"}>
      <span className={"text-neutral-100 font-black"}>프로필</span>
      <div className='flex justify-between gap-3'>
        <div className={"p-1 w-fit my-2 bg-neutral-100 rounded-full mx-2"}>
          <X />
        </div>
        <div className={"p-1 w-fit my-2 bg-neutral-100 rounded-full mx-2"}>
          <Facebook />
        </div>
        <div className={"p-1 w-fit my-2 bg-neutral-100 rounded-full mx-2"}>
          <Youtube />
        </div>
        <div className={"p-1 w-fit my-2 bg-neutral-100 rounded-full mx-2"}>
          <Instagram />
        </div>
      </div>
    </div>
  );
}
