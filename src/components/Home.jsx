import axios from "axios";
import { useState } from "react";
import Loader from "./Loader";

const Home = () => {
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/company/${companyNumber}`
      );

      setCompanyData(response.data);
      setError(null);
      console.log(response.data);
    } catch (error) {
      setError(
        "Failed to fetch company data. Please check the company number and try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-black flex flex-col text-slate-100 relative">
        <form onSubmit={handleSubmit} className="w-full py-2 px-4">
          <div className="flex justify-between items-center border-b border-gray-400 pb-2">
            <div>
              <img src="/mylogo.png" width={100} />
            </div>
            <div className="space-x-3">
              <input
                className="border border-gray-400 rounded-lg text-white px-2 py-1 bg-transparent"
                type="text"
                value={companyNumber}
                onChange={(e) => setCompanyNumber(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-700 transition-colors"
              >
                Fetch Data
              </button>
            </div>
          </div>
        </form>
        {loading && <Loader />}

        {companyData && (
          <div className="w-full h-full flex p-2">
            <div className="w-1/3 p-3 flex-col space-y-6 justify-between">
              <div className="">
                <label className="text-slate-400">Company Name</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.company_name}
                </p>
              </div>
              <div>
                <label className="text-slate-400">Company Number</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.company_number}
                </p>
              </div>
              <div>
                <label className="text-slate-400">Company Status</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.company_status}
                </p>
              </div>
              <div>
                <label className="text-slate-400">Client Type</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.type == "ltd" ? "Limited Company" : "Individual"}
                </p>
              </div>
              <div>
                <label className="text-slate-400">
                  Registered Office Address
                </label>
                <p className="text-wrap overflow-hidden">
                  {companyData.registered_office_address.address_line_1}
                </p>
                <p className="text-wrap overflow-hidden">
                  {companyData.registered_office_address.locality}
                </p>
                <p className="text-wrap overflow-hidden">
                  {companyData.registered_office_address.postal_code}
                </p>
                <p className="text-wrap overflow-hidden">
                  {companyData.registered_office_address.region}
                </p>
              </div>
              <div>
                <label className="text-slate-400">SIC Code</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.sic_codes.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </p>
              </div>
              <div>
                <label className="text-slate-400">Date of Creation</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.date_of_creation}
                </p>
              </div>
            </div>
            <div className="w-1/3 p-3 flex-col space-y-6 justify-between">
              <div>
                <label className="text-slate-400">Can File ?</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.can_file ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <label className="text-slate-400">CS Last Made Up To</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.confirmation_statement.last_made_up_to}
                </p>
              </div>
              <div>
                <label className="text-slate-400">CS Next Due</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.confirmation_statement.next_due}
                </p>
              </div>
              <div>
                <label className="text-slate-400">CS Next Made Up To</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.confirmation_statement.next_made_up_to}
                </p>
              </div>
              <div>
                <label className="text-slate-400">CS Overdue ?</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.confirmation_statement.overdue ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <label className="text-slate-400">E-Tag</label>
                <p className="text-wrap overflow-hidden">{companyData.etag}</p>
              </div>
              <div>
                <label className="text-slate-400">Jurisdiction</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.jurisdiction}
                </p>
              </div>
              <div>
                <label className="text-slate-400">Company Status Details</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.company_status_detail}
                </p>
              </div>
            </div>
            <div className="w-1/3 p-3 flex-col space-y-6 justify-between">
              <div>
                <label className="text-slate-400">
                  Accounting Reference Date
                </label>
                <p className="text-blue-600">
                  Day:{" "}
                  <span className="text-white">
                    {companyData.accounts.accounting_reference_date.day}
                  </span>{" "}
                </p>
                <p className="text-blue-600">
                  Month:{" "}
                  <span className="text-white">
                    {companyData.accounts.accounting_reference_date.month}
                  </span>{" "}
                </p>
              </div>
              <div>
                <label className="text-slate-400">Next Accounts Due On</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.accounts.next_accounts.due_on}
                </p>
              </div>
              <div>
                <label className="text-slate-400">
                  Next Accounts Period End On
                </label>
                <p className="text-wrap overflow-hidden">
                  {companyData.accounts.next_accounts.period_end_on}
                </p>
              </div>
              <div>
                <label className="text-slate-400">
                  Next Accounts Period Start On
                </label>
                <p className="text-wrap overflow-hidden">
                  {companyData.accounts.next_accounts.period_start_on}
                </p>
              </div>
              <div>
                <label className="text-slate-400">Next Made Up To</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.accounts.next_made_up_to}
                </p>
              </div>
              <div>
                <label className="text-slate-400">Overdue ?</label>
                <p className="text-wrap overflow-hidden">
                  {companyData.accounts.overdue ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <label className="text-slate-400">
                  Last Accounts Made Up To
                </label>
                <p className="text-wrap overflow-hidden">
                  {companyData.accounts.last_accounts.made_up_to}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-500 rounded-lg">
            <p className="text-white">{error}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
