import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
    id: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
    description: null | string;
}

const category: Category = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Olive",
    description: "Este é um exemplo de objeto JSON.",
    is_active: true,
    deleted_at: "2024-03-03T12:00:00Z",
    created_at: "2024-03-03T10:00:00Z",
    updated_at: "2024-03-03T11:00:00Z"
};

export const initialState = [
    category,
    {...category, id: "650e8400-e29b-41d4-a716-446655440000", name: "Peach"},
    {...category, id: "750e8400-e29b-41d4-a716-446655440000", name: "Apple"},
    {...category, id: "850e8400-e29b-41d4-a716-446655440000", name: "Banana", is_active: false},
]

const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategory(state, action) {},
        updateCategory(state, action) {},
        deleteCategory(state, action) {},
    }
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find((category) => category.id === id);

    return (
        category || {
            id: "",
            name: "",
            is_active: false,
            created_at: "",
            updated_at: "",
            deleted_at: null,
            description: null,
        }
    )
}

export default categoriesSlice.reducer;