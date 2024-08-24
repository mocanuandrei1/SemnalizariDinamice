"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { useCart } from "@/app/context/CartProvider";
import CartProducts from "./cart/CartProducts";

export default function MobileNavBar() {
  const { countCartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  const checkOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
    }
  };

  const openCart = () => {
    setIsCartOpen(true);
    setTimeout(() => {
      cartRef.current.style.transition = "transform 0.4s ease";
      cartRef.current.style.transform = "translateX(0)";
    }, 50); // Mică întârziere pentru a se asigura că tranziția funcționează corect
  };

  const closeCart = () => {
    cartRef.current.style.transition = "transform 0.4s ease";
    cartRef.current.style.transform = "translateX(100%)";
    setTimeout(() => {
      setIsCartOpen(false);
      cartRef.current.style.transition = "none"; // Eliminăm tranziția pentru deschiderea viitoare
      cartRef.current.style.transform = "translateX(100%)"; // Asigurăm poziția corectă pentru redeschidere
    }, 400); // Asigură-te că starea este actualizată după finalizarea tranziției
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    currentX.current = e.touches[0].clientX;
    const translateX = Math.max(0, currentX.current - startX.current);
    cartRef.current.style.transform = `translateX(${translateX}px)`;
  };

  const handleTouchEnd = () => {
    const swipeDistance = currentX.current - startX.current;

    if (swipeDistance > 100) {
      closeCart();
    } else {
      cartRef.current.style.transition = "transform 0.4s ease";
      cartRef.current.style.transform = "translateX(0)";
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center w-full">
        <div onClick={checkOpen}>
          {isOpen ? (
            <MdClose className="text-3xl text-amber-500 ml-2" />
          ) : (
            <IoIosMenu className="text-3xl text-amber-500 ml-2" />
          )}
        </div>
        <Link href="/">
          <Image src="/logo.png" width={90} height={90} alt="Logo" />
        </Link>

        <div className="relative" onClick={toggleCart}>
          <FaCartPlus className="text-2xl text-amber-500 mr-2 cursor-pointer" />
          <p className="absolute -top-[7px] right-0 bg-red-500 text-white rounded-full w-4 h-4 text-center text-xs">
            {countCartItems()}
          </p>
        </div>
      </div>

      {isCartOpen && (
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ${
            isCartOpen ? "opacity-70" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleCart}
        ></div>
      )}

      <div
        ref={cartRef}
        className={`fixed inset-0 z-50 transition-transform transform translate-x-full`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute right-0 top-0 w-3/4 bg-black h-full shadow-lg shadow-amber-500">
          <div className="p-4 h-full">
            <CartProducts toggleCart={toggleCart} isCartOpen={isCartOpen} />
          </div>
        </div>
      </div>
    </main>
  );
}
