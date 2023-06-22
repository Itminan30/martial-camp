import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ClassCards = ({ item, user, value }) => {
    const seats = item.availableSeat
    if (seats === 0) {
        value = true;
    }
    const axiosSecure = useAxiosSecure();
    const handleAddToCart = async () => {
        item.payment = "due";
        const res = await axiosSecure.post(`/addtocart/${user.email}`, item);
        console.log(res);
        return res.data;
    }
    return (
        <div>
            <div className={seats === 0 ? `card w-96 bg-red-500 shadow-xl` : `card w-96 bg-base-100 shadow-xl`}>
                <figure><img src={item.photo} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p><span>Instructor: </span>{item.instructorName}</p>
                    <p><span>Seats: </span>{item.availableSeat}</p>
                    <p><span>Price: $</span>{item.price}</p>
                    <div className="card-actions justify-end">
                        <button disabled={value} onClick={handleAddToCart} on className="btn btn-primary">Select Class</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCards;