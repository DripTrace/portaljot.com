"use client";

import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { IListing } from "@/types/merchandise/listing";

type Props = {
    currentData: () => IListing[];
    currentPage: number;
    maxPage: number;
    setElement: Dispatch<SetStateAction<Element | null>>;
};

function usePagination(
    data: IListing[],
    selectionsPerPage: number,
    threshold?: number | number[]
): Props {
    const [currentPage, setCurrentPage] = useState(1);
    const [element, setElement] = useState<Element | null>(null);

    const observer = useRef<IntersectionObserver>();
    const prevY = useRef(0);

    const maxPage = Math.ceil(data.length / selectionsPerPage);

    function currentData() {
        const begin = (currentPage - 1) * selectionsPerPage;
        const end = begin + selectionsPerPage;
        return data.slice(undefined, end);
    }

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (prevY.current > y) {
                    setCurrentPage((currentPage) =>
                        Math.min(currentPage + 1, maxPage)
                    );
                }
                prevY.current = y;
            },
            { threshold }
        );
    }, [maxPage, threshold]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver?.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver?.unobserve(currentElement);
            }
        };
    }, [element]);

    return { currentData, currentPage, maxPage, setElement };
}

export default usePagination;
