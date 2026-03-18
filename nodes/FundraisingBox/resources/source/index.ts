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
				description: 'Retrieve a source',
			},
			{
				name: 'Get Many',
				value: 'list',
				action: 'Get many sources',
				description: 'Retrieve a list of sources',
			},
		],
		default: 'get',
	},
	...sourceGetDescription,
	...sourceListDescription,
];
