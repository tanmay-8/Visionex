import React from "react";

const Multiselect = ({ onSelect, selected ,options}) => {
    if(!options) options = [];
    if(!selected) selected = [];
    return (
        <div className="p-4 rounded-lg shadow-sm bg-light-bg-sec dark:bg-dark-bg-sec">
            <div>
                {
                    selected.map((item, index) => {
                        return (
                            <div key={index}>
                                <span>{item}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {
                    options.map((item, index) => {
                        return (
                            <div key={index}>
                                <input type="checkbox" checked={selected.includes(item)} onChange={(e) => {
                                    if (e.target.checked) {
                                        onSelect([...selected, item]);
                                    } else {
                                        onSelect(selected.filter((x) => x !== item));
                                    }
                                }} />
                                <label>{item}</label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Multiselect;
