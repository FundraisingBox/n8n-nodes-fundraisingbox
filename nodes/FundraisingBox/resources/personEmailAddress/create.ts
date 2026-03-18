import type { INodeProperties } from 'n8n-workflow';

export const personEmailAddressCreateDescription: INodeProperties[] = [
	{
		displayName: 'Person ID',
		name: 'fb_person_id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personEmailAddress'],
			},
		},
		default: 0,
		description: 'The ID of the person to associate this email address with',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personEmailAddress'],
			},
		},
		default: '',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['personEmailAddress'],
			},
		},
		options: [
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
