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
				description: 'Retrieve a project',
			},
			{
				name: 'Get Many',
				value: 'list',
				action: 'Get many projects',
				description: 'Retrieve a list of projects',
			},
		],
		default: 'get',
	},
	...projectGetDescription,
	...projectListDescription,
];
