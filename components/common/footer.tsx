import Image from "next/image";
import { Link } from "@/src/i18n/routing";

export function Footer() {
  return (
    <footer className='border-t bg-muted'>
      <div className='container py-8 md:py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Image
                src={"/resource/logo-dark.png"}
                alt={"logo"}
                width={50}
                height={50}
              />
              <span className='text-xl font-bold'>INFOOTBALL</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              The ultimate community for football fans to discuss, share, and
              stay updated with everything football.
            </p>
          </div>
          <div>
            <h3 className='font-medium mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  News
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Fixtures
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Community
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Live Scores
                </Link>
              </li>
            </ul>
          </div>
          {/* <div>
              <h3 className='font-medium mb-4'>Community</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'
                  >
                    Forums
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'
                  >
                    Match Threads
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'
                  >
                    Fantasy Leagues
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'
                  >
                    Fan Groups
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'
                  >
                    Predictions
                  </Link>
                </li>
              </ul>
            </div> */}
          <div>
            <h3 className='font-medium mb-4'>Connect With Us</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Twitter
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Facebook
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Instagram
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  YouTube
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} INFOOTBALL. All rights reserved.
          </p>
          <div className='flex gap-4 text-sm'>
            <Link href='#' className='hover:text-primary transition-colors'>
              Privacy Policy
            </Link>
            <Link href='#' className='hover:text-primary transition-colors'>
              Terms of Service
            </Link>
            <Link href='#' className='hover:text-primary transition-colors'>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
