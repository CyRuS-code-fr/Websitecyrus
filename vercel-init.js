// Vercel Analytics & Speed Insights Initialization
// Using local npm packages for better performance

(function() {
    'use strict';
    
    // Initialize Speed Insights queue
    window.si = window.si || function(...params) {
        (window.siq = window.siq || []).push(params);
    };
    
    // Initialize Analytics queue  
    window.va = window.va || function(...params) {
        (window.vaq = window.vaq || []).push(params);
    };
    
    // Load Speed Insights
    if (typeof window !== 'undefined') {
        // Create script element for speed insights
        const speedScript = document.createElement('script');
        speedScript.src = './js/vercel/speed-insights.js';
        speedScript.async = true;
        speedScript.onload = function() {
            console.log('✅ Vercel Speed Insights loaded successfully');
        };
        document.head.appendChild(speedScript);
        
        // Initialize analytics tracking
        const analyticsScript = document.createElement('script');
        analyticsScript.src = 'https://va.vercel-scripts.com/v1/script.js';
        analyticsScript.async = true;
        analyticsScript.onload = function() {
            console.log('✅ Vercel Analytics loaded successfully');
        };
        document.head.appendChild(analyticsScript);
        
        // Track page view
        window.va('pageview');
        
        console.log('🚀 Vercel analytics and speed insights initialized');
    }
})();