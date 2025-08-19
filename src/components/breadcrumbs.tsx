'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { IconSlash } from '@tabler/icons-react';
import { Fragment } from 'react';

type DisplayCrumb = { title: string; link?: string };

export function Breadcrumbs() {
  const items = useBreadcrumbs();
  if (!items || items.length === 0) return null;

  // convert to display model
  const base: DisplayCrumb[] = items.map((i) => ({
    title: i.title,
    link: i.link
  }));

  // keep index 0 & 1, skip index 2 (ID)
  let displayItems: DisplayCrumb[] = base;
  if (base.length >= 3) {
    const keep = base.slice(0, 2);
    const action = base[3] ?? { title: 'View' as const }; // link optional
    displayItems = [...keep, action];
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {displayItems.map((item, index) => (
          <Fragment key={`${item.title}-${index}`}>
            {index !== displayItems.length - 1 ? (
              <>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href={item.link ?? '#'}>
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block'>
                  <IconSlash />
                </BreadcrumbSeparator>
              </>
            ) : (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
