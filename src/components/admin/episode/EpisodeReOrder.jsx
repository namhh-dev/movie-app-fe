import React, { useEffect, useState } from "react";
import { IconClear, IconSave } from "../../icon/Icon";
import { Reorder } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { getAllEpisodeByMovieId, updateEpisodeSortOrder } from "../../../services/episodeService";
import { Alert } from "../../alert/Alert";
import Loading from "../../loading/Loading";

export default function EpisodeReOrder({ movId, handleCancel, setIsUpdated }) {
    const [isLoading, setIsLoading] = useState(false);
    const [initialEpisodes, setInitialEpisodes] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [episodeToUpdate, setEpisodeToUpdate] = useState([]);

    // get all episodes from API
    useEffect(() => {
        const fetchEpisode = async () => {
            setIsLoading(true);
            try {
                const fetchedEpisode = await getAllEpisodeByMovieId(movId); // Fetch all episode by movieID
                setInitialEpisodes(fetchedEpisode.episodes);
                setEpisodes(fetchedEpisode.episodes);
            } catch (error) {
                console.error("Error fetching episode data", error);
            } finally {
                setIsLoading(false);
            }
        };
        if(movId){
            fetchEpisode();
        }
    }, [movId]);
    
    // Reorder handler function
    const handleReorder = (newOrder) => {
        // Update sort_order to new order
        const updatedEpisodes = newOrder.map((episode, index) => ({
            ...episode,
            sort_order: index + 1,  // Sort order starts from 1
        }));
        // Update episode list in state
        setEpisodes(updatedEpisodes);

        // Compare based on ep_id and sort_order to find episodes to update
        const episodesUpdates = updatedEpisodes.filter((newEpisode) => {
            const initialEpisode = initialEpisodes.find(
            (initialEp) => initialEp.ep_id === newEpisode.ep_id
            );
            return newEpisode.sort_order !== initialEpisode.sort_order;
        });
        setEpisodeToUpdate(episodesUpdates);
    };

    const handleSave = () => {
        // Send update requests for episodes with change in sort_order
        if (episodeToUpdate.length > 0) {
            // Check ep_id and sort_order values
            const validEpisodesToUpdate = episodeToUpdate.filter(episode => 
                episode.ep_id != null && episode.ep_id !== '' && 
                episode.sort_order != null && episode.sort_order !== ''
            );
            if (validEpisodesToUpdate.length > 0) {
                episodeToUpdate.forEach(async(episode) => {
                    try {
                        await updateEpisodeSortOrder(episode.ep_id, episode.sort_order);
                    } catch (error) {
                        Alert(2000, 'Thông báo', 'Cập nhật tập phim thất bại', 'error', 'OK');
                        throw new Error('Cập nhật tập phim thất bại');
                    }
                });
                handleCancel();
                setIsUpdated(true);
                Alert(2000, 'Thông báo', 'Cập nhật thứ tự tập phim thành công', 'success', 'OK');
            } else {
                Alert(2000, 'Thông báo', 'Không thể cập nhật tập phim', 'error', 'OK');
            }
        } else {
            Alert(2000, 'Thông báo', 'Chưa có thay đổi. vui lòng sắp xếp ít nhất 1 tập', 'warning', 'OK');
        }
    }

    return (
        !isLoading&&initialEpisodes?
        <Reorder.Group axis="y" values={episodes} onReorder={handleReorder}>
            <div className="w-full max-h-[750px] overflow-auto mb-3">
                {episodes.map((episode) => (
                    <EpisodeCardReOrder
                        key={episode.ep_id}
                        episode={episode}
                    />
                ))}
            </div>
            <div className="flex justify-end gap-4">
                <Button onClick={handleCancel} variant="gradient" color='red' className="rounded-full flex items-center gap-2 font-md text-[10px] mobile-xl:text-[12px] px-4 py-2 mobile-xl:px-6">
                    <IconClear />Hủy
                </Button>
                <Button onClick={handleSave} variant="gradient" color='teal' className="rounded-full flex items-center gap-2 font-md text-[10px] mobile-xl:text-[12px] px-4 py-2 mobile-xl:px-6">
                    <IconSave />Lưu
                </Button>
            </div>
        </Reorder.Group>
        :
        <Loading />
    );
}

const EpisodeCardReOrder = ({ episode }) => {
    return(
    <Reorder.Item value={episode} as="div" className="mb-2">
        <div className='py-5 px-3 shadow-lg border rounded-md mb-2 bg-gray-300 bg-opacity-30 backdrop-blur'>
            {/* HEADER */}
            <div className='flex justify-between items-center'>
                <span className='font-bold text-[13px] mobile-xl:text-[16px] text-center text-white'>{episode.ep_title}</span>
            </div>
        </div>
    </Reorder.Item>
)}
