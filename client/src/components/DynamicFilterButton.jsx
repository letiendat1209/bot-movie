/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react'; // Thay thế bằng thư viện icon bạn đang dùng

const DynamicFilterButton = ({ onClick }) => {
    return (
        <div
            className="fixed bottom-3 right-3 z-50 h-8 w-12 overflow-hidden rounded-full border border-gray-500 bg-black/50 text-[14px] font-extralight text-white transition-all duration-300 hover:w-[135px]"
            onClick={onClick} // Kích hoạt sự kiện khi nhấp vào nút
        >
            <div className="flex h-full w-[130px] cursor-pointer items-center gap-1 px-1">
                <Sparkles className="mx-2 h-6 w-6" />
                <span className="whitespace-nowrap"> Dynamic filter </span>
            </div>
        </div>
    );
};

export default DynamicFilterButton;
