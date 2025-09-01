import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" }); // removed leading space ✅

// =======================
// Sync User Creation
// =======================
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address, // fixed key
      name: `${first_name} ${last_name}`,
      image: image_url,
    };
    await User.create(userData);
  }
);

// =======================
// Sync User Update
// =======================
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" }, // correct event name
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const updatedData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, updatedData, { new: true });
  }
);

// =======================
// Sync User Deletion
// =======================
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// =======================
// Export all functions
// =======================
export const functions = [
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion,
];
