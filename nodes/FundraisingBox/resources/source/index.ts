import type { INodeProperties } from 'n8n-workflow';
import { sourceGetDescription } from './get';
import { sourceListDescription } from './list';

export const sourceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a source',
				description: 'Get a source by ID',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List sources',
				description: 'List all sources',
			},
		],
		default: 'get',
	},
	...sourceGetDescription,
	...sourceListDescription,
];
