import 'dotenv/config';
import 'app-module-path/register';
import { ArcaeaMember } from 'modules/ArcaeaMember';

async function main() {
    const user = new ArcaeaMember('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001'); // uuidv4
    await user.login('id', 'ps');

    console.time('getInfo');
    await user.getInfo();
    console.timeEnd('getInfo');

    console.time('delFriend');
    try {
        await user.delFriend(26652);
    } catch (err) {}
    console.timeEnd('delFriend');

    console.time('addFriend');
    await user.addFriend(776114322);
    console.timeEnd('addFriend');

    // friends[0].user_id;
    // const friendId = await user.addFriend(776114322);
    // console.time('Data mining');
    // console.log(await user.getFriendPlayData(friendId));
    // console.timeEnd('Data mining');
    // console.log(friendId);
}

main().catch((err) => console.error(err));
