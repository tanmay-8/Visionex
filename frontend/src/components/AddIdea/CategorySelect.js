import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CategorySelect = () => {
    return (
        <div>
            <Select className="text-lg bg-none">
                <SelectTrigger className="w-full bg-none">
                    <SelectValue placeholder="Category" className="text-lg bg-none"/>
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
