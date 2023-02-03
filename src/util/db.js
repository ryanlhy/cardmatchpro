/*
  This file is added to your codebase if you've excluded database integration from your stack when exporting from
  from Divjoy, but one of your components attempts to import this file and call one of its functions.
  Rather than break your project, we include this placeholder file so your codebase can still run.
  If you need database integration, re-export from Divjoy using the "SaaS" app type and select a database option.
  Otherwise, you can search your codebase for the function names you see below, remove all related code, then delete this file.
*/

/**** USERS ****/

export function useUser(uid) {
  return {
    data: {
      uid: uid,
      email: "fake-user@gmail.com",
    },
    status: "success",
    error: null,
  };
}

export function getUser(uid) {
  Promise.resolve({
    uid: uid,
    email: "fake-user@gmail.com",
  });
}

export function createUser(uid, data) {
  return Promise.resolve(true);
}

export function updateUser(uid, data) {
  return Promise.resolve(true);
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

export function useItem(id) {
  return {
    data: {
      id: id,
      name: "fake item",
    },
    status: "success",
    error: null,
  };
}

export function useItemsByOwner(owner) {
  return {
    data: [
      {
        id: 1,
        name: "fake item",
      },
    ],
    status: "success",
    error: null,
  };
}

export function createItem(data) {
  return Promise.resolve(true);
}

export function updateItem(id, data) {
  return Promise.resolve(true);
}

export function deleteItem(id) {
  return Promise.resolve(true);
}
