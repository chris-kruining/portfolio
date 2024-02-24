import { Product } from '~/services/products';
import { host } from './tile.module.css';
import { JSX } from 'solid-js';

type TileProps = JSX.HTMLAttributes<HTMLDivElement> & {
    product: Product<any>
};

export function Tile(props: TileProps) {
    return <div class={`${host} ${props.class ?? ''}`}>
        <img src={props.product.thumbnail} />
        <span>{props.product.title}</span>
    </div>;
}