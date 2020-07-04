# Arcaea Data Crawler

![npm](https://img.shields.io/npm/v/arcaea-crawler)
![npm type definitions](https://img.shields.io/npm/types/arcaea-crawler)
![npm](https://img.shields.io/npm/dt/arcaea-crawler)

You can get play data of Arcaea to easy

Github : https://github.com/rhea-so/ArcaeaDataCrawler

## Install

```sh
npm i arcaea-crawler
```

## Usage

```typescript
// Import
import { ArcaeaMember } from 'arcaea-crawler';

// Create ArcaeaMember Instance
const user = new ArcaeaMember('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001'); // DeviceId: uuidv4

// Login
await user.login('id', 'ps');

// Get User Data
await user.getInfo();

// Add Friend
await user.addFriend(776114322);

// Delete Friend
await user.delFriend(26652);

// Get Friend Play Data
await user.getFriendPlayData(26652);
```
