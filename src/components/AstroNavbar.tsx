import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const AstroNavbar: React.FC = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHomeRoute, setIsHomeRoute] = useState(false);

  useEffect(() => {
    setIsHomeRoute(window.location.pathname === "/");
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === "/free-seo-audit") {
      setActive("seo-audit");
      return;
    }

    if (currentPath === "/thank-you") {
      setActive("");
      return;
    }

    setActive("");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);

      if (!isHomeRoute) {
        return;
      }

      if (scrollTop < 100) {
        setActive("");
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

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomeRoute]);

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setActive("");
    setToggle(false);

    if (isHomeRoute) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSectionNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    setToggle(false);

    if (isHomeRoute) {
      event.preventDefault();
      const sectionElement = document.getElementById(sectionId);

      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });

        if (window.location.hash !== `#${sectionId}`) {
          window.history.replaceState(null, "", `/#${sectionId}`);
        }

        return;
      }

      if (window.location.hash !== `#${sectionId}`) {
        window.location.hash = sectionId;
      } else {
        window.dispatchEvent(new Event("hashchange"));
      }

      return;
    }

    setActive(sectionId);
  };

  const handleAuditClick = () => {
    setActive("seo-audit");
    setToggle(false);
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          onClick={handleBrandClick}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <span className="text-white text-[18px] font-bold cursor-pointer flex">
            Alistair Alva &nbsp;
            <span className="sm:block hidden">
              | Technology & Software Solutions
            </span>
          </span>
        </a>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <React.Fragment key={nav.id}>
              {nav.id === "contact" ? (
                <li
                  className={`${
                    active === "seo-audit" ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                >
                  <a
                    href="/free-seo-audit"
                    onClick={handleAuditClick}
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    Free SEO Audit
                  </a>
                </li>
              ) : null}
              <li
                className={`${
                  active === nav.id ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
              >
                <a
                  href={`/#${nav.id}`}
                  onClick={(event) => handleSectionNavigation(event, nav.id)}
                  className="text-inherit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  {nav.title}
                </a>
              </li>
            </React.Fragment>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            onClick={() => setToggle((previous) => !previous)}
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
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((nav) => (
                <React.Fragment key={nav.id}>
                  {nav.id === "contact" ? (
                    <li
                      className={`${
                        active === "seo-audit" ? "text-white" : "text-secondary"
                      } font-poppins font-medium cursor-pointer text-[16px]`}
                    >
                      <a
                        href="/free-seo-audit"
                        onClick={handleAuditClick}
                        className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                      >
                        Free SEO Audit
                      </a>
                    </li>
                  ) : null}
                  <li
                    className={`${
                      active === nav.id ? "text-white" : "text-secondary"
                    } font-poppins font-medium cursor-pointer text-[16px]`}
                  >
                    <a
                      href={`/#${nav.id}`}
                      onClick={(event) =>
                        handleSectionNavigation(event, nav.id)
                      }
                      className="text-inherit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      {nav.title}
                    </a>
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

export default AstroNavbar;
