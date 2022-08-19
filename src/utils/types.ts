import React from "react";
import { IDragOperations } from "react-drag-guide-lines";

export interface ICardItemProps {
    id: string;
    backgroundColor: string;
    defaultPosition: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface ICardProps extends ICardItemProps {
    dragOperations?: IDragOperations;
}

export type IDraggableEvent =
    | React.MouseEvent<HTMLElement | SVGElement>
    | React.TouchEvent<HTMLElement | SVGElement>
    | MouseEvent
    | TouchEvent;

export interface IDraggableData {
    node: HTMLElement;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
}

export interface IPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}
