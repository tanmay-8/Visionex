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

    const categories = [
        "Technology",
        "Environment",
        "Education",
        "Healthcare",
        "Agriculture",
        "Finance",
        "Transportation",
        "Energy",
        "Social Impact",
        "Arts & Culture",
        "Other",
    ];

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
                        placeholder="Select Category"
                        className="text-lg bg-none"
                    />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem
                            key={category}
                            value={category.toLowerCase().replace(" ", "-")}
                        >
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default CategorySelect;
