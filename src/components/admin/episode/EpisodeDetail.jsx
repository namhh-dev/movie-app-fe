import React, { useEffect, useRef, useState } from 'react';
import { deleteEpisode, getEpisodeByMovieId, updateEpisode } from '../../../services/episodeService';
import { Alert, DeleteAlert } from '../../alert/Alert';
import InputComponent, { FilterInput } from '../../input/InputComponent';
import { Button } from '@material-tailwind/react';
import Loading from '../../loading/Loading';
import { IconMaxize, IconMinimize, IconSave, IconSearch, IconTrash } from '../../icon/Icon';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../pagination/Pagination';
import Scroll from '../../common/Scroll';
import DropDownFilter from '../../common/DropDownFilter';
import EpisodeForm from './EpisodeForm';
import SettingEpisodeMenu from '../../navbar/SettingEpisodeMenu';
import EpisodeReOrder from './EpisodeReOrder';

const EpisodeDetail = React.memo(({ movId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const sectionRef = useRef(null);

    const updateSortParameter = (sortValue) => {
        const url = new URL(window.location);
        url.searchParams.set('sort', sortValue); // Cập nhật hoặc thêm giá trị sort
        return url.pathname + url.search; // Trả về URL mới
    };
    
    const sortOptions = [
        { name: 'Số tập tăng', href: updateSortParameter(1), current: false },
        { name: 'Số tập giảm', href: updateSortParameter(2), current: false },
        { name: 'A-Z', href: updateSortParameter(3), current: true },
    ];

    const params = new URLSearchParams(location.search);
    const currentPage = parseInt(params.get("page")) || 1;
    const sort = params.get("sort") || '';
    const search = params.get("query") || '';

    const [query, setQuery] = useState(search);
    
    const [totalEpisodes, setTotalEpisodes] = useState(0);
    const [totalPages, setTotalPages] = useState(1);    // state total page
    const [episodes, setEpisodes] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [isCreate, setIsCreate] = useState(false);
    const [isReOrder, setIsReOrder] = useState(false);

    const fetchEpisode = async (page) => {
        setIsLoading(true);
        try {
            const fetchedEpisode = await getEpisodeByMovieId(movId, query, sort, page); // Fetch episode by movieID
            setEpisodes(fetchedEpisode.episodes);
            setTotalPages(fetchedEpisode.totalPages);
            setTotalEpisodes(fetchedEpisode.totalEpisodes);
            setIsUpdated(true);
        } catch (error) {
            console.error("Error fetching episode data", error);
        } finally {
            setIsUpdated(false);
            setIsLoading(false);
            if(query||sort){
                sectionRef.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    };

    useEffect(() => {
        fetchEpisode(currentPage);
    }, [currentPage, isUpdated, search, sort]);

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

    // Handle page changes for both search and fetch
    const onPageChange = (page) => {
        if(page !== currentPage){   // Check if the new page is different from the current page
        const params = new URLSearchParams(location.search);
        params.set("page", page); // Cập nhật giá trị page
        navigate(`${location.pathname}?${params.toString()}`);
        fetchEpisode(page);     // Fetch all movies otherwise
        }
    };

    // Handle pagination navigation (next/previous page)
    const handlePagination = (direction) => {
        let newPage = currentPage;
        if (direction === "next" && currentPage < totalPages) {
        newPage = currentPage + 1;
        } else if (direction === "prev" && currentPage > 1) {
        newPage = currentPage - 1;
        }
        onPageChange(newPage);  // Update to the new page
    };

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`${location.pathname}?query=${encodeURIComponent(query)}`);
        }else{
            navigate(location.pathname);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSearch();  // Gọi hàm tìm kiếm khi nhấn Enter
        }
    };

    const handleOpenFormCreate = () => {
        isReOrder&&setIsReOrder(false);
        setIsCreate(!isCreate);
    }

    const handleReOrderOpen = () => {
        isCreate&&setIsCreate(false);
        setIsReOrder(!isReOrder);
    }
    
    return(
        <div ref={sectionRef} className="px-6 py-4 bg-[#202c3c] text-white rounded-md mt-6">
            <SettingEpisodeMenu handleCreateOpen={handleOpenFormCreate} handleReOrderOpen={handleReOrderOpen}/>
            
            {isCreate ?
                <div className='mt-2'>
                    <EpisodeForm movId={movId} setIsUpdated={setIsUpdated} handleCloseForm={()=>{setIsCreate(false);}}/>
                </div>
            :isReOrder ?
                <div className='bg-[#202c3c] rounded-md px-2'>
                    <EpisodeReOrder movId={movId} handleCancel={handleReOrderOpen} setIsUpdated={setIsUpdated}/>
                </div>
            :
            <>
                <div className='grid mobile-l:flex mobile-l:flex-row mobile-l:justify-between items-center py-1 mobile-l:py-4'>
                    <div className='flex justify-end mb-1 w-full'>
                        <div className='flex gap-2 w-full laptop-m:w-[50%]'>
                            <FilterInput name="query" type="text" placeholder="Nhập tên hoặc số tập(1, 2, 3)..." value={query} onKeyDown={handleKeyDown} onChange={(e) => {setQuery(e.target.value)}}/>
                            
                            {/* BUTTON EDIT & DELETE EPISODE */}
                            <Button onClick={handleSearch} variant="gradient" color='teal' className="flex rounded-full items-center gap-1 font-md text-[8px] mobile-xl:text-[11px] p-[7px] mobile-xl:px-3 mobile-xl:py-[7px]">
                                <IconSearch /><span className='hidden mobile-m:block'>Tìm</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <DropDownFilter sortOptions={sortOptions}/>

                {isLoading
                ?
                    <Loading />
                :episodes.length<=0
                ?
                    <div>Không tìm thấy tập nào</div>
                :
                    <div className='flex flex-col gap-3'>
                        {episodes.map((episode)=>{
                            return (
                                <EpisodeCard key={episode.ep_id} episode={episode} setIsUpdated={setIsUpdated} />
                            )
                        })}
                    </div>
                }

                {/* pagination */}
                <div className='mt-3'>
                    {(!isLoading&&totalEpisodes!==0)&&<Pagination currentPage={currentPage} totalDatas={totalEpisodes} totalPages={totalPages} onPageChange={onPageChange} handlePagination={handlePagination}/>}
                </div>
            </>
            }
            <Scroll isVisible={isVisible}/>
        </div>
    )
});
  
const EpisodeCard = ({ episode, setIsUpdated }) => {
    const [isDisplay, setIsDisplay] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // default state episode data
    const defaultState = {title: episode.ep_title, name: episode.ep_name, slug: episode.ep_slug, link: episode.ep_link};
    
    // state of episode data
    const [state, setState] = useState(defaultState);

    // function to update option state (for select inputs like type, category, etc.)
    const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

    // handle update episode
    const handleSave = async () => {
        setIsUpdated(false);
        setIsUpdating(true);
        try {
            // call API to update episode with current episode state
            const result = await updateEpisode({...state, id: episode.ep_id});
            // if episode creation is successful ? reset the form : show an error alert
            if (result&&(result.status === 200 || result.status === 201)) {
                setIsUpdated(true);
                Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
            } else {
                Alert(2000, 'Thông báo', result.data.message||'Không thể cập nhật', 'error', 'OK');
            }
        } catch (error) {
            Alert(2000, 'Thông báo', 'Không thể cập nhật', 'error', 'OK');
        }finally{
            setIsDisplay(true);
            setIsUpdating(false);
        }
    };

    // handle delete episode
    const handleDelete = async () => {
        setIsUpdated(false);
        // call API to update episode with current episode state
        const result = await deleteEpisode(episode.ep_id);
        // if episode creation is successful ? reset the form : show an error alert
        if (result&&(result.status === 200 || result.status === 201)) {
            setIsUpdated(true);
            Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
        } else {
        setIsUpdated(false);
        Alert(2000, 'Thông báo', result.data.message||'Không thể xóa tập phim này', 'error', 'OK');
        }
    }

    return(
        <div className="bg-gray-600 rounded-md p-2 mobile-xl:p-4">
            {/* header */}
            <div onClick={() => setIsDisplay(!isDisplay)} className='flex justify-between items-center'>
                <div className='flex gap-2'>
                    {/* BUTTON EDIT & DELETE EPISODE */}
                    {isDisplay?
                    <IconMinimize onClick={() => setIsDisplay(!isDisplay)} />
                    :
                    <IconMaxize onClick={() => setIsDisplay(!isDisplay)} />
                    }
                </div>

                <div className="flex justify-center items-center">
                    <h2 onClick={() => setIsDisplay(!isDisplay)} className="text-[14px] mobile-xl:text-xl font-bold text-[#8b5cf6] cursor-pointer">{episode.ep_name?episode.ep_name.toUpperCase():"Đang cập nhật"}</h2>
                </div>

                <div className='flex justify-end gap-2'>
                    {/* BUTTON EDIT & DELETE EPISODE */}
                    <Button onClick={() => DeleteAlert(handleDelete)} variant="gradient" color='red' className="rounded-full flex items-center gap-1 font-md text-[8px] mobile-xl:text-[11px] px-2 mobile-xl:px-3 py-1">
                        <IconTrash />Xóa
                    </Button>
                </div>
            </div>
            {/* body */}
            <FormUpdateEpisode isDisplay={isDisplay} isUpdating={isUpdating} handleSave={handleSave} state={state} updateState={updateState}/>
        </div>
    )
}
  
const FormUpdateEpisode = ({ isDisplay, isUpdating, handleSave, state, updateState }) => {
    const handleKeyDown = (e) =>{
        if(e.key==="Enter"){
            handleSave();
        }
    };

    return(
      <div className={`${isDisplay?'flex flex-col':'hidden'} mt-4`}>
        <hr />
        {/* Example of editable inputs for movie details */}
        <InputComponent onKeyDown={handleKeyDown} title="Title" value={state.title?state.title:"Đang cập nhật"} onChange={(e)=>{updateState('title', e.target.value)}} />
        <InputComponent onKeyDown={handleKeyDown} title="Name" value={state.name?state.name:"Đang cập nhật"} onChange={(e)=>{updateState('name', e.target.value)}} />
        <InputComponent onKeyDown={handleKeyDown} title="Slug" value={state.slug?state.slug:"Đang cập nhật"} onChange={(e)=>{updateState('slug', e.target.value)}} />
        <InputComponent onKeyDown={handleKeyDown} title="Link" value={state.link?state.link:"Đang cập nhật"} onChange={(e)=>{updateState('link', e.target.value)}} />
  
        {/* More fields can be added here for editing other movie details */}
        <div className="flex justify-end gap-4">
            <Button disabled={isUpdating?true:false} onClick={handleSave} variant="gradient" color='teal' className="rounded-full flex items-center gap-2 font-md text-[10px] mobile-xl:text-[12px] px-4 py-2 mobile-xl:px-6">
                <IconSave />Lưu
            </Button>
        </div>
      </div>
    )
}

export default EpisodeDetail;