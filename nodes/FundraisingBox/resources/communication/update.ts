import type { INodeProperties } from 'n8n-workflow';

export const communicationUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Communication ID',
		name: 'communicationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['communication'],
			},
		},
		default: 0,
		description: 'The ID of the communication to update',
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
				resource: ['communication'],
			},
		},
		options: [
			{
				displayName: 'Created At',
				name: 'created_at',
				type: 'dateTime',
				default: '',
				description: 'Date and time of the communication',
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'options',
				options: [
					{ name: 'Inbound', value: 'in' },
					{ name: 'Outbound', value: 'out' },
				],
				default: 'out',
				description: 'Direction of the communication',
			},
			{
				displayName: 'Message',
				name: 'html_message',
				type: 'string',
				typeOptions: { rows: 4 },
				default: '',
				description: 'Content of the communication. HTML is supported and will be escaped.',
			},
			{
				displayName: 'Sticky',
				name: 'sticky',
				type: 'boolean',
				default: false,
				description: 'Whether to pin this communication to the top of the list',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Subject of the communication. Only applicable for type "Email".',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Email', value: 'email' },
					{ name: 'Letter', value: 'letter' },
					{ name: 'Note', value: 'note' },
					{ name: 'Phone', value: 'phone' },
					{ name: 'Talk', value: 'talk' },
				],
				default: 'note',
				description: 'Type of the communication',
			},
		],
	},
];
