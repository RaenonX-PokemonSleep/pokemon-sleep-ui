import {UrlObject} from 'url';

import React, {HTMLAttributeAnchorTarget} from 'react';

import {Link} from '@/components/i18n/exports';
import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';


type Props = FlexCommonProps & {
  href: string | UrlObject,
  target?: HTMLAttributeAnchorTarget,
};

const FlexLinkInternal = ({
  direction = 'row',
  noFullWidth = true,
  href,
  target,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLAnchorElement>) => (
  <Link
    ref={ref}
    href={href}
    className={getFlexStyles(direction, {noFullWidth, ...props})}
    target={target}
    scroll={false}
  >
    {children}
  </Link>
);

export const FlexLink = React.forwardRef(FlexLinkInternal);
