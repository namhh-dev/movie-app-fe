import React, { useEffect, useState } from 'react'
import CreateMovieApi from '../../../components/admin/movie/create-movie/CreateMovieApi'
import AdminLayout from '../../../components/admin/AdminLayout';

export default function CreateMovie() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        // When scrolled down, the element will appear
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AdminLayout isVisible={isVisible} index={1}>
            <CreateMovieApi />
        </AdminLayout>
    )
}
