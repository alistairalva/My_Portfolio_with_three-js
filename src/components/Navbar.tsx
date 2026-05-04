import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const isHomeRoute = pathname === "/";
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname === "/free-seo-audit") {
      setActive("seo-audit");
      return;
    }

    if (pathname === "/thank-you") {
      setActive("");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);

      if (!isHomeRoute) {
        return;
      }

      let activeSection = "";
      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (!section) {
          continue;
        }

        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          activeSection = link.id;
          break;
        }
      }

      setActive(activeSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomeRoute]);

  useEffect(() => {
    setToggle(false);
  }, [pathname]);

  const handleBrandClick = () => {
    setActive("");
    setToggle(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string,
  ) => {
    setActive(sectionId);
    setToggle(false);

    if (!isHomeRoute) {
      return;
    }

    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAuditClick = () => {
    setActive("seo-audit");
    setToggle(false);
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 
      ${scrolled ? "bg-primary" : "bg-transparent"}`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleBrandClick}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Alistair Alva &nbsp;
            <span className="sm:block hidden">| Software Developer</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <React.Fragment key={nav.id}>
              {nav.id === "contact" && (
                <li
                  className={`${
                    active === "seo-audit" ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                >
                  <Link to="/free-seo-audit" onClick={handleAuditClick}>
                    Free SEO Audit
                  </Link>
                </li>
              )}
              <li
                className={`${
                  active === nav.id ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
              >
                <a
                  href={isHomeRoute ? `#${nav.id}` : `/#${nav.id}`}
                  onClick={(e) => handleSectionClick(e, nav.id)}
                >
                  {nav.title}
                </a>
              </li>
            </React.Fragment>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 
          right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((nav) => (
                <React.Fragment key={nav.id}>
                  {nav.id === "contact" && (
                    <li
                      className={`${
                        active === "seo-audit" ? "text-white" : "text-secondary"
                      } font-poppins font-medium cursor-pointer text-[16px]`}
                    >
                      <Link to="/free-seo-audit" onClick={handleAuditClick}>
                        Free SEO Audit
                      </Link>
                    </li>
                  )}
                  <li
                    className={`${active === nav.id ? "text-white" : "text-secondary"} 
                font-poppins font-medium cursor-pointer text-[16px]`}
                  >
                    <a
                      href={isHomeRoute ? `#${nav.id}` : `/#${nav.id}`}
                      onClick={(e) => handleSectionClick(e, nav.id)}
                    >
                      {nav.title}
                    </a>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
