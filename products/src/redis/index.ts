import Redis from 'ioredis';
import { BooksServices } from '../services/products.services';
const redisSubscriber = new Redis();

export function subscribeAll() {
  const channelName = 'storeChannel';
  // const subscriber = '';

  redisSubscriber.subscribe(channelName);

  //   redisSubscriber.on('message', async (channel, message) => {
  //     console.log('channel', channel);
  //     console.log(`received the store data from ${channel}:`, JSON.parse(message));
  //     await BooksServices.subscribeToMessages(channelName, message);
  //   });
  // }
  redisSubscriber.on('message', async (channel, message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Received parsed message:', parsedMessage);
      await BooksServices.subscribeToMessages(channelName, parsedMessage);
    } catch (error) {
      console.error('Error parsing message:', error);
      // Handle the error (e.g., log, ignore, or take appropriate action)
    }
  });
}
// export async function subscribeToMessages(channelName: string, message: string, subscriber: string

// const channelName = 'storeChannel';
// BooksServices.subscribeToMessages(channelName)
//   .then(() => {
//     console.log(`Subscribed to ${channelName} channel`);
//   })
//   .catch((err) => {
//     console.error(`Error subscribing to ${channelName} channel:`, err);
//   });
