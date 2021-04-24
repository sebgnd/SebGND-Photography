export interface FormatSizeOptions {
	height?: number;
	width?: number;
	folderName: string;
	crop?: boolean;
}

export interface FormatSizes {
	[size: string]: FormatSizeOptions | undefined;
}

export interface ImageFormat {
	[format: string]: FormatSizes;
}

export interface ImageConfiguration {
	rootDir: string;
	types: string[];
	temporary: string;
	format: ImageFormat;
}

export default (): ImageConfiguration => ({
	rootDir: 'categories',
	types: ['jpeg', 'jpg', 'png'],
	temporary: 'tmp',
	format: {
		thumbnail: {
			small: {
				height: 80,
				width: 80,
				crop: true,
				folderName: 'thumbnail_small',
			},
			medium: {
				height: 400,
				width: 400,
				crop: true,
				folderName: 'thumbnail_medium',
			},
		},
		regular: {
			small: {
				height: 450,
				folderName: 'small_res',
			},
			medium: {
				height: 1080,
				folderName: 'medium_res',
			},
			full: {
				folderName: 'full_res',
			},
		},
	},
});
