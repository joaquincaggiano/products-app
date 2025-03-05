import { create } from "zustand";

interface TemporalCameraStoreState {
  selectedImages: string[];
  addSelectedImage: (image: string) => void;
  clearSelectedImages: () => void;
}

export const useCameraStore = create<TemporalCameraStoreState>()((set) => {
  return {
    selectedImages: [],
    addSelectedImage: (image) =>
      set((state) => ({ selectedImages: [...state.selectedImages, image] })),
    clearSelectedImages: () => set({ selectedImages: [] }),
  };
});
