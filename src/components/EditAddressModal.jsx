import { useAddress } from "../context/address-context";
import { useRef } from "react";
import "../styles/components/editAddressModal.css";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

export const EditAddressModal = () => {
  const { addressState, dispatchAddress } = useAddress();
  const editAddressModal = useRef(null);

  if (addressState.isEditing) {
    const form = editAddressModal.current;
    const {
      name,
      flatName,
      area,
      landmark,
      city,
      pincode,
      state,
      country,
      contact,
    } = addressState.editData;
    form["fullName"].value = name;
    form["flatName"].value = flatName;
    form["area"].value = area;
    form["landmark"].value = landmark;
    form["city"].value = city;
    form["pincode"].value = pincode;
    form["stateSelect"].value = state;
    form["countrySelect"].value = country;
    form["contact"].value = contact;
  }

  const handleModalOnSubmit = (e) => {
    e.preventDefault();
    const form = editAddressModal.current;

    const addressData = {
      id: addressState.isEditing ? addressState.editData.id : uuid(),
      name: form["fullName"].value,
      flatName: form["flatName"].value,
      area: form["area"].value,
      landmark: form["landmark"].value,
      city: form["city"].value,
      pincode: form["pincode"].value,
      state: form["stateSelect"].value,
      country: form["countrySelect"].value,
      contact: form["contact"].value,
    };

    if (addressState.isEditing) {
      dispatchAddress({ type: "UPDATE-EDIT-ADDRESS", payload: addressData });
      toast.success("Address Updated!");
    } else {
      dispatchAddress({ type: "ADD-NEW-ADDRESS", payload: addressData });
      toast.success("Added New Address");
    }
    editAddressModal.current.reset();
  };
  const fillDummyAddressForm = (e) => {
    e.preventDefault();
    const form = editAddressModal.current;
    form["fullName"].value = "Venkata Ganesh";
    form["flatName"].value = "Opposite Vijaya Public School";
    form["area"].value = "Putchagadda";
    form["landmark"].value = "Challapalli Village";
    form["city"].value = "Krishna District";
    form["pincode"].value = "521126";
    form["stateSelect"].value = "Andhra Pradesh";
    form["contact"].value = "8074131682";
  };
  return (
    <div className={`edit-address-background ${addressState.setEditBox}`}>
      <form
        ref={editAddressModal}
        className="edit-address-container pd-xsm flex-column"
        onSubmit={(e) => handleModalOnSubmit(e)}
      >
        <h2 className="text-center">Address</h2>
        <button
          className="btn btn-solid btn-fill-dummy-address"
          onClick={(e) => fillDummyAddressForm(e)}
        >
          Fill Dummy Data
        </button>
        <div className="top-section flex-column ">
          <label htmlFor="name" className="mg-y-xsm fs-sm">
            Full Name
          </label>
          <input type="text" name="fullName" className="fs-sm" required />
          <label htmlFor="contact" className="mg-y-xsm fs-sm">
            Contact Number (10 Digits Only)
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="fs-sm"
            pattern="^[0-9]{10}$"
            required
          />
          <label htmlFor="flatName" className="mg-y-xsm fs-sm">
            Flat, House no., Building
          </label>
          <input
            type="text"
            id="flatName"
            name="flatName"
            className="fs-sm"
            required
          />
          <label htmlFor="area" className="mg-y-xsm fs-sm">
            Area, Colony, Street, Sector
          </label>
          <input type="text" id="area" name="area" className="fs-sm" required />

          <label htmlFor="landmark" className="mg-y-xsm fs-sm">
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            className="fs-sm"
            required
          />

          <label htmlFor="city" className="mg-y-xsm fs-sm">
            City
          </label>
          <input type="text" id="city" name="city" className="fs-sm" required />
          <label htmlFor="pincode" className="mg-y-xsm fs-sm">
            Pincode (6 Digits Only)
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="fs-sm"
            pattern="([0-9]{6}|[0-9]{3}\s[0-9]{3})"
            required
          />
          <label htmlFor="state" className="mg-y-xsm fs-sm">
            Village:
          </label>
          <select id="state" name="stateSelect" className="fs-sm">
            <option value="challapalli">Challapalli</option>
            <option value="ramanagaram">Rama nagaram</option>
            <option value="putchagadda">Putchagadda</option>
            <option value="Salapeta">Salapeta</option>
            <option value="vakkalagadda">Vakkalagadda</option>
            <option value="devarakota">Devarakota</option>
            <option value="lakshmipuram">Lakshmipuram</option>
            <option value="mopidevi">Mopidevi</option>
          </select>
          <label htmlFor="country" className="mg-y-xsm fs-sm">
            State:
          </label>
          <select id="country" name="countrySelect" className="fs-sm">
            <option value="AP">Andhra Pradesh</option>
          </select>
        </div>
        {/* <div className="error-text fw-bold fs-sm red-color">errorText</div> */}
        <div className="bottom-section align-center">
          <div className="action-buttons align-center">
            <button className="btn btn-solid" type="submit">
              Save Address
            </button>
            <a
              className="btn btn-outline"
              onClick={() => {
                {
                  dispatchAddress({
                    type: "TOGGLE-ADDRESS-MODAL",
                    payload: "hide-edit-box",
                  });
                  dispatchAddress({
                    type: "SET-EDIT-STATUS",
                    payload: false,
                  });
                  editAddressModal.current.reset();
                }
              }}
            >
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
