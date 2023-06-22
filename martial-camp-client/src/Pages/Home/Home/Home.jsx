import React from 'react';
import Banner from '../Banner/Banner';
import PopularInstructor from '../PopularInstructor/PopularInstructor';
import PopularClass from '../PopularClass/PopularClass';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;