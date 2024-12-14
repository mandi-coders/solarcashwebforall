import { create } from "zustand";
import { persist } from "zustand/middleware";

const useModalStore = create(
  persist(
    (set) => ({
      isModalVisible: false,
      isFirstVisit: true,
      showModal: () => set({ isModalVisible: true }),
      hideModal: () => set({ isModalVisible: false, isFirstVisit: false }),
      toggleModal: () =>
        set((state) => ({ isModalVisible: !state.isModalVisible })),
      resetModal: () => set({ isModalVisible: false, isFirstVisit: true }),
    }),
    {
      name: "model-state",
    }
  )
);

export default useModalStore;
