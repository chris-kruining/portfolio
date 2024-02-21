import { Action, action, cache, createAsync, reload, useNavigate } from '@solidjs/router';
import { Accessor, ParentProps, createContext, createEffect, useContext } from 'solid-js';

const user = {
    id: 10,
    name: 'Chris P Bacon',
    image: 'data:image/webp;base64,UklGRjoFAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSAsCAAABkJvtn6NGv1l2C9D5K4CHTB0QqgseIkUuJVRIBhud6YH4XCoTkwkiqQDvzc785xdgZ39XQEQwcNtIUbO8xzj9AtbAFQDQ6pT/phcvZi8X039lpwUAhUMNuBxAezB+5Qpex4M2gDy9kQPvexOStGAxzhSjBSPJSe89kKep4bDRvyXNW1xVRPNG3vY34BoJKoCdK9Ib18Q8ebUDFAnbbJ6QVWQCsSJPmutuMnPoelbGRKyi78Jl62RgSHrWgCeHQLZOHjEYa8ECR0C2Ov9ixdqo+GtVcg4jvrFG3jiCc8uf1uF8u87mEPnS563LwJoJ7C55/hpoelrdMvomGgvzOKFn7XiewC0stMOKAiruIJ9rb1zRFDJebcDN6v6s1lR95HB4f8uoUeTte7gCPXqK8OyhACY0lYwTAO1Z1qU2MKDXyXMAjLXFGK1XRp0iX1udWa2sOiWDUoHlP3XxbzqbUU5ML9S6eKGYF1PL9NJ39IvoN6R/bvXvjf691X835N8t/XfzP/hu6/8b+v+W/r8p/2/r4wZ53CKPm/RxmzxulMet+rhZHrfLfYPct6zvm5Jfwbjgm+S+LcE37j+k+saHfaBI862fyicyrDNgPpBP5Se4RrJv/npwRpJhuW8OJHl28BXIkUqWA/nWt9OV71E4/bY1O6IMNZAVs+U2t38ent/NdHd++HN7MwNQrNMCAFZQOCAIAwAAkBEAnQEqQABAAD6JNphHpSMioS4dvHCgEQlsALzdlv5Lz4FWu9fkr0B/NUgLYDzqG9vWPtwPMB5yXRAdQ1vJjgRBgdpMZArcRLehVozfgESLV7jrt6y3+1xCUHeHw5uQIchuYTkWMZY/H16HwZaOk7pLyW8vC8wxNXvPkIcv6W76nqk1MV4/vwaGYo+r1ru9w69xfwAA/v7Naw6aULM/DSQY6u+buV7b5okV9a0ijHNF1T/oBM7qOZA6U8ci9P8k/gYHDifqZbkUnGBUibLFp47ofvCO0bh2De+IFqZfiudyAbBhr5r5LAZd4gHCeT+nchE7nungjI1NLXxB0jqMS0QA85bVy78qM0905rW3E+BdNlS/QZL/zMBcyf41hmkydnjlAHW9LCf8XI8oUgsyCRGPniE3X46k1n3Pez+fGiqTHOumFf6N0PHtxZZl5wX4RGOSuBqZkgjhTwA7o0qlJgWvNBnDOLE2i7KSdCMEhCKcVuEjfIyY/q2ZtVimj7K/lnIgocN4ABDsBQSvPcuZEKis9Q+y6W1qps4AnLXruFTduIFfoxxjIo7H7ZcNIMnoGBfmLl6IrWKCixcN1TvinUHYlMZMHb5qmz5Lr7RUcCF2d0ea07ONaoDeOZm05NQ8VJw1pshZUoJd901zzXzcwrZYPi9lIE8lUtZnpmTOlsXQXpCQeoz0uilaaHLZbagBFcnptXzJ5MKdsHmguvu+rwh1uyGVworgWn0ZZ9CKiTm6mEmjPDhqcAptyqfWlALf/R6wvdZTVJB9OCXJVzUmt/l/93Vot/nXuJb5KOAG9C6nh8j4hUe1PtunS7KWk/oLIt/6fxSBIbIPK3c6rscH2otpvERMd/4SNgWJy3vtuvZvoZUn8M8HQLkvT2ffsEqMkG2tYN0coNjrD9gvoPCbccvgIG1Qtd10ygfGRv3NkOTTnDXQR2QqjXBO6N5XOsUFogu+MNVUr+fPsr1dDdZkzTW0ruPE0HV4fZ2PSnXSlZAVbu7RM+kfTagE7TYXwBtJtfxOlsjzgAA=',
};
type User = typeof user;

const getSession = async () => {
    'use server';

    const { useSession } = await import('vinxi/http');

    return useSession<User>({
        password: process.env.SESSION_SECRET!,
    });
}

const userInfo = cache(async () => {
    'use server';

    const { data: user } = await getSession();

    return user.id !== undefined ? user : undefined;
}, 'userinfo');

const login = action(async (data: FormData) => {
    'use server';

    const session = await getSession();

    await session.update(() => ({...user}));

    return reload({
        revalidate: 'userinfo'
    });
}, 'login');

const logout = action(async (data: FormData) => {
    'use server';

    const session = await getSession();

    await session.clear();

    return reload({
        revalidate: 'userinfo'
    });
}, 'logout');

const Context = createContext<{ 
    user: Accessor<User|undefined>,
    login: Action<[data: FormData], void>
    logout: Action<[data: FormData], void>
}>({ user: () => undefined, login, logout });

export const AuthProvider = (props: ParentProps) => {
    const user = createAsync(() => userInfo());
    
    return <Context.Provider value={{ user, login, logout }}>
        {props.children}
    </Context.Provider>
};

export const useAuth = () => useContext(Context);

export const withAuthGuard = (callback: () => any) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    createEffect(() => {
        if (user() === undefined) {
            navigate('/shop', { replace: true });
        }
    });

    return callback();
};