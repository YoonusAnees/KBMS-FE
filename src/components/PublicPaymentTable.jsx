const PublicPaymentTable = ({ payments }) => {
  return (
    <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-5">Public Records</h2>

      {payments.length === 0 ? (
        <div className="text-slate-500">No records found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="py-3 px-3">User Name</th>
                <th className="py-3 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="py-4 px-3 font-medium text-slate-800">
                    {payment.userName}
                  </td>
                  <td className="py-4 px-3 text-slate-500">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PublicPaymentTable;
