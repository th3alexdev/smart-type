import toast from 'react-hot-toast';

const notify = (message, emoji) => toast.success(`${message}`, {
    duration: 3000,
    position: 'bottom-right',
    style: {
        fontSize: "1rem",
        fontWeight: "500"
    },
    icon: emoji,
    iconTheme: {
        primary: '#000',
        secondary: '#fff',
    },
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
});

export default notify