import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
	NodeApiError,
	NodeConnectionType,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class Wasapbom implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WasapBom',
		name: 'wasapbom',
		icon: 'file:wb-logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send WhatsApp messages via WasapBom API',
		defaults: {
			name: 'WasapBom',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'wasapbomApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Instance',
						value: 'instance',
					},
					{
						name: 'Message',
						value: 'message',
					},
				],
				default: 'message',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'instance',
						],
					},
				},
				options: [
					{
						name: 'Get Info',
						value: 'getInfo',
						description: 'Get information about a WhatsApp instance',
						action: 'Get information about a whats app instance',
					},
				],
				default: 'getInfo',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
					},
				},
				options: [
					{
						name: 'Send Contact',
						value: 'sendContact',
						description: 'Send a contact card',
						action: 'Send a contact card',
					},
					{
						name: 'Send Location',
						value: 'sendLocation',
						description: 'Send a location message',
						action: 'Send a location message',
					},
					{
						name: 'Send Media',
						value: 'sendMedia',
						description: 'Send a media message from URL',
						action: 'Send a media message from URL',
					},
					{
						name: 'Send Text',
						value: 'sendText',
						description: 'Send a text message',
						action: 'Send a text message',
					},
				],
				default: 'sendText',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'contact',
						],
					},
				},
				options: [
					{
						name: 'Add Contact',
						value: 'addContact',
						description: 'Add a new contact',
						action: 'Add a new contact',
					},
				],
				default: 'addContact',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'chat',
						],
					},
				},
				options: [
					{
						name: 'Check Numbers',
						value: 'checkNumbers',
						description: 'Check if phone numbers are registered on WhatsApp',
						action: 'Check if phone numbers are registered on whats app',
					},
					{
						name: 'Get Chats',
						value: 'getChats',
						description: 'Get all chats',
						action: 'Get all chats',
					},
					{
						name: 'Get Messages',
						value: 'getMessages',
						description: 'Get messages from a specific chat',
						action: 'Get messages from a specific chat',
					},
				],
				default: 'getChats',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'group',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'createGroup',
						description: 'Create a new WhatsApp group',
						action: 'Create a new whats app group',
					},
				],
				default: 'createGroup',
			},
			{
				displayName: 'Required to set country code without +. Example: 60123456789',
				name: 'phoneNumberNotice',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendText',
							'sendMedia',
							'sendLocation',
							'sendContact',
						],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				placeholder: '60123456789',
				description: 'Phone number to send the message to',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendText',
							'sendMedia',
							'sendLocation',
							'sendContact',
						],
					},
				},
			},
			{
				displayName: 'Message Text',
				name: 'messageText',
				type: 'string',
				default: '',
				description: 'Text message to send',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendText',
						],
					},
				},
			},
			{
				displayName: 'Media Type',
				name: 'mediaType',
				type: 'options',
				options: [
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
				],
				default: 'image',
				description: 'Type of media to send',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendMedia',
						],
					},
				},
			},
			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				default: '',
				description: 'URL of the media to send',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendMedia',
						],
					},
				},
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				default: '',
				description: 'Caption for the media',
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendMedia',
						],
					},
				},
			},
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				default: 0,
				description: 'Latitude of the location',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendLocation',
						],
					},
				},
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				default: 0,
				description: 'Longitude of the location',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendLocation',
						],
					},
				},
			},
			{
				displayName: 'Location Name',
				name: 'locationName',
				type: 'string',
				default: '',
				description: 'Name of the location',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendLocation',
						],
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Address of the location',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendLocation',
						],
					},
				},
			},
			{
				displayName: 'Contact Name',
				name: 'contactName',
				type: 'string',
				default: '',
				description: 'Full name of the contact',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendContact',
						],
					},
				},
			},
			{
				displayName: 'Required to set country code without +. Example: 60123456789',
				name: 'contactPhoneNumberNotice',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendContact',
						],
					},
				},
			},
			{
				displayName: 'Contact Phone Number',
				name: 'contactPhoneNumber',
				type: 'string',
				default: '',
				placeholder: '60123456789',
				description: 'Phone number of the contact',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'message',
						],
						operation: [
							'sendContact',
						],
					},
				},
			},
			{
				displayName: 'Contact Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the contact to add',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'contact',
						],
						operation: [
							'addContact',
						],
					},
				},
			},
			{
				displayName: 'Required to set country code without +. Example: 60123456789',
				name: 'contactPhoneNumberNotice',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'contact',
						],
						operation: [
							'addContact',
						],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				placeholder: '60123456789',
				description: 'Phone number of the contact to add',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'contact',
						],
						operation: [
							'addContact',
						],
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'contact',
						],
						operation: [
							'addContact',
						],
					},
				},
				options: [
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Title of the contact (e.g., Mr., Mrs., Dr.)',
					},
					{
						displayName: 'Notes',
						name: 'notes',
						type: 'string',
						default: '',
						description: 'Notes about the contact',
					},
					{
						displayName: 'Custom Fields',
						name: 'customFields',
						placeholder: 'Add Custom Field',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
							maxValue: 10,
						},
						default: {},
						options: [
							{
								name: 'field',
								displayName: 'Field',
								values: [
									{
										displayName: 'Label',
										name: 'label',
										type: 'string',
										default: '',
										description: 'Label for the custom field',
										required: true,
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										default: '',
										description: 'Value for the custom field',
										required: true,
									},
								],
							},
						],
					},
				],
			},
			{
				displayName: 'Required to set country code without +. Example: 60123456789',
				name: 'checkNumbersNotice',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'chat',
						],
						operation: [
							'checkNumbers',
						],
					},
				},
			},
			{
				displayName: 'Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				placeholder: '60123456789,60198765432',
				description: 'Comma-separated list of phone numbers to check',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'chat',
						],
						operation: [
							'checkNumbers',
						],
					},
				},
			},
			{
				displayName: 'JID (Chat ID)',
				name: 'jid',
				type: 'string',
				default: '',
				placeholder: '60123456789@s.whatsapp.net',
				description: 'WhatsApp JID (e.g., 60123456789@s.whatsapp.net)',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'chat',
						],
						operation: [
							'getMessages',
						],
					},
				},
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 20,
				description: 'Number of messages to retrieve',
				displayOptions: {
					show: {
						resource: [
							'chat',
						],
						operation: [
							'getMessages',
						],
					},
				},
			},
			{
				displayName: 'Group Name',
				name: 'groupName',
				type: 'string',
				default: '',
				description: 'Name of the group to create',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'group',
						],
						operation: [
							'createGroup',
						],
					},
				},
			},
			{
				displayName: 'Required to set country code without +. Example: 60123456789',
				name: 'participantsPhoneNumberNotice',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'group',
						],
						operation: [
							'createGroup',
						],
					},
				},
			},
			{
				displayName: 'Participants',
				name: 'participants',
				type: 'string',
				default: '',
				placeholder: '60123456789,60198765432',
				description: 'Comma-separated list of phone numbers to add to the group',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'group',
						],
						operation: [
							'createGroup',
						],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const credentials = await this.getCredentials('wasapbomApi');
		const apiKey = credentials.apiKey as string;
		const baseUrl = 'https://panel.wasapbom.com/api/whatsapp';

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;
				let method: IHttpRequestMethods = 'GET';
				let endpoint = '';
				let body: IDataObject = {};

				if (resource === 'instance') {
					if (operation === 'getInfo') {
						endpoint = '/instance';
						method = 'GET' as IHttpRequestMethods;
					}
				} else if (resource === 'message') {
					const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

					if (operation === 'sendText') {
						endpoint = '/send/text';
						method = 'POST' as IHttpRequestMethods;
						const messageText = this.getNodeParameter('messageText', i) as string;

						body = {
							number: phoneNumber,
							textMessage: {
								text: messageText,
							},
						};
					} else if (operation === 'sendMedia') {
						endpoint = '/send/media';
						method = 'POST' as IHttpRequestMethods;
						const mediaType = this.getNodeParameter('mediaType', i) as string;
						const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
						const caption = this.getNodeParameter('caption', i, '') as string;

						body = {
							number: phoneNumber,
							mediaMessage: {
								mediatype: mediaType,
								media: mediaUrl,
							} as IDataObject,
						};

						if (caption && caption.trim() !== '') {
							(body.mediaMessage as IDataObject).caption = caption;
						}
					} else if (operation === 'sendLocation') {
						endpoint = '/send/location';
						method = 'POST' as IHttpRequestMethods;
						const latitude = this.getNodeParameter('latitude', i) as number;
						const longitude = this.getNodeParameter('longitude', i) as number;
						const locationName = this.getNodeParameter('locationName', i) as string;
						const address = this.getNodeParameter('address', i) as string;

						body = {
							number: phoneNumber,
							locationMessage: {
								latitude,
								longitude,
								name: locationName,
								address,
							},
						};
					} else if (operation === 'sendContact') {
						endpoint = '/send/contact';
						method = 'POST' as IHttpRequestMethods;
						const contactName = this.getNodeParameter('contactName', i) as string;
						const contactPhoneNumber = this.getNodeParameter('contactPhoneNumber', i) as string;

						body = {
							number: phoneNumber,
							contactMessage: [
								{
									fullName: contactName,
									wuid: contactPhoneNumber,
									phoneNumber: contactPhoneNumber,
								},
							],
						};
					}
				} else if (resource === 'contact') {
					if (operation === 'addContact') {
						endpoint = '/contacts';
						method = 'POST' as IHttpRequestMethods;
						const name = this.getNodeParameter('name', i) as string;
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						body = {
							name,
							phone_number: phoneNumber,
						};

						if (additionalFields.title) body.title = additionalFields.title;
						if (additionalFields.notes) body.notes = additionalFields.notes;

						if (additionalFields.customFields && (additionalFields.customFields as IDataObject).field) {
							const customFields = (additionalFields.customFields as IDataObject).field as IDataObject[];

							customFields.forEach((field, index) => {
								body[`custom_field_${index + 1}`] = field.value;
								body[`custom_field_${index + 1}_label`] = field.label;
							});
						}
					}
				} else if (resource === 'chat') {
					if (operation === 'checkNumbers') {
						endpoint = '/numbers';
						method = 'POST' as IHttpRequestMethods;
						const phoneNumbersString = this.getNodeParameter('phoneNumbers', i) as string;
						const phoneNumbers = phoneNumbersString.split(',').map(num => num.trim());

						body = {
							numbers: phoneNumbers,
						};
					} else if (operation === 'getChats') {
						endpoint = '/chats';
						method = 'GET' as IHttpRequestMethods;
					} else if (operation === 'getMessages') {
						endpoint = '/messages';
						method = 'POST' as IHttpRequestMethods;
						const jid = this.getNodeParameter('jid', i) as string;
						const count = this.getNodeParameter('count', i, 20) as number;

						body = {
							jid,
							count,
						};
					}
				} else if (resource === 'group') {
					if (operation === 'createGroup') {
						endpoint = '/group';
						method = 'POST' as IHttpRequestMethods;
						const groupName = this.getNodeParameter('groupName', i) as string;
						const participantsString = this.getNodeParameter('participants', i) as string;
						const participants = participantsString.split(',').map(num => num.trim());

						body = {
							name: groupName,
							participants,
						};
					}
				}

				const options: IHttpRequestOptions = {
					method,
					url: `${baseUrl}${endpoint}`,
					headers: {
						'Accept': 'application/json',
						'X-API-KEY': apiKey,
					},
					json: true,
				};

				if (method === 'POST') {
					options.body = body;
					options.headers!['Content-Type'] = 'application/json';
				}

				responseData = await this.helpers.httpRequest(options);

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);

			} catch (error) {
				let errorMessage = error.message;
				let statusCode = 500;

				if (error.response) {
					statusCode = error.response.status;

					if (statusCode === 401) {
						errorMessage = 'Authentication failed: Invalid API key. Please check your credentials.';

						if (error.response.data && error.response.data.message) {
							errorMessage += ` API says: ${error.response.data.message}`;
						}
					} else if (statusCode === 422) {
						errorMessage = 'Validation error: The API could not process your request.';

						if (error.response.data && error.response.data.errors) {
							errorMessage += ' Details: ' + JSON.stringify(error.response.data.errors);
						} else if (error.response.data && error.response.data.message) {
							errorMessage += ` API says: ${error.response.data.message}`;
						}
					} else if (statusCode === 400) {
						errorMessage = 'Bad request: The request was improperly formatted or contained invalid parameters.';

						if (error.response.data && error.response.data.message) {
							errorMessage += ` API says: ${error.response.data.message}`;
						}
					} else if (statusCode === 403) {
						errorMessage = 'Forbidden: You do not have permission to access this resource.';

						if (error.response.data && error.response.data.message) {
							errorMessage += ` API says: ${error.response.data.message}`;
						}
					} else if (statusCode === 404) {
						errorMessage = 'Not found: The requested resource does not exist.';

						if (error.response.data && error.response.data.message) {
							errorMessage += ` API says: ${error.response.data.message}`;
						}
					} else if (statusCode >= 500) {
						errorMessage = 'Server error: The WasapBom server encountered an error.';

						if (error.response.data && error.response.data.message) {
							errorMessage += ` API says: ${error.response.data.message}`;
						}
					}
				}

				if (this.continueOnFail()) {
					const executionErrorData = {
						json: {
							error: errorMessage,
							statusCode: statusCode,
							timestamp: new Date().toISOString(),
						},
					};
					returnData.push(executionErrorData);
					continue;
				}

				throw new NodeApiError(this.getNode(), error, { message: `WasapBom API Error [${statusCode}]: ${errorMessage}` });
			}
		}

		return [returnData];
	}
}
