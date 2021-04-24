import { Image } from './image.entity';

export interface AdjacentImages {
	previous: Image;
	next: Image;
}

export type NextOrPrevious = 'next' | 'previous';

export interface Exif {
	width: number;
	height: number;
	iso?: number;
	shutterSpeed?: string;
	aperture?: string;
	focalLength?: string;
	camera?: string;
	lense?: string;
}

export interface ResizeOptions {
	height: number;
	width?: number;
	crop?: boolean;
}
