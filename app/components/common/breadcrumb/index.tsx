interface BreadcrumbPathObj {
  pathLink?: string;
  pathName: string;
}

interface IProps {
  breadcrumbPath: Array<BreadcrumbPathObj>;
}

export default function Breadcrumb({ breadcrumbPath }: IProps) {
  const pathLength = breadcrumbPath.length;
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        {breadcrumbPath.map((breadcrumb: BreadcrumbPathObj, idx: number) => {
          const isFirst = idx === 0;
          const isEnd = pathLength - 1 === idx;
          return (
            <li key={breadcrumb.pathName}>
              <div className='flex items-center'>
                {!isFirst && (
                  <svg
                    className='rtl:rotate-180 w-3 h-3 text-gray-400 mx-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 9 4-4-4-4'
                    />
                  </svg>
                )}
                {!isEnd && (
                  <a
                    href={breadcrumb.pathLink}
                    className='ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white'
                  >
                    {breadcrumb.pathName}
                  </a>
                )}
                {isEnd && (
                  <span className='ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400'>
                    {breadcrumb.pathName}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
