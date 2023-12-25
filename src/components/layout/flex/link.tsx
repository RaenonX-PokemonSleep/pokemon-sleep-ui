import {UrlObject} from 'url';

import React, {HTMLAttributeAnchorTarget} from 'react';

import {FlexCommonProps} from '@/components/layout/flex/type';
import {getFlexStyles} from '@/components/layout/flex/utils';
import {NextLink} from '@/components/shared/common/link/main';


type Props = FlexCommonProps & {
  href: string | UrlObject,
  target?: HTMLAttributeAnchorTarget,
  scroll?: boolean,
  prefetch?: boolean,
};

const FlexLinkInternal = ({
  direction = 'row',
  noFullWidth = true,
  href,
  target,
  scroll,
  prefetch,
  children,
  ...props
}: React.PropsWithChildren<Props>, ref: React.ForwardedRef<HTMLAnchorElement>) => (
  <NextLink
    ref={ref}
    href={href}
    className={getFlexStyles(direction, {noFullWidth, ...props})}
    target={target}
    scroll={scroll}
    prefetch={prefetch}
  >
    {children}
  </NextLink>
);

export const FlexLink = React.forwardRef(FlexLinkInternal);
