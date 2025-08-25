"use client";

import { useEffect } from "react";
import { Link } from "@/src/i18n/routing";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  // Close sidebar when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-[9999] w-full h-full'
      style={{
        backgroundColor: "#FFFFFF",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className='flex flex-col h-full w-full '>
        <div
          className='flex items-center justify-between p-6 border-b h-16'
          style={{ borderBottomColor: "#e5e7eb" }}
        >
          <div className='flex items-center gap-2'>
            <Image
              src={"/resource/logo-dark.png"}
              alt={"logo"}
              width={50}
              height={50}
            />
            <span className='text-xl font-bold'>INFOOTBALL</span>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            style={{ backgroundColor: "transparent" }}
          >
            <X className='h-6 w-6' style={{ color: "#000000" }} />
            <span className='sr-only'>Close</span>
          </Button>
        </div>

        <nav
          className='flex flex-col p-6 space-y-6 flex-grow'
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Link
            href='/'
            className='text-lg font-medium py-3 px-4 rounded-md hover:bg-accent transition-colors flex items-center'
            onClick={onClose}
            style={{ color: "#000000" }}
          >
            Home
          </Link>
          <Link
            href='/news'
            className='text-lg font-medium py-3 px-4 rounded-md hover:bg-accent transition-colors flex items-center'
            onClick={onClose}
            style={{ color: "#000000" }}
          >
            News
          </Link>
          <Link
            href='/teams'
            className='text-lg font-medium py-3 px-4 rounded-md hover:bg-accent transition-colors flex items-center'
            onClick={onClose}
            style={{ color: "#000000" }}
          >
            Teams
          </Link>
          <Link
            href='/players'
            className='text-lg font-medium py-3 px-4 rounded-md hover:bg-accent transition-colors flex items-center'
            onClick={onClose}
            style={{ color: "#000000" }}
          >
            Players
          </Link>
          <Link
            href='/matches'
            className='text-lg font-medium py-3 px-4 rounded-md hover:bg-accent transition-colors flex items-center'
            onClick={onClose}
            style={{ color: "#000000" }}
          >
            matches
          </Link>
        </nav>

        <div
          className='p-6 border-t space-y-4'
          style={{ borderTopColor: "#e5e7eb", backgroundColor: "#FFFFFF" }}
        >
          {/* <Button
            variant='outline'
            className='w-full py-6 text-lg'
            style={{
              borderColor: "#e5e7eb",
              backgroundColor: "#FFFFFF",
              color: "#000000",
            }}
          >
            Sign In
          </Button> */}
        </div>
      </div>
    </div>
  );
}
