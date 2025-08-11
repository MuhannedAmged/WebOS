import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { getNews } from "../controller/api/getNews";
import Link from "next/link";

const OptionsMenu = () => {
  const [date, setDate] = useState(new Date());
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function news() {
      const res = await getNews();
      setNews([res.title, res.url]);
    }
    news();
  });
  return (
    <motion.div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col shadow-[0_0_10px_rgba(120,102,140,0.3)] p-1 absolute z-10 right-2 top-1/2 -translate-y-1/2 rounded-md w-6/12 min-md:w-3/12 h-10/12 bg-black/30 backdrop-blur-3xl"
    >
      <div className="text-white p-5 grow mb-5">
        <h4 className="mb-2">News</h4>
        <Link href={`${news[1]}`}>
          <div className="text-sm">
            {news[0] ? (
              news[0]
            ) : (
              <>
                {[0, 1, 2, 3].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 3,
                      delay: (0.2 * index) / 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    className="bg-gray-400 h-3 rounded-xs mb-2"
                  />
                ))}
              </>
            )}
          </div>
        </Link>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md w-full grow bg-transparent text-white"
      />
    </motion.div>
  );
};

export default OptionsMenu;
