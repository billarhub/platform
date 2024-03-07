import { Pagination } from '../models';

type TCalculatePagination = {
    current: number;
    limit: number;
    total: number;
};

export function calculatePagination({
    pageInfo,
}: Partial<Pagination>): TCalculatePagination {
    if (!pageInfo) {
        throw new Error("pageInfo is undefined");
    }

    const { currentPage, perPage, itemCount: count } = pageInfo;
    const current = currentPage * perPage - perPage + 1;
    const limit =
        currentPage * perPage - perPage + perPage <= count
            ? currentPage * perPage - perPage + perPage
            : count;
    const total = count;
    return {
        current,
        limit,
        total,
    };
}
