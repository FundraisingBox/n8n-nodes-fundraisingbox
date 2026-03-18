import type { INodeProperties } from 'n8n-workflow';
import { projectGetDescription } from './get';
import { projectListDescription } from './list';

export const projectDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['project'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a project',
				description: 'Get a project by ID',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List projects',
				description: 'List all projects',
			},
		],
		default: 'get',
	},
	...projectGetDescription,
	...projectListDescription,
];
