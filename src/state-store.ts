import { create } from 'zustand';

export interface GameQuerySchema {
    page: string|null;
    genreId: number|null;
    platformId: number|null;
    sortOrder: string|null;
    searchText: string|null;
}

interface GameStateStore {
    gameQuery: GameQuerySchema;
    platformName: string;
    updatePlatformName: (newName: string) => void;
    setSearchText: (searchText: string|null) => void;
    setGenreId: (genreId: number|null) => void;
    setPlatformId: (platformId: number|null) => void;
    setSortOrder: (sortOrder: string|null) => void;
    orderingState: string;
    setOrderingState: (label: string) => void;
};

// Centralizing state management logic

const useGlobalStateStore = create<GameStateStore>(set => ({
    gameQuery: {
        genreId: null,
        platformId: null,
        sortOrder: null,
        searchText: null
    } as GameQuerySchema,

    platformName: 'All Platforms',
    updatePlatformName: (newName) => set(() => ({
        platformName: newName
    })),
    setSearchText: (searchText) => set(state => ({
        gameQuery: {...state.gameQuery, searchText: searchText, genreId: null, platformId: null, sortOrder: null},
        platformName: 'All Platforms',
        orderingState: 'Relevance'
    })),
    setGenreId: (genreId) => set(state => ({
        gameQuery: {...state.gameQuery, genreId: genreId}
    })),
    setPlatformId: (platformId) => set(state => ({
        gameQuery: {...state.gameQuery, platformId: platformId}
    })),
    setSortOrder: (sortOrder) => set(state => ({
        gameQuery: {...state.gameQuery, sortOrder: sortOrder}
    })),
    orderingState: 'Relevance',
    setOrderingState: (label) => set(() => ({
        orderingState: label
    }))
}))

export default useGlobalStateStore;