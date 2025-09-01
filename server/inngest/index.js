import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// =======================
// Sync User Creation
// =======================
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk.user.created" }, // ✅ fixed event name
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      if (!email_addresses || email_addresses.length === 0) {
        console.warn(`User ${id} has no email addresses.`);
        return;
      }

      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await User.create(userData);
      console.log(`✅ User ${id} created`);
    } catch (error) {
      console.error("Error syncing user creation:", error);
    }
  }
);

// =======================
// Sync User Update
// =======================
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk.user.updated" }, // ✅ fixed event name
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      if (!email_addresses || email_addresses.length === 0) {
        console.warn(`User ${id} has no email addresses.`);
        return;
      }

      const updatedData = {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await User.findByIdAndUpdate(id, updatedData, { new: true });
      console.log(`✅ User ${id} updated`);
    } catch (error) {
      console.error("Error syncing user update:", error);
    }
  }
);

// =======================
// Sync User Deletion
// =======================
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk.user.deleted" }, // ✅ fixed event name
  async ({ event }) => {
    try {
      const { id } = event.data;
      await User.findByIdAndDelete(id);
      console.log(`✅ User ${id} deleted`);
    } catch (error) {
      console.error("Error syncing user deletion:", error);
    }
  }
);

// =======================
// Export all functions
// =======================
export const functions = [syncUserCreation, syncUserUpdate, syncUserDeletion];
