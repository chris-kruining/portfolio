import { createDragDropContext } from '../drag-drop/drap-drop.context';
import type { Card } from './card.service';

const [Provider, useContext] = createDragDropContext<Card>();

export const PlanningProvider = Provider;
export const usePlanningContext = useContext;
