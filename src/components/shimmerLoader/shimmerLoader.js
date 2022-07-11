
import React from 'react';
import "./shimmerLoader.scss";

const ShimmerLoader = () => {
    return (
        <div className="shimmerLoader_container">
            <div className="box">
                <div className="shimmer title-line"></div>
                <div className="shimmer title-line end"></div>
                <div className="shimmer content-line mt24"></div>
                <div className="shimmer content-line"></div>
                <div className="shimmer content-line"></div>
                <div className="shimmer content-line"></div>
                <div className="shimmer content-line end"></div>
            </div>
        </div>
    );
}

export default ShimmerLoader;