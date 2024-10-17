/* eslint-disable no-unused-vars */
import { ArrowLeft, Search } from 'lucide-react';
import React from 'react';

function FAQ() {
    const faqItems = [
        {
            question: 'Làm thế nào để đăng ký tài khoản?',
            answer: "Bạn có thể đăng ký tài khoản bằng cách nhấp vào nút 'Đăng ký' ở góc trên bên phải của trang web và điền thông tin cần thiết.",
        },
        {
            question: 'Các gói đăng ký có những gì?',
            answer: "Chúng tôi cung cấp ba gói: Cơ bản, Tiêu chuẩn và Premium. Mỗi gói có các tính năng và giá khác nhau. Bạn có thể xem chi tiết tại trang 'Gói đăng ký'.",
        },
        {
            question: 'Tôi có thể xem phim trên những thiết bị nào?',
            answer: 'Bạn có thể xem phim trên nhiều thiết bị như máy tính, điện thoại thông minh, máy tính bảng và smart TV.',
        },
        {
            question: 'Làm thế nào để hủy đăng ký?',
            answer: "Bạn có thể hủy đăng ký bất kỳ lúc nào bằng cách vào phần 'Tài khoản' và chọn 'Hủy đăng ký'. Bạn vẫn có thể sử dụng dịch vụ đến hết kỳ thanh toán hiện tại.",
        },
    ];

    return (
        <div className="min-h-screen bg-white px-4 py-12 pt-20 text-black dark:bg-slate-800 dark:text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-center justify-between">
                    <button
                        className="flex items-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        onClick={() => (window.location.href = '/')}
                    >
                        <ArrowLeft /> <p className="pl-2">Trở về trang chủ</p>
                    </button>
                    <button
                        className="flex items-center rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                        onClick={() => (window.location.href = '/search')}
                    >
                        <Search /> <p className="pl-2">Tìm kiếm phim</p>
                    </button>
                </div>
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Câu hỏi thường gặp</h1>
                <div className="space-y-6">
                    {faqItems.map((item, index) => (
                        <div key={index} className="overflow-hidden bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">{item.question}</h3>
                            </div>
                            <div className="border-t border-gray-200">
                                <div className="px-4 py-5 text-gray-700 sm:p-6">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQ;
