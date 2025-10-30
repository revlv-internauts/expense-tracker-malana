import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function FormatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h24'
    })
}