import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';

interface SavedBooks {
    read: any[];
    queued: any[];
    wishlist: any[];
}

interface SavedItemsContextType {
    saved: SavedBooks | null;
    isSaved: (sub: keyof SavedBooks, itemId: string) => boolean;
    addItem: (sub: keyof SavedBooks, item: any) => Promise<void>;
    removeItem: (sub: keyof SavedBooks, itemId: string) => Promise<void>;
}

export const SavedItemsContext = createContext<SavedItemsContextType>({
    saved: null,
    isSaved: () => false,
    addItem: async () => {},
    removeItem: async () => {}
});

export const SavedItemsProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(AuthContext);
    const [saved, setSaved] = useState<SavedBooks | null>(null);

    useEffect(() => {
        const fetchSaved = async () => {
            if (!user) return;
            const ref = doc(db, 'users', user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setSaved(snap.data().books as SavedBooks);
            } else {
                const empty: SavedBooks = { read: [], queued: [], wishlist: [] };
                await setDoc(ref, { books: empty }, { merge: true });
                setSaved(empty);
            }
        };
        fetchSaved();
    }, [user]);

    const isSaved = (sub: keyof SavedBooks, itemId: string) => {
        if (!saved) return false;
        return saved[sub]?.some((item: any) => item.id === itemId) || false;
    };

    const addItem = async (sub: keyof SavedBooks, item: any) => {
        if (!user) return;
        const ref = doc(db, 'users', user.uid);
        await updateDoc(ref, {
            [`books.${sub}`]: arrayUnion(item)
        });
        setSaved(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                [sub]: [...prev[sub], item]
            };
        });
    };

    const removeItem = async (sub: keyof SavedBooks, itemId: string) => {
        if (!user || !saved) return;
        const ref = doc(db, 'users', user.uid);
        const updatedList = saved[sub].filter((item: any) => item.id !== itemId);
        await setDoc(ref, {
            books: {
                ...saved,
                [sub]: updatedList
            }
        }, { merge: true });
        setSaved(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                [sub]: updatedList
            };
        });
    };

    return (
        <SavedItemsContext.Provider value={{ saved, isSaved, addItem, removeItem }}>
            {children}
        </SavedItemsContext.Provider>
    );
};

export const useSavedItems = () => useContext(SavedItemsContext);
