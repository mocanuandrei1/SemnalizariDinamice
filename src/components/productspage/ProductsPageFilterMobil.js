"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RemoveScroll } from "react-remove-scroll";
import { Bot } from "lucide-react";

export default function ProductsPageFilterMobil() {
  const [openFilter, setOpenFilter] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tip Mașină");

  const categories = {
    "Tip Mașină": ["Audi", "BMW", "Mercedes"],
    Preț: ["Sub 50", "50-100", "100-200", "200-500", "500-1000"],
    Disponibilitate: ["In Stoc", "Noutăți", "Resigilate"],
    "Rating minim": [
      "★★★★★ (731)",
      "★★★★☆ (1179)",
      "★★★☆☆ (1360)",
      "★★☆☆☆ (1457)",
      "★☆☆☆☆ (1579)",
    ],
    Produse: ["Capace", "Semnalizări Dinamice", "Proiectoare Logo", "Embleme"],
  };

  const toggleFilterModal = () => {
    if (openFilter) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setOpenFilter(false);
      }, 500);
    } else {
      setOpenFilter(true);
    }
  };

  return (
    <div>
      <div className="lg:hidden flex items-center gap-2">
        {/* Selectare Filtrare */}
        <div onClick={toggleFilterModal}>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtreaza" />
            </SelectTrigger>
          </Select>
        </div>
      </div>

      {/* Pop-up Modal */}
      {openFilter && (
        <RemoveScroll>
          <div className="fixed inset-0 z-50 flex justify-center items-end">
            <div
              className={`w-full h-4/5 bg-white rounded-t-lg ${
                isClosing ? "animate-slideOutBottom" : "animate-slideInBottom"
              }`}
            >
              <div className="flex justify-between items-center bg-black py-2">
                <h2 className="flex ml-4 text-xl font-semibold text-white">
                  Filtreaza
                </h2>
                <button onClick={toggleFilterModal}>
                  <div className="">
                    <IoClose className="text-4xl mr-2 text-white" />
                  </div>
                </button>
              </div>
              <div className="grid grid-cols-3 h-full">
                {/* Left side with category names */}
                <div className="col-span-1 bg-gray-100 overflow-y-auto max-h-full scrollbar-hide">
                  {Object.keys(categories).map((category) => (
                    <div
                      key={category}
                      className={`p-3 font-semibold cursor-pointer ${
                        selectedCategory === category
                          ? " border-l-8 border-amber-500 bg-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>

                {/* Right side with category options */}
                <div className="col-span-2 p-4 overflow-y-auto max-h-full scrollbar-hide">
                  <div className="flex flex-col gap-2">
                    {categories[selectedCategory].map((option, index) => (
                      <div key={index} className="flex items-center">
                        <Checkbox />
                        <label htmlFor={option} className="ml-2 align-baseline">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>{" "}
              <div className="absolute bottom-0 left-0 w-full h-16 bg-white border-t-2 border-amber-500 flex flex-row justify-between">
                <button className="bg-red-500 ml-3 my-3 p-2 rounded-lg w-[28%] font-semibold">
                  Sterge
                </button>
                <button className="bg-amber-500 mr-3 my-3 p-2 rounded-lg w-[62%] font-semibold">
                  Aplica filtrele
                </button>
              </div>
            </div>
          </div>
        </RemoveScroll>
      )}
    </div>
  );
}
