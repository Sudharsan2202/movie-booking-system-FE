import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

//
// Create user in MongoDB when Clerk user is created
//
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk.user.created" },   // ✅ fixed event name
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,  // ✅ fixed key
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.create(userData);
    console.log(`✅ User ${id} created in MongoDB`);
  }
);

//
// Delete user from MongoDB when Clerk user is deleted
//
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk.user.deleted" },   // ✅ fixed
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
    console.log(`✅ User ${id} deleted from MongoDB`);
  }
);

//
// Update user in MongoDB when Clerk user is updated
//
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk.user.updated" },   // ✅ fixed
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      email: email_addresses[0].email_address,  // ✅ fixed key
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData, { new: true });
    console.log(`✅ User ${id} updated in MongoDB`);
  }
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdate,
];
