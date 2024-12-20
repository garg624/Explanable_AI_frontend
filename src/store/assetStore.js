import {create} from "zustand";

const AssetStore = (set) => ({
    asset_public_url: [],
    currentImageUrl: null,

    addAsset: (publicUrl) => set((state) => ({
        asset_public_url: [...state.asset_public_url, publicUrl],
        currentImageUrl: publicUrl,
    })),

    resetAssets: () => set({
        asset_public_url: [],
        currentImageUrl: null,
    }),

    setCurrentImage: (url) => set({ currentImageUrl: url }),
});

const useAssetStore = create(AssetStore);
export default useAssetStore;
