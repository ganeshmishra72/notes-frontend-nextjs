"use client";

import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react";

interface PaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

const Pagination = ({
    currentPage = 3,
    totalPages = 15,
    onPageChange,
}: PaginationProps) => {
    const pages = getPagination(currentPage, totalPages);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            {/* Left */}

            <p className="text-sm text-slate-500">
                Showing page{" "}
                <span className="font-semibold text-slate-800">
                    {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                    {totalPages}
                </span>
            </p>

            {/* Pagination */}

            <div className="flex items-center gap-2 flex-wrap">

                {/* Previous */}

                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        onPageChange?.(currentPage - 1)
                    }
                    className="h-11 px-4 rounded-xl border bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 text-blue-600"
                >
                    <ChevronLeft size={18} />
                    Previous
                </button>

                {/* Page Numbers */}

                {pages.map((page, index) => {

                    if (page === "...") {
                        return (
                            <div
                                key={index}
                                className="h-11 w-11 flex items-center justify-center"
                            >
                                <MoreHorizontal size={18} />
                            </div>
                        );
                    }

                    const active = page === currentPage;

                    return (
                        <motion.button
                            key={`${page}-${index}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onPageChange?.(Number(page))}
                            className={`h-11 w-11 rounded-xl font-semibold transition
                ${active
                                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg"
                                    : "bg-white border hover:border-blue-500 hover:text-blue-600"
                                }`}
                        >
                            {page}
                        </motion.button>
                    );
                })}

                {/* Next */}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        onPageChange?.(currentPage + 1)
                    }
                    className="h-11 px-4 rounded-xl border bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 text-green-600"
                >
                    Next
                    <ChevronRight size={18} />
                </button>

            </div>

        </div>
    );
};

export default Pagination;

/* ---------- Helper ---------- */

function getPagination(
    current: number,
    total: number
): (number | "...")[] {

    if (total <= 7) {
        return Array.from(
            { length: total },
            (_, i) => i + 1
        );
    }

    if (current <= 3) {
        return [1, 2, 3, 4, "...", total];
    }

    if (current >= total - 2) {
        return [
            1,
            "...",
            total - 3,
            total - 2,
            total - 1,
            total,
        ];
    }

    return [
        1,
        "...",
        current - 1,
        current,
        current + 1,
        "...",
        total,
    ];
}