import {
  addNewContact,
  getContacts,
  getSpecificContact,
  updateContact,
  deleteContact
} from "../controllers/controller";

const routes = app => {
  //Contact route (whole collection or posting to db)
  app
    .route("/contact")
    .get(getContacts)
    .post(addNewContact);

  //specific id's in database
  app
    .route("/contact/:contactId")
    .get(getSpecificContact)
    .put(updateContact)
    .delete(deleteContact);
};

export default routes;
