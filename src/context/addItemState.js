import React, { useState } from "react";
import AddItemContext from "./addItemContext";

const AddItemState = (props) => {
    const [items, setItems] = useState('');
    const host = "http://localhost:5400";
    
    const getItems = async () => {
        const result = await fetch(`${host}/api/stocks/fetchItems`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json'
            },
        });
        const json = await result.json();
        if (json.success) {
            setItems(json.obj);
        } else {
            alert('Some error occurred!');
        }
    }

    const addItem = async (formData) => {
        try {
            const response = await fetch(`${host}/api/stocks/addItem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const json = await response.json();
            if (json.success) {
                getItems();
                return { success: true, message: 'Item added successfully!' };
            } else {
                return { success: false, message: json.msg };
            }
        } catch (error) {
            return { success: false, message: 'Failed to add item' };
        }
    }

    return (
        <AddItemContext.Provider value={{ getItems, items, setItems, addItem }}>
            {props.children}
        </AddItemContext.Provider>
    );
}

export default AddItemState;