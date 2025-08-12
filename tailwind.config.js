export default {
  // ...
  theme: {
    extend: {
      keyframes: {
        // --- Hiệu ứng Mờ (Fade) ---
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeOut: {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
        
        // --- Hiệu ứng Trượt (Slide) ---
        slideInRight: {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(100%)' },
        },

        // --- Hiệu ứng Phóng to (Scale) ---
        scaleIn: {
            'from': { opacity: '0', transform: 'scale(0.95)' },
            'to': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
            'from': { opacity: '1', transform: 'scale(1)' },
            'to': { opacity: '0', transform: 'scale(0.95)' },
        }
      },
      animation: {
        // Khai báo để sử dụng với class animate-
        fadeIn: 'fadeIn 0.3s ease-out',
        fadeOut: 'fadeOut 0.3s ease-in',
        slideInRight: 'slideInRight 0.4s ease-out',
        slideOutRight: 'slideOutRight 0.4s ease-in',
        scaleIn: 'scaleIn 0.3s ease-out',
        scaleOut: 'scaleOut 0.3s ease-in',
      },
    },
  },
  // ...
};