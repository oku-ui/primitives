import { Avatar, AvatarImage, AvatarFallback } from "../index.ts";
import './styles.css'

export default { title: 'Components/Avatar' };

const src = 'https://avatars.githubusercontent.com/u/62594983?v=4';
const srcBroken = 'https://broken.link.com/broken-pic.jpg';

export const Styled = () => (
    <>
        <h1>Without image & with fallback</h1>
        <Avatar class={'avatar_rootClass'}>
            <AvatarFallback class={'avatar_fallbackClass'}>JS</AvatarFallback>
        </Avatar>

        <h1>With image & with fallback</h1>
        <Avatar class={'avatar_rootClass'}>
            <AvatarImage class={'avatar_imageClass'} alt="John Smith" src={src} />
            <AvatarFallback delayMs={300} class={'avatar_fallbackClass'}>
                JS
            </AvatarFallback>
        </Avatar>

        <h1>With image & with fallback (but broken src)</h1>
        <Avatar class={'avatar_rootClass'}>
            <AvatarImage
                class={'avatar_imageClass'}
                alt="John Smith"
                src={srcBroken}
                onLoadingStatusChange={console.log}
            />
            <AvatarFallback class={'avatar_fallbackClass'}>
                <AvatarIcon />
            </AvatarFallback>
        </Avatar>
    </>
);

export const Chromatic = () => (
    <>
        <h1>Without image & with fallback</h1>
        <Avatar class={'avatar_rootClass'}>
            <AvatarFallback class={'avatar_fallbackClass'}>JS</AvatarFallback>
        </Avatar>

        <h1>With image & with fallback</h1>
        <Avatar class={'avatar_rootClass'}>
            <AvatarImage class={'avatar_imageClass'} alt="John Smith" src={src} />
            <AvatarFallback delayMs={300} class={'avatar_fallbackClass'}>
                JS
            </AvatarFallback>
        </Avatar>

        <h1>With image & with fallback (but broken src)</h1>
        <Avatar class={'avatar_rootClass'}>
            <AvatarImage class={'avatar_imageClass'} alt="John Smith" src={srcBroken} />
            <AvatarFallback class={'avatar_fallbackClass'}>
                <AvatarIcon />
            </AvatarFallback>
        </Avatar>
    </>
);
Chromatic.parameters = { chromatic: { disable: false, delay: 1000 } };


const AvatarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="42" height="42">
        <path
            d="M50 51.7a22.1 22.1 0 100-44.2 22.1 22.1 0 000 44.2zM87.9 69.3a27.8 27.8 0 00-21.2-16.1 4 4 0 00-2.8.7 23.5 23.5 0 01-27.6 0 4 4 0 00-2.8-.7 27.5 27.5 0 00-21.2 16.1c-.3.6-.2 1.3.1 1.8a52.8 52.8 0 007 8.9 43.4 43.4 0 0056.9 3.8 56.3 56.3 0 008.9-8.8c.9-1.2 1.8-2.5 2.6-3.9.3-.6.3-1.2.1-1.8z"
            fill="currentColor"
        />
    </svg>
);
