
export default function Image({ src, ...rest }) {
    src = src && src.includes('https://') ? src
        : import.meta.env.VITE_API_BASE_URL + src;

    return (
        <img {...rest} src={src} alt={''} />
    )
}