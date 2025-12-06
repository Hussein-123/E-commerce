import Link from "next/link";
import React from "react";
import "./notfound.css";

export default function NotFound() {
  return (
    <div className="not-found-container-wrapper">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          
          <h2 className="error-title">Page Not Found</h2>
          
          <p className="error-description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="button-group">
            <Link href="/" className="btn-home">
              Back to Home
            </Link>
            
            <Link href="/products" className="btn-products">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
