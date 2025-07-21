import type { ToastModel } from "@syncfusion/ej2-react-notifications";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { name } from "../../package.json";

interface IState {
    /**
     * Current toast notification
     * If null, no toast is shown
     * @default null
     */
    toast: ToastModel | null;
    /**
     * List of all toast notifications
     * Used to keep track of all toasts shown (use save to true)
     * @default []
     */
    toasts: ToastModel[];
}

interface IActions {
    /**
     * Show a toast notification
     * @param toast The toast notification to show
     * @param save (default: false) Whether to save the toast notification
     */
    showToast: (toast: ToastModel, save?: boolean) => void;
    /**
     * Hide the current toast notification
     */
    hideToast: () => void;
    /**
     * Clear all toast notifications
     * This will hide the current toast and clear the list of toasts
     */
    clearAllToasts: () => void;
}

export const useToastStore = create<IState & IActions>()(
    persist(
        (set, get) => ({
            toast: null,
            toasts: [],
            showToast: (toast, save = false) => {
                if (save) set({ toast, toasts: [...get().toasts, toast] });
                else set({ toast });
            },
            hideToast: () => set({ toast: null }),
            clearAllToasts: () => set({ toast: null, toasts: [] }),
        }),
        { name: `${name}-toasts`, version: 1, storage: createJSONStorage(() => sessionStorage) },
    ),
);
