import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function MovieCardList({ movie, onClick }) {
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
        {title: "Quốc gia", value: movie.Countries[0].ctr_name}];

    const navigate = useNavigate();

    const handleShowMovieDetail = () => {
        navigate(`/admin/movie-detail/${movie.mov_slug}`, { state: { movie } }); // Navigate and pass movie data
    };

    return (
    <div className={`p-2 my-4 rounded-md bg-[#202c3c]`} onClick={onClick}>
        <div className="flex flex-col justify-center items-center">
            <p className='line-clamp-1 font-bold text-md text-[#8b5cf6]'>{movie.mov_name.toUpperCase()}</p>
            <span className='line-clamp-1 font-normal text-[#1496d5]'>{movie.ori_name}</span>
        </div>

        <hr />

        <div className='flex my-2'>
            <div className="flex justify-center items-start">
                <ImageUpload url={movie.poster_url} width={170} height={270}/>
            </div>
            <div className="w-full">
                {title.map((item, index) => {
                return (
                    <Content key={index} title={item.title} value={item.value} />
                )
                })}
            </div>
        </div>
        <div className='mt-2'>
            <button onClick={handleShowMovieDetail} className="py-3 px-4 bg-blue-800 text-white rounded-md"> Quản lý phim </button>
        </div>
    </div>
    ) 
}

const Content = ({ title, value }) => {
    return(
        <>
            <div className="flex gap-5 py-[0.5px]">
                <div className='w-[150px]'>
                    <p className='line-clamp-1 font-medium text-[#1496d5]'>{title}</p>
                </div>
                <div className='w-[90%] flex-wrap'>
                    <span className='line-clamp-1 font-normal text-white'>{value}</span>
                </div>
            </div>
        </>
    )
}
  
  // ImageUpload Component to handle poster and thumbnail
export const ImageUpload = ({ url, width, height }) => (
    <div className={`flex gap-4 items-center h-[${height}px] mr-3 mb-1`}>
        <div className={`flex-1 h-[${height}px] p-1 rounded-md flex items-center justify-center object-cover`} style={{ flex: '0 0 23%' }}> 
            <ImagePreview url={url} alt="Poster" width={width} height={height}/>
        </div>
    </div>
);
  
  // ImagePreview Component
export const ImagePreview = ({ url, alt, width, height }) => (
    <div className={`w-[${width}px]`}>
        <img src={url} alt={alt} className={`max-w-full h-[${height}px] border rounded shadow object-cover`} onError={(e) => e.target.style.display = 'none'} />
    </div>
);