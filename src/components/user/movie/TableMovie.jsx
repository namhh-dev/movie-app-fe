import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function TableMovie({ colDefs, movies }) {
  return (
    <table class="w-full min-w-[750px] mobile-s:min-w-[850px] mobile-xl:min-w-[1050px] mb-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
        <thead class="text-xs text-white uppercase bg-[#202c3c] dark:bg-gray-700 dark:text-gray-400">
            <tr className='border-b border-gray-700'>{colDefs.map((col) => {
                return (
                    <th scope="col" class="px-6 py-3 text-[9px] laptop-l:text-[12px]">{col.headerName}</th>
                )
            })}
            </tr>
        </thead>
        <tbody className='w-full'>
            {!movies.length>0
            ?
            <tr><td colSpan="6" className='py-4 text-white font-medium'>Không có phim nào để hiển thị</td></tr>
            :
                movies.map((movie) => {
                    return (
                        <tr key={movie.mov_id} class="bg-[#202c3c] border-b border-gray-700">
                            <td class="px-6 py-1">
                                <Link to={{pathname: `/movie/detail/${movie.mov_slug}`}} className='flex items-center'>
                                    <ImageUpload url={movie.poster_url}/>
                                    <div className='cursor-pointer'>
                                        <p className='text-[12px] mobile-m:text-[13px] laptop-l:text-[16px] text-[#8b5cf6] font-bold hover:text-blue-700 line-clamp-1'>{movie.mov_name}</p>
                                        <p className='text-white text-[11px] mobile-m:text-[12px] laptop-l:text-[15px] line-clamp-1'>{movie.ori_name}</p>
                                    </div>
                                </Link>
                            </td>
                            <td class="px-6 py-1 text-white text-[12px] mobile-m:text-[13px] laptop-l:text-[15px]">{movie.Year?movie.Year.year_name:"Đang cập nhật"}</td>
                            <td class="px-6 py-1 min-w-[110px]">
                                {movie.episode_current&&<p className='text-green-400 bg-[#131b24] rounded-full px-3 py-[3px]'>
                                    <span className='line-clamp-1 text-[12px] mobile-m:text-[13px] laptop-l:text-[15px]'>{movie.episode_current}</span>
                                </p>}
                                
                            </td>
                            <td class="px-6 py-1 text-white min-w-[110px]"><span className='line-clamp-1 text-[12px] mobile-m:text-[13px] laptop-l:text-[15px]'>{movie.Type?movie.Type.type_name:"Đang cập nhật"}</span></td>
                            <td class="px-6 py-1 text-white"><span className='line-clamp-1 text-[12px] mobile-m:text-[13px] laptop-l:text-[15px]'>{movie.Countries.length>0?movie.Countries[0].ctr_name:"Đang cập nhật"}</span></td>
                            <td class="px-6 py-1 text-red-600"><span className='line-clamp-1 text-[12px] mobile-m:text-[13px] laptop-l:text-[15px]'>{movie.updatedAt}</span></td>
                    </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}

// ImageUpload Component to handle poster and thumbnail
const ImageUpload = ({ url }) => (
    <div className={`flex gap-4 items-center h-[80px] w-[60px] min-w-[60px] w mr-3 mb-1`}>
        <div className={`flex-1 h-full p-1 rounded-md flex items-center justify-center object-cover`}> 
            <ImagePreview url={url} alt="Poster"/>
        </div>
    </div>
);

const ImagePreview = ({ url }) => (
    <LazyLoadImage src={url}
        PlaceholderSrc={url}
        effect="blur"
        className={`w-full h-full border rounded shadow object-cover`}
    />
);
