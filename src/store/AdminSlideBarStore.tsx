import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  mobileOpen: boolean;

  toggleCollapse: () => void;
  toggleMobile: () => void;

  closeMobile: () => void;
}

const useSidebarStore = create<SidebarStore>((set) => ({
  collapsed: false,
  mobileOpen: false,

  toggleCollapse: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),

  toggleMobile: () =>
    set((state) => ({
      mobileOpen: !state.mobileOpen,
    })),

  closeMobile: () =>
    set({
      mobileOpen: false,
    }),
}));

export default useSidebarStore;