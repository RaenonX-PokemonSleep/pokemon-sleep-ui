import React from 'react';

import {Link} from '@/components/i18n/exports';


type Props = React.ComponentProps<typeof Link>;

const NextLinkInternal = ({
  href,
  scroll,
  prefetch,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLAnchorElement>) => (
  <Link
    ref={ref}
    href={href}
    scroll={scroll ?? false}
    prefetch={prefetch ?? false}
    {...props}
  >
    {children}
  </Link>
);

export const NextLink = React.forwardRef(NextLinkInternal);
