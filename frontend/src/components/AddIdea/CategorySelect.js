import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCategory } from "@/lib/redux/features/addIdeaSlice";

const CategorySelect = () => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <Select
                className="text-lg bg-none"
                onValueChange={(e) => {
                    dispatch(setCategory(e));
                }}
            >
                <SelectTrigger className="w-full bg-none">
                    <SelectValue
                        placeholder="Category"
                        className="text-lg bg-none"
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default CategorySelect;
