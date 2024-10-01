import React from "react";
import { IconArrowDown, IconArrowUp } from "../icon/Icon";
import { motion } from "framer-motion"

export default function Scroll({ isVisible }) {

  // function to scroll to start page
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0, // end of page
      behavior: "smooth",
    });
  };

  // function to scroll to end page
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  
  return (
    <motion.div className={`fixed bottom-0 right-1`} animate={{ x: 1, y: isVisible?0:140, scale: 1, rotate: 0 }} >
        <div className='fixed right-1 bottom-[35px] mobile-xl:bottom-[50px] z-50 rounded-full p-1 mobile-xl:p-2 bg-gray-200 hover:bg-gay-500 border-gray-500'>
            <IconArrowUp onClick={handleScrollToTop}/>
        </div>

        <div className='fixed right-1 bottom-[5px] z-50 rounded-full p-1 mobile-xl:p-2 bg-gray-200 hover:bg-gay-500 border-gray-500'>
            <IconArrowDown onClick={handleScrollToBottom}/>
        </div>
    </motion.div>
    )
}
