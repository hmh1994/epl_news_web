import Image from "next/image";
import ResponsiveContainer from "../responsive-container";
import BaseText from "../typography/base-text";

const Footer = () => {
  return (
    <div className={"bg-zinc-900"}>
      <ResponsiveContainer>
        <div className='h-[100px] flex justify-center'>
          <div className='content-center'>
            <Image
              src={"/resource/logo.png"}
              width={60}
              height={60}
              alt={"footer-logo"}
            />
          </div>
          <div className='content-center '>
            <BaseText cssOption='text-white!'>INFOOTBALL</BaseText>
            <div className={"text-[12px] text-white"}>
              ©Copyright 2025 Infootball
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Footer;
