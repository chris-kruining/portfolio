import { useSearch } from './search.context';
import {} from './search.module.css';

export function Search() {
    const { searchAction } = useSearch();

    return <search>
        <form action={searchAction} method="post" role="search">
            <input type="search" name="query" placeholder="Search for ..." />
            <button type="submit">Go!</button>
        </form>
    </search>
}