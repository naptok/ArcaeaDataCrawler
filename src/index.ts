import { ArcaeaError } from './modules/Error';
import { ArcaeaMember } from 'modules/ArcaeaMember';

export { ArcaeaError, ArcaeaMember };

// import 'source-map-support/register';
// import 'app-module-path/register';
// import { ArcaeaMember } from 'modules/ArcaeaMember';

// async function main() {
//     const user = new ArcaeaMember('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001'); // uuidv4
//     await user.login('id', 'ps');

//     await user.getInfo();

//     try {
//         await user.delFriend(26652);
//     } catch (err) {}

//     await user.addFriend(776114322);

//     console.log(await user.getFriendPlayData(26652));
// }

// main().catch((err) => console.error(err));
