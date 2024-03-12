// pw: thisismypassword
// app_pw: vgwo lvzf eozy ebxn
// app_pw2: hred ktjf wkhc skjl

import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Home = () => {
  // State to store form field values

  const [BusinessOwnerDetails, setBusinessOwnerDetails] = useState({
    citizenship: "",
    identificationNumber: "",
    passportNumber: "",
    otherNames: "",
    surname: "",
    nationality: null,
    phoneNumber: "",
    emailAddress: "",
  });

  const [BusinessDetails, setBusinessDetails] = useState({
    businessName: "",
    businessType: "",
    tinNumber: "",
    registrationDate: "",
    businessLocation: "",
  });

  const [ProductDetails, setProductDetails] = useState({
    purposeOfImportation: "",
    otherReason: "",
    productCategory: "",
    productName: "",
    weight: "",
    description: "",
    units: "kg",
    quantity: "",
  });

  const emailConfig = {
    templateId: import.meta.env.VITE_TEMPLATE_ID as string,
    serviceId: import.meta.env.VITE_SERVICE_ID as string,
    publicKey: import.meta.env.VITE_PUBLIC_KEY as string,
  };

  // Function to handle owner form field changes
  const handleBusinessOwnerChanges = (e: any) => {
    const { name, value } = e.target;
    setBusinessOwnerDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle business details form field changes
  const handleBusinessChanges = (e: any) => {
    const { name, value } = e.target;
    setBusinessDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Function to handle product details form field changes
  const handleProductChanges = (e: any) => {
    const { name, value } = e.target;
    setProductDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Here you can handle form submission, such as sending data to the server
    console.log(
      "Form submitted:",
      BusinessOwnerDetails,
      BusinessDetails,
      ProductDetails
    );

    const emailMsg = {
      ...BusinessOwnerDetails,
      ...BusinessDetails,
      ...ProductDetails,
    };
    const emailParams = {
      from_name: BusinessOwnerDetails.emailAddress,
      to_name: import.meta.env.VITE_EMAIL as string,
      message: JSON.stringify(emailMsg),
    };

    emailjs
      .send(
        emailConfig.serviceId,
        emailConfig.templateId,
        emailParams,
        emailConfig.publicKey
      )
      .then((res) => {
        console.log("Email sent successfully!", res);
        toast.success("Form submitted successfully");
      })
      .catch((err) => {
        console.log("Email failed to send", err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-20 p-20">
      {/* Business owner details block */}
      <section>
        <h1>Business Owner Details</h1>
        <div className="flex flex-col">
          <div>
            <label htmlFor="citizenship">Citizenship:</label>
            <select
              id="citizenship"
              name="citizenship"
              value={BusinessOwnerDetails.citizenship}
              onChange={handleBusinessOwnerChanges}
              required
            >
              <option value="">Select citizenship</option>
              <option value="Rwandan">Rwandan</option>
              <option value="Foreigner">Foreigner</option>
            </select>
          </div>
          {BusinessOwnerDetails.citizenship === "Rwandan" && (
            <div>
              <label htmlFor="identificationNumber">
                Identification Number:
              </label>
              <input
                type="text"
                id="identificationNumber"
                name="identificationNumber"
                value={BusinessOwnerDetails.identificationNumber}
                onChange={handleBusinessOwnerChanges}
                required
              />
            </div>
          )}
          {BusinessOwnerDetails.citizenship === "Foreigner" && (
            <div className="">
              <label htmlFor="PassportNumber">Passport Number</label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                value={BusinessOwnerDetails.passportNumber}
                onChange={handleBusinessOwnerChanges}
                required
              />
            </div>
          )}
          {/* Add other fields based on the requirements */}
          <div className="flex flex-col">
            <label htmlFor="otherNames">Other Names:</label>
            <input
              type="text"
              id="otherNames"
              name="otherNames"
              value={BusinessOwnerDetails.otherNames}
              onChange={handleBusinessOwnerChanges}
              required
            />
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={BusinessOwnerDetails.surname}
              onChange={handleBusinessOwnerChanges}
              required
            />

            <label htmlFor="phone_number">Phone number</label>
            <input
              type="number"
              id="phone_number"
              name="phoneNumber"
              value={BusinessOwnerDetails.phoneNumber}
              onChange={handleBusinessOwnerChanges}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="emailAddress"
              value={BusinessOwnerDetails.emailAddress}
              onChange={handleBusinessOwnerChanges}
            />
            <label htmlFor="nationality">Nationality</label>
            {/* location widget */}
            <input
              type="text"
              name="nationality"
              id="nationality"
              onChange={handleBusinessOwnerChanges}
            />
          </div>
          {/* Implement other conditional fields based on citizenship */}
        </div>
      </section>

      {/* Business details block */}
      <section className="flex flex-col gap-5">
        <h1>Business Details Block</h1>

        <div className="flex flex-col gap-5">
          <label htmlFor="BusinessType">Business Type</label>
          <select
            id=" BusinessType"
            name="businessType"
            value={BusinessDetails.businessType}
            onChange={handleBusinessChanges}
            required
          >
            <option value="">Select Business Type</option>
            <option value="Retailer">Retailer</option>
            <option value="Wholesaler">Wholesaler</option>
            <option value="Manufacturer">Manufacturer</option>
          </select>

          <label htmlFor="CompanyName">Company Name</label>
          <input
            type="text"
            id="CompanyName"
            name="businessName"
            onChange={handleBusinessChanges}
            required
          />
        </div>

        <div className="flex fle-col gap-5">
          <label htmlFor="TINNumber">TIN Number</label>
          <input
            type="text"
            id="TINNumber"
            name="tinNumber"
            onChange={handleBusinessChanges}
            required
          />

          <label htmlFor="RegistrationDate">Registration Date</label>
          <input
            type="date"
            id="RegistrationDate"
            name="registrationDate"
            onChange={handleBusinessChanges}
            required
          />
        </div>

        <div className="flex gap-5">
          <label htmlFor="BusinessLocation">Business Location address</label>
          <input
            type="text"
            id="BusinessLocation"
            name="businessLocation"
            onChange={handleBusinessChanges}
            required
          />
        </div>
      </section>

      {/* Product information block */}
      <section className="flex flex-col gap-4">
        <h1>Importation Details</h1>
        <label htmlFor="PurposeOfImportation">Purpose of Importation</label>
        <select
          name="purposeOfImportation"
          id="PurposeOfImportation"
          onChange={handleProductChanges}
          required
        >
          <option value="DirectSale">Direct Sale</option>
          <option value="PersonalUse">Personal Use</option>
          <option value="TrialUse">Trial Use</option>
          <option value="Other">Other</option>
        </select>
        {ProductDetails.purposeOfImportation === "Other" && (
          <div>
            <label htmlFor="otherReason">Purpose of Importation:</label>
            <input
              type="text"
              id="otherReason"
              name="otherReason"
              value={ProductDetails.otherReason}
              onChange={handleProductChanges}
              required
            />
          </div>
        )}

        <h1>Product Details</h1>
        <label htmlFor="ProductCategory">Product category</label>
        <select name="productCategory" id="" onChange={handleProductChanges}>
          <option value="GeneralPurpose">General Purpose</option>
          <option value="ConstructionMaterials">Construction Materials</option>
          <option value="Chemicals">Chemicals</option>
        </select>
        <label htmlFor="productName">productName</label>
        <input
          type="text"
          name="productName"
          id="productName"
          onChange={handleProductChanges}
        />
        <label htmlFor="Weight">Weight</label>
        <input
          type="number"
          name="weight"
          id="Weight"
          onChange={handleProductChanges}
        />
        <label htmlFor="Description">Description Of Products</label>
        <textarea
          name="description"
          id="Description"
          onChange={handleProductChanges}
        ></textarea>
        <label htmlFor="Units">Unit of measurement</label>
        <select
          name="units"
          id="Units"
          value={ProductDetails.units}
          onChange={handleProductChanges}
        >
          <option value="Kg">Kg</option>
          <option value="Tonnes">Tonnes</option>
        </select>
        <label htmlFor="Quantity">Quantity of Products</label>
        <input
          type="number"
          name="quantity"
          id="Quantity"
          onChange={handleProductChanges}
        />
      </section>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Home;
