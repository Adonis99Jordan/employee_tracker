import inquirer from 'inquirer';
import 'console.table';

import {getAllShops, getAllUsers, createShop } from './query.js';

let showWelcome = false;

export async function addShop() {
    const usersArray = await getAllUsers();
    const {user_id, name, address} = await inquirer.prompt([
        {
            message: 'Please select the owner of the shop',
            name: 'user_id',
            type: 'list',
            choices: usersArray.map((userObj) => {
                return {
                    name: userObj.user_name,
                    value: userObj.id
                }
            })
        },
        {
            message: 'Enter the shop name',
            name: 'name',
            type: 'input'
        },
        {
            message: 'Enter the shop address',
            name: 'address',
            type: 'input' 
        }
    ]);

    await createShop(user_id, name, address);
    
}


export async function showAllShops() {
    const shopRowArrays = await getAllShops();
    console.table(shopRowArrays);

}

export async function showMainMenu() {

    if (!showWelcome) {
        console.log('\n----- Welcome to the Shop App -----\n');
        showWelcome = true;
    }


    const answersObj = await inquirer.prompt({
        message: 'Please select an option',
        name: 'optionFunction',
        type: 'list',
        choices: [
            {
                name: 'Show all Shops',
                value: showAllShops
            },
            {
                name: 'Add Shops',
                value: addShop
            },
            {
                name: 'Quit',
                value: 0
            },
        ]
    });

    if (!answersObj.optionFunction) {
        console.log('\nThanks for usign the shop app!');
        process.exit();
    }
    await answersObj.optionFunction();

    showMainMenu();

}

// switch(option) {
//     case 'Show All Shops':
//     showAllShops();
//     break;
//     case 'Add Shops':
//     await addShop();
//     showMainMenu();
//     break;
// }