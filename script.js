tailwind.config = {
  theme: {
    extend: {
      colors: {
        garden: {
          50:  '#f0faf0',
          100: '#ddf3dd',
          200: '#bce8bc',
          300: '#8dd58d',
          400: '#57bb57',
          500: '#33a033',
          600: '#248024',
          700: '#1e661e',
          800: '#1b521b',
          900: '#184418',
        },
        cream: '#f8f9f4',
        bark:  '#2c3222',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      boxShadow: {
        neo:    '6px 6px 16px #d1d9c8, -4px -4px 12px #ffffff',
        'neo-sm':'3px 3px 8px #d1d9c8, -2px -2px 6px #ffffff',
        'neo-inset':'inset 4px 4px 10px #cdd5c4, inset -3px -3px 8px #ffffff',
        card:   '0 2px 12px rgba(44,50,34,0.08)',
        'card-hover': '0 8px 28px rgba(44,50,34,0.14)',
      },
      borderRadius: { xl2: '1.25rem', xl3: '1.75rem' },
      animation: {
        'slide-up':   'slideUp 0.35s cubic-bezier(0.22,1,0.36,1)',
        'fade-in':    'fadeIn 0.25s ease',
        'pop':        'pop 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        'toast-in':   'toastIn 0.4s cubic-bezier(0.22,1,0.36,1)',
        'spin-slow':  'spin 2s linear infinite',
        'pulse-dot':  'pulseDot 1.4s ease-in-out infinite',
        'ping-sm':    'pingSm 1.2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        slideUp:   { from:{ opacity:'0', transform:'translateY(20px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:    { from:{ opacity:'0' }, to:{ opacity:'1' } },
        pop:       { from:{ transform:'scale(0.92)' }, to:{ transform:'scale(1)' } },
        toastIn:   { from:{ opacity:'0', transform:'translateY(60px) scale(0.96)' }, to:{ opacity:'1', transform:'translateY(0) scale(1)' } },
        pulseDot:  { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0.3' } },
        pingSm:    { '75%,100%':{ transform:'scale(1.6)', opacity:'0' } },
      },
    },
  },
};