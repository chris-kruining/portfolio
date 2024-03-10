import { RouteDefinition, RouteSectionProps } from '@solidjs/router';
import { Board } from '~/feature/planning';

export const route = {
    load() {},
} satisfies RouteDefinition;

export default function Planning(props: RouteSectionProps<ReturnType<(typeof route)['load']>>) {
    return <Board id={1} />;
}
