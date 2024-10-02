import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip } from "@material-tailwind/react";
import { IconEdit } from '../../../icon/Icon';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function MovieCardList({ movie, location, onClick }) {
    const title = [
        {title: "Tình trạng", value: movie.episode_current},
        {title: "Số tập", value: movie.episode_total},
        {title: "Thời lượng", value: movie.time},
        {title: "Năm phát hành", value: movie.Year.year_name},
        {title: "Chất lượng", value: movie.quality},
        {title: "Ngôn ngữ", value: movie.lang},
        {title: "Đạo diễn", value: movie.Directors.length>0?movie.Directors.map((director)=>director.dir_name).join(", "):"Đang cập nhật"},
        {title: "Diễn viên", value: movie.Actors.length>0&&movie.Actors.map((actor)=>actor.act_name).join(", ")},
        {title: "Thể loại", value: movie.Type.type_name},
        {title: "Danh mục", value: movie.Categories.length>0&&movie.Categories.map((cat)=>cat.cat_name).join(", ")},
        {title: "Quốc gia", value: movie.Countries.length>0?movie.Countries.map((ctr)=>ctr.ctr_name).join(", "):"Đang cập nhật"}];

    const navigate = useNavigate();

    const handleShowMovieDetail = () => {
        navigate(`/admin/movie-detail/${movie.mov_slug}`, { state: { location } }); // Navigate and pass movie data
    };

    return (
    <div className={`relative px-6 py-4 my-3 rounded-md bg-[#202c3c]`} onClick={onClick}>
        <div className="flex flex-col justify-center items-center mb-2 cursor-pointer" onClick={handleShowMovieDetail}>
            <p className='line-clamp-1 font-bold text-[12px] mobile-l:text-[16px] text-[#8b5cf6]'>{movie.mov_name.toUpperCase()}</p>
            <span className='line-clamp-1 font-normal text-[10px] mobile-l:text-[14px] text-[#1496d5]'>{movie.ori_name}</span>
        </div>

        <hr />

        <div className='flex my-2 items-center'>
            <div className="hidden mobile-s:flex justify-center items-start">
                <ImageUpload url={movie.poster_url}/>
            </div>
            <div className="w-full text-[11px] mobile-l:text-[15px]">
                {title.map((item, index) => {
                return (
                    <Content key={index} title={item.title} value={item.value} />
                )
                })}
            </div>
        </div>

        <div className='absolute top-2 tablet-s:top-2 right-4 mt-2 mr-2'>
            <Chip icon={<IconEdit />} onClick={handleShowMovieDetail} variant="gradient" value="Chỉnh sửa" color='purple' 
            className="hidden tablet-m:block rounded-xl font-md py-2 px-3 cursor-pointer text-[6px] tablet-s:text-[13px]" />
        </div>
    </div>
    ) 
}

const Content = ({ title, value }) => {
    return(
        <>
            <div className="flex gap-5 py-[0.5px]">
                <div className='w-[110px] mobile-l:w-[150px]'>
                    <p className='line-clamp-1 text-[9px] mobile-l:text-[12px] laptop-m:text-[14px] font-medium text-[#1496d5]'>{title}</p>
                </div>
                <div className='w-[90%] flex-wrap'>
                    <span className='line-clamp-1 text-[9px] mobile-l:text-[12px] laptop-m:text-[14px] font-normal text-white'>{value}</span>
                </div>
            </div>
        </>
    )
}
  
// ImageUpload Component to handle poster and thumbnail
const ImageUpload = ({ url }) => (
    <div className={`flex gap-4 items-center h-[120px] w-[90px] mobile-l:h-[200px] mobile-l:w-[130px] laptop-m:h-[260px] laptop-m:w-[160px] mr-3 mb-1`}>
        <ImagePreview url={url} alt="Poster"/>
    </div>
);
  
  // ImagePreview Component
const ImagePreview = ({ url }) => (
    <LazyLoadImage src={url}
        effect="blur"
        className={`w-full h-full border rounded shadow object-cover`}
    />
);