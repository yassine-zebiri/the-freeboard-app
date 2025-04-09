import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllComponents } from "../../../services/indexedDBservice";
import { Component } from "../ComponentsSlice";

export const fetchComponents = createAsyncThunk<Component[], void, { rejectValue: string }>(
    "components/fetchComponents",
    async (_, { rejectWithValue }) => {
      try {

        const components = (await getAllComponents()) as Component[];
        return components;
      } catch (error: any) {
        return rejectWithValue(error.message || "فشل في جلب المكونات");
      }
    }
  );