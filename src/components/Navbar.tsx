import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

let homePagePrefetchPromise: Promise<unknown> | null = null;

const prefetchHomePage = () => {
  if (!homePagePrefetchPromise) {
    homePagePrefetchPromise = import("../pages/_HomePage");
  }

  return homePagePrefetchPromise;
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
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

  useEffect(() => {
    const targetSection = (location.state as { targetSection?: string } | null)
      ?.targetSection;

    if (!isHomeRoute || !targetSection) {
      return;
    }

    let animationFrameId = 0;
    let attempts = 0;
    const maxAttempts = 45;

    const scrollToSectionWhenReady = () => {
      const sectionElement = document.getElementById(targetSection);

      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
        navigate(pathname, { replace: true, state: null });
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        animationFrameId = window.requestAnimationFrame(
          scrollToSectionWhenReady,
        );
        return;
      }

      navigate(pathname, { replace: true, state: null });
    };

    animationFrameId = window.requestAnimationFrame(scrollToSectionWhenReady);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isHomeRoute, location.state, navigate, pathname]);

  const handleBrandClick = () => {
    prefetchHomePage();
    setActive("");
    setToggle(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionNavigation = (sectionId: string) => {
    prefetchHomePage();
    setActive(sectionId);
    setToggle(false);

    if (isHomeRoute) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/", { state: { targetSection: sectionId } });
  };

  const handleAuditClick = () => {
    setActive("seo-audit");
    setToggle(false);
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 
      ${scrolled ? "bg-primary" : "bg-transparent"}`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          onClick={handleBrandClick}
          onMouseEnter={prefetchHomePage}
          onFocus={prefetchHomePage}
          onTouchStart={prefetchHomePage}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <span className="text-white text-[18px] font-bold cursor-pointer flex">
            Alistair Alva &nbsp;
            <span className="sm:block hidden">
              | Technology & Software Solutions
            </span>
          </span>
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
                  <Link
                    to="/free-seo-audit"
                    onClick={handleAuditClick}
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    Free SEO Audit
                  </Link>
                </li>
              )}
              <li
                className={`${
                  active === nav.id ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
              >
                <button
                  type="button"
                  onClick={() => handleSectionNavigation(nav.id)}
                  onMouseEnter={prefetchHomePage}
                  onFocus={prefetchHomePage}
                  onTouchStart={prefetchHomePage}
                  className="text-inherit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  {nav.title}
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className="w-[28px] h-[28px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls="mobile-navigation-menu"
          >
            <img
              src={toggle ? close : menu}
              alt=""
              aria-hidden="true"
              className="w-[28px] h-[28px] object-contain"
            />
          </button>

          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile navigation"
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
                      <Link
                        to="/free-seo-audit"
                        onClick={handleAuditClick}
                        className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                      >
                        Free SEO Audit
                      </Link>
                    </li>
                  )}
                  <li
                    className={`${active === nav.id ? "text-white" : "text-secondary"} 
                font-poppins font-medium cursor-pointer text-[16px]`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSectionNavigation(nav.id)}
                      onMouseEnter={prefetchHomePage}
                      onFocus={prefetchHomePage}
                      onTouchStart={prefetchHomePage}
                      className="text-inherit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      {nav.title}
                    </button>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
