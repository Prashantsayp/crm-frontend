"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GroupIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <ListIcon />,
    name: "Workqueue",
    path: "/workqueue",
  },
  {
    icon: <TableIcon />,
    name: "Reports",
    path: "/reports",
  },
  {
    icon: <PieChartIcon />,
    name: "Analytics",
    path: "/analytics",
  },
  {
    icon: <CalenderIcon />,
    name: "My Requests",
    path: "/my-requests",
  },
  {
    icon: <GroupIcon />,
    name: "CRM",
    subItems: [
      { name: "Leads", path: "/leads" },
      { name: "Customers", path: "/customers" },
      { name: "Applications", path: "/applications" },
      { name: "Follow Ups", path: "/followups" },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Agents",
    path: "/agents",
  },
];

const othersItems: NavItem[] = [
  {
    icon: <BoxCubeIcon />,
    name: "Administration",
    subItems: [
      { name: "Users", path: "/users" },
      { name: "Roles", path: "/roles" },
      { name: "Permissions", path: "/permissions" },
      { name: "Departments", path: "/departments" },
      { name: "Branches", path: "/branches" },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Integrations",
    path: "/integrations",
  },
  {
    icon: <PageIcon />,
    name: "Settings",
    path: "/settings",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const showLabels = isExpanded || isHovered || isMobileOpen;

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-1">
      {navItems.map((nav, index) => {
        const groupOpen =
          openSubmenu?.type === menuType && openSubmenu?.index === index;

        return (
          <li key={nav.name} className="relative">
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  groupOpen
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                } ${!showLabels ? "lg:justify-center" : "justify-start"}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                    groupOpen
                      ? "text-indigo-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {nav.icon}
                </span>
                {showLabels && <span className="truncate">{nav.name}</span>}
                {showLabels && (
                  <ChevronDownIcon
                    className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ${
                      groupOpen ? "rotate-180 text-indigo-400" : "text-slate-500"
                    }`}
                  />
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(nav.path)
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  } ${!showLabels ? "lg:justify-center" : "justify-start"}`}
                >
                  {isActive(nav.path) && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-indigo-400" />
                  )}
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                      isActive(nav.path)
                        ? "text-indigo-400"
                        : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {showLabels && <span className="truncate">{nav.name}</span>}
                </Link>
              )
            )}

            {nav.subItems && showLabels && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: groupOpen
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
                }}
              >
                <ul className="mb-1 ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-4">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors ${
                          isActive(subItem.path)
                            ? "font-medium text-indigo-300"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span className="truncate">{subItem.name}</span>
                        <span className="ml-auto flex items-center gap-1">
                          {subItem.new && (
                            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300">
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300">
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  useEffect(() => {
    let submenuMatched = false;
    (["main", "others"] as const).forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType, index });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 mt-16 flex h-screen flex-col border-r border-white/5 bg-[#0f1729] px-4 text-slate-300 transition-all duration-300 ease-in-out lg:mt-0
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${
          !showLabels ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-lg font-bold text-white">
            F2
          </div>
          {showLabels && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">F2 CRM</span>
              <span className="text-xs text-slate-400">Fintech Solution</span>
            </div>
          )}
        </Link>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-5">
            <div>
              <h2
                className={`mb-3 flex text-[11px] font-medium uppercase leading-[20px] tracking-wider text-slate-500 ${
                  !showLabels ? "lg:justify-center" : "justify-start"
                }`}
              >
                {showLabels ? "Menu" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              <h2
                className={`mb-3 flex text-[11px] font-medium uppercase leading-[20px] tracking-wider text-slate-500 ${
                  !showLabels ? "lg:justify-center" : "justify-start"
                }`}
              >
                {showLabels ? "Others" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {showLabels ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;