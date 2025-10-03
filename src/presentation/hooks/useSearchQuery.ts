'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSearchQuery() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setQuery = useCallback(
        (query: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (query) {
                params.set('query', query);
                params.set('page', '1'); // Reset pagination
            } else {
                params.delete('query');
            }

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [pathname, router, searchParams]
    );

    const setCategory = useCallback(
        (category: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('category', category);
            params.set('page', '1');

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [pathname, router, searchParams]
    );

    return {
        query: searchParams.get('query') || '',
        category: searchParams.get('category') || 'all',
        setQuery,
        setCategory,
    };
}
