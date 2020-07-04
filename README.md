# Arcaea Data Crawler

## Usage

```typescript
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
