# n8n-nodes-wasapbom

An n8n community node to integrate with WasapBom WhatsApp API directly in your workflows.

This node enables seamless WhatsApp messaging automation in n8n, allowing you to send messages, media, manage contacts, create groups, and perform other WhatsApp operations without leaving your workflow.

## Features

- **Send Messages**: Text, Media (images, videos, documents, audio), Locations, and Contacts
- **Contact Management**: Add and manage WhatsApp contacts
- **Group Management**: Create and manage WhatsApp groups
- **Chat Operations**: Check numbers, retrieve chat lists, and get messages
- **Instance Management**: Get information about your WhatsApp instance

## Installation

Follow the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-wasapbom` in the input field
4. Agree to the risks of using community nodes
5. Click **Install**

## Prerequisites

- A WasapBom account (register at [panel.wasapbom.com](https://panel.wasapbom.com/))
- API Key from WasapBom dashboard
- n8n version 1.0.0 or newer

## Configuration

1. In your n8n instance, navigate to **Credentials**
2. Click **Create New Credentials**
3. Search for "WasapBom API"
4. Enter your API Key from the WasapBom dashboard
5. Save the credentials

## Usage Examples

### Send a Text Message
1. Add a new WasapBom node
2. Select "Message" as Resource
3. Select "Send Text" as Operation
4. Enter the recipient phone number (with country code, no +)
5. Type your message text
6. Connect to the rest of your workflow

### Send a Media Message
1. Add a new WasapBom node
2. Select "Message" as Resource
3. Select "Send Media" as Operation
4. Enter the recipient phone number
5. Select the media type (image, video, document, audio)
6. Enter the URL of the media
7. Optionally add a caption
8. Connect to the rest of your workflow

## Supported Operations

### Message Operations
- Send Text
- Send Media (images, videos, documents, audio)
- Send Location
- Send Contact

### Contact Operations
- Add Contact

### Group Operations
- Create Group

### Chat Operations
- Check Numbers
- Get Chats
- Get Messages

### Instance Operations
- Get Info

## License

[MIT](LICENSE.md)

## Author

This node was created by [Khairul/Web Impian Sdn Bhd]

## Resources
- [WasapBom Panel](https://panel.wasapbom.com/)
- [n8n Documentation](https://docs.n8n.io/)
