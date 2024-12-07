// import { useFirebasePush } from "../storage"
// import { useCurrentList } from "./CurrentListProvider"

// export default function createNewList(newListName:string, uid:string) {
//     const {setCurrentList} = useCurrentList()


//     const pushData = useFirebasePush('lists', {
//             list_name: newListName,
//             owner_id: uid,
//             shared_with: {uid},
//             items: {}
//     })

//     setCurrentList("")

//     pushData()


//     // ListData object model{
// //   list_id: 9383829
// //   list_name: "Trader Joe's"
// //   owner_id: 029394202
// //   shared_with: ["29304938", "209395777"]
// //   items: 
// //        {id:23l029i3o, name: "Peanuts", status: "in_cart", time_added: "123093948"}
// //        {id:23l029i3o, name: "Eggs", status: "on_list", time_added: "123093948"}
// // }



//     console.log(`Your user id is: ${uid} and your list name is: ${newListName}`)
//     // get all the data for the new list object: name, user_id,
//     // create new list in the list table
//     // add list_id to shared_lists in the user table
// }