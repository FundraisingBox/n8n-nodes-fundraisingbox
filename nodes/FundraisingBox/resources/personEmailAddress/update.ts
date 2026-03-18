import type { INodeProperties } from 'n8n-workflow';

export const personEmailAddressUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Email Address ID',
		name: 'emailAddressId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['personEmailAddress'],
			},
		},
		default: 0,
		description: 'The ID of the email address to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['personEmailAddress'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
			},
			{
				displayName: 'Is Main',
				name: 'is_main',
				type: 'boolean',
				default: true,
				description: 'Whether this is the primary email address for the person',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Home', value: 'home' },
					{ name: 'Other', value: 'other' },
					{ name: 'Work', value: 'work' },
				],
				default: 'home',
				description: 'Classification of the email address',
			},
		],
	},
];
