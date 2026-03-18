import type { INodeProperties } from 'n8n-workflow';
import { communicationCreateDescription } from './create';
import { communicationDeleteDescription } from './delete';
import { communicationGetDescription } from './get';
import { communicationListDescription } from './list';
import { communicationUpdateDescription } from './update';

export const communicationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['communication'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a communication',
				description: 'Add a communication entry for a person',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a communication',
				description: 'Delete a communication entry',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a communication',
				description: 'Get a communication by ID',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List communications',
				description: 'List communication entries',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a communication',
				description: 'Update an existing communication entry',
			},
		],
		default: 'create',
	},
	...communicationCreateDescription,
	...communicationDeleteDescription,
	...communicationGetDescription,
	...communicationListDescription,
	...communicationUpdateDescription,
];
