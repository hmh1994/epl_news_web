import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export function FullTableBtn({ link }: { link: string }) {
  return (
    <Link href={link}>
      <Button
        variant='outline'
        className='flex items-center gap-1 cursor-pointer hover:bg-secondary hover:text-white'
      >
        Full Table <ChevronRight className='h-4 w-4' />
      </Button>
    </Link>
  );
}
