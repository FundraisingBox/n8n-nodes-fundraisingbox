import type { INodeProperties } from 'n8n-workflow';

export const projectGetDescription: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['project'],
			},
		},
		default: 0,
		description: 'The ID of the project to retrieve',
	},
];
